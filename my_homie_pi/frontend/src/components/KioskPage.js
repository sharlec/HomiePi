import React, { Component } from "react";
import "./KioskPage.css";

export default class KioskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUser: null,
            record_list: [],
            loading: true,
        };
        this.fetchUsers = this.fetchUsers.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.fetchDashboard = this.fetchDashboard.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('/API/kiosk/users')
            .then((response) => response.json())
            .then((data) => {
                const users = Array.isArray(data) ? data : [];
                const defaultUser = users.length === 1 ? users[0] : null;
                this.setState(
                    { users, selectedUser: defaultUser, loading: false },
                    () => {
                        if (defaultUser) {
                            this.fetchDashboard(defaultUser.id);
                        }
                    }
                );
            });
    }

    selectUser(user) {
        this.setState({ selectedUser: user, record_list: [] });
        this.fetchDashboard(user.id);
    }

    fetchDashboard(userId) {
        fetch(`/API/kiosk/dashboard?user_id=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    record_list: data.record_list || [],
                });
            });
    }

    toggleComplete(record, repeat) {
        const done = record.complete >= repeat;
        const targetComplete = done ? 0 : repeat;
        const record_list = this.state.record_list.map((item) => {
            if (item.id === record.id) {
                return { ...item, complete: targetComplete };
            }
            return item;
        });
        this.setState({ record_list });

        fetch('/API/kiosk/record', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                record_id: record.id,
                user_id: this.state.selectedUser.id,
                complete: targetComplete,
            }),
        });
    }

    render() {
        const { users, selectedUser, record_list, loading } = this.state;
        const pending = record_list.filter((item) => (item.complete || 0) < (item.repeat || 1));
        const done = record_list.filter((item) => (item.complete || 0) >= (item.repeat || 1));

        return (
            <div className="kiosk-root">
                <header className="kiosk-header">
                    <div>
                        <div className="kiosk-eyebrow">Family Board</div>
                        <h1>Today’s Tasks</h1>
                    </div>
                    <div className="kiosk-clock">
                        {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" })}
                    </div>
                </header>

                <section className="kiosk-users">
                    {loading && <div className="kiosk-note">Loading users...</div>}
                    {!loading && users.map((user) => (
                        <button
                            key={user.id}
                            className={`user-pill ${selectedUser && user.id === selectedUser.id ? "active" : ""}`}
                            onClick={() => this.selectUser(user)}
                        >
                            <span className="pill-avatar">{user.username.slice(0, 2).toUpperCase()}</span>
                            <span className="pill-name">{user.username}</span>
                        </button>
                    ))}
                </section>

                {!selectedUser && (
                    <div className="kiosk-note">Tap a user to continue.</div>
                )}

                {selectedUser && (
                    <div className="kiosk-grid">
                        <div className="kiosk-column">
                            <div className="column-title">Pending</div>
                            <div className="task-stack">
                                {pending.length === 0 && (
                                    <div className="task-empty">No pending tasks.</div>
                                )}
                                {pending.map((task) => {
                                    const repeat = task.repeat || 1;
                                    return (
                                        <button
                                            key={task.id}
                                            className="kiosk-task"
                                            onClick={() => this.toggleComplete(task, repeat)}
                                        >
                                            <span className="task-title">{task.task_name}</span>
                                            <span className="task-sub">{task.complete}/{repeat}</span>
                                            <span className="task-check" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="kiosk-column">
                            <div className="column-title">Done</div>
                            <div className="task-stack">
                                {done.length === 0 && (
                                    <div className="task-empty">Nothing completed yet.</div>
                                )}
                                {done.map((task) => (
                                    <button
                                        key={task.id}
                                        className="kiosk-task done"
                                        onClick={() => this.toggleComplete(task, task.repeat || 1)}
                                    >
                                        <span className="task-title">{task.task_name}</span>
                                        <span className="task-sub">Complete</span>
                                        <span className="task-check" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

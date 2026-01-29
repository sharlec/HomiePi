import React, { Component } from "react";
import Dialog from './Modal/Dialog';
import "./Dashboard.css";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.showModal = this.showModal.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.persistRecord = this.persistRecord.bind(this);
        this.handleLogoutButtonPressed = this.handleLogoutButtonPressed.bind(this);
        this.tan=this.tan.bind(this);
        this.hide=this.hide.bind(this);
        this.state = {
            user_ID: null,
            gender: "M",
            username: null,
            age: null,
            percent: 0,
            visible: false,
            task_list: [],
            record_list: [],
            isShow:false,
            isShow2:false,
            display: "none"
        };
        this.user_ID = this.props.match.params.user_ID;
        this.initialize();
    }


    tan(){
        console.log(this);
        this.setState({display:'block'})
    }

    hide(){
        this.setState({display:'none'})
    }

    toggle=()=>{
    this.setState({
      isShow:!this.state.isShow
    })
    };

    handleOk=()=>{
    this.setState({
      isShow:false
    })
    };

    handleCancel=()=>{
    this.setState({
      isShow:false
    })
    };

    handleOpen() {
        this.setState({visible: true})
    }

    handleLogoutButtonPressed() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.props.history.push("/");
    }

    //Authorization: `Bearer ${user.token}`
    initialize() {
        const requestOptions = {
            method: "GET",
            // 'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content,
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        };

        fetch('/API/dashboard', requestOptions).then((response) => response.json()).then(
            data => {
                if (data.username) {
                    this.setState({
                        user_ID: data.user_ID,
                        username: data.username,
                        age: data.age,
                        gender: data.gender,
                        task_list: data.task_list,
                        record_list: data.record_list,
                    });

                    console.log(data)
                    console.log(this.state)
                    // this.props.history.push("dashboard")
                } else console.log()
            }
        )
    }

    persistRecord(recordId, complete) {
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
                record_id: recordId,
                complete: complete,
            }),
        };

        fetch('/API/record', requestOptions).then((response) => {
            if (!response.ok) {
                console.log("Failed to update record");
            }
        });
    }

    toggleComplete(recordId, markDone, repeat) {
        const targetComplete = markDone ? 0 : Math.max(repeat || 1, 1);
        const record_list = this.state.record_list.map((item) => {
            if (item.id === recordId) {
                return { ...item, complete: targetComplete };
            }
            return item;
        });
        this.setState({ record_list });
        this.persistRecord(recordId, targetComplete);
    }

    render() {
        const now = new Date();
        const dateLabel = now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
        });
        const pending = this.state.record_list.filter((item) => {
            const repeat = item.repeat || 1;
            return item.complete < repeat;
        });
        const done = this.state.record_list.filter((item) => {
            const repeat = item.repeat || 1;
            return item.complete >= repeat;
        });
        const initials = this.state.username ? this.state.username.slice(0, 2).toUpperCase() : "HP";
        return (
            <div className="dashboard-root">
                <Dialog display={this.state.display} hide={this.hide} />
                <aside className="dashboard-sidebar">
                    <div className="brand">
                        <span className="brand-dot" />
                        HomiePi
                    </div>
                    <div className="user-card">
                        <div className="avatar">{initials}</div>
                        <div className="user-meta">
                            <div className="user-name">{this.state.username || "Welcome"}</div>
                            <div className="user-sub">Daily Focus Board</div>
                        </div>
                    </div>
                    <div className="menu">
                        <button className="menu-btn primary" onClick={this.tan}>
                            Add Task
                        </button>
                        <button className="menu-btn ghost" onClick={this.handleLogoutButtonPressed}>
                            Logout
                        </button>
                    </div>
                    <div className="sidebar-stats">
                        <div className="stat">
                            <div className="stat-label">Pending</div>
                            <div className="stat-value">{pending.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-label">Done</div>
                            <div className="stat-value">{done.length}</div>
                        </div>
                    </div>
                </aside>
                <main className="dashboard-main">
                    <header className="dashboard-header">
                        <div>
                            <div className="eyebrow">Today</div>
                            <h1>Focus Dashboard</h1>
                            <p className="subtitle">Tap a box to mark a task as complete.</p>
                        </div>
                        <div className="date-chip">{dateLabel}</div>
                    </header>

                    <section className="task-section">
                        <div className="section-title">Pending Tasks</div>
                        <div className="task-grid">
                            {pending.length === 0 && (
                                <div className="empty-card">All clear. Add a new task or enjoy the break.</div>
                            )}
                            {pending.map((record, index) => {
                                const repeat = record.repeat || 1;
                                const checked = record.complete >= repeat;
                                return (
                                    <label
                                        className={`task-card ${checked ? "done" : ""}`}
                                        style={{ animationDelay: `${index * 80}ms` }}
                                        key={record.id}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => this.toggleComplete(record.id, checked, repeat)}
                                        />
                                        <div className="task-body">
                                            <div className="task-title">{record.task_name}</div>
                                            <div className="task-meta">{record.complete}/{repeat} reps</div>
                                        </div>
                                        <span className="task-check" />
                                    </label>
                                );
                            })}
                        </div>
                    </section>

                    <section className="task-section">
                        <div className="section-title">Completed</div>
                        <div className="task-grid">
                            {done.length === 0 && (
                                <div className="empty-card muted">No tasks completed yet.</div>
                            )}
                            {done.map((record, index) => {
                                const repeat = record.repeat || 1;
                                return (
                                    <label
                                        className="task-card done"
                                        style={{ animationDelay: `${index * 60}ms` }}
                                        key={record.id}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            onChange={() => this.toggleComplete(record.id, true, repeat)}
                                        />
                                        <div className="task-body">
                                            <div className="task-title">{record.task_name}</div>
                                            <div className="task-meta">Complete</div>
                                        </div>
                                        <span className="task-check" />
                                    </label>
                                );
                            })}
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

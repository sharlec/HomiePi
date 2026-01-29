import React, { Component } from "react";
import "./LoginPage.css";

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            loading: true,
            error_msg: null,
            lastCount: 0,
    };
        this.selectUser = this.selectUser.bind(this);
        this.avatarDisplay = this.avatarDisplay.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
        this.poller = setInterval(() => {
            this.fetchUsers(true);
        }, 5000);
    }

    componentWillUnmount() {
        if (this.poller) {
            clearInterval(this.poller);
        }
    }

    fetchUsers(isPolling = false) {
        fetch('/API/kiosk/users')
            .then((response) => response.json())
            .then((data) => {
                const users = Array.isArray(data) ? data : [];
                this.setState((prev) => ({
                    users,
                    loading: false,
                    error_msg: null,
                    lastCount: users.length || prev.lastCount,
                }));
            })
            .catch(() => {
                if (!isPolling) {
                    this.setState({ loading: false, error_msg: "Unable to load users." });
                }
            });
    }

    selectUser(user) {
        this.props.history.push(`/kiosk?user_id=${user.id}`);
    }

    avatarDisplay(avatarKey, username) {
        const palette = {
            sunset: "#f97316",
            ocean: "#3b82f6",
            leaf: "#10b981",
            rose: "#f43f5e",
            violet: "#a855f7",
            sky: "#0ea5e9",
        };
        const initials = username ? username.slice(0, 2).toUpperCase() : "HP";
        if (avatarKey && palette[avatarKey]) {
            return { text: initials, style: { background: palette[avatarKey], color: "#fff" } };
        }
        if (avatarKey) {
            return { text: avatarKey, style: { background: "#f1f5f9", color: "#0f172a", fontSize: "22px" } };
        }
        return { text: initials, style: { background: "#0f172a", color: "#fff" } };
    }

    render(){
        return(
        <div className="login-root">
            <div className="login-card">
                <div className="login-left">
                    <div className="login-brand">
                        <span className="login-dot" />
                        HomiePi
                    </div>
                    <h1>Tap to begin</h1>
                    <p>
                        Pick your profile to open today’s dashboard. No passwords needed.
                    </p>
                    <div className="login-quote">
                        “Small wins add up fast.”
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form">
                        <div className="form-title">Choose a profile</div>
                        {this.state.loading && (
                            <div className="login-note">Loading users...</div>
                        )}
                        {!this.state.loading && this.state.users.length === 0 && (
                            <div className="login-note">No users yet. Create one from your phone.</div>
                        )}
                        <div className="user-grid">
                            {this.state.users.map((user) => {
                                const avatar = this.avatarDisplay(user.avatar, user.username);
                                return (
                                    <button
                                        key={user.id}
                                        className="user-card"
                                        onClick={() => this.selectUser(user)}
                                    >
                                        <span className="user-avatar" style={avatar.style}>
                                            {avatar.text}
                                        </span>
                                        <span className="user-name">{user.username}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <a className="register-cta" href="/add_new_user">Register new user (QR)</a>
                        {this.state.error_msg && (
                            <div className="login-note">{this.state.error_msg}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

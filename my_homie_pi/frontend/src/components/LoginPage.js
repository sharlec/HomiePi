import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username   : null,
            password: null,
            error_open: false,
            error_msg: null,
    };
        this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleUserNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

    handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
        console.log(this.state)
    }

    _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // console.log('do validate');
        this.handleLoginButtonPressed()
    }
    };

    handleClose(){
        this.setState({ error_open: false });
    }

    async handleLoginButtonPressed(){
        console.log(this.state);
        if (!this.state.username || !this.state.password) {
            this.setState({
                error_open: true,
                error_msg: "Please enter username and password.",
            });
            return;
        }
        const requestOptions={
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
             body:JSON.stringify({
                username:   this.state.username,
                password:   this.state.password,
        }),
        };

        let data = null;
        try {
            const response = await fetch('/API/login', requestOptions);
            try {
                data = await response.json();
            } catch (e) {
                data = null;
            }
            if (response.ok && data && data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                this.props.history.push("dashboard");
                return;
            }
            const msg = (data && (data.detail || data.error)) || "Login failed. Please check your credentials.";
            this.setState({ error_open: true, error_msg: msg });
        } catch (e) {
            this.setState({ error_open: true, error_msg: "Network error. Please try again." });
        }
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
                    <h1>Welcome back</h1>
                    <p>
                        A focused space for your daily habits. Keep your streaks alive and
                        close tasks with one tap.
                    </p>
                    <div className="login-quote">
                        “Small wins add up fast.”
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form">
                        <div className="form-title">Sign in</div>
                        <label>
                            Username
                            <input
                                required
                                type="text"
                                placeholder="yourname"
                                onChange={this.handleUserNameChange}
                                onKeyDown={this._handleKeyDown}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                onChange={this.handlePasswordChange}
                                onKeyDown={this._handleKeyDown}
                            />
                        </label>
                        <button className="login-primary" onClick={this.handleLoginButtonPressed}>
                            Login
                        </button>
                        <div className="login-alt">
                            <span>New here?</span>
                            <Link to="/register">Create account</Link>
                        </div>
                        {this.state.error_open && (
                            <div className="login-error" role="alert">
                                <span>{this.state.error_msg || "Login failed."}</span>
                                <button type="button" onClick={this.handleClose}>x</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

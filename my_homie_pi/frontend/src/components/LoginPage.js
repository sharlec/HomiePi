import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import cookie from "react-cookie";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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
        <Grid container spacing={1}   container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>

        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Login
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    onChange={this.handleUserNameChange}
                    onKeyDown={this._handleKeyDown}
                />
                <FormHelperText>
                    <div align = "center">User Name</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <FormControl>
                <TextField
                    required={true}
                    type="password"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    onChange={this.handlePasswordChange}
                    onKeyDown={this._handleKeyDown}
                />
                <FormHelperText>
                    <div align = "center">Password</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <Button color = "primary" variant="contained" onClick={this.handleLoginButtonPressed}   style={{ width: 80}}>
                Login
            </Button>

           <Button color = "secondary" variant="contained" to="/register" component={Link} style={{ width: 80}}>
                Register
            </Button>
       </Grid>
       <Snackbar open={this.state.error_open} onClose={this.handleClose}>
          <Alert severity="error" onClose={this.handleClose}>
              {this.state.error_msg || "Login failed."}
          </Alert>
       </Snackbar>
    </Grid>
        )
    }
}

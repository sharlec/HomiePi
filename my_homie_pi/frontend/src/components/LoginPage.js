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



export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username   : null,
            password: null,
    };

        this.handleLoginButtonPressed = this.handleLoginButtonPressed.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserNameChange(e) {
    this.setState({
      username: e.target.value,

    });
    console.log(this.state)
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
        console.log(this.state)
  }

  // curl -H "Content-Type: application/json" -X POST -d '{"username":"charles","password":"123"}' http://127.0.0.1:8000/API/login

    handleLoginButtonPressed(){
        console.log(this.state);
        const requestOptions={
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',

            },
             body:JSON.stringify({
                // gender: this.state.gender,
                username:   this.state.username,
                password:   this.state.password,
        }),
        };
        // fetch('/API/login',requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
        // console.log(this.state)
        fetch('/API/login', requestOptions).then((response)=>response.json()).then(
            data => {
                if (data.access) {
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);

                    this.props.history.push("dashboard")
                } else console.log()
            }
        )
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
          <Typography component="h3" variant="h3">
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
                />
                <FormHelperText>
                    <div align = "center">Password</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <Button color = "primary" variant="contained" onClick={this.handleLoginButtonPressed} style={{ width: 80}}>
                Login
            </Button>

           <Button color = "secondary" variant="contained" to="/register" component={Link} style={{ width: 80}}>
                Register
            </Button>
        </Grid>

        </Grid>

        )
    }
}
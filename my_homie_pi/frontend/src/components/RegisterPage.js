import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';




export default class RegisterPagePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            gender : "M",
            username   : null,
            password   : null,
            age    : 0,
            show : false,
            show_error: false,
            error_msg : null,
    };
        this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClose =this.handleClose.bind(this);

    }



    handleUserNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

    handleGenderChange(e) {
        this.setState({
          gender: e.target.value,
        });
      }

    handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

    handleAgeChange(e) {
    this.setState({
      age: e.target.value,
    });
  }

      handleClose(e) {
        this.setState({ show: false, show_error: false });
  }

    async handleRegisterButtonPressed(){
        console.log(this.state);
        if (!this.state.username || !this.state.password) {
            this.setState({ show_error: true, error_msg: "Please fill all required fields." });
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
                profile: {age: this.state.age, gender: this.state.gender}
        }),
        };
        let data = null;
        try {
            const response = await fetch('/API/user',requestOptions);
            try {
                data = await response.json();
            } catch (e) {
                data = null;
            }
            if (response.ok) {
                this.setState({ show: true, error_msg: null });
                return;
            }
            let msg = "Registration failed.";
            if (data) {
                if (data.detail) {
                    msg = data.detail;
                } else if (typeof data === 'object') {
                    const firstKey = Object.keys(data)[0];
                    if (firstKey) {
                        const firstVal = data[firstKey];
                        if (Array.isArray(firstVal)) {
                            msg = `${firstKey}: ${firstVal[0]}`;
                        } else {
                            msg = `${firstKey}: ${firstVal}`;
                        }
                    }
                }
            }
            this.setState({ show_error: true, error_msg: msg });
        } catch (e) {
            this.setState({ show_error: true, error_msg: "Network error. Please try again." });
        }
        // if success, then redirect to login or dashboard
        // give success information
    }

    render(){
        return(
        <Grid container spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a New Account
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset" >
              <meta name="csrf-token" content="{{ csrf_token() }}" />
            <FormHelperText>
              <div align="center">Register a new user here</div>
            </FormHelperText>
              <RadioGroup row defaultValue='M' onChange={this.handleGenderChange}>
                  <FormControlLabel
                      value="M"
                      control={<Radio color="primary" />}
                      label = "Male"
                      labelPlacement="bottom"
                  />

                    <FormControlLabel
                      value="F"
                      control={<Radio color="secondary" />}
                      label = "Female"
                      labelPlacement="bottom"
                  />
              </RadioGroup>
             </FormControl>
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
            <FormControl>
                <TextField
                    required={true}
                    type="number"
                    defaultValue={0}
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    onChange={this.handleAgeChange}
                />
                <FormHelperText>
                    <div align = "center">Age</div>
                </FormHelperText>
            </FormControl>
        </Grid>

       <Grid item xs={12} align="center">
            <Button color = "primary" variant="contained" onClick={this.handleRegisterButtonPressed}>
                Register
            </Button>
       </Grid>

        <Grid item xs={12} align="center">
           <Button color = "secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>

        <Snackbar open={this.state.show} onClose={this.handleClose}>
            {/*<Alert onClose={this.handleClose} severity="success">*/}
            {/*This is a success message!*/}
            {/*</Alert>*/}
         <Alert severity="success">
             Registration Success!
         </Alert>
        </Snackbar>
        <Snackbar open={this.state.show_error} onClose={this.handleClose}>
            <Alert severity="error" onClose={this.handleClose}>
                {this.state.error_msg || "Registration failed."}
            </Alert>
        </Snackbar>

        </Grid>
        )
    }
}

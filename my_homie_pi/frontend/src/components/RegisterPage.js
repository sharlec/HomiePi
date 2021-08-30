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
            first_name  : null,
            last_name   : null,
            password   : null,
            age    : 0,
            show : false,
            error_msg : null,
    };
        open = false
        this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClose =this.handleClose.bind(this);

    }



    handleUserNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

    handleFirstNameChange(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

    handleLastNameChange(e) {
    this.setState({
      last_name: e.target.value,
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
    // this.setState({
    //   age: e.target.value,
    // });
  }

    handleRegisterButtonPressed(){
        console.log(this.state);
        const requestOptions={
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body:JSON.stringify({
                username:   this.state.username,
                password:   this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,

                profile: {age: this.state.age, gender: this.state.gender}
        }),
        };
        fetch('/API/user',requestOptions).then((response)=>{
            if (response.status < 300){
                console.log(this.open);
                this.open = true;
                // Popup.alert('I am alert, nice to meet you');
                console.log(this.open);}
            else
                this.state.error_msg = "something wrong"
        })
            // response.json()).then((data)=>console.log(data))
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
                    onChange={this.handleFirstNameChange}
                />
                <FormHelperText>
                    <div align = "center">First Name</div>
                </FormHelperText>
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
                    onChange={this.handleLastNameChange}
                />
                <FormHelperText>
                    <div align = "center">Last Name</div>
                </FormHelperText>
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

        <Snackbar open={this.open}  onClose={this.handleClose}>
            {/*<Alert onClose={this.handleClose} severity="success">*/}
            {/*This is a success message!*/}
            {/*</Alert>*/}
         <Alert severity="success">
             Registration Success!
         </Alert>
        </Snackbar>

        </Grid>
        )
    }
}
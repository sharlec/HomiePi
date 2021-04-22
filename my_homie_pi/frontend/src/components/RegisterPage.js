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


export default class RegisterPagePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            gender : "M",
            name   : null,
            age    : null,
    };
        this.handleRegisterButtonPressed = this.handleRegisterButtonPressed.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
    }

  handleGenderChange(e) {
    this.setState({
      gender: e.target.value,
    });
  }

    handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

    handleAgeChange(e) {
    this.setState({
      age: e.target.value,
    });
  }

    handleRegisterButtonPressed(){
        console.log(this.state)
        const requestOptions={
            method: "POST",
            header:{'Content-Type':'application/json'},
            body:JSON.stringify({
                gender: this.state.gender,
                name:   this.state.name,
                age:    this.state.age
        }),
        }
        fetch('/API/create-user',requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
    }

    render(){
        return(

        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a New Account
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldset" >
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
                    onChange={this.handleNameChange}
                />
                <FormHelperText>
                    <div align = "center">Name</div>
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
            <Button color = "primary" variant="contained" onClick={this.handleRegisterButtonPressed()}>
                Register
            </Button>
       </Grid>

        <Grid item xs={12} align="center">
           <Button color = "secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid>


        </Grid>
        )
    }
}
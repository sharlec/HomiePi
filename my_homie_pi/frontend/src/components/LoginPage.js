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


export default class LoginPage extends Component{
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
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
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

  handlePasswordChange(e) {
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
// onclick直接跳转registerpage

    }


    handleRegisterButtonPressed(){
        //这里是login按钮，所以要检查login信息
        //首先是有没有这个人，
        // 其次是密码对不对，
        // 如果对了，给他session并且跳转到profile
        // 如果不对，直接给提示信息
        // console.log(this.state)
        // const requestOptions={
        //     method: "POST",
        //     header:{'Content-Type':'application/json'},
        //     body:JSON.stringify({
        //         gender: this.state.gender,
        //         name:   this.state.name,
        //         age:    this.state.age
        // }),
        // }
        // fetch('/API/create-user',requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
    }

    render(){
        return(
        <Grid container spacing={1}>
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
                    type="text"
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
            <Button color = "primary" variant="contained" onClick={this.handleRegisterButtonPressed()} style={{ width: 80}}>
                Login
            </Button>

           <Button color = "secondary" variant="contained" to="/" component={Link} style={{ width: 80}}>
                Back
            </Button>
        </Grid>
        </Grid>
        )
    }
}
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class ProfilePage extends Component{
    constructor(props){
        super(props);
        this.state = {
    gender : "M",
    name   : null,
    age    : null,
    };
        this.user_name = this.props.match.params.user_name;
        this.getUserDetails();
    }

    getUserDetails() {
    fetch("/API/get-user" + "?user_name=" + this.user_name)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: data.name,
          age: data.age,
          gender: data.gender,
        });
      });
  }
    render(){
        //在这里加入逻辑语句：先判定是否match session
        //如果是，从数据库拉数据
        return <div>
            <h3>{this.user_name}</h3>
            <p>name: {this.state.name}</p>
            <p>age: {this.state.age}</p>
            <p>gender: {this.state.gender}</p>

        </div>
    }
}
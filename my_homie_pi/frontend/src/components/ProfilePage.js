import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Modal from './Modal/addTask'

export default class ProfilePage extends Component{
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.state = {
            gender : "M",
            name   : null,
            age    : null,
            visible: false,
          };

        this.user_name = this.props.match.params.user_name;
        this.getUserDetails();
    }

    showModal() {
    this.setState({ visible: true })
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

  render() {
        const { visible } = this.state
        return (
      <div>
      <h3>{this.user_name}</h3>
        <p>name: {this.state.name}</p>
        <p>age: {this.state.age}</p>
        <p>gender: {this.state.gender}</p>
         <button onClick={this.showModal}>click here</button>
          <Modal visible={visible}></Modal>

                  <br/><br/><br/>
        <h3>The following is the record</h3>
      </div>
    );
  }
}


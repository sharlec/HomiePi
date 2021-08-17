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
            user_ID: null,
            gender : "M",
            name   : null,
            age    : null,
            daily_record : [],
            visible: false,
          };

        this.user_ID = this.props.match.params.user_ID;
        this.getUserDetails();

    }

    showModal() {
    this.setState({ visible: true })
  }

    getUserDetails() {
    fetch("/API/get-user" + "?user_ID=" + this.user_ID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
            user_ID: data.id,
          name: data.name,
          age: data.age,
          gender: data.gender,
        });
      });
    this.getUserRecords();
  }
      getUserRecords() {
 console.log(this.state)
    fetch("/API/get-user-record" + "?user_ID=" + this.user_ID)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
        daily_record: data[0]
        });
      });
  }


  render() {
        const { visible } = this.state
        return (
      <div>
      <h3>{this.user_name}</h3>
        <p>ID: {this.state.id}</p>
           <p>name: {this.state.name}</p>
        <p>age: {this.state.age}</p>
        <p>gender: {this.state.gender}</p>
         <button onClick={this.showModal}>click here</button>
          <Modal visible={visible}></Modal>

                  <br/><br/><br/>
        <h3>The following is the record</h3>
          <p>task: {this.state.daily_record.task_name}</p>
      </div>
    );
  }
}


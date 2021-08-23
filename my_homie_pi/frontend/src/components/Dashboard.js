import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Modal from './Modal/addTask'


export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.state = {
            // token : localStorage.getItem('access_token'),
            user_ID: null,
            gender: "M",
            username: null,
            age: null,
            daily_record: [],
            visible: false,
        };

        this.user_ID = this.props.match.params.user_ID;
        this.initialize();

    }


    showModal() {
        this.setState({visible: true})
    }

    //Authorization: `Bearer ${user.token}`
    initialize() {
        const requestOptions = {
            method: "GET",
            // 'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].content,
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        };

        fetch('/API/dashboard', requestOptions).then((response) => response.json()).then(
            data => {
                if (data.username) {
                    this.setState({
                        username: data.username,
                        age: data.age,
                        gender: data.gender,
                    });

                    console.log(data)
                    // this.props.history.push("dashboard")
                } else console.log()
            }
        )

    }

    // handleLogoutButtonPressed() {
    //     console.log(this.state);
    //     const requestOptions = {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json, text/plain',
    //             'Content-Type': 'application/json;charset=UTF-8',
    //         },
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password,
    //         }),
    //     };
    //
    //     fetch('/API/login', requestOptions).then((response) => response.json()).then(
    //         data => {
    //             if (data.access) {
    //                 localStorage.setItem('access_token', data.access);
    //                 localStorage.setItem('refresh_token', data.refresh);
    //
    //                 this.props.history.push("dashboard")
    //             } else console.log()
    //         }
    //     )
    // }



//
  render() {
        const { visible } = this.state;
        return (

    <Grid   container direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            xs  ={12}>

      <Grid item align = "center" xs={4}>
        <Grid container direction="column"
              align = "center">
            <Grid item><h3>Dashboard</h3></Grid>
            <Grid item>username : {this.state.username}</Grid>
            <Grid item>age : {this.state.age}</Grid>
            <Grid item>gender : {this.state.gender}</Grid>
            <Grid item>maybe photo</Grid>
            <Grid item>
                <Button color = "primary"
                        variant="contained"
                        onClick={this.handleLogoutButtonPressed}
                        style={{ width: 80}}>
                 Logout
             </Button>
        </Grid>
        </Grid>
      </Grid>


      <Grid item align="center" xs={4}>
        <Grid container
              direction="column">
            <Grid item><h3>Today Agenda</h3></Grid>
             <Grid item>4</Grid>
        </Grid>
     </Grid>


    <Grid item align ="center" xs={4}>
        <Grid container direction="column" >
        <Grid item xs = {6} align ="center">Task Showlist</Grid>
               {/*<Button color = "primary"*/}
                       {/*variant="contained"*/}
                       {/*onClick ={this.showModal()}*/}
                       {/*// style={{ width: 80}}*/}
               {/*>*/}
                {/*Add Task*/}
            {/*</Button>*/}
            <Grid item><button onClick={this.showModal}>click here</button>
            <Modal visible={visible}></Modal></Grid>


    </Grid>
    </Grid>

</Grid>


      //   <Grid container direction="rows" justifyContent="center" alignItems="center" spacing={3} xs = {6}>
      //   <Grid item xs={12} align="center">
      //     <Typography component="h4" variant="h4">
      //       Dashboard
      //     </Typography>
      //   </Grid>
      //       <Grid item xs={12} align="center">
      // <div>
      // <h3>{this.user_name}</h3>
      //      <p>name: {this.state.name}</p>
      //   <p>age: {this.state.age}</p>
      //   <p>gender: {this.state.gender}</p>
      //    <button onClick={this.showModal}>click here</button>
      //     <Modal visible={visible}></Modal>
      //
      //             <br/><br/><br/>
      //   <h3>The following is the record</h3>
      //     <p>task: {this.state.daily_record.task_name}</p>
      // </div>
      //       </Grid>
      //   </Grid>

       //  <Grid container direction="rows" justifyContent="center" alignItems="center" spacing={3} xs = {6}>
       //
       //  <Grid item xs={12} align="center">
       //      <FormControl>
       //          <TextField
       //              required={true}
       //              type="text"
       //              inputProps={{
       //                  style:{textAlign:"center"},
       //              }}
       //              onChange={this.handleUserNameChange}
       //          />
       //          <FormHelperText>
       //              <div align = "center">User Name</div>
       //          </FormHelperText>
       //      </FormControl>
       //  </Grid>
       //
       // <Grid item xs={12} align="center">
       //      <Button color = "primary" variant="contained" onClick={this.handleLogoutButtonPressed} style={{ width: 80}}>
       //          Logout
       //      </Button>
       //
       //     <Button color = "secondary" variant="contained" to="/" component={Link} style={{ width: 80}}>
       //          Back
       //      </Button>
       //  </Grid>
       //
       //  </Grid>



    );
  }
}


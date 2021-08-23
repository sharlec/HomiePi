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



const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black'
  },
  image: {
    backgroundImage:
      'url(https://media.giphy.com/media/kz76j0UjtPoE4WyhQn/giphy.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: 'orange'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.state = {
            // token : localStorage.getItem('access_token'),
            user_ID: null,
            gender: "M",
            name: null,
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
                        name: data.username,
                        age: data.age,
                        gender: data.gender,
                    });

                    console.log(data)
                    // this.props.history.push("dashboard")
                } else console.log()
            }
        )

    }

    handleLogoutButtonPressed() {
        console.log(this.state);
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };

        fetch('/API/login', requestOptions).then((response) => response.json()).then(
            data => {
                if (data.access) {
                    localStorage.setItem('access_token', data.access);
                    localStorage.setItem('refresh_token', data.refresh);

                    this.props.history.push("dashboard")
                } else console.log()
            }
        )
    }



//
  render() {
        const { visible } = this.state
        return (
            <div>
        <Grid container direction="rows" justifyContent="center" alignItems="center" spacing={3} xs = {6}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Dashboard
          </Typography>
        </Grid>
            <Grid item xs={12} align="center">
      <div>
      <h3>{this.user_name}</h3>
           <p>name: {this.state.name}</p>
        <p>age: {this.state.age}</p>
        <p>gender: {this.state.gender}</p>
         <button onClick={this.showModal}>click here</button>
          <Modal visible={visible}></Modal>

                  <br/><br/><br/>
        <h3>The following is the record</h3>
          <p>task: {this.state.daily_record.task_name}</p>
      </div>
            </Grid>
        </Grid>

        <Grid container direction="rows" justifyContent="center" alignItems="center" spacing={3} xs = {6}>

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
            <Button color = "primary" variant="contained" onClick={this.handleLogoutButtonPressed} style={{ width: 80}}>
                Logout
            </Button>

           <Button color = "secondary" variant="contained" to="/" component={Link} style={{ width: 80}}>
                Back
            </Button>
        </Grid>

        </Grid>
            </div>


    );
  }
}


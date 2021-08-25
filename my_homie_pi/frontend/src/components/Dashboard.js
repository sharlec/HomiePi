import React, { Component } from "react";
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import {Button} from 'antd'
// import 'antd/lib/button/style';
// import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';


import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";


import Modal from './Modal/addTask'


function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
// });



export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.state = {
            user_ID: null,
            gender: "M",
            username: null,
            age: null,
            percent : 0,
            visible: false,
            task_list: [],
            record_list: [],
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
                        user_ID :   data.user_ID,
                        username:   data.username,
                        age     :   data.age,
                        gender  :   data.gender,
                        task_list:  data.task_list,
                        record_list : data.record_list,
                    });

                    console.log(data)
                    console.log(this.state)
                    // this.props.history.push("dashboard")
                } else console.log()
            }
        )

    }

      increase (index) {
        let record_list = this.state.record_list;
        let complete    = record_list[index]["complete"] + 1;
        let repeat  =   record_list[index]["repeat"];

        if (complete > repeat) {
          complete = repeat;
        }
        record_list[index]["complete"] = complete;

        this.setState({ record_list });
      };

      decrease (index) {
          let record_list = this.state.record_list;
          let complete = record_list[index]["complete"] - 1;

          if (complete < 0) {
              complete = 0;
          }

          record_list[index]["complete"] = complete;

          this.setState({record_list});
      }




  render() {
        const { visible } = this.state;
        return (
            <div>
                 <Row gutter={24}>
          <Col span={6} key={1}>
              <h3>Profile</h3>
          </Col>
          <Col span={6} key={2}>
              <h3>Progress</h3>
          </Col>
          <Col span={6} key={3}>
              Task
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">确定</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
          </Col>
        </Row>
            </div>


//    // {/*<Grid   container direction="row"*/}
// //             alignItems="center"
// //             justify="center"
//             {/*style={{ minHeight: '100vh' }}*/}
//             {/*xs  ={12}>*/}
//       {/*<Grid item align = "center" xs={2}>*/}
// //         <Grid container direction="column"
// //               align = "center">
//             {/*<Grid item><h3>Dashboard</h3></Grid>*/}
//             {/*<Grid item>username : {this.state.username}</Grid>*/}
//             {/*<Grid item>age : {this.state.age}</Grid>*/}
//             {/*<Grid item>gender : {this.state.gender}</Grid>*/}
//             {/*<Grid item>maybe photo</Grid>*/}
//             {/*<Grid item>*/}
//                 {/*<Button color = "primary"*/}
//                         {/*variant="contained"*/}
// //                         onClick={this.handleLogoutButtonPressed}
// //                         style={{ width: 80}}>
//                  {/*Logout*/}
//              {/*</Button>*/}
//         {/*</Grid>*/}
// //         </Grid>
// //       </Grid>
// //
//       {/*<Grid item align="center"  xs={5}>*/}
//         {/*<Grid container*/}
//               {/*direction="column">*/}
//             {/*<Grid item xs={12}><h3>Today Agenda</h3></Grid>*/}
//                 {/*<Grid container direction="row">*/}
//                     {/*{this.state.record_list.map((record, index) => (*/}
//                        {/*<Grid item xs={12}>*/}
// //                      <LinearProgress algin="center"
// //                       variant="determinate" style={{ color: "#0ec44e" }}
// //                       value={100 * (record["complete"] / record["repeat"])}
//                                      {/*label={record["task_name"]}*/}
//                      {/*/>*/}
//                              {/*<Grid item xs={5}>*/}
//                      {/*<AddBoxIcon onClick={() => this.increase(index)}   style={{ color: "#0ec44e" }}  />*/}
// //                      <IndeterminateCheckBoxIcon onClick={() => { this.decrease(index);} } style={{color:"#f54278"}}/>
//                              {/*</Grid>*/}
//
//                   {/*</Grid>*/}
//   {/*))}*/}
//
// //              </Grid>
// //         {/*</Grid>*/}
// //         </Grid>
//      {/*</Grid>*/}
//
//
// //     <Grid item align ="center" xs={4}>
// //         <Grid container direction="column" >
//         {/*<Grid item xs = {12}>Task Showlist</Grid>*/}
//             {/*{this.state.task_list.map(task => (*/}
// //                 <p>{task['name']}</p>
// //
// //   ))}
// //                {/*<Button color = "primary"*/}
// //                        {/*variant="contained"*/}
// //                        {/*onClick ={this.showModal()}*/}
// //                        {/*// style={{ width: 80}}*/}
// //                {/*>*/}
// //                 {/*Add Task*/}
// //             {/*</Button>*/}
// //             <Grid item xs={12}>
// //                 <Button
// //                     color = "primary"
// //                     variant="contained"
// //                     onClick={this.showModal}>click here
// //                 </Button>
// //             <Modal visible={visible}></Modal></Grid>
//    // {/*</Grid>*/}
//   //  {/*</Grid>*/}
//
// //{/*</Grid>*/}
    )
  }
}


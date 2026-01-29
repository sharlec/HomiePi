import React, { Component } from 'react';
import './addTask.css';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';

class Modal extends Component {
  constructor(props) {
    super(props);
    // this.confirm = this.confirm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleConfirmButtonPressed = this.handleConfirmButtonPressed.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);

    this.state = {
        task_name    : null,
        repeat  : null,
        week: [{id: 1, name: 'mon'},
             {id: 2, name: 'tu'},
             {id: 3, name: 'wed'},
             {id: 4, name: 'th'},
             {id: 5, name: 'fri'},
             {id: 6, name: 'sat'},
             {id: 0, name: 'sun'},
            ],
        selected : [],
        visible : false
    };
  }

  handleConfirmButtonPressed(){
    console.log(this.state);
    const requestOptions={
        method: "POST",
        headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },

        body:JSON.stringify({
            task_name   : this.state.name,
            repeat : this.state.repeat,
            week : this.state.selected.toString()
    }),
    };
    fetch('/API/create-task',requestOptions).then((response)=>response.json()).then((data)=>console.log(data));
    const { confirm } = this.props;
    confirm && confirm();
    this.setState({ visible: false })
    }

    handleTaskChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

    handleRepeatChange(e) {
      this.setState({
          repeat: e.target.value,
      });
    }

    handleWeekChange(id){
        let selected = this.state.selected
          let find = selected.indexOf(id)

          if(find > -1) {
            selected.splice(find, 1)
          } else {
            selected.push(id)
          }
          this.setState({ selected })
    }

  // 首次渲染使用父组件的状态更新modal中的visible状态，只调用一次
  componentDidMount() {
    this.setState({ visible: this.props.visible })
  }

  // 每次接收props就根据父组件的状态更新modal中的visible状态，首次渲染不会调用
  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible })
  }

  // 点击取消更新modal中的visible状态
  closeModal() {
    const { onClose } = this.props;
    onClose && onClose();
    this.setState({ visible: false })
  }

  render() {
    // 使用modal中维护的visible状态来控制显隐
    const { visible } = this.state;
    // const { title, children } = this.props;
    return visible && <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-title">{"Add a New Task Here"}</div>
        <div className="modal-content">
            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    onChange={this.handleTaskChange}
                />
                <FormHelperText>
                    <div align = "center">Task Name</div>
                </FormHelperText>
            </FormControl>

            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    onChange={this.handleRepeatChange}
                />
                <FormHelperText>
                    <div align = "center">How many times per day</div>
                </FormHelperText>
            </FormControl>
     <FormControl component="fieldset">

      <FormGroup aria-label="position" row>
             { JSON.stringify(this.state.selected) }
              {this.state.week.map(item => {
                  return (
                        <label key={ item.id } position="bottom">
                          <Checkbox
                          color="primary"
                          onChange={ () => this.handleWeekChange(item.id) }
                          selected={ this.state.selected.includes(item.id) }
                          ></Checkbox>
                          <span>{ item.name }</span>
                    </label>
                  )
                })
              }
      </FormGroup>

        <FormHelperText>
            <div align = "center">Weekly Schedule</div>
        </FormHelperText>
    </FormControl>

        </div>
        <div className="modal-operator">
                  <button
            onClick={this.handleConfirmButtonPressed}
            className="modal-operator-confirm"
          >Confirm</button>
          <button
            onClick={this.closeModal}
            className="modal-operator-close"
          >Cancel</button>

        </div>
      </div>
    </div>
  }
}
export default Modal;
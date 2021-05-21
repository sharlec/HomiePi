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
import FormLabel from '@material-ui/core/FormLabel';


class Modal extends Component {
  constructor(props) {
    super(props)
    this.confirm = this.confirm.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      visible: false
    }
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
    const { onClose } = this.props
    onClose && onClose()
    this.setState({ visible: false })
  }

  confirm() {
    const { confirm } = this.props
    confirm && confirm()
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
                    // onChange={this.handleNameChange}
                />
                <FormHelperText>
                    <div align = "center">Task Name</div>
                </FormHelperText>
            </FormControl>
        <br/>
            <FormControl>
                <TextField
                    required={true}
                    type="text"
                    inputProps={{
                        style:{textAlign:"center"},
                    }}
                    // onChange={this.handleNameChange}
                />
                <FormHelperText>
                    <div align = "center">How many times per day</div>
                </FormHelperText>
            </FormControl>
<br/>
             <FormControl component="fieldset">
      {/*<FormLabel component="legend">Label Placement</FormLabel>*/}

      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="M"
          control={<Checkbox color="primary" />}
          label="M"
          labelPlacement="top"
        />
        <FormControlLabel
          value="Tu"
          control={<Checkbox color="primary" />}
          label="Tu"
          labelPlacement="top"
        />        <FormControlLabel
          value="W"
          control={<Checkbox color="primary" />}
          label="W"
          labelPlacement="top"
        />        <FormControlLabel
          value="Th"
          control={<Checkbox color="primary" />}
          label="Th"
          labelPlacement="top"
        />        <FormControlLabel
          value="F"
          control={<Checkbox color="primary" />}
          label="F"
          labelPlacement="top"
        />        <FormControlLabel
          value="Sa"
          control={<Checkbox color="primary" />}
          label="Sa"
          labelPlacement="top"
        />        <FormControlLabel
          value="Su"
          control={<Checkbox color="primary" />}
          label="Su"
          labelPlacement="top"
        />
      </FormGroup>
                  <FormHelperText>
        <div align = "center">Weekly Schedule</div>
    </FormHelperText>
    </FormControl>

        </div>

        <div className="modal-operator">
                  <button
            onClick={this.confirm}
            className="modal-operator-confirm"
          >Confirm</button>
          <button
            onClick={this.closeModal}
            className="modal-operator-close"
          >Cancel</button>

        </div>
      </div>
      {/*<div*/}
        {/*className="mask"*/}
      {/*></div>*/}
    </div>
  }
}
export default Modal;
// Modal组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import {createPortal} from 'react-dom'
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";

class Modal extends Component {

  constructor (props){
    super(props);
    this.state={

    }
    this.state = {
        user_ID : 1,
        name    : null,
        repeat  : 1,
        mon : 0,
        tu : 0,
        wed: 0,
        th: 0,
        fri: 0,
        sat: 0,
        sun: 0,
        week: [{id: 1, name: 'mon'},
             {id: 2, name: 'tu'},
             {id: 3, name: 'wed'},
             {id: 4, name: 'th'},
             {id: 5, name: 'fri'},
             {id: 6, name: 'sat'},
             {id: 7, name: 'sun'},
  ],
      selected : [],
      visible : false,
      node:undefined
    };
  }

  static getDerivedStateFromProps(props, state){
    const document=window.document
    if(props.visible){ // visible 为true时，body中新增div，为createPortal提供一个挂载节点。
      const node=document.createElement('div')
      document.body.appendChild(node)
      return {
        node // 将挂载的Dom节点存储起来，方便移除时使用
      };
    }
    if(state.node){ // visible为false时，移除对应的dom
      document.body.removeChild(state.node)
    }
    return null
  }

  render () {
    const {visible,title,onOk,onCancel}=this.props
    if(!visible){
      return null;
    }
    return createPortal( //第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。
      <div className='modalWrapper'>
        {
          title&&(
            <div className='modalTitle'>
              {title}
            </div>
          )
        }
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
        <br/>
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
<br/>
            <form>

</form>
             <FormControl component="fieldset">

      <FormGroup aria-label="position" row>
                 { JSON.stringify(this.state.selected) }

  {
    this.state.week.map(item => {
      return (
        <label key={ item.id } position="bottom">
          <input type="checkbox"
  onChange={ () => this.handleWeekChange(item.id) }
  selected={ this.state.selected.includes(item.id) }
  ></input>
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
        {this.props.children}
        <div className='modalFooter'>
          <button onClick={onCancel}>取消</button>
          <button onClick={onOk}>确认</button>
        </div>
      </div>,
      this.state.node
    )
  }
}
Modal.propTypes={
  visible:PropTypes.bool
}
Modal.defaultProps={
  visible:true
}
export default Modal
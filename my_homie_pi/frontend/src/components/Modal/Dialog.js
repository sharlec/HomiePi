import React,{Component} from 'react'
import './dialog.css'
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Button from "@material-ui/core/Button";

export default class Dialog extends Component {
    constructor(props){
        super(props);
        this.handleConfirmButtonPressed = this.handleConfirmButtonPressed.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleRepeatChange = this.handleRepeatChange.bind(this);
        this.state = {
            task_name   : null,
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
        };
    }

    handleConfirmButtonPressed(){
    console.log(this.state);
    const requestOptions={
        method: "POST",
        headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },

        body:JSON.stringify({
            name   : this.state.task_name,
            repeat : this.state.repeat,
            week : this.state.selected.toString()
    }),
    };
    //发送信息
    fetch('/API/task',requestOptions).then((response)=>{
            if(response.status === 200){
                console.log("SUCCESSS")
                // return response.json();
            }
    }
    )
    // response.json()).then((data)=>console.log(data));
    // const { confirm } = this.props;
    // confirm && confirm();
    // this.setState({ visible: false })
        window.location.reload()
    }

    handleTaskChange(e) {
    this.setState({
      task_name: e.target.value,
    });
  }

    handleRepeatChange(e) {
      this.setState({
          repeat: e.target.value,
      });
    }

    handleWeekChange(id){
        let selected = this.state.selected;
          let find = selected.indexOf(id);
          if(find > -1) {
            selected.splice(find, 1)
          } else {
            selected.push(id)
          }
          this.setState({ selected })
    }


    render(){
        return (
            <div className="mask" style={{display:this.props.display}}>
            <div className="content">
            <h5>Add New Task Here</h5>
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
                    type="number"
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

        <Button color="primary"
            variant="contained"
            onClick={this.handleConfirmButtonPressed}
            style={{width: 80}}>
            Confirm
        </Button>

        <Button color="secondary"
            variant="contained"
            onClick={this.props.hide}
            style={{width: 80}}>
            Cancel
        </Button>


        </div>
    </div>
        );
    }
}


import React,{Component} from 'react'
import './dialog.css'

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
            if(response.status === 201){
                window.location.reload()
            } else if (response.status === 409) {
                console.log("Task already exists")
            }
    })
    // response.json()).then((data)=>console.log(data));
    // const { confirm } = this.props;
    // confirm && confirm();
    // this.setState({ visible: false })
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
            <div
                className="modal-overlay"
                style={{ display: this.props.display === 'block' ? 'flex' : 'none' }}
                onClick={this.props.hide}
            >
                <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div>
                            <div className="modal-eyebrow">New Task</div>
                            <h3>Create a fresh goal</h3>
                            <p>Pick the days and target repeats for today.</p>
                        </div>
                        <button className="icon-button" onClick={this.props.hide} type="button">x</button>
                    </div>

                    <div className="modal-body">
                        <label className="field">
                            <span>Task name</span>
                            <input
                                required={true}
                                type="text"
                                placeholder="e.g. Morning stretch"
                                onChange={this.handleTaskChange}
                            />
                        </label>

                        <label className="field">
                            <span>Daily repeat</span>
                            <input
                                required={true}
                                type="number"
                                min="1"
                                step="1"
                                placeholder="1"
                                onChange={this.handleRepeatChange}
                            />
                        </label>

                        <div className="field">
                            <span>Weekly schedule</span>
                            <div className="week-grid">
                                {this.state.week.map(item => {
                                    const isActive = this.state.selected.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={`week-chip ${isActive ? "active" : ""}`}
                                            onClick={() => this.handleWeekChange(item.id)}
                                        >
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button className="btn ghost" onClick={this.props.hide} type="button">
                            Cancel
                        </button>
                        <button className="btn primary" onClick={this.handleConfirmButtonPressed} type="button">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

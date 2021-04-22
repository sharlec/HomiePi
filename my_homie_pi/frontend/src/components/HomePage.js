import React, { Component } from "react";
import ProfilePage from "./ProfilePage";
import TaskPage from "./TaskPage";
import RegisterPage from "./RegisterPage"
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return( <Router>
            <Switch>
                <Route exact path='/'><p>This is the Home Page</p></Route>
                <Route path='/profile/:user_name' component={ProfilePage} />
                <Route path='/task' component={TaskPage} />
                <Route path='/register' component={RegisterPage} />
            </Switch>
            </Router>
            );
    }
}
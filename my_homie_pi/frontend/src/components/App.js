import React, { Component } from "react";
import {render} from "react-dom";
import HomePage from "./HomePage.js";


export default class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(<div>
            <HomePage/>
        </div>)
    }
}

const appDiv = document.getElementById('App')
render(<App />, appDiv);
import React, { Component } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';


export default class ExportItem extends Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick = () => {
        this.props.handleExport();
    }
    
    render() {
        return (
            <Button style={{marginLeft: '10px'}}  onClick={this.handleOnClick}>Export as .json</Button>
        )    
    }
}


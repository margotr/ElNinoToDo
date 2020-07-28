import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: ''
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            title: this.state.title,
            description: this.state.description
        }

        this.props.handleOnAdd(item);
        this.props.history.push('/index');
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.onChangeTitle}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={this.onChangeDescription}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
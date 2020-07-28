import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class EditItem extends Component {

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

    componentDidMount() {
        Axios.get('http://localhost:4200/items/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({ title: response.data.title, description: response.data.description });
            })
            .catch(function (error) {
                console.log(error);
            })
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

        this.setState({
            title: '',
            description: ''
        })

        this.props.handleOnUpdate(this.props.match.params.id, item);
        this.props.history.push('/index');
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.onChangeTitle} placeholder={this.state.title}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" onChange={this.onChangeDescription} placeholder={this.state.description}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
            </Form>
        )
    }
}
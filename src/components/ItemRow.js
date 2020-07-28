import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Axios from 'axios';


class ItemRow extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete = () => {
        this.props.onDelete();
    }

    render() {
        return (
            <tr>
                <td>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox"/>
                    </Form.Group>
                </td>
                    <td>
                        {this.props.obj.title}
                    </td>
                    <td>
                        {this.props.obj.description}
                    </td>
                    <td>
                        <Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
                    </td>
                    <td>
                        <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
                    </td>
            </tr>
        );
    }
}

export default ItemRow;
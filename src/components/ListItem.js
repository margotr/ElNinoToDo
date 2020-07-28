import React, { Component } from 'react';
import ItemRow from './ItemRow'
import ExportItem from './ExportItem'
import { Container, Button } from 'react-bootstrap'

export default class ListItem extends Component {

    constructor(props) {
        super(props);

        // this.handleOnUpdate = this.handleOnUpdate.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }

    componentDidMount() {
        console.log('list item loaded')
        console.log(this.props.items)
    }

    itemRow = () => {
        var that = this;
        return this.props.items.map(function (object, i) {
            return <ItemRow obj={object} key={i} onDelete={() => that.handleOnDelete(object)} onUpdate={that.handleOnUpdate} />
        })
    }

    // handleOnUpdate() {
    //     this.props.handleOnUpdate();
    // }

    handleOnDelete = (object) => {
        console.log('deleting from ListItem.js')
        this.props.handleOnDeleteInApp(object._id);
    }

    handleExport() {
        console.log('Exporting:')
        console.log(this.props.items)

        var exportable = this.props.items.map(item => ({
            title: item.title, description: item.description
        }))

        window.open(URL.createObjectURL(
            new Blob([JSON.stringify(exportable)], {
                type: 'application/binary'
            }
            )
        ))
    }

    render() {
        return (
            <Container>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Done? </td>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Actions</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemRow()}
                    </tbody>
                </table>
                    <Button variant="success" href='/add'>Add Item</Button>
                    <ExportItem handleExport={this.handleExport} />

            </Container>
        )
    }
}
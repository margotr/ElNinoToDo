import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap'
import Axios from 'axios';
import logo from './logo-elnino.svg'

import './App.scss';

import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import ListItem from './components/ListItem';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{ "_id": { "$oid": "5f1fda0169e133382277a4ef" }, "title": "Blabla", "description": "adfadfd211233", "__v": 0 }]
    }

    this.handleOnUpdate = this.handleOnUpdate.bind(this);
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:4200/items')
      .then(res => {
        this.setState({ items: res.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleChange() {
    Axios.get('http://localhost:4200/items')
      .then(res => {
        this.setState({ items: res.data })
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  handleOnAdd(item) {
    Axios.post('http://localhost:4200/items/add/', item)
      .then(res => console.log(res.data))
      .then(() => this.handleChange())
    }

  handleOnUpdate(id, item) {
    Axios.post('http://localhost:4200/items/update/' + id, item)
      .then(res => console.log(res.data))
      .then(() => this.handleChange())

  }

  handleOnDelete(id) {
    Axios.get('http://localhost:4200/items/delete/' + id)
      .catch(err => console.log(err))
      .then(() => this.handleChange())
  }

  render() {
    return (
      <Router>
        <Navbar style={{ padding: "5px" }} bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Text>
            Amazing To Do App
          </Navbar.Text>

          <Nav.Link as={Link} to="/index">List</Nav.Link>
          <Nav.Item>
            <a href="http://www.margotrutgers.nl">About Me</a>
          </Nav.Item>
        </Navbar>

        <Container style={{ marginTop: 50 }}>
          <Switch>
            <Route exact path='/' component={ListItem} />
            <Route exact path='/add' render={(props) => <AddItem {...props} handleOnAdd={(item) => this.handleOnAdd(item)} />} />
            <Route path='/edit/:id' render={(props) => <EditItem {...props} handleOnUpdate={(id, item) => this.handleOnUpdate(id, item)} />} />
            <Route path='/index' render={(props) => <ListItem {...props} handleOnDeleteInApp={(id) => this.handleOnDelete(id)} items={this.state.items} />} />
          </Switch>
        </Container>

      </Router>
    );
  }
}

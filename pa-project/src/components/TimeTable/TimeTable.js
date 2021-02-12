import React, { Component } from "react";
import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import { Button } from 'antd';
import axios from "axios";
import Header from "../Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {v4 as uuid} from "uuid";


const SList = props => (
    <tr>
                   <td>{props.data.time}</td>
                   <td>{props.data.task}</td>
     </tr>
 )
 

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false,
    timetable: []
  };
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false
    });
  };
  clearList = () => {
    this.setState({
      items: []
    });
  };
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };
  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);

    console.log(selectedItem);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    });
  };

  getTimeTable = async() => {    
    const data = {
        todos : this.state.items,
    };
    console.log('get prediction');
    console.log(data.todos);
    await axios.post('http://localhost:5000/getTimeTable', data)
    .then(response => {
            console.log("inside res")
            console.log(response.data);
            this.setState({
                timetable: response.data
            })
    })
    .catch(error => {
        console.log(error.response);
    });
    }

    troublesListf() {
        // filter(book => book.shelf === shelf)
         return this.state.timetable.map(
             function(data, i) {
                 return <SList data = {data} key={i} />;
             }
         )
     }
  

  render() {
    return (
        <div>
        <Header/>

      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">Enter All Todos of Next Day</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
            <Button type="primary" onClick={this.getTimeTable}>Create TimeTable</Button>
            <table className = 'table table-striped' style={{marginTop: 20}}>
                      <thead>
                          <tr>
                            <th>Time  </th>
                              <th>Task </th>                              
                          </tr>
                      </thead>
                      <tbody>
                        {this.troublesListf()}
                      </tbody>
                  </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;

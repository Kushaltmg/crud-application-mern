import React, { Component } from 'react';
import axios from "axios";

class CreateUser extends Component {
    constructor(props){
        super();
        this.state = {
            name: ""
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e) {
        this.setState({ name: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
       
        this.setState({
            name: ''
        })
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default CreateUser;
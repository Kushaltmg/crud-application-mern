import React, { Component } from 'react';
import axios from "axios";

class CreateForm extends Component {

    constructor(props){
        super();
        this.state = {
            name: "",
            contact: "",
            address: "",
            email: "",
            users: []
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(user => user.name),
                        name: response.data[0].name
                    });
                }
            })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value})
    }
    onChangeContact(e) {
        this.setState({ contact: e.target.value})
    }
    onChangeAddress(e) {
        this.setState({ address: e.target.value})
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        const form = {
            name: this.state.name,
            contact: this.state.contact,
            address: this.state.address,
            email: this.state.email
        }

        console.log(form);

        axios.post('http://localhost:5000/forms/add', form)
            .then(res => console.log(res.data));

        window.location = "/";
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>Create Form Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName} >
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Contact: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.contact}
                            onChange={this.onChangeContact}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Form Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default CreateForm;
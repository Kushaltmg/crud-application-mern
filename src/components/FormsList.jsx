import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Form = props => (
    <tr>
        <td>{props.form.name}</td>
        <td>{props.form.contact}</td>
        <td>{props.form.address}</td>
        <td>{props.form.email}</td>
        <td>
            <button className="btn btn-secondary"><Link to={"/edit/"+props.form._id} style={{color:"white"}}>Update</Link></button> | <button className="btn btn-danger" onClick={() => {props.deleteForm(props.form._id) }}>Delete</button>
        </td>
    </tr>
)

class FormsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: []
        }

        this.deleteForm = this.deleteForm.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/forms/')
            .then(res => {
                this.setState({ forms: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteForm(id) {
        axios.delete('http://localhost:5000/forms/' +id)
            .then(res => console.log(res.data));

        this.setState({ forms: this.state.forms.filter(el => el._id !== id)})
    }

    formsList() {
        return this.state.forms.map(currentform => {
            return <Form form={currentform} deleteForm={this.deleteForm} key={currentform._id} />
        })
    }

    render() { 
        return ( 
            <div className="container">
                <h3>Logged Form Data</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.formsList()}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default FormsList;
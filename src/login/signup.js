import React, { Component } from 'react';
import { Label, FormGroup, Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';

/*
    Sign up page for an non-existing user. Accounts that are created are stored on firebase.
*/
export class SignUpMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: ""
        }
    }

    handleEmailChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            email: changeValue
        });
    }

    handlePasswordChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            password: changeValue
        });
    }

    handleUsernameChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            userName: changeValue
        });
    }

    render() {
        return (
            <main className="signup-main">
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" onChange={this.handleEmailChange} placeholder="Input Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" onChange={this.handlePasswordChange} placeholder="Input Password (Max 16 Characters)" maxLength="16" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userName">User Name</Label>
                        <Input type="text" name="userName" id="userName" onChange={this.handleUsernameChange} placeholder="Create User Name (Max 16 Characters)" maxLength="16" />
                    </FormGroup>
                    <span className="btn btn-warning adjustSpace" aria-label="Create Profile">
                        <Link to="/" onClick={() => {this.props.adoptCallback(this.state.email, this.state.password, this.state.userName)}} className="button-link">Create Profile</Link>
                    </span>
                    <span className="btn btn-warning adjustSpace" aria-label="Back to Home">
                        <Link to="/" className="button-link">Back To Home</Link>
                    </span>
                </Form>
            </main>
        );
    }
}
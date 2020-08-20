import React, { Component } from 'react';
import { Label, FormGroup, Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';

/*
    Sign In Page for an existing user.
*/
export class SignInMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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

    render() {
        return (
            <main className="signup-main">
                <Form>
                    <FormGroup>
                        <Label for="loginEmail">Email</Label>
                        <Input type="email" name="email" id="loginEmail" onChange={this.handleEmailChange} placeholder="Input Email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginPassword">Password</Label>
                        <Input type="password" name="password" id="loginPassword" onChange={this.handlePasswordChange} placeholder="Input Password" maxLength="16" />
                    </FormGroup>
                    <span className="btn btn-warning adjustSpace" aria-label="Sign In">
                        <Link to="/" onClick={() => this.props.adoptCallback(this.state.email, this.state.password)} className="button-link">Sign In</Link>
                    </span>
                    <span className="btn btn-warning adjustSpace" aria-label="Back to Home">
                        <Link to="/" className="button-link">Back to Home</Link>
                    </span>
                </Form>
            </main>
        );
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
    Profile Page that takes a prop of user data that lets them see their basic account
    information. Here, they can also sign out of the application.
*/
export class ProfileMain extends Component {

    render() {

        let content = "";
        if (this.props.user) {
            content = (
                <main className="signup-main">
                    <div className="profile-container">
                        <h1 className="profile-heading">{"UserName: " + this.props.user.displayName}</h1>
                        <h2 className="profile-heading">{"Email: "+ this.props.user.email}</h2>
                        <div className="profile-heading">{"Last Signed In: " + this.props.user.metadata.lastSignInTime}</div>
                        <div className="profile-heading">{"Account Created: " + this.props.user.metadata.creationTime}</div>
                        <span className="btn btn-warning" id="signUp" aria-label="Sign In">
                            <Link to="/" className="button-link" onClick={() => this.props.signOut()}>Sign Out</Link>
                        </span>
                    </div>
                </main>
            );
        }
        return content;
    }
}
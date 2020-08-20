import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import { EventMain } from "./events/EventMain";
import { CreateCarousel } from "./carousel/Carousel";
import { SignUpMain } from "./login/signup";
import { SignInMain } from "./login/signin";
import { ProfileMain } from "./login/profile";
import { MapMain } from "./map/MapMain";
import { GroupMain } from "./groups/groupMain";
import './index.css';
import firebase from 'firebase/app';

/*
     App that establishes the routing for the single page application
     using client side routing.
*/
class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          loggedIn: false
        };
    }

    handleSignUp = (email, password, userName) => {
        this.setState({errorMessage: null});
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                let user = userCredentials.user;
                let result = user.updateProfile({
                    displayName: userName
                });
                let userObj = {};
                userObj["username"] = userName;
                userObj["email"] = email;
                userObj["uid"] = user.uid;
                let usersDB = firebase.database().ref("/users");   
                usersDB.push(userObj);
                return result;
            })
            .catch((error) => { 
                alert(error.message + " Please try to sign in again!");
                this.setState({
                    errorMessage: error.message
                })
            });
    }
    
    handleSignIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
            alert("Username does not exist or username and password do not match");
        });
        this.setState({loggedIn:true});
        console.log(this.state.loggedIn);
    }

    handleSignOut = () => {
        firebase.auth().signOut()
        .catch(err => console.log(err));
        alert("signed out");
        this.setState({
            user: null,
            loggedIn: false
        })
    }

    componentDidMount() {
        this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({
                    user: firebaseUser,
                    loggedIn: true
                })
            } else {
                this.setState({
                    user: null,
                    loggedIn: false
                })
            }
        });                 
    }

    componentWillUnmount() {
        this.authUnRegFunc();
    }

    render() {
        return (
            <Router>
            <div>
                <header>
                    <NavBar loggedIn={this.state.loggedIn}/>
                </header>
                    <Switch>
                        <Route
                            exact path='/'
                            render={(props) => <IndexBody {...props} loggedIn={this.state.loggedIn}/>}
                        />
                        <Route path='/events' component={EventMain} />
                        <Route
                            path='/groups'
                            render={(props) => <GroupMain {...props} loggedIn={this.state.loggedIn}/>}
                        />
                        <Route path='/map' component={MapMain} />
                        <Route
                            path='/profile'
                            render={(props) => <ProfileMain {...props} user={this.state.user} signOut={this.handleSignOut}/>}
                        />
                        <Route
                            path='/login'
                            render={(props) => <SignInMain {...props} adoptCallback={this.handleSignIn}/>}
                        />
                        <Route
                            path='/register'
                            render={(props) => <SignUpMain {...props} adoptCallback={this.handleSignUp}/>}
                        />
                        <Redirect to ='/' />
                    </Switch>
                <footer>
                    <address>2020 © Trey Michaels, Jordan Auerbach, Peach Saengcharoentrakul, Angel Lin</address>
                </footer>
            </div>
            </Router>
        );
    };
}

/*
    NavBar used throughout the application. Includes links to other pages.
*/
class NavBar extends Component {
    render() {
        return (
            <nav className="navigation-bar">
                <div className="nav-group">
                    <NavLink to="/" className="navigation-link">Home</NavLink>
                </div>
                <div className="nav-group">
                    <NavLink to="/events" className="navigation-link">Events</NavLink>
                    <NavLink to="/map" className="navigation-link">Map</NavLink>
                    <NavLink to="/groups" className="navigation-link">Groups</NavLink>
                    {this.props.loggedIn ? <NavLink to="/profile" className="navigation-link">Profile</NavLink> : <NavLink to="/login" className="navigation-link">Sign-In</NavLink>}
                </div>
            </nav>
        );
    }
}

class NavBar2 extends Component {
    
}

/*
    Body for the main home page.
 */
class IndexBody extends Component {

    render() {
        return (           
            <main className="indexMain">
                <section className="info">
                    <div>
                        <h1 className="home-title">Welcome to PlanMe!</h1>
                        <h2 className={this.props.loggedIn ? "hidden" : "home-subtitle"}>Sign Up to Create Your Own Groups!</h2>
                    </div>
                    <CreateCarousel ride={false}/>
                    <div className="button-group">
                        <span id="signUp" className={this.props.loggedIn ? "hidden" : "btn btn-warning"} aria-label="Sign Up">
                            <Link to="/register" className="button-link">Sign-Up</Link>
                        </span>
                        <span id="findEvents" className="btn btn-warning" aria-label="Find Events">
                            <Link to="/events" className="button-link">Find Events</Link>
                        </span>
                    </div>
                </section>
            </main>
        );
    }
}

export default App;
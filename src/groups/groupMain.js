import React, { Component } from 'react';
import CreateCard from "./groupCard";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";
import firebase from 'firebase/app';


/*
    Groups Main class which connects to firebase to access the groups that have previously been created.
    Users can also access input fields that enable them to create new groups if they so desire that can be seen
    by any other user. Generates a specific number of group cards based on how many groups has been created.
*/
export class GroupMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addGroup: false,
            title: "",
            subtitle: "",
            desc: "",
            location: "",
            time: "",
            validated: true,
            imgURL: '',
            day: 'Monday'
        }
    }

    switchToGroupView = () => {
        this.setState({addGroup:!this.state.addGroup});
    }

    makeGroup = () => {
        let group = {
            title: this.state.title,
            subtitle: this.state.subtitle,
            desc: this.state.desc,
            location: this.state.location,
            time: this.state.time,
            imgURL: this.state.imgURL || '../img/default-pic.png',
            day: this.state.day
        }
        if (this.state.title === "" || this.state.desc === "" || this.state.location === ""
        || this.state.time === "" || this.state.subtitle === "") {
            alert("You need to fill out all the required fields!");
            this.setState({validated:false});
        } else {
            let groupDB = firebase.database().ref("/groups");
            groupDB.push(group);
            this.setState({
                addGroup:!this.state.addGroup,
                title: "",
                subtitle: "",
                desc: "",
                location: "",
                time: "",
                validated: true,
                imgURL: '',
                day: ''
            });   
        }
    }
    
    handleChange = (event) => {
        let val = event.target.value;
        this.setState({
            [event.target.name]: val
        });
    }

    componentDidMount() {
        firebase.database().ref("/groups").on("value", (snapshot) => {
            let data = snapshot.val();
            let groupKeys = Object.keys(data);
            let cardMap = groupKeys.map((groupKey) => {
                return <CreateCard key={groupKey} data={data[groupKey]} />
            });
            
            this.setState({
                groups: cardMap,
            });
        });
    }

    render() {
        return (
            <main className="groups-main">
                <section className="flex-item">
                    <h1 className="group-title">Groups</h1>
                    <div className={this.props.loggedIn ? "" : "hidden"}>
                        <Button className={this.state.addGroup ? "hidden" : "btn-warning"} onClick={this.switchToGroupView}>Create New Group</Button>
                    </div>
                </section>
                <div className={this.state.addGroup ? "hidden" : "flex-container"}>
                    {this.state.groups}
                </div>
                <div className={this.state.addGroup ? "flex-item" : "hidden"}>
                    <Form>
                        <FormGroup>
                            <Label for="input Title required">Title*</Label>
                            <Input type="text" name="title" id="title" className={this.state.validated ? "" : "required"} value={this.state.title} onChange={this.handleChange} placeholder="Input Title" maxLength="15"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input Subtitle required">Subtitle*</Label>
                            <Input type="text" name="subtitle" id="subtitle" className={this.state.validated ? "" : "required"} value={this.state.subtitle} onChange={this.handleChange} placeholder="Input Subtitle" maxLength="20"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input Description required">Description*</Label>
                            <Input type="textarea" name="desc" id="desc" className={this.state.validated ? "" : "required"} value={this.state.desc} onChange={this.handleChange} placeholder="Input Description" maxLength="140" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="input Location required">Location*</Label>
                            <Input type="text" name="location" id="location" className={this.state.validated ? "" : "required"} value={this.state.location} onChange={this.handleChange} placeholder="Input Location" maxLength="100"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input Time required">Meeting Time*</Label>
                            <Input type="time" name="time" id="time" className={this.state.validated ? "" : "required"} value={this.state.time} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="input Day to meet">Day*</Label>
                            <Input type="select" name="day" id="day" className={this.state.validated ? "" : "required"} value={this.state.day} onChange={this.handleChange} placeholder="Input Location" maxLength="10">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="groupPhoto">Group Photo</Label>
                            <Input type="text" name="imgURL" id="groupPhoto" value={this.state.imgURL} onChange={this.handleChange} placeholder="URL of photo" />
                        </FormGroup>
                    </Form>
                    <Button className="btn-warning adjustSpace" onClick={this.makeGroup}>Confirm New Group</Button>
                    <Button className="btn-warning adjustSpace" onClick={this.switchToGroupView}>Back to Groups</Button>
                </div>
            </main>
        )
    }
}
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap'
import { EventList } from "./EventList";
import { CalendarMain } from "./Calendar";
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

/*
    Contains both the calendar view and the event list view, makes an API call to 'Eventful'
    to find events based on user queries from the input fields. Only pulls 10 results at a time.
    Events can be displayed both in calendar view and list view. List view enables users to also 
    view extra information by selcting the "Read More" button associated with it.
*/
export class EventMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationValue: "Seattle",
            keywordValue: "",
            dateValue: "",
            data: [],
            modalOpen: false,
            listHidden: false,
            loading: true
            
        }
    }

    handleLocationChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            locationValue: changeValue,
            loading: false
        });
    }

    handleKeyChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            keywordValue: changeValue,
            loading: false
        });
    }

    handleDateChange = (event) => {
        let inputElement = event.target;
        let changeValue = inputElement.value;
        this.setState({
            dateValue: changeValue,
            loading: false
        });
    }

    toggleCalendar = () => {
        this.setState({
            listHidden: !this.state.listHidden
        })
    }

    handleClick = () => {
        this.componentDidMount();
    }

    componentDidMount() {
        let corsHeader = "https://cors-anywhere.herokuapp.com/";
        let base_url = "http://api.eventful.com/json/events/search?";
        let locationQuery = "l=" + this.state.locationValue;
        let keywordQuery = "q=" + this.state.keywordValue + "&";
        let dateQuery = "date=" + this.state.dateValue + "&";
        if (this.state.keywordValue !== "") {
            locationQuery = keywordQuery + locationQuery;
        }
        if (this.state.dateValue !== "") {
            locationQuery  = dateQuery + locationQuery;
        }
        this.setState({loading:true});
        let authorization = "&app_key=RTPqhKxFt2HhNBBm";
        fetch(corsHeader + base_url + locationQuery + authorization)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.events) {
                let newData = [];
                for (let i = 0; i < responseData.events.event.length; i++) {
                    let item = responseData.events.event[i];
                    newData.push(item);
                }
                this.setState({
                    data: newData,
                    loading: false
                })
            } else {
                this.setState({loading:false});
                alert("No Results Found! Previous data displayed");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        let content = null;

        if(this.state.loading) {
            content = (
              <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
              </div>
            );
            
            return (
                <main className="events-main">
                    <h1 className ="event-heading">Upcoming Events</h1>
                    <section className="container">
                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>L:</InputGroupText>
                            </InputGroupAddon>
                            <Input id="LocationInput" value={this.state.locationValue} onChange={this.handleLocationChange} placeholder="Input Location" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                K:
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input id="KeywordInput" value={this.state.keywordValue} onChange={this.handleKeyChange} placeholder="Input Keywords" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>D:</InputGroupText>
                            </InputGroupAddon>
                            <Input id="DateInput" value={this.state.dateValue} onChange={this.handleDateChange} placeholder="Input Name of Month"/>
                        </InputGroup>
                        <br />
                    </div>
                    <Button color="warning" size="md" id="search" aria-label="Search with Filters" onClick={this.handleClick}>Search With Filters</Button>
                    <Button color="warning" size="md" id="search" aria-label="Switch View" onClick={this.toggleCalendar}>Switch View</Button>
                    </section>
                    <section className="container list">
                        {content}
                    </section>
                </main>
            );
        } else {
            
            content = (
                <div>   
                    <EventList data={this.state.data} show={this.state.listHidden}/>
                    <CalendarMain events={this.state.data} show={this.state.listHidden}/>
                </div>
            );

            return (
                <main className="events-main">
                    <h1 className ="event-heading">Upcoming Events</h1>
                    <section className="container">
                    <div>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>L:</InputGroupText>
                            </InputGroupAddon>
                            <Input id="LocationInput" value={this.state.locationValue} onChange={this.handleLocationChange} placeholder="Input Location" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                K:
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input id="KeywordInput" value={this.state.keywordValue} onChange={this.handleKeyChange} placeholder="Input Keywords" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>D:</InputGroupText>
                            </InputGroupAddon>
                            <Input id="DateInput" value={this.state.dateValue} onChange={this.handleDateChange} placeholder="Input Name of Month"/>
                        </InputGroup>
                        <br />
                    </div>
                    <Button color="warning" size="md" id="search" aria-label="Search with Filters" onClick={this.handleClick}>Search With Filters</Button>
                    <Button color="warning" size="md" id="search" aria-label="Switch View" onClick={this.toggleCalendar}>Switch View</Button>
                    </section>
                    <section className="container list">
                        {content}
                    </section>
                </main>
            );
        }

        
    }
}
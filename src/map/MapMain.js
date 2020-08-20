import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

/*
    MapMain takes in a prop of data from the api call to Eventful to locate upcoming events on a leaflet map.
    Users can click on the marker to see the event name from the pop-up.
*/
export class MapMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationValue: "Seattle",
            markers: [],
            loading: true
        }
    }

    handleLocationChange = (event) => {
        let inputElement = event.target;
        let newValue = inputElement.value;
        this.setState({
            locationValue: newValue
        });
    }

    handleClick = () => {
        this.componentDidMount();
    }

    componentDidMount() {
        let corsHeader = "https://cors-anywhere.herokuapp.com/";
        let base_url = "http://api.eventful.com/json/events/search?";
        let locationQuery = "l=" + this.state.locationValue;
        let authorization = "&app_key=" + eventful_apikey;
        this.setState({loading:true});
        fetch(corsHeader + base_url + locationQuery + authorization)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                let positions = [];
                let popups = [];
                if (response.events) {
                    response.events.event.forEach((obj) => { 
                        positions.push([obj.latitude, obj.longitude]);
                        popups.push("[Event Name] " + obj.title + "\n[Venue Name] "+obj.venue_name + "\n[Event Time] "+ obj.start_time);
                    });   
                    let markers = []
                    for (let i = 0; i < positions.length; i++) {
                        let marker = {
                            position: positions[i],
                            popup: popups[i]
                        }
                        markers.push(marker)
                    }
    
                    this.setState({
                        markers: markers,
                        loading: false
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                    alert("No results found! Previous results displayed");
                }
            });
    }

    render() {
        let content = null;
        /*The default map view is set at downtown Seattle, with lat: 47 long:-122.*/
        let position = [47.620422, -122.349358];
        if (this.state.markers.length !== 0) {
            position = this.state.markers[0].position;
        }
        /*Import the OpenStreetMap tile.*/
        const attribution =
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        if(this.state.loading) {
            content = (
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>
            );

            return(
                <main className="events-main">
                    <h1 className ="event-heading">Upcoming Events</h1>
                    <section className="container">
                        <div>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>Location (City):</InputGroupText>
                                </InputGroupAddon>
                                <Input id="LocationInput" value={this.state.locationValue} onChange={this.handleLocationChange} placeholder="Input Location" />
                            </InputGroup>
                        </div>
                        <Button color="warning" size="md" className="adjustSpace" aria-label="Search" onClick={this.handleClick}>Search</Button>
                    </section>
                    <section className="map-position">
                        <div className={this.state.loading ? "map-container-empty" : "map-container"}>
                            {content}
                        </div>
                    </section>
                </main>
            );
        } else {
            content = (
                <Map center={position} zoom={9} style={{ width: '100%', height: '100%' }}>
                                <TileLayer
                                    url={tileUrl}
                                    attribution={attribution}
                                />

                                {this.state.markers.map((marker, idx) => 
                                    <Marker key={`marker-${idx}`} position={marker.position}>
                                        <Popup className="display-linebreak">
                                            {marker.popup}
                                        </Popup>
                                    </Marker>
                                )}
                            </Map>
            );
            return(
                <main className="events-main">
                    <h1 className ="event-heading">Upcoming Events</h1>
                    <section className="container">
                        <div>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>Location (City):</InputGroupText>
                                </InputGroupAddon>
                                <Input id="LocationInput" value={this.state.locationValue} onChange={this.handleLocationChange} placeholder="Input Location" />
                            </InputGroup>
                        </div>
                        <Button color="warning" size="md" className="adjustSpace" aria-label="Search" onClick={this.handleClick}>Search</Button>
                    </section>
                    <section className="map-position">
                        <div className = "map-container">
                            {content}
                        </div>
                    </section>
                </main>
            );
        }
    }
}

const eventful_apikey = "RTPqhKxFt2HhNBBm";



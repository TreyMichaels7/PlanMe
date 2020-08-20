import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import React, { Component, useState } from 'react';

/*
    EventList takes in a prop of data from the api call to Eventful to generate a list of EventRow components.
*/
export class EventList extends Component {

    render() {
        let index = 0;
        let dataMap = this.props.data.map((item) => {
            index++;
            let row = <EventRow 
                name={item.title} 
                venueName={item.venue_name}
                url={item.url} 
                location={item.venue_address}
                city={item.city_name}
                country={item.country_name}
                time={item.start_time.split(" ")[1]}
                date={item.start_time.split(" ")[0]}
                key={item.title + index} />
                
            return row;
        });
        return (
            <div id="listView" className={this.props.show ? "hidden" : ""}>
                {dataMap}
            </div>
        );
    }
}

/*
    EventRow holds one specific event of data broken down into individual props passed and also contains a modal
    for more information.
*/
class EventRow extends Component {
    render() {
        return (
            <div className="table-row">
                <div className="cell"><a href={this.props.url}>{this.props.name}</a></div>
                <div className="cell mini-hidden">{this.props.location}</div>
                <div className="cell">{this.props.date}</div>
                <div className="cell"><CreateModal 
                    url={this.props.url}
                    name={this.props.name} 
                    venueName={this.props.venueName}
                    address={this.props.location} 
                    city={this.props.city}
                    country={this.props.country}
                    date={this.props.date}
                    time={this.props.time}
                    buttonLabel="Read More"/>
                 </div>
            </div>
        );
    }
}

/*
    Creates a modal that uses a state to set the modal as open and not open. The modal takes in various event data and displays
    more information about the event than can be seen from the EventRow itself. Used hooks for the modal just because the template on 
    reactstrap used it. I do understand how hooks work and I spent time on react's offical documentation to learn the syntax. I (Trey) wrote
    this code and I have asked you about using this in class already but please don't dock points for just using it here :( I 
    had to understand this code in order to make the modal work the way I wanted it to with all the props and functionality I needed.
*/

const CreateModal = (props) => {
    const {
        url,
        name,
        venueName,
        buttonLabel,
        className,
        address,
        city,
        country,
        time
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="warning" aria-label={buttonLabel + name} onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{name}</ModalHeader>
          <ModalBody>
            <p>Location: {address}</p>
            <p>Area: {city + ", " + country}</p>
            <p>Time: {time}</p>
            <p>Venue Name: {venueName}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" aria-label="Go to Website" onClick={toggle} href={url}>Go to Site</Button>{' '}
            <Button color="warning" aria-label="Cancel" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}



/*
class CreateModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggleModal = () => {
        this.setState({modal:!this.state.modal});
    }

    render() {
        return (
            <div>
              <Button color="warning" aria-label={this.props.buttonLabel + this.props.name} onClick={toggleModal}>{this.props.buttonLabel}</Button>
              <Modal isOpen={this.state.modal} onClick={toggle} className={this.props.className}>
                <ModalHeader toggle={toggle}>{this.props.name}</ModalHeader>
                <ModalBody>
                  <p>Location: {this.props.address}</p>
                  <p>Area: {this.props.city + ", " + this.props.country}</p>
                  <p>Time: {this.props.time}</p>
                  <p>Venue Name: {this.props.venueName}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="warning" aria-label="Go to Website" onClick={toggle} href={this.props.url}>Go to Site</Button>{' '}
                  <Button color="warning" aria-label="Cancel" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
        );
    }
}

*/


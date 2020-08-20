import React, { Component } from 'react';
import { Button, Card, CardText, CardBody,
    CardTitle, CardSubtitle, CardImg} from 'reactstrap';
import '../index.css';


/*
    Group Card that contains brief descriptive information on the front 
    and extra info that can be seen if the user desires to see more on the back.
    Takes in a prop of group information.
*/
export default class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            frontClass: "card-front",
            backClass: "card-back hidden"
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        if (!this.state.isFlipped) {
            this.setState((prevState) => 
            ({isFlipped: !prevState.isFlipped,
                frontClass: "card-front hidden",
                backClass: "card-back"})
            )
        } else {
            this.setState((prevState) => 
            ({isFlipped: !prevState.isFlipped,
                frontClass: "card-front",
                backClass: "card-back hidden"})
            )
        }
    }

    render() {
        let data = this.props.data;

        return (
            <Card>
                <CardBody className={this.state.frontClass}>
                    <div>
                        <CardImg top width='100%' src={data.imgURL} alt={data.title} />
                        <CardTitle>{data.title}</CardTitle>
                        <CardSubtitle>{data.subtitle}</CardSubtitle>
                        <Button className="btn-warning" onClick={this.handleClick} aria-label={"Read more about " + data.title}>Read More</Button>
                    </div>
                </CardBody>
                <CardBody className={this.state.backClass}>
                    <div>
                        <CardText>Description: {data.desc}</CardText>
                        <CardText>Location: {data.location}</CardText>
                        <CardText>Day: {data.day}</CardText>
                        <CardText>Time: {data.time + " (Military Time)"}</CardText>
                        <Button className="btn-warning" onClick={this.handleClick} aria-label="Back">Back</Button>
                    </div>
                </CardBody>
            </Card>
        )
    }
}
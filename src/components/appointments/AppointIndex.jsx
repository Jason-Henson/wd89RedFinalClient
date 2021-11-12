import React from "react";
import { Redirect } from "react-router-dom"
import {Container, Row, Col} from 'reactstrap';
import AppointAll from "./AppointAll";


class AppointIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            myApp: []
         }
    }

    fetchApp = () =>  {
        fetch(`http://localhost:3000/appointment/all/`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': this.props.token,
          }),
        })
        .then((res) => res.json())
        .then((fetchResult) => {
            console.log(fetchResult);
            this.setState({
                myApp: fetchResult
            })
          })
          .catch((err) => console.log(err));
      };

      componentDidMount() {
        this.fetchApp()
      }

    render() { 
        return ( <>
            <Container>
                <Row>
                    <Col>
                        { !this.props.token && <Redirect to="/" />}
                        { this.state.myApp && <AppointAll myApp={this.state.myApp} token={this.props.token} fetchApp={this.fetchApp} />}
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </> );
    }
}
 
export default AppointIndex;
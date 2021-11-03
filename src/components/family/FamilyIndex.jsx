import React, {Component} from "react";
import {Container, Row, Col} from 'reactstrap';
import FamilyAll from "./FamilyAll";

class FamilyIndex extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            myFamily: []
         }
    }

    fetchFamily() {
        fetch(`http://localhost:3000/family/all/`, {
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
                myFamily: fetchResult
            })
          })
          .catch((err) => console.log(err));
      };

      componentDidMount() {
        this.fetchFamily()
      }

    render() { 
        return ( <>
            <Container>
                <Row>
                    <Col>
                        <FamilyAll myFamily={this.state.myFamily} token={this.props.token} fetchFamily={this.fetchFamily}/>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </> );
    }
}
 
export default FamilyIndex;
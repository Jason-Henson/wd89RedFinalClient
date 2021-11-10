import React from "react";
import {Container, Row, Col} from 'reactstrap';
import MedsAll from "./MedsAll";


class MedsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            myMeds: [],
         }
    }

    fetchApp=()=> {
        fetch(`http://localhost:3000/meds/all/`, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            'Authorization': this.props.token,
          }),
        })
        .then((res) => res.json())
        .then((fetchResult) => {
            this.setState({myMeds: fetchResult})
            console.log("fetch results from med all",fetchResult, "myMeds from MedIndex: ", this.myMeds) })
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
                        <MedsAll myMeds={this.state.myMeds} token={this.props.token} fetchApp={this.fetchApp} />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </> );
    }
}
 
export default MedsIndex;
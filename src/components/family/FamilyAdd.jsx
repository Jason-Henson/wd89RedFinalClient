import React from "react";
import { Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import FamilyIndex from "./FamilyIndex";


class FamilyAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      famMember: "",
      famAge: "",
      famAllergic: false,
      user: { id: "" },
      UserId: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/family/add`, {
      method: "POST",
      body: JSON.stringify({
        family: {
          famMember: this.state.famMember,
          famAge: this.state.famAge,
          famAllergic: this.state.famAllergic ?? false,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token, 
      }),
    })
      .then((res) => res.json())
      .then((fetchResult) => {
        console.log(fetchResult);
      })
      .catch((err) => console.log(err));
  };

  redirectToFamilyIndex = () => {
    return <Redirect to="/" token={this.props.sessionToken} />
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={true}
          backdrop={false}
          centered
          fade={false}
          fullscreen
          scrollable
        >
          <ModalHeader>
            Add Family Member Information
          </ModalHeader>
          <ModalBody>
          <Form>
          <h1>Add Family Members</h1>
          <FormGroup>
            <Input
              type="text"
              name="famMember"
              id="userName"
              placeholder="Family Member Name"
              value={this.state.famMember}
              onChange={(e) =>
                this.setState({ famMember: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="famAge"
              id="famAge"
              placeholder="Age"
              value={this.state.famAge}
              onChange={(e) => this.setState({ famAge: e.target.value })}
            />
          </FormGroup>
          <FormGroup 
          check
          name="famAllergic"
          id="famAllergic"
          value={this.state.famAllergic}
          onClick={(e) => this.setState({ famAllergic: true })}
          >
          <Label>Allergies?</Label><Input type="checkbox" />
          </FormGroup>
          <Button color="primary" onClick={this.handleSubmit}>Add</Button>
          <Button color="secondary" onClick={this.redirectToFamilyIndex}>Cancel</Button>
        </Form>
          </ModalBody>
        </Modal>
        </div>
    );
  }
}

export default FamilyAdd;

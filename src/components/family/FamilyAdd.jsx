import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


class FamilyAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      famMember: "",
      famAge: "",
      famAllergic: false,
      user: { id: ""},
      UserId: "", 
    }
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem('token')})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    debugger
    fetch(`http://localhost:3000/family/add`, {
      method: "POST",
      body: JSON.stringify({
        family: {
          famMember: this.state.famMember,
          famAge: Number(this.state.famAge),
          famAllergic: this.state.famAllergic ?? false,
          userId: localStorage.id
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.token, // need to fix this
      }),
    })
      .then((res) => res.json())
      .then((fetchResult) => {
        console.log(fetchResult);
      })
      .catch(err => console.log(err) )
      };

  render() {
    return (
      <div>
          <h1>Add Family Members</h1>
        <Form>
          <FormGroup>
            <Label for="famMember">Family Member Name</Label>
            <Input
              type="text"
              name="famMember"
              id="userName"
              placeholder="User name"
              value={this.state.famMember}
              onChange={(e) => console.log(this.setState({ famMember: e.target.value }))}
            />
          </FormGroup>
          <FormGroup>
            <Label for="famAge">Age</Label>
            <Input
              type="text"
              name="famAge"
              id="famAge"
              placeholder="Age"
              value={this.state.famAge}
              onChange={(e) => this.setState({ famAge: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <DropdownButton id="famAllergic" title="Allergic" value={this.state.famAllergic}>
              <Dropdown.ItemText>Allergic</Dropdown.ItemText>
              <Dropdown.Item
                as="button"
                onChange={(e) => {e.preventDefault(); this.setState({ famAllergic: true })}}
              >
                Yes
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                onChange={(e) => {e.preventDefault();this.setState({ famAllergic: false })}}
              >
                No
              </Dropdown.Item>
            </DropdownButton>
          </FormGroup>
          <Button onClick={this.handleSubmit}>Add Family</Button>
        </Form>
      </div>
    );
  }
}

export default FamilyAdd;

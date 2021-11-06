import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";


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
              onChange={(e) =>
                console.log(this.setState({ famMember: e.target.value }))
              }
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
          <FormGroup 
          check
          name="famAllergic"
          id="famAllergic"
          value={this.state.famAllergic}
          onClick={(e) => this.setState({ famAllergic: true })}
          >
          <Label>Allergies?</Label><Input type="checkbox" />
          </FormGroup>
          <Button onClick={this.handleSubmit}>Add Family</Button>
        </Form>
      </div>
    );
  }
}

export default FamilyAdd;

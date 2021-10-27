import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      passWord: "",
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassWordChange = this.handlePassWordChange.bind(this)
  }

  handleUserNameChange(e) { 
    this.setState({ userName: e.target.value });
    console.log(this.state.userName)
  }

 handleEmailChange(e) {
    this.setState({ email: e.target.value });
    console.log(this.state.email)
  }

  handlePassWordChange(e) {
    this.setState({ passWord: e.target.value });
    console.log(this.state.passWord)
  }

  // user: { userName: this.state.userName, email: this.state.e, passwordhash: this.state.passWord },

  handleSubmit = async () => {
    const response = await fetch(`http://localhost:3000/user/create`, {
      method: "POST",
      body: JSON.stringify({user: { userName: this.state.userName, email: this.state.e, passwordhash: this.state.passWord }}),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const fetchResult = await response.json()
    // this.props.updateToken(data.sessionToken)
    console.log(fetchResult)

  }
  
  render() {
    return (
      <div>
        <h1>Hello From Signup</h1>
        <Form>
        <FormGroup>
        <Label for="exampleEmail">User Name</Label>
        <Input type="text" name="userName" id="userName" placeholder="User name" onChange={this.handleUserNameChange} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="email" placeholder="email" onChange={this.handleEmailChange} />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="passWord" name="passWord" id="passWord" placeholder="Password" onChange={this.handlePassWordChange}  />
      </FormGroup>
      <Button onClick={this.handleSubmit}>Sign Up</Button>
    </Form>
      </div>
    );
  }
}
export default Signup;

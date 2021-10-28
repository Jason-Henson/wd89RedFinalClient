import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      passWord: "",
      sessionToken: "",
    };

    // this.handleUserNameChange = this.handleUserNameChange.bind(this)
    // this.handleEmailChange = this.handleEmailChange.bind(this)
    // this.handlePassWordChange = this.handlePassWordChange.bind(this)
  }

  // sessionToken = this.props.sessionToken

  //
//   handleUserNameChange(e) { 
//     this.setState({ userName: e.target.value });
//     console.log(this.state.userName)
//   }

//  handleEmailChange(e) {
//     this.setState({ email: e.target.value });
//     console.log(this.state.email)
//   }

//   handlePassWordChange(e) {
//     this.setState({ passWord: e.target.value });
//     console.log(this.state.passWord)
  // }

  // user: { userName: this.state.userName, email: this.state.e, passwordhash: this.state.passWord },

  handleSubmit = () => {
    fetch(`http://localhost:3000/user/create`, {
      method: "POST",
      body: JSON.stringify({user: { userName: this.state.userName, email: this.state.email, passwordhash: this.state.passWord }}),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
   
    })
    .then((res) => res.json())
    .then((fetchResult) => {
      this.props.updateToken(fetchResult.sessionToken)
      console.log(fetchResult)
    })
   

  }
  
  render() {
    return (
      <div>
        <h1>Hello From Signup</h1>
        <Form>
        <FormGroup>
        <Label for="exampleEmail">User Name</Label>
        <Input type="text" name="userName" id="userName" placeholder="User name" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="passWord" name="passWord" id="passWord" value={this.state.passWord} placeholder="Password" onChange={(e) => this.setState({passWord: e.target.value})} />
      </FormGroup>
      <Button onClick={this.handleSubmit}>Sign Up</Button>
    </Form>
      </div>
    );
  }
}
export default Signup;

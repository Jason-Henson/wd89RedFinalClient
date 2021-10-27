import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class Login extends Component {
    constructor(props) {
      
      super(props);
      this.state = {
        userName: "",
        passWord: "",
      };
  
      this.handleUseNameChange = this.handleUseNameChange(this);
      this.handlePasswordhashChange = this.handlePasswordhashChange(this);
  
      const handleUseNameChange = (e) => {
        this.setState({ userName: e.target.value });
        console.log(this.state.value)
      }
  
      const handlePasswordhashChange = (e) => {
        this.setState({ userName: e.target.value });
        console.log(this.state.value)
      }
    }
  
    render() {  
  
      return (
        <div>
          <h1>Hello From Signup</h1>
          <Form>
          <FormGroup>
          <Label for="exampleEmail">User Name</Label>
          <Input type="text" name="userName" id="userName" placeholder="User name" onChange={this.handleUseNameChange} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="passwordhash" name="passwordhash" id="passwordhash" placeholder="Password" onChange={this.handlePasswordhashChange} />
        </FormGroup>
        <Button>Sign Up</Button>
      </Form>
        </div>
      );
    }
  }
export default Login;


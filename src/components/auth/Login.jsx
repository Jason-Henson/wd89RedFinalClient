import React, { Component } from "react";
import { Button, Form, FormGroup,  Input } from "reactstrap";

class Login extends Component {
    constructor(props) {
      
      super(props);
      this.state = {
        userName: "",
        passWord: "",
        sessionToken: "", 
      };
    }

    handleSubmit = () => {
      fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({user: { userName: this.state.userName, passwordhash: this.state.passWord }}),
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
          <h1>Login</h1>
          <Form>
          <FormGroup>
          <Input type="text" name="userName" id="userName" placeholder="User name" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Input type="passwordhash" name="passwordhash" id="passwordhash" placeholder="Password" value={this.state.passWord} onChange={(e) => this.setState({passWord: e.target.value})} />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Login</Button>
      </Form>
        </div>
      );
    }
  }
export default Login;


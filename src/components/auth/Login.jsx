import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
        this.props.logInToggle()
        console.log(fetchResult)
        this.checkLogIn()
      })
    }
  
    render() {  
  
      return (
        <div className="Login">
          <h1>Login</h1>
          <Form>
          <FormGroup>
          <Input type="text" name="userName" id="userName" placeholder="User name" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="passwordhash" id="passwordhash" placeholder="Password" value={this.state.passWord} onChange={(e) => this.setState({passWord: e.target.value})} />
        </FormGroup>
        <Button onClick={this.handleSubmit} align="center">Login</Button>
      </Form>
      { this.props.isLoggedIn && <Redirect to="/appointmentindex" />}
        </div>
      );
    }
  }
export default Login;


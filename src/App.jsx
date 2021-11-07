import React, { Component } from "react";
import Login from "./components/auth/Login";
import AppointIndex from "./components/appointments/AppointIndex";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem('token') || "" // assigns token from local storage or give empty string
    }
  }
  
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem('token')})
    }
  }

  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({sessionToken: newToken})
    console.log(this.sessionToken);
  };
 
  clearToken = () => {
    localStorage.clear()
    this.setState({sessionToken: ""})
  };

  render() {  
    return (
      <div>
        <h1>My Med Minder</h1>
        {/* <Signup updateToken={this.updateToken}/> */}
        <Login updateToken={this.updateToken} />
        {/* <FamilyIndex updateToken={this.updateToken} token={this.state.sessionToken}/> */}
        {/* <AppointAdd updateToken={this.updateToken} token={this.state.sessionToken}/> */}
        <AppointIndex updateToken={this.updateToken} token={this.state.sessionToken}/>
      </div>
    )
  }
}
export default App; 
import React, { Component } from "react";
// import Login from './components/auth/Login';
import Signup from './components/auth/Signup';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: "",
    }
  }
  
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: ""})
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
        <Signup updateToken={this.updateToken}/>

      </div>
    )
  }
}
export default App; 
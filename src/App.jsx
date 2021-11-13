import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NavBar from "./components/nav/NavBar";
import SplashPage from "./components/auth/SplashPage";
import AppointIndex from "./components/appointments/AppointIndex";
import AppointAll from "./components/appointments/AppointAll";
import AppointAdd from "./components/appointments/AppointAdd";
import FamilyIndex from "./components/family/FamilyIndex";
import FamilyAll from "./components/family/FamilyAll";
import FamilyAdd from "./components/family/FamilyAdd";
import MedsIndex from "./components/meds/MedsIndex";
import MedsAll from "./components/meds/MedsAll";
import MedsAdd from "./components/meds/MedsAdd";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem("token") || "", // assigns token from local storage or give empty string
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  logInToggle = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn })
  }


  updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log(this.sessionToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar
            updateToken={this.updateToken}
            token={this.state.sessionToken}
          />
          <Switch>
            <Route exact path="/login">
              <Login updateToken={this.updateToken}
                token={this.state.sessionToken} logInToggle={this.logInToggle} isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route exact path="/register">
              <Signup token={this.state.sessionToken} logInToggle={this.logInToggle} isLoggedIn={this.state.isLoggedIn} updateToken={this.updateToken} />
            </Route>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/familyindex">
              <FamilyIndex token={this.state.sessionToken} />
            </Route>
            <Route exact path="/familyall">
              <FamilyAll updateToken={this.updateToken}token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/familyadd">
              <FamilyAdd updateToken={this.updateToken}token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/appointmentindex">
              <AppointIndex updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/appointmentall">
              <AppointAll updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/appointmentadd">
              <AppointAdd updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/medsindex">
              <MedsIndex updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
            {/* <Route exact path="/medsall">
              <MedsAll updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
            */}
            <Route exact path="/medsadd">
              <MedsAdd updateToken={this.updateToken} token={this.state.sessionToken}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;

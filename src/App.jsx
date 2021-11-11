import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AppointAdd from "./components/appointments/AppointAdd";
import MedsAll from "./components/meds/MedsAll";
import FamilyAdd from "./components/family/FamilyAdd";
import NavBar from "./components/nav/NavBar";
import SplashPage from "./components/auth/SplashPage";
import FamilyAll from "./components/family/FamilyAll";
import AppointAll from "./components/appointments/AppointAll";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: localStorage.getItem("token") || "", // assigns token from local storage or give empty string
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
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
                token={this.state.sessionToken}/>
            </Route>
            <Route exact path="/register">
              <Signup />
            </Route>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/familyall">
              <FamilyAll
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/familyadd">
              <FamilyAdd
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/appointmentall">
              <AppointAll
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/appointmentadd">
              <AppointAdd
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/medsall">
              <MedsAll
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/medsadd">
              <MedsAll
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;

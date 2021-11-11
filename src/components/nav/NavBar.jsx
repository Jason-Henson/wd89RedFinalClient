import React from "react";
import { Link } from "react-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  noRefCheck,
} from "reactstrap";
import AppointAll from "../appointments/AppointAll";

//import switch and route

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  noRefCheck = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Navbar color="faded" light>
            <NavbarBrand className="me-auto" href="/">
              My Med Minder
            </NavbarBrand>
            <NavbarToggler className="me-2" onClick={() => this.noRefCheck()} />
            <Collapse navbar isOpen={this.state.open}>
              <Nav navbar>
                <NavItem>
                  <NavLink to="/appointmentall">
                    Appointments
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

       
      </div>

      // switch
      //route exact path ="/family"
      // family component
      //route
      //route
      //component
      //route
      //switch
    );
  }
}

export default NavBar;

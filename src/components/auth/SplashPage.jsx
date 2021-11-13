import React from "react";
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";
import "./auth.css";

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    
        <div className="SplashPage">
            <img src="../assets/splashPageImage.jpg" alt="splash page" />
            <h6><Link to="/login">Login</Link> | <Link to="/register">Register</Link></h6>
        </div>

    );
  }
}

export default SplashPage;

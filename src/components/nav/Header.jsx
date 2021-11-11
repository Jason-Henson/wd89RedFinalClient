import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div> <h1>Header</h1> </div> );
    }
}
 
export default Header;
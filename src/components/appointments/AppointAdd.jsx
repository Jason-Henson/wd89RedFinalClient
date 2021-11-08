import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

class AppointAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFamily: [],
      appFor: "",
      appDate: "",
      appTime: "",
      appLoc: "",
      appDoc: "",
      appNotes: "",
      UserId: "",
    };
  }

  /******************************************************
   * Fetching family member name to add to drop down list
   ******************************************************/

  fetchFamily() {
    fetch(`http://localhost:3000/family/all/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((famFetchResult) => {
        this.setState({
          myFamily: famFetchResult,
        });
      })
      .then(console.log("My Family from state variable", this.state.myFamily))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
      this.fetchFamily()
    }
  }

  /******************************************************
   * Post to data base
   ******************************************************/

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/appointment/add`, {
      method: "POST",
      body: JSON.stringify({
        appointment: {
          appFor: this.state.appFor,
          appDate: this.state.appDate,
          appTime: this.state.appTime,
          appLoc: this.state.appLoc,
          appDoc: this.state.appDoc,
          appNotes: this.state.appNotes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((fetchResult) => {
        console.log(fetchResult);
      })
      .catch((err) => console.log(err));
  };

  

  render() {
    return (
      <div>
        <h1>Add Appointments</h1>
        <Form>
          <FormGroup>
            <select 
            type="select"
            name="appFor"
            id="appFor"
            placeholder="Family Member"
            value={this.state.appFor}
            onChange={(e) => this.setState({ appFor: e.target.value })}
            >
              {this.state.myFamily.map(fam => <option value={fam.famMember}>{fam.famMember}</option>)}

            </select>
          </FormGroup>
          {/* <FormGroup>

          </FormGroup> */}
          <FormGroup>
            <Input
              type="date"
              name="appDate"
              id="appDate"
              placeholder="Date"
              value={this.state.appDate}
              onChange={(e) => this.setState({ appDate: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="time"
              name="appTime"
              id="appTime"
              placeholder="Time"
              // value={this.state.appTime}
              onChange={(e) => this.setState({ appTime: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
              <Input 
            type="text"
            name="appLoc"
            id="appLoc"
            placeholder="Location"
            value={this.state.appLoc}
            onChange={(e) => this.setState({ appLoc: e.target.value })}
          />
          </FormGroup>
          <FormGroup>
              <Input
              type="text"
              name="appDoc"
              id="appDoc"
              placeholder="Doctor"
              value={this.state.appDoc}
              onChange={(e) => this.setState({ appDoc: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Input
              type="text"
              name="appNotes"
              id="appNotes"
              placeholder="Notes"
              value={this.state.appNote}
              onChange={(e) => this.setState({ appNotes: e.target.value })}
              />
            </FormGroup>
          <Button onClick={this.handleSubmit}>Add</Button>
        </Form>
      </div>
    );
  }
}

export default AppointAdd;

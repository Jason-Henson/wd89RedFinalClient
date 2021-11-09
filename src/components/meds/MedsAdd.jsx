import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

class MedsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myFamily: [],
      myMeds: [],
      medFor: "",
      medName: "",
      medScript: "",
      medDesc: "",
      medActive: "",
      medNotes: "",
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
      this.fetchFamily();
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
          medFor: this.state.medFor,
          medName: this.state.medName,
          medScript: this.state.medScript,
          medDesc: this.state.medDesc,
          medActive: this.state.medActive,
          medNotes: this.state.medNotes,
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
        <h1>Add Meds</h1>
        <Form>
          <FormGroup>
            <select
              type="select"
              name="medFor"
              id="medFor"
              placeholder="Family Member"
              value={this.state.medFor}
              onChange={(e) => this.setState({ medFor: e.target.value })}
            >
              {this.state.myFamily.map((fam) => (
                <option value={fam.famMember}>{fam.famMember}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medName"
              id="medName"
              placeholder="Med Name"
              value={this.state.medName}
              onChange={(e) => this.setState({ medName: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medScript"
              id="medScript"
              placeholder="Script Number"
              value={this.state.medScript}
              onChange={(e) => this.setState({ medScript: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medDesc"
              id="medDesc"
              placeholder="Med Description"
              value={this.state.medDesc}
              onChange={(e) => this.setState({ medDesc: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medActive"
              id="medActive"
              placeholder="Doctor"
              value={this.state.medActive}
              onChange={(e) => this.setState({ medActive: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medNotes"
              id="medNotes"
              placeholder="Notes"
              value={this.state.medNotes}
              onChange={(e) => this.setState({ medNotes: e.target.value })}
            />
          </FormGroup>
          <Button onClick={this.handleSubmit}>Add</Button>
        </Form>
      </div>
    );
  }
}

export default MedsAdd;

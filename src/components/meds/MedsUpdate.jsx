import React from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

class MedsUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMedFor: this.props.medData.medFor,
      editMedName: this.props.medData.medName,
      editMedScript: this.props.medData.editMedScript,
      editMedDesc: this.props.medData.editMedScript,
      editMedActive: this.props.medData.medActive,
      editMedNotes: this.props.medData.medNotes,
      token: this.props.token,
      medData: this.props.medData,
      showModal: false,
    };
  }

//   componentDidMount() {
//     if (localStorage.getItem("token")) {
//       this.setState({ sessionToken: localStorage.getItem("token") });
//       console.log("family member data", this.props.medData);
//       this.props.generateTable();
//     }
//   }

  handleSubmit = (e) => {
    console.log(this.props.medData.userId);
    e.preventDefault();
    fetch(`http://localhost:3000/meds/${this.props.medData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        appointment: {
            appFor: this.state.editAppFor,
            appDate: this.state.editAppDate,
            appTime: this.state.editAppTime,
            appLoc: this.state.editAppLoc,
            appDoc: this.state.editAppDoc,
            appNotes: this.state.editAppNotes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((fetchResult) => {
        console.log(fetchResult, "this is coming from update line 61");
        //pass down fetchApp instead of generateTable.
        this.props.generateTable();
        this.props.hideModal();
      })
  };

 closeUpdateModal = () => {
    this.props.hideModal();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={true}
          backdrop={false}
          centered
          fade={false}
          fullscreen
          scrollable
          // toggle={function noRefCheck() {}}
        >
          <ModalHeader>Update Appointment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="appFor">Family Member Name</Label>
                <Input
                  type="text"
                  name="appFor"
                  id="appFor"
                  value={this.state.editAppFor}
                  onChange={(e) => this.setState({ editAppFor: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="date"
                  name="appDate"
                  id="appDate"
                  placeholder="Date"
                  value={this.state.editAppDate}
                  onChange={(e) => this.setState({ editAppDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="time"
                  name="appTime"
                  id="appTime"
                  placeholder="Date"
                  value={this.state.editAppTime}
                  onChange={(e) => this.setState({ editAppTime: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="appLoc"
                  id="appLoc"
                  placeholder="Address"
                  value={this.state.editAppLoc}
                  onChange={(e) => this.setState({ editAppLoc: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="appDoc"
                  id="appDoc"
                  placeholder="Doctor"
                  value={this.state.editAppDoc}
                  onChange={(e) => this.setState({ editAppDoc: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="appNotes"
                  id="appNotes"
                  placeholder="Notes"
                  value={this.state.editAppNotes}
                  onChange={(e) => this.setState({ editAppNotes: e.target.value })}
                />
              </FormGroup>
            <Button color="primary">
              Update
            </Button>{" "}
            <Button onClick={this.closeUpdateModal}> Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MedsUpdate;

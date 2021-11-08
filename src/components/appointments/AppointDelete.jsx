import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

class AppointDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editAppFor: this.props.appointmentData.appFor,
        editAppDate: this.props.appointmentData.appDate,
        editAppTime: this.props.appointmentData.appTime,
        editAppLoc: this.props.appointmentData.appLoc,
        editAppDoc: this.props.appointmentData.appDoc,
        editAppNotes: this.props.appointmentData.appNotes,
      id: this.props.appointmentData.id,
      appointmentData: this.props.appointmentData,
    };
  }

  RemoveFamilyMember = (e) => {
    e.preventDefault();
    console.log("State ID: ", this.state.id);
    fetch(`http://localhost:3000/appointment/${this.state.appointmentData.id}`, {
      // need to get this from state
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then(() => this.props.generateTable()) // need to pass props for this.
      .then(this.props.closeFamilyDeleteModal()); // need to pass props for this.
  };
         
  render() {
    return (
      <div>
        <Button color="danger" onClick={function noRefCheck() {}}>
          Click Me
        </Button>
        <Modal
          toggle={function noRefCheck() {}}
          isOpen={true} // copied from modal code on FamUpdate class from here to end of this open tag
          backdrop={false}
          centered
          fade={false}
          fullscreen
          scrollable
        >
          <ModalHeader>
            Cancel Appointment
          </ModalHeader>
          <ModalBody>
            Click the CANCEL button if you wish to cancel the selected appointment. This change cannot be undone. If you do not wish to cancel this appointment please click the GO BACK button.
            <br />
            <hr />
            <Form>
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
                  type="text"
                  name="appDate"
                  id="appDate"
                  placeholder="Date"
                  value={this.state.editAppDate}
                  onChange={(e) => this.setState({ editAppDate: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
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
              <Button color="danger" onClick={this.RemoveFamilyMember}>
              Cancel Appointment
            </Button>{" "}
            <Button onClick={this.props.hideModal}>
              {" "}
              {/* need to pass props for this */}
              Go Back
            </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AppointDelete;

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
      editMedScript: this.props.medData.medScript,
      editMedDesc: this.props.medData.medDesc,
      editMedActive: this.props.medData.medActive,
      editMedNotes: this.props.medData.medNotes,
      token: this.props.token,
      medData: this.props.medsData,
      showModal: false,
      myFamily: [],
    };
  }

/******************************************************
   * Fetching family member name to add to drop down list
   ******************************************************/


 fetchFamily() {
   console.log(this.props.medData, "line 37")
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
  /******************************************************
   * Post to data base
   ******************************************************/

  handleSubmit = (e) => {
    console.log(this.props.medData.userId, "this is coming from line 57 event fired");
    e.preventDefault();
    fetch(`http://localhost:3000/meds/${this.props.medData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        meds: {
          medFor: this.state.editMedFor,
          medName: this.state.editMedName,
          medScript: this.state.editMedScript,
          medDesc: this.state.editMedScript,
          medActive: this.state.editMedActive,
          medNotes: this.state.editMedNotes,
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
        this.props.fetchApp()
        this.props.generateTable()
        this.props.hideModal()
      })
      .then(console.log(this.medData, "this is coming form line"))
  };

 closeUpdateModal = () => {
    this.props.hideModal();
  };

  componentDidMount() {
    this.fetchFamily()
  }

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
        >
          <ModalHeader>View/Update Med Information</ModalHeader>
          To update the information click the UPDATE button.  Or click the GO BACK button to return to the meds list.
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
            <select
              type="select"
              name="medFor"
              id="medFor"
              placeholder="Family Member Name"
              value={this.state.editMedFor}
              onChange={(e) => this.setState({ editMedFor: e.target.value })}
            >
              {this.state.myFamily.map((fam) => (
                <option value={fam.famMember}>{fam.famMember}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="MedName"
              id="MedName"
              placeholder="Med Name"
              value={this.state.editMedName}
              onChange={(e) => this.setState({ editMedName: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medScript"
              id="medScript"
              placeholder="Script Number"
              value={this.state.editMedScript}
              onChange={(e) => this.setState({ editMedScript: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medDesc"
              id="medDesc"
              placeholder="Med Description"
              value={this.state.editMedDesc}
              onChange={(e) => this.setState({ editMedDesc: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medActive"
              id="medActive"
              placeholder="Currently Taking?"
              value={this.state.editMedActive}
              onChange={(e) => this.setState({ editMedActive: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="MedNotes"
              id="MedNotes"
              placeholder="Notes"
              value={this.state.editMedNotes}
              onChange={(e) => this.setState({ editMedNotes: e.target.value })}
            />
          </FormGroup>
            <Button color="primary">
              Update
            </Button>{" "}
            <Button onClick={this.closeUpdateModal}> Go Back</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MedsUpdate;

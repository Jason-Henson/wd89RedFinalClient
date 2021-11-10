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

class MedsDelete extends React.Component {
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

  RemoveFamilyMember = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/meds/${this.props.medData.id}`,{
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.token,
        }),
      }
    )
      .then(() => this.props.generateTable()) 
      .then(this.props.closeFamilyDeleteModal())
  }

  componentDidMount() {
      this.fetchFamily()
  }

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
          <ModalHeader>Remove Med</ModalHeader>
          <ModalBody>
            Click the Remove button if you wish to remove the selected
            med from the list. This change cannot be undone. If you do not wish to
            remove this med form the please click the GO BACK button.
            <br />
            <hr />
            <Form>
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
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medScript"
              id="medScript"
              placeholder="Script Number"
              value={this.state.editMedScript}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medDesc"
              id="medDesc"
              placeholder="Med Description"
              value={this.state.editMedDesc}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="medActive"
              id="medActive"
              placeholder="Currently Taking?"
              value={this.state.editMedActive}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="MedNotes"
              id="MedNotes"
              placeholder="Notes"
              value={this.state.editMedNotes}
            />
          </FormGroup>
              <Button color="danger" onClick={this.RemoveFamilyMember}>
                Remove Med
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

export default MedsDelete;

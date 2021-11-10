import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";

class FamDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      famMember: this.props.familyMemberData.famMember,
      famAge: this.props.familyMemberData.famAge,
      famAllergic: this.props.familyMemberData.famAllergic,
      id: parseInt(this.props.familyMemberData.id),
      familyMemberData: this.props.familyMemberData,
    };
  }

  RemoveFamilyMember = (e) => {
    e.preventDefault();
    console.log("State ID: ", this.state.id);
    fetch(`http://localhost:3000/family/${this.state.familyMemberData.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then(() => this.props.fetchFamily())
      .then(() => this.props.generateTable())
      .then(this.props.closeFamilyDeleteModal())
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
            Remove Family Member
          </ModalHeader>
          <ModalBody>
            Click the REMOVE button if you wish to remove the selected family
            member. This change cannot be undone. If you do not wish to remove
            this family member please click the GO BACK button.
            <br />
            <hr />
            <Form>
              <FormGroup>
                <Label for="famMember">Family Member Name</Label>
                <Input
                  type="text"
                  name="famMember"
                  id="famMember"
                  placeholder="User name"
                  value={this.state.famMember}
                  onChange={(e) => this.setState({ famMember: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label for="famAge">Age</Label>
                <Input
                  type="text"
                  name="famAge"
                  id="famAge"
                  placeholder="Age"
                  value={this.state.famAge}
                  onChange={(e) => this.setState({ famAge: e.target.value })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.RemoveFamilyMember}>
              Remove
            </Button>{" "}
            <Button onClick={this.props.closeFamilyDeleteModal}>
              {" "}
              Go Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FamDelete;

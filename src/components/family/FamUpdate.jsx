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
  ModalFooter,
} from "reactstrap";

class FamilyUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      famMember: this.props.familyMemberData.famMember,
      famAge: this.props.familyMemberData.famAge,
      famAllergic: this.props.familyMemberData.famAllergic,
      token: this.props.token, // pass to family delete
      familyMemberData: this.props.familyMemberData,
      showModal: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
      console.log("family member data", this.props.familyMemberData);
      this.props.generateTable()
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/family/${this.props.familyMemberData.id}`, {
      method: "PUT",
      body: JSON.stringify({
        family: {
          famMember: this.state.famMember,
          famAge: this.state.famAge,
          famAllergic: this.state.famAllergic,
          
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((fetchResult) => {
        console.log(fetchResult)
        this.props.fetchFamily()
        this.props.generateTable()
        this.props.hideModal()
      })
      .catch((err) => console.log(err));
  };
  
  hideModal = () => {
    this.setState({ showModal: false });
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
        >
          <ModalHeader>
            Update Family Member Information
          </ModalHeader>
          <ModalBody>
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

              <FormGroup
                check
                name="famAllergic"
                id="famAllergic"
                value={this.props.familyMemberData.famAllergic}
                onClick={(e) => this.setState({ famAllergic: true })}
              >
                <Label>Allergies?</Label>
                <Input type="checkbox" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Update
            </Button>{" "}
            <Button onClick={this.props.hideModal}>
              {" "}
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FamilyUpdate;

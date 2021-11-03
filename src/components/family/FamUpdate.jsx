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
      famAllergic: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
      console.log("family member data", this.props.familyMemberData);
    }
  }
  handleSubmit = (e) => {
    //your ID can come from this.props.familyData.id
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
        this.props.hideModal()
        this.familyFetch()
      })
      .catch((err) => console.log(err));
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div>
        {/* <Button color="danger" onClick={function noRefCheck() {}}>
          Jason
        </Button> */}
        <Modal
          isOpen={true}
          backdrop={false}
          centered
          fade={false}
          fullscreen
          scrollable
          // toggle={function noRefCheck() {}}
        >
          <ModalHeader toggle={function noRefCheck() {}}>
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
              Submit
            </Button>{" "}
            <Button onClick={this.props.hideModal}>
              {" "}
              {/* wipe out that function and just use something like this.props.hideModal  */}
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FamilyUpdate;

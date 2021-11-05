import React from "react";
import { Table, Button } from 'reactstrap'
import FamilyUpdate from "./FamUpdate";
import FamDelete from "./FamDelete";

class FamilyAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showModal: false,
      showModalDelete: false,
      token: this.props.token,
      familyMemberData: {},
    }
  }

  generateTable = () => {
    let families = this.props.myFamily

    return families.map((family, index) => {
        console.log(family.famAllergic)
        return(
            <tr key={index}>
                <th scope="row">{family.id}</th>
                <td>{family.famMember}</td>
                <td>{family.famAge}</td>
                <td>{family.famAllergic.toString()}</td>
                <td><Button color="primary" onClick={() => this.clickUpdate(family)}>Update</Button></td>
                <td><Button color="secondary" onClick={() => this.clickDelete(family)} >Remove</Button> </td>
            </tr>
        )
    })
  }

  clickUpdate = (family) => {
    this.setState({ showModal: true, familyMemberData: family })
  }

  clickDelete = (family) => {
    this.setState({ showModalDelete: true, familyMemberData: family })
  }

  // create a method for setting state of showModal to false
  hideModal = () => {
    this.setState({ showModal: false })
  }

  closeFamilyDeleteModal = () => {
      this.setState({ showModalDelete: false })
  }

  // Display the modal for updating 
  displayModal = ()=> {
    // if the state for this is true call familyUpdate class
    if (this.state.showModal){
      return <FamilyUpdate token={this.state.token} familyMemberData={this.state.familyMemberData} hideModal={this.hideModal} generateTable={this.generateTable}/> 
    } else {
      return null
    }
  }

  // display modal for deleting 
  displayModalDelete = ()=> {
    // if the state for this is true call famDelete class
    if (this.state.showModalDelete){
      return <FamDelete token={this.state.token} familyMemberData={this.state.familyMemberData} closeFamilyDeleteModal={this.closeFamilyDeleteModal} generateTable={this.generateTable}/> 
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <h1>Family View All</h1>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Allergies</th>
            </tr>
          </thead>
          <tbody>
              {this.generateTable()}
          </tbody>
        </Table>
       {this.displayModal()}
       {this.displayModalDelete()}
      </div>
    );
  }
}

export default FamilyAll;

import React from "react";
import { Table, Button } from 'reactstrap'
import FamilyUpdate from "./FamUpdate";
import FamDelete from "./FamDelete";
import FamilyAdd from "./FamilyAdd";

class FamilyAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showModal: false,
      showModalDelete: false,
      showModalAdd: false,
      token: this.props.token,
      familyMemberData: {},
    }
  }

  generateTable = () => {
    let families = this.props.myFamily

    return families.map((family, index) => {
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

  // Toggle modal values on/true

  clickUpdate = (family) => {
    this.setState({ showModal: true, familyMemberData: family })
  }

  clickDelete = (family) => {
    this.setState({ showModalDelete: true, familyMemberData: family })
  }

  clickAdd = (e) => {
    this.setState({ showModalAdd: true });
    this.displayModalAdd()
  }

 // Toggle modal values off/false

  hideModal = () => {
    this.setState({ showModal: false })
  }

  closeFamilyDeleteModal = () => {
      this.setState({ showModalDelete: false })
  }

  closeFamilyAddModal = () => {
    this.setState({ showModalAdd: false })
}

// check to change in state of toggle

  displayModal = () => {
    if (this.state.showModal){
      return <FamilyUpdate token={this.props.token} familyMemberData={this.state.familyMemberData} hideModal={this.hideModal} generateTable={this.generateTable} fetchFamily={this.props.fetchFamily}/> 
    } else {
      return null
    }
  }

  displayModalDelete = () => {
    if (this.state.showModalDelete){
      return <FamDelete token={this.props.token} familyMemberData={this.state.familyMemberData} closeFamilyDeleteModal={this.closeFamilyDeleteModal} generateTable={this.generateTable} fetchFamily={this.props.fetchFamily}/> 
    } else {
      return null
    }
  }

  displayModalAdd = () => {
    if (this.state.showModalAdd){
      console.log("test")
      return <FamilyAdd token={this.props.token} closeFamilyAddModal={this.closeFamilyAddModal} generateTable={this.generateTable} fetchFamily={this.props.fetchFamily}/> 
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {this.generateTable()}
          </tbody>
        </Table>
       {this.displayModal()}
       {this.displayModalDelete()}
       <div><Button color="primary" onClick={() => this.clickAdd()}>Add Family Member</Button></div>
      </div>
    );
  }
}

export default FamilyAll;

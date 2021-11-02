import React from "react";
import { Table, Button } from 'reactstrap'
import FamilyUpdate from "./FamUpdate";

class FamilyAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showModal: false,
      token: this.props.token,
      familyMemberData: {}
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
                <td><Button color="secondary">Remove</Button> </td>
            </tr>
        )
    })
  }

  clickUpdate = (family) => {
    this.setState({ showModal: true, familyMemberData: family })
  }

  // create a method for setting state of showModal to false
  hideModal = () => {
    this.setState({ showModal: false })
  }


  displayModal = ()=> {
    // if the state for this is true call familyupdate class
    if (this.state.showModal){
      return <FamilyUpdate token={this.state.token} familyMemberData={this.state.familyMemberData}/> 
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
      </div>
    );
  }
}

export default FamilyAll;

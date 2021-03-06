import React from "react";
import { Table, Button } from 'reactstrap';
import { Redirect } from "react-router-dom";
import MedsUpdate from "./MedsUpdate";
import MedsDelete from "./MedsDelete";

class MedsAll extends React.Component {
  constructor(props) {
    console.log(props);
    super(props)
    this.state = { 
      showModal: false,
      showModalDelete: false,
      token: this.props.token,
      medsData: this.props.medsData,
      myMeds: this.props.myMeds,
      clickAdd: false,
    }
  }

  generateTable = () => {
    console.log(this.props, "this is coming from MedsAll line 22");

    return this.props.myMeds.map((med, index) => {
      console.log("I'm mapping")
        return(
            <tr key={index}>
                <th scope="row">{med.id}</th>
                <td>{med.medFor}</td>
                <td>{med.medName}</td>
                <td>{med.medScript}</td>
                <td>{med.medDesc}</td>
                <td>{med.medActive.toString()}</td>
                {/* <td>{med.medNotes}</td> */}
                <td><Button color="primary" onClick={() => this.clickUpdate(med)}>View/Change</Button></td>
                <td><Button color="secondary" onClick={() => this.clickDelete(med)} >Cancel</Button> </td>
            </tr>
        )
    })
  }

  clickAdd = () => {
    this.setState({ clickAdd: true })
  }

  clickUpdate = (med) => {
    this.setState({ showModal: true, medData: med })
  }

  clickDelete = (med) => {
    this.setState({ showModalDelete: true, medData: med })
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
      return <MedsUpdate token={this.props.token} medData={this.state.medData} hideModal={this.hideModal} generateTable={this.generateTable} fetchApp={this.props.fetchApp}/> 
    } else {
      return null
    }
  }

  // display modal for deleting 
  displayModalDelete = ()=> {
    // if the state for this is true call famDelete class
    if (this.state.showModalDelete){
      return <MedsDelete token={this.props.token} medData={this.state.medData} closeFamilyDeleteModal={this.closeFamilyDeleteModal} generateTable={this.generateTable} fetchApp={this.props.fetchApp}/> 
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <h1>Medications</h1>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Med Name</th>
              <th>Prescription #</th>
              <th>Description</th>
              <th>Active</th>
              {/* <th>Notes</th> */}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {this.generateTable()}
          </tbody>
        </Table>
        <Button color="primary" onClick={() => this.clickAdd()} >Add New Meds</Button>
        { this.state.clickAdd ? <Redirect to="medsadd" token={this.props.token} generateTable={this.generateTable} fetchApp={this.props.fetchApp} /> : <></> }
       {this.displayModal()}
       {this.displayModalDelete()}
      </div>
    );
  }
}

export default MedsAll;

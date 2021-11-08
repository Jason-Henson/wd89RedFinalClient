import React from "react";
import { Table, Button } from 'reactstrap';
import AppointUpdate from "./AppointUpdate";
import AppointDelete from "./AppointDelete";

class AppointAll extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      showModal: false,
      showModalDelete: false,
      token: this.props.token,
      appointmentData: {},
    }
  }

  generateTable = () => {
    let appointments = this.props.myApp

    return appointments.map((appointment, index) => {
        return(
            <tr key={index}>
                <th scope="row">{appointment.id}</th>
                <td>{appointment.appFor}</td>
                <td>{appointment.appDate}</td>
                <td>{appointment.appTime}</td>
                <td>{appointment.appLoc}</td>
                <td>{appointment.appDoc}</td>
                {/* <td>{appointment.appNotes}</td> */}
                <td><Button color="primary" onClick={() => this.clickUpdate(appointment)}>View/Change</Button></td>
                <td><Button color="secondary" onClick={() => this.clickDelete(appointment)} >Cancel</Button> </td>
            </tr>
        )
    })
  }

  clickUpdate = (appointment) => {
    this.setState({ showModal: true, appointmentData: appointment })
  }

  clickDelete = (appointment) => {
    this.setState({ showModalDelete: true, appointmentData: appointment })
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
      return <AppointUpdate token={this.state.token} appointmentData={this.state.appointmentData} hideModal={this.hideModal} generateTable={this.generateTable}/> 
    } else {
      return null
    }
  }

  // display modal for deleting 
  displayModalDelete = ()=> {
    // if the state for this is true call famDelete class
    if (this.state.showModalDelete){
      return <AppointDelete token={this.state.token} appointmentData={this.state.appointmentData} closeFamilyDeleteModal={this.closeFamilyDeleteModal} generateTable={this.generateTable}/> 
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <h1>Appointments</h1>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Doctor</th>
              {/* <th>Notes</th> */}
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
      </div>
    );
  }
}

export default AppointAll;

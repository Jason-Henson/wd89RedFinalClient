import React from "react";
import { Link, Redirect } from "react-router-dom";
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
      appointmentAdd: false, 
    }
  }

  componentDidMount() {
    this.props.fetchApp()
    this.generateTable(this.props.myApp)
  }

  dateFix = (date) => {
    var dateObj = new Date(date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    return month + "/" + day + "/" + year;
  }
  
  generateTable = () => {
    if(this.props.myApp === undefined) {
      this.props.fetchApp()
    } 
    console.log(this.props.myApp, "line 32 appAll")
    let appointments = this.props.myApp

    return appointments.map((appointment, index) => {
        return(
            <tr key={index}>
                <th scope="row">{appointment.id}</th>
                <td>{appointment.appFor}</td>
                <td>{this.dateFix(appointment.appDate)}</td>
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

  displayModal = ()=> {
    if (this.state.showModal){
      return <AppointUpdate token={this.props.token} appointmentData={this.state.appointmentData} hideModal={this.hideModal} generateTable={this.generateTable} fetchApp={this.props.fetchApp}/> 
    } else {
      return null
    }
  }

  displayModalDelete = ()=> {
    if (this.state.showModalDelete){
      return <AppointDelete token={this.props.token} appointmentData={this.state.appointmentData} closeFamilyDeleteModal={this.closeFamilyDeleteModal} generateTable={this.generateTable} fetchApp={this.props.fetchApp}/> 
    } else {
      return null
    }
  }

  addAppointment = () => {
    console.log("addAppointment fir")
    this.setState({ appointmentAdd: true })
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
        <Button color="primary" onClick={() => this.addAppointment()}>New Appointment</Button>
        { this.state.appointmentAdd && <Redirect to="/appointmentadd" /> }
       {this.displayModal()}
       {this.displayModalDelete()}
      </div>
    );
  }
}

export default AppointAll;

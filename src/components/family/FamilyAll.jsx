import React from "react";
import { Table } from 'reactstrap'

class FamilyAll extends React.Component {
  constructor(props) {
    super(props)
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
            </tr>
        )
    })
  }

  render() {
    return (
      <div>
        <h1>Family View All</h1>
        <Table striped>
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
      </div>
    );
  }
}

export default FamilyAll;

import React from "react";
import ListGroup from "./ListGroup";

class OccupantList extends React.Component {

  render() {
    let{occupants} = this.props;

    return (
      <div class="occupant_list">
        <h2>Occupants</h2>
        <ListGroup>
          {occupants.map((o,index) => <li key={index} id={"list-group-item-" + o.id} class="list-group-item">{o.name}</li>)}
        </ListGroup>
      </div>
    )
  }
}

export default OccupantList;

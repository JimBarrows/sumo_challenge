import React from "react";

class ListGroup extends React.Component {

  render() {
    return (
      <ul class="list_group">
        {this.props.children}
      </ul>
    )
  }
}

export default ListGroup;

import React from "react";
import ListGroup from "./ListGroup";

class Chat extends React.Component {

  render() {
    let {conversation} = this.props;

    return (
      <div class="chat_list">
        <h2>Chat</h2>
        <ListGroup id={"chat_room_" + 1} >
          {conversation.map((c,index) =>
            <div class="row" key={index} id={"statement_" + c.id}>
              <div class="col-md-2">{c.speaker.name}</div>
              <div class="col-md-6">{c.message}</div>
            </div>)}
        </ListGroup>
      </div>
    )
  }
}

export default Chat;

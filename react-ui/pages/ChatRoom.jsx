import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { load } from "../actions/chat_room";
import OccupantList from "../components/OccupantList";
import Chat from "../components/Chat";

class ChatRoom extends React.Component {

	componentWillMount( ) {
		this.props.load( );
	}

	render( ) {
		let { id, name, occupants, conversation } = this.props.chat_room;
		return (
			<div id={"chat_room_" + id} class="chat_room">
				<h1>{name}</h1>
				<div class="row">
					<div class="col-md-3">
						<OccupantList occupants={occupants}/>
					</div>
					<div class="col-md-9">
						<Chat conversation={conversation}/>
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = ( state ) => {
	return { chat_room: state.chat_room };
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		load: ( ) => dispatch(load( ))
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( ChatRoom );

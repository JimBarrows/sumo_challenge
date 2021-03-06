import React from 'react';
import {connect} from 'react-redux';

import {load, saySomething} from '../actions/chat_room';
import Chat from '../components/Chat';

class ChatRoom extends React.Component {

	componentDidMount() {
		this.interval = setInterval(this.reload.bind(this), 500);
	}

	componentWillMount( ) {
		this.props.load( );
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	reload() {
		this.props.load();
	}

	render( ) {
		let { id, name, occupants, conversation } = this.props.chat_room;
		return (
			<div id={"chat_room_" + id} class="chat_room">
				<h1>{name}</h1>
				<div class="row">

					<Chat conversation={conversation} saySomething={this.props.saySomething.bind(this)}/>

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
		load        : () => dispatch(load()),
		saySomething: (message) => dispatch(saySomething(message))
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( ChatRoom );

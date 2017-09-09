import {TextFormGroup} from 'bootstrap-react-components';
import React from 'react';

import ListGroup from './ListGroup';

class Chat extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			say: ''
		};
	}

	render() {
		let {conversation} = this.props;

		return (
				<div class="chat_list">
					<h2>Chat</h2>
					<ListGroup id={"chat_room_" + 1}>
						{conversation.map((c, index) =>
								<div class="row" key={index} id={"statement_" + c.id}>
									<div class="col-md-2">{c.speaker.name}</div>
									<div class="col-md-6">{c.message}</div>
								</div>)}
					</ListGroup>
					<form class="form-inline" onSubmit={this.saySomething.bind(this)}>
						<TextFormGroup id="add" label="Say:" onChange={this.sayChange.bind(this)} value={this.state.say}/>
						<button type="submit" class="btn btn-default">
							<span class="fa fa-bullhorn" aria-hidden="true"/>
						</button>
					</form>
				</div>);
	}

	sayChange(event) {
		this.setState({say: event.target.value});
	}

	saySomething(event) {
		event.preventDefault();
		this.props.saySomething(this.state.say);
		this.setState({say: ''});
	}
}

export default Chat;

import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";

class DeckList extends React.Component {

	componentWillMount() {
		// this.props.load();
	}

	render() {

		return (
				<div>
          <h1>Chat Room</h1>
        </div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		// list: state.decks.list
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// load: () => dispatch(load()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

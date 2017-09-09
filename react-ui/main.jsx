import axios from "axios";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {syncHistoryWithStore, push} from "react-router-redux";
import App from "./components/layout";
import store from "./Store";

axios.create({
	validateStatus: function (status) {
		return status < 300;
	}
});

const history = syncHistoryWithStore(hashHistory, store);

const mountNode = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={App}>
					<IndexRoute component={RoomList}></IndexRoute>
				</Route>
			</Router>
		</Provider>
		, mountNode);

let token = localStorage.getItem("token");
if (token !== null) {
	store.dispatch(loginUserSuccess(token));
	store.dispatch(push("/"));
	axios.defaults.headers = {
		"x-access-token": token
	};
}

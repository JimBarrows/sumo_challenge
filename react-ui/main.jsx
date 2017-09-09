import axios from "axios";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {syncHistoryWithStore, push} from "react-router-redux";

import Layout from "./components/layout";
import {loginUserSuccess} from "./actions";
import ChatRoom from "./pages/ChatRoom";
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
				<Route path="/" component={Layout}>
					<IndexRoute component={ChatRoom}></IndexRoute>
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

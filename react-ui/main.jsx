import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {addSelf} from './actions/chat_room';

import Layout from './components/layout';
import ChatRoom from './pages/ChatRoom';
import store from './Store';

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


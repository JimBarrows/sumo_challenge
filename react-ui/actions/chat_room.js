import axios from 'axios';
import constants from '../constants';
import {checkHttpStatus, convertErrorToString, parseJSON} from '../utils';

let {
	    API_RESULT_FAILURE, API_RESULT_SUCCESS, API_STATUS_FINISHED, API_STATUS_STARTED,
	    CHAT_ROOM_LOAD_BEGIN, CHAT_ROOM_LOAD_FAILURE, CHAT_ROOM_LOAD_SUCCESS,
	    CHAT_ROOM_SAY_BEGIN, CHAT_ROOM_SAY_FAILURE, CHAT_ROOM_SAY_SUCCESS
    } = constants;

export function addSelf() {
	return function (dispatch) {
		axios.get("/api/chat_room/add_user")
				.then(checkHttpStatus).then(parseJSON).then(data => dispatch({
			type   : CHAT_ROOM_LOAD_SUCCESS,
			payload: {
				data,
				status: API_STATUS_FINISHED,
				result: API_RESULT_SUCCESS
			}
		}));

	};
}

export function load() {
	return function (dispatch) {

		dispatch({
			type   : CHAT_ROOM_LOAD_BEGIN,
			payload: {
				status: API_STATUS_STARTED
			}
		});

		axios.get('/api/chat_room/59b4264deb9ff8620928795f').then(checkHttpStatus).then(parseJSON).then((data) => dispatch({
			type   : CHAT_ROOM_LOAD_SUCCESS,
			payload: {
				data,
				status: API_STATUS_FINISHED,
				result: API_RESULT_SUCCESS
			}
		})).catch((error) => dispatch({
			type   : CHAT_ROOM_LOAD_FAILURE,
			payload: {
				status: API_STATUS_FINISHED,
				result: API_RESULT_FAILURE,
				error : convertErrorToString(error)
			}
		}));
	};
}

export function saySomething(message) {
	return function (dispatch) {
		dispatch({
			type   : CHAT_ROOM_SAY_BEGIN,
			payload: {
				status: API_STATUS_STARTED
			}
		});
		axios.post('/api/chat_room/say', {message}).then(checkHttpStatus).then(parseJSON).then((data) => dispatch({
			type   : CHAT_ROOM_SAY_SUCCESS,
			payload: {
				data,
				status: API_STATUS_FINISHED,
				result: API_RESULT_SUCCESS
			}
		})).catch((error) => dispatch({
			type   : CHAT_ROOM_SAY_FAILURE,
			payload: {
				status: API_STATUS_FINISHED,
				result: API_RESULT_FAILURE,
				error : convertErrorToString(error)
			}
		}));
	};
}


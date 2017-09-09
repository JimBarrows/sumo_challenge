import axios from "axios";
import constants from "../constants";
import { push } from "react-router-redux";
import { checkHttpStatus, parseJSON, convertErrorToString } from "../utils";

let { API_RESULT_SUCCESS, API_STATUS_FINISHED, API_STATUS_STARTED, CHAT_ROOM_LOAD_BEGIN, CHAT_ROOM_LOAD_SUCCESS } = constants;

export function load( ) {
	return function( dispatch ) {

		dispatch({
			type: CHAT_ROOM_LOAD_BEGIN,
			payload: {
				status: API_STATUS_STARTED
			}
		});

		// axios.get('/api/plotPoints')
		// 		.then(checkHttpStatus)
		// 		.then(parseJSON)
		// 		.then((data) =>
		dispatch({
			type: CHAT_ROOM_LOAD_SUCCESS,
			payload: {
				data: {
					// chat_room: data
					id: 1,
					name: "Default Chat Room",
					occupants: [
						{
							id: 1,
							name: "bob"
						}, {
							id: 2,
							name: "christine"
						}
					],
					conversation: [
						{
							id: 1,
							speaker: {
								id: 1,
								name: "bob"
							},
							message: "Hi"
						}, {
							id: 2,
							speaker: {
								id: 2,
								name: "christine"
							},
							// message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
							message: "hi"
						}
					]
				},
				status: API_STATUS_FINISHED,
				result: API_RESULT_SUCCESS
			}
		})
		//)
		// 		.catch((error) =>
		// 				dispatch({
		// 					type: PLOT_POINTS_LOAD_FAILURE,
		// 					payload: {
		// 						status: API_STATUS_FINISHED,
		// 						result: API_RESULT_FAILURE,
		// 						error: convertErrorToString(error)
		// 					}
		// 				}));
	}
}

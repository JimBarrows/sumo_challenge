import axios from "axios";
import constants from "../constants";
import { push } from "react-router-redux";
import { checkHttpStatus, parseJSON, convertErrorToString } from "../utils";

let { API_RESULT_FAILURE, API_RESULT_SUCCESS, API_STATUS_FINISHED, API_STATUS_STARTED, CHAT_ROOM_LOAD_BEGIN,CHAT_ROOM_LOAD_FAILURE,CHAT_ROOM_LOAD_SUCCESS } = constants;

export function load( ) {
	return function( dispatch ) {

		dispatch({
			type: CHAT_ROOM_LOAD_BEGIN,
			payload: {
				status: API_STATUS_STARTED
			}
		});

		axios.get( '/api/chat_room' ).then( checkHttpStatus ).then( parseJSON ).then(( data ) => dispatch({
			type: CHAT_ROOM_LOAD_SUCCESS,
			payload: {
				data,
				status: API_STATUS_FINISHED,
				result: API_RESULT_SUCCESS
			}
		})).catch(( error ) => dispatch({
			type: CHAT_ROOM_LOAD_FAILURE,
			payload: {
				status: API_STATUS_FINISHED,
				result: API_RESULT_FAILURE,
				error: convertErrorToString( error )
			}
		}));
	}
}

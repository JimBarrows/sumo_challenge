import constants from '../constants';
import {createReducer} from '../utils';

let {CHAT_ROOM_LOAD_SUCCESS, CHAT_ROOM_SAY_SUCCESS} = constants;

const initialState = {
	id          : "",
	name        : "",
	occupants   : [],
	conversation: []
};

export default createReducer(initialState, {
	[ CHAT_ROOM_LOAD_SUCCESS ]: (state, payload) => Object.assign({}, {
		id          : payload.data.id,
		name        : payload.data.name,
		occupants   : payload.data.occupants,
		conversation: payload.data.conversation
	}),

	[ CHAT_ROOM_SAY_SUCCESS ]: (state, payload) => Object.assign({}, {
		id          : payload.data.id,
		name        : payload.data.name,
		occupants   : payload.data.occupants,
		conversation: payload.data.conversation
	})
});

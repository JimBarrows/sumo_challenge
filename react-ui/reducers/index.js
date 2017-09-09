import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import application from "./application";
import chat_room from "./chat_room";

const reducer = combineReducers({
	app: application,
	chat_room: chat_room,
	routing: routerReducer
});

export default reducer;

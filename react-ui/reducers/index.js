import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import Application from "./application";

const reducer = combineReducers({
	app: Application,
	routing: routerReducer
});

export default reducer;

import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import applicationReducer from "./application-store/applicationReducer";
import webinarReducer from "./webinar-store/webinarReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	applicationReducer,
	webinarReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

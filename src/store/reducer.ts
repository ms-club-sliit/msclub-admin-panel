import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import webinarReducer from "./webinar-store/webinarReducer";
import applicationReducer from "./application-store/applicationReducer";
import inquiryReducer from "./inquiry-store/inquiryReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	webinarReducer,
	applicationReducer,
	inquiryReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

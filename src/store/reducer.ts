import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import organizationReducer from "./organization-store/organizationReducer";
import webinarReducer from "./webinar-store/webinarReducer";
import applicationReducer from "./application-store/applicationReducer";
import inquiryReducer from "./inquiry-store/inquiryReducer";
import topSpeakerReducer from "./top-speaker-store/topSpeakerReducer";
import loginsReducer from "./logins-store/loginsReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	organizationReducer,
	webinarReducer,
	applicationReducer,
	inquiryReducer,
	topSpeakerReducer,
	loginsReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;


import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import webinarReducer from "./webinar-store/webinarReducer";
import applicationReducer from "./application-store/applicationReducer";
import topSpeakerReducer from "./top-speaker-store/topSpeakerReducer";                                
import contactUsReducer from "./contact-store/contactUsReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	webinarReducer,
	applicationReducer,
  topSpeakerReducer,
	contactUsReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

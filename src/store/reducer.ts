import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import applicationReducer from "./application-store/applicationReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	applicationReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

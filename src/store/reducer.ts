import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import organizationReducer from "./organization-store/organizationReducer";
import applicationReducer from "./application-store/applicationReducer";

const reducers = combineReducers({
	userReducer,
	eventReducer,
	organizationReducer,
	applicationReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

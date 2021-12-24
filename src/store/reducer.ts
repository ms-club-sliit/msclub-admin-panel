import { combineReducers } from "redux";
import userReducer from "./user-store/userReducer";
import eventReducer from "./event-store/eventReducer";
import organizationReducer from "./organization-store/organizationReducer";

const reducers = combineReducers({
  userReducer,
  eventReducer,
  organizationReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;

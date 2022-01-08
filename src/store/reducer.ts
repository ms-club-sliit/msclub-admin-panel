import { combineReducers } from 'redux';
import userReducer from './user-store/userReducer';
import eventReducer from './event-store/eventReducer';
import webinarReducer from './webinar-store/webinarReducer';

const reducers = combineReducers({
  userReducer,
  eventReducer,
  webinarReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;
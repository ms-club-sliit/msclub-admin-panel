import { combineReducers } from 'redux';
import userReducer from './user-store/userReducer';
import eventReducer from './event-store/eventReducer';

const reducers = combineReducers({
  userReducer,
  eventReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;
import { combineReducers } from 'redux';
import userReducer from './user-store/userReducer';
import eventReducer from './event-store/eventReducer';
import topSpeakerReducer from './top-speaker-store/topSpeakerReducer';

const reducers = combineReducers({
  userReducer,
  eventReducer,
  topSpeakerReducer,
});

export type AppState = ReturnType<typeof reducers>;
export default reducers;
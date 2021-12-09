import { IEventState } from './IEvent';
import EventActionTypes from './eventActionTypes';

const initialState: IEventState = {
  events: [],
  addEvent: null,
  updateEvent: null,
  removeEvent: null,
  loading: false,
  error: null
};

const eventReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case `${EventActionTypes.CREATE_EVENT}_PENDING`:
    case `${EventActionTypes.GET_EVENT}_PENDING`:
    case `${EventActionTypes.GET_ALL_EVENTS}_PENDING`:
    case `${EventActionTypes.UPDATE_EVENT}_PENDING`:
    case `${EventActionTypes.DELETE_EVENT}_PENDING`:
      return { ...state, loading: true };
    
    case `${EventActionTypes.CREATE_EVENT}_FULFILLED`:
      let newEvent = action.payload.data;
      return { ...state, loading: false, newEvent };
    case `${EventActionTypes.GET_EVENT}_FULFILLED`:
      let event = action.payload.data;
      return { ...state, loading: false, event };
    case `${EventActionTypes.GET_ALL_EVENTS}_FULFILLED`:
      let events = action.payload.data;
      return { ...state, loading: false, events };
    case `${EventActionTypes.UPDATE_EVENT}_FULFILLED`:
      let updatedEvent = action.payload.data;
      return { ...state, loading: false, updatedEvent };
    case `${EventActionTypes.DELETE_EVENT}_FULFILLED`:
      let deletedEvent = action.payload.data;
      return { ...state, loading: false, deletedEvent };

    case `${EventActionTypes.CREATE_EVENT}_REJECTED`:
    case `${EventActionTypes.GET_EVENT}_REJECTED`:
    case `${EventActionTypes.GET_ALL_EVENTS}_REJECTED`:
    case `${EventActionTypes.UPDATE_EVENT}_REJECTED`:
    case `${EventActionTypes.DELETE_EVENT}_REJECTED`: 
      return {...state, loading: false, error: `${action.payload.message}`, state: initialState };
     
    default:
      return state;
  }
}

export default eventReducer;
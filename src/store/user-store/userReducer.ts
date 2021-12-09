import { IUserState } from "./IUser";
import UserActionTypes from "./userActionTypes";

const initialState: IUserState = {
  user: null,
  users: [],
  newUser: null,
  updatedUser: null,
  deletedUser: null,
  loggedUser: null,
  loading: false,
  error: null
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case `${UserActionTypes.CREATE_USER}_PENDING`:
    case `${UserActionTypes.GET_USER}_PENDING`:
    case `${UserActionTypes.GET_ALL_USERS}_PENDING`:
    case `${UserActionTypes.UPDATE_USER}_PENDING`:
    case `${UserActionTypes.DELETE_USER}_PENDING`:
    case `${UserActionTypes.LOGIN_USER}_PENDING`:
      return { ...state, loading: true };

    case `${UserActionTypes.CREATE_USER}_FULFILLED`:
      let newUser = action.payload.data;
      return { ...state, loading: false, newUser };
    case `${UserActionTypes.GET_USER}_FULFILLED`:
      let user = action.payload.data;
      return { ...state, loading: false, user };
    case `${UserActionTypes.GET_ALL_USERS}_FULFILLED`:
      let users = action.payload.data;
      return { ...state, loading: false, users };
    case `${UserActionTypes.UPDATE_USER}_FULFILLED`:
      let updatedUser = action.payload.data;
      return { ...state, loading: false, updatedUser };
    case `${UserActionTypes.DELETE_USER}_FULFILLED`:
      let deletedUser = action.payload.data;
      return { ...state, loading: false, deletedUser };
    case `${UserActionTypes.LOGIN_USER}_FULFILLED`:
      let loggedUser = action.payload.data;
      return { ...state, loading: false, loggedUser };
    
    case `${UserActionTypes.CREATE_USER}_REJECTED`:
    case `${UserActionTypes.GET_USER}_REJECTED`:
    case `${UserActionTypes.GET_ALL_USERS}_REJECTED`:
    case `${UserActionTypes.UPDATE_USER}_REJECTED`:
    case `${UserActionTypes.DELETE_USER}_REJECTED`:
    case `${UserActionTypes.LOGIN_USER}_REJECTED`:
      return { ...state, loading: false, error: `${action.payload.message}`, state: initialState };
    
    default:
      return state;
  }
}

export default userReducer;
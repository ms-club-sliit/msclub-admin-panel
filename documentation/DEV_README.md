> Please read this documentation before you start implementation

## Project Structure :spiral_notepad:

### :open_file_folder: `public` \

This folder contain the static files.

- `index.html` :page_facing_up:
- `favicon.ico` :page_facing_up:
- `assets` :file_folder:
  > When you want to add images to the application, please add those imagest to the `/assets/` :file_folder:. To import the images, please use following format. Do not import images as file into the React components.

E.g.: Import MS Club logo to the image tag. \
`<img src="/assets/ms-club-logo.png" alt="logo" />`

### :open_file_folder: `src` \

This folder contain all the React components and pages that are renderd to the browser. The `src` :open_file_folder: include,

- :file_folder: `api` - Implement all the API calling in this folder
- :file_folder: `assets` - This folder contains fonts and images (Static)
- :file_folder: `components` - Implement UI components in this folder.
- :file_folder: `constants` - Declare all the constants in this folder's `index.ts` file.
- :file_folder: `data` - Add all the data files (`.json`) files to this folder.
- :file_folder: `interfaces` - Declare all the component interfaces in this folder.
- :file_folder: `pages` - Contains main pages in the application.
- :file_folder: `routes` - Declare page routes in this folder.
- :file_folder: `styles` - Implement style files in this folder and then import that files into the `App.scss` file.
- :page_facing_up: `App.tsx`
- :page_facing_up: `index.tsx`
- :page_facing_up: `reportWebVitals.ts`
- :page_facing_up: `setupTests.ts`

## IMPORTANT NOTES :pencil2:

### Install Dependencies

Please you `yarn` to install the dependencies to the application. \
Example: Install `axios` to the application. \
`$ yarn add axios` \
Or if you want to install all the dependencies, use this command. \
`$ yarn install`

### Start the Application

Use following command to start the application. \
`$ yarn start`

### Implement UI Components

When you start implement a UI component, create a folder by using the name of the component. Then create an `index.tsx` :page_facing_up: to implement the UI logic. Please go through the following example.

> Implement a `card` component. (This example already there in the codebase. Please take a :eyes:). The same steps are applied to the `pages` implementation.

1. Create a folder called `card` inside the `components` :open_file_folder:
2. Create an `index.tsx` file inside the `card` folder.
3. Implement your UI.
4. Export that component as default.
5. Go to the `/components/index.tsx` file.
6. Import the `Card` component to the file.
7. Add that `Card` component to the `export` section.

# The `store` folder that contains files related to React Redux.

### Create the types

- TypeScript types allows you to set types for your variables, function parameters, and so on.
- `store/user-store/IUSER.ts`

```
interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  profileImage: string | null;
  authToken: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### Create the action types

- `store/user-store/userActionTypes.ts`

```
// User action types
enum UserActionTypes {
  CREATE_USER = 'CREATE_USER',
  GET_ALL_USERS = 'GET_ALL_USERS',
  GET_USER = 'GET_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  LOGIN_USER = 'LOGIN_USER',
}

export default UserActionTypes;
```

### Create the action creators

- `store/user-store/userActions.ts`

```
import UserActionTypes from "./userActionTypes";
import { IUser } from "./IUser";
import UserAPI from "../api/UserAPI";

export const createUser = (data: IUser) => {
  return {
    type: UserActionTypes.CREATE_USER,
    payload: UserAPI.createUser(data)
  };
}

export const getUserInfo = () => {
  return {
    type: UserActionTypes.GET_USER,
    payload: UserAPI.getUser()
  };
}

export const getAllUsers = () => {
  return {
    type: UserActionTypes.GET_ALL_USERS,
    payload: UserAPI.getAllUser(),
  };
}

export const updateUser = (data: IUser) => {
  return {
    type: UserActionTypes.UPDATE_USER,
    payload: UserAPI.updateUser(data),
  };
}

export const removeUser = () => {
  return {
    type: UserActionTypes.DELETE_USER,
    payload: UserAPI.deleteUser(),
  };
}

export const loginUser = (userName: string, password: string) => {
  return {
    type: UserActionTypes.LOGIN_USER,
    payload: UserAPI.login(userName, password),
  };
}
```

### Create a reducer

- A reducer is a pure function that receives the state of the store and an action as parameters and then returns the updated state.
- `store/user-store/userReducer.ts`

```
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
```

### Create a store

- A Redux store is where your app's state lives.
- `store/index.ts`

```
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Production Store
// const Store = createStore(reducers, applyMiddleware(promiseMiddleware));

// Development Store
const Store = createStore(reducers, composeEnhancers(
  applyMiddleware(promiseMiddleware)
));

export default Store;
```

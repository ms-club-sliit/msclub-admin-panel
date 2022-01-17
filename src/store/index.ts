import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import reducers from "./reducer";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

// Production Store
//const Store = createStore(reducers, applyMiddleware(promiseMiddleware));

//Development Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(reducers, composeEnhancers(applyMiddleware(promiseMiddleware)));

export default Store;

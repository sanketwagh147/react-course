// Only file to contain redux related files use slices as mentioned here to and import them here
// import { combineReducers, createStore } from "redux";
// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";
// import logger from "redux-logger";
// import { compose } from "redux";
// import { applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// const rootReducer = combineReducers({
// 	account: accountReducer,
// 	customer: customerReducer,
// });

// const middlewares = [logger];
// const composedEnhancers = compose(applyMiddleware(...middlewares));
// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(thunk))
// 	// composedEnhancers
// );

// export default store;

// import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";

// const rootReducer = combineReducers({
// 	account: accountReducer,
// 	customer: customerReducer,
// });

// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
});

export default store;

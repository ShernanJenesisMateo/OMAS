import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

const saga = createSagaMiddleware();
const store = configureStore({
	reducer: {
		// add more reducers here
	},
	middleware: [saga],
});

export default store;
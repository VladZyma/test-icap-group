import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { loginReducer } from "./features/login/loginSlice";

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = configureStore({ reducer: rootReducer });

export { store };

import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { loginReducer } from "./features/login/loginSlice";
import { userReducer } from "./features/user/userSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
});

const store = configureStore({ reducer: rootReducer });

export { store };

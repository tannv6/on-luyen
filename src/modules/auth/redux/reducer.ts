import storage from "redux-persist/lib/storage";
import { ReducersConfig } from "../../../config";
import { persistReducer } from "redux-persist";

const initState = {
  userInfo: null,
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        userInfo: action.response,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userInfo: null,
      };
    }
    default:
      return state;
  }
};

const authStoreConfig = {
  key: "auth",
  storage,
  whitelist: ["userInfo"],
};

ReducersConfig.register("auth", persistReducer(authStoreConfig, reducer));

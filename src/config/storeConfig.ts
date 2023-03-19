import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import ReducersConfig from "./reducersConfig";
import "../modules/main/redux/reducers";
import "../modules/main/redux/middleware";
import "../modules/auth/redux/reducer";
import { persistStore } from "redux-persist";
import MidlewareConfig from "./middlewaresConfig";

const logger = (store: any) => (next: any) => (action: any) => {
  console.log(
    "%cdispatching:",
    "color: yellow; font-style: italic;padding: 2px",
    action
  );
  const result = next(action);
  console.log(
    "%cnext state:",
    "color: #4bf542; font-style: italic;padding: 2px",
    store.getState()
  );
  return result;
};

const store = createStore(
  ReducersConfig.getAll(),
  compose(applyMiddleware(...MidlewareConfig.getAll(), logger))
);

const persistor = persistStore(store);

export { store, persistor };

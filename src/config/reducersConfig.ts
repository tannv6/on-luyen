import { combineReducers, Reducer } from "redux";

class ReducerRegistry {
  reducer: any = {};
  register = (name: any, redu: any) => {
    this.reducer = {
      ...this.reducer,
      [name]: redu,
    };
  };
  getAll = () => combineReducers({ ...this.reducer });
}

const ReducersConfig = new ReducerRegistry();

export default ReducersConfig;

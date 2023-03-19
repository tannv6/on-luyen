import storage from "redux-persist/lib/storage";
import Reducers from "../../../config/reducersConfig";
import { persistReducer } from "redux-persist";
import { TMainStates } from "../utils/types";
import { STAGE_OF_STORE } from "../../global/utils/constants";

const initState: TMainStates = {
  knowledges: {
    data: [],
    stage: STAGE_OF_STORE.INIT,
  },
  messages: {
    data: [],
    stage: STAGE_OF_STORE.INIT,
  },
  isOpenNav: true,
  isOpenChat: false,
};

const reducer = (state = initState, action: any): TMainStates => {
  switch (action.type) {
    case "GET_KNOWLEDGE": {
      return {
        ...state,
        knowledges: {
          ...state.knowledges,
          stage: STAGE_OF_STORE.LOADING,
        },
      };
    }
    case "SET_KNOWLEDGE":
      return {
        ...state,
        knowledges: {
          ...state.knowledges,
          data: action.response,
          stage: STAGE_OF_STORE.SUCCESS,
        },
      };
    case "SET_LIST_CHAT": {
      return {
        ...state,
        messages: {
          ...state.messages,
          data: [...state.messages.data].concat(action.response),
        },
      };
    }
    case "NEW_CHAT": {
      return {
        ...state,
        messages: {
          ...state.messages,
          data: [...state.messages.data].concat(action.response),
        },
      };
    }
    case "SET_OPEN_NAV": {
      return {
        ...state,
        isOpenNav: action.response,
      };
    }
    case "SET_OPEN_CHAT": {
      return {
        ...state,
        isOpenChat: action.response,
      };
    }
    default:
      return state;
  }
};

const aConfig = {
  key: "main",
  storage,
  whitelist: ["isOpenNav", "isOpenChat"],
};

Reducers.register("main", persistReducer(aConfig, reducer));

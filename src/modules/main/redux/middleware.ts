import { MidlewareConfig } from "../../../config";
import {
  apiCreateKnowledges,
  apiDeleteKnowLedge,
  apiGetKnowledges,
  apiUpdateKnowledge,
} from "./services";

const midleware =
  ({ dispatch, getState }: any) =>
  (next: any) =>
  async (action: any) => {
    next(action);
    switch (action.type) {
      case "GET_KNOWLEDGE": {
        const res = await apiGetKnowledges();
        return dispatch({
          type: "SET_KNOWLEDGE",
          response: res.data,
        });
      }
      case "CREATE_KNOWLEDGE": {
        const { answer, knowledge_name } = action.params;
        await apiCreateKnowledges({
          answer,
          knowledge_name,
        });
        action.setKnowledge({
          knowledge_name: "",
          answer: "",
        });
        return dispatch({
          type: "GET_KNOWLEDGE",
        });
      }
      case "UPDATE_KNOWLEDGE": {
        const { answer, knowledge_name, id } = action.params;
        await apiUpdateKnowledge({
          id,
          knowledge_name,
          answer,
        });
        return dispatch({
          type: "GET_KNOWLEDGE",
        });
      }
      case "DELETE_KNOWLEDGE": {
        await apiDeleteKnowLedge(action.params);
        return dispatch({
          type: "GET_KNOWLEDGE",
        });
      }
    }
  };

MidlewareConfig.register(midleware);

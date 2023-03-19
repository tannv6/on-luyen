import { Api } from "../../../config/apisConfig";
import { TGetKnowledgeResponse } from "../utils/responseTypes";

const apiGetKnowledges = (): Promise<TGetKnowledgeResponse> => {
  return Api.get("/knowledge", {});
};

const apiCreateKnowledges = (params: {
  knowledge_name: string;
  answer: string;
}) => {
  return Api.post("/create", params);
};

const apiUpdateKnowledge = (params: {
  id: string;
  knowledge_name: string;
  answer: string;
}) => {
  return Api.put("/update", params);
};

const apiDeleteKnowLedge = (id: string) => {
  return Api.delete(`/delete/${id}`, {});
};

const apiSaveMessage = (params: { user: string; content: string }) => {
  return Api.post("/messages/create", params);
};

const apiGetListMessage = () => {
  return Api.get("/messages", {});
};

export {
  apiGetKnowledges,
  apiCreateKnowledges,
  apiDeleteKnowLedge,
  apiUpdateKnowledge,
  apiSaveMessage,
  apiGetListMessage,
};

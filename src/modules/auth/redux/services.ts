import { Api } from "../../../config/apisConfig";

const apiLogin = (params: any) => {
  return Api.post("/login", params);
};

export { apiLogin };

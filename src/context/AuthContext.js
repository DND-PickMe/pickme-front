import React, { createContext, useState } from "react";
import { BASE_URL } from "../api_manager/urls";
import { api } from "../api";

const AuthContext = createContext();
const { Provider, Consumer: AuthConsumer } = AuthContext;

const AuthProvider = props => {
  const [userName, _setUserName] = useState("");
  const [userAuthorized, _setUserAuthorized] = useState(false);

  const checkUserAuth = async () => {
    let res = api.get(`${BASE_URL}`);
    if (!res.ok) {
      _setUserAuthorized(false);
      return false;
    }
    _setUserName(res.data.nickname);
    _setUserAuthorized(true);
    return true;
  };

  const state = { userName, userAuthorized };
  const actions = { checkUserAuth };

  return <Provider value={{ state, actions }}>{props.children}</Provider>;
};

export { AuthContext, AuthProvider, AuthConsumer };

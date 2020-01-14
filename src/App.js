import React from "react";
import { Route } from "react-router-dom";
import { PATH_SIGNIN, PATH_SIGNUP, PATH_MAIN } from "./constants/models/routes";
import SignIn from "./route/auth/SignIn";
import SignUp from "./route/auth/SignUp";
import Main from "./route/main/Main";

const App = () => {
  return (
    <div>
      <Route path={PATH_SIGNIN} component={SignIn} />
      <Route path={PATH_SIGNUP} component={SignUp} />
      <Route path={PATH_MAIN} component={Main} />
    </div>
  );
};

export default App;

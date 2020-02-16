import React from "react";
import { Route, Redirect } from "react-router-dom";
import {PATH_AUTH_CHECK} from "../route/paths";
import { AuthConsumer } from "../context/AuthContext";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <AuthConsumer>
        {
          (auth) => {
            console.log(auth.state);
            return (
              auth.state.userAuthorized
              ? <Component {...props}/>
                :
                <Redirect to={`${PATH_AUTH_CHECK}?redirect=${props.location.pathname}`}
            />
            )
          }
        }
      </AuthConsumer>
    }
  />
);

import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  PATH_SIGN_IN, PATH_SIGN_UP, PATH_MAIN, PATH_ENTERPRISES,
  PATH_WELCOME, PATH_USER_PROFILE, PATH_AUTH_CHECK, PATH_ADD_RESUME, PATH_EXPLORE, PATH_RESUME, PATH_ENTERPRISE
} from "./route/paths";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Enterprises from "./pages/enterprise/Enterprises";
import Welcome from "./pages/Welcome";
import Profile from "./pages/auth/Profile";
import AddResume from './pages/resume/AddResume';
import { PrivateRoute } from "./route/PrivateRoute";
import { AuthProvider, AuthConsumer } from "./context/AuthContext";
import AuthCheck from "./pages/auth/AuthCheck";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./components/AppBar";
import Resume from "pages/resume/Resume";
import Enterprise from "pages/enterprise/Enterprise";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

const App = props => {
  const classes = useStyles();

  return (
    <AuthProvider>
      <AppBar {...props}></AppBar>
      <div className={classes.toolbar} />
      <Switch>
        <Route path={PATH_AUTH_CHECK} component={AuthCheck} />
        <Route path={PATH_SIGN_IN} component={SignIn} />
        <Route path={PATH_SIGN_IN} component={SignIn} />
        <Route path={PATH_SIGN_UP} component={SignUp} />

        <Route path={PATH_MAIN} component={Main} />
        <Route path={PATH_EXPLORE} component={Explore} />
        <PrivateRoute path={PATH_ENTERPRISE} component={Enterprise} />
        <Route path={PATH_ENTERPRISES} component={Enterprises} />

        <PrivateRoute path={PATH_USER_PROFILE} component={Profile} />
        <PrivateRoute path={PATH_ADD_RESUME} component={AddResume} />
        <PrivateRoute path={PATH_RESUME} component={Resume} />

        <Route path={PATH_WELCOME} component={Welcome} />
      </Switch>
    </AuthProvider>
  );
};

export default withRouter(App);

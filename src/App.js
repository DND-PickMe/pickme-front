import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { PATH_SIGN_IN, PATH_SIGN_UP, PATH_MAIN, PATH_JOBS, PATH_ENTERPRISE, PATH_WELCOME, PATH_USER_PROFILE, PATH_AUTH_CHECK, PATH_USER_RESUME, PATH_EXPLORE } from "./route/paths";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Main from "./pages/main/Main";
import Explore from "./pages/explore/Explore";
import Enterprise from "./pages/enterprise/Enterprise";
import Welcome from "./pages/Welcome";
import Profile from "./pages/auth/Profile";
import Resume from './pages/resume/Resume';
import { PrivateRoute } from "./route/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AuthCheck from "./pages/auth/AuthCheck";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "./components/AppBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const App = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthProvider>
        {console.log(props)}
        <AppBar {...props}></AppBar>

        <div style={{ marginTop: 70 }} />

        <Switch>
          <Route path={PATH_AUTH_CHECK} component={AuthCheck} />
          <Route path={PATH_SIGN_IN} component={SignIn} />
          <Route path={PATH_SIGN_IN} component={SignIn} />
          <Route path={PATH_SIGN_UP} component={SignUp} />

          <Route path={PATH_MAIN} component={Main} />
          <Route path={PATH_EXPLORE} component={Explore} />
          <Route path={PATH_ENTERPRISE} component={Enterprise} />

          <PrivateRoute path={PATH_USER_PROFILE} component={Profile} />
          <Route path={PATH_USER_RESUME} component={Resume} />

          <Route path={PATH_WELCOME} component={Welcome} />
        </Switch>
      </AuthProvider>
    </div>
  );
};

export default withRouter(App);

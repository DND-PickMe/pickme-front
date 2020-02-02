import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import {
    PATH_SIGNIN,
    PATH_SIGNUP,
    PATH_MAIN,
    PATH_JOBS,
    PATH_ENTERPRISE,
    PATH_WELCOME,
    PATH_USER_PROFILE
} from "./constants/paths";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Main from "./pages/main/Main";
import Root from "./components/Root";
import AppBar, {AppBarItem} from "./components/AppBar";
import Explore from "./pages/explore/Explore";
import Enterprise from "./pages/enterprise/Enterprise";
import Welcome from "./pages/Welcome";
import Profile from "./pages/auth/Profile";

const App = ({history, match, location}) => {
    return (
        <div className="App">
            <Root>
                <AppBar>
                    <AppBarItem title={'Main'} to={`${PATH_MAIN}`}/>
                    <AppBarItem title={'Explore'} to={`${PATH_JOBS}`}/>
                    <AppBarItem title={'Enterprise'} to={`${PATH_ENTERPRISE}`}/>
                </AppBar>

                <div style={{marginTop: 70}}/>

                <Switch>
                    <Route path={PATH_SIGNIN} component={SignIn}/>
                    <Route path={PATH_SIGNUP} component={SignUp}/>

                    <Route path={PATH_MAIN} component={Main}/>
                    <Route path={PATH_JOBS} component={Explore}/>
                    <Route path={PATH_ENTERPRISE} component={Enterprise}/>

                    <Route path={PATH_USER_PROFILE} component={Profile}/>

                    <Route path={PATH_WELCOME} component={Welcome}/>
                </Switch>
            </Root>
        </div>
    );
};

export default withRouter(App);

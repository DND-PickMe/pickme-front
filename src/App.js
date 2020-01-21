import React from "react";
import {Route, Switch} from "react-router-dom";
import {
    PATH_SIGNIN,
    PATH_SIGNUP,
    PATH_MAIN,
    PATH_JOBS,
    PATH_COMPANY,
    PATH_WELCOME,
    PATH_USER_PROFILE
} from "./constants/paths";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Main from "./pages/main/Main";
import Root from "./components/Root";
import AppBar, {AppBarItem} from "./components/AppBar";
import Jobs from "./pages/jobs/Jobs";
import Company from "./pages/company/Company";
import Welcome from "./pages/Welcome";
import Profile from "./pages/auth/Profile";

const App = () => {
    return (
        <div className="App">
            <Root>
                <AppBar>
                    <AppBarItem title={'Main'} to={`${PATH_MAIN}`}/>
                    <AppBarItem title={'Jobs'} to={`${PATH_JOBS}`}/>
                    <AppBarItem title={'Company'} to={`${PATH_COMPANY}`}/>
                </AppBar>

                <Switch>
                    <Route path={PATH_WELCOME} component={Welcome}/>

                    <Route path={PATH_SIGNIN} component={SignIn}/>
                    <Route path={PATH_SIGNUP} component={SignUp}/>

                    <Route path={PATH_MAIN} component={Main}/>
                    <Route path={PATH_JOBS} component={Jobs}/>
                    <Route path={PATH_COMPANY} component={Company}/>

                    <Route path={PATH_USER_PROFILE} component={Profile}/>
                </Switch>
            </Root>
        </div>
    );
};

export default App;

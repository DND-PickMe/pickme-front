import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {PATH_MAIN, PATH_SIGN_IN} from "../../route/paths";
import qs from "querystring";
import {Redirect} from "react-router-dom";

const AuthCheck = props => {
  const {checkUserAuth} = useContext(AuthContext).actions;
  const [renderComponent, setRenderComponent] = useState(<h2>로그인 필요한 화면입니다.</h2>);

  useEffect(()=>{
    let redirect = qs.parse(props.location.search.substr(1)).redirect || PATH_MAIN;
    checkUserAuth().then(isAuthorized=>{
      if (isAuthorized){
        setRenderComponent(<Redirect to={`${redirect}`}/>);
      }else{
        setRenderComponent(<Redirect to={`${PATH_SIGN_IN}?redirect=${redirect}`}/>);
      }
  })
  }, []);

  return renderComponent;
};

export default AuthCheck;
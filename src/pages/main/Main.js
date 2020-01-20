import React from "react";
import {makeStyles} from '@material-ui/styles';
import CardWrapper from "../../components/CardWrapper";

const useStyles = makeStyles({});

const Main = (props) => {
    const classes = useStyles();

    return (
        <div>
            <h1>Main Page</h1>
            <CardWrapper/>
            <CardWrapper/>
            <CardWrapper/>
        </div>
    );
};

export default Main;
import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({});
const Welcome = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Welcome</h1>
        </div>
    );
};

export default Welcome;
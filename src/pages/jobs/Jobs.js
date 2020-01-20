import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({});
const Jobs = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Jobs</h1>
        </div>
    );
};

export default Jobs;
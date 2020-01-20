import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({});
const Company = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Company</h1>
        </div>
    );
};

export default Company;
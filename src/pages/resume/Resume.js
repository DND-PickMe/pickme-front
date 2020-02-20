import React from 'react';
import SelfInterview from './SelfInterview';
import UserInfo from './UserInfo';
import Experience from './Experience';
import License from './License';
import Prize from './Prize';
import Project from './Project';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  Paper: {
    padding: theme.spacing(10)
  }
}));
const Resume = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.Paper}>
        <Typography variant="h2">Resume</Typography>
        <UserInfo />
        <SelfInterview />
        <Experience />
        <License />
        <Prize />
        <Project />
      </Paper>
    </div>
  );
};

export default Resume;
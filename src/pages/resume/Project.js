import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
    root: {

    },
    projectName: {

    },
    projectRole: {

    },
    projectStartAt: {

    },
    projectEndAt: {

    },
    projectDescription: {
        
    }

});

const Project = () => {
    const classes = useStyles();
    return (
        <div>
            <h2>Project</h2>
            <TextField className={classes.projectName} id="project-name" label="프로젝트명" variant="outlined" />
            <TextField className={classes.projectRole} id="project-role" label="역할" variant="outlined" />
            <TextField className={classes.projectStartAt} id="project-startdate" label="시작 날짜" variant="outlined" />
            <TextField className={classes.projectEndAt} id="project-enddate" label="끝낸 날짜" variant="outlined" />
            <TextField className={classes.projectDescription} id="project-description" fullWidth multiline rows="4" label="프로젝트 설명" variant="outlined" />
        </div>
    );
};

export default Project;
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
	root: {

	},
	experienceName: {

	},
	experiencePosition: {

	},
	experienceJoin: {

	},
	experienceRetire: {

	},
	experienceDescription: {

	}
})

const Experience = () => {
	const classes = useStyles();
	return (
		<div classNaem={classes.root}>
			<h2>Experience</h2>
			<TextField className={classes.experienceName} id="experience-name" label="회사명" variant="outlined" />
			<TextField className={classes.experiencePosition} id="experience-position" label="역할" variant="outlined" />
			<TextField className={classes.experienceJoin} id="experience-join" label="입사날짜" variant="outlined" />
			<TextField className={classes.experienceRetire} id="experience-retire" label="퇴사날짜" variant="outlined" />
			<TextField className={classes.experienceDescription} id="experience-description" fullWidth multiline rows="4" label="간단 설명" variant="outlined" />
		</div>
	);
};

export default Experience;
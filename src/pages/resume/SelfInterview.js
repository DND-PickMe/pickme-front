import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField/TextField';

const useStyles = makeStyles({
	root: {

	},
	interviewTitle: {

	},
	interviewContent: {

	}

});

const SelfInterview = () => {

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h2>Self Interview</h2>
			<TextField className={classes.interviewTitle} id="interview-title" fullWidth label="Title" variant="outlined" />
			<TextField className={classes.interviewContent} id="interview-content" fullWidth multiline rows="10" label="Content" variant="outlined" />
		</div>
	);
};

export default SelfInterview;
import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    searchBar: {
        backgroundColor: 'yellow',
        display: 'flex',
    },
    item: {
        border: '2px solid',
        textAlign: 'center',
        width: 120,
        fontSize: 20,
    }
});
const Explore = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Explore</h1>

            <SearchBar>
                <SearchItem title={'업무 분야'}/>
                <SearchItem title={'지역'}/>
                <SearchItem title={'경력'}/>
                <SearchItem title={'희망 연봉'}/>
            </SearchBar>
        </div>
    );
};

const SearchBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.searchBar}>
            {props.children}
        </div>
    )
};

const SearchItem = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            {props.title}
        </div>
    )
};

export default Explore;
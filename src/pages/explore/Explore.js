import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem, InputLabel, Card, TextField, Button, Grid } from "@material-ui/core"
import { api } from "api";
import { __POSITIONS, __CAREER } from "constants/values";
import UserCard from "components/UserCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  formControl: {
    minWidth: 150,
  },
}));


let loadUrl = 'accounts';
const Explore = props => {
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState({});
  const [suggestions, SetSuggestions] = useState([]);
  const [nickname, setNickname] = useState("");
  const [loadable, setLoadable] = useState(true);


  const getAccounts = async () => {
    if (!loadable) { return }
    try {
      const res = await api.get(loadUrl, { params: { ...filter, size: 12 } });
      if (res.status === 200) {
        const results = res.data._embedded
        setAccounts(results ? accounts.concat(results.accountResponseDtoList) : [])
      }
      setLoadable(Boolean(res.data._links.next));
      if (loadable) {
        loadUrl = res.data._links.next.href
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, accounts]);

  useEffect(() => {
    loadUrl = 'accounts';
    setLoadable(true);
    setAccounts([]);
    getSuggestions();
  }, [filter])

  const getSuggestions = () => {
    api.get("technologies").then(res => {
      SetSuggestions(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleIntersection = entrys => {
    const first = entrys[0];
    if (first.isIntersecting) {
      getAccounts();
    }
  }

  const filterChange = key => event => {
    setFilter({ ...filter, [key]: event.target.value })
    console.log({ ...filter, [key]: event.target.value });
  };

  const filterTech = value => {
    setFilter({ ...filter, technology: value ? value.name : "" });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-label">직군</InputLabel>
            <Select
              labelWidth={40}
              value={filter.position}
              onChange={filterChange("positions")}
              defaultValue=""
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(__POSITIONS).map(key => (
                <MenuItem value={key}>{__POSITIONS[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">경력</InputLabel>
            <Select
              labelWidth={40}
              value={filter.career}
              onChange={filterChange("career")}
              defaultValue=""
            >
              <MenuItem value="">전체</MenuItem>
              {Object.keys(__CAREER).map(key => (
                <MenuItem value={key}>{__CAREER[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={2}>
          <Autocomplete
            options={suggestions}
            getOptionLabel={suggestion => suggestion.name}
            renderInput={params => <TextField {...params} label="기술" variant="outlined" />}
            onChange={(e, v) => filterTech(v)}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <TextField
            variant="outlined"
            label="이름"
            onChange={e => setNickname(e.target.value)}
            fullWidth>
          </TextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <Button
            onClick={() => setFilter({ ...filter, nickName: nickname })}
            variant="contained"
            style={{ height: 56 }}
            color="primary">검색</Button>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }} />

      <UserCard accounts={accounts} {...props} />

      {
        loadable ?
          <Grid ref={setTarget} container spacing={2}>
            {[360, 350, 345, 360, 350, 360, 345].map((h, i) =>
              <Grid item xs={12} md={4} key={i}>
                <Skeleton animation="wave" style={{ height: h }} />
              </Grid>
            )}
          </Grid>
          :
          <div ref={setTarget} style={{ margin: 20 }}>데이터가 없습니다.</div>
      }
    </div >
  );
};

export default Explore;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, MenuItem, InputLabel, Card, TextField, Button, Grid } from "@material-ui/core"
import { api } from "api";
import { __POSITIONS, __CAREER } from "constants/values";
import UserCard from "components/UserCard";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  formControl: {
    minWidth: 150,
  },
}));


let loadUrl = 'accounts';
let loadable = true;
const Explore = props => {
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState({});
  const [suggestions, SetSuggestions] = useState([]);

  const getAccounts = async () => {
    if (!loadable) { return }
    try {
      if (filter.positions || filter.career) {
        const res = await api.get(loadUrl, { params: { ...filter, size: 18 } });
        if (res.status === 200) {
          const results = res.data._embedded.accountResponseDtoList
          setAccounts(results)
          loadable = Boolean(res.data._links.next);
          if (res.data._links.next) {
            loadUrl = res.data._links.next.href
          }
        }
      } else {
        const res = await api.get(loadUrl, { params: { size: 18 } });
        if (res.status === 200) {
          const results = res.data._embedded.accountResponseDtoList
          setAccounts(accounts.concat(results))
          loadable = Boolean(res.data._links.next);
          if (res.data._links.next) {
            loadUrl = res.data._links.next.href
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, accounts]);

  useEffect(() => {
    loadUrl = 'accounts/filter';
    loadable = true;
    getSuggestions();
    getAccounts();
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
    console.log(filter);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
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
            >
              {Object.keys(__POSITIONS).map(key => (
                <MenuItem value={key}>{__POSITIONS[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">경력</InputLabel>
            <Select
              labelWidth={40}
              value={filter.career}
              onChange={filterChange("career")}
            >
              {Object.keys(__CAREER).map(key => (
                <MenuItem value={key}>{__CAREER[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Autocomplete
            options={suggestions}
            getOptionLabel={suggestion => suggestion.name}
            renderInput={params => <TextField {...params} label="기술" variant="outlined" />}
          // onChange={(e, v) => setFilter({ ...filter, technologies: v.name })}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }} />

      <UserCard accounts={accounts} {...props} />
      <div ref={setTarget} style={{ margin: 20 }}>데이터가 없습니다.</div>
    </div >
  );
};

export default Explore;

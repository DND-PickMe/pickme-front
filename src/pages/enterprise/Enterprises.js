import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Grid, TextField, Button } from "@material-ui/core";
import { api } from "api";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  }
}));


let loadUrl = 'enterprises';
const Enterprises = props => {
  const classes = useStyles();
  const [target, setTarget] = useState(null);
  const [enterprises, setEnterprises] = useState([]);
  const [filter, setFilter] = useState({});
  const [inputs, setInputs] = useState({});
  const [loadable, setLoadable] = useState(true);

  const getEnterprise = async () => {
    if (!loadable) { return }
    try {
      const res = await api.get(loadUrl, { params: filter });
      if (res.status === 200) {
        const results = res.data._embedded
        setEnterprises(results?enterprises.concat(results.enterpriseResponseDtoList):[])
        setLoadable(Boolean(res.data._links.next));
        if (loadable) {
          loadUrl = res.data._links.next.href
        }
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
  }, [target, enterprises]);

  useEffect(() => {
    loadUrl = 'enterprises';
    setLoadable(true);
    setEnterprises([]);
  }, [filter])

  const handleIntersection = entrys => {
    const first = entrys[0];
    if (first.isIntersecting) {
      getEnterprise();
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <TextField
            variant="outlined"
            label="이름"
            onChange={e => setInputs({ ...inputs, name: e.target.value })}
            fullWidth>
          </TextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <TextField
            variant="outlined"
            label="주소"
            onChange={e => setInputs({ ...inputs, address: e.target.value })}
            fullWidth>
          </TextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <Button
            onClick={() => setFilter(inputs)}
            variant="contained"
            style={{ height: 56 }}
            color="primary">검색</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {enterprises && enterprises.map(enterprise =>
          <Grid item xs={12}
            onClick={
              () => props.history.push(`enterprises/${enterprise.account.id}`)
            }
          >
            <Card style={{ padding: 20 }}>
              <Typography variant="h5" style={{ marginBottom: 10 }}>{enterprise.name}</Typography>
              <Typography variant="h6" style={{ marginBottom: 10 }}>{enterprise.address}</Typography>
            </Card>
          </Grid>
        )}
      </Grid>

      {loadable ?
        <Grid ref={setTarget} container spacing={2}>
          {[140, 140, 140, 140, 140, 140, 140].map((h, i) =>
            <Grid item xs={12} key={i}>
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

export default Enterprises;
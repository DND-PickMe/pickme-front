
import React, { useEffect, useState } from "react";
import { api } from "api";
import { Typography, Card, Avatar, Chip, Paper, Button, IconButton } from "@material-ui/core";

export default (props) => {
  const [enterprise, setEnterprise] = useState(null);

  useEffect(() => {
    getEnterprise();
  }, [])

  const getEnterprise = () => {
    api.get(`enterprises/${props.match.params.id}`).then(res => {
      if (res.status === 200) {
        setEnterprise(res.data);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      {enterprise &&
        <Card elevation={1} style={{ margin: 12, padding: 30 }}>
          <Typography variant="h4" style={{ marginBottom: 20 }}>{enterprise.name}</Typography>
          <Typography variant="h5" style={{ marginBottom: 20 }}>{enterprise.address}</Typography>
          <Typography variant="h5" style={{ marginBottom: 20 }}>{enterprise.ceoName}</Typography>
        </Card>
      }
    </div>
  )
}
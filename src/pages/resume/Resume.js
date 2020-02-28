import React, {useEffect, useState} from "react";
import { api } from "api";

const Resume = (props) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    getResume();
  }, [])

  const getResume = () => {
    api.get(`accounts/${props.match.params.id}`).then(res => {
      setResume(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      {console.log(props)}
      Resume Detail
    </div>
  )
}

export default Resume;
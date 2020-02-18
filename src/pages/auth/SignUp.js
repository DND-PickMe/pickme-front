import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import { Button, makeStyles, Paper } from "@material-ui/core";
import {useFormik} from "formik";
import * as yup from "yup";
import PasswordInput from "../../components/PasswordInput";
import {api} from "../../api";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: yup.object().shape({
      orderedAt: yup.string().nullable()
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log(values);
      try {
        const res = await api.post('accounts',values);
        if(res.status===201) {
          alert("Success");
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
  const { values, handleChange, errors, setFieldTouched, touched, isValid, isSubmitting, handleSubmit, setFieldValue, resetForm, setErrors, submitForm } = formik;

  return (
    <div style={{ width: "40%", margin: "0 auto" }}>
      <Paper elevation={3} style={{ padding: 30 }}>
        <h2>회원가입</h2>
        <TextField onChange={handleChange("email")} fullWidth label="E-mail" variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <PasswordInput onChange={handleChange("password")}/>
        <div style={{ marginBottom: 20 }} />
        {/*<PasswordInput onChange={handleChange("password2")}/>*/}
        {/*<div style={{ marginBottom: 20 }} />*/}
        <TextField onChange={handleChange("nickName")} fullWidth label="닉네임" variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <TextField onChange={handleChange("oneLineIntroduce")} fullWidth label="한줄소개" variant="outlined" />
        <div style={{ marginBottom: 20 }} />
        <Button onClick={submitForm}>Summit</Button>
      </Paper>
    </div>
  );
};

export default SignUp;

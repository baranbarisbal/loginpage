import React, { useContext, useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { MY_MUTATION } from "../graphql/mutations";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField, Typography } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Geçersiz e-mail adresi").required("Zorunlu alan"),
  password: Yup.string().required("Zorunlu alan"),
});
const loginPage = () => {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useContext(userContext);
  const [authenticateUser] = useMutation(MY_MUTATION);

  useEffect(() => {
    let isAuth = JSON.parse(localStorage.getItem("user"));
    if (isAuth && isAuth !== null) {
      setUser(authenticateUser.user);
      navigate("/");
    }
  }, [user]);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        authenticateUser({
          variables: values,
        }).then((res) => {
          localStorage.setItem("token", res.data.authenticateUser.token);
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.authenticateUser.firstName)
          );
          setUser(res.data.authenticateUser.user);
        });
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <FormControl
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#eeeeee",
            textAlign: "center",
            width: "250px",
          }}
        >
          <Typography variant="h5">Giriş Sayfası</Typography>
          <TextField
            sx={{ paddingBottom: "5px" }}
            label="E-Mail"
            variant="outlined"
            type="text"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && errors.email}
          <TextField
            label="Şifre"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && errors.password}
          <Button type="submit">Giriş Yap</Button>
        </FormControl>
      )}
    </Formik>
  );
};

export default loginPage;

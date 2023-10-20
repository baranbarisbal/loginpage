import React, { useContext, useEffect } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { MY_MUTATION } from "../graphql/mutations";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Geçersiz e-mail adresi").required("Zorunlu alan"),
  password: Yup.string().required("Zorunlu alan"),
});

const loginPage = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(userContext);
  const [authenticateUser] = useMutation(MY_MUTATION);

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
          navigate("/");
        });
      }}
    >
      {({ handleSubmit, handleChange, values, errors, isValid, ...rest }) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",

                backgroundColor: "#fff",
                border: "1px solid #d0caca",
                textAlign: "center",
                width: "250px",
                padding: "32px 32px 32px 32px ",
              }}
            >
              <Typography variant="h5" paddingBottom={5}>
                Giriş Sayfası
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="E-Mail"
                variant="outlined"
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {(
                <Typography
                  variant="h8"
                  paddingBottom={1}
                  color="rgb(237,73,86)"
                >
                  {errors.email}
                </Typography>
              ) && (
                <Typography
                  variant="h8"
                  paddingBottom={1}
                  color="rgb(237,73,86)"
                >
                  {errors.email}
                </Typography>
              )}
              <TextField
                fullWidth
                size="small"
                label="Şifre"
                variant="outlined"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              {(
                <Typography color="rgb(237,73,86)" paddingTop={1} variant="h8">
                  {errors.password}
                </Typography>
              ) && (
                <Typography color="rgb(237,73,86)" paddingTop={1} variant="h8">
                  {errors.password}
                </Typography>
              )}
              <Button
                disabled={!isValid}
                fullWidth
                variant="contained"
                type="submit"
              >
                Giriş Yap
              </Button>
            </form>
          </Box>
        );
      }}
    </Formik>
  );
};

export default loginPage;

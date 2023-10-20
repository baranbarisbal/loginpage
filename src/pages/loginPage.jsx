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
  const { user, setUser } = useContext(userContext);
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
      {({ handleSubmit, handleChange, values, errors }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#eeeeee",
              textAlign: "center",
              width: "250px",
              paddingTop: "50px",
              paddingBottom: "50px",
              paddingRight: "25px",
              paddingLeft: "25px",
            }}
          >
            <Typography variant="h5" paddingBottom={5}>
              Giriş Sayfası
            </Typography>
            <TextField
              sx={{
                paddingBottom: "8px",
                borderRadius: "0",
                width: "268px",
                height: "50px",

                marginBottom: " 10px",
              }}
              label="E-Mail"
              variant="outlined"
              type="text"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            {(
              <Typography variant="h8" color="rgb(237,73,86)">
                {errors.email}
              </Typography>
            ) && (
              <Typography variant="h8" color="rgb(237,73,86)">
                {errors.email}
              </Typography>
            )}
            <TextField
              sx={{
                borderRadius: "0",
                width: "268px",
                height: "50px",
                marginBottom: " 10px",
              }}
              label="Şifre"
              variant="outlined"
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            {(
              <Typography color="rgb(237,73,86)" variant="h8">
                {errors.password}
              </Typography>
            ) && (
              <Typography color="rgb(237,73,86)" variant="h8">
                {errors.password}
              </Typography>
            )}
            <Button
              sx={{
                width: "195px",
                height: "32px",
                marginTop: "10px",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 149, 246)",
                color: "white",
                "&:hover": {
                  background: "#616161",
                },
              }}
              type="submit"
            >
              Giriş Yap
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default loginPage;

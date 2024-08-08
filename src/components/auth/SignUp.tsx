import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, signUpUser } from "../../features/user/userActions";
import {
  LinearProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import loginImage from "../../assets/login-image.png";
import loginImage2 from "../../assets/login-image-2.png";

import { z } from "zod";

// Define the schema with Zod
const validationSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email address is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
  passwordConfirmation: z.string().min(6, "Password confirmation must be at least 6 characters long").nonempty("Password confirmation is required"),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"], // Path to the field where the error should be displayed
});

const SignUpComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: any) => state.user.loading);
  const isAuthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );
  const navigate = useNavigate();
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      location: "",
      phoneNumber: "",
    },
    validate: (values) => {
      try {
        validationSchema.parse(values);
        return {}; // No errors
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors: { [key: string]: string } = {};
          err.errors.forEach((error) => {
            if (error.path.length) {
              errors[error.path[0]] = error.message;
            }
          });
          return errors;
        }
        return {};
      }
    },
    onSubmit: async (values) => {
      try {
        const dataToSend = {
         email: values.email, 
         password: values.password, 
         location: values.location, 
         phoneNumber: values.phoneNumber,
         passwordConfirmation: values.passwordConfirmation
        }
        await dispatch(signUpUser(dataToSend));
        showSnackbar("Sign-up successful!", "success");
      } catch (error) {
        showSnackbar("Sign-up failed", "error");
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
        style={{
          backgroundColor: "#171B36",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={loginImage}
          alt="Sign Up Logo"
          style={{ maxWidth: "60%" }}
        />
      </Grid>

      <Grid
        item
        xs={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {loading && <LinearProgress />}

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
                   <img
              src={loginImage2}
              alt="Book Rent Logo"
              style={{ maxWidth: "10%", marginRight: "10px" }}
            />
            <Typography variant="h5">Book Rent</Typography>
          </Box>

          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Create your account
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Email address"
                variant="outlined"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <FormHelperText error>
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              <FormHelperText error>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                name="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
              />
              <FormHelperText error>
                {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Location"
                variant="outlined"
                name="location"
                type="text"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
              />
              <FormHelperText error>
                {formik.touched.location && formik.errors.location}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                label="Phone number"
                variant="outlined"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              />
              <FormHelperText error>
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                margin: "20px 0",
                padding: "10px 0",
                backgroundColor: "#00ABFF",
              }}
              disabled={loading || !formik.isValid}
            >
              Sign Up
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "#00ABFF" }}
            >
              Login
            </Link>
          </Typography>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity as "success" | "error"}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpComponent;

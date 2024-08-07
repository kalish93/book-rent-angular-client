// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { login } from "../../features/user/userActions";
// import {
//   LinearProgress,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   FormControl,
//   FormHelperText,
//   Grid,
//   Typography,
//   Box,
//   Checkbox,
//   FormControlLabel,
//   Link,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { AppDispatch } from "../../app/store";
// import loginImage from "../../assets/login-image.png";
// import loginImage2 from "../../assets/login-image-2.png";

// const LoginComponent: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const loading = useSelector((state: any) => state.user.loading);
//   const isAuthenticated = useSelector(
//     (state: any) => state.user.isAuthenticated
//   );
//   const navigate = useNavigate();
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   const showSnackbar = (message: string, severity: "success" | "error") => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email address is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await dispatch(login(values.email, values.password));
//         showSnackbar("Login successful!", "success");
//       } catch (error) {
//         showSnackbar("Invalid email or password", "error");
//       }
//     },
//   });

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Grid container style={{ height: "100vh" }}>
//       <Grid
//         item
//         xs={6}
//         style={{
//           backgroundColor: "#171B36",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={loginImage}
//           alt="Book Rent Logo"
//           style={{ maxWidth: "60%" }}
//         />
//       </Grid>

//       <Grid
//         item
//         xs={6}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           style={{
//             width: "70%",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           {loading && <LinearProgress />}

//           <Box
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "20px",
//             }}
//           >
//             <img
//               src={loginImage2}
//               alt="Book Rent Logo"
//               style={{ maxWidth: "10%", marginRight: "10px" }}
//             />
//             <Typography variant="h5">Book Rent</Typography>
//           </Box>

//           <Typography variant="h6" style={{ marginBottom: "20px" }}>
//             Login into Book Rent
//           </Typography>

//           <form onSubmit={formik.handleSubmit}>
//             <FormControl fullWidth margin="normal">
//               <TextField
//                 label="Email address"
//                 variant="outlined"
//                 name="email"
//                 type="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//               />
//               <FormHelperText error>
//                 {formik.touched.email && formik.errors.email}
//               </FormHelperText>
//             </FormControl>
//             <FormControl fullWidth margin="normal">
//               <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={
//                   formik.touched.password && Boolean(formik.errors.password)
//                 }
//               />
//               <FormHelperText error>
//                 {formik.touched.password && formik.errors.password}
//               </FormHelperText>
//             </FormControl>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   name="rememberMe"
//                   color="primary"
//                   checked={formik.values.rememberMe}
//                   onChange={formik.handleChange}
//                 />
//               }
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               style={{
//                 margin: "20px 0",
//                 padding: "10px 0",
//                 backgroundColor: "#00ABFF",
//               }}
//               disabled={loading || !formik.isValid}
//             >
//               Login
//             </Button>
//           </form>
//           <Typography variant="body2" align="center">
//             Haven't an account?{" "}
//             <Link
//               href="/signup"
//               style={{ textDecoration: "none", color: "#00ABFF" }}
//             >
//               Sign up
//             </Link>
//           </Typography>
//           <Snackbar
//             open={snackbarOpen}
//             autoHideDuration={6000}
//             onClose={handleCloseSnackbar}
//             anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           >
//             <Alert
//               onClose={handleCloseSnackbar}
//               severity={snackbarSeverity as "success" | "error"}
//               sx={{ width: "100%" }}
//             >
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default LoginComponent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { z, ZodSchema } from "zod";
import { login } from "../../features/user/userActions";
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

// Define the schema with Zod
const validationSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email address is required"),
  password: z.string().nonempty("Password is required"),
});

const LoginComponent: React.FC = () => {
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
      rememberMe: false,
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
        await dispatch(login(values.email, values.password));
        showSnackbar("Login successful!", "success");
      } catch (error) {
        showSnackbar("Invalid email or password", "error");
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
          alt="Book Rent Logo"
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
            Login into Book Rent
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <FormHelperText error>
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  color="primary"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                />
              }
              label="Remember me"
            />
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
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center">
            Haven't an account?{" "}
            <Link
              href="/signup"
              style={{ textDecoration: "none", color: "#00ABFF" }}
            >
              Sign up
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

export default LoginComponent;

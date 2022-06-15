import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Container,
} from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Stack from "@mui/material/Stack";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Opacity } from "@mui/icons-material";
import "./login.css";
import Header from "./header";

const Login = () => {
  const url = app_config.api_url;

  const navigate = useNavigate();

  const loginForm = {
    email: "",
    password: "",
  };

  const loginSubmit = (values) => {
    //console.log(values);

    fetch(url + "/user/verify", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        res.json().then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));

          const item_value = sessionStorage.getItem("user");
          console.log(item_value);

          if (data.isAdmin) {
            sessionStorage.setItem("admin", JSON.stringify(data));
            navigate("/admin");
            return;
          }
          navigate("/main/browsenovel");
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Loggedin Successfully",
        });
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Loggedin Failed",
        });
      }
      //console.log(res.formData);
    });
  };

  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }

  return (
    <div className="signup-img" style={{ height: "calc(100vh - 70px)" }}>
      <Formik initialValues={loginForm} onSubmit={loginSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <div className="" style={{ width: "100%" }}>
            <div
              className="row align-items-center h-100"
              style={{ marginRight: "0" }}
            >
              <div className="col-lg-3 col-md-4 col-sm-6 col-11 mt-5 mx-auto">
                <Card
                  className="card1"
                  sx={{
                    maxWidth: 400,
                    bgcolor: "#ffffff66",
                  }}
                  style={{
                    borderStyle: "none",
                    borderRadius: 0,
                  }}
                >
                  <CardContent>
                    <Box>
                      <h2 className="text-center">LOGIN</h2>
                    </Box>
                    <p>
                      Don't have an account?{" "}
                      <Button
                        variant="text"
                        color="primary"
                        onClick={(e) => navigate("/main/signup")}
                      >
                        Sign up
                      </Button>
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div>
                        <h6>Email Address</h6>
                        <TextField
                          className="w-100 "
                          variant="standard"
                          type="email"
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                        />
                      </div>
                      <br></br>
                      <div>
                        <h6>Password</h6>
                        <TextField
                          style={{ borderColor: "blue" }}
                          className="w-100 "
                          variant="standard"
                          type="password"
                          id="password"
                          onChange={handleChange}
                          value={values.password}
                        />
                      </div>
                      <FormGroup sx={{ mt: 1 }}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Remember me"
                        />
                      </FormGroup>

                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          className="mt-2 mb-2 text-white"
                          color="secondary"
                          size="large"
                        >
                          Login
                        </Button>
                      </Box>
                      <hr></hr>
                      <Stack direction="row" spacing={4} sx={{ mt: 3 }}>
                        <div id="buttonDiv"></div>
                        <div
                          class="g-signin2"
                          data-onsuccess="onSignIn"
                          data-theme="dark"
                        ></div>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<GoogleIcon />}
                          className="text-white"
                        >
                          Google
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          endIcon={<FacebookOutlinedIcon />}
                          className="text-white"
                        >
                          Facebook
                        </Button>
                        

                      </Stack>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;

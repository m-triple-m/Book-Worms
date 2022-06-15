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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Stack from "@mui/material/Stack";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Signup = () => {

  const url = app_config.api_url;

  // 1. Create a form object
  const userForm = {
    firstName: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  };

  const navigate = useNavigate();

  // 2. Create a submit callback function

  const userSubmit = (values) => {
    console.log(values);

    fetch(url + "/user/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registered Successfully",
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (

    <div
    className="signup-img"
    style={{ height: "calc(100vh - 70px)" }}
  >
    <Formik initialValues={userForm} onSubmit={userSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <div className="" style={{ width: "100%" }}>
          <div
            className="row align-items-center h-100"
            style={{ marginRight: "0" }}
          >
            <div className="col-lg-3 col-md-4 col-sm-6 col-11 mt-2 mx-auto">
            
              <Card
                className="card1"
                sx={{
                width:500 ,
                
                  bgcolor: "#ffffff66",
                }}
                style={{
                  borderStyle: "none",
                  borderRadius: 0,
                }}
              >
                <p>
                <h3 className="text-center">Sign Up</h3>

                <p className="text-center"> already have a account! <Button type="text" color="primary">Login</Button></p>
                </p>

                <CardContent>


   <div >
                 <form onSubmit={handleSubmit}>
                   <div className="row">

                   <div class="col-md-6 mb-2">

                   <div>
                    <h6>First Name</h6>

                      <TextField

                        variant="standard"
                        type="firstName"
                        id="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                      />
                      </div>
                      </div>

                      <div class="col-md-6 mb-2">
                   <div>
                      <h6>Last Name</h6>
                      <TextField
                        className=""
                        variant="standard"
                        type="lastName"
                        id="lastName"
                        onChange={handleChange}
                        value={values.lastName}
                      />
                      </div>
                      </div>

                   </div>
                   

                      <br></br>
                      
                      
                      <div>
                      <h6>User Name</h6>
                      <TextField
                        className="w-100 "
                        variant="standard"
                        type="username"
                        id="username"
                        onChange={handleChange}
                        value={values.username}
                      />
                    </div>
                    <br></br>

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
                        className="w-100 "
                        variant="standard"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </div>

                      <Button
                      sx={{ml:20}}
                        type="submit"
                        variant="contained"
                        className="mt-3"
                        color="secondary"
                        size="large"
                      >
                        Sign Up
                      </Button>
                      
                    </form>
                    </div> 
        

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

export default Signup;

                 
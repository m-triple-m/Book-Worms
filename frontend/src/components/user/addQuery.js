import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { FormControlLabel } from "@mui/material";
import app_config from "../../config";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Footer from "../main/footer";

const AddQuery = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [thumbnail, setThumbnail] = useState("");

  const queryForm = {
    title: "",
    description: "",
    thumbnail: "",
    user: currentUser._id,
  };

  const uploadThumbnail = (e) => {
    console.log("file selected");

    let file = e.target.files[0];
    console.log(file.name);
    setThumbnail(file.name);
    let form = new FormData();
    form.append("myfile", file);

    fetch("http://localhost:5000" + "/util/uploadfile", {
      method: "POST",
      body: form,
    }).then((res) => {
      console.log(res.status);
    });
  };

  const submitForm = (values) => {
    console.log(values);
    fetch("http://localhost:5000" + "/query/addquery", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);

      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "query added successfully!",
        });
      }
      // navigate('/main/browsenovel/');
    });
  };

  return (
    <div className="" style={{background:'url(https://png.pngtree.com/thumb_back/fh260/background/20191106/pngtree-back-to-school-rectangular-blackboard-education-book-pen-holder-image_321417.jpg)' ,height: "calc(100vh - 70px)"}}>
    
            <Formik initialValues={queryForm} onSubmit={submitForm}>
              {({ values, handleChange, handleSubmit }) => (
             <div>
             <div
               className="row  align-items-center h-100"
               style={{ marginRight: "0" }}
             >
               <div className="col-lg-6 col-md-6 col-sm-6 col-11 mt-2 m-auto">
                 <Card
                   sx={{
                     maxWidth: 700,
                     maxHeight:350,
                     height:"calc(95vh - 80px)",
                     m:'auto'
                   }}
                   style={{
                     borderStyle: "none",
                     borderRadius: 0,
                   }}
                 >
                   <CardContent>
                <form onSubmit={handleSubmit}>
                  <h2 className="text-center">ASK QUERY</h2>

                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div class="form-outline">
                        <TextField
                          type="text"
                          style={{ height: "40px", width: "280px" }}
                          className="mb-2"
                          onChange={handleChange}
                          value={values.title}
                          id="title"
                          variant="outlined"
                          placeholder="Title"
                          label="title"
                        ></TextField>

                        
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-outline">
                        <input
                          type="file"
                          className="form-control"
                          onChange={uploadThumbnail}
                          placeholder="thumbnail"
                        />
                        <label class="form-label" for="Thumbnail">
                          Thumbnail
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-outline">
                  <TextField
                    style={{ height: "50px", width: "280px" }}
                    onChange={handleChange}
                    value={values.description}
                    label="Description"
                    id="description"
                    variant="outlined"
                    className="w-100"
                    placeholder="Description"
                    fullWidth
                    multiline
                  ></TextField>
                   </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    className="mt-3 my-auto"
                    color="secondary"
                  >
                    Ask Query
                  </Button>
                </form>
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
              )}
            </Formik>
            <Footer />
          </div>
  );
};
export default AddQuery;

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
import Header from '../main/header';

const AddNovel = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const novelForm = {
    title: "",
    description: "",
    genre: "",
    thumbnail: "",
    author: "",
    price: "",
    rentPrice: "",
    rentable: false,
    exchangeble: false,
    user: currentUser._id,
  };


  const navigate = useNavigate();

  const url = app_config.api_url;

  const [thumbnail, setThumbnail] = useState("");

  const novelSubmit = (values) => {
    values.thumbnail = thumbnail;

    console.log(values);
    fetch("http://localhost:5000" + "/novel/add", {
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
          title: "Novel added successfully!",
        });
      }
      navigate("/main/browsenovel/");
    });
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

  return (
    <div className="addnovelbg" style={{height: "calc(100vh - 70px)"}}>
      {/* <Paper elevation={3} variant="outlined"> */}
      <Formik initialValues={novelForm} onSubmit={novelSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <div>
            <div
              className="row  align-items-center h-100"
              style={{ marginRight: "0" }}
            >
              <div className="col-lg-6 col-md-6 col-sm-6 col-11 mt-2 mx-auto">
                <Card
                  sx={{
                    maxWidth: 400,
                    maxHeight:600,
                    height:"calc(95vh - 80px)",
                    bgcolor: "#ffffff66",
                    m:'auto'
                  }}
                  style={{
                    borderStyle: "none",
                    borderRadius: 0,
                  }}
                >
                  <CardContent>
                  <form onSubmit={handleSubmit}>

                    <div class="row mb-4">
                      <div class="col-md-6 mb-2">
                        <div class="form-outline">
                          
                          <input
                            className="form-control"
                            placeholder="Title"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.title}
                            type="text"
                            id="title"
                          />

                        </div>
                      </div>
                      <div class="col-md-6 mb-2">
                        <div class="form-outline">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Author"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.author}
                            id="author"
                          />

                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col-md-6 mb-2">
                        <div class="form-outline">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Price"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.price}
                            id="price"
                          />

                        </div>

                      </div>

                      <div class="col-md-6 mb-2">
                        <div class="form-outline">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Rent Price"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.rentPrice}
                            id="rentPrice"
                          />


                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col-md-12 mb-2">
                        <div class="form-outline">
                          <input
                            className="form-control"
                            placeholder="Genre"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.genre}
                            type="text"
                            id="genre"
                          />

                        </div>
                      </div>
                    </div>
                    <div class="row mb-4">
                      <div class="col-md-12 mb-2">
                        <div class="form-outline">
                          <input
                            className="form-control"
                            placeholder="Description"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.description}
                            type="text"
                            id="description"
                          />

                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 mb-2">
                        <div class="form-outline">
                          <input
                            type="file"
                            className="form-control"
                            onChange={uploadThumbnail}
                            placeholder="thumbnail"
                          />
                          <label class="form-label" for="title">
                            Thumbnail
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4 mb-2">
                        <div class="form-outline">
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="w-50 mx-auto"
                                type="checkbox"
                                checked={values.exchangeble}
                                onChange={handleChange}
                                id="exchangeble"
                              />
                            }
                            label="Exchangeble"
                          />
                        </div>
                      </div>

                      <div class="col-md-4 mb-2">
                        <div class="form-outline">
                          <FormControlLabel
                            control={
                              <Checkbox
                                className="w-50  form-control"
                                checked={values.rentable}
                                onChange={handleChange}
                                id="rentable"
                              />
                            }
                            label="Rentable"
                          />
                        </div>
                      </div>

                      <div class="col-md-6 mt-3 mb-1">
                        <div class="form-outline">
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            Add Novel
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default AddNovel;

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

const UpdateNovel = ({ updateFormData,setShowUpdateForm}) => {
  const navigate = useNavigate();

  const url = app_config.api_url;

  const [thumbnail, setThumbnail] = useState(updateFormData.thumbnail);

  const novelSubmit = (values) => {
    values.thumbnail = thumbnail;

    console.log(values);
    fetch("http://localhost:5000" + "/novel/update/" + values._id, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);

      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Novel updated  successfully!",
        }); 

        navigate("/user/managenovel/");
      }
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

  const cancelUpdate=()=>{
    setShowUpdateForm(false)
  }

  return (
    <div>
      <Formik initialValues={updateFormData} onSubmit={novelSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent style={{backgroundColor: '#87CEEB'}}>
              <div class="d-flex align-items-center h-100">
                <div class="container-fluid">
                  <div class="row justify-content-center">
                    <div class="col-12 col-lg-12 col-xl-12">
                      <div class="card">
                        <div class="card-body p-4 p-md-5">
                          <h3 class="mb-4 pb-2">Update Novel</h3>

                          <div class="row">
                            <div class="col-md-6 mb-4">
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
                                <label class="form-label" for="title">
                                  Title
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6 mb-4">
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
                                <label class="form-label" for="author">
                                  Author
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6 mb-4">
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
                                <label class="form-label" for="price">
                                  Purchase Price
                                </label>
                              </div>
                            </div>

                            <div class="col-md-6 mb-4">
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

                                <label class="form-label" for="rentPrice">
                                  Rent Price
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12 mb-4">
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
                                <label class="form-label" for="title">
                                  Genre
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12 mb-4">
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
                            <div class="col-md-4 mb-4">
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

                            <div class="col-md-4 mb-4">
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

                            <div class="col-md-6 mb-4">
                              <div class="form-outline">
                                <Button
                                  type="submit"
                                  variant="contained"
                                  className="mt-3 my-auto"
                                  color="secondary"
                                >
                                  Update Novel
                                </Button>

                              </div>
                            </div>

                            <div class="col-md-6 mb-4">
                              <div class="form-outline">
                                <Button
                                  type="submit"
                                  variant="outlined"
                                  className="mt-3 my-auto"
                                  color="secondary"
                                  onClick={cancelUpdate}
                                >
                                  Cancel Update
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </Card>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateNovel;

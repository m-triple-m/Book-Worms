import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  TextField,
  CardMedia,
} from "@mui/material";
import Swal from "sweetalert2";
import { FormControlLabel } from "@mui/material";
import app_config from "../../config";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Footer from "../main/footer";

const ViewQuery = () => {
  const { id } = useParams();

  const url = app_config.api_url;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [thumbnail, setThumbnail] = useState("");

  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const queryForm = {
    title: query.title,
    description: query.description,
    thumbnail: "",
    user: currentUser._id,
  };

  const fetchData = () => {
    fetch(url + "/query/getbyqueryid/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuery(data);
        console.log(query);
        setName(data.user.firstName + " " + data.user.lastName);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    showQuery();
  }, []);

  const showQuery = () => {
    if (!loading)
      return (
        <div>
          <div className="row  align-items-center" style={{ marginRight: "0" }}>
            <div className="col-lg-6 col-md-6 col-sm-6 col-11 mt-2 m-auto">
              <Card
                sx={{
                  maxWidth: 700,
                  height: "calc(95vh - 80px)",
                  m: "auto",
                }}
                style={{
                  borderStyle: "none",
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <h2 className="text-center">Query Details</h2>

                  <div className="row mb-3">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div class="form-outline">
                        <h4>Title:</h4>
                        <TextField
                          type="text"
                          disabled={true}
                          style={{ height: "40px", width: "280px" }}
                          className="mb-2"
                          value={query.title}
                          id="title"
                          variant="standard"
                          placeholder="Title"
                        ></TextField>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-outline">
                        <h4>Description:</h4>
                        <TextField
                          style={{ height: "50px", width: "280px" }}
                          value={query.description}
                          disabled={true}
                          id="description"
                          variant="standard"
                          className="w-100"
                          placeholder="Description"
                          fullWidth
                          multiline
                        ></TextField>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-2 mt-2">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div class="form-outline">
                        <h4>Uploaded By:</h4>

                        <TextField
                          style={{ height: "50px", width: "280px" }}
                          value={name}
                          disabled={true}
                          id="description"
                          variant="standard"
                          className="w-100"
                          placeholder="Uploaded by"
                          fullWidth
                          multiline
                        ></TextField>

                        <button
                          className="btn btn-primary"
                          onClick={addtoConnection}
                        >
                          Contact Now
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
  };

  const addtoConnection = () => {
    if (
      currentUser.connections.filter((conn) => conn.userId === query.user._id)
        .length
    ) {
      navigate("/user/chat");
      return;
    }
    fetch(url + "/user/pushupdate/" + currentUser._id, {
      method: "PUT",
      body: JSON.stringify({
        connections: query.user._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/user/chat");
        });
      }
    });
  };

  return (
    <div
      className=""
      style={{
        background:
          "url(https://png.pngtree.com/thumb_back/fh260/background/20191106/pngtree-back-to-school-rectangular-blackboard-education-book-pen-holder-image_321417.jpg)",
        height: "calc(100vh - 70px)",
      }}
    >
      {showQuery()}

      <Footer />
    </div>
  );
};
export default ViewQuery;

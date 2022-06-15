import { useEffect, useState } from "react";
import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  TextField,
  CardMedia,
  rgbToHex,
} from "@mui/material";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Footer from './footer';
import TitleIcon from '@mui/icons-material/Title';

const BrowseQuery = () => {
  const url = app_config.api_url;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const viewQuery=()=>{
    
  }

  const [queryArray, setQueryArray] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(url + "/query/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQueryArray(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayQueries = () => {
    return queryArray.map((query) => (
      <Grid item md={3} className="pb-2">
        <Card style={{ height: "200px" }}>
          <CardContent>
            
            <p className="title text-decoration-underline h5"> {query.title}</p>
            
            <p className="p-title mt-4 h5">
              <PersonIcon />
              &nbsp;{query.user.firstName}
            </p>

            <Button
              variant="outlined"
              className="mt-3"
              onClick={(e) => navigate("/main/viewquery/" + query._id)}
            >
              View More
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <div>
      <div className="container ">
        <Grid container spacing={6} className="mt-0">
          {displayQueries()}
        </Grid>
      </div>

      <Footer />
      <div />
    </div>
  );
};

export default BrowseQuery;

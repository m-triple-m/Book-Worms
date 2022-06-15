import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Drawer,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import app_config from "../../config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./updateUser";
import { Formik } from "formik";

import PersonIcon from "@mui/icons-material/Person";

const Dashboard = () => {
  
   
  const [novelArray, setNovelArray] = useState([]);
  const [queryArray,setQueryArray]=useState([]);
  const [users,setUsers]=useState([]);
  const [solvedQuery,setSolvedQuery]=useState([]);

  const url=app_config.api_url;


  // const []
  const fetchDataNovel = () => {
    fetch("http://localhost:5000" + "/novel/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNovelArray(data);

      });
  };

  const fetchDataQuery = () => {
    fetch(url + "/query/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQueryArray(data);
      });
  };
  

  return (
    <div className="dashboard h-100">
    <div className="container">

    <div className="row">

    
        <Card style={{ height: "200px" ,width:'200px',marginRight:'15px'}}  >
          <CardContent>
            
            <p className="title text-decoration-underline h5"> Total Novels</p>
            
            <p className="p-title mt-4 h5">
              
              

              
            </p>

          </CardContent>
        </Card>

        <Card style={{ height: "200px" ,width:'200px' ,marginRight:'15px'}}>
          <CardContent>
            
            <p className="title text-decoration-underline h5"> Total  users</p>
            
            <p className="p-title mt-4 h5">
              
              <PersonIcon />
              
            </p>

          </CardContent>
        </Card>

        <Card style={{ height: "200px" ,width:'200px', marginRight:'15px'}}>
          <CardContent>
            
            <p className="title text-decoration-underline h5"> Total Novels purchased</p>
            
            <p className="p-title mt-4 h5">
              
              <PersonIcon />
              
            </p>

          </CardContent>
        </Card>


        <Card style={{ height: "200px" ,width:'200px', marginRight:'15px'}}>
          <CardContent>
            
            <p className="title text-decoration-underline h5"> Total Queries</p>
            
            <p className="p-title mt-4 h5">
              
              <PersonIcon />
              
            </p>

          </CardContent>
        </Card>

        <Card style={{ height: "200px" ,width:'200px', marginRight:'15px'}}>
          <CardContent>
            
            <p className="title text-decoration-underline h5"> Queries Solved</p>
            
            <p className="p-title mt-4 h5">
              
              <PersonIcon />
              
            </p>

          </CardContent>
        </Card>
      </div>
      </div>
      </div>
      


  );
};

export default Dashboard;

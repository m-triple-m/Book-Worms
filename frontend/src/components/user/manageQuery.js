import app_config from "../../config";
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

import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Footer from "../main/footer";
import { FormControlLabel } from "@mui/material";

const ManageQuery = () => {

  const url = app_config.url;

  const [queryArray, setQueryArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const queryform={
    title:""
  }

  const fetchData = () => {
    fetch("http://localhost:5000" + "/query/get/" + currentUser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQueryArray(data);
      });
  };

  const updateQuery = (query) => {};

  const updateStatus=(query)=>{

    //query.isresolved=true;

    console.log("abcd");
  }

  const handleChange=(query)=> {

    const values={
      title:query.title,
      thumbnail:query.thumbnail,
      description:query.description,
      user:currentUser._id,
      isresolved:true,
    }
    console.log(values);
    
    if(query.isresolved===false)
    {

    fetch("http://localhost:5000" + "/query/update/" + query._id, {
      method: "PUT",
      body: JSON.stringify({isresolved: true}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.status);
    })

    fetchData();

  }
    

  }
  

  const checkResolved = (query) => {
    if (query.isresolved ===true) {
      return (
        <div>
          <CheckCircleOutlineIcon /> &nbsp; Resolved
        </div>
      );
    }

    return (
      <FormControlLabel
        control={
          <Checkbox
            className="w-50 mx-auto"
            type="checkbox"
            checked={query.isresolved}
            onChange={e => handleChange(query)}
          />
        }
        label="Exchangeble"
      />
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayQuery = () => {
    return queryArray.map((query, i) => (
      <tr key={query._id}>
        <td className="w-5">{i + 1}</td>
        <td className="w-5">{query.title}</td>
        <td className="w-10">
          {currentUser.firstName + " " + currentUser.lastName}
        </td>
        <td className="w-10">
          {<Button variant="outlined">View Query</Button>}
        </td>
        <td className="w-5">{checkResolved(query)}</td>
      </tr>
    ));
  };

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="w-5">S.No</th>
            <th className="w-5">Query Title</th>
            <th className="w-10">Uploaded by</th>

            <th className="w-5">Details</th>
            <th className="w-5">Status</th>
          </tr>
        </thead>
        <tbody>{displayQuery()}</tbody>
      </table>
    </div>
  );
};

export default ManageQuery;

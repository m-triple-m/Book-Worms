
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Paper,
    Grid,
    Card,
    Drawer,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import app_config from "../../config";
  import toast, { Toaster } from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
  import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";



const AdminManageQuery=()=>{

    const url = app_config.api_url;

 const [queryArray, setQueryArray] = useState([]);
 const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch(url + "/query/getall", {
          method: "GET",
          // data hmko send ni krna hai isliye get method use karte hai
        })
          .then((res) => res.json())
          // res se json nikalne k liye
          .then((data) => {
            // dusra then jo hai json data read krne k liye
            console.log(data);
            setQueryArray(data);
            setLoading(false);
            // data print krwa rhe hai
          });
      };

      useEffect(() => {
        fetchData();
      }, []);


      const checkStatus = (query) => {
        if (query.isresolved ===true) {
          return (
            <div>
              <CheckCircleOutlineIcon /> &nbsp; Resolved
            </div>
          );
        }
        return(<p>Not resolved</p>)
    }
    

    const displayProducts = () => {
        if (!loading) {
          return queryArray.map((query) => (
            <div className="container mt-2">
              <Accordion>
                <AccordionSummary>
                  <p>
                    <span className="h3">
                      {query.title}
                    </span>
                    &nbsp;&nbsp;
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <ul class="list-group">
                        <li class="list-group-item"><span className="h5">Uploaded By:&nbsp;</span>{query.user.firstName}&nbsp;{query.user.lastName}</li>
                        <li class="list-group-item"><span className="h5">Description:&nbsp;</span>{query.description}</li>
                        <li class="list-group-item"><span className="h5">Status: &nbsp; &nbsp;</span>{checkStatus(query)}</li>

                      </ul>
                    </Grid>
                    <Grid item md={6}>
                      <Button
                        variant="outlined"
                        color="success"
                        // onClick={(e) => updateUser(user)}
                        className="w-100"
                      >
                        Contact User
                      </Button>

                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          ));
        }
      };
    
    return (
        <div className="container-fluid full-page">
          <p className="display-4 text-center">Manage Query</p>
          <hr className="mb-4" />
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">{displayProducts()}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  {/* {showUpdateForm ? (
                    <UpdateUser
                      userdetail={updateFormData}
                      fetchUsers={fetchData}
                      setShowForm={setShowUpdateForm}
                    />
                  ) : (
                    <p className="fw-bold h2 py-5 text-center ph-text">
                      Select User to Edit
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    

};

export default AdminManageQuery;

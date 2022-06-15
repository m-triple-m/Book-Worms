import app_config from "../../config";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UpdateNovel from "./updateNovel";

const ManageNovel = () => {
  const [novelArray, setNovelArray] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const url = app_config.api_url;

  const fetchData = () => {
    fetch(url + "/novel/getbyuserid/" + currentUser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNovelArray(data);
      });
  };

  const deleteNovel = (id) => {
    fetch(url + "/novel/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        Swal.fire({
          title: "Novel deleted succesfully",
          icon: "success",
        });
      });
  };

  // const displayUpdateNovel=()=>{

  //   if(showUpdateForm)
  //   return
  // }

  const displayNovel = () => {
    return novelArray.map((product, i) => (
      <tr key={product._id}>
        <td className="w-5">{i + 1}</td>
        <td className="w-5">{product.title}</td>
        <td className="w-10">{product.author}</td>
        <td className="w-5">{product.price}</td>
        <td>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => deleteNovel(product._id)}
          >
            <i className="fas fa-trash-alt"></i>
          </Button>
        </td>

        <td>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              setShowUpdateForm(true);
              setUpdateFormData(product);
            }}
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </Button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md">
        <table className="table table-striped">
        <thead>
          <tr>
            <th className="w-5">S.No</th>
            <th className="w-5">Title</th>
            <th className="w-10">Author</th>
            <th className="w-5">price</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>{displayNovel()}</tbody>
      </table>  
        </div>
        {showUpdateForm ? (
          <div className="col md-5">
            <UpdateNovel updateFormData={updateFormData} setShowUpdateForm={setShowUpdateForm} />
          </div>  
        ) : (
          <div>Select a Novel to edit</div>
        )}
      </div>

      
    </div>
  );
};
export default ManageNovel;

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
  Slider,
} from "@mui/material";
import app_config from "../../config";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const BrowseNovel = () => {
  const url = app_config.api_url;

  const [novelArray, setNovelArray] = useState([]);
  const [novelArray2, setNovelArray2] = useState([]);

  const [priceRange, setPriceRange] = useState([100,500]);

  const navigate = useNavigate();

  const addQuery = () => {};
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");

  const fetchData = () => {
    fetch("http://localhost:5000" + "/novel/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNovelArray(data);
        setNovelArray2(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayNovels = () => {
    return novelArray.map((novel) => (
      <Grid item md={3} className="pb-2">
        <Card style={{ height: "500px" }}>
          <CardMedia
            component="img"
            height="320"
            image={url + "/" + novel.thumbnail}
            alt={novel.name}
          />

          <CardContent>
            <p className="p-title h5 text-center">{novel.title}</p>
            <p className="text-muted">{novel.variant}</p>
            <p className="h4 mt-4">₹ {novel.price}</p>
            <Button
              className=""
              variant="outlined"
              onClick={(e) => navigate("/main/noveldetail/" + novel._id)}
            >
              View More
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const filterNovels = () => {
    fetch("http://localhost:5000" + "/novel/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setNovelArray(
          data.filter((novel) =>
            novel.title.toLowerCase().includes(keyword.toLowerCase())
          )
        );
      });
  };

  const filterbyAuthor = (e) => {
    setNovelArray(
      novelArray2.filter((novel) =>
        novel.author.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const filterbyPrice = (e) => {
    setNovelArray(
      novelArray2.filter((novel) =>
        novel.price > priceRange[0] && novel.price < priceRange[1]
      )
    );
  };

  const filterbyGenre = (e) => {
    setKeyword2(e.target.value.toLowerCase());
    console.log(keyword2);
    setNovelArray(
      novelArray2.filter((novel) =>
        novel.genre.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="row mt-2 justify-content-end">
        
        <div className="col-lg-3 col-md-3 col-mb-3">
          <div className="input-group">
            <div className="form-outline">
              <div className="row justify-content-end">
                
                <div className="col-lg-11 col-md-6">
                  <input
                    className="form-control"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search By Title"
                  />
                </div>
                <div className="col-lg-1 col-md-6">
                  <button onClick={filterNovels} className="btn btn-primary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mb-5 ">
        <div className="row">

          <div className="col-md-2 mt-5">
            
            <div className="card">
              <div className="card-body">
                <h4>Price Filter</h4>
                <hr />
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={priceRange}

                  onChange={(e, v) => setPriceRange(v)}
                  valueLabelDisplay="auto"
                  min={100}
                  max={500}
                />
                
                <div  className="row">

                <Button
                variant="contained"
                onClick={filterbyPrice}
                >Apply</Button>
                </div>

              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
              <div className="selectWrapper">
            <select onChange={filterbyGenre} className="selectBox text-center">
              <option value="">Filter by Genre</option>
              <option value="">All</option>
              <option value="Southern Gothic">Southern Gothic</option>
              <option value="Fable">Fable</option>
              <option value="Science fiction">Science fiction</option>
              <option value="Mythology">Mythology</option>
              <option value="Tragedy">Tragedy</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>

              </div>

            </div>

            <div className="card">
              <div className="card-body">

              <div className="selectWrapper">
            <select onChange={filterbyAuthor} className="selectBox text-center">
              <option value="">Filter by Author</option>
              <option value="">All</option>
              <option value="Harper Lee">Harper Lee</option>
              <option value="J. K. Rowling">J. K. Rowling</option>
            </select>
          </div>
              </div>

            </div>



          </div>
          <div className="col-md-10">
            <Grid container spacing={6} className="mt-0">
              {displayNovels()}
            </Grid>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseNovel;

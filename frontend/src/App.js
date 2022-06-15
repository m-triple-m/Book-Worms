import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/admin";
import AdminProfile from "./components/admin/profile";
import Main from "./components/main";
import User from "./components/user";
import AddNovel from "./components/user/addNovel";
import BrowseNovel from "./components/main/browseNovels";
import NovelDetail from "./components/main/novelDetails";
import ManageNovel from "./components/user/manageNovel";
import Chat from "./components/user/chat";
import Signup from "./components/main/signup";
import AddQuery from "./components/user/addQuery";
import BrowseQuery from "./components/main/browseQuery";
import Login from "./components/main/login";
import BuyNovel from "./components/main/buyNovel";
import RentNovel from "./components/main/rentNovel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "./components/home";
import Authorisor from "./components/authenticator";
import AdminAuthorisor from "./components/adminAuth";
import ViewQuery from "./components/main/viewQuery";
import ManageQuery from "./components/user/manageQuery";
import ResetPassword from "./components/main/resetpassword";
import ManageUser from "./components/admin/manageUser";
import Chat2 from "./components/user/chat2";

function App() {
  const stripe = loadStripe(
    "pk_test_51L1Wf4SG8drK0Wt5fTi5mmAwG39rkyndP4LsZdqBkKgOdoVfDPzkVt8OHKpq94LBqFxWmtLDQZqll91aHQRkk17500YOymPufa"
  );

  const appearance = {
    theme: "night",
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" name="/home"></Route>
        <Route
          element={
            <AdminAuthorisor>
              <Admin />
            </AdminAuthorisor>
          }
          path="admin"
        >
          <Route element={<AdminProfile></AdminProfile>} path="profile" />
          <Route element={<ManageUser />} path="manageuser" />
        </Route>

        <Route element={<Main></Main>} path="main">
          <Route
            element={<BrowseQuery></BrowseQuery>}
            path="browsequery"
          ></Route>
          <Route element={<BrowseNovel />} path="browsenovel"></Route>
          <Route element={<NovelDetail />} path="noveldetail/:id"></Route>
          <Route element={<ViewQuery />} path="viewquery/:id"></Route>
          <Route
            element={<ResetPassword></ResetPassword>}
            path="resetpassword"
          ></Route>

          <Route
            element={
              <Authorisor>
                <Elements stripe={stripe}>
                  <BuyNovel />
                </Elements>
              </Authorisor>
            }
            path="buy"
          />
          <Route element={<RentNovel />} path="rent" />
          <Route element={<Login />} path="login"></Route>
          <Route element={<Signup />} path="signup"></Route>
        </Route>

        <Route
          element={
            <Authorisor>
              <User />
            </Authorisor>
          }
          path="user"
        >
          <Route element={<AddQuery></AddQuery>} path="addquery"></Route>
          <Route element={<Chat2></Chat2>} path="chat"></Route>
          <Route element={<AddNovel></AddNovel>} path="addnovel"></Route>
          <Route
            element={<ManageQuery></ManageQuery>}
            path="managequery"
          ></Route>
          <Route
            element={<ManageNovel></ManageNovel>}
            path="managenovel"
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

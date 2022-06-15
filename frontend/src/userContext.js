import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUser = () => {
    let sessionUser = sessionStorage.getItem("user");
    console.log(sessionUser);
    if (typeof sessionUser == "object") {
      // setLoggedin(true);
      return JSON.parse(sessionUser);
    }
  };

  // const [loggedin, setLoggedin] = useState(
  //   typeof sessionStorage.getItem("user") == "object" ? true : false
  // );

  const [loggedin, setLoggedin] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    console.log(getUser());
    if (getUser()) {
      setLoggedin(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loggedin, setLoggedin }}
    >
      {children}
    </UserContext.Provider>
  );
};
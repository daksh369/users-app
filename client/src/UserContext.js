import React, {Component, useState, useEffect} from "react";
import Client from "./components/dashboard/Contentful";

const UserContext = React.createContext();

const UserProvider = async() => {

  const [users, setUsers] = useState([]);

  await Client.getEntries({
    content_type:"userList"
  }).then(response => console.log(response.items));


  return (
    <UserContext.Provider
      value={{
        users,
        setUsers
      }}
    >

    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};

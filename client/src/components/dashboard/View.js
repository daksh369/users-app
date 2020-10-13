import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


function View() {

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    bio: ""
  });

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:8000/users/${id}`);
    setUser(res.data);
  };

  const {firstname, lastname, email, dob, bio} = user;

  return(
    <div className="container">
      <Link className="btn btn-primary" to="/dashboard">
        Back to Dashboard
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <h6><li className="list-group-item"><b>First Name:</b> {firstname}</li></h6>
        <h6><li className="list-group-item"><b>Last Name:</b> {lastname}</li></h6>
        <h6><li className="list-group-item"><b>Email:</b> {email}</li></h6>
        <h6><li className="list-group-item"><b>DOB:</b> {dob}</li></h6>
        <h6><li className="list-group-item"><b>Bio:</b> {bio}</li></h6>
      </ul>
    </div>
  );
}

export default View;

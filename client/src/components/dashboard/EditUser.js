import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function EditUser() {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    bio: ""
  });

  const {firstname, lastname, email, dob, bio} = user;

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser()
  }, []);

const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/users/${id}`, user);
    history.push("/dashboard");
  };

const loadUser = async () => {
    const result = await axios.get(`http://localhost:8000/users/${id}`);
    console.log(result);
    setUser(result.data);
  };


  return(
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit User</h2>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="firstname"
              value={firstname}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Last Name"
              name="lastname"
              value={lastname}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter E-mail Address"
              name="email"
              value={email}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter DOB"
              name="dob"
              value={dob}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Bio"
              name="bio"
              value={bio}
              onChange={e => handleChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

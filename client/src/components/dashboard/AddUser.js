import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddUser() {
  let history = useHistory();
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

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("http://localhost:8000/users", user);
    history.push("/Dashboard");
  };


  return(
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter First Name"
              name="firstname"
              value={firstname}
              onChange={e => handleChange(e)}
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;

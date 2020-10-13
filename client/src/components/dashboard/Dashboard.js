import React, {Component, useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../UserContext";
import Client from "./Contentful";




function Dashboard(props) {

    const [users, setUsers] = useState([]);
    const [filterValue, setFilterValue] = useState("");

  const person = useContext(UserContext);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setUsers(result.data.reverse());

    // await Client.getEntries({
    //   content_type:"userList"
    // }).then(response => setUsers(response.items));
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    loadUsers();
    // setUsers(prevUsers => {
    //   return prevUsers.filter((singleUser, index) => {
    //     console.log(id);
    //     return index !== id;
    //   });
    // });
    // console.log(users);

  }

  function filterName(e) {
    setFilterValue(e.target.value);
  }

  async function findUser(){
    const result = await axios.get("http://localhost:8000/users");
    setUsers(result.data.filter((foundUser)=>{
      return foundUser.firstname === filterValue
    }));
  }

  function onLogoutClick(event) {
    event.preventDefault();
    props.logoutUser();
  };
  const {user} = props.auth;




    //final return
    return (
      <div className="container valign-wrapper">
      <div className="row">
        <div className="col s12 center-align">
          <h4>
            <b>Hey there, </b>
            {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              You are logged in.
            </p>
          </h4><br />

          {/* table start */}

          <div>
            <h6>Find name</h6>
            <input type="text" onChange={filterName} name="filter" value={filterValue} />
            <button onClick={findUser} style={{ marginRight:"10px" }} variant="outlined" className="btn waves-effect waves-light hoverable blue accent-3">Find</button>
            <button onClick={loadUsers} style={{ marginRight:"10px" }} variant="outlined" className="btn btn-large btn-flat waves-effect white black-text">Show All</button>

          </div><br /><br /><br />

          <div>
            <table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th style={{marginLeft:"10px"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, index) => (
                    <tr>
                      <th>{index+1}</th>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.dob}</td>
                      <td>
                        <Link to={`/view/${user.id}`} style={{ marginRight:"10px" }} variant="outlined" className="btn waves-effect waves-light hoverable blue accent-3">View</Link>
                        <Link to={`/edit/${user.id}`} style={{ marginRight:"10px" }} variant="outlined" className="btn btn-large btn-flat waves-effect white black-text">Edit</Link>
                        <Link onClick={() => deleteUser(user.id)} style={{ marginRight:"10px" }} variant="outlined" className="btn waves-effect waves-light hoverable blue accent-3">Delete</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* table end */}


          <Link to="/add" style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              marginRight: "10px"
            }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
            Add User
          </Link>

          <button style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }} onClick={onLogoutClick} className="btn btn-large btn-flat waves-effect white black-text">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
  }

  Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({auth: state.auth});
  export default connect(mapStateToProps, {logoutUser})(Dashboard);

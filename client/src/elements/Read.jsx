import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div className="container-fluid bg-light min-vh-100 py-4 px-4">
      <h3>User {id}</h3>

      {data.map((student) => {
        return (
          <ul className="list-group ">
            <li className="list-group-item">
              <b>ID: </b>
              {student["id"]}
            </li>
            <li className="list-group-item">
              <b>Name: </b>
              {student["name"]}
            </li>
            <li className="list-group-item">
              <b>Email: </b>
              {student["email"]}
            </li>
            <li className="list-group-item">
              <b>DOB: </b>
              {student["dob"]}
            </li>
            <li className="list-group-item">
              <b>Password: </b>
              {student["password"]}
            </li>
          </ul>
        );
      })}
      <div className="form-group mx-5 my-2 d-flex justify-content-end">
        <Link to="/" className="btn btn-success mt-5">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Read;

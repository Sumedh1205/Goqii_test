import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/students")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container bg-white p-4 rounded shadow-sm">
        <h3 className="mb-4 text-primary">Students</h3>
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-success" to="/create">
            Add Student
          </Link>
        </div>
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.password}</td>
                  <td>
                    <Link
                      className="btn btn-info btn-sm mx-1"
                      to={`/read/${student.id}`}
                    >
                      Read
                    </Link>
                    <Link
                      className="btn btn-warning btn-sm mx-1"
                      to={`/edit/${student.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-danger btn-sm mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

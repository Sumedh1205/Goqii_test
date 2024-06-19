import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit() {
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

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid min-vh-100 bg-light py-4">
      <div className="container bg-white p-4 rounded shadow-sm">
        <div>
          <h3>User {id}</h3>
          <Link to="/" className="btn btn-success ">
            Back
          </Link>
        </div>
        {data.map((student) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="form-group my-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                className="form-control"
                  value={student.name}
                  type="text"
                  name="name"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], name: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input
                className="form-control"
                  value={student.email}
                  type="email"
                  name="email"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="password">Password</label>
                <input
                className="form-control"
                  value={student.password}
                  type="password"
                  name="password"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], password: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="dob">Dob</label>
                <input
                className="form-control"
                  value={student.dob}
                  type="date" //date
                  name="dob"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], dob: e.target.value }])
                  }
                />
              </div>
              <div className="form-group my-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default Edit;

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students",
});


app.post("/add_user", (req, res) => {
 const sql =
   "INSERT INTO student_details (`name`, `email`, `dob`, `password`) VALUES (?, ?, ?, ?)";


 const isoDate = new Date(req.body.dob);
 const dob = isoDate.toISOString().split("T")[0]; 
 const values = [req.body.name, req.body.email, dob, req.body.password];

 db.query(sql, values, (err, result) => {
   if (err) {
     return res.json({ message: "Something unexpected has occurred" + err });
   }
   return res.json({ success: "Student added successfully" });
 });

});

app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    
    if (err) res.json({ message: "Server error" });
    console.log("okay",(result))
    return res.json(result);
  });
});

app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `dob`=?, `password`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.dob,
    req.body.password,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});

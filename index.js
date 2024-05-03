const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: "sql11703451",
  host: "sql11.freemysqlhosting.net",
  password: "XGSpZKlPMM",
  database: "sql11703451",
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    "INSERT INTO users (email, password) VALUES(?, ?)",
    [email, password],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.get("/deals", (req, res) => {
  con.query("SELECT * FROM deals", (err, result) => {
    if (err) {
      res.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Error by loading data" });
      }
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "WRONG EMAIL OR PASSWORD" });
        }
      }
    }
  );
});

app.listen(port, "0.0.0.0", () => {
  console.log("running backend server");
});

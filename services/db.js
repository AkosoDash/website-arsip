import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "website_arsip",
});

try {
  conn.connect();
  console.log("Connected with website_arsip database");
} catch (error) {
  console.log(error.message);
}

export default conn;

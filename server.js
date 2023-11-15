import express from "express";
import cors from "cors";
import conn from "./services/db.js";
import router from "./routes/index.js";

const port = 1234;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Server running on port ", port);
});

app.use("/api/", router);

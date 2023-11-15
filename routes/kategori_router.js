import express from "express";
import {
  get_all_kategori,
  get_kategori_by_id,
  add_kategori,
  update_kategori,
  delete_kategori,
} from "../controllers/kategori_controller.js";

const kategori_router = express.Router();

kategori_router.get("/", get_all_kategori);
kategori_router.get("/:id_kategori", get_kategori_by_id);
kategori_router.post("/", add_kategori);
kategori_router.put("/:id_kategori", update_kategori);
kategori_router.delete("/:id_kategori", delete_kategori);

export default kategori_router;

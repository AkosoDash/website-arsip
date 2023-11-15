import express from "express";
import {
  get_all_surat,
  get_surat_by_id,
  add_surat,
  update_surat,
  delete_surat,
} from "../controllers/surat_controller.js";
import file_type_checker from "../utils/file_type_checker.js";

const surat_router = express.Router();

surat_router.get("/", get_all_surat);
surat_router.get("/:id_surat", get_surat_by_id);
surat_router.post("/", file_type_checker, add_surat);
surat_router.put("/:id_surat", file_type_checker, update_surat);
surat_router.delete("/:id_surat", delete_surat);

export default surat_router;

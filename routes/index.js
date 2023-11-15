import express from "express";
import kategori_router from "./kategori_router.js";
import surat_router from "./surat_router.js";

const router = express.Router();

router.use("/kategori-surat/", kategori_router);
router.use("/surat/", surat_router);

export default router;

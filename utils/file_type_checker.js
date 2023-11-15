import path from "path";
import multer from "multer";
import crypto from "crypto";

const multerUpload = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      const name = crypto.randomBytes(30).toString("hex");
      const ext = path.extname(file.originalname);
      const filename = `${name}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    // filter mimetype
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb({ message: "extension file only can .pdf" }, false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb (max file size)
});

// middleware
export default (req, res, next) => {
  const multerFields = multerUpload.fields([
    {
      name: "file_pdf",
      maxCount: 1,
    },
  ]);
  multerFields(req, res, async (err) => {
    try {
      if (!err) {
        next();
      } else {
        let errorMessage = err.message;
        if (err.code === "LIMIT_FILE_SIZE") {
          errorMessage = `File ${err.field} too large, max 10mb`;
        }
        res.status(400).json({
          message: errorMessage,
        });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });
};

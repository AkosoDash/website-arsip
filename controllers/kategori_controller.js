import conn from "../services/db.js";
import error_handler from "../utils/error_handler.js";

const get_all_kategori = (req, res) => {
  const query = "select * from kategori_surat";
  conn.query(query, function (error, results, fields) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ data: results });
  });
};

const get_kategori_by_id = (req, res) => {
  const { id_kategori } = req.params;
  const query = "select * from kategori_surat where id_kategori = ?";
  conn.query(query, [id_kategori], function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    if (results == "")
      return error_handler(res, "data kategori not found", 404);
    return res.json({ data: results[0] });
  });
};

const add_kategori = (req, res) => {
  const { id_kategori, nama_kategori, judul_kategori } = req.body;
  const values = [id_kategori, nama_kategori, judul_kategori];
  const query =
    "insert into kategori_surat (id_kategori, nama_kategori, judul_kategori) values (?)";

  conn.query(query, [values], function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ message: "data kategori added successfully" });
  });
};

const update_kategori = (req, res) => {
  const { nama_kategori, judul_kategori } = req.body;
  const { id_kategori } = req.params;

  const values = [nama_kategori, judul_kategori, id_kategori];
  const query =
    "update kategori_surat set nama_kategori = ?, judul_kategori=? where id_kategori=?";

  conn.query(query, values, function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ message: "data kategori updated successfully" });
  });
};

const delete_kategori = (req, res) => {
  const { id_kategori } = req.params;
  const query = "delete from kategori_surat where id_kategori=?";
  conn.query(query, id_kategori, function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ message: "data kategori deleted successfully" });
  });
};

export {
  get_all_kategori,
  get_kategori_by_id,
  add_kategori,
  update_kategori,
  delete_kategori,
};

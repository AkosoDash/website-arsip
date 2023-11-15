import conn from "../services/db.js";
import error_handler from "../utils/error_handler.js";
import { upload_file, delete_file } from "../services/file_uploader.js";
import { getCurrentDate } from "../utils/get_date.js";

const get_all_surat = (req, res) => {
  const query =
    "select * from surat inner join kategori_surat on surat.kategori = kategori_surat.id_kategori";
  conn.query(query, function (error, results, fields) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ data: results });
  });
};

const get_surat_by_id = (req, res) => {
  const { id_surat } = req.params;
  const query =
    "select * from surat inner join kategori_surat on surat.kategori = kategori_surat.id_kategori where id_surat = ?";
  conn.query(query, [id_surat], function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    if (results == "") return error_handler(res, "data surat not found", 404);
    return res.json({ data: results[0] });
  });
};

const add_surat = async (req, res) => {
  const { body, files } = req;
  const { nomor_surat, id_kategori, judul } = body;
  const pdf_file = files.file_pdf[0];
  const result = await upload_file(pdf_file);
  const pdf_link = result.link;
  const id_pdf = result.id;
  const waktu_pengarsipan = getCurrentDate();

  const query =
    "insert into surat (nomor_surat, kategori, judul, id_pdf, pdf_file, waktu_pengarsipan) values (?)";
  const values = [
    nomor_surat,
    id_kategori,
    judul,
    id_pdf,
    pdf_link,
    waktu_pengarsipan,
  ];

  conn.query(query, [values], function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    return res.json({ message: "data surat added successfully" });
  });
};

const update_surat = async (req, res) => {
  const { body, files, params } = req;
  const { nomor_surat, id_kategori, judul } = body;
  const { id_surat } = params;

  const query_get_data = "select * from surat where id_surat = ?";
  conn.query(query_get_data, [id_surat], async function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    if (results == "") return error_handler(res, "data surat not found", 404);

    const file_id = results[0].id_pdf;
    await delete_file(file_id);
    const pdf_file = files.file_pdf[0];
    const result = await upload_file(pdf_file);
    const pdf_link = await result.link;
    const id_pdf = await result.id;
    const waktu_pengarsipan = getCurrentDate();
    const query =
      "update surat set nomor_surat=?, kategori=?, judul=?, id_pdf=?, pdf_file=?, waktu_pengarsipan=? where id_surat = ?";
    const values = [
      nomor_surat,
      id_kategori,
      judul,
      id_pdf,
      pdf_link,
      waktu_pengarsipan,
      id_surat,
    ];

    conn.query(query, values, function (error, results) {
      if (error) return error_handler(res, error.message, 400);
      return res.json({ message: "data surat updated successfully" });
    });
  });
};

const delete_surat = (req, res) => {
  const { id_surat } = req.params;
  const query_get_data = "select * from surat where id_surat = ?";
  conn.query(query_get_data, [id_surat], async function (error, results) {
    if (error) return error_handler(res, error.message, 400);
    if (results == "") return error_handler(res, "data surat not found", 404);

    const file_id = results[0].id_pdf;
    await delete_file(file_id);
    const query = "delete from surat where id_surat = ?";
    conn.query(query, [id_surat], function (error, results) {
      if (error) return error_handler(res, error.message, 400);
      return res.json({ message: "data surat deleted successfully" });
    });
  });
};

export {
  get_all_surat,
  get_surat_by_id,
  add_surat,
  update_surat,
  delete_surat,
};

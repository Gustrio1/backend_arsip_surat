const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const database = require("../db");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_"); // hilangkan spasi
    const uniqueName = `${Date.now()}_${name}${ext}`;
    cb(null, uniqueName);
  },
});

router.get("/data", async (req, res) => {
  try {
    await database.query(" SELECT * FROM surat", (err, result) => {
      if (err) {
        console.log("Error");
      } else {
        res.json(result);
      }
      res.json({ message: "success" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error  surat");
  }
});

router.get("/data/:id", async (req, res) => {
  const file_url = req.params.id;

  try {
    await database.query(
      "SELECT  * FROM surat WHERE id = $1 ",
      [file_url],
      (err, result) => {
        if (err) {
          console.log("Error");
        } else {
          res.json({ message: "success", result });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Error  surat");
  }
});

const upload = multer({ storage });

router.post("/post", upload.single("file"), async (req, res) => {
  const { id, nama_surat, nama_bidang, tanggal, nama_instansi } = req.body;
  const localFilePath = req.file?.path;

  try {
    let cloudinaryData = null;

    if (localFilePath) {
      cloudinaryData = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      // console.log(cloudinaryData);

      fs.unlinkSync(localFilePath);
    }
    let fileUrl = cloudinaryData?.secure_url || null;

    await database.query(
      "INSERT INTO surat (id, nama_surat, nama_bidang, tanggal, file_url, nama_instansi) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, nama_surat, nama_bidang, tanggal, fileUrl, nama_instansi]
    );
    res.json({ message: "surat berhasil di tambahkan" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting surat");
  }
});

router.get("/update/:id", async (req, res) => {
  const suratId = req.params.id;

  try {
    const result = await database.query("SELECT * FROM surat WHERE id = $1", [
      suratId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Surat tidak ditemukan" });
    }

    res.json({ message: "success", data: result.rows[0] });
  } catch (err) {
    console.error("Gagal mengambil surat:", err);
    res.status(500).send("Terjadi kesalahan saat mengambil data surat");
  }
});

router.put("/update/:id", upload.single("file"), async (req, res) => {
  const suratId = req.params.id;
  const { nama_surat, nama_bidang, tanggal } = req.body;
  const file_path = req.file ? req.file.filename : null;

  try {
    const resultOld = await database.query(
      "SELECT file_url FROM surat WHERE id = $1",
      [suratId]
    );

    if (resultOld.rows.length === 0) {
      return res.status(404).json({ message: "surat tidak ditemukan" });
    }

    const oldFile = resultOld.rows[0].file_url;

    if (oldFile && file_path) {
      const filePath = path.join(__dirname, "..", "uploads/", oldFile);
      console.log("Mencoba hapus file:", filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updateData = await database.query(
      `UPDATE surat SET 
        nama_surat = $1, 
        nama_bidang = $2, 
        tanggal = $3, 
        file_url = $4 
      WHERE id = $5 
      RETURNING *`,
      [nama_surat, nama_bidang, tanggal, file_path, suratId]
    );
    console.log("error update", updateData);
    res.json({
      message: "surat berhasil di update",
      result: updateData.rows[0],
    });
  } catch (err) {
    console.error(err, res);
    res.status(500).send("Error inserting surat");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const suratId = req.params.id;

  try {
    const result = await database.query(
      "SELECT file_url FROM surat WHERE id = $1",
      [suratId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "surat tidak ditemukan" });
    }

    const fileName = result.rows[0].file_url;

    if (fileName) {
      const filePath = path.join(__dirname, "..", "uploads/", fileName);
      console.log("Mencoba hapus file:", filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deleteData = await database.query(
      `DELETE FROM surat WHERE id = $1`,
      [suratId],

      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error deleting item" });
        } else {
          res.status(200).json({ message: "Item deleted successfully" });
        }
        res.json({ message: "delete success", deleteData });
      }
    );
  } catch (err) {
    console.error(err, res);
    res.status(500).send("Error inserting surat");
  }
});

module.exports = router;

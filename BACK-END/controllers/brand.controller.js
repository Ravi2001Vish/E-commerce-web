import brandModel from "../models/brand.model";

import multer from "multer";
import fs from "fs";
import path from "path";

// PATH DIRECTORY

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadbrand = "./uploads/brands";
    if (fs.existsSync(uploadbrand)) {
      cb(null, uploadbrand);
    } else {
      fs.mkdirSync(uploadbrand);
      cb(null, uploadbrand);
    }
  },
  filename: function (req, file, cb) {
    let orName = file.originalname;
    let ext = path.extname(orName);
    let basename = path.parse(orName).name;
    let filename = basename + "-" + Date.now() + ext;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

// MULTIPLE brandS

export const getbrands = async (req, res) => {
  try {
    const brands = await brandModel.find();
    if (brands) {
      return res.status(201).json({
        data: brands,
        filePath: process.env.FILE_URL + "brands/",
        message: "all data fetched",
      });
    }
    return res.status(400).json({ message: "bad request" });
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};

// SINGLE brand
export const getbrand = async (req, res) => {
  try {
    const brandID = req.params.brand_id;
    const brand = await brandModel.findOne({ _id: brandID });
    if (brand) {
      return res.status(200).json({
        data: brand,
        filePath: process.env.FILE_URL + "brands/",
        masssage: "Single data received successful",
      });
    }
    return res.status(400).json({ message: "bad request" });
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};

// ADD brand

export const addbrand = async (req, res) => {
  try {
    const updateData = upload.single("brandImg");
    updateData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { name } = req.body;

      let filename = null;
      if (req.file) {
        filename = req.file.filename;
      }

      const savebrand = new brandModel({
        name:name,

        Logo:filename,
      });
      await savebrand.save();

      if (savebrand) {
        return res.status(201).json({
          data: savebrand,
          message: "created",
        });
      }

      return res.status(400).json({
        message: "Bad request",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE brand

export const updatebrand = async (req, res) => {
  try {
    const updateData = upload.single("brandImg");
    updateData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const brandID = req.params.brand_id;
      const existbrand = await brandModel.findOne({ _id: brandID });
      const { name } = req.body;

      let filename = existbrand.image;
      if (req.file) {
        filename = req.file.filename;
        if (fs.existsSync("./uploads/brands/" + existbrand.image)) {
          fs.unlinkSync("./uploads/brands/" + existbrand.image);
        }
      }
      const updatedbrand = await brandModel.updateOne(
        { _id: brandID },
        {
          $set: {
            name: name,

            Logo: filename,
          },
        }
      );
      if (updatedbrand.acknowledged) {
        return res.status(200).json({
          message: "Updated",
        });
      }

      return res.status(400).json({
        message: "Bad request",
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE brand

export const deletebrand = async (req, res) => {
  try {
    const uploadbrand = "./uploads/brands/";
    const deleteID = req.params.brand_id;
    const existbrand = await brandModel.findOne({ _id: deleteID });
    const deletebrand = await brandModel.deleteOne({ _id: deleteID });
    if (deletebrand.acknowledged) {
      if (fs.existsSync(uploadbrand + existbrand.image)) {
        fs.unlinkSync(uploadbrand + existbrand.image);
      }
      return res.status(200).json({
        message: "Selected single data deleted",
      });
    }
    return res.status(400).json({ message: "bad request" });
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};

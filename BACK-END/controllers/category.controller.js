import CategoryModel from "../models/category.model";
// import  jwt from "jsonwebtoken";

import multer from "multer";
import fs from "fs";
import path from "path";

// PATH DIRECTORY

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadCategory = "./uploads/category";
    if (fs.existsSync(uploadCategory)) {
      cb(null, uploadCategory);
    } else {
      fs.mkdirSync(uploadCategory);
      cb(null, uploadCategory);
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

// MULTIPLE USERS

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (categories) {
      return res.status(201).json({
        data: categories,
        filePath: process.env.FILE_URL + "category/",
        message: "all data fetched",
      });
    }
    return res.status(400).json({ message: "bad request" });
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};

// SINGLE category
export const getCategory = async (req, res) => {
  try {
    const categoryID = req.params.category_id;
    const category = await CategoryModel.findOne({ _id: categoryID });
    if (category) {
      return res.status(200).json({
        data: category,
        filePath: process.env.FILE_URL + "category/",
        masssage: "Single data received successful",
      });
    }
    return res.status(400).json({ message: "bad request" });
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};

// ADD USER

export const addCategory = async (req, res) => {
  try {
    const updateData = upload.single("categoryImg");
    updateData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { name, description } = req.body;

      let filename = null;
      if (req.file) {
        filename = req.file.filename;
      }

      const saveCategory = new CategoryModel({
        name: name,
     desctiption:description,
        image: filename,
      });
      await saveCategory.save();

      if (saveCategory) {
        return res.status(201).json({
          data: saveCategory,
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

// UPDATE USER

export const updateCategory = async (req, res) => {
  try {
    const updateData = upload.single("categoryImg");
    updateData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const categoryID = req.params.category_id;
      const existCategory = await CategoryModel.findOne({ _id: categoryID });
      const { name, description } = req.body;

      let filename = existCategory.image;
      if (req.file) {
        filename = req.file.filename;
        if (fs.existsSync("./uploads/category/" + existCategory.image)) {
          fs.unlinkSync("./uploads/category/" + existCategory.image);
        }
      }
      const updatedCategory = await CategoryModel.updateOne(
        { _id: categoryID },
        {
          $set: {
            name: name,
            desctiption:description,
            image: filename,

           
          },
        }
      );
      if (updatedCategory.acknowledged) {
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

// DELETE USER

export const deleteCategory = async (req, res) => {
  try {
    const uploadCategory = "./uploads/category/";
    const categoryID = req.params.category_id;
    const existCategory = await CategoryModel.findOne({ _id: categoryID });
    const deletecategory = await CategoryModel.deleteOne({ _id: categoryID });
    if (deletecategory.acknowledged) {
      if (fs.existsSync(uploadCategory + existCategory.image)) {
        fs.unlinkSync(uploadCategory + existCategory.image);
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

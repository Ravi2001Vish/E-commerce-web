import ProductModel from "../models/product.model";

import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/products")) {
      cb(null, "./uploads/products");
    } else {
      fs.mkdirSync("./uploads/products");
      cb(null, "./uploads/products");
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

export const getProducts = async (req, res) => {
  try {
    // /get-products?page=1&limit=3
    // /get-products?search=abc
    console.log(req.query);
    const { page, limit, search } = req.query;
    const skipno = (page - 1) * limit;

    const generateSearchRgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = generateSearchRgx(search);
    let filter = {};

    if (search) {
      // filter = { title: { $regex: searchRgx, $options: "i" } }
      filter = {
        $or: [
          { title: { $regex: searchRgx, $options: "i" } },
          { short_description: { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
        ],
      };
    }

    const products = await ProductModel.find(filter)
      .populate(["category", "brand"])
      .limit(limit)
      .skip(skipno)
      .sort({ _id: 1 });

    if (products) {
      return res.status(200).json({
        data: products,
        message: "Fetched!",
        filepath:`http://localhost:${process.env.PORT}/uploads/products/`
      });
    }
    return res.status(400).json({
      message: "Bad request",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductsByAggr = async (req, res) => {
  try {
    // https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-limit
    // const products = await ProductModel.find().populate('category');
    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      { $unwind: "$categoryData" },
      { $sort: { _id: -1 } },
      { $limit: 2 },

      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brandData",
        },
      },
      { $unwind: "$brandData" },
      { $sort: { _id: -1 } },
      { $limit: 2 },
    ]);
    // console.log(products)
    if (products) {
      return res.status(200).json({
        data: products,
        message: "Fetched!",
      });
    }
    return res.status(400).json({
      message: "Bad request",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const product = await ProductModel.findOne({ _id: productID }).populate([
      "category","brand"]
    );
    if (product) {
      return res.status(200).json({
        data: product,
        message: "Fetched!",
        filepath:`http://localhost:${process.env.PORT}/uploads/products/`

      });
    }
    return res.status(400).json({
      message: "Bad request",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addProduct = (req, res) => {
  try {
    const addProductWithFile = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);

    addProductWithFile(req, res, function (err) {
      if (err) return res.status.json({ message: err.message });

      const {
        title,
        category,
        brand,
        price,
        quantity,
        short_description,
        description,
      } = req.body;

      let thumbnail = null;
      if (req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0].filename;
      }

      let imageArr = [];
      if (req.files["images"]) {
        for (let index = 0; index < req.files["images"].length; index++) {
          const element = req.files["images"][index];
          imageArr.push(element.filename);
        }
      }

      const productData = new ProductModel({
        title: title,
        category: category,
        brand: brand,
        price: price,
        quantity: quantity,
        short_description: short_description,
        description: description,
        thumbnail: thumbnail,
        images: imageArr,
      });

      productData.save();
      if (productData) {
        return res.status(201).json({
          data: productData,
          message: "Created",
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

export const updateProduct = async (req, res) => {
  try {
    const productFields = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);
    productFields(req, res, async function (err) {
      if (err) throw new Error(err);

      const productId = req.params.product_id;
      const {
        title,
        category,
brand,
        price,
        quantity,
        short_Description,
        description,
        
        // deletedImages,
      } = req.body;

      const existingProduct = await ProductModel.findOne({ _id: productId });

      let thumbnail = existingProduct.thumbnail
      console.log(thumbnail)
      let imageArr = [];
      let removeImages = [];
let deletedImages = existingProduct['images']
console.log(deletedImages)
      if (deletedImages && Array.isArray(deletedImages)) {
        removeImages = deletedImages;
        deletedImages.forEach((element) => {
          if (fs.existsSync(`./uploads/products/${element}`)) {
            fs.unlinkSync(`./uploads/products/${element}`);
          }
        });
      } else {
        removeImages.push(deletedImages);
        if (fs.existsSync(`./uploads/products/${deletedImages}`)) {
          fs.unlinkSync(`./uploads/products/${deletedImages}`);
        }
      }

      if (req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0].filename;
        if (fs.existsSync(`./uploads/products/${thumbnail} `)) {
          fs.unlinkSync(`./uploads/products/${thumbnail}`);
        }
      }

      if (req.files["images"]) {
        req.files["images"].forEach((element) => {
          imageArr.push(element.filename);
        });
      }
      const product = await ProductModel.updateOne(
        { _id: productId },
        {
          $set: {
            title: title,
            category: category,
           brand:brand,
            price: price,
            quantity: quantity,
            stock: quantity,
            short_description:short_Description,
            description: description,
            thumbnail: thumbnail,
          },
        }
      );

      if (imageArr && Array.isArray(imageArr)) {
        await ProductModel.updateOne(
          { _id: productId },
          {
            $push: {
              images: { $each:imageArr },
            },
          }
        );
      }
      if (removeImages && Array.isArray(removeImages)) {
        await ProductModel.updateOne(
          { _id: productId },
          {
            $pull: {
              images: { $in:removeImages },
            },
          }
        );
      }

      // console.log(product);
      if (!product.matchedCount) throw new Error("Updation failed");

      return res.status(200).json({
        message: "Product updated successfully",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.product_id;
    const product = await ProductModel.deleteOne({ _id: productID });
    if (product.acknowledged) {
      return res.status(200).json({
        message: "Deleted ",
      });
    }
    return res.status(400).json({
      message: "Bad request",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

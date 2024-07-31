import mongoose from "mongoose";
import CategoryModel from "./category.model";
import brandModel from "./brand.model";
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: CategoryModel,
  },
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: brandModel,
  },
  short_description: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: Array,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("product", ProductSchema);


// export const updateProduct = async (req, res) => {
//   try {
//       const productID = req.params.product_id;
//       const existProduct = await ProductModel.findOne({ _id: productID });
//       const { title, category,brand, short_description, description, price, quantity } = req.body;

    
//       const updateProductWithFile = upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: 'images', maxCount: 10 }]);

//       updateProductWithFile(req, res, async function (err) {
//           if (err) return res.status(400).json({ message: err.message });

          
//           const removedImages = existProduct.images.filter(existingImage => !req.files['images'].some(updatedImage => updatedImage.filename === existingImage));
          
//           for (let i = 0; i < removedImages.length; i++) {
//               const existingImage = removedImages[i];
//               const imagePath = './uploads/products/' + existingImage;
              
//               if (fs.existsSync(imagePath)) {
//                   fs.unlinkSync(imagePath);
//               }
//           }

         
//           let thumbnail = existProduct.thumbnail;
//           if (req.files['thumbnail']) {
//               thumbnail = req.files['thumbnail'][0].filename
//               if (fs.existsSync('./uploads/products/' + existProduct.thumbnail)) {
//                   fs.unlinkSync('./uploads/products/' + existProduct.thumbnail)
//               }
//           }

//           const updatedImages = req.files['images'].map(element => element.filename);
//           const updateProduct = await ProductModel.updateOne(
//               { _id: productID },
//               {
//                   $set: {
//                       title: title,
//                       category: category,
//                       brand:brand,
//                       short_description: short_description,
//                       description: description,
//                       price: price,
//                       quantity: quantity,
//                       thumbnail: thumbnail,
//                   },
                  
               
//               }

//           );
        
//           if (updatedImages && Array.isArray(updatedImages)) {
//               await ProductModel.updateOne(
//                   { _id: productID },
//                   {
//                       $push: {
//                           images: { $each: updatedImages },
//                       },
//                   }
//               );
//           }
//             if (removedImages && Array.isArray(removedImages)) {
//               await ProductModel.updateOne(
//                 { _id: productID},
//                 {
//                   $pull: {
//                     images: { $in: removedImages },
//                   },
//                 }
//               );
//             }
      

//           if (updateProduct.acknowledged) {
//               return res.status(200).json({
//                   message: 'Updated'
//               });
//           }

//           return res.status(400).json({
//               message: 'Bad request'
//           });
//       });
//   } catch (error) {
//       return res.status(500).json({
//           message: error.message
//       });
//   }
// };


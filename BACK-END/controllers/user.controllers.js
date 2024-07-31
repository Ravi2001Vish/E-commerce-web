import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult, body, Result } from "express-validator";
import multer from "multer";
import fs from "fs";
import path from "path";
import { resolveSoa } from "dns";

 // PATH DIRECTORY

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadUser = "./uploads/users"
    if (fs.existsSync(uploadUser)){
      cb(null, uploadUser);
    } else {
      fs.mkdirSync(uploadUser);
      cb(null, uploadUser);
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
const upload = multer({ storage: storage })

// MULTIPLE USERS

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if(users){
      return res.status(201).json({
        data:users,
        filePath : process.env.FILE_URL + "users/",
        message:"all data fetched"})
    }
    return res.status(400).json({message:"bad request"})
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};


// SINGLE USER
export const getUser = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const user = await UserModel.findOne({_id:userID});
    if(user){
      return res.status(200).json({
        data:user,
        filePath :process.env.FILE_URL+ 'users/',
        masssage:"Single data received successful"
      })
    } return res.status(400).json({message:"bad request"})
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};


// ADD USER

export const addUser = async (req, res) => {
  
    try {

        const updateData =  upload.single("ravi");
        updateData(req, res, async function (err) {
          if (err) return res.status(400).json({ message: err.message });
    
          const { name, email, password, contact } = req.body;
    
          let filename = null;
          if (req.file) {
            filename = req.file.filename;
          }
    
          const saveUser = new UserModel({
            name:name,
            email: email,
            password: password,
            contact: contact,
            image: filename,
          });
          await saveUser.save();
    
          if (saveUser) {
            return res.status(201).json({
              data: saveUser,
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
  }


  // UPDATE USER

export const updateUser = async (req, res) => {
  try {
    const updateData = upload.single("ravi");
    updateData(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const userID = req.params.user_id;
      const existUser = await UserModel.findOne({ _id: userID });
      const { name, email, password, contact } = req.body;

      let filename = existUser.image;
      if (req.file) {
        filename = req.file.filename;
        if (fs.existsSync("./uploads/users/" + existUser.image)) {
          fs.unlinkSync("./uploads/users/" + existUser.image);
        }
      }
      const updatedUser = await UserModel.updateOne(
        { _id: userID },
        {
          $set: {
            name: name,
            email: email,
            password: password,
            contact: contact,
            image: filename,
          },
        }
      );
      if (updatedUser.acknowledged) {
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

export const deleteUser = async (req, res) => {
  try {
    const uploaduser = "./uploads/users/"
    const deleteID = req.params.user_id ; 
    const existUser = await UserModel.findOne({_id:deleteID});
    const  deleteuser = await UserModel.deleteOne({_id:deleteID});
    if(deleteuser.acknowledged){
      if(fs.existsSync(uploaduser+ existUser.image)){
fs.unlinkSync(uploaduser+ existUser.image);
      }
    return res.status(200).json({
      message:"Selected single data deleted"
    });

    }
    return res.status(400).json({message:"bad request"})
    
  } catch (error) {
    return res.status(500).json({ masssage: error.message });
  }
};



// SIGN UP

export const signUp = async (req, res) => {
  try {
    await Promise.all([
      body("name").notEmpty().withMessage("Name is required").run(req),
      body("email").isEmail().withMessage("Invalid email address").run(req),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .run(req),
        body("contact")
        .isLength({ min: 10, max:10 })
        .withMessage("Contact number should be of length 10 only")
        
        .run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,contact } = req.body;
    const existUSer = await UserModel.findOne({ email: email });
    if (existUSer)
      return res
        .status(200)
        .json({
          message: "user already exist please signup with differnet userID",
        });

    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(password, hashedPassword);
    const saveUser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      contact:contact
    });
    saveUser.save();
    if (saveUser) {
      return res.status(200).json({ message: "Signup Successful" });
    }

    return res.status(400).json({ message: "Bad request" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUSer = await UserModel.findOne({ email: email });
    if (!existUSer)
      return res.status(200).json({ message: "User doesn't exist" });

    const chekcPassword = bcrypt.compareSync(password, existUSer.password);
    if (!chekcPassword)
      return res.status(200).json({ message: "Invalid password" });
    const token = jwt.sign(
      {
        _id: existUSer._id,
        email: existUSer.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const resdata = {
      id:existUSer._id,
      name:existUSer.name,
      email:existUSer.email
  }
    return res.status(200).json({
      data: resdata,
      token: token,
      message: "Login Sucessful",

    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

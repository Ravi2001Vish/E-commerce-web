import express from 'express'
import { addUser, deleteUser, getUser, getUsers, Login,  signUp, updateUser } from '../controllers/user.controllers';
const router = express.Router();

router.get("/get-users" , getUsers)
router.get("/get-user/:user_id" , getUser)
router.post("/add-user" , addUser)
router.put("/update-user/:user_id" , updateUser)
router.delete("/delete-user/:user_id" , deleteUser)


// AUTH 

router.post('/sign-up', signUp);
router.post('/user-login', Login);


export default router




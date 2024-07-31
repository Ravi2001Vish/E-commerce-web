import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import Userrouter from './routers/user.router';
import Categoryrouter from './routers/categroy.router'
import Brandrouter from './routers/brand.router'
import Productrouter from './routers/product.router'
import Cartrouter from './routers/cart.router'
import cors from 'cors'



const app =express();
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));  

const PORT=process.env.PORT || 7002


mongoose.connect(process.env.DB_PATH+process.env.DB_NAME)
.then(()=>console.log("Connected!"));

app.listen(PORT,()=>{
    console.log("server is Running on http://localhost:"+PORT)
});
app.use(Userrouter);
app.use(Categoryrouter);
app.use(Brandrouter);
app.use(Productrouter);
app.use(Cartrouter);
import express from 'express';
import {   addToCart, deleteCart, getCartItems, updateQuantity } from '../controllers/cart.controller';

const router = express.Router();

router.get('/get-cart/:user_id',getCartItems);
router.post('/add-to-cart',addToCart);
router.put('/update-quantity/:item_id',updateQuantity);
router.delete("/delete-cart/:item_id", deleteCart)
// router.delete('/delete-item',deleteItem)

export default router
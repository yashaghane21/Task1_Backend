const express = require('express');
const router = express.Router();
const Cart = require("../Models/cartschema")
const User = require("../Models/User")
const Product = require("../Models/Product")

router.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const user = await User.findById(userId);


        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $push: {
                    products: {
                        product: productId,
                        quantity: quantity,
                    },
                },
            },
            { upsert: true, new: true }
        );

        res.status(200).send({
            success: true,
            message: "item added to cart",
            cart
        })
    } catch (error) {
        console.error(error);
    }
});


router.put('/remove-from-cart', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $pull: {
                    products: { product: productId },
                },
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.json({ success: true, message: 'Product removed from cart', cart: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});



router.get("/cartlist/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne({ user: id }).populate('products.product');
        return res.status(200).send({
            success: true,
            message: "done",
            cart
        })
    } catch (error) {

    }
})

module.exports = router;


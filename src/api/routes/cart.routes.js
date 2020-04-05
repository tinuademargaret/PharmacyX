const route  = require('express').Router();
const { validateNewItem, validateUpdateCartItem} = require('../../utils/validators');
const { filterError, CustomError} = require('../../utils/errorHelpers')
const { validationResult } = require("express-validator/check");
const cartService = require('../../services/cart.service');

module.exports = async(parentRouter)=>{

    // create new cart
    route.get('/generateUniqueId', async(req, res, next) => {
        try {
            const cs = new cartService();
            const response = await cs.generateShoppingcartId(req.ip);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });


    // add to cart
    route.post('/add', validateNewItem, async(req, res, next) => {
        const errors = filterError(validationResult(req));

        if (errors) {
            const error = new CustomError({ 
                name: "ShoppingCartError", 
                status: 422, 
                code: "SHPER_00", 
                message: "failed to add shopping item to shopping cart", 
                field: [errors]
            });

            return next(error);
        }

        try {
            const {cart_id, product_id} = req.body;
            const cs = new cartService();
            const response = await cs.addItemToShoppingcart(cart_id, product_id);
            return res.json(response);
        } catch (error) {
            return next(error); 
        }
    });

    // get all items in cart
    route.get('/shoppingcart/:cart_id', async(req, res, next) => {
        try {
            const {cart_id} = req.params;
            const cs = new cartService();
            const response = await cs.getItemsInShoppingcart(cart_id);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    // empty cart

    route.delete('/empty/:cart_id', async(req, res, next) => {
        try {
            const {cart_id} = req.params;
            const cs = new cartService();
            const response = await cs.emptyShoppingcart(cart_id);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    //remove item
    route.delete('/removeProduct/:item_id([0-9]+)', async (req, res, next) => {
        try {
            const {item_id} = req.params;
            const cs = new cartService();
            const response = await cs.removeItemFromShoppingcart(item_id);
            return res.json(response);
        } catch (error) {   
            return next(error);
        }
    });




parentRouter.use('/cart', route)
}
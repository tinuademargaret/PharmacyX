const uuid = require('uuid/v4');
const db = require('../models');
const cart = db.Cart;



class ShoppingCartService {

    /**
     * cache cart_id by ip address, this can be improved though
     * @param {object} request 
     */
    async generateShoppingcartId(ip){
        try {
            const cartId = uuid();
            return {
                cart_id: cartId.split('-')[0]
            };
        } catch (error) {
            throw error;
        }   
    }



    async addItemToShoppingcart(cartId, productId){
        try {
            let shoppingCart =await  cart.findOne({where:{cart_id:cartId}});
            shoppingCart.update(productId);
            let response = shoppingCart;
            return response;
        } catch (error) {
            throw error;
        }
    }


    async getItemsInShoppingcart(cartId){
        try {
            const response =  await cart.findOne({where:{cart_id:cartId}});;
            return response;
        } catch (error) {
            throw error;
        }
    }


    async emptyShoppingcart(cartId){
        try {
            const response = await cart.destroy({where:{cart_id:cartId}});
            return [];
        } catch (error) {
            throw error;
        }
    }

    async removeItemFromShoppingcart(itemId){
        try {
            const response = await shoppingCartModel.deleteItemFromCart(itemId);
            return {};         
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ShoppingCartService;

const db = require('../models');
const category = db.Category;
const product = db.Product;
const admin = db.Admin;
const customError = require('../utils/error.helpers');
const paginate = Symbol('paginate');


class productService{
    async upload(data, admin_id){
        try{
            const currentAdmin = await admin.findOne({where:{id:admin_id}})
            if(!currentAdmin){
                throw new customError({
                    name: "ProductUploadError",
                    status: 400,
                    code: 'PRD_01',
                    message: 'An admin with this Id does not exist',
                    field: 'id'
                })
            }
            product.create(data)
            const newProduct = product.findOne({where:{name:data.name}})
            const response = {
                product: newProduct
            }
            return response;
        }catch(error){
            throw error;
        }
    }


    async getProducts(data){
        try {
            const {page, limit, description_length} = data;
            const { offset, _limit} = this[paginate](page,limit);
            const products = await product.findAll({_limit, offset});
            return {
                count: products.length,
                rows: products
            }
        } catch (error) {
            throw error;
        }   
    }

    async getProduct(data){
        try {
            const {product_id} = data;
            const product = await product.findOne({where:{id:product_id}})
            return (product.length > 0)? product[0]: { message: 'product does not exist'};
        } catch (error) {
            throw error;
        }
    }

    async getProductCategory(data){
        try {
            const {category_id} = data.params;
            const {page, limit, description_length} = data.query;

            const { offset, _limit} = this[paginate](page,limit);
            const products = await product.findAll({category_id, _limit, offset});
            return {
                count: products.length,
                rows: products
            }
        } catch (error) {
            throw error;
        } 
    }

    async searchProducts(data){
        try {
            const {query_string, page, limit, description_length} = data;
            const { offset, _limit} = this[paginate](page,limit);
            const products = await product.findAll({query_string, _limit, offset});

            return {
                count: products.length,
                rows: products
            }
        } catch (error) {
            throw error;
        }
    }


    async addProductReview(data){
        try {
            const {product_id} = data.params;
            const {review, rating, customer_id} = data.body;
            product.update(customer_id, product_id,review,rating);
            const productReviewed = product.findOne({where:{id:product_id}});
            const response = {
                product: productReviewed
            }
            return response
        } catch (error) {
            throw error;
        }
    }

    async getProductReviews(data){
        try {
            const {product_id} = data;
            const productReviewed = await product.findOne({where:{id:product_id}});
            if (productReviewed.length > 0){
                const productreview = productReviewed.review
                return response = {
                    review : productreview
                }
            }
            return { message: 'product does not exist'};
        } catch (error) {
            throw error;
        }
    }


    [paginate](page, limit){
        page = page || 1;
        limit = limit || 20;

        let _page = parseInt(page, 10); //convert to an integer
        if (isNaN(_page) || _page < 1) {
            _page = 1;
        }
        let _limit = parseInt(limit, 10); //convert to an integer

        //be sure to cater for all possible cases
        if (isNaN(_limit)) {
            _limit = 10;
        } else if (_limit > 50) {
            _limit = 50;
        } else if (_limit < 1) {
            _limit = 1;
        }
        const offset = (_page - 1) * _limit;

        return {
            offset: offset,
            _limit,
            page: _page
        };
    }


}

module.exports = productService;
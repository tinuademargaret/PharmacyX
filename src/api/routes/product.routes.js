const route = require('express').Router;
const productService = require('../../services/product.service');
const verifyToken = require('../middleware');
const { filterError, CustomError} = require('../../utils/errorHelpers')
const { validateQueryString, validateProductReview, validateNewProduct} = require('../../utils/validators');

module.exports = async(parentRouter) => {
    // upload product
    route.post('/upload', verifyToken, validateNewProduct, async(req, res, next)=>{
        const errors = filterError(validationResult(req));
        if (errors){
        const error = new CustomError({
            name: "ProductUploadError",
            status: 422,
            code: "PRD_00",
            message: "unable to upload new product",
            field: [errors]
        });
        return next(error);
        }
        try{
        const data = req.body;
        const ps = new productService()
        const admin_id = req.decoded.id
        const response = await ps.upload(data, admin_id)
        return res.json(response)
        }catch(error){
            return next(error)
        }
    });

    // get product in cache
    route.get('/cache', cache,  async (req, res, next) => { 
        try {
            const ps= new productService() ;
            const response = await ps.getProducts(req.query);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    // get product by id
    route.get('/:product_id([0-9]+)', cache, async (req, res, next) => { 
        try {
            const ps = new productService();
            const response = await ps.getProduct(req.params);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    // get product by category

    route.get('/inCategory/:category_id([0-9]+)', cache, async (req, res, next) => { 
        try {
            const ps = new productService();
            const response = await ps.getProductCategory(req);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });


    // search product 

    route.get('/search', validateQueryString ,cache, async (req, res, next) => { 
        const errors = filterError(validationResult(req));

        if (errors) {
            const error = new CustomError({ 
                name: "ProductsError", 
                status: 422, 
                code: "PDR_00", 
                message: "unable to fetch product", 
                field: [errors]
            });

            return next(error);
        }

        try {
            const ps = new productService();
            const response = await ps.searchProducts(req.query);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    // add product review
    route.post('/:product_id([0-9]+)/reviews', verifyToken, validateProductReview, cache, async (req, res, next) => { 
        try {
            req.body.customer_id = req.decoded.id
            const ps = new productService();
            const response = await ps.addProductReview(req);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    // get product review
    route.get('/:product_id([0-9]+)/reviews', cache, async (req, res, next) => { 
        try {
            const ps = new productService() 
            const response = await ps.getProductReviews(req.params);
            return res.json(response);
        } catch (error) {
            return next(error);
        }
    });

    parentRouter.use('/products', route);
}


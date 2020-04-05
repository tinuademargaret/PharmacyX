const route = require('express').Router();
const categoryService = require('../../services/category.service');
const validateNewCategory = require('../../utils/validators');
const { filterError, CustomError } = require('../../utils/error.helpers')
const { validationResult } = require('express-validator/check');
const verifyToken = require('../middleware');


module.exports = async(parentRouter)=>{

    // category upload

    route.post('/upload',validateNewCategory, verifyToken,  async(req,res,next)=>{
        const errors = filterError(validationResult(req))
        if(errors){
            const error = new CustomError({
                name: "UploadCategoryError",
                status: 422,
                code: "CAT_00",
                message: "Unable to uploade category",
                field: [errors]
            });
            return next(error);
        }
        try{
        const data = req.body;
        const cs = new categoryService()
        const admin_id = req.decoded.id;
        const response = await cs.upload(data, admin_id);
        return res.json(response)
        }catch(error){
            return next(error);
        }
    })

    parentRouter.use('/category', route)
}
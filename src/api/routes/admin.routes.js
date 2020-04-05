const route = require('express').Router();
const adminService = require('../../services/admin.services');
const { validateNewAdmin,
        validateLogin } = require('../../utils/validators');
const { filterError, CustomError} = require('../../utils/error.helpers');
const { validationResult } = require("express-validator/check");
const verifyToken = require("../middleware")
module.exports = async(parentRouter) => {

    // sign up

    route.post('/signup', validateNewAdmin, async(req, res, next) =>{
        const errors = filterError(validationResult(req));
        if (errors){
            const error = new CustomError({
                name: "RegistrationError",
                status: 422,
                code: "ADMIN_00",
                message: "unable to register admin",
                field: [errors]
            });
            return next(error);
        }
        try{
            cs = new adminService()
            const response = await cs.register(req.body);
            return res.json(response);
        } catch (error) {
            return next(error);
        }


    });

    //sign in

    route.post('/signin', validateLogin, async(req,res,next)=>{
        const errors = filterError(validationResult(req));
        if (errors){
            const error = new CustomError({
                name: "LoginError",
                status: 422,
                code: "ADMIN_01",
                message: "unable to Login admin",
                field: [errors]
            });
            return next(error);
        }
        try{
            cs = new adminService()
            const response = await cs.login(req.body);
            return res.json(response);
        }catch(error){
            return next(error);
        }
    });

    
    parentRouter.use('/admin', route);
}

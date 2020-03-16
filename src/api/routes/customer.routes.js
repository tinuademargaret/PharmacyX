const route = require('express').Router();
const customerService = require('../../services/customer.service');
const { validateNewCustomer,
        validateLogin,
        validateUpdateCustomer} = require('../../utils/validators');
const { filterError, CustomError} = require('../../utils/error.helpers');
const { validationResult } = require("express-validator/check");
const verifyToken = require("../middleware")
module.exports = async(parentRouter) => {

    // sign up

    route.post('/signup', validateNewCustomer, async(req, res, next) =>{
        const errors = filterError(validationResult(req));
        if (errors){
            const error = new CustomError({
                name: "RegistrationError",
                status: 422,
                code: "USR_00",
                message: "unable to register customer",
                field: [errors]
            });
            return next(error);
        }
        try{
            cs = new customerService()
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
                code: "USR_00",
                message: "unable to Login customer",
                field: [errors]
            });
            return next(error);
        }
        try{
            cs = new customerService()
            const response = await cs.login(req.body);
            return res.json(response);
        }catch(error){
            return next(error);
        }
    });

    route.put('/update', validateUpdateCustomer, verifyToken, async(req,res,next)=>{
        const errors = filterError(validationResult(req));
        if (errors){
            const error = new CustomError({
                name: "UpdateError",
                status: 422,
                code: "USR_00",
                message: "unable to update customer",
                field: [errors]
            });
            return next(error);
        }
        try{
            const customerId = req.decoded.id;
            const cs = new customerService();
            const response = await cs.update(req.body, customerId);
            return res.json(response);
        }catch (error){
            return next(error);
        }
    })

    parentRouter.use('/customer', route);
}








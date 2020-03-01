const route = require('express').Router();
const customerService = require('../../services/customer.service');
const {validateNewCustomer} = require('../../utils/validators');
const { filterError, CustomError} = require('../../utils/error.helpers');
const { validationResult } = require("express-validator/check");

module.exports = async(parentRouter) => {
    // app.use(route);
    // post requests

    // sign up

    route.post('/customers', validateNewCustomer, async(req, res, next) =>{
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
            const response = await customerService.register(req.body);
            console.log('i love you');
            return res.json(response);
        } catch (error) {
            return next(error);
        }


    });

    parentRouter.use('/auth', route);
}








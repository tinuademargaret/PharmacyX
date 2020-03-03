const route = require('express').Router();
const customerService = require('../../services/customer.service');
const { validateNewCustomer } = require('../../utils/validators');
const { filterError, CustomError} = require('../../utils/error.helpers');
const { validationResult } = require("express-validator/check");

module.exports = async(parentRouter) => {

    // sign up

    route.post('/customers', async(req, res, next) =>{
        console.log('I am here 1')
        // const errors = filterError(validationResult(req));
        // console.log('I am here 2')
        // if (errors){
            // const error = new CustomError({
                // name: "RegistrationError",
                // status: 422,
                // code: "USR_00",
                // message: "unable to register customer",
                // field: [errors]
            // });
            // return next(error);
        // }
        try{
            cs = new customerService()
            console.log(req.body);
            const response = await cs.register(req.body);
            return res.json(response);
        } catch (error) {
            return next(error);
        }


    });

    parentRouter.use('/auth', route);
}








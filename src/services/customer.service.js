'use strict'
const bcrypt = require('bcryptjs');
const db = require('../models')
const customer = db.User;
const customError = require('../utils/error.helpers');
const createToken = require('../utils/jwt');
class customerService{
    async register(data){
    try{
        const c = customer.findAll()
        console.log(c)
        const currentCustomer = customer.findAll({where:{email: data.email}})
        console.log(currentCustomer)
        if(currentCustomer.length>0){
            throw new customError({
                name: "RegistrationError",
                status: 400,
                code: "AUT_00",
                message: "a customer with this email already exist",
                field: "email"
            })
        }
        const hashedPassword = await bcrypt.hash(data.password, 8);
        data.password = hashedPassword
        customer.create(data)
        const newCustomer = await customer.findAll({where:{email:data.email}});
        const token = createToken({id:newCustomer.userId, email:newCustomer.email, username:newCustomer.username});
        const response = {
            customer: newCustomer,
            accessToken: token,
            expires_in: '24h'
        }
        return response;
        }

        catch (error){
            throw error;
    }
    
}
}


module.exports = customerService;
'use strict'
const bcrypt = require('bcryptjs');
const db = require('../models')
const customer = db.User;
const customError = require('../utils/error.helpers');
const createToken = require('../utils/jwt');
class customerService{
    async register(data){
    try{
        const currentCustomer = await customer.findAll({where:{email: data.email}})
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
        const token = createToken({id:newCustomer.id, email:newCustomer.email, username:newCustomer.username});
        delete newCustomer.dataValues.password;
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
async login(data){
    try{
        const currentCustomer = await customer.findOne({where:{email:data.email}})
        if (!currentCustomer){
            throw new customError({
                name: "LoginError",
                status: 400,
                code: "AUT_01",
                message: "invalid customer credentials",
                field: ["email", "password"]})
        }
        const passwordIsValid = await bcrypt.compare(data.password, currentCustomer.password);
            if(!passwordIsValid){
                throw new CustomError({
                    name: "LoginError",
                    status: 400,
                    code: "AUTH_01",
                    message: "invalid customer credentials",
                    field: ["email", "password"]
                });
            }
            delete currentCustomer.dataValues.password;
            const token = createToken({ id: currentCustomer.id, email: currentCustomer.email });
            const response = {
                customer: {
                    schema: currentCustomer
                },
                accessToken: token,
                expires_in: '24h'
            }

            return response;
        

    }catch (error){
        throw error;
    }
}
async update(data, customerId){
try{
    if (data.cardDetails){
        data.cardDetails.toString()
    }
    const currentCustomer = await customer.findOne({where:{id:customerId}})
    currentCustomer.update(data)
    delete currentCustomer.dataValues.password;
    const response = {
        customer: {
            schema: currentCustomer
        }
    }
    return response
}catch (error){
    throw error;
}
}
}
module.exports = customerService;

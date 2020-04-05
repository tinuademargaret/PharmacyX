'use strict'
const bcrypt = require('bcryptjs');
const db = require('../models')
const admin = db.Admin;
const customError = require('../utils/error.helpers');
const createToken = require('../utils/jwt');
class adminService{
    async register(data){
    try{
        const currentAdmin = await admin.findAll({where:{email: data.email}})
        if(currentAdmin.length>0){
            throw new customError({
                name: "RegistrationError",
                status: 400,
                code: "ADMIN_00",
                message: "An admin with this email already exist",
                field: "email"
            })
        }
        const hashedPassword = await bcrypt.hash(data.password, 8);
        data.password = hashedPassword
        admin.create(data)
        const newAdmin = await admin.findAll({where:{email:data.email}});
        const token = createToken({id:newAdmin.id, email:newAdmin.email, username:newAdmin.username});
        delete newAdmin.dataValues.password;
        const response = {
            customer: newAdmin,
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
        const currentAdmin = await admin.findOne({where:{email:data.email}})
        if (!currentAdmin){
            throw new customError({
                name: "LoginError",
                status: 400,
                code: "ADMIN_01",
                message: "invalid admin credentials",
                field: ["email", "password"]})
        }
        const passwordIsValid = await bcrypt.compare(data.password, currentAdmin.password);
            if(!passwordIsValid){
                throw new CustomError({
                    name: "LoginError",
                    status: 400,
                    code: "ADMIN_01",
                    message: "invalid admin credentials",
                    field: ["email", "password"]
                });
            }
            delete currentAdmin.dataValues.password;
            const token = createToken({ id: currentAdmin.id, email: currentAdmin.email });
            const response = {
                customer: {
                    schema: currentAdmin
                },
                accessToken: token,
                expires_in: '24h'
            }

            return response;
        

    }catch (error){
        throw error;
    }
}
}
module.exports = adminService;

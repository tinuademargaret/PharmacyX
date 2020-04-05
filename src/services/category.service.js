const db = require('../models');
const category = db.Category;
const admin = db.Admin;
const customError = require('../utils/error.helpers');

class categoryService{
    async upload(data, admin_id){
        try{
            const currentAdmin = await admin.findOne({where:{id:admin_id}})
            if(!currentAdmin){
                throw new customError({
                    name: "CategoryUploadError",
                    status: 400,
                    code: 'CAT_01',
                    message: 'An admin with this Id does not exist',
                    field: 'id'
                })
            }
            const existingCategory = category.findAll({where:{name:data.name}})
            if(existingCategory){
                throw new customError({
                    name: "CategoryUploadError",
                    status: 400,
                    code: 'CAT_01',
                    message: 'A category with this name already exists',
                    field: 'id'
                })
            }
            category.create(data)
            const newCategory = category.findOne({where:{name:data.name}})
            const response = {
                category: newCategory
            }
            return response;
        }catch(error){
            throw error;
        }
        
    }
}

module.exports = categoryService;
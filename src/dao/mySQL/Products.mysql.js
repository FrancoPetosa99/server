/********************************************/
//IMPORT MODULES
/********************************************/
import CustomError from '../../util/customError.js';

class ProductDB{

    constructor(){}

    async getAll() {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getPagination(queryObj){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getById(id) {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getByCode(code) {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async getByFilter(filterObj = {}) {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async create(newProductObj) {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async updateById(id, updateObj) {
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async deleteById(id){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }

    async checkProductExist(id){
        try{
            //HERE GOES MYSQL DATA BASE ACCESS LOGIC

        }catch(error){
            throw new CustomError(`An unexpected error has occurred`, 500);
        }
    }
}

const productDB = new ProductDB();

export default productDB;



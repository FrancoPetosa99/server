//modules
import fs from 'fs';

class FileManager{

    constructor(file){
        this.path = `${process.cwd()}/src/dao/files/${file}.json`;
    }

    async loadItem(item){
    
        //fetch already created items
        const items = await this.getItems();

        //assing an id
        item.id = this.getAvailableID(items);

        items.push(item);

        await fs.promises.writeFile(this.path, JSON.stringify(items));
        
        return item;

    }

    async getItems(){
        let itemList = [];

        if(fs.existsSync(this.path)){
            const readFileRes = await fs.promises.readFile(this.path);
            itemList = JSON.parse(readFileRes);
        }

        return itemList;
    }

    async getItemByID(id){

        const items = await this.getItems();

        const item = items.find(item => item.id == id);

        if(!item) throw new Error(`The item with id ${id} could not be found`);

        return item;

    }

    async updateItemById(id, newDataObj){

        //handle validations first
        if(!newDataObj) throw new Error('No data sent to update item');

        const items = await this.getProducts();
        const item = items.find(item => item.id == id);

        if(!item) throw new Error(`The product with id ${id} could not be found`);
        
        for(const key in newDataObj){
            //only change the updated fields
            item[key] = newDataObj[key];
        }

        await fs.promises.writeFile(this.path, JSON.stringify(items));
    }

    async deleteItemById(id){

        let items = await this.getItems();

        const itemDeleted = items.find(item => item.id == id);

        //verify if the product attempted to be deleted actually exists
        if(!itemDeleted) throw new Error(`Item with id ${id} does not exist`);

        //create a new array with all products except for the deleted one
        items = items.filter(item => item.id != id);

        return fs.promises.writeFile(this.path, JSON.stringify(items));

    }

    getAvailableID(itemsArr){
        let availableID = 1;

        let idFound = false;

        while (!idFound) {
            idFound = !itemsArr.some(item => item.id == availableID);
            if(!idFound) availableID++;
        }

        return availableID;
    }
    
}

export default FileManager;



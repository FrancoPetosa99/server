import multer from 'multer';
import __dirname from '../utils.js';
import path from 'path'

function fileHandler(folderPath){
    const dest = path.join(__dirname, `public/images/${folderPath}`);

    //storage
    const storage = multer.diskStorage({
        destination: dest,
        filename: (req, file, cb) => cb(null, file.originalname)
    });

    //set upload
    const upload = multer({
        dest,
        storage
    }).single('image');

    return upload;
}

export default fileHandler;
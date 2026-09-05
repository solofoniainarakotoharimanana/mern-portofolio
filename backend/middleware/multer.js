import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
import {v4 as uuidv4} from "uuid"

import path from "path";


// const storage = new CloudinaryStorage({//CLOUDINARY STORAGE
//     cloudinary: cloudinary,
//     params: {
//         folder: "uploads",
//         allowed_format: ["jpg", "jpeg", "png"]
//     }
// });

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// })

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        const newFilename = uuidv4() + path.extname(file.originalname);
        cb(null, newFilename)
    }
})

const upload = multer({storage})
export default upload;
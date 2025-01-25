import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });


//=====не обов'язкові налаштування=============

// const limits = {
//     fileSize:1024*1024*5
// };
// const filterFile =(req,file,cb)=>{
//     const extention = file.originalname.split(".").pop();
//     if(extention === "exe"){
//        return cb(createError(400,"file with .exe extention not allow"));
//     }
//     cb(null, true);
// };

// export const upload = multer({
//     storage,
//     limits,
//     filterFile,
// });

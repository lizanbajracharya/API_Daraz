const express = require('express');
const Product = require('../models/product');
const multer=require('multer')
const path=require("path");
const uploadRouter = express.Router();

//path to store image
const storage = multer.diskStorage({
    destination: "./upload/productlist",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});
//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

uploadRouter.route('/upload')
    .post(upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    });

    module.exports=uploadRouter;
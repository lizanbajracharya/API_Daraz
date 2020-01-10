const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtSecret="lizan";

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
            err.status = 500;
            return next(err);
        }
        User.create({
            mobileNumber: req.body.mobileNumber,
            code:req.body.code,
            username:req.body.username,
            password:hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, jwtSecret);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.get('/user/list',(req,res)=>{
    User.find({

    }).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.send(e);
    })
});

router.post('/user/login', (req, res, next) => {
    User.findOne({ mobileNumber: req.body.mobileNumber })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not exist');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isCorrectPassowrd) => {
                        if (!isCorrectPassowrd) {
                            let err = new Error('Wrong Password');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, jwtSecret);
                        res.json({ status: 'Login Successfully', token: token });
                    }).catch(next);
            }
        }).catch(next);
});

module.exports = router;

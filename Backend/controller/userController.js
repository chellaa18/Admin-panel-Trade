var { Validator } = require("node-input-validator");
var mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

var jwtAuthentication = require('../srepleh/yfirevtwj');
var commonhelper = require("../srepleh/tpyrced_tpyrcne");
var userModel = require('../models/userModel');

exports.createNewUser = async (req, res) => {
    try {
        let info = req.body;
        const v = new Validator(info, {
            email: 'required',
            password: 'required',
        });
        v.check().then(async (matched) => {
            if (!matched) {
                res.json({
                    status: false,
                    message: 'Please fill the required fields'
                });
                res.end();
            } else {
                userModel.create(info, async (err, userData) => {
                    if (!err && userData) {
                        let userToken = await jwtAuthentication.tokenSign({ userId: userData._id.toString() })
                        res.json({ status: true, message: 'User Details Created', data: userData, accessToken: userToken });
                        res.end();
                    }
                    else {
                        res.json({ status: false, message: 'Error in creation, Try again Later' });
                        res.end();
                    }
                })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Something went wrong' });
        res.end();
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        let info = req.body;
        const v = new Validator(info, {
            _id: 'required',
            email: 'required',
            password: 'required',
        });
        v.check().then(async (matched) => {
            if (!matched) {
                res.json({
                    status: false,
                    message: 'Please fill the required fields'
                });
                res.end();
            } else {
                userModel.updateOne({ _id: ObjectId(info._id) }, { $set: info }, (err, userData) => {
                    if (!err && userData) {
                        if (userData.nModified == 1) {
                            res.json({ status: true, message: 'User Details Updated' });
                            res.end();
                        }
                        else {
                            res.json({ status: false, message: 'Nothing to Change' });
                            res.end();
                        }
                    }
                    else {
                        res.json({ status: false, message: 'No Details Found' });
                        res.end();
                    }
                })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Something went wrong' });
        res.end();
    }
}

exports.deleteUserDetails = async (req, res) => {
    try {
        let info = req.body;
        const v = new Validator(info, {
            _id: 'required',
        });
        v.check().then(async (matched) => {
            if (!matched) {
                res.json({
                    status: false,
                    message: 'Please fill the required fields'
                });
                res.end();
            } else {
                userModel.deleteOne({ _id: ObjectId(info._id) }, (err, userData) => {
                    if (!err && userData) {
                        res.json({ status: true, message: 'User Details Deleted' });
                        res.end();
                    }
                    else {
                        res.json({ status: false, message: 'No Details Found' });
                        res.end();
                    }
                })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Something went wrong' });
        res.end();
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        let info = req.body;
        const v = new Validator(info, {
            _id: 'required',
        });
        v.check().then(async (matched) => {
            if (!matched) {
                res.json({
                    status: false,
                    message: 'Please fill the required fields'
                });
                res.end();
            } else {
                userModel.findOne({ _id: ObjectId(info._id) }, (err, userData) => {
                    if (!err && userData) {
                        res.json({ status: true, message: 'User Details', data: userData });
                        res.end();
                    }
                    else {
                        res.json({ status: false, message: 'No Details Found' });
                        res.end();
                    }
                })
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Something went wrong' });
        res.end();
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        let info = req.body;
        const v = new Validator(info, {
            page: 'required',
            length: 'required',
        });
        v.check().then(async (matched) => {
            if (!matched) {
                res.json({
                    status: false,
                    message: 'Please fill the required fields'
                });
                res.end();
            } else {
                var tableLenth;
                var perPage;
                tableLenth = (req.body.page - 1) * req.body.length;
                perPage = req.body.length;
                let search = {};
                userModel.find(search, async (err, userData) => {
                    if (!err && userData) {
                        let userCount = await userModel.countDocuments(search);
                        res.json({ status: true, message: 'User Details', data: userData, count: userCount });
                        res.end();
                    }
                    else {
                        res.json({ status: false, message: 'No Details Found' });
                        res.end();
                    }
                }).skip(+tableLenth).limit(+perPage).sort({ createdAt: -1 });
            }
        })
    }
    catch (e) {
        res.json({ status: false, message: 'Something went wrong' });
        res.end();
    }
}
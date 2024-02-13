var express = require('express');
var router = express.Router();

var isAuthencation = require('../srepleh/htua');
var JWTVerification = require('../srepleh/yfirevtwj');

var userController = require('../controller/userController');

router.post('/createNewUser', isAuthencation.origin, userController.createNewUser);
router.post('/updateUserDetails', isAuthencation.origin, JWTVerification.tokenValidator, userController.updateUserDetails);
router.post('/deleteUserDetails', isAuthencation.origin, JWTVerification.tokenValidator, userController.deleteUserDetails);
router.post('/getUserDetails', isAuthencation.origin, JWTVerification.tokenValidator, userController.getUserDetails);
router.post('/getAllUserDetails', isAuthencation.origin, JWTVerification.tokenValidator, userController.getAllUserDetails);


module.exports = router;

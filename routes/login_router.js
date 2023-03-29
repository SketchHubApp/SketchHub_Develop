const express = require('express');

const router = express.Router();
const loginController = require('../controller/login_controller');
const userController = require('../controller/user_controller');

// login router
//router.get('/login', loginController.loginPage);
// http://localhost:3000/login
router.post('/', loginController.login);

// logout router    <- sketch 쪽으로 갈 수 있음

// signUp router
// http://localhost:3000/login/signUp
router.post('/signUp', userController.signUp);

// find ID router
// http://localhost:3000/login/findId
router.post('/findId', loginController.findId);

// find PW router
// http://localhost:3000/login/findPw
router.post('/findPw', loginController.findPw);

// cancel router


module.exports = router;
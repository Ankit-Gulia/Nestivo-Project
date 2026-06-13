
const express = require('express');
const router = express.Router();
const {wrapAsync} = require('../Utils/middleware');
const {signup, login, logout, isUserAuthenticate} = require('../Controller/user.controller');


router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/auth/check', isUserAuthenticate);

module.exports = router;
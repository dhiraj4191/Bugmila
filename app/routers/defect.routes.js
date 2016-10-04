var express = require ('express');
var router = express.Router();
var reqCtrl = require('../controllers/request.controller')
router.get('/',reqCtrl.basepage);
router.get('/login',reqCtrl.login);


module.exports = router;
/**
 * Created by litonghui on 2016/2/25.
 */
var express = require('express');
var router = express.Router();

var parsers = require('../modules/utils/parsers');
var photoprovider = require('../modules/photoprovider');

router.use('/photo',function(req,res){
    var page = req.param('page');
    photoprovider.getPhones(page,function(result){
        parsers.resultProc(req,result,res)
    });
});
router.use('/detail',function(req,res){
    var url = req.param('url');
    photoprovider.getPhonesDeatil(url,function(result){
        parsers.resultProc(req,result,res)
    });
});
module.exports = router;
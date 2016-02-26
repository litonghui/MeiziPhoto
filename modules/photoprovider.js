/**
 * Created by litonghui on 2016/2/24.
 */
var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

function  getPhoto(page,callback) {
    var page = page;
    if (page == '' || page == undefined) {
        callback('Param Error');
        return;
    }
    request
    (
        {
            uri: 'http://www.meizitu.com/a/list_1_' + page+'.html',
            encoding: null
        }, function (err, res, body) {
            if (err) {
                callback(err);
                return;
            }
            var info = [];
            var rawHtml = iconv.decode(body, 'GB2312');
            var $ = cheerio.load(rawHtml);
            $('.pic').each(function (i, e) {
                info[i]={
                    url: e.children[1].attribs.href,
                    image_url: e.children[1].children[0].attribs.src,
                    title: e.children[1].children[0].attribs.alt.replace('<b>','').replace('</b>','')
                }
            });
            callback(info);
        });
}
function getPhotoDetail(_url,callback){
     var url = _url;
    if (url == '' || url == undefined) {
        callback('Param Error');
        return;
    }
    request
    (
        {
            uri:url,
            encoding: null
        }, function (err, res, body) {
            if (err) {
                callback(err);
                return;
            }
            var info = [];
            var rawHtml = iconv.decode(body, 'GB2312');
            var $ = cheerio.load(rawHtml);
            var picture = $('#picture').html().replace('<p>','').replace('</p>','');
            var $$ = cheerio.load(picture);
            $$('img').each(function(i,e){
                info[i]={
                    url: e.attribs.src
                }
            });
            callback(info);
       });
}
module.exports.getPhones = getPhoto;
module.exports.getPhonesDeatil = getPhotoDetail;
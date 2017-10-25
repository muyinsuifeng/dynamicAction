var express = require('express');

module.exports = function(req, res, next) {

    console.info("url:" + req.url + " in " + __filename );
    // console.info(req.session.user);
    if( req.session.user){
        var user=req.session.user;
        var name=user.name;
        //     console.info('你好'+name+'，欢迎来到我的家园。');
        user.other = "this is ok";
        next();
    }else
    {
        console.info('你还没有登录，先登录下再试试！redirector home');
        res.redirect("/home");
        // next();
    }
}
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
	res.render("home");
});
router.post('/home', function(req, res, next) {
	if( req.body.username == '1'&& req.body.password == '1'){
		req.session.user = {
			"username" : req.body.username,
			"password" : req.body.password
		}
		res.redirect("/test/test");
	}else if( req.body.username == '2'&& req.body.password == '2'){
		req.session.user = {
			"username" : req.body.username,
			"password" : req.body.password
		}
		res.redirect("/test/test2");
	}else{
		res.redirect("/home");
	}
});


//
// router.get('/index',function(req,res){
// 	console.log(req.session.user);
// 	if( req.session.user != undefined){
// 		res.render("index");
// 	}else{
// 		res.redirect("/home");
// 	}
// });
//
// router.post('/index',function(req, res, next){
// 	console.log(req.query.username);
// 	console.log(req.body['username']);
// 	console.log(req.body.password);
//
// 	console.log("sss");
// 	// req.assert('username', "用户名不能为空").notEmpty();
// 	// req.assert('password', "密码不能为空").notEmpty();
//
// 	console.log("sss1");
// 	if( req.body.username == "love"&& req.body.password == "love"){
// 		req.session.user = {
// 			"username" : req.body.username,
// 			"password" : req.body.password
// 		}
//
// 		res.redirect("index");
// 	}else{
//
// 		res.redirect("home");
// 	}
//
//
// });


module.exports = router;


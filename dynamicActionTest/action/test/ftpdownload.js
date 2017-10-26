var express = require('express');
var path = require('path');
var fs = require('fs');
var Client = require('ftp');

// var ack = require(global.homePath + '/lib/respAck');
// var Client = require('ftp');

exports.action = function( req, res, next){
	// if (!req.session.user) {
	// 	res.redirect('/home');
	// } else if (req.session.user) 
	// 	res.render("index",{user:req.session.user.username});
	var c = new Client();

	var connectionProperties = {
	    host: "192.168.117.28",
	    user: "anonymous",
	    password: ""
	};

	c.on('ready', function () {
	    console.log('ready');
	    // c.list(function(err, list) {  
		   //  if (err) throw err;  
		   //  console.dir(list.length);  
		   //  c.end();  
	    // });  
	    c.get('pub/q1.txt',function(err,stream){
            if(err){
                console.log("error");
            }else{
                stream.once("close",function(){
                    c.end();
                });
                var writable = fs.createWriteStream(global.homePath + '/numberFile/q1.txt');
                stream.pipe(writable);
            }
            
        });
	});

	c.connect(connectionProperties);

}

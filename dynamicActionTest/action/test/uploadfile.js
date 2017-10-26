var express = require('express');
var path = require("path");
var fs = require('fs');
// var util = require('util');
var http = require('http');
// var myGetParams = require(global.homePath + '/lib/myGetParams');
// var clientUpload = require(global.homePath + '/lib/clientUpload');
// var ack = require(global.homePath + '/lib/respAck');



exports.action = function(req,res){

	var options = {
        host:'localhost',         //localhost',          //192.168.2.130',
        port:3001,                  //9078,                       //8100,
        method:'POST',
        path:'/upload'   //,                      //cincc-serv/media/upload',     ///vxmlSelfUpload?method=upload',       
  };
    
	var fileStruct = {
	  orgfile:"D://test.txt",
	  tage:"tupian",
	  
	  uploadPath:"data",
	  newFile:"app5.js"
	  
	}

	upload(options,fileStruct,res);

	console.info("this is end of " + __filename);

}


function upload(opts,uploadparam,resclient){
  var boundaryKey = Math.random().toString(16);
  var enddata = '\r\n----' + boundaryKey + '--';
 
  var content = "";

  if( uploadparam.uploadPath != null ){
    content += '\r\n----' + boundaryKey + '\r\n';
    content += 'Content-Type: application/octet-stream\r\n';
    content += 'Content-Disposition: form-data; name=' + 'uploadPath' + '\r\n\r\n' + uploadparam.uploadPath;
  }
  
  if( uploadparam.newFile != null ){
    content += '\r\n----' + boundaryKey + '\r\n';
    content += 'Content-Type: application/octet-stream\r\n';
    content += 'Content-Disposition: form-data; name=' + 'fileName' + '\r\n\r\n' + uploadparam.newFile;
  }     
          
    content += '\r\n----' + boundaryKey + '\r\n';
    content += 'Content-Type: application/octet-stream\r\n';
    content += 'Content-Disposition: form-data; name=\"' + uploadparam.tage + '\"; filename=\"' + uploadparam.orgfile + '\"\r\n';
    content += 'Content-Transfer-Encoding: binary\r\n\r\n';
     
  var contentBinary = new Buffer(content, 'utf-8');//当编码为ascii时，中文会乱码。

  var contentLength = contentBinary.length;
  var stat = fs.statSync(uploadparam.orgfile);
  contentLength += stat.size;
  
  var req = http.request(opts,function(res){
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('body: ' + chunk);
        });

        res.on('end',function(){
          resclient.end("success");
            console.log('res end.');
            req.end();
            
        });
      });

    req.on("error", function(e) {
          console.info(e);
    }); 
    

  req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
  req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));
       
  req.write(contentBinary);
   
  var fileStream = fs.createReadStream(uploadparam.orgfile,{bufferSize:1024 * 1024});
   
  fileStream.pipe(req,{end:false});
  fileStream.on('end',function(){
      req.end(enddata);
  });
     
}
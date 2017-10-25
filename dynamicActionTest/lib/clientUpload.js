var http = require('http');
var path = require('path');
var fs = require('fs');

exports.action = function upload(opts,uploadparam,clientres,callback){

    
    
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
    // var stat = fs.statSync(uploadparam.orgfile);
    contentLength += stat.size;
  
//     var req = http.request(opts,function(res){
//         res.setEncoding('utf8');
//         res.on('data', function (chunk) {
        	
//             console.log('body: ' + chunk);  
//             callback(clientres,chunk);
          
//         });

//         res.on('end',function(){
//             console.log('res end.'+__filename);
            
//             req.end();
//        //     callback(clientres,"end");
//         });
//     });

//   	req.on("error", function(e) {
//         console.info(e);
//         callback(clientres,e);
//     });
		
//     req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
//     req.setHeader('Content-Length', contentLength + Buffer.byteLength(enddata));
       
// 	req.write(contentBinary);
	 
//     var fileStream = fs.createReadStream(uploadparam.orgfile,{bufferSize:1024 * 1024});
   
//     fileStream.pipe(req,{end:false});
//     fileStream.on('end',function(){
//         req.end(enddata);
// //			callback(clientres,"ok");
// 	});	   
}

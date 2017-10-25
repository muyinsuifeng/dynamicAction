var express = require('express');

module.exports = function(req){

	var params;
	if( (req.method == "get") || (req.method == "GET") ){
			var params = req.query;
	}else
	{
			params = req.body;		
		
		 for( var p in req.query )
  			params[p] = req.query[p];		
	}
 	
	console.log('myGetParams.js params:');
	console.log(params);
	
	return params
}

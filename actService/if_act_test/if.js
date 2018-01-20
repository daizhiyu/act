var MEAP=require("meap");
var path = require('path');
var fs = require('fs');
var  crypto = require('crypto');
function run(Param, Robot, Request, Response, IF)
{




        var fg_params = {
            app_id:'2017071407749082',
            method:'alipay.finance.fund.fundprod.query',
            charset:'UTF-8',
            sign_type:'RSA',
            timestamp:'2017-11-30 15:01:52',
            version:'1.0',
            biz_content:JSON.stringify({
                "fund_code":100038
            })
        };
        var paramsUrl=getSort(fg_params);
       
    var verify = crypto.createSign('RSA-SHA1');
    verify.update(paramsUrl, 'utf8');
    
    var sign=verify.sign(fs.readFileSync(path.resolve(__dirname+'/pem/priviate.pem'), 'utf-8'), 'base64'); 
	var url='https://openapi.alipay.com/gateway.do?'+paramsUrl+'&sign='+encodeURIComponent(sign);
	
	var option={
		method : "GET",
		url : url,
		Cookie : "true",
		timeout : 60,
		agent : "false",
        FileRNLength : "false",
	};
	
	
    Response.setHeader("Content-type","application/json;charset=utf-8");
	MEAP.AJAX.Runner(option,function(err,res,data){
	    if(!err)
	    {
			//Add your normal handling code
            Response.end(data);
	    }
	    else
	    {
			//Add your exception handling code 
            Response.end(JSON.stringify({status:-1, message:"Error"})); 
	    }
	},Robot);
}


function getSort(params) {
    if (typeof params == "string") {
        return paramsStrSort(params);
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            arr.push((i + "=" + params[i]));
        }
        return paramsStrSort(arr.join(("&")));
    }
}
function paramsStrSort(paramsStr) {
    var urlStr = paramsStr.split("&").sort().join("&");
    return urlStr;
}


exports.Runner = run;


                                

	


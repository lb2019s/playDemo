'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const token_res = await uniCloud.httpclient.request("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ypj3tn79q8df6mBvjb1oph4g&client_secret=iq52GqGiQ9jzMcQIAvVx8fFrBZbGjXnd", {
		dataType: 'json'
	})
	// console.log(token_res.data)
	const access_token = token_res.data.access_token
	
	const classify = await uniCloud.httpclient.request("https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		dataType: 'json',
		data: {
			access_token,
			image: event.image
		}
	})
	
	// console.log(classify)
	
	//返回数据给客户端
	return classify.data.result
};

// 项目配置
$.global = {};
// ajax 基本参数配置
$.ajaxConfig = {
	url: '',
	type: 'POST',
	dataType: 'json',
	data: {},
};
// 判断开发环境
$.isLocalhost = function(){
	var flag, hostname = location.hostname;
	if (hostname.indexOf('localhost') != -1) {
		// 本地开发
		$.global.domain = "//www.lk.cn/";
		$.global.siteUrl = "//h.lk.cn/";
		// console.log("本地开发");
		flag = true;
	} else {
		// 判断全局变量是否存在
		if( typeof web_domain == 'undefined' ){
			web_domain = "/";
		}
		// 其他
		$.global.domain = web_domain;
		$.global.siteUrl = "/";
		// console.log("其他");
		flag = false;
	}
	return flag;
};

// 请求统一接口
$.ajaxConfig.reqDataApi = function (obj, callback) {
	$.ajax({
		url: obj.url,
		type: obj.type,
		dataType: obj.dataType,
		data: obj.data,
		cache: obj.cache,								//上传文件无需缓存
		processData: obj.processData,		//用于对data参数进行序列化处理 这里必须false
		contentType: obj.contentType, 	//必须
		success: function (res) {
			if (callback) {
				callback(res);
			}
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			//通常情况下textStatus和errorThrown只有其中一个包含信息
			// this;    //调用本次ajax请求时传递的options参数
			console.log(this);
			console.log(XMLHttpRequest);

		}
	});
};
// 配置不同接口地址
$.ajaxConfig.reqUrl = function(str) {
	var reqUrl;
	if ($.isLocalhost()) {
		// 本地开发
		reqUrl = '//h.lk.cn/' + str;
		// console.log("本地开发");
	} else {
		// 其他
		reqUrl = '/' + 'drugstore/tab:' + str;
		// console.log("其他");
	}
	return reqUrl;
};

//
$.fn.extend({
	// 正则验证 Reset illegal input
	resetInput : function (patt, n) {
		var v = this.val().replace(patt, "");
		this.val(v);
		return v;
	},
	// 正则验证输入价格
	onlyPrice: function () {
		var v = this.val();
		newV = v.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
			.replace(/^\./g, "") //验证第一个字符是数字
			.replace(/\.{2,}/g, ".") //只保留第一个, 清除多余的
			.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
			.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
		//
		if (!!newV && newV.indexOf(".") < 0) {
			newV = parseFloat(newV);
		}
		this.val(newV);
		return newV;
	},

	/**
	 * 上传文件事件
	 * @param {Object} obj 			Ajax 请求参数
	 * */
	fileOnChange: function (callback) {
		console.log(this);
		var formFile = new FormData();
		// formFile.append("action", "UploadVMKImagePath");
		formFile.append("file", this[0].files[0]); //加入文件对象
		console.log(formFile);
		callback(formFile);
		return this;
	},

});
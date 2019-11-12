// 项目配置
// ajax 基本参数配置
ajaxConfig = {
	url: '',
	type: 'POST',
	dataType: 'json',
	data: {},
};
// 请求统一接口
ajaxConfig.reqDataApi = function (obj, callback) {
	$.ajax({
		url: obj.url,
		type: obj.type,
		dataType: obj.dataType,
		data: obj.data,
		success: function (res) {
			if (callback) {
				callback(res);
			}
		}
	});
};
// 配置不同接口地址
ajaxConfig.reqUrl = function(str) {
	var reqUrl, hostname = location.hostname;
	if (hostname.indexOf('localhost') != -1) {
		// 本地开发
		reqUrl = '//h.lk.cn/' + str;
		console.log("本地开发");
	} else {
		// 其他
		reqUrl = '/' + 'drugstore/tab:' + str;
		console.log("其他");
	}
	return reqUrl;
};

// 触发入库弹出
function onPopCover(el) {
	// 弹出层
	$.popCover(el, {
		pBar: tpl.popbar,
		onshow: function() {
			protect: false,
				$(".close").click(function() {
					$.popCover.hide();
				})
		}
	});
}

// 触发下拉检索
function onSelect() {
	// 第一项默认是非空值时触发
	$(".select_1st").lkselect({
		selectsize: 5,
	});
	// 第一项默认是空值时触发，需要设置select高度设置mrheight
	$(".select_2nd").lkselect({
		selectsize: 5,
		mrheight:'30px',
	});
}

// 统一调用方法和赋值方法
function dataInit() {
	ajaxConfig.url = ajaxConfig.reqUrl("stock_input/act:edit");
	ajaxConfig.reqDataApi(ajaxConfig,function (res) {
		console.log(res);
		let code = res.res;
		if (code == 1) {
			// 渲染数据
			// _this.detailInfo = _this.formatDetailData(res.data);
		}
	});
}
// dataInit();

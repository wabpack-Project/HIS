/*
* 本地调用配置指定参数，非本地时注释
* 1. document_id 		接口参数 1.空和0 是添加  2.大于0是编辑
* 2.
* */
if (location.hostname.indexOf('localhost') != -1) {
	// 本地开发
	var document_id = "35";
	console.log("本地开发");
}

// 下拉检索调用
$.onSelect();

// 触发弹出入库
$("#add_drug").click(function () {
	// 获取弹出入库数据
	getStockInputData();
});

// 获取弹出入库数据
function getStockInputData() {
	// 请求URL
	$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:edit");
	// 请求参数
	$.ajaxConfig.data = {
		document_id: document_id,
	};
	// 请求数据
	$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
		if (res.res == 1) {
			// 模板替换
			var _html = miniTpl(tpl.stock_input, res);
			// 弹出入库
			$.onPopCover(_html);
		}
	});
}

// TODO: 替换数据

















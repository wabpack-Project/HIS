// 初始化绑定事件
$.onInit();
// web_domain = "http://www.lk.cn/";

/*
* 本地调用配置指定参数，非本地时注释
* 1. document_id 		接口参数 1.空和0 是添加  2.大于0是编辑
* 2.
* */
if ($.isLocalhost()){
	// 诊所id需要在页面赋值
	clinic_id = "16";
	// 主域名需要在页面赋值
	// web_domain = "http://www.lk.cn/";
	// 单据id
	$.global.document_id = "0";
	// 请求本地json文件参数
	// var isJson = true;

	// 默认触发添加入库事件
	$("#add_drug").click();
	// 默认触发修改入库事件
	// $(".edit_stock_input").click();
}



















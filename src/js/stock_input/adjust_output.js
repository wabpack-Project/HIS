// 初始化绑定事件
$.onInit();

/*
* 本地调用配置指定参数，非本地时注释
* 1. document_id 		接口参数 1.空和0 是添加  2.大于0是编辑
* 2.
* */
if ($.isLocalhost()){
	$.global.document_id = "100";
	// 默认触发添加入库事件
	// $("#add_drug").click();
	// 默认触发修改入库事件
	$(".edit_stock_input").click();
	// $("#drug_num").resetInput(/[^0][^0-9]/ig);
	// $("#drug_num").resetInput(/^[0]+[^0-9]/ig);

}
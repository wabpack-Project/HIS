// 初始化绑定事件
$.onInit();

/*
* 本地调用配置指定参数，非本地时注释
* 1. document_id 		接口参数 1.空和0 是添加  2.大于0是编辑
* 2.
* */
if ($.isLocalhost()){
	$.global.document_id = "46";
	// 默认触发添加入库事件
	// $("#add_drug").click();
	// 默认触发修改入库事件
	// $(".edit_stock_input").click();

	$.global.stock_statistics = {
		department: "1",
		drug_id: "0",
		type: "2",
		verify_date_start : "2019-08-13",
		verify_date_end : "2019-08-27",
	};

} else {
	$.global.stock_statistics = {
		department: department,
		drug_id: drug_id,
		type: type,
		verify_date_start : verify_date_start,
		verify_date_end : verify_date_end,
	};
}
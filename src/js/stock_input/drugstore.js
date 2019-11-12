$(function(){

	// 立即执行初始化方法
	(function init(){
		// 本地使用配置参数
		if ($.isLocalhost()){
			// 诊所id需要在页面赋值
			clinic_id = "16";
			gid = "216";
		};
		// 绑定添加药品事件
		$(".add_drug_store").on("click", function () {
			var _clinic_id = clinic_id ? clinic_id : $(this).attr("attr_clinic_id"),
				url = $.global.domain + "seller/drug/type:1/group_id:" + _clinic_id;
			obj = {
				width: window.screen.availWidth,
				height: window.screen.availHeight,
				top: $("body")[0].offsetTop,
			};
			myShowModalDialog(url, obj);
		});

		// 绑定添加药品事件
		$(".edit_drug_store").on("click", function () {
			// 配置gid、clinic_id、 URL
			var _gid = gid ? gid:$(this).attr("attr_gid"),
				_clinic_id = clinic_id ? clinic_id : $(this).attr("attr_clinic_id"),
				url = $.global.domain + "seller/drug/tab:baseinfo/gid:" + _gid + "/type:1/group_id:" + _clinic_id;
			// http://www.lk.cn/seller/drug/tab:baseinfo/gid:216/type:1/group_id:16
			obj = {
				width: window.screen.availWidth,
				height: window.screen.availHeight,
				top: $("body")[0].offsetTop,
			};
			myShowModalDialog(url, obj);
		});

	}());

});
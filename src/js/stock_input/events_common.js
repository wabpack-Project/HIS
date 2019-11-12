$.extend({
	/**
	 * 插件参数和触发
	 * */
	// 输入联想参数
	lkinputtipsOpt: {
		secondorder: {
			length: 2,
			chineseword: true
		},
		ajaxParameter: {
			time: 400,
		},
		listseach: {
			Maxwidth:"800px",
			Maxheight:"280px",
			clickClass:"auto_complates",
		}
	},

	/**
	 * DOM操作
	 * */
	// 按钮状态是修改
	editBtn: function() {
		$("#drugAdd").hide();
		$("#drugUpdate").show();
	},
	// 按钮状态是添加
	addBtn: function() {
		$("#drugAdd").show();
		$("#drugUpdate").hide();
	},

	/**
	 *	合法验证
	 * */
	// 添加药品事件
	addDrugCheck: function(flag){	// 传参数true，需要验证是否选择操作类型
		// 判断参数是否合法，合法返回false，不合法返回true
		// 初始值
		var supplier_name = $.global.data.supplier_name,
			drug_name = $("#drug_name").val(),
			product_date = $("#product_date").val(),
			valid_date = $("#valid_date").val(),
			batch_no = $("#batch_no").val();

		// 判断是否选择供应商
		if (!supplier_name || supplier_name===""){
			alert("选择供货商!");
			return true;
		}
		// 判断是否选择操作类型
		if (flag){
			// 判断是否选择操作类型
			$.global.data.type = $("#get_type_arr").val();		// 操作类型
			if (!$.global.data.type){
				alert("请选择操作类型!");
				return true;
			}
		}
		// 判断是否输入药品名称
		if (!drug_name){
			alert("请输入药品名称!");
			return true;
		}
		// 判断是否输入批号
		if (!batch_no){
			alert("请输入批号!");
			return true;
		}
		// 判断是否输入生产日期
		if (!product_date){
			alert("请输入生产日期!");
			return true;
		}
		// 判断是否输入有效期
		if (!valid_date){
			alert("请输入有效期!");
			return true;
		}
		return false;
	},
	// 添加药品验证
	addDrugCheck1: function(){
		// 判断参数是否合法，合法返回false，不合法返回true
		// 初始值
		var supplier_name = $.global.data.supplier_name,
			product_date = $("#product_date").val(),
			valid_date = $("#valid_date").val(),
			batch_no = $("#batch_no").val();

		// 判断是否选择供应商
		if (!supplier_name || supplier_name===""){
			alert("选择供货商!");
			return true;
		}
		// 判断是否输入批号
		if (!batch_no){
			alert("请输入批号!");
			return true;
		}
		// 判断是否输入生产日期
		if (!product_date){
			alert("请输入生产日期!");
			return true;
		}
		// 判断是否输入有效期
		if (!valid_date){
			alert("请输入有效期!");
			return true;
		}
		return false;
	},
	// 添加药品出库验证
	addDrugCheckOutput: function(){
		// 判断参数是否合法，合法返回false，不合法返回true
		// 初始值
		var drug_num = $("#drug_num").val(),
			drug_name = $("#drug_name").val();	//

		// 判断是否输入药品名称
		if (!drug_name){
			alert("请输入药品名称!");
			return true;
		}

		// 判断是否输入批号
		if (!drug_num){
			alert("请输入数量!");
			return true;
		}

		// 判断是否选择操作类型
		$.global.data.type = $("#get_type_arr").val();		// 操作类型
		$.global.data.type_name = $("#get_type_arr option:selected").text();		// 操作类型
		if (!$.global.data.type){
			alert("请选择操作类型!");
			return true;
		}

		// 判断添加药品是否重复
		var _drugDetail = $.global.data.detail;
		// console.log(0, _drugDetail);
		if (_drugDetail && (_drugDetail.length > 0) && $.distinctDrug(_drugDetail)){
			alert("不可以重复添加出库明细信息!");
			return true;
		}

		return false;
	},

	/**
	 *	数组操作
	 * */
	// 遍历药品是否重复
	distinctDrug: function(arr){
		var flag = false, curArr,
			i = arr.length;
		for (; i>0; i--){
			curArr = arr[i-1];
			// console.log(1, curArr);
			// console.log(1, $.global.newDrug);
			// console.log(i);
			if (curArr.input_id == $.global.newDrug.input_id){
				flag = true;
				break;
			}
		}
		return flag;
	},

});
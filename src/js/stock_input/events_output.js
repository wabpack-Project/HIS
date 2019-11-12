$.extend({
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
	// 输入联想成功方法
	inputTipAjaxBefore: function (val, obj, fn) {
		var data = {"word": val, "limit": 20};
		fn(data, val);
	},
	// 输入联想成功方法
	inputTipSuccess: function(data) {
		// console.log("联想药品", data);
		if (data.res && data.res == 1) {
			if (data.data){
				console.log(data.data);
				// $.global.drugList = data.data;
				// 渲染html模板，并插入到入库列表
				var drugList = miniTpl(tpl.drugData, data.data);
				return drugList;
			}
		} else {
			alert(data.msg);
			return;
		}
	},
	// 输入联想成功方法
	inputTipClickFn: function (input, tr) {
		// 获取选中项值
		$.getChildVal(tr);
		// 点击药品名称有焦点时清空
		$("#drug_name").click(function () {
			$(this).val("");
		});
		// 数量获取焦点
		$("#drug_num").val("").focus();

	},
	getChildVal: function(el) {
		// console.log(el);
		// 获取当前元素所有子元素
		var childEl = $(el).children();

		// 把选中的药品信息赋值到录入到对应的输入框(1.药品名称 	2.单位		3.验收单价	4.零售单价	5.数量 )
		$("#drug_name").val($(childEl[0]).text());	// 药品名称
		$("#batch_no").val($(childEl[2]).text());	// 批号
		$("#valid_date").val($(childEl[7]).text());	// 有效期
		$("#drug_unit").val($(childEl[4]).text());	// 单位
		$("#price_check").val($(childEl[5]).text());	// 成本单价
		// $("#price_check").val("15.99");	// 成本单价
		$("#price_sell").val("0");	// 成本金额初始值为0

		// 判断数据是否存在，不存在赋值{}
		if (!$.global.newDrug){
			$.global.newDrug = {};
		}
		// 存储需要的值(1. 规格、 2.生产厂商		3.药品id 4.入库类型 )
		$.global.newDrug.type_output = 3;	// 出库类型默认3
		$.global.newDrug.input_id = $(el).attr("attr_id");	// 入库明细id(药品检索id)
		$.global.newDrug.drug_id = $(el).attr("attr_drug_id");
		$.global.newDrug.drug_spec = $(childEl[1]).text();	// 规格
		$.global.newDrug.product_date = $(childEl[6]).text();	// 生产日期
		$.global.newDrug.drug_factory = $(childEl[8]).text();	// 生产日期
		$.global.newDrug.number_sur_buy = $(childEl[3]).text();				// 药品库存数量
		$.global.number_sur_buy = parseInt($.global.newDrug.number_sur_buy); 		// 新值储存当前库存
		// console.log("选中n", $.global.newDrug);
		// console.log("选中", $.global.data.detail);
		// console.log("选中", $.global.number_sur_buy);
	},

	// 添加药品事件
	drugAdd: function(){
		console.log("添加药品事件");

		// 获取新药品信息
		$.getNewDrug();
		// console.log($.global.newDrug);

		console.log("添加n", $.global.newDrug);
		console.log("添加", $.global.data.detail);

		// 判断验证是否通过
		if ($.addDrugCheckOutput()) return;		// 暂时注释

		console.log(11111);
		// 把新录入的药品信息添加到药品信息列表
		$.global.data.detail.push($.global.newDrug);
		$.global.newDrug = {};
		// console.log(1, $.global.data.detail);

		// 移除药品列表数据
		$("#drug_table .g_tbody").remove();
		// 渲染html模板，并插入到入库列表
		var drugInfo = miniTpl(tpl.drugInfo, $.global.data.detail);
		$("#drug_table").append(drugInfo);

		// 清空当前录入药品信息
		$.clearDrug();

	},
	// 添加药品验证
	addDrugCheck: function(){
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
		var drug_num = $("#drug_num").val();	//

		// 判断是否输入批号
		if (!drug_num){
			alert("请输入数量!");
			return true;
		}

		// 判断添加药品是否重复
		var _drugDetail = $.global.data.detail;
		console.log(0, _drugDetail);
		if (_drugDetail && (_drugDetail.length > 0) && $.distinctDrug(_drugDetail)){
			alert("不可以重复添加出库明细信息!");
			return true;
		}

		return false;
	},
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
	// 修改药品事件
	drugUpdate: function(el){
		console.log("修改药品事件");
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");

		// 获取新药品信息
		$.getNewDrug();

		// 更新药品列表信息
		$.global.data.detail[curNum] = $.global.newDrug;
		$.global.newDrug = {};
		console.log("修改n", $.global.newDrug);
		console.log("修改", $.global.data.detail);
		// $.global.newDrug
		// console.log($.global.data.detail.length);

		// 改变药品列表内相应的值
		$.updateDrug(curNum, $.global.data.detail[curNum]);

		// 改变录入药品信息按钮状态
		$.addBtn();
		// 清空当前录入药品信息
		$.clearDrug();
		// 启用药品名称输入
		$("#drug_name").removeAttr("disabled");

	},
	// 修改数据列表信息
	updateDrug: function(n, obj) {
		// 获取当前修改药品信息所在行
		var drug_td = $("#drug_"+n).children();
		// 替换所在行内容
		$(drug_td[0]).text(obj.drug_name||"");
		$(drug_td[1]).text(obj.drug_spec||"");
		$(drug_td[2]).text(obj.batch_no||"");
		$(drug_td[3]).text(obj.product_date||"");
		$(drug_td[4]).text(obj.valid_date||"");
		$(drug_td[5]).text(obj.number||"");
		$(drug_td[6]).text(obj.drug_unit||"");
		$(drug_td[7]).text(obj.price_check||"");
		$(drug_td[8]).text(obj.price_sell||"");
		$(drug_td[9]).text(obj.drug_factory||"");
	},
	// 获取新录入药品信息
	getNewDrug: function() {
		// 新增药品信息，需要修改。生产厂商和规格没有。在选药时添加
		// 判断数据是否存在，不存在赋值{}
		if (!$.global.newDrug){
			$.global.newDrug = {};
		}
		// 赋值
		$.global.newDrug.drug_name = $("#drug_name").val(),
		$.global.newDrug.batch_no = $("#batch_no").val(),
		// $.global.newDrug.product_date = $("#product_date").val(),
		$.global.newDrug.valid_date = $("#valid_date").val(),
		$.global.newDrug.number = $("#drug_num").val(),
		$.global.newDrug.drug_unit = $("#drug_unit").val(),
		$.global.newDrug.price_check = $("#price_check").val(),
		$.global.newDrug.price_sell = $("#price_sell").val();
		console.log("n", $.global.newDrug);
	},
	// 设置当前录入的药品信息
	setCurDrug: function(obj) {
		// 赋值
		$("#drug_name").val(obj.drug_name),
		$("#batch_no").val(obj.batch_no),
		$("#product_date").val(obj.product_date),
		$("#valid_date").val(obj.valid_date),
		$("#drug_num").val(obj.number),
		$("#drug_unit").val(obj.drug_unit),
		$("#price_check").val(obj.price_check),
		$("#price_sell").val(obj.price_total);
	},
	// 清空当前录入药品信息
	clearDrug: function() {
		// 赋值
		$("#drug_name").val(""),
		$("#batch_no").val(""),
		$("#product_date").val(""),
		$("#valid_date").val(""),
		$("#drug_num").val(""),
		$("#drug_unit").val(""),
		$("#price_check").val(""),
		$("#price_sell").val("");
	},
	// 修改当前药品
	editDrug : function (el, n) {		// n数组循环编号
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");
		// console.log(0, $.global.data.detail[n]);

		// 判断是出库状态不能删除
		if ($.global.data.status_name === "出库") {
			alert("已出库完成的药品不能进行编辑!");
			return;
		}

		// 把当前药品信息存到$.global.newDrug
		$.global.newDrug = $.global.data.detail[n];
		// console.log(1, $.global.newDrug);
		// 设置当前修改的药品信息
		$.setCurDrug($.global.data.detail[n]);

		// 判断编辑是不是已登记或已出库
		if ($.global.newDrug.id){
			// 新值储存当前库存
			$.global.number_sur_buy = parseInt($.global.newDrug.number_sur_buy) + parseInt($.global.newDrug.number);
		} else {
			// 新值储存当前库存
			$.global.number_sur_buy = parseInt($.global.newDrug.number_sur_buy);
		}

		// 改变录入药品信息按钮状态
		$.editBtn();

		// 禁用药品名称输入
		$("#drug_name").attr("disabled", "disabled");
		// $("#drug_unit").attr("disabled", "disabled");
		// $("#price_sell").attr("disabled", "disabled");

		// 传递当前药品ID
		$("#drugUpdate").attr("attr_num", n);
	},
	// 删除当前药品
	delDrug : function (el, n) {
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curDrug = "#drug_" + _id;
			curNum = $(el).attr("attr_num");

		// 判断是入库状态不能删除
		if ($.global.data.status_name === "出库") {
			alert("已出库完成的药品不能删除!");
			return;
		}

		// 删除当前药品信息，让用户进行确认
		var delTip = confirm("确定要删除药品明细？");
		// 用户取消操作跳出执行
		if (!delTip) return;

		// 判断是入库状态不能删除
		if ($.global.data.status_name === "登记") {
			// 删除录入药品数据
			$.delStockInputData($.global.data.detail[n].id);
		} else {
			// 状态是全部
			// 删除数据
			$.delDrugData(n);
		}
	},
	delDrugData: function(n){
		// 从全局数据中删除当前数据
		$.global.data.detail.splice(n, 1);

		// 移除药品列表数据
		$("#drug_table .g_tbody").remove();
		// 渲染html模板，并插入到入库列表
		var drugInfo = miniTpl(tpl.drugInfo, $.global.data.detail);
		$("#drug_table").append(drugInfo);

	},
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
	// 清空所有信息操作
	clearStockInput: function() {
		// console.log("清空所有信息操作!");
		// 改变当前操作状态
		$.global.save_type = 1;
		// 改变入库弹出标题
		$(".pop_drug_tit").text("新建耗损出库");
		// 清空弹出所有输入框值
		$("#pop-cont input[type=text]").val("");
		// 清空列表内容对应的数据
		$.global.data = {};
		$.global.data.detail = [];

		// 重置供应商值操作
		$.resetSupplier();

		// 重置单据状态值操作
		$.resetIsVerify();

		// 重置操作按钮
		$.resetInputOpt();

		// 移除药品列表数据
		$("#drug_table .g_tbody").remove();
		// 没有数据赋值
		$("#drug_table").append(tpl.noDrugInfo);

	},
	// 重置操作按钮
	resetInputOpt: function(){
		// 获取操作按钮元素
		var $saveStockInput = $("#save_stock_input"),	// 保存
			$auditStockInput = $("#audit_stock_input"),	// 审核
			$printStockInput = $("#print_stock_input"),	// 打印
			$drugAdd				 = $("#drugAdd");						// 添加

		// 启用保存按钮
		$saveStockInput.removeAttr("disabled");
		// 禁用审核按钮
		$auditStockInput.attr("disabled", "disabled");
		// 禁用打印按钮
		$printStockInput.attr("disabled", "disabled");
		// 启用添加按钮
		$drugAdd.removeAttr("disabled");
	},
	// 重置单据状态值操作
	resetIsVerify: function(){
		// 设置单据状态为全部
		$("#get_is_verify_arr").children(":first").attr("selected",true).siblings().attr("selected",false);
	},
	// 重置供应商值操作
	resetSupplier: function(){
		// 设置供应商值为空
		$("#get_supplier").val("");
		// 改变供应商全局变量值为空
		$.global.data.supplier_name = "";
		// 判断是否触发下拉检索插件还是更新插件数据
		if (!$("#get_supplier").attr("data-id")){
			// 触发下拉检索
			$.onSelectN();
		} else {
			$("#get_supplier").lkselectupload();
		}
	},

	// 触发入库弹出
	onPopCover: function(el) {
		// 弹出层
		$.popCover(el, {
			pBar: tpl.popbar,
			protect: false,
			onshow: function() {
				protect: true,
				// 绑定弹出关闭事件
				$(".close").click(function() {
					$.popCover.hide();
					// 关闭时刷新页面
					location.reload();
				});
				// 根据单据状态进行相应操作
				// $.setBtnOpt();
				// 根据单据状态,入库弹出对应操作
				$.stockInputOpt();

				// 设置输入联想参数和方法
				// $.lkinputtipsOpt.ajaxParameter.url = "http://h.lk.cn/stock_output/act:get_auto_input";
				$.lkinputtipsOpt.ajaxParameter.url = $.ajaxConfig.reqUrl("stock_output/act:get_auto_input");
				$.lkinputtipsOpt.ajaxParameter.ajaxBefore = $.inputTipAjaxBefore;
				$.lkinputtipsOpt.ajaxParameter.success = $.inputTipSuccess;
				$.lkinputtipsOpt.listseach.clickfn = $.inputTipClickFn;

				// 绑定输入联想事件
				$("#drug_name").lkinputtips($.lkinputtipsOpt);

				// 禁用药品名称输入
				$("#batch_no").attr("disabled", "disabled");	// 批号
				$("#valid_date").attr("disabled", "disabled").attr("class", "form_text"); // 有效期
				$("#price_check").attr("disabled", "disabled");	// 成本单价
				$("#price_sell").attr("disabled", "disabled");	// 成本金额
				$("#drug_unit").attr("disabled", "disabled");	// 单位

			}
		});
	},

	// 入库弹出对应操作
	stockInputOpt: function() {
		// 获取操作按钮元素
		var $saveStockInput = $("#save_stock_input"),	// 保存
			$auditStockInput = $("#audit_stock_input"),	// 审核
			$clearStockInput = $("#clear_stock_input"),	// 清空
			$printStockInput = $("#print_stock_input"),	// 打印
			$drug_name = $("#drug_name");	// 药品名称

		// 根据单据状态,对按钮进行相应操作
		if ($.global.data.status_name === "出库") {
			// 禁用保存按钮
			$saveStockInput.attr("disabled", "disabled");
			// 禁用审核按钮
			$auditStockInput.attr("disabled", "disabled");
			// 禁用添加按钮
			$("#drugAdd").attr("disabled", "disabled");
			// 移除操作按钮点击事件
			// $(".drug_opt a").removeAttr("onclick");
			// 启用打印按钮
			$printStockInput.removeAttr("disabled");
			// 绑定打印参数
			var targetUrl = "/drugstore/tab:stock_input/act:print/document_id:"+$.global.document_id;	// 跳转URL
			// $printStockInput.attr("href", targetUrl);
			// $printStockInput.attr("target", "_blank");
		} else if ($.global.data.status_name === "登记"){
			// 设置select值
			// $("#get_supplier").children(":first").text($.global.data.supplier_name);
			// 绑定保存事件
			// $saveStockInput.click($.saveStockInputData);
		} else {
			// 改变入库弹出标题
			$(".pop_drug_tit").text("新建耗损出库");
			// 改变供应商状态
			$("#get_supplier").removeAttr("disabled");
			// 触发下拉检索
			$.onSelectN();
			// 禁用审核按钮
			$auditStockInput.attr("disabled", "disabled");

			// 绑定保存事件
			// $saveStockInput.click($.saveStockInputData);
		}

		// 绑定保存事件
		$saveStockInput.click($.saveStockInputData);
		// 绑定审核事件
		$auditStockInput.click($.auditStockInputData);

		// 绑定打印事件
		$printStockInput.click(function () {
			console.log("打印！");
			window.open(targetUrl);
		});
		// 清空操作
		$clearStockInput.click($.clearStockInput);

		// 输入药品数量计算成本金额
		$("#drug_num").on('input propertychange', function () {
			// 获取成本单价和数量
			var price_check = parseFloat($("#price_check").val()||0),
					count = parseInt($(this).val()||0);

			// 判断输入数量是否超出库存数
			if (count > $.global.number_sur_buy){
				// 提示信息拼接
				var _tip = "出库数量不能大于库存数量" + $.global.number_sur_buy + "("+ $("#drug_unit").val() +")";
				// 弹出提示信息
				alert(_tip);
				// 清空输入框值
				$(this).val("");
				// 跳出运行
				return;
			}
			// 计算成本金额（价格*数量）
			price_sell = (price_check*count).toFixed(2);
			// .toFixed(2) 处理保留两位小数和乘法出现多个0问题
			$("#price_sell").val(price_sell);
		});

	},
	// 根据单据状态,对按钮进行相应操作
	setBtnOpt: function(){
		// 判断是入库弹出是编辑
		if ($.global.save_type === 1){
			// 改变供应商状态
			$("#get_supplier").removeAttr("disabled");
			// 触发下拉检索
			$.onSelectN();
		}
	},

	// 触发下拉检索
	onSelect: function() {
		// console.log("onSelect!");
		// 第一项默认是非空值时触发
		$(".select_1st").lkselect({
			selectsize: 5,
		});
		// 第一项默认是空值时触发，需要设置select高度设置mrheight
		$(".select_2nd").lkselect({
			selectsize: 5,
			mrheight:'30px',
		});
	},
	// 触发新增下拉检索
	onSelectN: function() {
		// console.log("onSelectN!");
		// 第一项默认是非空值时触发
		// $(".select_3rd").lkselect({
		// 	selectsize: 5,
		// 	clickfn: function (el, aa) {
		// 		console.log(el);
		// 		console.log(aa);
		// 	}
		// });
		// 第一项默认是空值时触发，需要设置select高度设置mrheight
		$(".select_4th").lkselect({
			selectsize: 5,
			mrheight:'30px',
			clickfn: function (el, curEl) {
				$.global.data.supplier_id = $(curEl).attr("data-val");
				$.global.data.supplier_name = $(curEl).text();
				// console.log($.global.data.supplier_id);
			}
		});
	},
	// 禁用Select下拉框
	disableSelect: function(el, v, id) {
		var el_id = el.attr("id");
		// 屏蔽select插件
		el.lkdelselect();
		// 改变供应商状态
		$("#"+el_id).attr("disabled", "disabled");
		// 设置select值
		$("#"+el_id).children(":first").text(v);
		// 设置select的id
		$("#"+el_id).children(":first").attr("attr_id", id);
	},
	// 改变单据状态的select值
	setSelectVal: function(v){
		$("#is_verify_arr").children(":first").text(v);
	},

	// 获取弹出入库数据
	getStockInputData : function (flag) {
		// $.global.document_id = document_id;
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_output/act:edit");
		// 请求参数
		$.ajaxConfig.data = {
			document_id: $.global.document_id,
		};
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			if (res.res && res.res == 1) {
				// console.log(res);
				console.log(res.data);
				// 缓存数据
				$.global.data = res.data;
				// 判断药品列表为空
				if (!$.global.data.detail){
					// 设置药品列表默认值
					$.global.data.detail = [];
				}

				// $.global.data.status_name = "入库";
				// 判断返回数据是否为空，为空赋值{}
				// if (res.data && res.data.length){
				// 	$.global.data = res.data;
				// } else {
				// 	$.global.data = {};
				// }
				// 判断是否弹出入库,flag为true跳出
				if (flag){
					// console.log(111);
					var statusId = parseInt(res.data.status);
					// 设置单据状态为验收或者入库
					$("#get_is_verify_arr").children().eq(statusId).attr("selected",true).siblings().attr("selected",false);

					// 移除药品列表数据
					$("#drug_table .g_tbody").remove();

					// 判断药品录入列表是否有数据
					if ($.global.data.detail && $.global.data.detail.length>0){
						// 设置单据号
						$("#set_document_no").val(res.data.document_no);
						// 有数据，渲染html模板，并插入到入库列表
						var drugInfo = miniTpl(tpl.drugInfo, $.global.data.detail);
						// drugInfo没做for循环
						// $("#drug_table").append(drugInfo);
					} else {
						// 无数据，渲染html模板，并插入到入库列表
						var drugInfo = tpl.noDrugInfo;
						// $("#drug_table").append(tpl.noDrugInfo);
						// 设置save_type
						$.global.save_type = 1;
						// 更新供应商信息
						$.global.data.supplier_id = $("#get_supplier").children(":first").attr("attr_id");
						$.global.data.supplier_name = $("#get_supplier").children(":first").text();

						// 清空单据号值
						$("#set_document_no").val("");
					}
					$("#drug_table").append(drugInfo);
					return;
				}

				// 模板替换
				var _html = miniTpl(tpl.stock_output, res);
				// console.log(_html);
				// 弹出入库
				$.onPopCover(_html);

			}
		});
	},
	// 保存弹出入库数据
	saveStockInputData : function () {
		// console.log("保存弹出入库数据!");
		// 参数获取、按钮状态、无数据去掉
		// $.global.data.detail = "";
		var _this = this;
		// 获取入库基本信息
		$.global.data.remark = $(".input_remark").val();		// 备注
		// 判断是添加操作赋值
		if ($.global.save_type == 1){
			$.global.data.document_id = $("#get_is_verify_arr").val();	// 单据表id
			$.global.data.department = $("#get_department").val();	// 科室id
		}

		// 更新操作状态
		$.global.data.save_type = $.global.save_type;
		// console.log($.global.data);
		// 判断药品列表是否有数据
		if ($.global.data.detail && $.global.data.detail.length < 1){
			alert("请添加验收入库明细信息!");
			return;
		}

		// 禁用保存按钮
		$(this).attr("disabled", "disabled");

		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_output/act:save");
		// http://h.lk.cn/drugstore/tab:stock_output/act:save
		// 请求参数
		$.ajaxConfig.data = {
			data: $.global.data
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				alert(res.msg);
				// 返回document_id赋值
				$.global.document_id = res.document_id;
				// 改变保存状态为登记
				$.global.save_type = 2;

				// 启用保存按钮
				$("#save_stock_input").removeAttr("disabled");
				// 启用审核按钮
				$("#audit_stock_input").removeAttr("disabled");

				// 获取弹出入库数据(保存之后document_id同步问题)
				$.getStockInputData(true);
				// 刷新页面
				// location.reload();
			} else {
				alert(res.msg);
			}
		});
	},
	// 审核弹出入库数据
	auditStockInputData : function () {
		// console.log("审核弹出入库数据!");
		var _this = this;
		// 更新操作状态
		$.global.data.save_type = $.global.save_type;
		// console.log($.global.data);

		// 禁用审核按钮
		$(this).attr("disabled", "disabled");

		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_output/act:audit");
		// http://h.lk.cn/drugstore/tab:stock_output/act:audit
		// 请求参数
		$.ajaxConfig.data = {
			document_id: $.global.document_id
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				alert(res.msg);
				// 返回document_id赋值
				$.global.document_id = res.document_id;

				// 禁用保存按钮
				$("#save_stock_input").attr("disabled", "disabled");
				// 启用打印按钮
				$("#print_stock_input").removeAttr("disabled");

				// 获取弹出入库数据(保存之后document_id同步问题)
				$.getStockInputData(true);

				// 刷新页面
				// location.reload();
			} else {
				alert(res.msg);
			}
		});
	},
	// 删除录入药品数据
	delStockInputData : function (id) {
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_output/act:del_output");
		// http://h.lk.cn/drugstore/tab:stock_output/act:del_output
		// 请求参数
		$.ajaxConfig.data = {
			id: id
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				alert(res.msg);
				// 返回document_id赋值
				$.global.document_id = res.document_id;

				// 获取弹出入库数据
				$.getStockInputData(true);
				// return;
			} else {
				alert(res.msg);
			}
		});
	},
	// 删除入库单据数据
	delStockInputList : function (id, statusId) {
		// 判断是入库状态不能删除
		if (statusId === "2") {
			alert("已出库的单据不可以进行删除!");
			return;
		}
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_output/act:del_document");
		// http://h.lk.cn/drugstore/tab:stock_output/act:del_document
		// 请求参数
		$.ajaxConfig.data = {
			document_id: id
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				console.log(res.msg);
				alert(res.msg);
				// 关闭时刷新页面
				// location.reload();
			} else {
				alert(res.msg);
			}
		});
	},

	// 初始化绑定事件
	onInit: function(){

		// 测试使用
		// 设置save_type
		// $.global.save_type = 2;
		// 获取弹出入库数据
		// $.getStockInputData();

		// 下拉检索调用
		// $.onSelect();
		// 新建触发弹出入库
		$("#add_drug").click(function () {
			// 设置save_type
			$.global.save_type = 1;
			$.global.document_id = "0";
			// 获取弹出入库数据
			$.getStockInputData();
		});

		// 修改触发弹出入库
		$(".edit_stock_input").click(function () {
			// 获取要修改的单据id
			var document_id = $(this).attr("attr_id");
			console.log(document_id);
			$.global.document_id = document_id||$.global.document_id;
			// 设置save_type
			$.global.save_type = 2;
			// 获取弹出入库数据
			$.getStockInputData();
		});

	},

	// 统一调用方法和赋值方法
	dataInit: function () {
		ajaxConfig.url = ajaxConfig.reqUrl("stock_input/act:edit");
		ajaxConfig.reqDataApi(ajaxConfig,function (res) {
			console.log(res);
			let code = res.res;
			if (code == 1) {
				// 渲染数据
				// _this.detailInfo = _this.formatDetailData(res.data);
			}
		});
	},
	// 测试调用
	test: function () {
		console.log("这是测试方法！");
	},

	// 小数乘法，


});
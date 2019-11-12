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
			Maxwidth:"600px",
			Maxheight:"440px",
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
		// console.log("newDrug", $.global.newDrug);
		// 重新检索清空新建药品数据
		$.global.newDrug = {};
		// 重新检索清空新建药品输入框值
		if (!$.global.drug_name) {
			$.clearDrugInfo();
		}
		// 判断数据是否存在
		if (data.res && data.res == 1) {
			if (data.data){
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
		// 药品名称有焦点时清空
		// $("#drug_name").attr("onfocus", $.getChildVal());
		$("#drug_name").click(function () {
			// console.log($.global.drug_name);
			// $.global.drug_name = $(this).val();
			$(this).val("");
		});
		// 选中药品后，上次有效期赋值
		$("#valid_date").val($.global.valid_date);
		// 禁用药品名称输入
		// $("#drug_name").attr("disabled", "disabled");
		// $("#drug_unit").attr("disabled", "disabled");
		// $("#price_sell").attr("disabled", "disabled");
	},
	getChildVal: function(el) {
		// console.log(el);
		// 获取当前元素所有子元素
		var childEl = $(el).children();

		// 把选中的药品信息赋值到录入到对应的输入框(1.药品名称 	2.单位		3.验收单价	4.零售单价	5.数量 )
		$("#drug_name").val($(childEl[0]).text());
		$("#drug_num").val("1");
		$("#drug_unit").val($(childEl[3]).text());
		$("#price_check").val($(childEl[4]).text());
		$("#price_sell").val($(childEl[5]).text());

		// 判断数据是否存在，不存在赋值{}
		if (!$.global.newDrug){
			$.global.newDrug = {};
		}
		// 存储需要的值(1. 规格、 2.生产厂商		3.药品id 4.入库类型 )
		$.global.newDrug.type_input = 1;
		$.global.newDrug.drug_id = $(el).attr("attr_id");
		$.global.newDrug.drug_spec = $(childEl[1]).text();
		$.global.newDrug.drug_factory = $(childEl[6]).text();
		$.global.drug_name = $(childEl[0]).text();
	},

	// 添加药品事件
	drugAdd: function(){
		console.log("添加药品事件");

		// 获取供应商信息
		var $get_supplier = $("#get_supplier"),
			supplier_id = $.global.data.supplier_id = $get_supplier.find("option:selected").attr("attr_id"),
			supplier_name = $.global.data.supplier_name = $get_supplier.find("option:selected").text();

		// 获取新药品信息
		$.getNewDrug();
		// console.log($.global.newDrug);

		// 判断验证是否通过
		if ($.addDrugCheck()) return;		// 暂时注释

		// 判断Select是否为禁用状态
		// var $get_supplier = $("#get_supplier");
		if ($get_supplier.attr("disabled") != "disabled"){
			// 禁用供应商下拉
			$.disableSelect($get_supplier, $.global.data.supplier_name, $.global.data.supplier_id);
		}

		// 把新录入的药品信息添加到药品信息列表
		$.global.data.detail.push($.global.newDrug);
		// 备份新增数据
		$.global.dataBak = [];
		$.global.dataBak.push($.global.newDrug);

		// 清空临时数据
		$.global.newDrug = {};
		$.global.supplier_id = 0;
		$.global.supplier_name = "";

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
				drug_name = $("#drug_name").val(),
				product_date = $("#product_date").val(),
				valid_date = $("#valid_date").val(),
				batch_no = $("#batch_no").val();

		// 判断是否选择供应商
		if (!supplier_name || supplier_name===""){
			alert("选择供货商!");
			return true;
		}
		// 判断是否输入药品名称
		if (!drug_name){
			alert("请输入药品名称!");
			return true;
		}
		// 判断是否从药品列表选择药品
		if (!$.global.newDrug.drug_id){
			alert("请选择一个药品（您的药品名称，需要从弹出列表里选择）!");
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
		console.log($.global.data.detail.length);

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
		$.global.newDrug.product_date = $("#product_date").val(),
		$.global.newDrug.valid_date = $("#valid_date").val(),
		$.global.newDrug.number = $("#drug_num").val(),
		$.global.newDrug.drug_unit = $("#drug_unit").val(),
		$.global.newDrug.price_check = $("#price_check").val(),
		$.global.newDrug.price_sell = $("#price_sell").val();
		// 保存有效期值
		$.global.valid_date = $("#valid_date").val();
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
		$("#price_sell").val(obj.price_sell);
	},
	// 清空当前录入药品信息
	clearDrug: function(flag) {
		// 赋值,flag为真不清空药品名称，输入联想时用到
		if (!flag) $("#drug_name").val("");
		$("#batch_no").val(""),
		$("#product_date").val(""),
		$("#valid_date").val(""),
		$("#drug_num").val(""),
		$("#drug_unit").val(""),
		$("#price_check").val(""),
		$("#price_sell").val("");
	},
	// 清空非用户输入信息
	clearDrugInfo : function() {
		// 赋值,flag为真不清空药品名称，输入联想时用到
		// if (!flag) $("#drug_name").val("");
			$("#drug_unit").val(""),
			$("#price_sell").val("");
	},
	// 修改当前药品
	editDrug : function (el, n) {		// n数组循环编号
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");
		console.log(0, $.global.data.detail[n]);

		// 判断是入库状态不能删除
		if ($.global.data.status_name === "入库") {
			alert("已入库的验收明细不可以进行编辑!");
			return;
		}

		// 把当前药品信息存到$.global.newDrug
		$.global.newDrug = $.global.data.detail[n];
		console.log(1, $.global.newDrug);
		// 设置当前修改的药品信息
		$.setCurDrug($.global.data.detail[n]);

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
		if ($.global.data.status_name === "入库") {
			alert("已入库的验收明细不可以删除!");
			return;
		}

		// 删除当前药品信息，让用户进行确认
		var delTip = confirm("确定要删除验收明细？");
		// 用户取消操作跳出执行
		if (!delTip) return;

		// 判断是入库状态不能删除
		if ($.global.data.status_name === "验收") {
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
		$(".pop_drug_tit").text("新建验收入库");
		// 清空弹出所有输入框值
		$("#pop-cont input[type=text]").val("");
		// 清空列表内容对应的数据
		$.global.data = {};
		$.global.data.detail = [];
		// 重置临时值
		$.global.dataBak = [];
		$.global.supplier_id = 0;
		$.global.supplier_name = "";

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
		$getSupplier = $("#get_supplier");
		// // 设置供应商值为空
		// $("#get_supplier").val("");
		// 改变供应商全局变量值为空
		$.global.data.supplier_id = 0;
		$.global.data.supplier_name = "";
		// 设置select值
		$getSupplier.children(":first").text($.global.data.supplier_name);
		// 设置select的id
		$getSupplier.children(":first").attr("attr_id", $.global.data.supplier_id);
		// 判断是否触发下拉检索插件还是更新插件数据
		if ($getSupplier[0].hasAttribute("disabled")){
			// 触发下拉检索
			$.onSelectN();
			$getSupplier.removeAttr("disabled");
		} else {
			$getSupplier.lkselectupload();
		}
	},

	// 入库弹出成功事件
	onPopCoverShow: function() {
		protect: false,
			// 绑定弹出关闭事件
			$(".close").click(function() {
				$.popCover.hide();
				if (!$.isLocalhost()){
					// 关闭时刷新页面
					location.reload();
				}
			});
		// 根据单据状态进行相应操作
		// $.setBtnOpt();
		// 根据单据状态,入库弹出对应操作
		$.stockInputOpt();

		// 设置输入联想参数和方法
		$.lkinputtipsOpt.ajaxParameter.url = $.global.siteUrl + "ajax_auto_goods";
		// http://h.lk.cn/ajax_auto_goods
		$.lkinputtipsOpt.ajaxParameter.ajaxBefore = $.inputTipAjaxBefore;
		$.lkinputtipsOpt.ajaxParameter.success = $.inputTipSuccess;
		$.lkinputtipsOpt.listseach.clickfn = $.inputTipClickFn;

		// 绑定输入联想事件
		$("#drug_name").lkinputtips($.lkinputtipsOpt);
	},

	// 触发入库弹出
	onPopCover: function(el) {
		// 弹出层
		$.popCover(el, {
			pBar: tpl.popbar,
			protect: false,
			onshow: $.onPopCoverShow
		});
	},

	// 入库弹出对应操作
	stockInputOpt: function() {
		// 获取操作按钮元素
		var $saveStockInput = $("#save_stock_input"),	// 保存
			$auditStockInput = $("#audit_stock_input"),	// 审核
			$clearStockInput = $("#clear_stock_input"),	// 清空
			$printStockInput = $("#print_stock_input"),	// 打印
			$newStockInput = $("#new_stock_input"),			// 新建药品
			$batchStorage = $("#batch_storage"),	// 批量入库
			$fileUpload = $("#file_upload"),	// 文件上传
			$drug_num = $("#drug_num"),							// 数量
			$price_check = $("#price_check"),							// 验收单价
			$drug_name = $("#drug_name");	// 药品名称

		// 根据单据状态,对按钮进行相应操作
		if ($.global.data.status_name === "入库") {
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
			// 禁用批量入库事件
			$batchStorage.attr("disabled", "disabled");
			// 绑定打印参数
			$.global.targetUrl = "/drugstore/tab:stock_input/act:print/document_id:"+$.global.document_id;	// 跳转URL
			// $printStockInput.attr("href", targetUrl);
			// $printStockInput.attr("target", "_blank");
		} else if ($.global.data.status_name === "验收"){
			// 设置select值
			// $("#get_supplier").children(":first").text($.global.data.supplier_name);
			// 绑定保存事件
			// $saveStockInput.click($.saveStockInputData);
		} else {
			// 改变入库弹出标题
			$(".pop_drug_tit").text("新建验收入库");
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
			// 配置打印的标题文字,可以根据操作类型赋值
			$.global.data.tit = "";
			// $.global.data.sum_price = "18.88";
			// 判断是否有打印信息，提示并退出
			if ($.global.data.detail.length<1) {
				alert("当前没有可打印的数据!");
				return;
			}
			// 跳转到打印URL再打印
			// $.printTargetOpt(targetUrl);
			// 当前页面直接打印
			$.printOpt(tpl.stock_input_prt, $.global.data);
		});
		// 清空操作
		$clearStockInput.click($.clearStockInput);
		// 新建药品操作
		$newStockInput.click(function () {
			// 新建药品URL
			var obj = {}, drugUrl = $.global.domain + "seller/drug/type:1/group_id:" + clinic_id,
				$body = $("body");
			obj = {
				width: window.screen.availWidth,
				height: window.screen.availHeight,
				top: $body[0].offsetTop,
			};
			// 跳转到新建药品
			// $.printTargetOpt(drugUrl);
			$.myShowModalDialog(drugUrl, obj);
		});
		// 批量上传操作
		$batchStorage.click(function () {
			$fileUpload.click();
		});
		$fileUpload.change(function () {
			var _this = this;
			$(this).fileOnChange(function (data) {
				$.uploadFileReaderData(data, _this);
			});
		});
		// 验收单价输入验证
		$price_check.on("input propertychange", function () {
			$(this).onlyPrice();
		});
		// 输入数量先验证新增药品数据是否存在
		$drug_num.on("input propertychange", function () {
			if (!$.global.newDrug || !$.global.newDrug.drug_id){
				alert("请选择一个药品（您的药品名称，需要从弹出列表里选择）!");
				$(this).val("");
			}
		});
		// 判断药品名称失去焦点时，没输入内容把之前内容添加进去
		$drug_name.on("blur", function () {
			// console.log($.global.drug_name);
			if (!$(this).val()) {
				$(this).val($.global.drug_name);
			} else {
				// $.global.drug_name = "";
			}
		});

		// 设置新建药品地址
		// $("#new_stock_input").attr("href", "http://www.lk.cn/seller/drug/type:1/group_id:16");
		// $("#new_stock_input").popCover();
		// pop-operate
		// $("#pop-operate").append('<a id="test8" href="https://blog.csdn.net/q394503873/article/details/80618195">点击我-加载HTML静态页</a>');
		// $("#test8").popCover();

		// 禁用操作
		$.initDisableOpt();

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
			selectsize: 10,
			hideAttr:['attr_py_code', 'attr_py_code_lower'],
		});
		// 第一项默认是空值时触发，需要设置select高度设置mrheight
		$(".select_2nd").lkselect({
			selectsize: 5,
			mrheight:'32px',
			hideAttr:['attr_py_code', 'attr_py_code_lower'],
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
			hideAttr:['attr_py_code', 'attr_py_code_lower'],
			clickfn: function (el, curEl) {
				$.global.data.supplier_id = $(curEl).attr("data-val");
				$.global.data.supplier_name = $(curEl).attr("title");
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

	// html渲染完成禁用操作
	initDisableOpt: function() {
		// 禁用药品名称输入
		// $("#batch_no").attr("disabled", "disabled");	// 批号
		// $("#valid_date").attr("disabled", "disabled").attr("class", "form_text"); // 有效期
		// $("#price_check").attr("disabled", "disabled");	// 成本单价
		$("#price_sell").attr("disabled", "disabled");	// 成本金额
		$("#drug_unit").attr("disabled", "disabled");	// 单位
	},

	// 打印操作(当前页面打印)
	printOpt: function(tpl, data){
		// 模板替换
		var _html = miniTpl(tpl, data);
		// console.log(_html);
		// 判断是否有打印print
		if ($(".print").length < 1){
			$("body").append('<div class="print" ></div>');
		}
		// 判断打印内容是否存在
		if ($(".print").find(".prt").length < 1) {
			$(".print").append(_html);
		} else {
			$(".prt").remove();
			$(".print").append(_html);
		}
		// 触发打印方法
		window.print();
	},
	// 打印操作(当前页面打印)
	printTargetOpt: function(url, tit){
		console.log(tit);
		window.open(url);
	},
	// 打开子窗口
	myShowModalDialog: function (url, obj, callback){
		console.log(obj);
		if(window.showModalDialog){
			if(callback){
				var rlt = showModalDialog(url, '', 'resizable:no;scroll:no;status:no;center:yes;help:no;dialogWidth:' + obj.width + ' px;dialogHeight:' + obj.height + ' px');
				if(rlt)
					return callback(rlt);
				else
				{
					callback(window.returnValue);
				}
			}
			else
				showModalDialog(url, '', 'resizable:no;scroll:yes;status:no;center:yes;help:no;dialogWidth:' + obj.width + ' px;dialogHeight:' + obj.height + ' px');
		} else {
			if(callback)
				window.showModalDialogCallback = callback;
			var top = (window.screen.availHeight-30-obj.height)/2; //获得窗口的垂直位置;
			var left = (window.screen.availWidth-10-obj.width)/2; //获得窗口的水平位置;
			var winOption = "top="+top+",left="+left+",height="+obj.height+",width="+obj.width+",resizable=no,scrollbars=no,status=no,toolbar=no,location=no,directories=no,menubar=no,help=no";
			window.open(url,window, winOption);
		}
	},

	// 批量上传验证
	addBatchDrugCheck: function(name, tip) {
		// 判断是否选择供应商
		if (!name || name===""){
			alert(tip);
			return true;
		}
		return false;
	},
	// 批量上传操作
	addBatchDrugOpt: function() {
		// 获取供应商信息
		var $get_supplier = $("#get_supplier"),
			supplier_id = $.global.data.supplier_id = $get_supplier.find("option:selected").attr("attr_id"),
			supplier_name = $.global.data.supplier_name = $get_supplier.find("option:selected").text();

		// 判断是否选择供应商
		if ($.addBatchDrugCheck(supplier_name, "请选择供货商!")) return true;

		// 判断Select是否为禁用状态
		// var $get_supplier = $("#get_supplier");
		if ($get_supplier.attr("disabled") != "disabled"){
			// 禁用供应商下拉
			$.disableSelect($get_supplier, $.global.data.supplier_name, $.global.data.supplier_id);
		}
	},

	// 获取弹出入库数据
	getStockInputData : function (flag) {
		// $.global.document_id = document_id;
		// 请求URL
		// 判断是否请求本地json文件
		if (typeof isJson != 'undefined'){
			$.ajaxConfig.url = "../../src/data/adjust_output_edit.json";
		} else {
			$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:edit");
		}
		// 请求参数
		$.ajaxConfig.data = {
			document_id: $.global.document_id,
		};
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			if (res.res && res.res == 1) {
				// console.log(res);
				// console.log(res.data);
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

					// 判断当前单据是否有数据, 没有设置为新建
					if ($.global.data.detail && $.global.data.detail.length < 1){
						// 设置save_type
						$.global.save_type = 1;
						// 获取供应商信息
						$.global.data.supplier_id = $("#get_supplier").find("option:selected").attr("attr_id");
						$.global.data.supplier_name = $("#get_supplier").find("option:selected").text();
						// 获取操作类型信息
						$.global.data.type = $("#get_type_arr").val();
						// $.global.data.type_name = $("#get_type_arr").find("option:selected").text();
					}

					// 判断是否存在备份数据
					if ($.global.dataBak && $.global.dataBak.length>0){
						// $.global.data.detail = $.global.dataBak;
						$.global.data.detail = $.global.data.detail.concat($.global.dataBak);
						console.log(1, $.global.data.detail);
					}

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
						// $.global.save_type = 1;
						// 更新供应商信息
						// $.global.data.supplier_id = $("#get_supplier").children(":first").attr("attr_id");
						// $.global.data.supplier_name = $("#get_supplier").children(":first").text();

						// 清空单据号值
						$("#set_document_no").val("");
					}
					$("#drug_table").append(drugInfo);
					return;
				}

				// 模板替换
				var _html = miniTpl(tpl.stock_input, res);
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
		// 判断是批量上传操作, 相应操作和验证
		if ($.global.isBatch) {
			if ($.addBatchDrugOpt()) return;
		}
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
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:save");
		// http://h.lk.cn/drugstore/tab:stock_input/act:save
		// 请求参数
		$.ajaxConfig.data = {
			data: $.global.data
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				// 批量上传保存成功，标记为非批量上传
				$.global.isBatch = false;
				// console.log(res.msg);
				alert(res.msg);
				// 返回document_id赋值
				$.global.document_id = res.document_id;
				// 改变保存状态为登记
				$.global.save_type = 2;

				// 清空新增备份数据
				$.global.dataBak = [];
				// 启用保存按钮
				// $("#save_stock_input").removeAttr("disabled");
				// 启用审核按钮
				$("#audit_stock_input").removeAttr("disabled");

				// 获取弹出入库数据(保存之后document_id同步问题)
				$.getStockInputData(true);
				// 刷新页面
				// location.reload();
			} else {
				alert(res.msg);
			}
			// 启用保存按钮(无论成功失败都要把保存放开)
			$("#save_stock_input").removeAttr("disabled");
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
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:audit");
		// http://h.lk.cn/drugstore/tab:stock_input/act:save
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
				// 绑定打印参数
				$.global.targetUrl = "/drugstore/tab:stock_input/act:print/document_id:"+$.global.document_id;	// 跳转URL

				// 禁用保存按钮
				$("#save_stock_input").attr("disabled", "disabled");
				// 禁用批量上传按钮
				$("#batch_storage").attr("disabled", "disabled");

				// 启用打印按钮
				$("#print_stock_input").removeAttr("disabled");

				// 禁用添加按钮
				$("#drugAdd").attr("disabled", "disabled");

				// 获取弹出入库数据(保存之后document_id同步问题)
				$.getStockInputData(true);

				// 刷新页面
				// location.reload();
			} else {
				alert(res.msg);
				// 禁用审核按钮
				$(_this).removeAttr("disabled");
			}
		});
	},
	// 删除录入药品数据
	delStockInputData : function (id) {
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:del_input");
		// http://h.lk.cn/drugstore/tab:stock_input/act:del_document
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
			alert("已入库的单据不可以删除!");
			return;
		}
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_input/act:del_document");
		// http://h.lk.cn/drugstore/tab:stock_input/act:del_document
		// 请求参数
		$.ajaxConfig.data = {
			document_id: id
		};
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			console.log(res);
			if (res.res == 1) {
				// console.log(res.msg);
				alert(res.msg);
				if (!$.isLocalhost()){
					// 关闭时刷新页面
					location.reload();
				}
			} else {
				alert(res.msg);
			}
		});
	},
	// 上传excel文件解析数据
	uploadFileReaderData	: function(data, el){
		// console.log(0, el);
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("ajax_upload_batch_input");
		// http://h.lk.cn/ajax_upload_batch_input
		// 配置上传文件ajax参数
		$.ajaxConfig.cache = false; 					//上传文件无需缓存
		$.ajaxConfig.processData = false; 		//用于对data参数进行序列化处理 这里必须false
		$.ajaxConfig.contentType = false; 		//必须
		// 请求参数
		$.ajaxConfig.data = data;
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			// console.log(res);
			// console.log(1, el);
			if (res.res && res.res == 1) {
				$.global.data.detail = $.global.data.detail.concat(res.data);
				// 移除药品列表数据
				$("#drug_table .g_tbody").remove();
				// 渲染html模板
				var drugInfo = miniTpl(tpl.drugInfo, $.global.data.detail);
				// 展示数据
				$("#drug_table").append(drugInfo);
				// 更新ajax请求配置
				$.ajaxConfig.processData = true;
				$.ajaxConfig.contentType = "application/x-www-form-urlencoded";
				$.global.isBatch = true;
			} else {
				console.log(res.msg);
				alert(res.msg);
			}
			// 清空file内容
			$(el).val("");

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
		$.onSelect();
		// 新建触发弹出入库
		$("#add_drug").click(function () {

			// 设置save_type
			$.global.save_type = 1;
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

		// $("body").load("http://www.lk.cn/seller/drug/type:1/group_id:16");

	},

	// 统一调用方法和赋值方法
	dataInit: function () {
		ajaxConfig.url = ajaxConfig.reqUrl("stock_input/act:edit");
		ajaxConfig.reqDataApi(ajaxConfig,function (res) {
			console.log(res);
			// let code = res.res;
			if (code == 1) {
				// 渲染数据
				// _this.detailInfo = _this.formatDetailData(res.data);
			}
		});
	},
	// 测试调用
	test: function () {
		console.log("这是测试方法！");
	}
});
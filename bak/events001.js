$.extend({

	// 添加药品事件
	drugAdd: function(){
		console.log("添加药品事件");
		// 获取新药品信息
		$.global.newDrug = $.getNewDrug();

		// 判断验证是否通过
		// if ($.addDrugCheck()) return;		// 暂时注释

		// 禁用供应商下拉
		$.disableSelect("#get_supplier", $.global.data.supplier_name);

		console.log($.global.newDrug);
		// 测试数据，还需要拼接
		$.global.newDrug = {
			drug_id: "n1",
			batch_no: "1",
			drug_name: "阿莫西林胶囊",
			drug_spec: "0.5g*24粒",
			drug_unit: "盒",
			number: "1",
			price_check: "18.50",
			price_sell: "19.20",
			product_date: "2019-08-06",
			valid_date: "2019-08-05",
			drug_factory: "珠海联邦制药"
		};

		$.global.data.detail.push($.global.newDrug);
		// console.log($.global.data.detail);
		// console.log($.global.data.detail[$.global.data.detail.length-1], $.global.data.detail.length-1);

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
	// 修改药品事件
	drugUpdate: function(){
		console.log("修改药品事件");
		// 获取新药品信息
		var newDrug = $.getNewDrug();
		// 改变录入药品信息按钮状态
		$.addBtn();
		// 清空当前录入药品信息
		$.clearDrug();
		// 改变数据列表信息
		// $
	},
	// 修改数据列表信息
	updateDrug: function(el) {
		$(el);
	},
	// 获取新录入药品信息
	getNewDrug: function() {
		// 新增药品信息，需要修改。生产厂商和规格没有。在选药时添加
		var curObj = {
			drug_name: $("#drug_name").val(),
			batch_no: $("#batch_no").val(),
			product_date: $("#product_date").val(),
			valid_date: $("#valid_date").val(),
			number: $("#drug_num").val(),
			drug_unit: $("#drug_unit").val(),
			price_check: $("#price_check").val(),
			price_sell: $("#price_sell").val()
		};

		$.global.newDrug.drug_name = $("#drug_name").val(),
		$.global.newDrug.batch_no = $("#batch_no").val(),
		$.global.newDrug.product_date = $("#product_date").val(),
		$.global.newDrug.valid_date = $("#valid_date").val(),
		$.global.newDrug.number = $("#drug_num").val(),
		$.global.newDrug.drug_unit = $("#drug_unit").val(),
		$.global.newDrug.price_check = $("#price_check").val(),
		$.global.newDrug.price_sell = $("#price_sell").val();

		return curObj;
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
	editDrug : function (el, obj) {
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");
		console.log($.global.data.detail[curNum]);
		// 设置当前修改的药品信息
		$.setCurDrug($.global.data.detail[curNum]);
		// 改变录入药品信息按钮状态
		$.editBtn();
		// 传递当前药品ID
		$("#drugUpdate").attr("attr_id", _id)
	},
	// 删除当前药品
	delDrug : function (el, obj) {
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curDrug = "#drug_" + _id;
			curNum = $(el).attr("attr_num");
		console.log($.global.data.detail[curNum]);
		// 从全局数据中删除当前数据
		delete $.global.data.detail[curNum];
		console.log($.global.data.detail);
		// 页面中删除当前数据所在行
		$(curDrug).remove();
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
				});
				// 判断是入库弹出是编辑
				if ($.global.save_type === 1){
					// 改变供应商状态
					$("#get_supplier").removeAttr("disabled");
					// 触发下拉检索
					$.onSelectN();
				}
				// 入库弹出对应操作
				$.stockInputOpt();

			}
		});
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
	disableSelect: function(str, v) {
		// 屏蔽select插件
		$(str).lkdelselect();
		// 改变供应商状态
		$(str).attr("disabled", "disabled");
		// 设置select值
		$(str).children(":first").text(v);
	},
	// 改变单据状态的select值
	setSelectVal: function(v){
		$("#is_verify_arr").children(":first").text(v);
	},

	// 获取弹出入库数据
	getStockInputData : function () {
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
				// console.log(res);
				$.global.data = res.data;

				// 判断返回数据是否为空，为空赋值{}
				// if (res.data && res.data.length){
				// 	$.global.data = res.data;
				// } else {
				// 	$.global.data = {};
				// }

				// 弹出入库
				$.onPopCover(_html);
			}
		});
	},
	// 入库弹出对应操作
	stockInputOpt: function() {
		// 验收科室不可操作
		// $("#get_department").attr("disabled", "disabled");

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
		$("#add_drug1").click(function () {
			// 获取弹出入库数据
			getStockInputData();
			// 设置save_type
			$.global.save_type = 2;
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
	}
});
$.extend({
	// 输入联想参数
	lkinputtipsOpt: {
		ajaxParameter: {
			time: 400,
		},
		listseach: {
			Maxwidth:"600px",
			Maxheight:"100px",
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
		// console.log(data);
		if (data.res){
			$.global.drugList = data.res;
			// 渲染html模板，并插入到入库列表
			var drugList = miniTpl(tpl.drugData, data.res);
			return drugList;
		}

		/*
		if(data.res && data.res.length == 0){
			html = tpl.noDrugData;
			// html = '<div class="nolist">没有找到这个药品</div>';
		}else{
			$.global.drugList = data.res;
			// 渲染html模板，并插入到入库列表
			var drugInfo = miniTpl(tpl.drugInfo, data.res);

			// html = "<table style=\"width: 100%\">\n" +
			// 	"            <thead><tr>\n" +
			// 	"                <th>名称</th>\n" +
			// 	"                <th>数量</th>\n" +
			// 	"                <th>价格</th>\n" +
			// 	"            </tr></thead><tbody>";
			// for(var i = 0; i< data.res.length; i++){
			// 	html += " <tr class='auto_complates' attr_num='"+i+"' data-name='"+data.res[i].goods_name+"'>\n" +
			// 		"                <td>"+data.res[i].goods_name+"</td>\n" +
			// 		"                <td>"+data.res[i].goods_number+"</td>\n" +
			// 		"                <td>"+data.res[i].goods_weight+"</td>\n" +
			// 		"            </tr>"
			//
			// }
			// html += "</tbody></table>"

		}
		*/
		return html;
	},
	// 输入联想成功方法
	inputTipClickFn: function (input, obj) {
		var _num = obj.attr("attr_num");
		console.log($.global.drugList[_num]);
		console.log(input,obj);
		var value = obj.attr("data-name")
		input.val(value);
	},

	// 添加药品事件
	drugAdd: function(){
		console.log("添加药品事件");
		// 获取新药品信息
		$.getNewDrug();
		// console.log($.global.newDrug);

		// 判断验证是否通过
		// if ($.addDrugCheck()) return;		// 暂时注释

		// 禁用供应商下拉
		$.disableSelect("#get_supplier", $.global.data.supplier_name);

		// 把新录入的药品信息添加到药品信息列表
		$.global.data.detail.push($.global.newDrug);
		console.log($.global.data.detail.length);

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
	drugUpdate: function(el){
		console.log("修改药品事件");
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");

		// 获取新药品信息
		$.getNewDrug();

		// 更新药品列表信息
		$.global.data.detail[curNum] = $.global.newDrug;
		console.log($.global.data.detail.length);

		// 改变药品列表内相应的值
		$.updateDrug(curNum, $.global.data.detail[curNum]);

		// 改变录入药品信息按钮状态
		$.addBtn();
		// 清空当前录入药品信息
		$.clearDrug();

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
	editDrug : function (el, n) {		// n数组循环编号
		// 获取当前数据药品id和循环编号
		var _id = $(el).attr("attr_id"),
			curNum = $(el).attr("attr_num");
		console.log($.global.data.detail[n]);

		// 判断是入库状态不能删除
		if ($.global.data.status_name === "入库") {
			alert("已入库的验收明细不可以进行编辑!");
			return;
		}

		// 把当前药品信息存到$.global.newDrug
		$.global.newDrug = $.global.data.detail[n];
		console.log($.global.newDrug);
		// 设置当前修改的药品信息
		$.setCurDrug($.global.data.detail[n]);
		// 改变录入药品信息按钮状态
		$.editBtn();
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

		// 页面中删除当前数据所在行
		$("#drug_"+n).remove();
		// 从全局数据中删除当前数据
		$.global.data.detail.splice(n, 1);
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
		// 清空输入框值
		$("#pop-cont input[type=text]").val("");
		// 设置select初始值
		$("#get_supplier").val("");
		$("#get_is_verify_arr").val("全部");
		// 移除药品列表数据
		$(".g_tbody").remove();
		// 没有数据赋值
		$("#drug_table").append(tpl.noDrugInfo);
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
				// 根据单据状态进行相应操作
				// $.setBtnOpt();
				// 根据单据状态,入库弹出对应操作
				$.stockInputOpt();

				// 设置输入联想参数和方法
				$.lkinputtipsOpt.ajaxParameter.url = "http://h.lk.cn/ajax_auto_goods";
				$.lkinputtipsOpt.ajaxParameter.ajaxBefore = $.inputTipAjaxBefore;
				$.lkinputtipsOpt.ajaxParameter.success = $.inputTipSuccess;
				$.lkinputtipsOpt.listseach.clickfn = $.inputTipClickFn;

				// 绑定输入联想事件
				$("#drug_name").lkinputtips($.lkinputtipsOpt);

				// 清空操作
				$("#clear_stock_input").click(function () {
					$.clearStockInput();
				});

			}
		});
	},

	// 入库弹出对应操作
	stockInputOpt: function() {
		// 根据单据状态,对按钮进行相应操作
		if ($.global.data.status_name === "入库") {
			// 禁用审核按钮
			$("#save_stock_input").attr("disabled", "disabled");
			// 禁用审核按钮
			$("#audit_stock_input").attr("disabled", "disabled");
			// 禁用添加按钮
			$("#drugAdd").attr("disabled", "disabled");
			// 移除操作按钮点击事件
			// $(".drug_opt a").removeAttr("onclick");
			// 启用打印按钮
			$("#print_stock_input").removeAttr("disabled");

		} else if ($.global.data.status_name === "验收"){
			// 设置select值
			// $("#get_supplier").children(":first").text($.global.data.supplier_name);
		} else {
			// 改变供应商状态
			$("#get_supplier").removeAttr("disabled");
			// 触发下拉检索
			$.onSelectN();
			// 禁用审核按钮
			$("#audit_stock_input").attr("disabled", "disabled");
			// 设置药品列表默认值
			$.global.data.detail = [];

		}

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
				// $.global.data.status_name = "入库";

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
	},
	// 测试调用
	test: function () {
		console.log("这是测试方法！");
	}
});
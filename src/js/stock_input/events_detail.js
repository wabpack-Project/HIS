$.extend({
	// 模板
	tpl: {
		drugData: '<%\n' +
			'var i=data.length;\n' +
			'if(i == 0){\n' +
			'%>\n' +
			'<div class="nolist">没有找到这个药品</div>\n' +
			'<%\n' +
			'} else {\n' +
			'%>\n' +
			'<table style="width: 100%">\n' +
			'    <tr>\n' +
			'      <th  width="27%" >药品名称</th>\n' +
			'      <th  width="10%">规格</th>\n' +
			'      <th  width="9%">医嘱分类</th>\n' +
			'      <th  width="9%">单位</th>\n' +
			'      <th  width="27%">生产厂商</th>\n' +
			'    </tr>\n' +
			'  <%\n' +
			'  for(; i>0; i--){\n' +
			'  var item = data[i-1];\n' +
			'  %>\n' +
			'  <tr class="auto_complates" attr_id="<%=item.id||\'\'%>" data-name="<%=item.goods_name||\'\'%>">\n' +
			'    <td><%=item.goods_name||""%></td>\n' +
			'    <td><%=item.spec||""%></td>\n' +
			'    <td><%=item.drug_type||""%></td>\n' +
			'    <td><%=item.unit||""%></td>\n' +
			'    <td><%=item.factory||""%></td>\n' +
			'  </tr>\n' +
			'  <%}%>\n' +
			'</table>\n' +
			'<% } %>',
		// 药品清单模板
		profile_print: '<div class="prt">\n' +
			'    <%\n' +
			'    var printInfo = data,\n' +
			'        sum_price = printInfo.sum_price\n' +
			'        verify_date_start = printInfo.verify_date_start,\n' +
			'        verify_date_end = printInfo.verify_date_end;\n' +
			'    %>\n' +
			'    <!-- 名称 -->\n' +
			'    <div class="prt_tit" >药品清单</div>\n' +
			'    <!-- 表头信息 -->\n' +
			'    <div class="prt_head clearfix" >\n' +
			'      <div class="col_md">开始时间：<%=verify_date_start%></div>\n' +
			'      <div class="col_md">结束时间：<%=verify_date_end%></div>\n' +
			'    </div>\n' +
			'    <!-- 表格 -->\n' +
			'    <div class="prt_table" >\n' +
			'      <table class="b_collapse" >\n' +
			'        <tr class="g_thead">\n' +
			'          <th width="10%" >科室</th>\n' +
			'          <th width="10%" >操作类型</th>\n' +
			'          <th width="35%" >药品名称</th>\n' +
			'          <th width="15%" >规格</th>\n' +
			'          <th width="10%" >数量</th>\n' +
			'          <th width="10%" >单位</th>\n' +
			'          <th width="10%" >成本金额</th>\n' +
			'        </tr>\n' +
			'        <%\n' +
			'        var j = 0, len = printInfo.detail.length;\n' +
			'        if(len == 0) {\n' +
			'        %>\n' +
			'        <tr class="g_tbody no_drug_list" >\n' +
			'          <td class="" colspan="7">没有数据</td>\n' +
			'        </tr>\n' +
			'        <% } else {\n' +
			'        for(; j < len; j++){\n' +
			'        var detail = printInfo.detail[j];\n' +
			'        %>\n' +
			'        <tr class="g_tbody">\n' +
			'          <td><%=detail.department_name||""%></td>\n' +
			'          <td><%=detail.type_name||""%></td>\n' +
			'          <td><%=detail.drug_name||""%></td>\n' +
			'          <td><%=detail.drug_spec||""%></td>\n' +
			'          <td><%=detail.number||""%></td>\n' +
			'          <td><%=detail.drug_unit||""%></td>\n' +
			'          <td><%=detail.fee_check||""%></td>\n' +
			'        </tr>\n' +
			'        <% } } %>\n' +
			'      </table>\n' +
			'    </div>\n' +
			'    <!-- 表尾信息 -->\n' +
			'    <div class="prt_foot" >\n' +
			'      <div class="col_md fr">成本金额：<%=sum_price%>元</div>\n' +
			'    </div>\n' +
			'  </div>',
		// 汇总清单模板
		home_print: '<div class="prt">\n' +
			'    <%\n' +
			'    var printInfo = data,\n' +
			'        sum_price = printInfo.sum_price\n' +
			'        verify_date_start = printInfo.verify_date_start,\n' +
			'        verify_date_end = printInfo.verify_date_end;\n' +
			'    %>\n' +
			'    <!-- 名称 -->\n' +
			'    <div class="prt_tit" >汇总清单</div>\n' +
			'    <!-- 表头信息 -->\n' +
			'    <div class="prt_head clearfix" >\n' +
			'      <div class="col_md">开始时间：<%=verify_date_start%></div>\n' +
			'      <div class="col_md">结束时间：<%=verify_date_end%></div>\n' +
			'    </div>\n' +
			'    <!-- 表格 -->\n' +
			'    <div class="prt_table" >\n' +
			'      <table class="b_collapse" >\n' +
			'        <tr class="g_thead">\n' +
			'          <th width="32%" >科室</th>\n' +
			'          <th width="34%" >操作类型</th>\n' +
			'          <th width="34%" >成本金额</th>\n' +
			'        </tr>\n' +
			'        <%\n' +
			'        var j = 0, len = printInfo.detail.length;\n' +
			'        if(len == 0) {\n' +
			'        %>\n' +
			'        <tr class="g_tbody no_drug_list" >\n' +
			'          <td class="" colspan="3">没有数据</td>\n' +
			'        </tr>\n' +
			'        <% } else {\n' +
			'        for(; j < len; j++){\n' +
			'        var detail = printInfo.detail[j];\n' +
			'        %>\n' +
			'        <tr class="g_tbody">\n' +
			'          <td><%=detail.department_name||""%></td>\n' +
			'          <td><%=detail.type_name||""%></td>\n' +
			'          <td><%=detail.fee_check||""%></td>\n' +
			'        </tr>\n' +
			'        <% } } %>\n' +
			'      </table>\n' +
			'    </div>\n' +
			'    <!-- 表尾信息 -->\n' +
			'    <div class="prt_foot" >\n' +
			'      <div class="col_md fr">成本金额：<%=sum_price%>元</div>\n' +
			'    </div>\n' +
			'  </div>',
		// 弹出头部模板
		popbar: '<div class="pop_drug_head">\n' +
			'  <span class="pop_drug_tit">出入库明细</span>\n' +
			'  <a class="radius30 close" id="pop-close" href="javascript:;">x</a>\n' +
			'</div>',
		// 弹出出入库明细模板
		stock_statistics: '<div id="stock_output" class="h_c_regist h_drugstore" >\n' +
			'  <!-- 入库表单 -->\n' +
			'  <div class="h_regist_head" >\n' +
			'    <div class="stock_input clearf" >\n' +
			'      <div class="form_group fl"> <span>科室：</span>\n' +
			'        <div class="form_select">\n' +
			'          <select id="get_department" class="select_3rd form_select" disabled >\n' +
			'            <%\n' +
			'            var i, departmentData = data.department_arr;\n' +
			'            for(i in departmentData){\n' +
			'            if(data.data.department_name == departmentData[i]) {\n' +
			'            %>\n' +
			'            <option selected attr_id="<%=i%>" value="<%=i%>"><%=departmentData[i]%></option>\n' +
			'            <%}else{%>\n' +
			'            <option attr_id="<%=i%>" value="<%=i%>"><%=departmentData[i]%></option>\n' +
			'            <%}%>\n' +
			'            <% } %>\n' +
			'          </select>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'      <div class="form_group fl" > <span>操作类型：</span>\n' +
			'        <div class="form_select">\n' +
			'          <select id="get_supplier"  class="select_4th form_select" disabled>\n' +
			'            <option attr_id="" value=""></option>\n' +
			'            <%\n' +
			'            var m, typeData = data.type_arr;\n' +
			'            for(m in typeData){\n' +
			'            if(data.data.type_name == typeData[m]) {\n' +
			'            %>\n' +
			'            <option selected attr_id="<%=m%>" value="<%=m%>"><%=typeData[m]%></option>\n' +
			'            <%}else{%>\n' +
			'            <option attr_id="<%=m%>" value="<%=m%>"><%=typeData[m]%></option>\n' +
			'            <%}%>\n' +
			'            \n' +
			'            <% } %>\n' +
			'          </select>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'      <div class="form_group fl" style="display: none" >\n' +
			'        <span>规格：</span>\n' +
			'        <%\n' +
			'        var document_no = data.data.document_no;\n' +
			'        var remark = data.data.remark;\n' +
			'        if(!document_no) document_no = "";\n' +
			'        if(!remark) remark = "";\n' +
			'        %>\n' +
			'        <input id="set_document_no" class="i_w190 form_text1" value="<%=document_no%>" type="text" name="txt_goods_name" placeholder="" disabled >\n' +
			'      </div>\n' +
			'    </div>\n' +
			'    <div class="stock_input clearf" style="display: none" >\n' +
			'      <div class="form_group fl" >\n' +
			'        <span>药品名称：</span>\n' +
			'        <input class="i_w400 input_remark" value="<%=remark%>" type="text" name="txt_goods_name" placeholder="" autocomplete="off" >\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- 药品列表 -->\n' +
			'  <div class="h_pat_table h_drug_table" >\n' +
			'    <table border="0" width="100%" >\n' +
			'      <tbody id="drug_table">\n' +
			'      <tr class="g_thead" >\n' +
			'        <th width="8%" >单据号</th>\n' +
			'        <th width="26%" >药品名称</th>\n' +
			'        <th width="8%" >规格</th>\n' +
			'        <th width="8%" >批次</th>\n' +
			'        <th width="8%" >有效期</th>\n' +
			'        <th width="8%" >数量</th>\n' +
			'        <th width="8%" >单位</th>\n' +
			'        <th width="8%" >成本单价</th>\n' +
			'        <th width="8%" >操作员</th>\n' +
			'        <th width="12%" >操作时间</th>\n' +
			'      </tr>\n' +
			'      <%\n' +
			'      var j, drugData = data.data.detail;\n' +
			'      if(!drugData || drugData.length == 0) {\n' +
			'      %>\n' +
			'      <tr class="g_tbody no_drug_list" >\n' +
			'        <td class="" colspan="11">没有数据</td>\n' +
			'      </tr>\n' +
			'      <% } else {\n' +
			'      for(j in drugData){ %>\n' +
			'      <tr class="g_tbody" id="drug_<%=j%>" >\n' +
			'        <td><%=drugData[j].document_no||""%></td>\n' +
			'        <td><%=drugData[j].drug_name||""%></td>\n' +
			'        <td><%=drugData[j].drug_spec||""%></td>\n' +
			'        <td><%=drugData[j].batch_no||""%></td>\n' +
			'        <td><%=drugData[j].valid_date||""%></td>\n' +
			'        <td><%=drugData[j].number||""%></td>\n' +
			'        <td><%=drugData[j].drug_unit||""%></td>\n' +
			'        <td><%=drugData[j].price_check||""%></td>\n' +
			'        <td><%=drugData[j].verify_name||""%></td>\n' +
			'        <td><%=drugData[j].verify_date||""%></td>\n' +
			'      </tr>\n' +
			'      <% } } %>\n' +
			'      </tbody>\n' +
			'    </table>\n' +
			'  </div>\n' +
			'</div>'
	},

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
				var drugList = miniTpl($.tpl.drugData, data.data);
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
	},
	getChildVal: function(el) {
		// console.log(el);
		// 获取当前元素所有子元素
		var childEl = $(el).children();

		// 把选中的药品信息赋值到录入到对应的输入框(1.药品名称 	2.单位		3.验收单价	4.零售单价	5.数量 )
		$("#drug_name").val($(childEl[0]).text());	// 药品名称
		$("#drug_id").attr("value", $(el).attr("attr_id"));	// 药品id

	},

	// 入库弹出成功事件
	onPopCoverShow: function() {
		protect: false,
			// 绑定弹出关闭事件
			$(".close").click(function() {
				$.popCover.hide();
			});
	},
	// 触发入库弹出
	onPopCover: function(el) {
		// 弹出层
		$.popCover(el, {
			pBar: $.tpl.popbar,
			protect: true,
			onshow: $.onPopCoverShow
		});
	},
	// 触发下拉检索
	onSelect: function() {
		// console.log("onSelect!");
		// 第一项默认是非空值时触发
		$(".select_1st").lkselect({
			selectsize: 10,
		});
		// 第一项默认是空值时触发，需要设置select高度设置mrheight
		$(".select_2nd").lkselect({
			selectsize: 5,
			mrheight:'30px',
		});
	},
	// 改变单据状态的select值
	setSelectVal: function(v){
		$("#is_verify_arr").children(":first").text(v);
	},
	// 清空from操作
	clearFormVal: function(){
		$("#drug_id").val("");		// 药品id
		$("#drug_name").val("");		// 药品名称
		$(".start_data").val("");		// 开始时间
		$(".end_data").val("");			// 结束时间
		// 操作类型
		$("#type_name").children().eq(0).attr("selected",true).siblings().attr("selected",false);
		// 科室
		$("#department_name").children().eq(0).attr("selected",true).siblings().attr("selected",false);
	},

	// 获取弹出入库数据
	getStockDetailData : function () {
		// $.global.document_id = document_id;
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_statistics/act:get_detail");
		// 请求参数
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			if (res.res && res.res == 1) {
				// console.log(res);
				console.log(res.data);

				// 模板替换
				var _html = miniTpl($.tpl.stock_statistics, res);
				// console.log(_html);
				// 弹出入库
				$.onPopCover(_html);

			}
		});
	},
	// 获取汇总清单打印数据
	getHomePrintData : function () {
		// $.global.document_id = document_id;
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_statistics/act:home_print");
		// http://h.lk.cn/drugstore/tab:stock_statistics/act:home_print
		// 请求参数
		// 请求参数
		$.ajaxConfig.data = $.global.stock_statistics;
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			if (res) {
				// console.log(res);
				console.log(res);
				// 判断是否有打印信息，提示并退出
				if (res.detail.length<1) {
					alert("当前没有可打印的数据!");
					return;
				}
				// 模板替换
				var _html = miniTpl($.tpl.home_print, res);
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
			}
		});
	},
	// 获取汇总清单打印数据
	getProfilePrintData : function () {
		// $.global.document_id = document_id;
		// 请求URL
		$.ajaxConfig.url = $.ajaxConfig.reqUrl("stock_statistics/act:profile_print");
		// http://h.lk.cn/drugstore/tab:stock_statistics/act:profile_print
		// 请求参数
		// 请求参数
		$.ajaxConfig.data = $.global.stock_statistics;
		console.log($.ajaxConfig.data);
		// 请求数据
		$.ajaxConfig.reqDataApi($.ajaxConfig,function (res) {
			if (res) {
				// console.log(res);
				console.log(res);
				// 判断是否有打印信息，提示并退出
				if (res.detail.length<1) {
					alert("当前没有可打印的数据!");
					return;
				}
				// 模板替换
				var _html = miniTpl($.tpl.profile_print, res);
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
			}
		});
	},

	// 初始化绑定事件
	onInit: function(){
		// 选项卡切换
		$(".tab_list").myTab(".tab_body", { pickClass : "cur",});
		// 下拉检索调用
		$.onSelect();
		// 判断环境
		$.isLocalhost();
		// 设置输入联想参数和方法
		$.lkinputtipsOpt.ajaxParameter.url = $.global.domain + "ajax_auto_goods";
		// http://h.lk.cn/ajax_auto_goods
		$.lkinputtipsOpt.ajaxParameter.ajaxBefore = $.inputTipAjaxBefore;
		$.lkinputtipsOpt.ajaxParameter.success = $.inputTipSuccess;
		$.lkinputtipsOpt.listseach.clickfn = $.inputTipClickFn;
		// 绑定输入联想事件
		$("#drug_name").lkinputtips($.lkinputtipsOpt);

		// 弹出出入库明细
		$(".get_stock_detail").click(function () {
			// 请求参数
			$.ajaxConfig.data = {
				// 获取出库明细参数
				department : $(this).attr("attr_department_id"),	// 科室id
				drug_id : $(this).attr("attr_drug_id"),						// 药品id
				type : $(this).attr("attr_type"),									// 操作类型
				verify_date_start : $(".start_data").val(),				// 开始时间
				verify_date_end : $(".end_data").val()						// 结束时间
			};
			// 获取弹出入库数据
			$.getStockDetailData();
		});

		// 触发药品清单打印
		$("#profile_print").click(function () {
			// 获取药品清单打印数据
			$.getProfilePrintData();
		});

		// 触发汇总清单打印
		$("#home_print").click(function () {
			// 获取汇总清单打印数据
			$.getHomePrintData();
		});

		// 触发清空操作
		$("#clear_from").click($.clearFormVal);

	},

});
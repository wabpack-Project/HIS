// 定义模板文件
var tpl = {
	noDrugData: '<div class="nolist">没有找到这个药品</div>',
	drugData: '<%\n' +
		'var i=data.length;\n' +
		'if(i == 0){\n' +
		'%>\n' +
		'<div class="nolist">没有找到这个药品</div>\n' +
		'        <%\n' +
		'} else {\n' +
		'%>\n' +
		'<table style="width: 100%">\n' +
		'  <tr>\n' +
		'  <th  width="27%" >药品名称</th>\n' +
		'  <th  width="10%">规格</th>\n' +
		'  <th  width="9%">医嘱分类</th>\n' +
		'  <th  width="9%">单位</th>\n' +
		'  <th  width="9%">成本单价</th>\n' +
		'  <th  width="9%">零售单价</th>\n' +
		'  <th  width="27%">生产厂商</th>\n' +
		'  </tr>\n' +
		'  <%\n' +
		'  for(; i>0; i--){\n' +
		'      var item = data[i-1];\n' +
		'  %>\n' +
		'  <tr class="auto_complates" attr_id="<%=item.id||\'\'%>" data-name="<%=item.goods_name||\'\'%>">\n' +
		'      <td><%=item.goods_name||""%></td>\n' +
		'      <td><%=item.spec||""%></td>\n' +
		'      <td><%=item.drug_type||""%></td>\n' +
		'      <td><%=item.unit||""%></td>\n' +
		'      <td><%=item.price_buy||""%></td>\n' +
		'      <td><%=item.price||""%></td>\n' +
		'      <td><%=item.factory||""%></td>\n' +
		'  </tr>\n' +
		'  <%}%>\n' +
		'</table>\n' +
		'<% } %>',
	popbar: '<div class="pop_drug_head">\n' +
		'  <span class="pop_drug_tit">编辑调节入库</span>\n' +
		'  <a class="radius30 close" id="pop-close" href="javascript:;">x</a>\n' +
		'</div>',
	noDrugInfo : '<tr class="g_tbody no_drug_list" >\n' +
		'        <td class="" colspan="11">没有数据</td>\n' +
		'      </tr>',
	drugInfo : '<%\n' +
		'var j=0, len=data.length;\n' +
		'if(!data || len == 0) {\n' +
		'%>\n' +
		'<tr class="g_tbody no_drug_list" >\n' +
		'  <td class="" colspan="11">没有数据</td>\n' +
		'</tr>\n' +
		'<% } else {\n' +
		'for(; j<len; j++){\n' +
		'var drugInfo = data[j];\n' +
		'%>\n' +
		'<tr class="g_tbody" id="drug_<%=j%>" >\n' +
		'  <td><%=drugInfo.drug_name||""%></td>\n' +
		'  <td><%=drugInfo.drug_spec||""%></td>\n' +
		'  <td><%=drugInfo.batch_no||""%></td>\n' +
		'  <td><%=drugInfo.product_date||""%></td>\n' +
		'  <td><%=drugInfo.valid_date||""%></td>\n' +
		'  <td><%=drugInfo.number||""%></td>\n' +
		'  <td><%=drugInfo.drug_unit||""%></td>\n' +
		'  <td><%=drugInfo.price_check||""%></td>\n' +
		'  <td><%=drugInfo.price_sell||""%></td>\n' +
		'  <td><%=drugInfo.drug_factory||""%></td>\n' +
		'  <td class="drug_opt"><a attr_id="<%=drugInfo.drug_id%>" attr_num="<%=j%>" href="javaScript:;" onclick="$.editDrug(this, <%=j%>)">编辑</a>|<a attr_id="<%=drugInfo.drug_id%>" attr_num="<%=j%>" href="javaScript:;" onclick="$.delDrug(this, <%=j%>)">删除</a></td>\n' +
		'</tr>\n' +
		'<% } } %>',
	adjust_input : '<div id="stock_output" class="h_c_regist h_drugstore" >\n' +
		'  <!-- 入库表单 -->\n' +
		'  <div class="h_regist_head" >\n' +
		'    <div class="stock_input clearf" >\n' +
		'      <div class="form_group fl"> <span>出库科室：</span>\n' +
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
		'      <div class="form_group fl" > <span>供货商：</span>\n' +
		'        <div class="form_select">\n' +
		'          <select id="get_supplier"  class="select_4th form_select" disabled>\n' +
		'            <option attr_id="" value=""></option>\n' +
		'            <%\n' +
		'            var m, supplierData = data.supplier_arr;\n' +
		'            for(m in supplierData){\n' +
		'            if(data.data.supplier_name == supplierData[m].name) {\n' +
		'            %>\n' +
		'            <option selected attr_id="<%=supplierData[m].id%>" attr_py_code_lower="<%=supplierData[m].py_code&&supplierData[m].py_code.toLowerCase()%>"  attr_py_code="<%=supplierData[m].py_code%>" value="<%=supplierData[m].id%>"><%=supplierData[m].name%></option>\n' +
		'            <%}else{%>\n' +
		'            <option attr_id="<%=supplierData[m].id%>"  attr_py_code_lower="<%=supplierData[m].py_code.toLowerCase()%>"  attr_py_code="<%=supplierData[m].py_code%>" value="<%=supplierData[m].id%>"><%=supplierData[m].name||\'\'%></option>\n' +
		'            <%}%>\n' +
		'            \n' +
		'            <% } %>\n' +
		'          </select>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <span>单据号：</span>\n' +
		'        <%\n' +
		'        var document_no = data.data.document_no;\n' +
		'        var remark = data.data.remark;\n' +
		'        if(!document_no) document_no = "";\n' +
		'        if(!remark) remark = "";\n' +
		'        %>\n' +
		'        <input id="set_document_no" class="i_w190 form_text1" value="<%=document_no%>" type="text" name="txt_goods_name" placeholder="" disabled >\n' +
		'      </div>\n' +
		'      <div class="form_group fl"> <span>单据状态：</span>\n' +
		'        <div class="form_select">\n' +
		'          <select id="get_is_verify_arr"  class="select_3rd1 form_select" disabled>\n' +
		'            <option attr_id="" value="">全部</option>\n' +
		'            <%\n' +
		'            var n, verifyData = data.is_verify_arr;\n' +
		'            for(n in verifyData){\n' +
		'            if(data.data.status_name == verifyData[n]) {\n' +
		'            %>\n' +
		'            <option selected attr_id="<%=n%>" value="<%=n%>"><%=verifyData[n]%></option>\n' +
		'            <%}else{%>\n' +
		'            <option attr_id="<%=n%>" value="<%=n%>"><%=verifyData[n]%></option>\n' +
		'            <%}%>\n' +
		'            <% } %>\n' +
		'          </select>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    \n' +
		'    </div>\n' +
		'    <div class="stock_input clearf" >\n' +
		'      <div class="form_group fl"> <span>操作类型：</span>\n' +
		'        <div class="form_select">\n' +
		'          <select id="get_type_arr"  class="select_3rd1 form_select" disabled>\n' +
		'            <option attr_id="" value=""></option>\n' +
		'            <%\n' +
		'            var k, typeData = data.type_arr;\n' +
		'            for(k in typeData){\n' +
		'            if(data.data.type_name == typeData[k]) {\n' +
		'            %>\n' +
		'            <option selected attr_id="<%=k%>" value="<%=k%>"><%=typeData[k]%></option>\n' +
		'            <%}else{%>\n' +
		'            <option attr_id="<%=k%>" value="<%=k%>"><%=typeData[k]%></option>\n' +
		'            <%}%>\n' +
		'            <% } %>\n' +
		'          </select>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <span>备注：</span>\n' +
		'        <input class="i_w400 input_remark" value="<%=remark%>" type="text" name="txt_goods_name" placeholder="" autocomplete="off" >\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <input id="save_stock_input" class="input_btn btn_b36 radius3" type="submit" value="保存">\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <input id="audit_stock_input" class="input_btn btn_b36 radius3" type="submit" value="审核">\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <input id="print_stock_input" class="input_btn btn_b36 radius3" disabled = "disabled" type="submit" value="打印">\n' +
		'      </div>\n' +
		'      <div class="form_group fl" >\n' +
		'        <input id="clear_stock_input" class="input_btn btn_b36 radius3" type="submit" value="清空">\n' +
		'      </div>\n' +
		'      <div class="form_group fl" style="display: none" >\n' +
		'        <input id="new_stock_input" class="input_btn btn_b36 radius3" type="submit" value="新建药品">\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'  <!-- 添加药品 -->\n' +
		'  <div class="add_drug0 clearf" >\n' +
		'    <div class="col_md_3">\n' +
		'      <div class="col_md_7">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>药品名称</lable>\n' +
		'          <input id="drug_name" class="form_text" type="text" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_5">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>批号</lable>\n' +
		'          <input id="batch_no" class="form_text" type="text" autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="col_md_8">\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>生产日期</lable>\n' +
		'          <input id="product_date" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\', maxDate:\'%y-%M-%d\'})" class="Wdate form_text " type="text"  autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>有效期</lable>\n' +
		'          <input id="valid_date" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd\', minDate:\'%y-%M-#{%d+1}\'})" class="Wdate form_text " type="text"  autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>数量</lable>\n' +
		'          <input id="drug_num" class="form_text" type="text" autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>单位</lable>\n' +
		'          <input id="drug_unit" class="form_text" type="text" autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>验收单价</lable>\n' +
		'          <input id="price_check" class="form_text" type="text" autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="col_md_2">\n' +
		'        <div class="form_group0" >\n' +
		'          <lable>零售单价</lable>\n' +
		'          <input id="price_sell" class="form_text" type="text" autocomplete="off" >\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="col_md_1">\n' +
		'      <div class="station" ></div>\n' +
		'      <button id="drugAdd" class="btn btn_primary" onclick="$.drugAdd();" >添加</button>\n' +
		'      <button id="drugUpdate" class="btn btn_primary" onclick="$.drugUpdate(this);">修改</button>\n' +
		'    </div>\n' +
		'  \n' +
		'  </div>\n' +
		'  <!-- 药品列表 -->\n' +
		'  <div class="h_pat_table h_drug_table" >\n' +
		'    <table border="0" width="100%" >\n' +
		'      <tbody id="drug_table">\n' +
		'      <tr class="g_thead" >\n' +
		'        <th width="8%" >药品名称</th>\n' +
		'        <th width="8%" >规格</th>\n' +
		'        <th width="11%" >批号</th>\n' +
		'        <th width="6%" >生产日期</th>\n' +
		'        <th width="6%" >有效期</th>\n' +
		'        <th width="11%" >数量</th>\n' +
		'        <th width="5%" >单位</th>\n' +
		'        <th width="11%" >验收金额</th>\n' +
		'        <th width="5%" >零售金额</th>\n' +
		'        <th width="5%" >生产厂商</th>\n' +
		'        <th width="9%" >操作</th>\n' +
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
		'        <td><%=drugData[j].drug_name||""%></td>\n' +
		'        <td><%=drugData[j].drug_spec||""%></td>\n' +
		'        <td><%=drugData[j].batch_no||""%></td>\n' +
		'        <td><%=drugData[j].product_date||""%></td>\n' +
		'        <td><%=drugData[j].valid_date||""%></td>\n' +
		'        <td><%=drugData[j].number||""%></td>\n' +
		'        <td><%=drugData[j].drug_unit||""%></td>\n' +
		'        <td><%=drugData[j].price_check||""%></td>\n' +
		'        <td><%=drugData[j].price_sell||""%></td>\n' +
		'        <td><%=drugData[j].drug_factory||""%></td>\n' +
		'        <td class="drug_opt"><a attr_id="<%=drugData[j].drug_id%>" attr_num="<%=j%>" href="javaScript:;" onclick="$.editDrug(this, <%=j%>)">编辑</a>|<a attr_id="<%=drugData[j].drug_id%>" attr_num="<%=j%>" href="javaScript:;" onclick="$.delDrug(this, <%=j%>)">删除</a></td>\n' +
		'      </tr>\n' +
		'      <% } } %>\n' +
		'      </tbody>\n' +
		'    </table>\n' +
		'  </div>\n' +
		'</div>',
	adjust_input_prt: '<div class="prt">\n' +
		'    <%\n' +
		'    var printInfo = data,\n' +
		'    department_name = printInfo.department_name,\n' +
		'    tit = printInfo.type_name,\n' +
		'    supplier_name = printInfo.supplier_name,\n' +
		'    document_no = printInfo.document_no,\n' +
		'    sum_price = printInfo.fee_check && printInfo.fee_check+"元",\n' +
		'    verify_name = printInfo.verify_name,\n' +
		'    verify_date = printInfo.verify_date;\n' +
		'    %>\n' +
		'    <!-- 名称 -->\n' +
		'    <div class="prt_tit" >药品<%=tit||""%>单</div>\n' +
		'    <!-- 表头信息 -->\n' +
		'    <div class="prt_head clearfix" >\n' +
		'      <div class="col_md">验收科室：<%=department_name||""%></div>\n' +
		'      <div class="col_md">供应商：<%=supplier_name||""%></div>\n' +
		'      <div class="col_md">验收单号：<%=document_no||""%></div>\n' +
		'    </div>\n' +
		'    <!-- 表格 -->\n' +
		'    <div class="prt_table" >\n' +
		'      <table class="b_collapse" >\n' +
		'        <tr class="g_thead">\n' +
		'          <th width="24%" >药品名称</th>\n' +
		'          <th width="8%" >规格</th>\n' +
		'          <th width="8%" >批号</th>\n' +
		'          <th width="13%" >有效期</th>\n' +
		'          <th width="6%" >数量</th>\n' +
		'          <th width="8%" >单位</th>\n' +
		'          <th width="9%" >成本单价</th>\n' +
		'          <th width="24%" >生产厂商</th>\n' +
		'        </tr>\n' +
		'        <%\n' +
		'        var j = 0, len = printInfo.detail.length;\n' +
		'        if(len == 0) {\n' +
		'        %>\n' +
		'        <tr class="g_tbody no_drug_list" >\n' +
		'          <td class="" colspan="8">没有数据</td>\n' +
		'        </tr>\n' +
		'        <% } else {\n' +
		'        for(; j < len; j++){\n' +
		'        var detail = printInfo.detail[j];\n' +
		'        %>\n' +
		'        <tr class="g_tbody">\n' +
		'          <td><%=detail.drug_name||""%></td>\n' +
		'          <td><%=detail.drug_spec||""%></td>\n' +
		'          <td><%=detail.batch_no||""%></td>\n' +
		'          <td><%=detail.valid_date||""%></td>\n' +
		'          <td><%=detail.number||""%></td>\n' +
		'          <td><%=detail.drug_unit||""%></td>\n' +
		'          <td><%=detail.price_check||""%></td>\n' +
		'          <td><%=detail.drug_factory||""%></td>\n' +
		'        </tr>\n' +
		'        <% } } %>\n' +
		'      </table>\n' +
		'    </div>\n' +
		'    <!-- 表尾信息 -->\n' +
		'    <div class="prt_foot" >\n' +
		'      <div class="col_md">成本总金额：<%=sum_price||""%></div>\n' +
		'      <div class="col_md">审核人员：<%=verify_name||""%></div>\n' +
		'      <div class="col_md">审核时间：<%=verify_date||""%></div>\n' +
		'    </div>\n' +
		'  </div>',
};
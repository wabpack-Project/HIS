$.fn.extend({
	/**
	  * 下拉菜单 20160520		
	  * 
	***/
	selectMenuHover : function () {

		$(this).hover(
			function(e){
				//控制显示
				$(this).find("ul").show();
			}, function(e){
				//控制隐藏
				$(this).find("ul").hide();
			}
		);
		
	}
});

/**
  * 单选修改样式
  * 固定ID和TAG
  * 操作 lx 
***/
function radioEvent() {   
	labels = document.getElementById('male').getElementsByTagName('label');   
	radios = document.getElementById('male').getElementsByTagName('input');   
	for(i=0,j=labels.length ; i<j ; i++){   
		labels[i].onclick=function(){   
		  if(this.className == '') {   
			   for(k=0,l=labels.length ; k<l ; k++)   
			   {   
					labels[k].className='';   
					//radios[k].checked = false;   
			   }   
			   this.className='checked';   
			   try{   
				  document.getElementById(this.name).checked = true;   
			   } catch (e) {}   
		  }   
		}   
	}   
}

/**
  * 关闭提示
  * 直接调用方法
  * 操作 lx 
***/
function msgclose(id){
	$("#"+id).parents("#_id_currentTime").slideToggle("slow").attr("id", "");
	
}

/**
  * 多选赋值.name:checkbox的name属性;id:数组赋值到input[type=hidden]的名
  * 直接调用方法
  * 操作 wxl 
***/
function getcheckboxval(name,id){
	$("input[name='"+name+"']").click(function(){
		var res = [];
		var cur_d = this;
		if($(this).attr("diff_id") == "0") {
			if($(this).is(':checked')){
                res.push($(this).val());
			}else{
                res.push("");
			}
		} else {
			$("input[name='"+name+"']").each(function(){
				if($(this).is(':checked') && $(this).attr("diff_id") != "0"){
					res.push($(this).val());
				}
			});

		} 
		
		$('#'+id).val(res);
	});
}

/**
  * 多选赋值 $(".text3 input").on("click", checkHandle);
  * 直接调用方法 
  * 操作 wxl 
***/
function checkHandle() {
	var doc_name = this.name;
	$('#'+doc_name).val("");
	$('#'+doc_name).text("");
	$("input[name='"+doc_name+"']:checked").each(function () {
		$('#'+doc_name).append(this.value + ",");
	})
	var res = $('#'+doc_name).text();
	if(res.indexOf(',')>0){
		res = res.substr(0,res.length-1);
	}
	$('#'+doc_name).val(res);
}

/**
  * 菜单折叠/展开
  * 直接调用方法 
  * id:当前序号；num菜单总数；flag:m是手机端，需要调用myScroll.scrollToElement进行内容定位显示
  * 操作 wxl 
***/
function showhidden(id,num,flag){
	for(var i=1;i<=num;i++){
		if(id==i){//展开,icon-up
			if($('.cls'+i+'_s').hasClass('hidden')){
				$('.cls'+i+'_s').removeClass('hidden');
			}else{
				$('.cls'+i+'_s').addClass('hidden');
			}
			if($('.font'+i).hasClass('icon-up')){
				$('.font'+i).removeClass('icon-up');
				$('.font'+i).addClass('icon-down');
			}else{
				$('.font'+i).removeClass('icon-down');
				$('.font'+i).addClass('icon-up');
			}
		}else{//隐藏,icon-down
			$('.cls'+i+'_s').addClass('hidden');
			$('.font'+i).removeClass('icon-up');
			$('.font'+i).addClass('icon-down');
		}
	}
	if(flag=="m"){
		myScroll.scrollToElement('.cls'+id, 100);
	}
}









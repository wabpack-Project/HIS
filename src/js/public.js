// JavaScript Document
$(function() {
	
	/*
	 * 购物车效果	 
	 */
	jQuery.navlevel2 = function(level1, dytime, classz) {

		$(level1).mouseenter(function() {
			varthis = $(this);
			delytime = setTimeout(function() {
				varthis.find(classz).show();
			}, dytime);

		});
		$(level1).mouseleave(function() {
			clearTimeout(delytime);
			$(this).find(classz).hide();
		});

	};
	var mallz = $("div.mallz");
	$.navlevel2("#shopcart", 100, mallz);
	
	/*
	 * 文章展开 
	 */
	$("p#zk_content").click(
		function(){
			
			if($("#guide_content").attr("class")!="replacecontent"){
				
				$("#guide_content").addClass("replacecontent");	
				$("#guide_content").css("height","auto");
			} else {
				$("#guide_content").css("height","90px");
				$("#guide_content").removeClass("replacecontent");		
			}
			
		}
	);
	
});

/*
 * 删除购物车商品 
 */
 
function removeProduct(i) {
	$("#product" + i).fadeOut(500);
}


$(document).ready(function(){
	/*自动登录*/
	$(".autologin").click(function() {
		login();
	});
	
	$(".create_from").click(function() {
		$(this).attr("disabled","disabled");
		$("#auto_id").val($(this).attr("attr_id"));
		$("#auto_action").val($(this).attr("attr_action"));
		$("#auto_value").val($(this).attr("attr_value"));
		$("#auto_create_form").attr("action",$(this).attr("attr_form_action"));
		document.auto_create_form.submit();
	});
	
	/**
	  * 信息引导操作
	  * 引导class是info_guide， 可添加父级元素 guide_relative 
	  * 操作 lx 
	***/
	$(".info_guide").hover(
		function(e){
			// 控制显示
			$(this).addClass("on");
			// 判断父级元素是否存在
			if($(this).parents(".guide_relative").length != 0) {
				// 定义变量
				var parent_w = $(this).parents(".guide_relative").outerWidth(true),	// 相对元素宽度
					curr_l	 = $(this).offset().left - $(this).parents(".guide_relative").offset().left;	// 居左距离
			} else {
				// 定义变量
				var parent_w = $(this).parent().outerWidth(true),	// 相对元素宽度
					curr_l	 = $(this).offset().left - $(this).parent().offset().left;	// 居左距离
			}
			
			
			// 判断是否超出屏幕	
			if(parent_w > ($(this).children(":last").outerWidth(true) + curr_l)){
				$(this).children(":last").css("left", "0");	
			} else {
				$(this).children(":last").css("right", -(parent_w - curr_l - $(this).outerWidth(true) - 5));	
			}
			
			//alert('mouseenter function is running !');
		}, function(e){
			//控制隐藏
			$(this).removeClass("on");
			
			//alert('mouseleaver function is running !');
		}
	);
	
	$(".info_guide1").hover(
		function(e){
			// 控制显示
			$(this).addClass("on");
			// 判断父级元素是否存在
			if($(this).parents(".guide_relative").length != 0) {
				// 定义变量
				var parent_w = $(this).parents(".guide_relative").outerWidth(),	// 相对元素宽度
					curr_l	 = $(this).offset().left - $(this).parents(".guide_relative").offset().left;	// 居左距离
			} else {
				// 定义变量
				var parent_w = $(this).parent().outerWidth(),	// 相对元素宽度
					curr_l	 = $(this).offset().left - $(this).parent().offset().left;	// 居左距离
			}
			
			
			// 判断是否超出屏幕	
			if(parent_w > ($(this).children(":last").outerWidth() + curr_l)){
				$(this).children(":last").css("left", "0");	
			} else {
				$(this).children(":last").css("right", -(parent_w - curr_l - $(this).outerWidth() - 5));	
			}
			
			//alert('mouseenter function is running !');
		}, function(e){
			//控制隐藏
			$(this).removeClass("on");
			
			//alert('mouseleaver function is running !');
		}
	);
	
});

/**
  * 信息引导
  * func_main.php 调用 
  * obj 当前元素
  * 操作 lh 
***/
function informationGuide(obj){
		
	if($(obj).find("div").eq(0).is(":hidden")){
		$(obj).find("div").eq(0).show()	;
	}else{
		$(obj).find("div").eq(0).hide()	;
	}
   
}

/**
 * 弹出层JS
 * 17年5月24日
 * dName 弹出的图层
 * bName 弹出图层的按钮
 * **/
function popups_trig(dName,bName){
	$(bName).click(function(){
        popups_trig_h(dName);
	});
}


/**
 * 弹出层JS
 * 去除点击事件，直接掉用方法即弹出
 * * dName 弹出的图层
 * 17年5月27日
 * **/
function popups_trig_h(dName){
    $(dName).show();
    var dialog_width = -($(dName).find('.popups1705_wrap').width())/2;
    var dialog_height = -($(dName).find('.popups1705_wrap').height())/2;
    $(dName).find('.popups1705_wrap').css({'margin-top':dialog_height,'margin-left':dialog_width});

    $('.message_close, .close').click(function(){
        $(this).parents('.popups1705').hide();
    })
}
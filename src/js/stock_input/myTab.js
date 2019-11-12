// JavaScript Document
;(function($, window, document, undefined) {

	$.fn.extend({
		// 选项卡切换
		myTab : function (tabEl, opts) {
			var defult = {
				parent 	  		: "",						// 对应内容的元素
				parentChildEl	: "li",						// 内容子元素
				currNum	  		: null,						// 设置选中第几个
				pickClass 		: "hover",					// 选中后添加的class
				tabChildEl		: "li",						// 菜单子元素
			};
			var setting = $.extend({}, defult, opts || {});
			// 
			$(this).find(setting.tabChildEl).on("click",function(){
				var $this = $(this);
				var $index = $this.index();
				$this.addClass(setting.pickClass).siblings().removeClass(setting.pickClass);
				$(tabEl).children(setting.parentEl).eq($index).show().siblings().hide();//切换标签对应的内容
			});

			// 获取当前选中标签
			setting.currNum = $("."+setting.pickClass).index();
			
			//判断进入页面显示那个标签样式和内容
			if(!setting.currNum){
				
				$(this).find(setting.tabChildEl).eq(0).click();
				
			} else {
				
				$(this).find(setting.tabChildEl).eq(setting.currNum).click();
				
			}
			
		}
		
	});
	
})(jQuery, window, document);





























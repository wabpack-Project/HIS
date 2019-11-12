// JavaScript Document
;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
			//事件触发设置
			trigMethod : "popup", //触发事件 默认：popup, accordion,
			isTrigger : false, //是否触发
			//手风琴导航参数
			accordionBody : ".accordion li > .sub-menu",
			openImg : "../images/min5821.jpg",
			closeImg : "../images/add5821.png",
			firstOpen : ".accordion > li",
			isOpen : false,
			//弹出层参数
            effect : 'middle', // top, bottom, left, right, middle
			setTimer : "", //设置定时器时间
			popupId : "#top", //弹出层触发id
			popupClass : ".top", //弹出层调用class
			maskClass : ".mask", //阴影调用class
			maskOpt : true, //阴影调用class
			closeClass : ".close", //关闭调用class
			closeCurr : "", //关闭当前窗口
			trigClose : ".close", //触发关闭调用class
			isScrollBar : false, //是否滚动 默认true
			isShow : true, //是否显示 默认true
			Vertical : "middle",  	//垂直位置  默认middle top, bottom, other 
			Horizontal : "center",  	//水平位置  默认center  left, right
			ver_dist : 0, 				//垂直距离
			hor_dist : 0				//水平距离
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
		//手风琴事件
		accordion : function() {
			//参数赋值
			// Store variables
			var accordion_head = this.$element,
				accordion_body = this.options.accordionBody,
				first_open = this.options.firstOpen,
				isOpen = this.options.isOpen,
				openImg = this.options.openImg,
				closeImg = this.options.closeImg,
				isTrigger = this.options.isTrigger;
			//手风琴点击事件
			var accordionClick = function(event) {
				// Disable header links
				event.preventDefault();
				// Show and hide the tabs on click
				if ($(this).attr('class') != 'level1 active' || $(this).attr('class') != 'active'){
					$(accordion_body).slideUp('slow');
					$(accordion_head).children("img").attr("src", closeImg);
					if(isOpen){
						$(this).parent().next().stop(true,true).slideToggle('slow');
						$(this).children("img").attr("src", openImg);
					} else {
						$(this).next().stop(true,true).slideToggle('slow');	
					}
					$(accordion_head).removeClass('active');
					$(this).addClass('active');
				} else {
					$(accordion_body).slideUp('slow');
					$(accordion_head).removeClass('active');
				}	
				
			}	
			// Open the first tab on load
			if(isOpen){
				if($(first_open).find("a.active").length > 0){
					$(first_open).find("a.active").parent().next().slideDown('normal');	
					$(first_open).find("a.active").children("img").attr("src", openImg);
				} 
			} else {
				if ($(first_open).find("a.hover").length>0){
					$(first_open).find("a.hover").parent().parent().parent().find("a").first().addClass('active').next().slideDown('normal');
				} else {
					$(accordion_head).first().addClass('active').next().slideDown('normal');
				}
			}
			// Click function
			$(accordion_head).on('click', accordionClick);
		},
		//弹出层方法
        Popup: function() {
			//参数赋值
			var eleName = this.$element;
			var layout = this.options.effect;
			var setTimer = this.options.setTimer;
			var popup_Name = this.options.popupClass;
			var mask_Name = this.options.maskClass,
				maskOpt = this.options.maskOpt;
			var close_Name = this.options.closeClass;
			var curr_Name = this.options.closeCurr;
			var trig_Name = this.options.trigClose;
			var isScrollBar = this.options.isScrollBar;
			var isTrigger = this.options.isTrigger;
			var isShow = this.options.isShow;
			var vertical = this.options.Vertical;
			var horizontal = this.options.Horizontal;
			var ver_dist = this.options.ver_dist;
			var hor_dist = this.options.hor_dist;
			var scrollTop = $(document).scrollTop();
			
		
			//弹出层显示事件（自己写样式）
			var showClick = function(){
				scrollTop = $(document).scrollTop();
				$(popup_Name).css("display", "block");
				$(mask_Name).css("display", "block");
				
				//判断滚动条
				if (document.documentElement.clientHeight < document.documentElement.offsetHeight) 
					isScrollBar = true;
					
				if(isScrollBar){
					$("html").height("100%");
					$("body").height("100%");
					$("html").css("overflow-y", "hidden");
					$(mask_Name).css("top", scrollTop);
				}
				
				if(setTimer != ""){
					setTimeout(hideClick,setTimer);
				}
				
				//是否关闭当前
				if(curr_Name != ""){
					$(curr_Name).css("display", "none");	
				}
				
				//点击阴影是否关闭弹出
				if(maskOpt){
					$(mask_Name).on("click", hideClick);	
				}
				
				verticalHandle();
				horizontalHandle();

			}
			
			//垂直位置事件
			var verticalHandle = function(){
				if(vertical != "top" && vertical != "bottom"){
					//vertical = "middle";	
				}
				switch(vertical)
				{
					  case "top":
					  	$(popup_Name).css("top","0");
						if(ver_dist != ""){
							
							if($(popup_Name).height() > $(window).height() - 80){
								
								if(scrollTop > 0){
									$(popup_Name).css("top", scrollTop + ver_dist);
									$(popup_Name).css("height", $(window).height() - ver_dist*2);
								} else {
									$(popup_Name).css("top", ver_dist);	
									$(popup_Name).css("bottom", ver_dist);	
								}
							} else {
									
								if(scrollTop > 0){
									$(popup_Name).css("top", ($(window).height() - $(popup_Name).height())/2 + scrollTop );	
								} else {
									$(popup_Name).css("top", "50%");
									$(popup_Name).css("margin-top", - $(popup_Name).height() / 2);
								}
							}

						}
					  	break;
					  case "bottom":
					  	$(popup_Name).css("bottom","0");
						if(ver_dist != ""){
							$(popup_Name).css("bottom", ver_dist);	
						}
					  	break;
					  case "middle":
					  	$(popup_Name).css("top", "50%");
					  	$(popup_Name).css("margin-top", - $(popup_Name).height() / 2);	
						if(scrollTop > 0){
							$(popup_Name).css("top", scrollTop + $(window).height()/2);	
						}
					  	break;
					  default:
					  	$(popup_Name).css("top", ver_dist);
					  	if(scrollTop > 0){
							var pop_height = document.body.clientHeight - ver_dist*2;
							ver_top = scrollTop + ver_dist;
							$(popup_Name).css("top", ver_top);
							$(popup_Name).css("height", pop_height);	
						} 
					  	break;
				}
			}
			
			//水平位置事件
			var horizontalHandle = function(){
				if(horizontal != "left" && horizontal != "right"){
					horizontal = "center";	
				}
				switch(horizontal)
				{
					  case "left":
					  	$(popup_Name).css("left","0");
						if(hor_dist != ""){
							$(popup_Name).css("left", hor_dist);
						}
					  	break;
					  case "right":
					  	$(popup_Name).css("right","0");
						if(hor_dist != ""){
							$(popup_Name).css("right", hor_dist);
						}
					  	break;
					  case "center":
					  	$(popup_Name).css("left", "50%");
						$(popup_Name).css("margin-left", - $(popup_Name).width() / 2);
					  	break;
					  default:
					  	
					  	break;
				}	
			}
			
			//弹出层隐藏事件（自己写样式）
			var hideClick = function(){
				if(isScrollBar){
					$("html").height("auto");
					$("body").height("auto");
					$("html").css("overflow-y", "scroll");
				}
				$(popup_Name).css("display", "none");
				if(curr_Name == ""){
					$(mask_Name).css("display", "none");
				}
			}
			
			//是否自动触发
			if(isTrigger){
				showClick();	
			}
			
			//是否显示
			if(!isShow){
				hideClick();	
			}
			
			//点击触发显示事件
			$(eleName).on("click", showClick);
			
			//点击关闭触发隐藏事件
			$(close_Name).on("click", hideClick);
			
			//点击触发关闭事件
			$(trig_Name).on("click", hideClick);
            
        }
		//end
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
		if(options.trigMethod == "accordion"){
        //调用其方法
			return beautifier.accordion();
		} else if(options.trigMethod == "accordion1") {
			
		} else {
			//调用其方法
			return beautifier.Popup();	
		}
    }
})(jQuery, window, document);
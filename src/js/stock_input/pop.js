// JavaScript Document
;(function($, window, document,undefined) {
/*--------------------------------------------------------------------------------------------*/

    // 默认参数设置		
    var popCoverDefault = {
		title		: "对话框",
		shut		: "×",
		index		: 2000,
		opacity		: 0.5,
		
		width		: "86%",	// 主体元素的宽度
		height		: "auto",	// 主体元素的高度
		setTop		: 50,		// 设置主题元素距离顶部的距离
		pop_per		: 0.8,		// 设置主体元素占窗口的百分比
		
		pBar		: "", 	// 头部
		pAdorn		: "", 	// 修饰
		pSearch		: "", 	// 表单检索
		pCont		: "", 	// 内容
		pOperate	: "",	// 底部操作
		pTip		: "",	// 提示
		
		sureBtn		: "",	// 确定按钮
		cancelBtn	: "",	// 取消按钮
		
		bar			: true, // 是否显示标题栏
		mask 		: true, // 是否显示半透明背景
		btnClose	: true, // 是否显示关闭按钮
		skin		: "",	// 皮肤样式
		
		fix			: false, // 是否弹出框固定在页面上
		maskClose	: false,  // 是否点击半透明背景隐藏弹出框
		drag		: false, // 是否可拖拽
		isAnimate	: false, // 是否支持动画
		
		ajaxTagA	: true,   // 是否a标签默认Ajax操作
		
		protect		: "auto", // 保护装载的内容
		
		onshow		: $.noop, // 弹窗显示后触发事件
		onclose		: $.noop, // 弹窗关闭后触发事件
		
		delay		: 0 //弹窗打开后关闭的时间, 0和负值不触发
	};
	
	// 遮罩层和弹出层元素
	var popDom = '<div id="pop-mask" onselectstart="return false;"></div>' + 
		'<div class="pop-out" id="pop-out" >' +
			'<div class="pop-in" id="pop-in" >' +
				'<div id="pop-bar" class="pop-bar" onselectstart="return false;">' +
					'<h4 id="bar-title" class="bar-title"></h4>' +
					'<div class="pop-close"><a href="javasctipt:" id="pop-close" title="关闭"></a></div>' +	
				'</div>' +
				'<div class="pop-adorn" id="pop-adorn"></div>' +
				'<div class="pop-search" id="pop-search"></div>' +
				'<div class="pop-cont" id="pop-cont"></div>' +
				'<div class="pop-operate" id="pop-operate"></div>' +
			'</div>' +
		'</div>';
	
	// 调用方法主体
	$.popCover = function(elements, options) {
		// 接收参数
		var opt = $.extend({}, popCoverDefault, options || {});
		
		// 弹框的显示
		var eleOut = $("#pop-out"), eleBlank = $("#pop-mask");
		
		// 判断弹出层是否存在
		if (eleOut.size()) {	// 不存在
			eleOut.show();	
			eleBlank[opt.bg? "show": "hide"]();	// 判断是否显示遮罩，并调用相应的方法
		} else {				// 存在插入固定元素
			$("body").append(popDom);	
		}
		
		// 判断是否传入元素
		if (typeof(elements) === "object") {
			elements.show();
		} else {
			elements = $(elements);
		}
		
		//一些元素对象
		$.o = {
			s			: opt,
			el			: elements,
			mask		: eleBlank.size()? eleBlank: $("#pop-mask"), 
			popOut		: eleOut.size()? eleOut: $("#pop-out"), 
			popClose	: $("#pop-close"),	// 关闭按钮
			barTit		: $("#bar-title"),	// 弹出标题
			popBar		: $("#pop-bar"), 	// 头部
			popAdorn	: $("#pop-adorn"),	// 修饰 
			popSearch	: $("#pop-search"),	// 表单检索 
			popCont		: $("#pop-cont"), 	// 内容
			popOperate	: $("#pop-operate"),	// 底部操作
		};
		
		// 判断遮罩和弹出不存在跳出
		if (!$.o.mask.size() || !$.o.popOut.size()) {
			return;	
		}
		
		// 判断头部传入固定元素
		if(opt.pBar) {	// 载入传入对象
			$.o.popBar.html(opt.pBar);
		} else { // 默认值
			// 标题以及关闭内容
			$.o.barTit.html(opt.title);
			$.o.popClose.html(opt.shut);	
		}
		
		// 清除默认加载中样式
		$.o.popOut.removeAttr("style");
		
		// 判断内容传入固定元素
		if(opt.pCont) {		// 载入传入对象
			$.o.popCont.html(opt.pCont);
		} else {
			// 装载元素
			$.o.popCont.empty().append(elements);	
		}
		
		// 判断修饰传入固定元素
		if(opt.pAdorn) {	// 载入传入对象
			$.o.popAdorn.html(opt.pAdorn);
		}
		
		// 判断表单检索传入固定元素
		if(opt.pSearch) {	// 载入传入对象
			$.o.popSearch.html(opt.pSearch);
		}
		
		// 判断底部操作传入固定元素
		if(opt.pOperate) {		// 载入传入对象
			$.o.popOperate.html(opt.pOperate);
		}
		
		// 判断是否需要自定义皮肤
		if(opt.skin) {
			$.o.popOut.addClass(opt.skin)
		}
		
		// 设置尺寸
		$.popCover.setSize();
		
		// 设置定位定位
		$.popCover.setPosition();
		
		// 判断不浮动的操作
		if (opt.fix) {
			$.popCover.setFixed();
		}
		
		// 判断是否拖拽的操作
		if (opt.drag) {
			$.popCover.drag();	
		} else {
			$(window).resize(function() {
				$.popCover.setPosition();					  
			});	
		}
		
		// 判断是否显示标题栏
		if (!opt.bar) {
			$.popCover.barHide();	
		} else {
			$.popCover.barShow();	
		}
		
		// 判断阴影是否显示
		if (!opt.mask) {
			$.popCover.bgHide();
		} else {
			$.popCover.bgShow();
		}
		
		// 判断是否显示关闭按钮， 并执行相应操作
		if (!opt.btnClose) {
			$.popCover.closeBtnHide();	
		} else {
			// console.log($.o.popClose);
			$.o.popClose.on("click", function() {
				$.popCover.hide();
				return false;
			});
		}

		// 判断点击阴影是否可以关闭
		if (opt.maskClose) {
			$.popCover.bgClickable();	
		}
		
		// 处理弹框关闭时间
		if (opt.delay > 0) {
			setTimeout($.popCover.hide, opt.delay);	
		}
		
		// 判断弹出后， 调用的方法
		if ($.isFunction(opt.onshow)) {
			opt.onshow();
		}

	}
	
	$.extend($.popCover, {
		// 设置尺寸
		setSize: function() {
			// 判断弹出不存在跳出
//			if (!$.o.popOut.size()) {
//				return;	
//			}
			//主体内容的尺寸
			$.o.popOut.css({
				"width"	 : $.o.s.width,
				"height" : $.o.s.height
			});
						
			return $.o.popOut;
		},
		
		// 设置定位
		setPosition: function(flag) {
			// 判断遮罩和弹出不存在跳出
//			if (!$.o.mask.size() || !$.o.popOut.size()) {
//				return;	
//			}
			// 处理是否支持动画
			flag = flag || false;
			// 获取当前主体元素的尺寸
			var pout = {
				o_h : $.o.popOut.outerHeight(),							// 获取弹窗整体高度
				h 	: $.o.popOut.height(),								// 获取弹窗实际高度
				d_h : $.o.popOut.outerHeight() - $.o.popOut.height(),	// 获取弹窗高度差
				o_w : $.o.popOut.outerWidth(),							// 获取弹窗整体宽度
				w 	: $.o.popOut.width(),								// 获取弹窗实际宽度
				d_w : $.o.popOut.outerWidth() - $.o.popOut.width(),		// 获取弹窗宽度差
			}
			
			// 获取窗口宽度、 高度 、距离顶部距离 、当前窗口文档高度
			var w = $(window).width(), h = $(window).height(), st = $(window).scrollTop(), ph = $("body").height();
			
			// 判断当前窗口文档高度小于窗口高度， 把文档高度设成窗口高度
			if (ph < h) {
				ph = h;	
			}
			
			// 主体内容的位置
			var xh = pout.o_h;
			// 计算出距离左侧和顶部距离
			var t = st + (h - xh)/2, 
				l = (w - pout.o_w)/2;
				
			// 判断弹出高度是否超出可视窗口高度
			if(xh + st > ph) {
				ph = st + xh;
				// 弹出是否在最顶部	
				if(t < $.o.s.setTop) {
					ph = st + xh + $.o.s.setTop * 2;
					t = $.o.s.setTop;
				} 
			
			} else {
				//ph = ph;	
			}
			
			// 判断浮动状态下， 部分内容重新加载， 且弹出高度不超出 当前屏幕高度
			if($.o.s.fix && window.XMLHttpRequest) {
				
				// 判断超出屏幕处理
				if(xh + $.o.s.setTop > h) {
					xh = h * $.o.s.pop_per;
					con_h = xh - pout.d_h - $.o.popBar.outerHeight(); 
					$.o.popCont.css({
						"overflow-y"	: "scroll",
						height			: con_h
					});	
				}
				
				t = (h - xh)/2;
			} 

			
			// 设置遮罩的宽度、 高度 和透明度
			$.o.mask.width(w).height(ph).css("opacity", $.o.s.opacity);
			
			// 判断是否支持动画
			if (flag === true) {
				$.o.popOut.animate({
					top: t,
					left: l
				});
			} else {
				$.o.popOut.css({
					top: t,
					left: l,
					zIndex: $.o.s.index
				});
			}
			
			return $.o.popOut;
		},
		
		// 浮动
		setFixed: function() {  // 此方法待处理
			// 判断不存在跳出
			if (!$.o.popOut || !$.o.popOut.size()) {
				return;	
			}
			// 判断页面是否发送请求， 以及对应处理
			if (window.XMLHttpRequest) {	// 发送请求
				$.popCover.setPosition().css({
					position: "fixed"			
				});
			} else {	// 不发送请求
				$(window).scroll(function() {
					$.popCover.setPosition();						  
				});
			}
			return $.o.popOut;
		},
		
		//背景可点击
		bgClickable: function() {
			if ($.o.mask && $.o.mask.size()) {
				$.o.mask.click(function() {
					$.popCover.hide();
				});
			}
		},
		//背景隐藏
		bgHide: function() {
			if ($.o.mask && $.o.mask.size()) {
				$.o.mask.hide();
			}
		},
		//背景层显示
		bgShow: function() {
			if ($.o.mask && $.o.mask.size()) {
				$.o.mask.show();
			} else {
				$('<div id="zxxBlank"></div>').prependTo("body");	
			}
		},
		//标题栏隐藏
		barHide: function() {
			if ($.o.popBar && $.o.popBar.size()) {
				$.o.popBar.hide();
			}
		},
		
		// 标题栏显示
		barShow: function() {
			if ($.o.popBar && $.o.popBar.size()) {
				$.o.popBar.show();
			}
		},
		
		// 关闭按钮隐藏
		closeBtnHide: function() {
			if ($.o.popClose && $.o.popClose.size()) {
				$.o.popClose.hide();
			}
		},
		
		// 弹框隐藏
		hide: function() {
			if ($.o.el && $.o.popOut.size() && $.o.popOut.css("display") !== "none") {
				$.o.popOut.fadeOut("fast", function() {
					// 此处存在问题
					if ($.o.s.protect && (!$.o.el.hasClass("wrap_remind") || $.o.el.attr("id"))) {
						$.o.el.hide().appendTo($("body"));
					}
					$(this).remove();
					if ($.isFunction($.o.s.onclose)) {
						$.o.s.onclose();
					}
				});
				if ($.o.mask.size()) {
					$.o.mask.fadeOut("fast", function() {
						$(this).remove();								
					});
				}
			}
			return false;
		},
		
		// 拖拽
		drag: function() {
			if (!$.o.popOut.size() || !$.o.popBar.size()) {
				$(document).unbind("mouseover").unbind("mouseup");
				return;
			}
			var bar = $.o.popBar, out = $.o.popOut;
			var drag = false;
			var currentX = 0, currentY = 0, posX = out.css("left"), posY = out.css("top");
			bar.mousedown(function(e) {
				drag = true;
				currentX = e.pageX;
				currentY = e.pageY;							 
			}).css("cursor", "move");	
			$(document).mousemove(function(e) {
				if (drag) {
					var nowX = e.pageX, nowY = e.pageY;
					var disX = nowX - currentX, disY = nowY - currentY;
					out.css("left", parseInt(posX) + disX).css("top", parseInt(posY) + disY);
				}					   
			});
			$(document).mouseup(function() {
				drag = false;
				posX = out.css("left");
				posY = out.css("top");
			});
		},
		
		//预载
		insertPrompt : function(el, opt) {
			$(opt.pTip).html(el);
			// 处理提示消失时间
			if (opt.delay > 0) {
				setTimeout(function(){
					$(el).remove();	
				}, opt.delay);	
			}
		},
		
		//预载
		loading: function() {
			var element = $('<div class="wrap_remind">加载中...</div>');
			// 参数带入主函数处理
			$.popCover(element, { bar: false });
		},
		
		//ask询问方法
		ask: function(message, options, sureCall, cancelCall) {
			
			// 接收参数
			var options = options || {};
			
			var element = $('<div class="wrap_remind">'+message+'<p><button id="zxxSureBtn" class="submit_btn">确认</button>&nbsp;&nbsp;<button id="zxxCancelBtn" class="cancel_btn">取消</button></p></div>');
			
			// 参数带入主函数处理
			$.popCover(element, options);
			
			// 判断要绑定事件的元素
			options.sureBtn 	= options.sureBtn || "#zxxSureBtn";
			options.cancelBtn 	= options.cancelBtn || "#zxxCancelBtn";
			
			//回调方法
			$(options.sureBtn).click(function() {
				// 判断传入确定的方法，并执行
				if ($.isFunction(sureCall)) {
					sureCall.call(this);
				}						
			});
			$(options.cancelBtn).click(function() {
				// 判断传入取消的方法，并执行
				if (cancelCall && $.isFunction(cancelCall)) {
					cancelCall.call(this);
				}
				// 隐藏弹出
				$.popCover.hide();							  
			});	
		},
		
		//remind提醒方法
		remind: function(message, options, callback) {
			
			// 接收参数
			var options = options || {};
			
			// 判断是否传入提醒消息
			if ($.type(message) === "string") {
				// 设置默认内容提醒格式
				var element = $('<div class="wrap_remind">'+message+'<p><button id="zxxSubmitBtn" class="submit_btn">确认</button></p></div>');
				// 判断插入页面位置
				if(options.pTip) {
					var tipEl = $('<div class="remind-tip">'+message+'</div>');
					$.popCover.insertPrompt(tipEl, options);
					return;	
				}
			} else if($.type(message) === "object") {
				// 自定义提醒格式
				var element = message;	
				// 判断插入页面位置
				if(options.pTip) {
					$.popCover.insertPrompt(element, options);
					return;	
				}
			} else {
				// 既没有默认提醒消息，也没有自定义提醒格式则跳出
				return;
			}
			
			// 参数带入主函数处理
			$.popCover(element, options);
			
			// 判断要绑定事件的元素
			options.sureBtn = options.sureBtn || "#zxxSubmitBtn";
			
			// 绑定点击确定事件
			$(options.sureBtn).click(function() {
				// 回调方法
				if (callback && $.isFunction(callback)) {
					callback.call(this);	
				}
				// 隐藏弹出
				$.popCover.hide();							  
			});
				
		},
		
		//uri Ajax方法
		ajax: function(uri, params, options) {
			if (uri) {
				$.popCover.loading();
				options = options || {};
				options.protect = false;
				$.ajax({
					url: uri,
					data: params || {},
					success: function(html, other) {
						$.popCover(html, options);
					},
					error: function() {
						$.popCover.remind("加载出了点问题。");	
					}
				});	
			}
		},
		
	});
	
    // 在插件中使用popBox对象
    $.fn.popCover = function(options) {	
		options = options || {};
		var opt = $.extend({}, popCoverDefault, options);
		return this.each(function() {
			// 获取节点名称，并转换成小写		
			var node = this.nodeName.toLowerCase();
			// 判断是不是a标签，并且默认Ajax操作
			if (node === "a") {
				// 判断是否默认Ajax操作
				if(opt.ajaxTagA) {
					// 给a标签绑定点击事件
					$(this).click(function() {
						// 获取A标签的href属性， 并去掉前后空格
						var href = $.trim($(this).attr("href"));
						// 判断A标签存在， 且不是脚本元素
						if (href && href.indexOf("javascript:") != 0) {
							// 判断A标签的href属性包含#， 且在第一个位置出现
							if (href.indexOf('#') === 0) {
								$.popCover($(href), options);
							} else {
								// 加载图片
								$.popCover.loading();
								// 定义图片对象
								var myImg = new Image(), element;
								// 图片加载完成
								myImg.onload = function() {
									// 图片存在， 获取图片的宽和高
									var w = myImg.width, h = myImg.height;
									// 判断图片的宽大于0， 确保图片存在
									if (w > 0) {
										// 判断图片的宽度超出屏幕以及处理
										if(w > $(window).width()) w = $(window).width() * opt.pop_per;
										// 定义图片元素
										var element = $('<img src="'+ href +'" width="'+ w +'"  />');
										// 装载内容不保护
										opt.protect = false;
										$.popCover(element, options);
									}
								};
								// 图片加载出错
								myImg.onerror = function() {
									//显示加载图片失败
									$.popCover.ajax(href, {}, options);
								};
								myImg.src = href;
							}
						}	
						return false;
					});
				} else {
					$.popCover($(this).clone(), options);		
				}
			} else {	// 不是A标签， 执行操作
				$.popCover($(this), options);	
			}
		});				
	};
	
})(jQuery, window, document);
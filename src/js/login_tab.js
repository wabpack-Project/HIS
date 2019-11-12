$(function() {
	// 设计案例切换
	$('.title-list li').mouseover(function() {
		var obj = $("#sbm_signup");		
		var liindex = $('.title-list li').index(this);
		$(this).addClass('on').siblings().removeClass('on');
		// $('.product-wrap
		// div.product').eq(liindex).fadeIn(150).siblings('div.product').hide();
		var liWidth = $('.title-list li').width();
		$('.case .title-list p').stop(false, true).animate({
			'left' : liindex * liWidth + 'px'
		}, 300);
		if (liindex == 0) {
			$("#is_doctor").val("2");
			if (obj.length > 0) {
				$(".login_input_3").val("医生/律师注册");
			} else {
				$(".login_input_3").val("医生/律师登录");
			}

		} else if (liindex == 1) {
			$("#is_doctor").val("0");

			if (obj.length > 0) {
				$(".login_input_3").val("会员注册");
			} else {
				$(".login_input_3").val("会员登录");
			}

		}
	});

	// 设计案例hover效果
	/*
	 * $('.product-wrap .product li').hover(function(){
	 * $(this).css("border-color","#ff6600"); $(this).find('p >
	 * a').css('color','#ff6600'); },function(){
	 * $(this).css("border-color","#fafafa"); $(this).find('p >
	 * a').css('color','#666666'); });
	 */
});
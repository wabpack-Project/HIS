(function($){
    function Loading(el,options){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        function S4guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        this.el = el;
        winwidth = $(window).width();
        winheight = $(window).height();

        this.document= $(document);
        this.options ={
            start:'loading',
            loadingType:'absolute',
            loadingZindex:9999,
            loadingImg:'data:image/gif;base64,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',
            loadingBgColor:'#000',
            loadingBgOpacity:0.3,
            loadingImgSize:'36px',
            loadingFontSize:'16px',
            loadingPadding:'15px',
            loadingText:'页面加载中，请稍后...',
            windowScroll:false,
//          loadingErrorType:'icon',
            loadingErrorIcon:'&#xe659;',
            loadingErrorIconSize:'48px',
            loadingErrorIconColor:'#DA4453',
            loadingErrorText:'访问出错啦，请刷新试试吧',
        }
        for(var i in options){
            this.options[i]=options[i];
        }
        var me = {};
        this.id = S4guid();
        if(this.el.children('div[data-class="loading"]').length == 0){
            this.el.append('<div id="'+ this.id +'" data-class="loading" style="display: none"></div>');
        }else{
            this.el.children('div[data-class="loading"]').attr('id',this.id);
        }
        this.load = $('#'+this.id);
        this._init();
        if(this.options.start == 'loading'){
            this.loadingstart();
        }else if(this.options.start == 'error'){
            this.errorstart();
        }else{
            alert('loading插件错误提示：this.options.start参数错误，只能设置loading或者error，请检查');
        }
    }
    Loading.prototype ={
        _init:function(){
            if(this.el.css('position') == 'static'){
                this.el.css('position','relative');
            }
        },
        loadingfix:function(html) {
            this.load.html(html);

            if (this.options.loadingType == 'absolute') {
                var basicsStyle = {
                    'position': 'absolute',
                    'left': '0px',
                    'right': '0px',
                    'top': '0px',
                    'bottom': '0px'
                };
            } else if (this.options.loadingType == 'inline') {
                var basicsStyle = {'position': 'relative'};
            }

            if (typeof(this.options.loadingBgOpacity) != "number" || this.options.loadingBgOpacity > 1) {
                this.options.loadingBgOpacity = 1;
            }
            this.load.css(basicsStyle);
            this.load.css('z-index', this.options.loadingZindex);
            this.bg = this.load.find('div[data-class="loading_bg"]');
            this.box = this.load.find('div[data-class="loading_box"]');
            this.img = this.load.find('div[data-class="loading_img"]');
            this.text = this.load.find('div[data-class="loading_text"]');
            if(this.options.loadingText == ''){
                this.text.remove();
                this.img.css('marginBottom','0px')
            }
            if (this.options.loadingType == 'absolute') {
                if (this.el.is('body') && !this.options.windowScroll) {
                    this.box.css({'position': 'fixed'});
                } else {
                    this.box.css({'position': ' absolute', 'left': '0', 'top': '0'});
                }
            } else if (this.options.loadingType == 'inline') {
                this.box.css({'position': ' relative', 'left': '0', 'top': '0'});
            }
            var userbase = {
                'background-color': this.options.loadingBgColor,
                'filter': 'alpha(opacity=' + this.options.loadingBgOpacity * 100 + ')',
                'opacity': this.options.loadingBgOpacity,
            };
            userbase = $.extend(userbase, basicsStyle);
            this.bg.css(userbase);
            var imghrefwidth = parseInt(this.options.loadingImgWidth);
            var imghrefheight = parseInt(this.options.loadingImgHeight);
            if (this.options.loadingType == 'absolute'){
                if (this.options.windowScroll) {
                    $('html').css({'height': '100%', 'overflow': 'hidden','padding-right':'17px'});
                }
            }
            this.load.show();
            var loadingwidth = this.box.outerWidth(true);
            var loadingheight = this.box.outerHeight(true);
            if (this.options.loadingType == 'absolute') {
                this.box.css({
                    'marginTop': -(loadingheight / 2) + 'px',
                    'marginLeft': -(loadingwidth / 2) + 'px',
                    'left': "50%",
                    'top': '50%'
                });
            }else if(this.options.loadingType == 'inline'){
                this.box.css({
                    'marginTop': 'auto',
                    'marginLeft': 'auto',
                    'left':'auto',
                    'top': 'auto',
                    'borderRadius':'0px'
                });
            }

        },
        loadingstart:function(){
            var html ='<div data-class="loading_box" style="padding:'+ this.options.loadingPadding+'">' +
                '<div data-class="loading_img"><img src="'+this.options.loadingImg+'" style="width:'+this.options.loadingImgSize+'" > </div>'+
                '<div data-class="loading_text" style="font-size: '+ this.options.loadingFontSize+'">'+this.options.loadingText+'</div>' +
                '</div>' +
                '<div data-class="loading_bg" style="z-index: 1;"></div>';
            this.loadingfix(html);
        },
        errorstart:function(){
            var html ='<div data-class="loading_box" style="padding:'+ this.options.loadingPadding+'">' +
                '<div data-class="loading_img">'+
                '<i class="xzlicon-font" style="font-size:'+this.options.loadingErrorIconSize+';color:'+this.options.loadingErrorIconColor +' ">'+this.options.loadingErrorIcon+'</i>' +
                '</div>'+
                '<div data-class="loading_text">'+this.options.loadingErrorText+'</div>' +
                '<a data-class="loading_refresh_btn" ><i class="xzlicon-font" >&#xe6a4;</i>刷新试试</a> '+
                '<a data-class="loading_close_btn" ><i class="xzlicon-font" >&#xe646;</i>关闭提示</a> '+
                '</div>' +
                '<div data-class="loading_bg" style="z-index: 1;"></div>';
            this.loadingfix(html);
            this.refreshbtn =this.load.find('a[data-class="loading_refresh_btn"]');
            this.closebtn =this.load.find('a[data-class="loading_close_btn"]');
            var _id = this.id;
            this.refreshbtn.click(function(){
                location.reload(true);
            })
            var windowScroll = this.options.windowScroll;
            this.closebtn.click(function(){
                $('#'+_id).remove();
                if(windowScroll){
                    $('html').css({'height': 'auto', 'overflow': 'auto'});
                }
            })
        },
        loadingremove:function(){
            this.load.remove();
            if(this.options.windowScroll) {
                $('html').css({'height': 'auto', 'overflow': 'auto'});
            }
        },
    };
    window.Loading = Loading;
})(jQuery);
(function ($) {
    window.jquerySelectCss = false;
    window.jqueryInputtipsCss = false;
    window.jqueryLoadingCss = false;
    window.selectheckboxCss = false;
    var tsrandom = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    }
    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    };
    $.fn.extend({
        "preventScroll": function () {
            $(this).each(function () {
                var _this = this;
                if (navigator.userAgent.indexOf('Firefox') >= 0) {   //firefox
                    _this.addEventListener('DOMMouseScroll', function (e) {
                        _this.scrollTop += e.detail > 0 ? 60 : -60;
                        e.preventDefault();
                    }, false);
                } else {
                    _this.onmousewheel = function (e) {
                        e = e || window.event;
                        _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                        return false;
                    };
                }
            })
        },
        "lkinputtips": function (options) {
            if (!window.jqueryInputtipsCss) {
                var _files = document.createElement("style"),
                    _filestext = '.lk_inp_tps{position:absolute;display:none;padding:5px 0}.lk_inp_tps_box{height:100%;box-sizing:border-box;padding:5px 0;overflow:auto;background-color:#fff;border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 0 6px 0 rgba(0,0,0,.04),0 2px 4px 0 rgba(0,0,0,.12)}.lk_inp_tps_box_sec_box{padding:6px;position:relative}.lk_inp_tps_box_sec_ipt{width:100%;display:block;padding:5px 7px;border:1px solid #bfcbd9;font-size:14px;outline:0;box-sizing:border-box;border-radius:4px;padding-right:28px}.lk_inp_tps_box_sec_ico{position:absolute;z-index:1;font-size:16px;width:16px;height:16px;line-height:16px;top:50%;margin-top:-8px;right:14px}.lk_inp_tps_box_sec_ipt:focus{border:1px solid #20a0ff}.lk_inp_tps_box_sec_ipt:focus+i.lk_inp_tps_box_sec_ico{color:#20a0ff}.transition-down{transition:height .3s ease-in-out,padding-top .3s ease-in-out,padding-bottom .3s ease-in-out}.transition-height{height:0!important;padding:0!important;padding-bottom:0!important;overflow:hidden!important}.lk_inp_tps{display:block}.lkinputtips-list-item{border-bottom:1px dashed #e9e9e9;cursor:pointer;line-height:36px;padding:0 10px;margin:0;cursor:pointer;color:#48576a;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px}.lkinputtips-list-item:hover{background-color:#e4e8f1}';
                _files.type = "text/css";
                if (_files.styleSheet) {         //ie下
                    _files.styleSheet.cssText = _filestext;
                } else {
                    _files.innerHTML = _filestext;       //或者写成 nod.appendChild(document.createTextNode(str))
                }
                document.getElementsByTagName("head")[0].appendChild(_files);
                window.jqueryInputtipsCss = true;
            }
            if (!window.jqueryLoadingCss) {
                var _files = document.createElement("style"),
                    _filestext = 'div[data-class=loading_box]{z-index:2;text-align:center;left:50%;top:50%;border-radius:10px;padding:30px;max-width:100%;background-color:#fff;box-sizing:border-box;line-height:normal}div[data-class=loading_img]{display:inline-block;margin-bottom:15px;line-height:normal}div[data-class=loading_img] img{display:inline-block;width:auto;line-height:normal}div[data-class=loading_text]{color:#666;line-height:normal}div[data-class=loading_box] a{display:inline-block;padding:8px 15px;font-size:14px;margin:0 5px;margin-top:20px;border-radius:4px;cursor:pointer}div[data-class=loading_box] a i{vertical-align:middle;margin-right:5px}a[data-class=loading_refresh_btn]{background-color:#0785fd;color:#fff;border:1px solid transparent}a[data-class=loading_close_btn]{background-color:#F9FAFC;color:#666;border:1px solid #D3DCE6}';
                _files.type = "text/css";
                if (_files.styleSheet) {         //ie下
                    _files.styleSheet.cssText = _filestext;
                } else {
                    _files.innerHTML = _filestext;       //或者写成 nod.appendChild(document.createTextNode(str))
                }
                document.getElementsByTagName("head")[0].appendChild(_files);
                window.jqueryLoadingCss = true;
            }
            options = $.extend(true, {
                entrance: 'focus',       //插件入口，focus or click
                secondorder: {
                    switchs: true,         //是否检测文本框value值变化   true or false
                    length: 2,           //检测文本框输入几个字符      Number
                    chineseword: false
                },
                ajaxParameter: {
                    switchs: true,        // 是否使用ajax请求          true or false
                    time: 300,             // ajax发送延时时间          number
                    type: 'POST',        // ajax请求的类型            get or post
                    global: false,       // 是否触发全局事件
                    url: '',              // ajax请求地址              string
                    data: '',
                    dataType: 'json',        // 请求数据类型
                    loading: true,        // 是否显示loading
                    ajaxBefore: function () {
                    },
                    beforeSend: function () {
                    }, // ajax传输前的函数      function
                    complete: function () {
                    },   // ajax请求回调函数      function
                    success: function () {
                    },    // ajax请求成功回调函数 需要返回值 返回值为json，html，数组
                    error: function () {
                    },      // ajax请求失败回调函数  function
                    sendajax: false
                },
                listseach: {
                    switchs: true,        //  下拉框是否显示            true or false
                    Zindex: 9999,
                    Maxwidth: '',        //  下拉框最大宽度            string
                    Maxheight: '200px',       //  下拉框最大高度            string
                    Clsname: '',         //   下拉框样式类名           string
                    listTagName: 'div',
                    checkbox: false,        //   下拉框是否多选       true or false
                    clickClass:'',
                    clickfn: function () {
                    } //  下拉框点击列时回调函数  function
                },
                selectfn: {
                    switchs: false,
                    data: ""
                }
            }, options);

            var a = options,
                b = $(this),
                d = 0,
                es = 0,
                fs = 0,
                ls = 0,
                h = '',
                xz = false,
                t = S4guid();
            var opts = {};
            opts.b = {}, opts.c = {};
            opts.b.a = options.secondorder.chineseword;
            opts.b.b = options.secondorder.chineselength;
            opts.c.a = options.selectfn.switchs;
            opts.c.b = options.selectfn.data;

            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            function S4guid() {
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            };
            function addlist(h) {
                var outbx = $('div[data-for="' + t + '"]');
                if (h == undefined) {
                    h = '';
                }
                var ht = '';
                ht += '<div class="lk_inp_tps ' + a.listseach.Clsname + '" data-for="' + t + '"  style="z-index: ' + a.listseach.Zindex + '">';
                ht += '<div class="lk_inp_tps_box">';
                ht += '<' + a.listseach.listTagName + ' class="lk_inp_tps_box_list">';
                ht += h;
                ht += '</' + a.listseach.listTagName + '>';
                ht += '</div>';
                ht += '</div>';
                if (outbx.length == 0) {
                    $(window.document.body).append(ht);
                    var outbx = $('div[data-for="' + t + '"]');
                    if (a.ajaxParameter.loading) {
                        if (outbx.find('div[data-class="loading"]').length == 0) {
                            outbx.find('.lk_inp_tps_box_list').html('');
                            ajaxloadings = new Loading(outbx.find('.lk_inp_tps_box_list'), {
                                "loadingType": "inline",
                                "loadingText": '',
                            });
                        }
                    }
                } else {
                    if (a.ajaxParameter.loading) {
                        if (outbx.find('div[data-class="loading"]').length == 0) {
                            outbx.find('.lk_inp_tps_box_list').html('');
                            ajaxloadings = new Loading(outbx.find('.lk_inp_tps_box_list'), {
                                "loadingType": "inline",
                                "loadingText": '',
                            });
                        }
                    }
                    if (h != undefined && h != '') {
                        outbx.find('.lk_inp_tps_box_list').html(h);
                    }
                    listfix(outbx);
                }


                var bl = b.offset().left, bt = b.offset().top, bw = b.outerWidth(true), bh = b.outerHeight(true);
                if (a.listseach.Maxheight != '') {
                    var fh = a.listseach.Maxheight;
                } else {
                    var fh = '200px';
                }
                if (a.listseach.Maxwidth != '') {
                    var fw = a.listseach.Maxwidth;
                } else {
                    var fw = bw + 'px';
                }
                outbx.find('.lk_inp_tps_box').css({'width': fw, 'max-height': fh})

                outbx.find('.lk_inp_tps_box').preventScroll();
                listfix(outbx);
                outbx.show();
            };

            function listfix(obj) {
                var bl = b.offset().left, bt = b.offset().top, bw = b.outerWidth(true), bh = b.outerHeight(true);
                var bmt = bt - $(window).scrollTop(), blt = bl - $(window).scrollLeft();
                var btt = $(window).height() - bmt - bh, bll = $(window).width() - blt - bw;
                var odh = obj.outerHeight(true);
                if (bmt >= btt && btt < odh) {
                    obj.css({'left': bl + 'px', 'top': bt - odh + 'px'})
                } else {
                    obj.css({'left': bl + 'px', 'top': bt + bh + 'px'})
                }
                listbind(obj);
            };
            function listbind(obj) {
                $(document).off('click');
                obj.off('click');
                $(document).on('click', function (e) {
                    obj.css('display', 'none');
                    $(document).off('click');
                })
                obj.on('click', function (e) {
                    stopPropagation(e);
                })
                b.on('click', function (e) {
                    stopPropagation(e);
                })
                if(a.listseach.clickClass != ''){
                    obj.find('.lk_inp_tps_box_list').find('.'+ a.listseach.clickClass).off('click');
                    obj.find('.lk_inp_tps_box_list').find('.'+ a.listseach.clickClass).on('click', function () {
                        b.off('input propertychange');
                        var bsd = a.listseach.clickfn(b, $(this));
                        if (bsd != false) {
                            obj.hide();
                            obj.remove();
                            b.lkinputtips(a);
                        };
                    })
                }else{
                    obj.find('.lk_inp_tps_box_list').children().off('click');
                    obj.find('.lk_inp_tps_box_list').children().on('click', function () {
                        b.off('input propertychange');
                        var bsd = a.listseach.clickfn(b, $(this));
                        if (bsd != false) {
                            obj.hide();
                            obj.remove();
                            b.lkinputtips(a);
                        };
                    })
                }

            };
            function stopPropagation(e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            };
            function inputssendajax(data, val, tsd) {
                if (val == tsd) {
                } else {
                    if (data != false && data != '' && data != null) {
                        if (a.ajaxParameter.loading) {
                            addlist();
                        }
                        d = ++d;
                        if (a.ajaxParameter.switchs) {                                    // 判断是否发送ajax
                            //var sdata = {'value':f};
                            setTimeout(function () {
                                es = ++es;
                                //console.log(window.input_const_text,val);
                                //if (window.input_const_text != val) {
                                if (d == es) {                                                  //判断延迟执行
                                    fs = ++fs;
                                    $.ajax({
                                        type: a.ajaxParameter.type,
                                        url: a.ajaxParameter.url,
                                        data: data,
                                        global: a.ajaxParameter.global,
                                        dataType: a.ajaxParameter.dataType,
                                        beforeSend: function () {
                                            a.ajaxParameter.beforeSend();
                                        },
                                        success: function (data) {
                                            ls = ++ls;
                                            if (fs == ls) {                                           //判断执行最后一次的请求
                                                if (xz) {
                                                    h = a.ajaxParameter.success(data);
                                                    if (h == undefined) {
                                                        h = '';
                                                    }
                                                    if (h == '') {
                                                        $('div[data-for="' + t + '"]').hide();
                                                    } else {
                                                        window.input_const_data = h;
                                                        addlist(h);
                                                    }
                                                }
                                            }
                                        },
                                        error: function () {
                                            $('div[data-for="' + t + '"]').hide();
                                            a.ajaxParameter.error();
                                        },
                                        complete: function () {
                                            a.ajaxParameter.complete();
                                        }
                                    })
                                }
                                //}else{
                                //    addlist(window.input_const_data);
                                //}
                            }, a.ajaxParameter.time)
                        }
                    } else {
                        if ($('div[data-for="' + t + '"]').length > 0) {
                            $('div[data-for="' + t + '"]').remove();
                        }
                    }
                }

            }


            function loaddata(list, inside, data, seach) {
                list.html(data);

                var bl = b.offset().left, bt = b.offset().top, bw = b.outerWidth(true), bh = b.outerHeight(true);
                if (a.listseach.Maxheight != '') {
                    var fh = a.listseach.Maxheight;
                } else {
                    var fh = '400px';
                }
                if (a.listseach.Maxwidth != '') {
                    var fw = a.listseach.Maxwidth;
                } else {
                    var fw = bw + 'px';
                }
                inside.css({'width': fw, 'overflow': 'hidden'});
                list.css({'max-height': fh, 'overflow': 'auto'});
                seach.css({'max-height': fh, 'overflow': 'auto'})
                list.preventScroll();
            }

            function selectdom(data, obj) {                               //下拉组件html拼接
                obj.outsidebox = jQuery("<div>", {
                    "class": "lk_inp_tps" + a.listseach.Clsname + "",
                    "data-for": t,
                    "style": "z-index: " + a.listseach.Zindex + ";display:none;"
                });
                obj.insidebox = jQuery("<div>", {"class": "lk_inp_tps_box"});
                obj.seacthbox = jQuery("<div>", {"class": "lk_inp_tps_box_sec_box"});
                obj.iptsech = jQuery("<input>", {"type": "text", "class": "lk_inp_tps_box_sec_ipt"});
                obj.seachicon = jQuery("<i>", {"class": "xzlicon-font xzliconz-search lk_inp_tps_box_sec_ico"});
                obj.listbox = jQuery("<" + a.listseach.listTagName + ">", {"class": "lk_inp_tps_box_list"});
                obj.seachend = jQuery("<" + a.listseach.listTagName + ">", {"class": "lk_inp_tps_box_list_seach"});
                obj.seachend.hide();
                obj.seacthbox.append(obj.iptsech, obj.seachicon);
                obj.insidebox.append(obj.seacthbox, obj.listbox, obj.seachend);
                obj.outsidebox.append(obj.insidebox);
                $(window.document.body).append(obj.outsidebox);
                loaddata(obj.listbox, obj.insidebox, data, obj.seachend);
                return obj.outsidebox;
            }

            if (b.attr("dataid")) {
                t = b.attr("dataid");
            } else {
                b.attr('dataid', t);
            }
            if (opts.b.a) {
                var cnword = false;
                b.on({
                    compositionstart: function () {
                        cnword = true;
                    },
                    compositionend: function () {
                        cnword = false;
                    }
                })
            }
            b.attr("autocomplete", "off");
            if (options.ajaxParameter.sendajax) {
                $(".lk_inp_tps").remove();
                xz = true;
                var data = a.ajaxParameter.ajaxBefore(b.val(), b, inputssendajax);
                if (data != undefined) {
                    inputssendajax(data, b.val());
                }
            } else {
                $(".lk_inp_tps").remove();
                if (a.entrance == 'focus') {
                    if (opts.c.a) {
                        b.attr("readonly", "readonly");
                        b.css({"backgroundColor": "#fff"});
                        var aw = jQuery("<i>", {
                            "class": "xzlicon-font xzliconz-unfold",
                            "style": "position:absolute; z-index:1; font-size:16px; width:16px; height:16px; top:50%; margin-top:-8px; right:8px; line-height:16px;"
                        });
                        var fd = jQuery("<div>", {"style": "display:inline-block; position:relative; width:" + b.outerWidth(true) + "px; height:" + b.outerHeight(true) + "px;"});
                        b.wrap(fd);
                        b.after(aw);
                        var seachipt = {};
                        selectdom(opts.c.b, seachipt);
                        b.off("click").on("click", function () {
                            listfix(seachipt.outsidebox);
                            seachipt.outsidebox.show();
                            seachipt.iptsech.focus();
                            seachipt.iptsech.off().on("input propertychange", function () {
                                var s_value = $(this).val();
                                var $seachipt = seachipt.listbox.children(':contains(' + s_value + ')');
                                seachipt.listbox.hide();
                                seachipt.seachend.html("");
                                $seachipt.each(function (i, e) {
                                    seachipt.seachend.append($(e).clone(true));
                                    seachipt.seachend.show();
                                })
                            })
                            return false;
                        })

                    } else {
                        b.off('focus');
                        b.focus(function () {
                            if (a.secondorder.switchs) {                            //判断是否检索input
                                b.off('input propertychange');
                                b.on('input propertychange', function () {
                                    setTimeout(function () {
                                        if (!cnword) {
                                            var f = b.val();
                                            if (f.length >= a.secondorder.length) {                      //判断字符是否达标
                                                xz = true;
                                                var data = a.ajaxParameter.ajaxBefore(f, b, inputssendajax);
                                                if (data != undefined) {
                                                    inputssendajax(data, f, window.input_const_loading_text)
                                                }

                                            } else {
                                                xz = false;
                                                if ($('div[data-for="' + t + '"]').length > 0) {
                                                    $('div[data-for="' + t + '"]').remove();
                                                }
                                            }
                                            window.input_const_loading_text = b.val();
                                        }
                                    }, 10)
                                })
                            }
                        })
                    }
                }
                //b.off('blur').blur(function(){
                //    window.input_const_text = b.val();
                //})
            }

        },
        "lkunselect":function(option){
                $(this).css({"opacity":"1", "position":"relative","z-index":"inherit"});
                $(this).siblings(".moni_select").remove();
                if($(this).parent().attr("data-id") != undefined){
                    $(this).unwrap();
                }

        },
        "lkdelselect":function(option){
            $(this).css({"opacity":"1", "position":"relative","z-index":"inherit"});
            $(this).siblings(".moni_select").remove();
            var select = $(this).clone(true);
            $(this).parent().after(select);

            if($(this).parent().attr("data-id") != undefined){
              $(this).unwrap();
            }
            $(this).parent().remove();
        },
        "lkselectupload":function(){
            var id = $(this).attr("data-id");
            var text = $(this).find("option:selected").text();
            $("div[data-for='"+ id +"']").find(".moni_select_text").text(text);
        },

        "lkselect": function (options) {
            if (!window.jquerySelectCss) {
                var _files = document.createElement("style"),
                    _filestext = '.moni_select{border-radius:4px;}.moni_select:before{content:"";width:0;height:100%;vertical-align:middle}.lk_moni_select{position:absolute;padding:5px 0}.lk_moni_select_focus{border:1px solid #378fea!important;box-shadow:0 0 10px rgba(55,143,234,.3)!important;color:#378fea}.lk_moni_select_focus i.xzliconz-unfold{color:#378fea!important}.lk_moni_select_focus i.xzliconz-unfold:before{content:"\\e6de"}.lk_moni_select_box{height:100%;box-sizing:border-box;padding:5px 0;overflow:auto;background-color:#fff;border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 0 10px 0 rgba(0,0,0,.04),0 2px 10px 0 rgba(0,0,0,.12)}.moni_select_ipt{padding:0 6px;position:relative;margin-bottom:5px}.moni_select_ipt input{height:36px;line-height:36px;box-sizing:border-box;outline:0;width:100%;display:block;padding:5px 7px;border:1px solid #bfcbd9;font-size:14px;border-radius:4px;padding-right:28px}.moni_select_ipt input:focus{border:1px solid #378fea;box-shadow:0 0 5px rgba(55,143,234,.15)}.moni_select_ipt input:focus+i.lk_inp_tps_box_sec_ico{color:#378fea}.moni_select_list{overflow-y:auto}.moni_select_list dl dt{font-weight:700;color:#48576a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;padding:0 10px}.moni_select_list dl dt.nochoose{height:28px;line-height:28px;color:#999}.moni_select_list dl dt.okchoose{height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;color:#48576a;cursor:pointer}.moni_select_list dl dt.okchoose:hover{background-color:#e9f6ff}.moni_select_list dl dd{text-align:left;height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;padding:0 10px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.moni_select_list dl dd.nochoose{color:#bfcbd9;cursor: not-allowed;}.moni_select_list dl dd.nochoose.noend{height:38px;color: #bfcbd9;cursor: not-allowed;line-height:38px;text-align:center;padding-left:10px;border-bottom:none}.moni_select_list dl dd.okchoose:hover{background-color:#e9f6ff}.lk_inp_tps_box_sec_ico{position:absolute;z-index:1;font-size:16px;width:16px;height:16px;line-height:16px;top:50%;margin-top:-8px;right:14px;}';
                _files.type = "text/css";
                if (_files.styleSheet) {         //ie下
                    _files.styleSheet.cssText = _filestext;
                } else {
                    _files.innerHTML = _filestext;       //或者写成 nod.appendChild(document.createTextNode(str))
                }
                document.getElementsByTagName("head")[0].appendChild(_files);
                window.jquerySelectCss = true;
            }
            options = $.extend(true, {
                selectswitch: true,
                Multiselect: false,
                selectseach: "auto",
                selectsize: 10,
                hideAttr:[],
                selectseachtext: "输入关键字筛选",
                mrheight:'32px',
                dropCls: "",
                drop: function () {
                },
                clickfn: function () {
                },
                Zindex: 9999,
                maxheight: "200px",
                maxwidth: "auto",
                Clsname: "",
                focusCls: "lk_moni_select_focus"
            }, options)

            function gethtml(obj, objd) {                         //下拉html拼接
                objd.a = $("<div>", {"class": "lk_moni_select " + obj.a.opts.dropCls, "data-drop": obj.a.id});
                if (obj.a.opts.maxwidth == "") {
                    objd.b = $("<div>", {
                        "class": "lk_moni_select_box",
                        "style": "min-width:" + obj.a.w + "px;max-width:" + obj.a.w + "px;"
                    });
                } else {
                    objd.b = $("<div>", {
                        "class": "lk_moni_select_box",
                        "style": "min-width:" + obj.a.w + "px;max-width:" + obj.a.opts.maxwidth
                    });
                }

                objd.c = "", objd.seachend = '';
                objd.c = $("<div>", {"class": "moni_select_ipt"});
                objd.ca = $("<input>", {
                    "type": "text",
                    "placeholder": obj.a.opts.selectseachtext,
                    "data-for": obj.a.id
                })
                objd.caicon = jQuery("<i>", {"class": "xzlicon-font xzliconz-search lk_inp_tps_box_sec_ico"});
                objd.seachend = jQuery("<div>", {
                    "class": "moni_select_list",
                    "style": "max-height:" + obj.a.opts.maxheight
                });
                objd.c.append(objd.ca, objd.caicon);

                objd.d = $("<div>", {"class": "moni_select_list", "style": "max-height:" + obj.a.opts.maxheight});
                objd.d.preventScroll();
                objd.seachend.preventScroll();
                objd.d.append(objd.h);
                if (obj.a.opts.selectseach == "auto" && obj.a.find("option").length >= obj.a.opts.selectsize || obj.a.opts.selectseach == true) {
                    objd.b.append(objd.c, objd.d, objd.seachend);
                } else {
                    objd.b.append(objd.d, objd.seachend);
                }

                objd.a.append(objd.b);
                return objd.a;
            }

            function getdata(obj, objd) {                                  //循环子元素，拼接datahtml
                objd.h = "<dl style='margin:0px;'>";
                var topobj = obj;
                function getsondata(obj) {                          //递归找子元素

                    obj.each(function () {
                        objd.thist = $(this);
                        objd.tagName = objd.thist[0].tagName;
                        objd.hte = objd.thist.text();
                        objd.hiddenHtml = '';
                        if(topobj.a.opts.hideAttr.length > 0){
                            objd.hiddenHtml = '';
                            for(var i = 0; i<topobj.a.opts.hideAttr.length ; i++){
                                var type = objd.thist.attr(topobj.a.opts.hideAttr[i]);
                                objd.hiddenHtml += "<i style='display: none;'>"+ objd.thist.attr(topobj.a.opts.hideAttr[i]) +"</i>"
                            }
                        }
                        if (objd.tagName == "OPTGROUP") {
                            objd.ht = objd.thist.attr("data-sl") == "true" ? true : false;
                        } else {
                            objd.ht = objd.thist.attr("disabled") ? true : false;
                        }
                        if (objd.tagName == "OPTGROUP") {
                            if (objd.ht) {
                                objd.h += "<dt class='okchoose' title='" + objd.hte + "'>" + objd.hte + objd.hiddenHtml + "</dt>"
                            } else {
                                objd.h += "<dt class='nochoose' title='" + objd.hte + "'>" + objd.hte + objd.hiddenHtml + "</dt>"
                            }
                        } else if (objd.tagName == "OPTION") {
                            objd.value = objd.thist.val();
                            var style = "";
                            if (objd.thist.parent()[0].tagName == "OPTGROUP") {
                                style = "style=padding-left:30px;";
                            }

                            if (objd.ht) {
                                objd.h += "<dd class='nochoose' " + style + " data-val='" + objd.value + "' title='" + objd.hte + "'>" + objd.hte + objd.hiddenHtml + "</dd>"
                            } else {
                                objd.h += "<dd class='okchoose' " + style + " data-val='" + objd.value + "' title='" + objd.hte + "'>" + objd.hte + objd.hiddenHtml + "</dd>"
                            }

                        }
                        getsondata(objd.thist.children());
                    })
                    return objd.h;
                }

                obj.sh = getsondata(obj.a.children());
                objd.h += "</dl>";
                objd.h = gethtml(obj, objd);
                return objd.h;
            }


            function getdrophtml(obj, objd) {                                     //组装html
                obj.hml = getdata(obj, objd);
                obj.fix = obj.a.fix(obj);
                obj.hml.css({"left": obj.fix.left + "px", "top": obj.fix.top, "bottom": obj.fix.bottom,"z-index":obj.a.opts.Zindex});
                objd.d.css("max-height",obj.fix.maxheight);
                objd.seachend.css("max-height",obj.fix.maxheight);
                $("body").append(obj.hml);
            }

            this.each(function () {

                var $elem = $(this);
                var e = {}, d = {};
                e.a = $(this);
                e.a.opts = options;
                if (e.a.opts.selectswitch) {
                    e.a.h = e.a.opts.mrheight;
                    e.a.w = e.a.outerWidth();
                    e.a.s = e.a.css("display");
                    e.a.fz = e.a.css("font-size");
                    e.a.b = e.a.css("border") == "" || e.a.css("border") == undefined ? "1px solid #bfcbd9" : e.a.css("border");
                    e.a.lh = e.a.opts.mrheight;
                    e.a.pd = e.a.css("padding");
                    e.a.mr = e.a.css("padding");
                    e.a.radius = e.a.css("border-radius");
                    e.a.pdl = e.a.css("paddingLeft") == "0px" ? "5px" : e.a.css("paddingLeft");
                    e.a.boxsize = e.a.css("box-sizing");
                    e.a.mr = e.a.css("margin");
                    e.a.left = e.a.offset().left;
                    e.a.top = e.a.offset().top;
                    e.a.id = tsrandom();
                    e.a.attr("data-id", e.a.id);
                    e.a.cd = e.a.find("option[value='']");
                    e.a.cs = e.a.find("option").not("option[value='']");
                    e.a.cdz = e.a.find("optgroup");
                    e.a.vals = e.a.val();
                    e.a.news = $("<div>", {
                        "data-for": e.a.id,
                        "class": "moni_select",
                        "style":"width:"+e.a.w+"px;height:"+ e.a.h +";display:"+ e.a.s + ";margin:"+ e.a.m +";border:"+ e.a.b +";box-sizing: " + e.a.boxsize + ";line-height:" + e.a.lh + ";z-index:0; background-color:#fff; font-size:0px; cursor:pointer; border-radius:" + e.a.radius+";margin:"+e.a.mr+"; vertical-align:middle; position:relative; padding-left:" + e.a.pdl + "; background-color:#fff;line-height:" + e.a.lh + ";"})
                    //"style": "width:" + e.a.w + "px;height:" + e.a.h + "px;border:" + e.a.b + ";padding:" + e.a.pd + ";padding-left:" + e.a.pdl + ";box-sizing: " + e.a.boxsize + ";position:absolute;top:" + e.a.top + "px;left:" + e.a.left + "px;line-height:" + e.a.lh + ";z-index:10; background-color:#fff; font-size:0px; cursor:pointer; border-radius:" + e.a.radius});
                    e.a.newst = $("<span>", {
                        "class": "moni_select_text",
                        "style": "display: inline-block; text-align:left; vertical-align: middle; width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; font-size:" + e.a.fz + ";"
                    })
                    e.a.newsicon = $("<i>", {
                        "class": "xzlicon-font xzliconz-unfold",
                        "style": "right:0px; top:0px; bottom:0px; font-size:12px; position:absolute; text-align:center; width:16px; background:#fff; border-radius:" + e.a.radius + ";border-left-top-radius:0px;border-left-bottom-radius:0px;"
                    })

                    e.a.news.append(e.a.newsicon, e.a.newst);
                    e.a.news.css("paddingRight", e.a.newsicon.outerWidth(true) + 'px');
                    if(e.a.vals != ""){
                        e.a.text = e.a.find("option:selected").text();
                        e.a.newst.text(e.a.text);
                    }else{
                        if (e.a.cd) {
                            e.a.newst.text(e.a.cd.text());
                        }
                    }




                    //$("body").append(e.a.news);

                    e.a.fj = $("<div>",{
                        "data-select":e.a.id,
                        // "style":"display:inline-block"
                    })

                    e.a.wrap(e.a.fj);
                    e.a.after(e.a.news);
                    e.a.newsicon.css("line-height", e.a.opts.mrheight);


                    e.a.css({"opacity":"0","position":"ABSOLUTE","z-index":"-1"});


                    //本地数据

                    e.a.band = function (obj, objipt, opts) {                                                 //绑定事件
                        $(document).off('click');
                        obj.off('click');
                        $(document).on('click', function (e) {
                            objipt.removeClass(opts.focusCls);
                            obj.remove();
                            $(document).off('click');
                        })
                        obj.on('click', function (e) {
                            stopPropagation(e);
                        })

                        obj.find('.moni_select_list').find("dd").off('click');
                        obj.find('.moni_select_list').find("dd.okchoose").on('click', function () {
                            objipt.removeClass(e.a.opts.focusCls);
                            var endvalue = $(this).attr("data-val");
                            var endtext = $.trim($(this).attr('title'));
                            e.a.newst.text(endtext);
                            e.a.val(endvalue);
                            e.a.trigger("change");
                            var bsd = e.a.opts.clickfn(e.a.news, $(this));
                            if (bsd != false) {
                                obj.remove();
                            }
                            ;
                            return false;
                        })
                    };


                    e.a.fix = function (obj) {                                                     //显示之前计算位置
                        var fix = {};
                        obj.a.top = obj.a.offset().top;
                        fix.left = obj.a.offset().left;
                        obj.a.h = parseInt(e.a.opts.mrheight);
                        obj.winh = $(window).height();
                        obj.selectsize =   obj.a.opts.selectseach == "auto" && obj.a.find("option").length > 10 || obj.a.opts.selectseach ? 41 : 0;
                        obj.a.Sbottom = $(window).height() - (obj.a.top  - $(window).scrollTop()) -obj.a.h;
                        obj.a.Stop = $(window).height() -  obj.a.Sbottom - obj.a.h;
                        obj.a.bottom = $(document).height() - obj.a.top - obj.a.h;

                        if(obj.a.Sbottom >= parseInt(obj.a.opts.maxheight)+ obj.selectsize + 20 ){
                            fix.maxheight = obj.a.opts.maxheight;
                            fix.bottom = "auto";
                            fix.top = obj.a.top + obj.a.h + "px";
                        }else{
                            if(obj.a.Stop >= parseInt(obj.a.opts.maxheight)+ obj.selectsize + 20){
                                fix.maxheight = obj.a.opts.maxheight;
                                fix.top = "auto";
                                fix.bottom = obj.a.bottom + obj.a.h + "px";
                            }else if(obj.a.bottom >= parseInt(obj.a.opts.maxheight)+ obj.selectsize + 20 ){
                                fix.maxheight = obj.a.opts.maxheight;
                                fix.bottom = "auto";
                                fix.top = obj.a.top + obj.a.h + "px";
                            }else if(obj.a.top >= parseInt(obj.a.opts.maxheight)+ obj.selectsize + 20){
                                fix.maxheight = obj.a.opts.maxheight;
                                fix.top = "auto";
                                fix.bottom = obj.a.bottom + obj.a.h + "px";
                            }else if(obj.a.top > obj.a.bottom){
                                fix.maxheight = obj.a.top - 20 -obj.selectsize + "px";
                                fix.top = "auto";
                                fix.bottom = obj.a.bottom + obj.a.h + "px";
                            }else{
                                fix.maxheight = obj.a.bottom - 20 -obj.selectsize + "px";
                                fix.top =obj.a.top + obj.a.h + "px";
                                fix.bottom = "auto";
                            }
                        }
                        if(navigator.userAgent.indexOf('Firefox') >= 0){
                            fix.top = fix.top =='auto'?'auto':parseInt(fix.top) -5 + 'px';
                            fix.bottom = fix.bottom =='auto'?'auto':parseInt(fix.bottom) +5 + 'px';
                            fix.left = fix.left -5;
                            e.a.css('borderRadius','4px');
                        }
                        return fix;
                    }

                    e.a.news.click(function () {
                        e.a.opts.drop();
                        $(".moni_select").removeClass(e.a.opts.focusCls);
                        $(".dropcheckbox").removeClass('active');
                        $(this).addClass(e.a.opts.focusCls);
                        $(".lk_moni_select,.lk_checkbox_select").remove();
                        getdrophtml(e, d);
                        e.a.band(d.a, e.a.news, e.a.opts);
                        d.ca.focus();
                        d.ca.off().on("input propertychange", function () {
                            var s_value = $(this).val();
                            var $setvalue = d.d.find('dd:contains(' + s_value + ')');
                            if (s_value == "") {
                                d.seachend.html("<dl style='margin:0px;'></dl>").hide();
                                d.d.show();
                            } else {
                                d.d.hide();
                                d.seachend.html("<dl style='margin:0px;'></dl>");
                                if ($setvalue.length == 0) {
                                    d.seachend.find('dl').append('<dd class="nochoose noend">没有匹配数据</dd>');
                                    d.seachend.show();
                                } else {
                                    $setvalue.each(function (i, e) {
                                        d.seachend.find('dl').append($(e).clone(true));
                                        d.seachend.show();
                                    })
                                }

                            }
                        })
                        return false;
                    })
                } else {
                    return false;
                }
            })
        },
        "selectheckbox":function(options){
            if (!window.window.selectheckboxCss) {
                var _files = document.createElement("style"),
                    _filestext =".dropcheckbox{padding:4px;font-size:0;padding-bottom:0;padding-right:24px;border:1px solid #cecece;border-radius:4px;position:relative;box-sizing:border-box}.dropcheckbox.active{color:#378fea;border-color:#378fea}.dropcheckbox.active .xzliconz-unfold:before{content:'\\e6de'}.dropcheckbox_text{margin-bottom:4px;margin-right:4px;font-size:0;position:relative;vertical-align:top;display:inline-block;line-height:24px;height:24px;padding:0 5px;padding-right:24px;background-color:#fff;border:1px solid transparent;box-sizing:border-box}.dropcheckbox_text.active{border-radius:4px;background-color:#e9f6ff;border:1px solid #c0e5ff;color:#20a0ff}.dropcheckbox_text span{font-size:12px;display:inline-block;vertical-align:top}.labelcloseicon{font-size:16px;position:absolute;right:0;top:0;bottom:0;width:24px;text-align:center;cursor:pointer}.dropicon{position:absolute;top:0;bottom:0;right:0;z-index:1;width:24px;text-align:center;vertical-align:top}.dropicon:before{position:absolute;top:50%;margin-top:-12px;height:24px;width:24px;left:0;line-height:24px}.labelcloseicon{display:inline-block;vertical-align:middle}select:focus{border-color:#0a6cd6;background-color:#31c6e7}.lk_checkbox_select{position:absolute;padding:5px 0}.lk_checkbox_select_box{height:100%;box-sizing:border-box;padding:5px 0;overflow:auto;background-color:#fff;border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 0 10px 0 rgba(0,0,0,.04),0 2px 10px 0 rgba(0,0,0,.12)}.checkbox_select_list{overflow-y:auto}.checkbox_select_list dl{margin:0}.checkbox_select_list dl dt{font-weight:700;color:#48576a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;padding:0 10px}.checkbox_select_list dl dt.nochoose{height:28px;line-height:28px;color:#999}.checkbox_select_list dl dt.okchoose{height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;color:#48576a;cursor:pointer}.checkbox_select_list dl dt.okchoose:hover{background-color:#e4e8f1}.checkbox_select_list dl dd{text-align:left;height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;padding:0 10px;font-size:14px;box-sizing:border-box;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}.checkbox_select_list dl dd .checkbox_select_icon{display:none}.checkbox_select_list dl dd.active{color:#378fea}.checkbox_select_list dl dd.active .checkbox_select_icon{position:absolute;display:block;width:36px;height:36px;right:0;top:0;text-align:center;color:#378fea}.checkbox_select_list dl dd.nochoose{color:#bfcbd9;cursor:not-allowed}.checkbox_select_list dl dd.nochoose.noend{height:38px;color:#bfcbd9;cursor:not-allowed;line-height:38px;text-align:center;padding-left:10px;border-bottom:none}.checkbox_select_list dl dd.okchoose:hover{background-color:#e9f6ff}.dropcheckbox{padding:4px;font-size:0;padding-bottom:0;padding-right:24px;border:1px solid #cecece;border-radius:4px;position:relative;box-sizing:border-box}.dropcheckbox.active{color:#378fea;border-color:#378fea}.dropcheckbox.active .xzliconz-unfold:before{content:'\\e6de'}.dropcheckbox_text{margin-bottom:4px;margin-right:4px;font-size:0;position:relative;vertical-align:top;display:inline-block;line-height:24px;height:24px;padding:0 5px;padding-right:24px;background-color:#fff;border:1px solid transparent;box-sizing:border-box}.dropcheckbox_text.active{border-radius:4px;background-color:#e9f6ff;border:1px solid #c0e5ff;color:#20a0ff}.dropcheckbox_text span{font-size:12px;display:inline-block;vertical-align:top}.labelcloseicon{font-size:16px;position:absolute;right:0;top:0;bottom:0;width:24px;text-align:center;cursor:pointer}.dropicon{position:absolute;top:0;bottom:0;right:0;z-index:1;width:24px;text-align:center;vertical-align:top}.dropicon:before{position:absolute;top:50%;margin-top:-12px;height:24px;width:24px;left:0;line-height:24px}.labelcloseicon{display:inline-block;vertical-align:middle}select:focus{border-color:#0a6cd6;background-color:#31c6e7}.lk_checkbox_select{position:absolute;padding:5px 0}.lk_checkbox_select_box{height:100%;box-sizing:border-box;padding:5px 0;overflow:auto;background-color:#fff;border:1px solid #d1dbe5;border-radius:2px;box-shadow:0 0 10px 0 rgba(0,0,0,.04),0 2px 10px 0 rgba(0,0,0,.12)}.checkbox_select_list{overflow-y:auto}.checkbox_select_list dl{margin:0}.checkbox_select_list dl dt{font-weight:700;color:#48576a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;padding:0 10px}.checkbox_select_list dl dt.nochoose{height:28px;line-height:28px;color:#999}.checkbox_select_list dl dt.okchoose{height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;color:#48576a;cursor:pointer}.checkbox_select_list dl dt.okchoose:hover{background-color:#e4e8f1}.checkbox_select_list dl dd{text-align:left;height:36px;line-height:36px;border-bottom:1px dashed #e9e9e9;margin:0;padding:0 10px;font-size:14px;box-sizing:border-box;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;position:relative}.checkbox_select_list dl dd .checkbox_select_icon{display:none}.checkbox_select_list dl dd.active{color:#378fea}.checkbox_select_list dl dd.active .checkbox_select_icon{position:absolute;display:block;width:36px;height:36px;right:0;top:0;text-align:center;color:#378fea}.checkbox_select_list dl dd.nochoose{color:#bfcbd9;cursor:not-allowed}.checkbox_select_list dl dd.nochoose.noend{height:38px;color:#bfcbd9;cursor:not-allowed;line-height:38px;text-align:center;padding-left:10px;border-bottom:none}.checkbox_select_list dl dd.okchoose:hover{background-color:#e9f6ff}";
                _files.type = "text/css";
                if (_files.styleSheet) {         //ie下
                    _files.styleSheet.cssText = _filestext;
                } else {
                    _files.innerHTML = _filestext;       //或者写成 nod.appendChild(document.createTextNode(str))
                }
                document.getElementsByTagName("head")[0].appendChild(_files);
                window.window.selectheckboxCss = true;
            }
            options = $.extend(true, {
                maxheight:'300px',
                zindex:'9999',
                lineheight:'36px',
                tipsselect:'请选择',
                allcheckvalue:'',
                hidevalue:[],
                clickfn:function(){}
            }, options)
            var elem = {};
            if($('body').css('position') == 'static'){
                $('body').css('position','relative');
            }
            elem.getdata = function(obj){
                //console.log(obj.find('input[type="checkbox"]:checked').length);
                var s_data = [];
                obj.find('label').each(function(){
                    var t = $.inArray($(this).find('input[type="checkbox"]').val(), elem.opts.hidevalue);
                    if(t == -1){
                        s_data.push({"text": $.trim($(this).text()),"value":$(this).find('input[type="checkbox"]').val(),"checked":$(this).find('input[type="checkbox"]').is(':checked')});
                    }
                })
                return s_data;
            };
            elem.gethtml = function(data){
                elem.box = $("<div>",{
                    'class':'lk_checkbox_select','data-id':elem.random
                })
                var html ={};
                html = ' <div class="lk_checkbox_select_box">';
                html += ' <div class="checkbox_select_list">';
                html += '<dl>';
                for(var i in data){
                    if(data[i].checked){
                        html +='<dd class="okchoose active" data-val="'+ data[i].value +'" title="'+ data[i].text +'">'+data[i].text+'<i class="xzlicon-font checkbox_select_icon xzliconz-check"></i></dd>';
                        if(data[i].value != elem.opts.allcheckvalue){
                            elem.elemnewtext +='<font class="dropcheckbox_text active" data-id="'+ data[i].value+'"><span class="dropcheckbox_span">'+ data[i].text +'</span><i class="xzlicon-font xzliconz-close labelcloseicon"></i></font>'
                        }
                    }else{
                        html +='<dd class="okchoose" data-val="'+ data[i].value +'" title="'+ data[i].text +'">'+data[i].text+'<i class="xzlicon-font checkbox_select_icon xzliconz-check"></i></dd>';
                    }
                };
                html += '</dl>';
                html += '</div>';
                html += '</div>';
                elem.box.html(html);
                return elem.box;
            };

            elem.fix = function(obj){
                var fix = {};
                fix.top = obj.offset().top;
                fix.left = obj.offset().left + 'px';
                fix.h =  typeof(obj.outerHeight()) != "number" ? obj.outerHeight(true):obj.outerHeight();
                fix.winh = $(window).height();
                fix.width = obj.outerWidth();
                fix.Sbottom = $(window).height() - (fix.top  - $(window).scrollTop()) -fix.h;
                fix.Stop = $(window).height() -  fix.Sbottom - fix.h;
                fix.bottom = $(document).height() - fix.top - fix.h;

                if(fix.Sbottom >= parseInt(elem.opts.maxheight)){
                    fix.maxheight = elem.opts.maxheight;
                    fix.newbottom = "auto";
                    fix.newtop = fix.top + fix.h + "px";
                }else{
                    if(fix.Stop >= parseInt(elem.opts.maxheight)){
                        fix.maxheight = elem.opts.maxheight;
                        fix.newtop = "auto";
                        fix.newbottom = fix.bottom + fix.h + "px";
                    }else if(fix.bottom >= parseInt(elem.opts.maxheight)){
                        fix.maxheight = elem.opts.maxheight;
                        fix.newbottom = "auto";
                        fix.newtop = fix.top + fix.h + "px";
                    }else if(fix.top >= parseInt(elem.opts.maxheight)){
                        fix.maxheight =elem.opts.maxheight;
                        fix.newtop = "auto";
                        fix.newbottom = fix.bottom + fix.h + "px";
                    }else if(fix.top > fix.bottom){
                        fix.maxheight =fix.top + "px";
                        fix.newtop = "auto";
                        fix.newbottom = fix.bottom + fix.h + "px";
                    }else{
                        fix.maxheight = fix.bottom   + "px";
                        fix.newtop =fix.top + fix.h + "px";
                        fix.newbottom = "auto";
                    }
                }
                return fix;
            }
            elem.band = function (obj, objipt, opts) {                                                 //绑定事件
                $(document).off('click');
                obj.off('click');
                $(document).on('click', function (e) {
                    objipt.removeClass('active');
                    obj.remove();
                    $(document).off('click');
                })

                obj.find('.checkbox_select_list').find("dd").off('click');
                obj.find('.checkbox_select_list').find("dd").on('click', function () {
                    var endvalue = $(this).attr("data-val");
                    var endtext = $.trim($(this).attr('title'));
                    if($(this).hasClass('active')){
                        if(elem.opts.allcheckvalue != ''){
                            if(endvalue == elem.opts.allcheckvalue){
                                obj.find('.checkbox_select_list').find("dd").removeClass('active');
                                elem.elem.find('input').prop('checked',false);
                                elem.elem.find('input[value="'+ elem.opts.allcheckvalue +'"]').trigger("change");
                                objipt.find('font').remove();
                            }else{
                                obj.find('.checkbox_select_list').find("dd[data-val='"+ elem.opts.allcheckvalue +"']").removeClass('active');
                                $(this).removeClass('active');
                                elem.elem.find('input[value="'+  elem.opts.allcheckvalue +'"]').prop('checked',false);
                                elem.elem.find('input[value="'+ endvalue +'"]').prop('checked',false).trigger("change");
                                objipt.find('font[data-id="'+endvalue+'"]').remove();
                            }
                        }else{
                            $(this).removeClass('active');
                            elem.elem.find('input[value="'+ endvalue +'"]').prop('checked',false).trigger("change");
                            objipt.find('font[data-id="'+endvalue+'"]').remove();
                        }
                        if(objipt.find('font').length == 0){
                            objipt.append('<font class="dropcheckbox_text"><span class="dropcheckbox_span novalue">'+ elem.opts.tipsselect +'</span></font>');
                        }
                    }else {
                        var html = '';
                        if(elem.opts.allcheckvalue != ''){
                            if(endvalue == elem.opts.allcheckvalue){
                                obj.find('.checkbox_select_list').find("dd").addClass('active');
                                elem.elem.find('label').each(function(){
                                    var t = $.inArray($(this).find('input[type="checkbox"]').val(), elem.opts.hidevalue);
                                    if(t == -1){
                                        $(this).find('input[type="checkbox"]').prop('checked',true);
                                    }
                                })

                                elem.elem.find('input[value="'+ elem.opts.allcheckvalue +'"]').trigger("change");
                                obj.find('.checkbox_select_list').find("dd").each(function(){
                                    if($(this).attr("data-val") != elem.opts.allcheckvalue){
                                        html += ' <font class="dropcheckbox_text active" data-id="'+$(this).attr("data-val")+'"><span>' + $.trim($(this).attr('title')) + '</span><i class="xzlicon-font xzliconz-close labelcloseicon"></i></font>';
                                    }
                                })
                                objipt.find('font').remove();
                            }else{
                                $(this).addClass('active');
                                elem.elem.find('input[value="'+ endvalue +'"]').prop('checked',true).trigger("change");
                                html = ' <font class="dropcheckbox_text active" data-id="'+endvalue+'"><span>' + endtext + '</span><i class="xzlicon-font xzliconz-close labelcloseicon"></i></font>';
                                if(obj.find('.checkbox_select_list').find("dd.active").length ==obj.find('.checkbox_select_list').find("dd").length -1 ){
                                    elem.elem.find('input[value="'+  elem.opts.allcheckvalue +'"]').prop('checked',true);
                                    obj.find('.checkbox_select_list').find("dd[data-val='"+ elem.opts.allcheckvalue +"']").addClass('active');
                                }
                            }
                        }else{
                            $(this).addClass('active');
                            elem.elem.find('input[value="'+ endvalue +'"]').prop('checked',true).trigger("change");
                            html = ' <font class="dropcheckbox_text active" data-id="'+endvalue+'"><span>' + endtext + '</span><i class="xzlicon-font xzliconz-close labelcloseicon"></i></font>';
                        }
                        objipt.find('.novalue').parent('.dropcheckbox_text').remove();
                        objipt.append(html);
                        var bsd = elem.opts.clickfn(obj, objipt, $(this));
                    }

                    elem.position = elem.fix(elem.elemnew);
                    elem.selectdom.css({
                        'left': elem.position.left,
                        'top': elem.position.newtop,
                        'bottom': elem.position.newbottom,
                        'width': elem.position.width,
                        'z-index': elem.opts.zindex
                    });
                    elem.selectdom.find(".lk_checkbox_select_box").css('maxHeight', elem.position.maxheight);
                    elem.elemnew.find('.labelcloseicon').off('click').on('click',function(){
                        var tsval = $(this).parents('.dropcheckbox_text').attr('data-id');
                        $(this).parents('.dropcheckbox_text').remove();
                        elem.selectdom.find('.checkbox_select_list').find("dd[data-val='"+ tsval +"']").removeClass('active');
                        elem.selectdom.find('.checkbox_select_list').find("dd[data-val='"+ elem.opts.allcheckvalue +"']").removeClass('active');
                        elem.elem.find('input[value="'+ tsval +'"]').prop('checked',false).trigger("change");

                        if(elem.elemnew.find('font').length == 0){
                            elem.elemnew.append('<font class="dropcheckbox_text"><span class="dropcheckbox_span novalue">'+ elem.opts.tipsselect +'</span></font>');
                        }
                        elem.position = elem.fix(elem.elemnew);
                        elem.selectdom.css({
                            'left': elem.position.left,
                            'top': elem.position.newtop,
                            'bottom': elem.position.newbottom,
                            'width': elem.position.width,
                            'z-index': elem.opts.zindex
                        });
                        elem.selectdom.find(".lk_checkbox_select_box").css('maxHeight', elem.position.maxheight);
                        return false;
                    });
                    return false;
                });

            };
            this.each(function(){
                elem.elem = $(this);
                elem.opts = options;
                elem.random = tsrandom();
                elem.elem.css('opacity','0');
                elem.elem.hide();
                elem.elemnewtext ='';
                elem.data =elem.getdata(elem.elem);  //获取checkbox 数据
                elem.selectdom = elem.gethtml(elem.data);      //下拉框html
                elem.selectdom.find('.lk_checkbox_select_box').preventScroll();
                elem.elemnew = $("<div>",{'class':'dropcheckbox','data-for':elem.random,'style':'min-height:'+ elem.opts.lineheight});
                elem.elemnewtext = elem.elemnewtext == ''? '<font class="dropcheckbox_text"><span class="dropcheckbox_span novalue">'+ elem.opts.tipsselect +'</span></font>':elem.elemnewtext;
                elem.elemnew.html(elem.elemnewtext);
                elem.elemnew.append('<i class="xzlicon-font xzliconz-unfold dropicon"></i>');
                elem.elemnew.find('.labelcloseicon').off('click').on('click',function(){
                    var tsval = $(this).parents('.dropcheckbox_text').attr('data-id');
                    $(this).parents('.dropcheckbox_text').remove();
                    elem.selectdom.find('.checkbox_select_list').find("dd[data-val='"+ tsval +"']").removeClass('active');
                    elem.selectdom.find('.checkbox_select_list').find("dd[data-val='"+ elem.opts.allcheckvalue +"']").removeClass('active');
                    elem.elem.find('input[value="'+ tsval +'"]').prop('checked',false).trigger("change");

                    if(elem.elemnew.find('font').length == 0){
                        elem.elemnew.append('<font class="dropcheckbox_text"><span class="dropcheckbox_span novalue">'+ elem.opts.tipsselect +'</span></font>');
                    }
                    elem.position = elem.fix(elem.elemnew);
                    elem.selectdom.css({
                        'left': elem.position.left,
                        'top': elem.position.newtop,
                        'bottom': elem.position.newbottom,
                        'width': elem.position.width,
                        'z-index': elem.opts.zindex
                    });
                    elem.selectdom.find(".lk_checkbox_select_box").css('maxHeight', elem.position.maxheight);
                    return false;
                });
                elem.elem.after(elem.elemnew);
                elem.elemnew.off('click');

                elem.elemnew.on('click',function(){
                    //elem.bind($(this));
                    elem.data =elem.getdata(elem.elem);  //获取checkbox 数据
                    elem.selectdom = elem.gethtml(elem.data);      //下拉框html
                    elem.selectdom.find('.lk_checkbox_select_box').preventScroll();
                    $(".moni_select").removeClass('lk_moni_select_focus');
                    $(".dropcheckbox").removeClass('active');
                    $(".lk_moni_select,.lk_checkbox_select").remove();
                    elem.position = elem.fix(elem.elemnew);
                    elem.selectdom.css({'left':elem.position.left,'top':elem.position.newtop,'bottom':elem.position.newbottom,'width':elem.position.width,'z-index':elem.opts.zindex});
                    elem.selectdom.find(".lk_checkbox_select_box").css('maxHeight',elem.position.maxheight)
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        elem.selectdom.remove();
                    }else{
                        $(this).addClass('active');
                        $("body").append(elem.selectdom);
                        elem.band(elem.selectdom,$(this),elem.opts);
                    }
                    return false;
                })
            })
        }
    })
})(jQuery)

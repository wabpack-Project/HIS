(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.myShowModalDialog = factory();
	}
}(this, function () {
	/**
	 * 弹出一个新的浏览器窗口，完善window.showModalDialog事件
	 * @param {string} url 	需要打开网页地址
	 * @param {Object} obj 	新打开浏览器相关参数对象
	 * @param {Function} callback 	打开新窗口后，回调方法
	 * */
	var myShowModalDialog = function (url, obj, callback){
		// console.log(obj);
		if(window.showModalDialog){
			if(callback){
				var rlt = showModalDialog(url, '', 'resizable:no;scroll:no;status:no;center:yes;help:no;dialogWidth:' + obj.width + ' px;dialogHeight:' + obj.height + ' px');
				if(rlt)
					return callback(rlt);
				else
				{
					callback(window.returnValue);
				}
			}
			else
				showModalDialog(url, '', 'resizable:no;scroll:yes;status:no;center:yes;help:no;dialogWidth:' + obj.width + ' px;dialogHeight:' + obj.height + ' px');
		} else {
			if(callback)
				window.showModalDialogCallback = callback;
			var top = (window.screen.availHeight-30-obj.height)/2; //获得窗口的垂直位置;
			var left = (window.screen.availWidth-10-obj.width)/2; //获得窗口的水平位置;
			var winOption = "top="+top+",left="+left+",height="+obj.height+",width="+obj.width+",resizable=no,scrollbars=no,status=no,toolbar=no,location=no,directories=no,menubar=no,help=no";
			window.open(url,window, winOption);
		}
	};

	// 提供外部调用的参数和方法
	return myShowModalDialog;
}));

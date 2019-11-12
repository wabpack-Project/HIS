function getTest(){
		var url = 'http://h.lk.cn/drugstore/tab:stock_input/act:edit';
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			async:false,
			data:{
				document_id: 1,
			},
			success:function(data){
				// console.log(data);
				error_status = data;
			}
		});
}

function get_cap_status(){
	var email = $("#email").val();
	var password = $("#password").val();
	if(email!='' && password !=''){
		var url = 'http://h.lk.cn/signin/tab:getCapStatus/rand:' + Math.random();
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			async:false,
			data:{email:email},
			success:function(data){
				// console.log(data);
				error_status = data;
			}
		});
	}
}
$(function(){
	//載入section_contact內容
   $("#section_contact").load('section-contact.html #section_contact>div', function(){
	   //將本頁網址附加於表單上傳送，傳送表單後引導回本頁面
		var url=window.location.toString();
		var name=$('#model_name').val();
		$('#location_href01').val(url);
		$('#location_href02').val(url);
		//將原頁面隱藏的input值(model_name)代入兩個表單的input值
		$('#model_name01').attr('value', name);
		$('#model_name02').attr('value', name);
   });




});
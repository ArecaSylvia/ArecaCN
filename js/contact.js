$(function(){

	//表單傳送成功，顯示alert
    var url = location.href;
    if(url.indexOf('?')!=-1)
	{
		var ary = url.split('?res=');
		if (ary[1] == 'ok') {
			$('#transmit_alert').removeClass('hidden');
		}else if(ary[1] == 'no'){
			$('#transmit_alert2').removeClass('hidden');
		}
	}



	/*變數*/
	  var type
	  var subtype

	/*Component Type聯動Model Name欄位*/
	  $.ajax({
	    url:'json/contact_modelname.json',
	    dataType:'json'
	  }).done(function(res){
	    type=res
	    init()
	  });

	  function init(){
	    $.each(type, function(index, val) {
	      var $option = $("<option></option>")
	      $option.val(index).html(index)
	      $('#type').append($option)
	    });

	    $('#type').on('change',function(){
    	  $('#dis_model_name').not('hidden').addClass('hidden');
	      $('#subtype > option').remove()
	      $.each(type[$('#type').val()],function(index,val){
	        var $option = $("<option></option>")
	        $option.val(val).html(val)
	        $('#subtype').append($option)
	      })

	  		var category = $('#type').val();
	  		switch(category)
			{
			case "RAID Subsystem/External RAID Solution":
	    		if($('#HBA_model').hasClass('hidden')){
				    $('#HBA_model').removeClass('hidden');
				}
	    		if($('#firmware_version').hasClass('hidden')){
				    $('#firmware_version').removeClass('hidden');
				}
				if(!$('#bios_version').hasClass('hidden')){
				    $('#bois_version').addClass('hidden');
				}
	    		if(!$('#driver_version').hasClass('hidden')){
				    $('#driver_version').addClass('hidden');
				}
			  break;
			case "JBOD/Expander Box":
	    		if($('#HBA_model').hasClass('hidden')){
				    $('#HBA_model').removeClass('hidden');
				}
	    		if($('#firmware_version').hasClass('hidden')){
				    $('#firmware_version').removeClass('hidden');
				}
				if(!$('#bios_version').hasClass('hidden')){
				    $('#bois_version').addClass('hidden');
				}
	    		if(!$('#driver_version').hasClass('hidden')){
				    $('#driver_version').addClass('hidden');
				}
			  break;
			case "SAS Non-RAID Adapters":
	    		if(!$('#HBA_model').hasClass('hidden')){
				    $('#HBA_model').addClass('hidden');
				}
			    if($('#bois_version').hasClass('hidden')){
				    $('#bois_version').removeClass('hidden');
				}
				if(!$('#firmware_version').hasClass('hidden')){
				    $('#firmware_version').addClass('hidden');
				}
	    		if($('#driver_version').hasClass('hidden')){
				    $('#driver_version').removeClass('hidden');
				}
			  break;
			default:
	    		if(!$('#HBA_model').hasClass('hidden')){
				    $('#HBA_model').addClass('hidden');
				}
			    if($('#firmware_version').hasClass('hidden')){
				    $('#firmware_version').removeClass('hidden');
				}
				if(!$('#bios_version').hasClass('hidden')){
				    $('#bois_version').addClass('hidden');
				}
	    		if($('#driver_version').hasClass('hidden')){
				    $('#driver_version').removeClass('hidden');
				}
			}
	    });

	    $('#subtype').on('change',function(){
	  		var model_name = $('#subtype').val();
    		$('#dis_model_name').not('hidden').addClass('hidden');
	  		if(model_name=="Discontinued Products"){
	  			$('#dis_model_name').removeClass('hidden');
	  		}
	    });

	    $('#country').on('change',function(){
	  		var country = $('#country').val();
    		$('#wechat').not('hidden').addClass('hidden');
	  		if(country=="China"){
	  			$('#wechat').removeClass('hidden');
	  		}
	    });

	    $('#purchase_from').on('change',function(){
	  		var purchase_from = $('#purchase_from').val();
	    	if (purchase_from=="Others") {
	    		$('#purchase_input').removeClass('hidden');
	    	}
	    });
	  }


	
});
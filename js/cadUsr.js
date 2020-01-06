$(document).ready(function(){

    $('#btnSaveCadUsr').click(function(){ 
		var user = $.trim($("#edtUser").val().toLowerCase());
		var pass = $.trim($("#edtPass").val().toLowerCase());
		var tipo = $("#selTipo").val();

		if ($(this).obrigatorio(['edtUser','edtPass','edtRepass'])){
			if($(this).senha(['edtPass','edtRepass'])){
				$(this).insertRegister(user,pass,tipo);
			}
		}	

    });    
});

//	$query = "INSERT INTO tb_usuario ( user, pass, class) VALUES ('$user', '$pass', '$classe')";


$.fn.insertRegister = function(user,pass,tipo){ //

    var dados = "query=INSERT INTO tb_usuario ( user, pass, class) VALUES ('"+user+"', '"+pass+"', '"+tipo+"');";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		success: function(data){
		   	alert("Usuário cadastrado com sucesso!!!");
		   	$("#edtUser").val('');
		   	$("#edtPass").val('');
		   	$("#edtRepass").val('');
		   	$("#edtUser").focus();
		}

	});
	
}
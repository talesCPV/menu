$(document).ready(function(){

    $('#edtCep').keyup(function() {
		txt =  $('#edtCep').val();
		$("#edtCep").val($(this).cep(txt));
    }); 

    $('#edtCnpj').keyup(function() {
		txt =  $('#edtCnpj').val();
		$("#edtCnpj").val($(this).cnpj(txt));
    }); 

    $('#edtTel').keyup(function() {
		txt =  $('#edtTel').val();
		$("#edtTel").val($(this).telefone(txt));
    });

    $('#btnSaveCadEmp').click(function(){ 
		var nome = $.trim($("#edtNome").val().toUpperCase());
		var end = $.trim($("#edtEnd").val().toUpperCase());
		var cidade = $.trim($("#edtCidade").val().toUpperCase());
		var bairro = $.trim($("#edtBairro").val().toUpperCase());
		var num = $.trim($("#edtNum").val().toUpperCase());
		var estado = $("#selEstado").val();
		var cep = $("#edtCep").val();
		var cnpj = $(this).numeros($("#edtCnpj").val());
		var ie = $("#edtIE").val();
		var tipo = $("#selTipo").val();
		var tel = $("#edtTel").val();

		if ($(this).obrigatorio(['edtNome'])){
			$(this).insertRegister(nome,end,cidade,bairro,num,estado,cep,cnpj,ie,tipo,tel);
		}	

    });    
});

//	$query = "INSERT INTO tb_empresa ( nome, endereco, cidade, estado, cep, cnpj, ie, tipo, tel) 
//	VALUES ('$nome', '$endereco', '$cidade','$estado', '$cep', '$cnpj', '$ie','$tipo','$fone')";


$.fn.insertRegister = function(nome,end,cidade,bairro,num,estado,cep,cnpj,ie,tipo,tel){ //

	if ($('#hdCod').val()) {
	    var dados = "query=UPDATE tb_empresa SET  nome ='"+nome+"', endereco ='"+end+"', cidade = '"+cidade+"', bairro = '"+bairro+"', num = '"+tel+"', estado = '"+estado+"', cep = '"+cep+"', cnpj = '"+cnpj+"', ie = '"+ie+"', tipo = '"+tipo+"', tel = '"+tel+"' WHERE id = '"+$('#hdCod').val()+"' ";
	}else{
	    var dados = "query=INSERT INTO tb_empresa ( nome, endereco, cidade, bairro, num, estado, cep, cnpj, ie, tipo, tel) VALUES ('"+nome+"', '"+end+"', '"+cidade+"','"+bairro+"', '"+num+"', '"+estado+"', '"+cep+"', '"+cnpj+"', '"+ie+"', '"+tipo+"', '"+tel+"')";
	}

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		success: function(data){
		   	alert("Empresa cadastrada com sucesso!!!");
		   	$("#edtNome").val('');
		   	$("#edtEnd").val('');
		   	$("#edtCidade").val('');
		   	$("#edtBairro").val('');
		   	$("#edtNum").val('');
		   	$("#edtCep").val('');
		   	$("#edtCnpj").val('');
		   	$("#edtIE").val('');
		   	$("#edtTel").val('');
		   	$("#edtNome").focus();
		}

	});
	
}
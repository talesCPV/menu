$(document).ready(function(){


	$('#selEmp').html($(this).allForn($('#hdEmp').val()));


    $('#edtTel1').keyup(function() {
		txt =  $('#edtTel1').val();
		$("#edtTel1").val($(this).telefone(txt));
    });

    $('#edtTel2').keyup(function() {
		txt =  $('#edtTel2').val();
		$("#edtTel2").val($(this).telefone(txt));
    });

    $('#btnSaveCadAgd').click(function(){ 

		var emp = $("#selEmp").val().toUpperCase();
		var nome = $.trim($("#edtNome").val().toUpperCase());
		var depart = $.trim($("#edtDep").val().toUpperCase());
		var email = $.trim($("#edtEmail").val().toLowerCase());
		var tel1 = $("#edtTel1").val();
		var tel2 = $("#edtTel2").val();

		if ($(this).obrigatorio(['edtNome'])){
			if(email == '' || $(this).email('edtEmail')){
				$(this).insertRegister(emp,nome,depart,email,tel1,tel2);
			}else{
				alert('Email inválido.');
		   		$("#edtEmail").focus();				
			}			
		}	

    });

});

// FUNÇÕES

$.fn.allForn = function(opt){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

    var dados = "query=SELECT id,nome FROM tb_empresa order by nome;";
   	var out = "";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				id = $.parseJSON(JSON.stringify(obj[i])).id;
				nome = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();

			   	if(opt == id){
			   		out = out + "<option value='"+ id +"' selected>" + nome + '</option>' 
			   	}else{
			   		out = out + "<option value='"+ id +"'>" + nome + '</option>' 
			   	}

	        }
		}

	});

	return out;

}


$.fn.insertRegister = function(emp,nome,depart,email,tel1,tel2){ // 

	if ($('#hdCod').val()) {
	    var dados = "query=UPDATE tb_agenda SET  nome = '"+nome+"', email = '"+email+"', depart = '"+depart+"', cel1 = '"+tel1+"', cel2 = '"+tel2+"', id_emp = '"+emp+"' WHERE id = '"+$('#hdCod').val()+"' ";
	}else{
	    var dados = "query=INSERT INTO tb_agenda ( nome, email, cel1, cel2, id_emp, depart) VALUES ('"+nome+"', '"+email+"', '"+tel1+"', '"+tel2+"', '"+emp+"', '"+depart+"')";
	}


	alert(dados);

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		success: function(data){
		   	alert("Contato cadastrado com sucesso!!!");
		   	$("#edtNome").val('');
		   	$("#edtDep").val('');
		   	$("#edtEmail").val('');
		   	$("#edtTel1").val('');
		   	$("#edtTel2").val('');
		   	$("#edtNome").focus();
		},
        error: function(result) {
            alert("Erro na gravação de dados");
        }

	});
	
}
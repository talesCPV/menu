$(document).ready(function(){



	$("#btnCadTinta").click(function(){	
		var cod = $(this).nextRegister();// próximo cód de registro
		var desc = $("#edtDesc").val().toUpperCase();
		var codprod = $("#edtCodProd").val().toUpperCase();
		var custo = $("#edtCusto").val();
		var margem = $("#edtMargem").val();

		if ($(this).obrigatorio(['edtDesc','edtCusto'])){
			$(this).insertRegister(cod,desc,codprod,custo,margem);
		}		
	});


	$('#edtMargem').keyup(function() {
		txt =  $('#edtMargem').val();
		$("#edtMargem").val($(this).numeros(txt));

    }); 

	$('#edtCusto').keyup(function() {
		txt =  $('#edtCusto').val();
		$("#edtCusto").val($(this).moeda(txt));

    });     

//str.substring(1,4);

});

// FUNÇÕES

// SELECT cod FROM tb_produto where tipo='TINTA' order by cod desc limit 1;

// INSERT INTO tb_produto ( descricao, estoque, etq_min, unidade, cod, cod_bar, id_emp, ncm, preco_comp, margem, tipo) 
//            VALUES ('$nome', '99', '0','LATA', '$cod', '$cod_bar', 16, '38081010', '$compra', '$margem', 'TINTA');




$.fn.nextRegister = function(){ // RETORNA O PRÓXIMO REGISTRO DE COD DISPONÍVEL

    var dados = "query=SELECT cod FROM tb_produto where tipo='TINTA' order by cod desc limit 1;";
   	var resp = "0";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			resp = $.parseJSON(JSON.stringify(obj[0])).cod.toUpperCase();
		}

	});
	resp = parseInt(resp,10)+1;

	return resp;

}

$.fn.insertRegister = function(cod,desc,codprod,custo,margem){ // 

    var dados = "query=INSERT INTO tb_produto (descricao, estoque, etq_min, unidade, cod, cod_bar, id_emp, ncm, preco_comp, margem, tipo) VALUES ('"+desc+"', '99', '0','900ml', '"+cod+"', '"+codprod+"', 16, '32081010', '"+custo+"', '"+margem+"', 'TINTA');";
   	var resp = "0";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		success: function(data){
		   	alert("Tinta cadastrada com sucesso!!!");
		   	$("#edtDesc").val('');
		   	$("#edtCodProd").val('');
		   	$("#edtCusto").val('');
		   	$("#edtMargem").val('90');
		   	$("#edtDesc").focus();
		}

	});
	
}
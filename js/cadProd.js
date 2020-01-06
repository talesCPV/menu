$(document).ready(function(){


	$('#selForn').html($(this).allForn('select'));
	$('#selUnd').html($(this).readTxt('../txt/unidades.txt', 'select'));

	$('#edtMargem').keyup(function() {
		txt =  $('#edtMargem').val();
		$("#edtMargem").val($(this).numeros(txt));
    }); 

	$('#edtCusto').keyup(function() {
		txt =  $('#edtCusto').val();
		$("#edtCusto").val($(this).moeda(txt));
    }); 

    $('#edtEtq').keyup(function() {
		txt =  $('#edtEtq').val();
		$("#edtEtq").val($(this).numeros(txt));
    }); 

    $('#edtEtqMin').keyup(function() {
		txt =  $('#edtEtqMin').val();
		$("#edtEtqMin").val($(this).numeros(txt));
    }); 

    $('#edtCod').keyup(function() {
		txt =  $('#edtCod').val();
		$("#edtCod").val($(this).numeros(txt));
    }); 

    $('#edtNcm').keyup(function() {
		txt =  $('#edtNcm').val();
		$("#edtNcm").val($(this).numeros(txt));
    }); 

    $('#btnSaveCadProd').click(function(){ 

		var desc = $.trim($("#edtDesc").val().toUpperCase());
		var forn = $.trim($("#selForn").val().toUpperCase());
		var und = $.trim($("#selUnd").val().toUpperCase());
		var tipo = $.trim($("#selTipo").val().toUpperCase());
		var etq = $("#edtEtq").val();
		var etqmin = $("#edtEtqMin").val();
		var cod = $.trim($("#edtCod").val());
		var codprod = $.trim($("#edtCodProd").val().toUpperCase());
		var ncm = $("#edtNcm").val();
		var custo = $("#edtCusto").val();
		var margem = $("#edtMargem").val();

		if (cod == ''){
			cod = $(this).nextRegister(tipo);
		}

		if ($(this).obrigatorio(['edtDesc','edtCusto','edtMargem'])){
			$(this).insertRegister(desc,forn,und,tipo,etq,etqmin,cod,codprod,ncm,custo,margem);
		}	

    });

});





// FUNÇÕES

$.fn.allForn = function(opt){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

    var dados = "query=SELECT id,nome FROM tb_empresa WHERE tipo='FOR';";
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

				   	if(opt == 'select'){
				   		out = out + "<option value='"+ id +"'>" + nome + '</option>' 
				   	}else{
				        out = out + nome + "\r\n";
				   	}

	        }
		}

	});

	return out;

}

$.fn.readTxt = function(path, opt){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados ="path="+path;
   	var out = "";
	$.ajax({
		url: 'ajax/ajax_getTxt.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
			var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				if(opt == 'select'){
				   		out = out + "<option value='"+ obj[i] +"'>" + obj[i] + '</option>' 
				}
			}

		}

	});

	return out;

}

$.fn.nextRegister = function(param){ // RETORNA O PRÓXIMO REGISTRO DE COD DISPONÍVEL

    var dados = "query=SELECT cod FROM tb_produto where tipo='"+param+"' order by cod desc limit 1;";
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

//	$query = "INSERT INTO tb_produto ( descricao, estoque, etq_min, unidade, cod, cod_bar, id_emp, ncm, preco_comp, margem, tipo) 
//	VALUES ('$nome', '$estoque', '$est_min','$unidade', '$cod', '$cod_bar', '$forn', '$ncm', '$compra', '$margem', '$tipo')";


$.fn.insertRegister = function(desc,forn,und,tipo,etq,etqmin,cod,codprod,ncm,custo,margem){ // 

    var dados = "query=INSERT INTO tb_produto ( descricao, estoque, etq_min, unidade, cod, cod_bar, id_emp, ncm, preco_comp, margem, tipo) VALUES ('"+desc+"', '"+etq+"', '"+etqmin+"','"+und+"', '"+cod+"', '"+codprod+"', '"+forn+"', '"+ncm+"', '"+custo+"', '"+margem+"', '"+tipo+"')";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		success: function(data){
		   	alert("Produto cadastrado com sucesso!!!");
		   	$("#edtDesc").val('');
		   	$("#edtEtq").val('0');
		   	$("#edtEtqMin").val('0');
		   	$("#edtCod").val('');
		   	$("#edtCodProd").val('');
		   	$("#edtNcm").val('');
		   	$("#edtCusto").val('');
		   	$("#edtMargem").val('');
		   	$("#edtDesc").focus();
		}

	});
	
}
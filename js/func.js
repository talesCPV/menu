$(document).ready(function(){

//	MENU

	$("li").click(function(){
		$(this).children().not('i')
		.fadeToggle();
	})

	$("#frmCadTinta").click(function(){
		$(".main").load("html/cadTinta.html");
	});

	$("#frmCadProd").click(function(){
		$(".main").load("html/cadProd.html");
	});

	$("#frmCadEtq").click(function(){	
		$(".main").load("html/cadEtq.html");
	});

	$("#frmCadEmp").click(function(){	
		$(".main").load("html/cadEmp.php");
	});

	$("#frmCadAgenda").click(function(){	
		$(".main").load("html/cadAgd.php");
	});

	$("#frmCadUser").click(function(){	
		$(".main").load("html/cadUsr.html");
	});

	$("#frmCuncExt").click(function(){	
		alert($(this).allForn('select'));
	});

	$("#frmPesquisa").click(function(){	
		$(".main").load("html/pesquisa.html");
	});

});

// VALIDAÇÕES

$.fn.numeros = function(param){ // RECEBE UMA STRING E LIMPA TD QUE NÃO FOR NUMERO DELA
	var pos = ['1','2','3','4','5','6','7','8','9','0'];
	var out = '';
	for(i=0;i<param.length;i++){
		chr = param.substring(i,i+1);
		if(jQuery.inArray(chr,pos) != -1){
			out = out + chr;
		}
	}
	return out;
}

$.fn.moeda = function(param){ // RECEBE UMA STRING E LIMPA TD QUE NÃO FOR NUMERO DELA, só deixa 2 casa depois da virgula
	var pos = ['1','2','3','4','5','6','7','8','9','0'];
	var out = '';
	var aft = 0;

	for(i=0;i<param.length;i++){
		chr = param.substring(i,i+1);

		if((chr == ',' || chr == '.') && aft == 0){ // coloca o ponto e começa a contar as casas
			out = out + '.';
			aft++;

		}

		if(jQuery.inArray(chr,pos) != -1 && aft < 3){
			out = out + chr;
			if(aft > 0){
				aft++;
			}
		}		
	}
	return out;
}

$.fn.obrigatorio = function(param){ // verifica se os campos obrigatorios estao preenchidos (recebe um array com o nome dos IDs como param)

	for(i=0;i<param.length;i++){
		var id = "#" + param[i];
		var val = $.trim($(id).val());
		if(val == ''){
			alert("O campo '" + $(id).attr('name') + "' é obrigatório");
			$(id).focus();
			return false;
		}
	}
	return true;
}

$.fn.cep = function(param){ // formata a string no padrão CEP
	var num = $(this).numeros(param)
	var out = '';
	var count = 0;
	for(i=0;i<num.length;i++){
		chr = num.substring(i,i+1);
		count++;
		if(count == 3){
			out = out + '.';
		}
		if(count == 6){
			out = out + '-';
		}	
		if(count == 9){
			return out;
		}
		out = out + chr;			
		
	}
	return out;
}

$.fn.cnpj = function(param){ // formata a string no padrão CNPJ
	var num = $(this).numeros(param)
	var out = '';
	var count = 0;
	for(i=0;i<num.length;i++){
		chr = num.substring(i,i+1);
		count++;
		if(count == 3 || count == 6){
			out = out + '.';
		}
		if(count == 9){
			out = out + '/';
		}		
		if(count == 13){
			out = out + '-';
		}		
		if(count == 15){
			return out;
		}
		
		out = out + chr;			
	}
	return out;
}

$.fn.telefone = function(param){ // formata a string no padrão CNPJ
	var num = $(this).numeros(param)
	var out = '';
	var count = 0;

	for(i=0;i<num.length;i++){
		chr = num.substring(i,i+1);
		count++;

		if(count == 1){
			out = '(' + out ;
		}
		if(count == 3){
			out = out + ')';
		}
		if(count == 7){
			out = out + '-';
		}
		if(count == 11){
			out = $(this).celular(num);
			return out;
		}		
		out = out + chr;			
	}

	return out;
}

$.fn.celular = function(param){ // formata a string no padrão CNPJ
	var num = $(this).numeros(param)
	var out = '';
	var count = 0;

	for(i=0;i<num.length;i++){
		chr = num.substring(i,i+1);
		count++;

		if(count == 1){
			out = '(' + out ;
		}

		if(count == 3){
			out = out + ')';
		}
		if(count == 4){
			out = out + '.';
		}
		if(count == 8){
			out = out + '-';
		}		
		if(count == 12){
			return out;
		}		
		out = out + chr;			
	}

	return out;
}

$.fn.senha = function(param){ // RECEBE UMA STRING E LIMPA TD QUE NÃO FOR NUMERO DELA
		var pass1 = $.trim($("#" + param[0]).val());
		var pass2 = $.trim($("#" + param[1]).val());
		if(pass1 == pass2){
			return true;
		}else{
			alert('Senhas digitadas não conferem, favor, redigitar a mesma senha.');
			$("#" + param[1]).val('');
			$("#" + param[1]).focus();
			return false;
		}
}

$.fn.email = function(param){ // verifica se um email é válido
	var forbiden = [' ','#','$','%','&','*','!','?','/','|'];
	var email = $.trim($("#" + param).val());
	var arroba = false;
	var dot = false;

	for(i=0;i<email.length;i++){
		chr = email.substring(i,i+1);
		if(chr == '@'){
		 	if(i == 0 || arroba){
		 		return false;
		 	}else{
				arroba = true;
		 	}
		}
		if(chr == '.'){
			if(email.substring(i,i+2) == ".@" || email.substring(i-1,i+1) == "@." || email.substring(i,i+2) == ".." || i == 0 || i == email.length-1){
				return false;
		  	}else{
		  		if(arroba){ // esta depois do '@'
					dot = true;	
				}
			}	
		}
		// caracteres proibidos
		if(jQuery.inArray(chr,forbiden) != -1){
			return false;
		}

	}

	return dot;
}
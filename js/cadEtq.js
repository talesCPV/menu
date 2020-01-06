$(document).ready(function(){

	$('#selDesc').html($(this).allTinta('select'));
	$('#selEtq').html($(this).readTxt('../txt/etq.txt', 'select'));

	$(this).setData();

    $('#edtQtd').keyup(function() {
		txt =  $('#edtQtd').val();
		$("#edtQtd").val($(this).numeros(txt));
    });

	$('#btnAddCadEtq').on('click', function(){
		$(this).addEtq();
		$('#selEtq').html($(this).readTxt('../txt/etq.txt', 'select'));

	});

	$('#btnVisCadEtq').on('click', function(){
		$(this).pdfEtq('../txt/etq.txt');
	});

	$('#btnDelCadEtq').on('click', function(){
		$(this).deleteTxt('../txt/etq.txt');
	});

	$('#selEtq').on('dblclick', function(){
		$('#selEtq').html($(this).delRow('../txt/etq.txt', $('#selEtq').val()));
	});


});

// FUNÇÕES

$.fn.setData = function(){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var year = now.getFullYear();
	$('#edtFab').val([year, month, day].join('-'));
	$('#edtVal').val([year+3, month, day].join('-'));
}

$.fn.allTinta = function(opt){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

    var dados = "query=SELECT * FROM tb_produto WHERE tipo='TINTA' order by cod;";
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
				desc = $.parseJSON(JSON.stringify(obj[i])).descricao.toUpperCase();
				cod = $.parseJSON(JSON.stringify(obj[i])).cod.toUpperCase();

				   	if(opt == 'select'){
				   		out = out + "<option value='"+ desc +"'>" + cod + '-' + desc + '</option>' 
				   	}else{
				        out = out + resp + "\r\n";
				   	}

	        }
		}

	});

	return out;

}

$.fn.addEtq = function(){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var desc = $.trim($('#selDesc').val());
	var cliente = $.trim($('#edtCliente').val());
	var tipo = $.trim($('#selTipo').val());
	var fab = $.trim($('#edtFab').val());
	var val = $.trim($('#edtVal').val());
	var vol = $.trim($('#selVol').val());
	var qtd = $('#edtQtd').val();
	var txt = '';

	for(i=0;i<qtd;i++){
		txt = txt + desc +"|"+ cliente +"|"+ tipo +"|"+ fab +"|"+ val +"|"+ vol +"\r\n";
	}

    var dados = "path=../txt/etq.txt&row="+txt;

	$.ajax({
		url: 'ajax/ajax_putTxt.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
        error: function(result) {
            alert("Erro na gravação de dados");
        }

	});

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
				   		out = out + "<option value='"+ i +"'>" + obj[i] + '</option>' 
				}
			}

		}

	});

	return out;

}

$.fn.deleteTxt = function(path){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados ="path="+path;
	$.ajax({
		url: 'ajax/ajax_delTxt.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
			$('#selEtq').html($(this).readTxt('../txt/etq.txt', 'select'));
		}

	});

	return out;

}

$.fn.delRow = function(path, row){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n
	var dados ="path="+path+"&row="+row;
   	var out = "";
   	var opt = 'select';
	$.ajax({
		url: 'ajax/ajax_delRowTxt.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
			var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				if(opt == 'select'){
				   		out = out + "<option value='"+ i +"'>" + obj[i] + '</option>' 
				}
			}

		}

	});

	return out;

}

$.fn.pdfEtq = function(path){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados ="path="+path;
	var doc = new jsPDF();

	$.ajax({
		url: 'ajax/ajax_getTxt.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
			var obj = $.parseJSON(data);
			var x = 65;
			var y = 5;
			var w = 80;
			var h = 25;


			for(var i=0; i<obj.length-1; i++){

				var etq = obj[i].split('|');
				var desc = etq[0];
				var cli = etq[1];
				var tipo = etq[2];
				var fab = etq[3];
				var val = etq[4];
				var vol = etq[5];

				if(i > 0 && i % 2 === 0){ //variable % 2 === 0 
					doc.addPage('a4', 'p');
					y = 5;
				}
				
				doc.setFillColor(255, 255, 255);
				doc.roundedRect(x, y, w, h, 3, 3, 'FD'); 


				doc.setFont("helvetica");
				doc.setFontSize(9);

				doc.setFontStyle("bold");
				doc.text('FLEXIBUS SANFONADOS LTDA.' , 105, y+4, null, null, 'center');

				doc.setFontStyle("normal");				
				doc.text(desc.substring(0,44) , x+3, y+8);

				switch (tipo) {
					case 'ES': // ESMALTE SINTÉTICO
						doc.text('DILUIÇÃO DE 10% a 20%' , x+3, y+16);
						break;
					case 'AC': // PU ACRÍLICO
						doc.text('CATALIZADOR 573.790    CATÁLISE 2X1' , x+3, y+12);
						doc.text('DILUIÇÃO DE 30% A 40% THINNER 8000' , x+3, y+16);
						break;
					case 'AL': // PU ALQUÍDICO
						doc.text('CATALIZADOR 573.790    CATÁLISE 3X1' , x+3, y+12);
						doc.text('DILUIÇÃO DE 20%            THINNER 8000' , x+3, y+16);
						break;
					case 'LN': // LACA NITRO
						doc.text('DILUIÇÃO DE 100%           THINNER 7000' , x+3, y+16);
						break;
					case 'PL': // POLIÉSTER
						doc.text('NÃO DILUIR, PRODUTO PRONTO PARA USO.' , x+3, y+14);
						break;
				}


				doc.text('Fabricação' , x+3, y+20);
				doc.text(fab.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1') , x+20, y+20);
				doc.text('Validade' , x+42, y+20);
				doc.text(val.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1') , x+56, y+20);

				doc.setFontStyle("bold");
				doc.text('Volume' , x+3, y+24);
				doc.text(vol , x+15, y+24);
				doc.text(cli , x+28, y+24);

				y = y + 27;

			}
//			doc.save('a4.pdf')
			doc.output('dataurlnewwindow'); 

		}

	});

	return out;


}
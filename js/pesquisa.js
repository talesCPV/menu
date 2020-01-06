$(document).ready(function(){

	$('#btnOkPesqProd').click(function(){ // BOTÃO PESQUISAR
		var tipo = $('#selPesq').val(); 
		var busca = $('#edtBusca').val();
		switch (tipo.substring(0,2)){
		case 'pr': 
			$('.title').html('PESQUISA DE PRODUTOS');
			$('#tabItens').html($(this).queryProd(tipo,busca));
			break;
			
		case 'em': 
			$('.title').html('PESQUISA DE EMPRESAS');
			$('#tabItens').html($(this).queryEmp(tipo,busca));
			break;
		case 'ag': 
			$('.title').html('PESQUISA DE AGENDA');
			$('#tabItens').html($(this).queryAgd(tipo,busca));
			break;
		}
	});

	$('#selPesq').change(function(){ // COMBOBOX DO CAMPO DE PESQUISA
		$('#btnOkPesqProd').trigger('click'); // CHAMA A FUNÇÃO CLICK DO BOTÃO PESQUISAR

	});

	$('#tabItens').on('dblclick','.tbl_row', function(){ // SELECIONANDO UM ÍTEM DA TABELA (DUPLO CLIQUE)
		var id = $(this).attr('id');
		var tipo = $('#selPesq').val(); 

		switch (tipo.substring(0,2)){
		case 'pr': 
			$(".content").html($(this).targetProd(id));
			break;
			
		case 'em': 
			$(".content").html($(this).targetEmp(id));
			break;

		case 'ag': 
			$(".content").html($(this).targetAgd(id));
			break;
		}		

		$(".overlay").css("visibility", "visible").css("opacity", "1");  
	});

	$('.close').click(function(){ // BOTÃO FECHAR DO POPUP
		$(".overlay").css("visibility", "hidden").css("opacity", "0");

	});	

	$('#btnDelProd').click(function(){ // BOTÃO DELETAR ÍTEM DO POPUP
		if (confirm('Deseja remover este produto definitivamente do sistema?')) {
			$(this).delProd(id);
		}

	});	

	$('#btnEdtProd').click(function(){ // BOTÃO EDITAR DO POPUP
		alert('Editar');

	});	

});

// FUNÇÕES

$.fn.queryProd = function(tipo,busca){ // RETORNA OS PRODUTOS PESQUISADOS NUMA LISTA

	busca = $.trim(busca);

	switch (tipo) {
		case 'prodDesc': // PESQUISA DE PRODUTO POR DESCRIÇÃO
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.descricao LIKE '%"+busca+"%' AND p.id_emp = e.id AND (p.tipo ='VENDA' or p.tipo ='TINTA') ORDER BY cast(p.cod as unsigned integer)";
			break;
		case 'prodCod': // PESQUISA DE PRODUTO POR CÓDIGO
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.cod = '"+busca+"' AND p.id_emp = e.id ORDER BY cast(p.cod as unsigned integer)";
			break;
		case 'prodForn': // PESQUISA DE PRODUTO POR FORNECEDOR
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON e.nome LIKE '%"+busca+"%' AND p.id_emp = e.id ORDER BY e.nome";
			break;	
		case 'prodServ': // PESQUISA DE PRODUTO TIPO SERVIÇO
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.tipo = 'SERVICO' AND p.id_emp = e.id ORDER BY p.descricao";
			break;	
		case 'prodTinta': // PESQUISA DE PRODUTO TIPO TINTA
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.tipo = 'TINTA' AND p.id_emp = e.id ORDER BY p.cod";
			break;	
		case 'prodPig': // PESQUISA DE PRODUTO TIPO PIGMENTO
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.tipo = 'PIGMTO' AND p.id_emp = e.id ORDER BY p.descricao";
			break;	
		case 'prodEstbx': // PESQUISA DE PRODUTO POR ESTOQUE BAIXO
			var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.estoque <= p.etq_min AND p.id_emp = e.id ORDER BY p.descricao";
			break;	
		}

	var out = "<tr><th>Cod.</th><th>Descrição</th><th>UND </th><th> Estoque </th><th> Cod. Forn. </th><th>Fornecedor</th><th>Preço</th></tr>";

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
				cod_prod = $.parseJSON(JSON.stringify(obj[i])).cod_bar.toUpperCase();
				forn = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				und = $.parseJSON(JSON.stringify(obj[i])).unidade.toUpperCase();
				etq = $.parseJSON(JSON.stringify(obj[i])).estoque;
				compra = $.parseJSON(JSON.stringify(obj[i])).preco_comp;
				margem = $.parseJSON(JSON.stringify(obj[i])).margem;
				preco = compra * (1 + margem/100)

				out = out + "<tr class='tbl_row' id='"+ cod +"'><td>" + cod + '</td><td>'+ desc + '</td><td>'+ und + '</td><td>'+ etq + '</td><td>'+ cod_prod + '</td><td>'+ forn + '</td><td>R$' + preco.toFixed(2) + '</td></tr>' 


	        }
		}

	});

	return out;

}

$.fn.queryEmp = function(tipo,busca){ // RETORNA AS EMPRESAS PESQUISADAS NUMA LISTA

	busca = $.trim(busca);

	switch (tipo) {
		case 'empNome': // PESQUISA DE EMPRESA POR NOME
			var dados = "query=SELECT * FROM tb_empresa WHERE nome LIKE '%"+busca+"%';";
			break;
		case 'empCli': // PESQUISA DE EMPRESA CLIENTES
			var dados = "query=SELECT * FROM tb_empresa WHERE tipo = 'cli';";
			break;
		case 'empFor': // PESQUISA DE EMPRESAS FORNECEDORES
			var dados = "query=SELECT * FROM tb_empresa WHERE tipo = 'for';";
			break;	
		}

	var out = "<tr><th>Cod.</th><th>Nome</th><th>Endereco</th><th>Cidade</th><th>Estado</th><th>CNPJ</th><th>Insc. Est.</th><th>Telefone</th><th>Tipo</th></tr>";

	$.ajax({		
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				cod = $.parseJSON(JSON.stringify(obj[i])).id;
				nome = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				end = $.parseJSON(JSON.stringify(obj[i])).endereco.toUpperCase();
				cidade = $.parseJSON(JSON.stringify(obj[i])).cidade.toUpperCase();
				estado = $.parseJSON(JSON.stringify(obj[i])).estado.toUpperCase();
				cnpj = $.parseJSON(JSON.stringify(obj[i])).cnpj.toUpperCase();
				ie = $.parseJSON(JSON.stringify(obj[i])).ie;
				tel = $.parseJSON(JSON.stringify(obj[i])).tel;
				tipo = $.parseJSON(JSON.stringify(obj[i])).tipo;

				out = out + "<tr class='tbl_row' id='"+ cod +"'><td>" + cod + '</td><td>'+ nome + '</td><td>'+ end + '</td><td>'+ cidade + '</td><td>'+ estado + '</td><td>'+ cnpj + '</td><td>' + ie + '</td><td>'+ tel + '</td><td>'+ tipo + '</td></tr>' ;
	        }
		}

	});

	return out;

}

$.fn.queryAgd = function(tipo,busca){ // RETORNA A AGENDA PESQUISADA NUMA LISTA

	busca = $.trim(busca);

	switch (tipo) {
		case 'agNome': // PESQUISA POR NOME
			var dados = "query=SELECT a.id, a.nome, a.depart, a.email, a.cel1, a.cel2, e.nome as emp FROM tb_agenda a, tb_empresa e WHERE a.nome LIKE '%"+busca+"%' AND a.id_emp = e.id ; ";
			break;
		case 'agEmp': // PESQUISA POR EMPRESA
			var dados = "query=SELECT a.id, a.nome, a.depart, a.email, a.cel1, a.cel2, e.nome as emp FROM tb_agenda AS a INNER JOIN tb_empresa AS e ON e.nome LIKE '%"+busca+"%' AND a.id_emp = e.id ;";
			break;	
		}
		
		alert(dados);
		

	var out = "<tr><th>Cod.</th><th>Nome</th><th>Depart.</th><th>Email</th><th>Celular</th><th>Telefone</th><th>Empresa</th></tr>";

	$.ajax({		
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				cod = $.parseJSON(JSON.stringify(obj[i])).id;
				nome = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				depart = $.parseJSON(JSON.stringify(obj[i])).depart.toUpperCase();
				email = $.parseJSON(JSON.stringify(obj[i])).email.toUpperCase();
				cel = $.parseJSON(JSON.stringify(obj[i])).cel1.toUpperCase();
				tel = $.parseJSON(JSON.stringify(obj[i])).cel2.toUpperCase();
				emp = $.parseJSON(JSON.stringify(obj[i])).emp.toUpperCase();

				out = out + "<tr class='tbl_row' id='"+ cod +"'><td>" + cod + '</td><td>'+ nome + '</td><td>'+ depart + '</td><td>'+ email + '</td><td>'+ cel + '</td><td>'+ tel + '</td><td>' + emp + '</td></tr>' ;
	        }
		}

	});

	return out;

}

$.fn.targetProd = function(id){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados = "query=SELECT p.id, p.cod, p.descricao, p.unidade, p.estoque, p.cod_bar, e.nome, p.preco_comp, p.margem, p.ncm, p.tipo FROM tb_produto AS p INNER JOIN tb_empresa AS e ON p.cod = '"+id+"' AND p.id_emp = e.id ORDER BY cast(p.cod as unsigned integer)";
   	var out = "<table>";

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
				cod_prod = $.parseJSON(JSON.stringify(obj[i])).cod_bar.toUpperCase();
				forn = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				und = $.parseJSON(JSON.stringify(obj[i])).unidade.toUpperCase();
				etq = $.parseJSON(JSON.stringify(obj[i])).estoque;
				compra = $.parseJSON(JSON.stringify(obj[i])).preco_comp;
				margem = $.parseJSON(JSON.stringify(obj[i])).margem;
				preco = compra * (1 + margem/100)

				$('#popTitle').html(desc);

				out = out + "<tr'><td> código</td><td>" + cod + '</td></tr><tr><td>Descrição</td><td>'+ desc + '</td></tr><tr><td>Unidade</td><td>'+ und + '</td></tr><tr><td>Estoque</td><td>'+ etq + '</td></tr><tr><td>Fornecedor .</td><td>'+ forn + '</td></tr><tr><td>Cód. Forn.</td><td>'+ cod_prod + '</td></tr><tr><td>Preço</td><td> R$' + preco.toFixed(2) + '</td></tr>' 


	        }
		}

	});
	out = out + '  </table><div class="cadastro"><table><tr><td><button class="'+cod+'" id="btnEdt">Editar</button></td><td><button class="'+cod+'" id="btnDel">Deletar</button></td></tr></table></div>';

	$(this).addBtn();
	return out;

}

$.fn.targetEmp = function(id){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados = "query=SELECT * FROM tb_empresa WHERE id = '"+id+"';";
   	var out = "<table>";

	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				cod = $.parseJSON(JSON.stringify(obj[i])).id;
				nome = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				end = $.parseJSON(JSON.stringify(obj[i])).endereco.toUpperCase();
				cidade = $.parseJSON(JSON.stringify(obj[i])).cidade.toUpperCase();
				estado = $.parseJSON(JSON.stringify(obj[i])).estado.toUpperCase();
				cnpj = $.parseJSON(JSON.stringify(obj[i])).cnpj.toUpperCase();
				ie = $.parseJSON(JSON.stringify(obj[i])).ie;
				tel = $.parseJSON(JSON.stringify(obj[i])).tel;
				tipo = $.parseJSON(JSON.stringify(obj[i])).tipo;
				cep = $.parseJSON(JSON.stringify(obj[i])).cep;
				bairro = $.parseJSON(JSON.stringify(obj[i])).bairro;
				num = $.parseJSON(JSON.stringify(obj[i])).num;

				myGet = encodeURI("?edtNome="+$.trim(nome)+"&edtEnd="+$.trim(end)+"&edtCidade="+$.trim(cidade)+"&selEstado="+$.trim(estado)+"&edtCnpj="+$.trim(cnpj)+"&edtIe="+$.trim(ie)+"&edtTel="+$.trim(tel)+"&selTipo="+$.trim(tipo)+"&cod="+$.trim(cod)+"&edtCep="+$.trim(cep)+"&edtBairro="+$.trim(bairro)+"&edtNum="+$.trim(num));

				$('#popTitle').html(nome);

				out = out + "<tr'><td>Cod.</td><td>" + cod + '</td></tr><tr><td>Nome</td><td>'+ nome + '</td></tr><tr><td>Endereço</td><td>'+ end + '</td></tr><tr><td>Cidade</td><td>'+ cidade + '</td></tr><tr><td>Estado </td><td>'+ estado + '</td></tr><tr><td>CNPJ</td><td>'+ $(this).cnpj(cnpj)+ '</td></tr><tr><td>I.E</td><td>'+ ie + '</td></tr><tr><td>Telefone</td><td>'+ $(this).telefone(tel) + '</td></tr><tr><td>Tipo</td><td>' + tipo + '</td></tr>' ;


	        }
		}

	});
	out = out + '  </table><div class="cadastro"><table><tr><td><button class="'+myGet+'" id="btnEdt">Editar</button></td><td><button class="'+cod+'" id="btnDel">Deletar</button></td></tr></table></div>';

	$(this).addBtn(cod);
	return out;

}

$.fn.targetAgd = function(id){ // RETORNA TODOS OS FORNECEDORES NUMA LISTA \r\n

	var dados = "query=SELECT a.id, a.nome, a.depart, a.email, a.cel1, a.cel2, e.nome as emp, e.id as idEmp FROM tb_agenda a, tb_empresa e WHERE a.id = '"+id+"' AND a.id_emp = e.id ; ";
   	var out = "<table>";
	$.ajax({
		url: 'ajax/ajax.php',
		type: 'POST',
		dataType: 'html',
		data: dados,
		async: false,
		success: function(data){
		   	var obj = $.parseJSON(data);
			for(var i=0; i<obj.length; i++){
				cod = $.parseJSON(JSON.stringify(obj[i])).id;
				nome = $.parseJSON(JSON.stringify(obj[i])).nome.toUpperCase();
				depart = $.parseJSON(JSON.stringify(obj[i])).depart.toUpperCase();
				email = $.parseJSON(JSON.stringify(obj[i])).email.toLowerCase();
				cel = $.parseJSON(JSON.stringify(obj[i])).cel1.toUpperCase();
				tel = $.parseJSON(JSON.stringify(obj[i])).cel2.toUpperCase();
				emp = $.parseJSON(JSON.stringify(obj[i])).emp.toUpperCase();
				idEmp = $.parseJSON(JSON.stringify(obj[i])).idEmp;

				myGet = encodeURI("?edtNome="+$.trim(nome)+"&edtDep="+$.trim(depart)+"&edtEmail="+$.trim(email)+"&edtTel1="+$.trim(cel)+"&edtTel2="+$.trim(tel)+"&emp="+$.trim(idEmp)+"&cod="+$.trim(cod));

				$('#popTitle').html(nome);

				out = out + "<tr><td>Cod.</td><td>" + cod + '</td></tr><tr><td>Nome</td><td>'+ nome + '</td></tr><tr><td>Depart.</td><td>'+ depart + '</td></tr><tr><td>Email</td><td>'+ email + '</td></tr><tr><td>Celular </td><td>'+ $(this).telefone(cel) + '</td></tr><tr><td>Empresa</td><td>'+ emp + '</td></tr>' ;


	        }
		}

	});
	out = out + ' </table><div class="cadastro"><table><tr><td><button class="'+myGet+'" id="btnEdt">Editar</button></td><td><button class="'+cod+'" id="btnDel">Deletar</button></td></tr></table></div>';

	$(this).addBtn(cod);
	return out;

}

$.fn.addBtn = function(id){ // ADICIONA AS INSTÂNCIAS DOS BOTÕES DO POPUP EM RUNTIME

	var tipo = $('#selPesq').val(); 

	$(document).off('click', '#btnEdt').on('click', '#btnEdt', function() {
		var attr = $(this).attr('class');

		switch (tipo.substring(0,2)){
		case 'pr': 
			alert('Editar Produto '+id);
			break;
			
		case 'em': 
			$(".main").load("html/cadEmp.php"+attr);
			break;

		case 'ag': 
			$(".main").load("html/cadAgd.php"+attr);
			break;
		}
	});

	$(document).off('click', '#btnDel').on('click', '#btnDel', function() {		

		if (confirm('Deseja remover o ítem '+id+' definitivamente do sistema?')) {

			switch (tipo.substring(0,2)){
			case 'pr': 
				var dados = "query=DELETE from tb_produto where cod="+id;
				break;
				
			case 'em': 
				var dados = "query=DELETE from tb_empresa where id="+id;
				break;

			case 'ag': 
				var dados = "query=DELETE from tb_agenda where id="+id;
				break;
			}		

			$.ajax({
				url: 'ajax/ajax.php',
				type: 'POST',
				dataType: 'html',
				data: dados,
				async: false,
				success: function(data){
					$('#btnOkPesqProd').trigger('click'); // CHAMA A FUNÇÃO CLICK DO BOTÃO PESQUISAR PARA ATUALIZAR A LISTA
					$('.close').trigger('click'); // CHAMA A FUNÇÃO CLICK DO BOTÃO CLOSE DO POPUP
				},
				error: function(result) {
		            alert("Erro ao tentar excluir o registro.");
		        }

			});
		}

	});

}

  <script type="text/javascript" src="js/cadEmp.js"></script>

    <div class="cadastro" >
      <label class="title">CADASTRO DE EMPRESAS</label>
      <label> Nome *</label>
      <input id="edtNome" <?php if (IsSet($_GET["edtNome"])){ echo(" value='".$_GET["edtNome"]."' "); } ?> type="text" name="Nome" maxlength="50"/>
      <label> Endereço </label>
      <input id="edtEnd" <?php if (IsSet($_GET["edtEnd"])){ echo(" value='".$_GET["edtEnd"]."' "); } ?> type="text" name="endereco" maxlength="60"/>
      <label> Cidade </label>
      <input id="edtCidade" <?php if (IsSet($_GET["edtCidade"])){ echo(" value='".$_GET["edtCidade"]."' "); } ?> type="text" name="cidade" maxlength="30"/>
      <label> Bairro </label>
      <input id="edtBairro" <?php if (IsSet($_GET["edtBairro"])){ echo(" value='".$_GET["edtBairro"]."' "); } ?> type="text" name="bairro" maxlength="60"  />
      <label> Numero </label>
      <input id="edtNum" <?php if (IsSet($_GET["edtNum"])){ echo(" value='".$_GET["edtNum"]."' "); } ?> type="text" name="num" maxlength="10"  />
      <label> Estado *</label>
      <select id="selEstado" name="estado" id="estado">
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'AC'){ echo('selected'); }} ?> value="AC">Acre</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'AL'){ echo('selected'); }} ?> value="AL">Alagoas</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'AP'){ echo('selected'); }} ?> value="AP">Amapa</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'AM'){ echo('selected'); }} ?> value="AM">Amazonas</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'BA'){ echo('selected'); }} ?> value="BA">Bahia</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'CE'){ echo('selected'); }} ?> value="CE">Ceara</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'ES'){ echo('selected'); }} ?> value="ES">Espirito Santo</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'DF'){ echo('selected'); }} ?> value="DF">Distrito Federal</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'MA'){ echo('selected'); }} ?> value="MA">Maranhao</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'MT'){ echo('selected'); }} ?> value="MT">Mato Grosso</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'MS'){ echo('selected'); }} ?> value="MS">Mato Grosso do Sul</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'MG'){ echo('selected'); }} ?> value="MG">Minas Gerais</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'PA'){ echo('selected'); }} ?> value="PA">Para</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'PB'){ echo('selected'); }} ?> value="PB">Paraiba</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'PR'){ echo('selected'); }} ?> value="PR">Parana</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'PE'){ echo('selected'); }} ?> value="PE">Pernambuco</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'PI'){ echo('selected'); }} ?> value="PI">Piaui</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'RJ'){ echo('selected'); }} ?> value="RJ">Rio de Janeiro</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'RN'){ echo('selected'); }} ?> value="RN">Rio Grande do Norte</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'RS'){ echo('selected'); }} ?> value="RS">Rio Grande do Sul</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'RO'){ echo('selected'); }} ?> value="RO">Rondonia</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'RR'){ echo('selected'); }} ?> value="RR">Roraima</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'SC'){ echo('selected'); }} ?> value="SC">Santa Catarina</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'SP'){ echo('selected'); }} ?> value="SP">Sao Paulo</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'SE'){ echo('selected'); }} ?> value="SE">Sergipe</option>
        <option <?php if(isset($_GET['selEstado'])){ if($_GET['selEstado'] == 'TO'){ echo('selected'); }} ?> value="TO">Tocantins</option>
      </select>
      <label> CEP </label>
      <input id="edtCep" <?php if (IsSet($_GET["edtCep"])){ echo(" value='".$_GET["edtCep"]."' "); } ?> type="text" name="cep" maxlength="10"/>
      <label> CNPJ </label>
      <input id="edtCnpj" <?php if (IsSet($_GET["edtCnpj"])){ echo(" value='".$_GET["edtCnpj"]."' "); } ?> type="text" name="cnpj" maxlength="18"/>
      <label> Inscrição Estadual </label>
      <input id="edtIE" <?php if (IsSet($_GET["edtIe"])){ echo(" value='".$_GET["edtIe"]."' "); } ?> type="text" name="ie" maxlength="14"/>
      <label> Tipo *</label>
      <select id="selTipo" name="tipo">
        <option <?php if(isset($_GET['selTipo'])){ if($_GET['selTipo'] == 'FOR'){ echo('selected'); }} ?> value="FOR">Fornecedor</option>
        <option <?php if(isset($_GET['selTipo'])){ if($_GET['selTipo'] == 'CLI'){ echo('selected'); }} ?> value="CLI">Cliente</option>
      </select>
      <label> Telefone </label>
      <input id="edtTel" <?php if (IsSet($_GET["edtTel"])){ echo(" value='".$_GET["edtTel"]."' "); } ?> type="text" name="fone" maxlength="15"/>
      <input type="hidden" id="hdCod" name="cod" <?php if (IsSet($_GET["cod"])){ echo(" value='".$_GET["cod"]."' "); } ?> >

      <button id="btnSaveCadEmp">Salvar</button>

    </div>
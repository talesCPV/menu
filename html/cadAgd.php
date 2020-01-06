  <script type="text/javascript" src="js/cadAgd.js"></script>

    <div class="cadastro" >
      <label class="title">CADASTRO DE AGENDA</label>
      <label> Empresa </label>
      <select id="selEmp" ></select>
      <label> Nome * </label>
      <input id="edtNome"<?php if (IsSet($_GET["edtNome"])){ echo(" value='".$_GET["edtNome"]."' "); } ?> type="text" name="nome" maxlength="40"/>
      <label> Departamento </label>
      <input id="edtDep" <?php if (IsSet($_GET["edtDep"])){ echo(" value='".$_GET["edtDep"]."' "); } ?> type="text" name="dep" maxlength="15"/>
      <label> Email </label>
      <input id="edtEmail" <?php if (IsSet($_GET["edtEmail"])){ echo(" value='".$_GET["edtEmail"]."' "); } ?> type="text" name="email" id="Lower_Case" maxlength="70"/>
      <label> Celular </label>
      <input id="edtTel1" <?php if (IsSet($_GET["edtTel1"])){ echo(" value='".$_GET["edtTel1"]."' "); } ?> type="text" name="fone1" maxlength="14"/>
      <label> Telefone Fixo </label>
      <input id="edtTel2" <?php if (IsSet($_GET["edtTel2"])){ echo(" value='".$_GET["edtTel2"]."' "); } ?> type="text" name="fone2" maxlength="14"/>
      <input type="hidden" id="hdCod" name="cod" <?php if (IsSet($_GET["cod"])){ echo(" value='".$_GET["cod"]."' "); } ?> >
      <input type="hidden" id="hdEmp" name="emp" <?php if (IsSet($_GET["emp"])){ echo(" value='".$_GET["emp"]."' "); } ?> >
      <button id="btnSaveCadAgd">Salvar</button>

    </div>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="CSS/style.css">
<title>Crud Buses</title>
<!-- Incluir SheetJS -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script type="text/javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Imprima&display=swap"
	rel="stylesheet">
<link rel="stylesheet" href="CSS/style2.css">
</head>
<body>
	<div class="ajustar">

		<h2>Busqueda</h2>
		<br>
		<div class="card-body">
		<div style="display:flex; gap:10px; ">
			<form method="post" action="#" class="credit-card-div">
				<div class="panel panel-default">
					<div class="panel-heading">
							<div class="row"
								style="display: flex; gap: 10px; align-items: center;">
								<div class="col-md-3 col-sm-3 col-xs-3">
									<span class="help-block text-muted small-font">RUTA</span>
									<select class="form-select" aria-label="Default select example"
										id="ctrlRutaID" style="margin-top: 15px; width: 400px;">
										<option selected="selected">Selecciona una opción</option>
										<option value="1">Ruta del Sol Esmeralda</option>
										<option value="2">Camino del Viento Fresco</option>
										<option value="3">Sendero del Arco Iris</option>
										<option value="4">Carretera de la Luna Plateada</option>
										<option value="5">Autopista del Mar Azul</option>
										<option value="6">Avenida del Bosque Encantado</option>
										<option value="7">Paseo del Sol Naciente</option>
										<option value="8">Calle de la Montaña Dorada</option>
										<option value="9">Via de las Estrellas Brillantes</option>
										<option value="10">Trayecto del Río de Cristal</option>
									</select>
								</div>
								
									<div class="col-md-2 col-sm-2 col-xs-2" id="Buscar" style="position: relative;left: 220px;">
										<br>

										<button type="button" class="btn btn-light border-black"
											id="btnBuscarRutas" style="width: auto;" name="btnBuscar">
											BUSCAR</button>
										<button type="button" class="btn btn-light border-black"
											id="btnBuscar" style="width: auto; display: none;"
											name="btnBuscar">Consultar</button>

									</div>
									<div class="col-md-2 col-sm-2 col-xs-2" id="BuscarInactivos"
										style="display: none;">
										<br>
										<button type="button" class="btn btn-light border-black"
											id="btnBuscarInactivos" style="width: auto;"
											name="btnBuscarInactivos">Buscar</button>
									</div>
									<div class="col-md-2 col-sm-3"  style="position: relative;left: 220px;">
										<br />
										<button type="button" class="btn btn-success" id="btnNuevo"
											name="btnNuevo">Nuevo</button>
									</div>
									<div class="col-md-2 col-sm-3" id="ocultar_inactivos"  style="position: relative;left: 220px;">
										<br />
										<button type="button" class="btn btn-danger" id="btnInactivos"
											name="btnInactivos">Inactivos</button>
									</div>
									<div class="col-md-2 col-sm-3" id="mostrar_activos"
										style="display: none;">
										<br />
										<button type="button" class="btn btn-primary" id="btnActivos"
											name="btnActivos">Activos</button>
									</div>
								
							</div>
						</div>
				</div>
			</form>
</div>
			<br> <br>
			<div class="card-header" style="font-weight: bold;">
				<span id="listaBuses">Lista de Buses Activos</span>
			</div>
			<table style="text-align: center; border: 1px solid gray;"
				class="table table-hover table-striped">
				<thead class="border-black">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Codigo</th>
						<th scope="col">Choferes</th>
						<th scope="col">Dni</th>
						<th scope="col">Rutas</th>
						<th scope="col">PLaca</th>
						<th scope="col">Acciones</th>
					</tr>

				</thead>
				<tbody id="detalleTabla">

				</tbody>
			</table>
		</div>
		<br>



		<div class="fondo bg-dark bg-opacity-75" id="divRegistro"
			style="width: auto; height: 100vh; display: none">
			<div class="card" style="width: 40vw; height: 90vh; margin: auto;">
				<div class="card-header" id="tituloRegistro">{accion}</div>
				<div class="card-body">
					<form class="needs-validation" novalidate>
						<input style="display: none;" type="text" id="accion"
							name="accion">
						<div class="row mb-3">


							<div class="col-sm-2" style="display: none;">
								<input type="text" class="form-control" id="frmId"
									disabled="disabled" value="0" style="text-align: center;">
							</div>
						</div>
						<div class="row mb-3">

							<label for="frmCodigo" class="col-sm-2 col-form-label">Codigo</label>

							<div class="col-sm-2">
								<input type="text" class="form-control" id="frmCodigo"
									disabled="disabled" value="0"
									style="text-align: center; width: 150px;">
							</div>
						</div>
						<div class="row mb-4">

							<label for="frmNumber_document" class="col-sm-2 col-form-label">Chofer</label>
							<div class="col-sm-10">

								<div id="contendorNombre">
									<div style="display: flex; gap: 15px;">
										<input type="text" class="form-control" id="frmNombreChofer"
											autocomplete="off" readonly="readonly">

										<button style="width: 40px;"
											onclick="toggleSelectVisibility()">
											<i class="bi bi-pen"></i>
										</button>
									</div>
								</div>
								<select class="form-select" aria-label="Default select example"
									id="selectidPerson" style="margin-top: 15px; display: none;">
									<option selected="selected">Selecciona una opción</option>
									<option value="1">LAZARO HERRERA, Ronaldo</option>
									<option value="2">CONDOR QUISPE, Roberto Carlos</option>
									<option value="3">SANCHEZ FELIPE, Jesus Alberto</option>
									<option value="4">CASTILLO CHIQUISPUMA, Carlos</option>
									<option value="5">SALAZAR SALAZAR, Cristian</option>
									<option value="6">CHAVEZ DE LA CRUZ, Javier</option>
									<option value="7">GUTIERREZ VALDEZ, Luis</option>
									<option value="8">CASTILLO RIVERA, Miguel Angel</option>
									<option value="9">CORONEL SALVADOR, Frencis</option>
									<option value="10">CHAMORRO URBANO, Jose</option>
								</select>

								<script type="text/javascript">
									function toggleSelectVisibility() {
										var select = document
												.getElementById('selectidPerson');
										if (select.style.display === 'block') {
											select.style.display = 'none';
											document.querySelector('button').innerHTML = 'cerrar';
										} else {
											select.style.display = 'block';
											document.querySelector('button').innerText = 'edit';
										}
									}
								</script>
							</div>
						</div>

						<div class="row mb-4" id="contenedorDNI">
							<div style="display: flex; gap: 8px;">
								<label for="frmNames" class="col-sm-2 col-form-label">DNI
									Chofer</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="frmDni"
										readonly="readonly" style="background-color: #ECECEC;">

								</div>
							</div>
						</div>
						<div class="row mb-4" id="contenedorDNI" style="display: none;">
							<div style="display: flex; gap: 8px;">
								<label for="frmNames" class="col-sm-2 col-form-label">personaId
								</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="frmidPersona"
										readonly="readonly" style="background-color: #ECECEC;">

								</div>
							</div>
						</div>
						<div class="row mb-4" id="contenedorDNI" style="display: none;">
							<div style="display: flex; gap: 8px;">
								<label for="frmNames" class="col-sm-2 col-form-label">Rutaid
								</label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="frmidRuta"
										readonly="readonly" style="background-color: #ECECEC;">


								</div>
							</div>
						</div>

						<div class="row mb-4">
							<label for="frmLast_name" class="col-sm-2 col-form-label">Ruta</label>
							<div class="col-sm-10">
								<div id="contenedorRuta">
									<div style="display: flex; gap: 8px;">
										<input type="text" class="form-control" autocomplete="off"
											id="frmNombreRuta" required>
										<button style="width: 40px;" onclick="toggleSelectRuta()">
											<i class="bi bi-pen"></i>
										</button>

									</div>
								</div>
								<select class="form-select" aria-label="Default select example"
									id="selectidRuta" style="margin-top: 15px; display: none;">
									<option selected="selected">Selecciona una opción</option>
									<option value="1">Ruta del Sol Esmeralda</option>
									<option value="2">Camino del Viento Fresco</option>
									<option value="3">Sendero del Arco Iris</option>
									<option value="4">Carretera de la Luna Plateada</option>
									<option value="5">Autopista del Mar Azul</option>
									<option value="6">Avenida del Bosque Encantado</option>
									<option value="7">Paseo del Sol Naciente</option>
									<option value="8">Calle de la Montaña Dorada</option>
									<option value="9">Via de las Estrellas Brillantes</option>
									<option value="10">Trayecto del Río de Cristal</option>
								</select>
							</div>
							<script type="text/javascript">
								function toggleSelectRuta() {
									var select = document
											.getElementById('selectidRuta');
									if (select.style.display === 'block') {
										select.style.display = 'none';
										document.querySelector('button').innerHTML = 'cerrar';
									} else {
										select.style.display = 'block';
										document.querySelector('button').innerText = 'edit';
									}
								}
							</script>
						</div>
						<div class="row mb-4">
							<label for="frmEmail" class="col-sm-2 col-form-label">Placa</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="frmPlaca"
									autocomplete="off" required pattern="[A-Z]{3}-\d{3,4}"
									title="Formato válido: Tres letras seguidas de un guion y tres o cuatro dígitos"
									onchange="validarPlaca()">


							</div>
						</div>

						<script>
							function validarPlaca() {
								var placaInput = document
										.getElementById("frmPlaca");
								var mensajeError = document
										.getElementById("mensajeError");

								if (!placaInput.checkValidity()) {
									mensajeError.style.display = "block";
									document.getElementById("btnProcesar").disabled = true;
								} else {
									mensajeError.style.display = "none";
									document.getElementById("btnProcesar").disabled = false;

								}
							}
						</script>
						<div
							style="display: flex; gap: 70px; justify-content: center; align-items: center; margin-top: 40px;">
							<button type="submit" class="btn btn-primary" id="btnProcesar"
								style="width: auto;">Actualizar</button>
							<button type="button" class="btn btn-danger"
								onclick="cerrarRegistro()" id="btnCancelar" style="width: auto;">Cancelar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		function cerrarRegistro() {
			var divRegistro = document.getElementById('divRegistro');
			divRegistro.style.display = 'none';
		}
	</script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

	<script type="text/javascript" src="JS/crudBuses6.js"></script>

</body>
</html>
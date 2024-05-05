// Constantes del CRUD
const ACCION_NUEVO = "NUEVO";
const ACCION_EDITAR = "EDITAR";
const ACCION_ELIMINAR = "ELIMINAR";
const ACCION_ACTIVAR = "ACTIVAR";

// Arreglo de registros
let arreglo = [];
let arregloInactivos = [];
// Acceder a los controles
let btnBuscar = document.getElementById("btnBuscar");
let btnBuscarInactivos = document.getElementById("btnBuscarInactivos");
let btnInactivos = document.getElementById("btnInactivos");
let btnNuevo = document.getElementById("btnNuevo");
let btnProcesar = document.getElementById("btnProcesar");

// Programar los controles
btnBuscar.addEventListener("click", fnBtnBuscar);
btnInactivos.addEventListener("click", fnBtnInactivos);
btnNuevo.addEventListener("click", fnBtnNuevo);
btnProcesar.addEventListener("click", fnBtnProcesar);



//-------------------------------------------------------------------------------------------------------------//
//--------- BUSCAR --------//

document.addEventListener("DOMContentLoaded", function() {
	// Mostrar la lista de clientes al cargar la página
	fnBtnBuscar();
});

// Función fnBtnBuscar
function fnBtnBuscar() {
	// Datos
	let ctrlNombre = document.getElementById("ctrlNombre").value;
	let ctrlCorreo = document.getElementById("ctrlCorreo").value;

	let url = "VendedorBuscar?nombre=" + ctrlNombre;
	url += "&correo=" + ctrlCorreo;
	// La llama AJAX
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, true);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let respuesta = xhttp.responseText;
			arreglo = JSON.parse(respuesta);
			let detalleTabla = "";
			arreglo.forEach(function(item) {
				detalleTabla += "<tr>";
				detalleTabla += "<th scope='row'>" + item.id + "</th>";
				detalleTabla += "<td>" + item.codigo + "</td>";
				detalleTabla += "<td>" + item.nombreChofer + "</td>";
				detalleTabla += "<td>" + item.dniChofer + "</td>";
				detalleTabla += "<td>" + item.nombreRuta + "</td>";
				detalleTabla += "<td>" + item.placa + "</td>";
				detalleTabla += "<td>";
				detalleTabla += "<button onclick='fnEditar(" + item.id + ");' type='button' class='btn btn-primary' style='width: auto;'>Seleccionar</button> ";
				detalleTabla += "<button onclick='fnEliminar(" + item.id + ");' type='button' class='btn btn-danger' style='width: auto;'>Eliminar</button>";

				detalleTabla += "</td>";
				detalleTabla += "</tr>";
			});
			document.getElementById("detalleTabla").innerHTML = detalleTabla;
		}
	};
	xhttp.send();
}

// Función fnBtnInactivos
function fnBtnInactivos() {
	// Datos
	let ctrlNombre = document.getElementById("ctrlNombre").value;
	let ctrlCorreo = document.getElementById("ctrlCorreo").value;

	let url = "BusesListarInactivo?nombre=" + ctrlNombre;
	url += "&correo=" + ctrlCorreo;
	// La llama AJAX
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, true);
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let respuesta = xhttp.responseText;
			arregloInactivos = JSON.parse(respuesta);
			let detalleTabla = "";
			arregloInactivos.forEach(function(item) {
				detalleTabla += "<tr>";
				detalleTabla += "<th scope='row'>" + item.id + "</th>";
				detalleTabla += "<td>" + item.codigo + "</td>";
				detalleTabla += "<td>" + item.nombreChofer + "</td>";
				detalleTabla += "<td>" + item.dniChofer + "</td>";
				detalleTabla += "<td>" + item.nombreRuta + "</td>";
				detalleTabla += "<td>" + item.placa + "</td>";
				detalleTabla += "<td>" + item.idChofer + "</td>";

				detalleTabla += "<td>";
				detalleTabla += "<button onclick='fnActivar(" + item.id + ");' class='btn btn-success' style='width: auto;'>Restaurar</button> ";
				detalleTabla += "</td>";
				detalleTabla += "</tr>";
			});
			document.getElementById("detalleTabla").innerHTML = detalleTabla;
		}
	};
	xhttp.send();
}



let ocultarInactivos = document.getElementById("ocultar_inactivos");
let Buscar = document.getElementById("Buscar");
let BuscarInactivos = document.getElementById("BuscarInactivos");
let mostrarActivos = document.getElementById("mostrar_activos");

ocultarInactivos.addEventListener("click", function() {
	// Ocultar el botón "Inactivos" y mostrar el botón "Activos"
	ocultarInactivos.style.display = "none";
	mostrarActivos.style.display = "block";
	Buscar.style.display = "none";
	BuscarInactivos.style.display = "block";
	document.getElementById("listaBuses").textContent = "Lista de Buses Inactivos";

	fnBtnInactivos();
});

mostrarActivos.addEventListener("click", function() {
	ocultarInactivos.style.display = "block";
	mostrarActivos.style.display = "none";
	Buscar.style.display = "block";
	BuscarInactivos.style.display = "none";
	document.getElementById("listaBuses").textContent = "Lista de Buses Activos";

	fnBtnBuscar();
});

//---------------------------------------------------------------------------------------------------------------//
//------------------EDITAR--------------------//
function fnEditar(id) {
	// Preparando el formulario
	document.getElementById("tituloRegistro").innerHTML = ACCION_EDITAR + " REGISTRO";
	document.getElementById("accion").value = ACCION_EDITAR;
	document.getElementById("contendorNombre").style.display= 'block';
	document.getElementById("selectidPerson").style.display= 'none';
	document.getElementById("contenedorDNI").style.display= 'block';
	document.getElementById("contenedorRuta").style.display= 'block';
	document.getElementById("selectidRuta").style.display= 'none';
	document.getElementById("btnProcesar").innerHTML= 'Actualizar';
	
	// Cargar los datos del registro que estás editando
	fnCargarForm(id);
	fnEstadoFormulario(ACCION_EDITAR);
	document.getElementById("divRegistro").addEventListener("submit", function(event) {
		event.preventDefault();
	});

	// Mostrar formulario encima de todo
	const divRegistro = document.getElementById("divRegistro");
	divRegistro.style.opacity = "1";
	divRegistro.style.display = "grid";
	divRegistro.style.position = "fixed";
	divRegistro.style.top = "0";
	divRegistro.style.left = "0";
	divRegistro.style.width = "100%";
	divRegistro.style.height = "100%";
	divRegistro.style.zIndex = "1000"; // Asegura que esté en la parte superior
	document.getElementById("divRegistro").style.placeItems = "center";
}

//---------------------------------------------------------------------------------------------------
//-----------------------ELIMINAR--------------------------//
// Función fnEliminar
function fnEliminar(id) {
	Swal.fire({
		text: "Estas seguro de eliminar este empleado?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Aceptar!"
	}).then((result) => {
		if (result.isConfirmed) {
			// Aquí podrías llamar a tu función de eliminación con el ID
			// fnEliminar(id);
			Swal.fire({
				title: "Eliminado!",
				text: "Empleado Eliminado Correctamente",
				icon: "success"
			});
			// Si el usuario elige "Aceptar", procedemos con la eliminación
			document.getElementById("accion").value = ACCION_ELIMINAR;
			fnCargarForm(id);
			fnBtnProcesar();
			fnBtnBuscar();
		}
	});
		console.log(id)

}


function fnBtnProcesarElimado() {
	// Validar
	if (!fnValidar()) {
		return;
	}

	// Preparar los datos
	let datos = "accion=" + document.getElementById("accion").value;
	datos += "&id=" + document.getElementById("frmId").value;
	datos += "&placa=" + document.getElementById("frmPlaca").value;
	datos += "&idchofer=" + document.getElementById("selectidPerson").value;
	datos += "&idruta=" + document.getElementById("selectidRuta").value;
	

	// El envío con AJAX
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "VendedorProcesar", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// La solicitud se completó correctamente
				console.log(xhr.responseText);	
			} else {
				// Manejar el error aquí si es necesario
				console.error("Error en la solicitud AJAX");
				console.error(datos)
			}
			// Limpia los campos después de guardar
			limpiarCampos();
		}
	};
	console.log(datos);
	xhr.send(datos);

}

//---------------------------------------------------------------------------------------------------
//-----------------------REACTIVAR--------------------------//

// Funcion fnEliminar
function fnActivar(id) {
	Swal.fire({
		text: "Estas seguro de reactivar a este empleado?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Aceptar"
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: "Reactivado",
				text: "Empleado reactivado correctamente",
				icon: "success"
			});
			document.getElementById("accion").value = ACCION_ACTIVAR;
			fnCargarFormInactivos(id);
			fnBtnProcesar();
			fnBtnBuscarInactivos();
		}
	});
}
//----------------------------------------------------------------------------------------------------------
//-------------------------------------PROCESO----------------------------------------------

let estadoActual = document.getElementById("listaEmpleadosTitulo").textContent;


function fnBtnProcesar() {
	// Validar
	if (!fnValidar()) {
		return;
	}

	// Preparar los datos
	let datos = "accion=" + document.getElementById("accion").value;
	datos += "&id=" + document.getElementById("frmId").value;
	datos += "&placa=" + document.getElementById("frmPlaca").value;
	datos += "&idchofer=" + document.getElementById("selectidPerson").value;
	datos += "&idruta=" + document.getElementById("selectidRuta").value;
	

	// El envío con AJAX
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "VendedorProcesar", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// La solicitud se completó correctamente
				console.log(xhr.responseText);
				// Actualizar la lista de clientes automáticamente según el estado actual
				if (estadoActual === "Lista de Buses Activos") {
					fnBtnBuscar(); // Actualizar la lista de activos
				} else if (estadoActual === "Lista de Buses Inactivos") {
					fnBtnBuscarInactivos(); // Actualizar la lista de inactivos
				}
			
			} else {
				// Manejar el error aquí si es necesario
				console.error("Error en la solicitud AJAX");
				console.error(datos)
			}
			// Limpia los campos después de guardar
			limpiarCampos();
		}
	};
	console.log(datos);
	xhr.send(datos);

}
//--------------------------------------------------------------------------------------------------------------------
//------------------------LIMPIAR CAMPOS--------------------------------------
// Función para limpiar los campos y reiniciar la validación
function limpiarCampos() {
	// Limpiar todos los campos del formulario
	frmCodigo.value = "";

	frmNombreChofer.value = "";
	frmDni.value = "";
	frmNombreRuta.value = "";

	// Eliminar clases de validación de Bootstrap
	frmNombreChofer.classList.remove('is-valid', 'is-invalid');
	frmDni.classList.remove('is-valid', 'is-invalid');
	frmNombreRuta.classList.remove('is-valid', 'is-invalid');
	frmPlaca.classList.remove('is-valid', 'is-invalid');
	

	// También puedes ocultar el formulario si lo deseas
	document.getElementById("divRegistro").style.display = "none";
}

//--------------------------------------------------------------------------------------------------------------------
//--------------------NUEVO-------------------------------//
// Funcion fnBtnNuevo
function fnBtnNuevo() {
	// Preparando el formulario
	document.getElementById("tituloRegistro").innerHTML = ACCION_NUEVO + " REGISTRO";
	document.getElementById("accion").value = ACCION_NUEVO;
	document.getElementById("contendorNombre").style.display= 'none';
	document.getElementById("selectidPerson").style.display= 'block';
	document.getElementById("contenedorDNI").style.display= 'none';
	document.getElementById("contenedorRuta").style.display= 'none';
	document.getElementById("selectidRuta").style.display= 'block';

	document.getElementById("btnProcesar").innerHTML= 'Registrar';

	fnEstadoFormulario(ACCION_NUEVO);
	document.getElementById("divRegistro").addEventListener("submit", function(event) {
		event.preventDefault();
	});
	
	frmCodigo.value = "CDBS-000";

	frmNombreChofer.value = "";
	frmDni.value = "";
	frmNombreRuta.value = "";
	frmPlaca.value = "";


	const divRegistro = document.getElementById("divRegistro");
	divRegistro.style.opacity = "1";
	divRegistro.style.display = "grid";
	divRegistro.style.position = "fixed";
	divRegistro.style.top = "0";
	divRegistro.style.left = "0";
	divRegistro.style.width = "100%";
	divRegistro.style.height = "100%";
	divRegistro.style.zIndex = "1000"; 
	document.getElementById("divRegistro").style.placeItems = "center";
}





//---------------------------------------------------------------------------------------------------------------


function fnCargarForm(id) {
	arreglo.forEach(function(item) {
		if (item.id == id) {
			frmId.value = item.id;
			frmCodigo.value = item.codigo;
			frmNombreChofer.value = item.nombreChofer;
			frmDni.value = item.dniChofer;
			frmNombreRuta.value = item.nombreRuta;
			frmPlaca.value = item.placa;
					
			return true;
		}
	});
}

function fnCargarFormInactivos(id) {
	arregloInactivos.forEach(function(item) {
		if (item.id == id) {
			frmNombreChofer.value = item.nombreChofer;
			frmDni.value = item.dniChofer;
			frmNombreRuta.value = item.nombreRuta;
			frmPlaca.value = item.placa;

			return true;
		}
	});
}



function fnEstadoFormulario(estado) {
	frmNombreChofer.disabled = (estado == ACCION_ELIMINAR)
	frmDni.disabled = (estado == ACCION_ELIMINAR)
	frmNombreRuta.disabled = (estado == ACCION_ELIMINAR)
	frmPlaca.disabled = (estado == ACCION_ELIMINAR)
	if (estado == ACCION_NUEVO) {
		frmId.value = "0";
		frmNombreChofer.value = "";
		frmDni.value = "";
		frmNombreRuta.value = "";
		frmPlaca.value = "";
	}
}

function fnValidar() {

	return true;
}

document.getElementById("btnCancelar").addEventListener("click", function() {
	// Oculta el formulario
	document.getElementById("divRegistro").style.display = "none";
	// Ocultar el campo frmId
	// Limpia los campos después de guardar
	limpiarCampos();
	reiniciarValidacion();
});
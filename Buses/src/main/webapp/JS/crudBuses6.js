const ACCION_NUEVO = "NUEVO";
const ACCION_EDITAR = "EDITAR";
const ACCION_ELIMINAR = "ELIMINAR";
const ACCION_ACTIVAR = "ACTIVAR";

let arreglo = [];
let arregloInactivos = [];
let btnBuscarRutas = document.getElementById('btnBuscarRutas');
let btnBuscar = document.getElementById("btnBuscar");
let btnBuscarInactivos = document.getElementById("btnBuscarInactivos");
let btnInactivos = document.getElementById("btnInactivos");
let btnNuevo = document.getElementById("btnNuevo");
let btnProcesar = document.getElementById("btnProcesar");


btnBuscarRutas.addEventListener('click', fnBtnBuscarRutas);
btnBuscar.addEventListener("click", fnBtnBuscar);
btnInactivos.addEventListener("click", fnBtnInactivos);
btnNuevo.addEventListener("click", fnBtnNuevo);
btnProcesar.addEventListener("click", fnBtnProcesar);



document.addEventListener("DOMContentLoaded", function() {
	fnBtnBuscar();
});

function fnBtnBuscarRutas() {
    let ctrlRutaID = document.getElementById("ctrlRutaID").value;

    let url = "BusesBuscar?ruta=" + ctrlRutaID;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                let respuesta = xhttp.responseText;
                if (respuesta.trim() !== "") {
                    let arreglo = JSON.parse(respuesta);
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
                } else {
                    console.error("La respuesta está vacía");
                }
            } else {
                console.error("Error en la solicitud AJAX");
            }
        }
    };
    xhttp.send();
}

function fnBtnBuscar() {
	let ctrlRutaID = document.getElementById("ctrlRutaID").value;

	let url = "BusesListar?ruta=" + ctrlRutaID;
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

function fnBtnInactivos() {
	let ctrlRutaID = document.getElementById("ctrlRutaID").value;

	let url = "BusesListarInactivo?ruta=" + ctrlRutaID;
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


function fnEditar(id) {
	document.getElementById("tituloRegistro").innerHTML = ACCION_EDITAR + " REGISTRO";
	document.getElementById("accion").value = ACCION_EDITAR;
	document.getElementById("contendorNombre").style.display= 'block';
	document.getElementById("selectidPerson").style.display= 'none';
	document.getElementById("contenedorDNI").style.display= 'block';
	document.getElementById("contenedorRuta").style.display= 'block';
	document.getElementById("selectidRuta").style.display= 'none';
	document.getElementById("btnProcesar").innerHTML= 'Actualizar';
	fnCargarForm(id);
	fnEstadoFormulario(ACCION_EDITAR);
	document.getElementById("divRegistro").addEventListener("submit", function(event) {
		event.preventDefault();
	});

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
			
			Swal.fire({
				title: "Eliminado!",
				text: "Empleado Eliminado Correctamente",
				icon: "success"
			});
		
			document.getElementById("accion").value = ACCION_ELIMINAR;
			fnCargarForm(id);
			fnBtnProcesarElimado();
			fnBtnBuscar();
		}
	});
		console.log(id)

}


function fnBtnProcesarElimado() {
	if (!fnValidar()) {
		return;
	}

	let datos = "accion=" + document.getElementById("accion").value;
	datos += "&id=" + document.getElementById("frmId").value;
	datos += "&placa=" + document.getElementById("frmPlaca").value;
	datos += "&idchofer=" + document.getElementById("frmidPersona").value;
	datos += "&idruta=" + document.getElementById("frmidRuta").value;
	

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "BusesProcesar", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);	
			} else {
				console.error("Error en la solicitud AJAX");
				console.error(datos)
			}
			limpiarCampos();
		}
	};
	console.log(datos);
	xhr.send(datos);

}

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
			fnBtnProcesarActivacion();
			fnBtnBuscarInactivos();
		}
	});
}


function fnBtnProcesarActivacion() {
	if (!fnValidar()) {
		return;
	}
	let datos = "accion=" + document.getElementById("accion").value;
	datos += "&id=" + document.getElementById("frmId").value;
	datos += "&placa=" + document.getElementById("frmPlaca").value;
	datos += "&idchofer=" + document.getElementById("frmidPersona").value;
	datos += "&idruta=" + document.getElementById("frmidRuta").value;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "BusesProcesar", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
				if (estadoActual === "Lista de Buses Activos") {
					fnBtnBuscar(); 
				} else if (estadoActual === "Lista de Buses Inactivos") {
					fnBtnBuscarInactivos(); 
				}
			
			} else {
				console.error("Error en la solicitud AJAX");
				console.error(datos)
			}
			limpiarCampos();
		}
	};
	console.log(datos);
	xhr.send(datos);

}


let estadoActual = document.getElementById("listaEmpleadosTitulo").textContent;


function fnBtnProcesar() {
	if (!fnValidar()) {
		return;
	}
	let datos = "accion=" + document.getElementById("accion").value;
	datos += "&id=" + document.getElementById("frmId").value;
	datos += "&placa=" + document.getElementById("frmPlaca").value;
	datos += "&idchofer=" + document.getElementById("selectidPerson").value;
	datos += "&idruta=" + document.getElementById("selectidRuta").value;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "BusesProcesar", true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
				if (estadoActual === "Lista de Buses Activos") {
					fnBtnBuscar(); 
				} else if (estadoActual === "Lista de Buses Inactivos") {
					fnBtnBuscarInactivos();
				}	
			} else {
				console.error("Error en la solicitud AJAX");
				console.error(datos)
			}
			
			limpiarCampos();
		}
	};
	console.log(datos);
	xhr.send(datos);

}
function limpiarCampos() {
	frmCodigo.value = "";

	frmNombreChofer.value = "";
	frmDni.value = "";
	frmNombreRuta.value = "";

	frmNombreChofer.classList.remove('is-valid', 'is-invalid');
	frmDni.classList.remove('is-valid', 'is-invalid');
	frmNombreRuta.classList.remove('is-valid', 'is-invalid');
	frmPlaca.classList.remove('is-valid', 'is-invalid');
	

	document.getElementById("divRegistro").style.display = "none";
}


function fnBtnNuevo() {
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




function fnCargarForm(id) {
	arreglo.forEach(function(item) {
		if (item.id == id) {
			frmId.value = item.id;
			frmCodigo.value = item.codigo;
			frmNombreChofer.value = item.nombreChofer;
			frmDni.value = item.dniChofer;
			frmNombreRuta.value = item.nombreRuta;
			frmPlaca.value = item.placa;
			frmidPersona.value= item.idChofer;
			frmidRuta.value= item.idRuta;		
			return true;
		}
	});
}

function fnCargarFormInactivos(id) {
	arregloInactivos.forEach(function(item) {
		if (item.id == id) {
			frmId.value = item.id;
			frmCodigo.value = item.codigo;
			frmNombreChofer.value = item.nombreChofer;
			frmDni.value = item.dniChofer;
			frmNombreRuta.value = item.nombreRuta;
			frmPlaca.value = item.placa;
			frmidPersona.value= item.idChofer;
			frmidRuta.value= item.idRuta;

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
	document.getElementById("divRegistro").style.display = "none";
	limpiarCampos();
	reiniciarValidacion();
});
package pe.edu.vallegrande.app.prueba;

import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class Activar {
	public static void main(String[] args) {
		try {
			// Datos de consulta
			Integer id = 3;
			// Proceso
			CrudBusesService service = new CrudBusesService();
			service.activar(id);
			// Reporte
			System.out.println("Registro Reactivado.");
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}
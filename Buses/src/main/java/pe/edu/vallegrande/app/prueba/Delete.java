package pe.edu.vallegrande.app.prueba;

import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class Delete {
	public static void main(String[] args) {
		try {
			Integer id = 3;
			CrudBusesService service = new CrudBusesService();
			service.delete(id);
			System.out.println("Registro eliminado logicamente.");
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}
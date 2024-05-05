package pe.edu.vallegrande.app.prueba;

import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class Insertar {
	public static void main(String[] args) {
		try {
			BusesModel model = new BusesModel();
			model.setPlaca("AWE-421");
			model.setIdChofer(2);
			model.setIdRuta(1);
			CrudBusesService service = new CrudBusesService();
			service.insert(model); 
			System.out.println("Registrado correctamente");
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}

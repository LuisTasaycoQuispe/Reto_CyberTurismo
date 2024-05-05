package pe.edu.vallegrande.app.prueba;

import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class Editar {
	public static void main(String[] args) {
		try {
			Integer BusId = 2;
			CrudBusesService consultaService = new CrudBusesService();
			BusesModel Buses = consultaService.getById(BusId);

			if (Buses != null) {
				Buses.setPlaca("ld2-342");
				Buses.setIdChofer(1);
				Buses.setIdRuta(1);

				CrudBusesService servicio = new CrudBusesService();
				servicio.update(Buses);
				System.out.println("Bus actualizado con éxito");
			} else {
				System.out.println("El Bus con ID " + BusId + " no existe.");
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}
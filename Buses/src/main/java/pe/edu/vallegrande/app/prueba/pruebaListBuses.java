package pe.edu.vallegrande.app.prueba;

import java.util.List;

import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class pruebaListBuses {
	public static void main(String[] args) {
		try {
			CrudBusesService service = new CrudBusesService();
			List<BusesModel> lista = service.getAll();

			System.out.println("Total de Filas: " + lista.size());
			for (BusesModel rec : lista) {
				System.out.println(
						rec.getCodigo() + " - " + rec.getId() + " - " + rec.getPlaca() + " - " + rec.getNombreChofer()
								+ " - " + rec.getNombreRuta() + " - " + rec.getDniChofer() + " - " + rec.getIdChofer() + " - " + rec.getIdRuta());
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}

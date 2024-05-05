package pe.edu.vallegrande.app.prueba;

import java.util.List;

import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.impl.CrudBusesService;

public class Busqueda {
	public static void main(String[] args) {
		try {
			// Datos de consulta
			BusesModel model = new BusesModel();
			model.setIdRuta(9);
			
			// Proceso
			CrudBusesService service = new CrudBusesService();
			List<BusesModel> lista = service.get(model);
			// Reporte
			System.out.println("LISTADO");
			System.out.println("Registros: " + lista.size());
			for (BusesModel rec : lista) {
				System.out.println(rec.getCodigo() + " - " + rec.getId() + " - " + rec.getPlaca() + " - " + rec.getNombreChofer()
				+ " - " + rec.getNombreRuta() + " - " + rec.getDniChofer() + " - " + rec.getIdChofer() + " - " + rec.getIdRuta());
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
	}
}
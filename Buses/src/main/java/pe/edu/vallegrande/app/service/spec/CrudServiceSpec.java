package pe.edu.vallegrande.app.service.spec;

import java.util.List;

import pe.edu.vallegrande.app.model.BusesModel;

public interface CrudServiceSpec<T> {

	/**
	 * Consulta todos los registros de la tabla.
	 *
	 * @return Retorna una lista de objetos.
	 */
	List<T> getAll();

	BusesModel update(BusesModel bean);

	void delete(Integer id);

	BusesModel insert(BusesModel bean);

	List<BusesModel> getAllInactivo();

	void activar(Integer id);

	List<BusesModel> get(BusesModel model);

}
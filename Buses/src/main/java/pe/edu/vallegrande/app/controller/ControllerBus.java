package pe.edu.vallegrande.app.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.impl.CrudBusesService;

@WebServlet({ "/BusesBuscar", "/BusesProcesar", "/BusesListarInactivo", "/BusesListar"})
public class ControllerBus extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private CrudBusesService busesService = new CrudBusesService();

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String path = request.getServletPath();
        switch (path) {
            case "/BusesBuscar":
                buscar(request, response);
                break;
            case "/BusesListar":
                listar(request, response);
                break;
            case "/BusesProcesar":
                procesar(request, response);
                break;
            case "/BusesListarInactivo":
            	listarInactivo(request, response);
                break;
            default:
                break;
        }
    }

    private void buscar(HttpServletRequest request, HttpServletResponse response) {
		Integer ruta = Integer.parseInt(request.getParameter("ruta"));
		BusesModel model = new BusesModel();
		model.setIdRuta(ruta);
		List<BusesModel> lista = busesService.get(model);
		Gson gson = new Gson();
		String data = gson.toJson(lista);
		ControllerUtil.responseJson(response, data);
	}

	private void listar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<BusesModel> lista = busesService.getAll();
        Gson gson = new Gson();
        String data = gson.toJson(lista);
        ControllerUtil.responseJson(response, data);
    }

    
    private void listarInactivo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<BusesModel> lista = busesService.getAllInactivo();
        Gson gson = new Gson();
        String data = gson.toJson(lista);
        ControllerUtil.responseJson(response, data);
    }
    
    
    private void procesar(HttpServletRequest request, HttpServletResponse response) {
		// Datos
		String accion = request.getParameter("accion");
		BusesModel bean = new BusesModel();
		String idStr = request.getParameter("id");
		Integer id = Integer.parseInt(idStr);

		bean.setId(Integer.parseInt(request.getParameter("id")));
		bean.setPlaca(request.getParameter("placa"));
		bean.setState(request.getParameter("state"));
		bean.setIdChofer(Integer.parseInt(request.getParameter("idchofer")));
		bean.setIdRuta(Integer.parseInt(request.getParameter("idruta")));
		
		// Proceso
		try {
			switch (accion) {			
			case ControllerUtil.CRUD_EDITAR:
				busesService.update(bean);
				break;
			case ControllerUtil.CRUD_ELIMINAR:
				busesService.delete(id);
				break;
			case ControllerUtil.CRUD_NUEVO:
				busesService.insert(bean);
				break;
			case ControllerUtil.CRUD_ACTIVAR:
				busesService.activar(id);
				break;
			default:
				throw new IllegalArgumentException("Unexpected value: " + accion);
			}
			ControllerUtil.responseJson(response, "Proceso ok.");
		} catch (Exception e) {
			ControllerUtil.responseJson(response, e.getMessage());
		}
	}
  
}

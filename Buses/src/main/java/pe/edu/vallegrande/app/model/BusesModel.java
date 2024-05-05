package pe.edu.vallegrande.app.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BusesModel {
	private String codigo;
	private Integer id;
	private String placa;
	private Integer idChofer;
	private String nombreChofer;
	private Integer idRuta;
	private String nombreRuta;
	private Integer dniChofer;
	private String state;
}

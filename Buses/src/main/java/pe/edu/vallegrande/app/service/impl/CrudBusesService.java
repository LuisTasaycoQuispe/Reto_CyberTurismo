package pe.edu.vallegrande.app.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import pe.edu.vallegrande.app.db.AccesoDB;
import pe.edu.vallegrande.app.model.BusesModel;
import pe.edu.vallegrande.app.service.spec.CrudServiceSpec;

public class CrudBusesService implements CrudServiceSpec<BusesModel> {
	// LISTAR LOS CLIENTES ACTIVOS
	@Override
	public List<BusesModel> getAll() {
		List<BusesModel> lista = new ArrayList<>();
		Connection cn = null;
		BusesModel rec = null;
		try {
			cn = AccesoDB.getConnection();
			String sql = "SELECT  'CDBS-' || LPAD(b.id_bus, 3, '0') AS codigo, b.id_bus, b.num_placa, UPPER(c.apellido_chofer) || ', ' || c.nom_chofer AS nombre_chofer,  r.nom_rutas AS nombre_rutas,b.id_ruta AS IdRuta,c.dni_chofer as dniChofer, b.id_chofer AS IdChofer, b.state as ESTADO "
					+ "FROM tb_buses b " + "INNER JOIN tb_choferes c ON b.id_chofer = c.id_chofer "
					+ " INNER JOIN tb_rutas r ON b.id_ruta = r.id_ruta  where b.STATE ='A' ORDER BY ID_BUS DESC ";			
			PreparedStatement pstm = cn.prepareStatement(sql);
			ResultSet rs = pstm.executeQuery();
			while (rs.next()) {
				rec = new BusesModel();
				rec.setId(rs.getInt("id_bus"));
				rec.setPlaca(rs.getString("num_placa"));
				rec.setNombreChofer(rs.getString("nombre_chofer"));
				rec.setIdChofer(rs.getInt("IdChofer"));
				rec.setCodigo(rs.getString("Codigo"));
				rec.setIdRuta(rs.getInt("IdRuta"));
				rec.setNombreRuta(rs.getString("nombre_rutas"));
				rec.setDniChofer(rs.getInt("dniChofer"));
				rec.setState(rs.getString("ESTADO"));

				lista.add(rec);
			}
			rs.close();
			pstm.close();
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		return lista;
	}

	@Override
	public BusesModel update(BusesModel bean) {
		// Variables
		Connection cn = null;
		PreparedStatement pstm;
		String sql;
		// Proceso
		try {
			// Inicio de la TX
			cn = AccesoDB.getConnection();
			cn.setAutoCommit(false);
			// Actualizar registro
			sql = "UPDATE TB_BUSES SET NUM_PLACA = ?, ID_CHOFER = ?, ID_RUTA = ? WHERE ID_BUS = ?";
			pstm = cn.prepareStatement(sql);
			pstm.setString(1, bean.getPlaca());
			pstm.setInt(2, bean.getIdChofer());
			pstm.setInt(3, bean.getIdRuta());
			pstm.setInt(4, bean.getId());
			int filas = pstm.executeUpdate();
			pstm.close();
			if (filas == 0) {
				throw new SQLException("ID no existe");
			}
			// Fin de la TX
			cn.commit();
		} catch (SQLException e) {
			try {
				cn.rollback();
			} catch (Exception e2) {
			}
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		// Reporte: Devolver el objeto actualizado
		return bean;
	}

	public BusesModel getById(Integer id) {
		Connection cn = null;
		BusesModel bean = null;
		// proceso
		try {
			cn = AccesoDB.getConnection();
			String sql = "SELECT ID_BUS, NUM_PLACA, ID_CHOFER, ID_RUTA FROM TB_BUSES WHERE ID_BUS = ?";
			PreparedStatement pstm = cn.prepareStatement(sql);
			pstm.setInt(1, id);
			ResultSet rs = pstm.executeQuery();
			if (rs.next()) {
				bean = new BusesModel();
				bean.setId(rs.getInt("ID_BUS"));
				bean.setPlaca(rs.getString("NUM_PLACA"));
				bean.setIdChofer(rs.getInt("ID_CHOFER"));
				bean.setIdRuta(rs.getInt("ID_RUTA"));
			}
			rs.close();
			pstm.close();
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		return bean;
	}
	
	@Override
	public BusesModel insert(BusesModel bean) {
		// Variables
		Connection cn = null;
		PreparedStatement pstm;
		String sql;
		// Proceso
		try {
			// Inicio de la TX
			cn = AccesoDB.getConnection();
			cn.setAutoCommit(false);
			// Insertar registro
			sql = "INSERT INTO TB_BUSES (NUM_PLACA, ID_CHOFER, ID_RUTA) VALUES (?, ?,?) ";
			pstm = cn.prepareStatement(sql);
			pstm.setString(1, bean.getPlaca());
			pstm.setInt(2, bean.getIdChofer());
			pstm.setInt(3, bean.getIdRuta());
			pstm.executeUpdate();
			cn.commit();
		} catch (SQLException e) {
			try {
				cn.rollback();
			} catch (Exception e2) {
			}
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		// Reporte
		return bean;
	}
	
	@Override
	public void delete(Integer id) {
		// Variables
		Connection cn = null;
		PreparedStatement pstm;
		String sql;
		int filas;
		// Proceso
		try {
			// Inicio de la TX
			cn = AccesoDB.getConnection();
			cn.setAutoCommit(false);
			// Insertar registro
			sql = "UPDATE TB_BUSES SET STATE = 'I' WHERE id_bus = ? ";
			pstm = cn.prepareStatement(sql);
			pstm.setInt(1, id);
			filas = pstm.executeUpdate();
			pstm.close();
			if (filas == 0) {
				throw new SQLException("ID no existe");
			}
			cn.commit();
		} catch (SQLException e) {
			try {
				cn.rollback();
			} catch (Exception e2) {
			}
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
	}
	@Override
	public List<BusesModel> get(BusesModel model) {
				List<BusesModel> lista = new ArrayList<>();
		Connection cn = null;
		BusesModel rec = null;
		try {
			cn = AccesoDB.getConnection();
			String sql = "Select CODIGO, ID_BUS, NUM_PLACA, NOMBRE_CHOFER, NOMBRE_RUTAS, ID_RUTA,DNICHOFER, IDCHOFER, STATE FROM BUSES_VIEW WHERE ID_RUTA = ? ";
			PreparedStatement pstm = cn.prepareStatement(sql);
			pstm.setInt(1, model.getIdRuta());
			ResultSet rs = pstm.executeQuery();
			while (rs.next()) {
				rec = new BusesModel();
				rec.setId(rs.getInt("ID_BUS"));
				rec.setPlaca(rs.getString("NUM_PLACA"));
				rec.setNombreChofer(rs.getString("NOMBRE_CHOFER"));
				rec.setIdChofer(rs.getInt("IDCHOFER"));
				rec.setCodigo(rs.getString("CODIGO"));
				rec.setIdRuta(rs.getInt("ID_RUTA"));

				rec.setNombreRuta(rs.getString("NOMBRE_RUTAS"));
				rec.setDniChofer(rs.getInt("DNICHOFER"));
				rec.setState(rs.getString("STATE"));

				lista.add(rec);
			}
			rs.close();
			pstm.close();
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		return lista;
	}

	
	@Override
	public void activar(Integer id) {
		// Variables
		Connection cn = null;
		PreparedStatement pstm;
		String sql;
		int filas;
		// Proceso
		try {
			// Inicio de la TX
			cn = AccesoDB.getConnection();
			cn.setAutoCommit(false);
			// Insertar registro
			sql = "UPDATE TB_BUSES SET STATE = 'A' WHERE id_bus = ? ";
			pstm = cn.prepareStatement(sql);
			pstm.setInt(1, id);
			filas = pstm.executeUpdate();
			pstm.close();
			if (filas == 0) {
				throw new SQLException("ID no existe");
			}
			cn.commit();
		} catch (SQLException e) {
			try {
				cn.rollback();
			} catch (Exception e2) {
			}
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
	}
	
	@Override
	public List<BusesModel> getAllInactivo() {
		List<BusesModel> lista = new ArrayList<>();
		Connection cn = null;
		BusesModel rec = null;
		try {
			cn = AccesoDB.getConnection();
			String sql = "SELECT  'CDBS-' || LPAD(b.id_bus, 3, '0') AS codigo, b.id_bus, b.num_placa, UPPER(c.apellido_chofer) || ', ' || c.nom_chofer AS nombre_chofer,  r.nom_rutas AS nombre_rutas,b.id_ruta AS IdRuta,c.dni_chofer as dniChofer, b.id_chofer AS IdChofer, b.state as ESTADO "
					+ "FROM tb_buses b " + "INNER JOIN tb_choferes c ON b.id_chofer = c.id_chofer "
					+ " INNER JOIN tb_rutas r ON b.id_ruta = r.id_ruta  where b.STATE ='I' ORDER BY ID_BUS DESC ";			
			PreparedStatement pstm = cn.prepareStatement(sql);
			ResultSet rs = pstm.executeQuery();
			while (rs.next()) {
				rec = new BusesModel();
				rec.setId(rs.getInt("id_bus"));
				rec.setPlaca(rs.getString("num_placa"));
				rec.setNombreChofer(rs.getString("nombre_chofer"));
				rec.setIdChofer(rs.getInt("IdChofer"));
				rec.setCodigo(rs.getString("Codigo"));
				rec.setIdRuta(rs.getInt("IdRuta"));
				rec.setNombreRuta(rs.getString("nombre_rutas"));
				rec.setDniChofer(rs.getInt("dniChofer"));
				rec.setState(rs.getString("ESTADO"));

				lista.add(rec);
			}
			rs.close();
			pstm.close();
		} catch (SQLException e) {
			throw new RuntimeException(e.getMessage());
		} catch (Exception e) {
			throw new RuntimeException("Error en el proceso");
		} finally {
			try {
				cn.close();
			} catch (Exception e) {
			}
		}
		return lista;
	}

}
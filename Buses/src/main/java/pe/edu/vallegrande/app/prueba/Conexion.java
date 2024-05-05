package pe.edu.vallegrande.app.prueba;

import java.sql.Connection;
import java.sql.SQLException;

import pe.edu.vallegrande.app.db.AccesoDB;

public class Conexion {
    public static void main(String[] args) {
        try {
            Connection cn = AccesoDB.getConnection();
            
            if (cn != null) {
                System.out.println("Conexio a la base de datos ok");
                cn.close();
            } else {
                System.out.println("No se puedo realaizar una conexion");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            System.out.println("Error al intentar conectar a la base de datos.");
        }
    }
}
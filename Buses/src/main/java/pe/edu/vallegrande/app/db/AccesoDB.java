package pe.edu.vallegrande.app.db;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AccesoDB {
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        String url = "jdbc:oracle:thin:@localhost:1521:XE"; 
        String usuario = "C##CyberTuris";
        String contraseña = "vg_cyberturismo";

        Class.forName("oracle.jdbc.driver.OracleDriver");

        Connection cn = DriverManager.getConnection(url, usuario, contraseña);
        return cn;
    }
}

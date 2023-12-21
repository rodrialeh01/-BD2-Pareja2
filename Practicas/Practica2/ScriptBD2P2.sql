CREATE DATABASE BD2P2;
USE BD2P2;
CREATE TABLE habitacion(
	idHabitacion INT PRIMARY KEY,
    habitacion VARCHAR(50)
);
CREATE TABLE paciente(
	idPaciente INT PRIMARY KEY,
    edad INT,
    genero VARCHAR(20)
); 
CREATE TABLE log_actividad(
	id_log_actividad INT AUTO_INCREMENT PRIMARY KEY,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    idPaciente INT,
    idHabitacion INT,
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente),
    FOREIGN KEY (idHabitacion) REFERENCES habitacion(idHabitacion)
);  
CREATE TABLE  log_habitacion(
	id_log_habitacion INT PRIMARY KEY AUTO_INCREMENT,
	timestampx VARCHAR(100),
    statusx VARCHAR(45),
    idHabitacion INT,
    FOREIGN KEY (idHabitacion) REFERENCES habitacion(idHabitacion)
);

CREATE TABLE usuario(
	idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    contrasenia VARCHAR(100),
    rol INT
);

CREATE TABLE bitacora(
	idBitacora INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(100),
    accion VARCHAR(250),
    fechaHoraAccion DATETIME
);

CREATE TABLE backups (
	idBackup INT AUTO_INCREMENT PRIMARY KEY,
    nombreBackup VARCHAR(250),
    fechaHoraAccion DATETIME
);

SELECT * FROM log_habitacion;
CREATE ROLE  'Asistente', 'Soporte';
GRANT SELECT ON BD2P2.habitacion TO 'Asistente';
GRANT SELECT ON BD2P2.paciente TO 'Asistente';
GRANT SELECT ON BD2P2.paciente TO 'Doctor';
GRANT UPDATE ON BD2P2.habitacion TO 'Asistente';

GRANT SELECT, UPDATE, INSERT ON BD2P2.log_actividad TO 'Soporte';
GRANT SELECT, UPDATE, INSERT ON BD2P2.log_habitacion TO 'Soporte';
GRANT ALL PRIVILEGES ON BD2P2.* TO 'Administrador';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT 'Administrador' TO 'admin'@'localhost';

FLUSH PRIVILEGES;

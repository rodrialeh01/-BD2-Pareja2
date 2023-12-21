-- DÍA 1
-- CARGAR ARCHIVO HABITACION
USE bdclinica;
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Habitaciones.csv"
INTO TABLE habitacion
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(idHabitacion, habitacion);

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- CREACION BACKUP COMPLETO (En consola):
-- measure-command {mysqldump -u root -p bdclinica | Out-File -FilePath "backupfull1.sql" -Encoding UTF8}

-- CREACION BACKUP INCREMENTAL (En consola):
-- purge binary logs before now();
-- flush logs;
-- show binary logs;
-- measure-command {mysqlbinlog "ruta" > "backupincX.sql" }


-- DÍA 2
-- CARGAR ARCHIVO PACIENTES
USE bdclinica;
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Pacientes.csv"
INTO TABLE paciente
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(idPaciente, edad, genero);

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- CREACION BACKUP COMPLETO (En consola):
-- measure-command {mysqldump -u root -p bdclinica | Out-Fil1 -FilePath "backupfull2.sql" -Encoding UTF8}

-- CREACION BACKUP INCREMENTAL (En consola):
-- purge binary logs before now();
-- flush logs;
-- show binary logs;
-- measure-command {mysqlbinlog "ruta" > "backupincX.sql" }


-- DÍA 3
-- CARGAR ARCHIVO LOG_ACTIVIDADES1
USE bdclinica;
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades1.csv"
INTO TABLE log_actividad
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(timestampx, actividad, idHabitacion, idPaciente);

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- CREACION BACKUP COMPLETO (En consola):
-- measure-command {mysqldump -u root -p bdclinica | Out-Fil1 -FilePath "backupfull3.sql" -Encoding UTF8}

-- CREACION BACKUP INCREMENTAL (En consola):
-- purge binary logs before now();
-- flush logs;
-- show binary logs;
-- measure-command {mysqlbinlog "ruta" > "backupincX.sql" }


-- DÍA 4
-- CARGAR ARCHIVO LOG_ACTIVIDADES2
USE bdclinica;
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades2.csv"
INTO TABLE log_actividad
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(timestampx, actividad, idHabitacion, idPaciente);

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- CREACION BACKUP COMPLETO (En consola):
-- measure-command {mysqldump -u root -p bdclinica | Out-Fil1 -FilePath "backupfull4.sql" -Encoding UTF8}

-- CREACION BACKUP INCREMENTAL (En consola):
-- purge binary logs before now();
-- flush logs;
-- show binary logs;
-- measure-command {mysqlbinlog "ruta" > "backupincX.sql" }


-- DÍA 5
-- CARGAR ARCHIVO LOG_HABITACIONES
USE bdclinica;
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogHabitacion.csv"
INTO TABLE log_habitacion
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(idHabitacion, timestampx, statusx);

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- CREACION BACKUP COMPLETO (En consola):
-- measure-command {mysqldump -u root -p bdclinica | Out-Fil1 -FilePath "backupfull5.sql" -Encoding UTF8}

-- CREACION BACKUP INCREMENTAL (En consola):
-- purge binary logs before now();
-- flush logs;
-- show binary logs;
-- measure-command {mysqlbinlog "ruta" > "backupincX.sql" }


-- DIA 6:
-- ELIMINACION DATOS LOG HABITACION
DELETE FROM log_habitacion;

-- ELIMINACION DATOS LOG ACTIVIDAD
DELETE FROM log_actividad;

-- ELIMINACION DATOS PACIENTES
DELETE FROM paciente;

-- ELIMINACION DATOS HABITACIONES
DELETE FROM habitacion;

-- RESTAURACION TABLAS DIA 1 (backupfull1.sql) (CONSOLA) :
--  measure-command {Get-Content "backupfull1.sql" | mysql -u root -p bdclinica}

-- SELECT FROM TABLAS:
USE bdclinica;
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- DIA 7:
-- ELIMINACION DATOS LOG HABITACION
DELETE FROM log_habitacion;

-- ELIMINACION DATOS LOG ACTIVIDAD
DELETE FROM log_actividad;

-- ELIMINACION DATOS PACIENTES
DELETE FROM paciente;

-- ELIMINACION DATOS HABITACIONES
DELETE FROM habitacion;

-- RESTAURACION TABLAS DIA 2 (backupfull2.sql) (CONSOLA) :
-- measure-command {Get-Content "backupfull2.sql" | mysql -u root -p bdclinica}

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- DIA 8:
-- ELIMINACION DATOS LOG HABITACION
DELETE FROM log_habitacion;

-- ELIMINACION DATOS LOG ACTIVIDAD
DELETE FROM log_actividad;

-- ELIMINACION DATOS PACIENTES
DELETE FROM paciente;

-- ELIMINACION DATOS HABITACIONES
DELETE FROM habitacion;

-- RESTAURACION TABLAS DIA 3 (backupfull3.sql) (CONSOLA) :
--  measure-command {Get-Content "backupfull3.sql" | mysql -u root -p bdclinica}

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- DIA 9:
-- ELIMINACION DATOS LOG HABITACION
DELETE FROM log_habitacion;

-- ELIMINACION DATOS LOG ACTIVIDAD
DELETE FROM log_actividad;

-- ELIMINACION DATOS PACIENTES
DELETE FROM paciente;

-- ELIMINACION DATOS HABITACIONES
DELETE FROM habitacion;

-- RESTAURACION TABLAS DIA 4 (backupfull4.sql) (CONSOLA) :
--  measure-command {Get-Content "backupfull4.sql" | mysql -u root -p bdclinica}

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;

-- DIA 10:
-- ELIMINACION DATOS LOG HABITACION
DELETE FROM log_habitacion;

-- ELIMINACION DATOS LOG ACTIVIDAD
DELETE FROM log_actividad;

-- ELIMINACION DATOS PACIENTES
DELETE FROM paciente;

-- ELIMINACION DATOS HABITACIONES
DELETE FROM habitacion;

-- RESTAURACION TABLAS DIA 5 (backupfull5.sql) (CONSOLA) :
-- measure-command {Get-Content "backupfull5.sql" | mysql -u root -p bdclinica}

-- SELECT FROM TABLAS:
SELECT * FROM habitacion;
SELECT * FROM paciente;
SELECT * FROM log_actividad;
SELECT * FROM log_habitacion;

-- SELECT COUNT(*) TABLAS
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM log_actividad;
SELECT COUNT(*) FROM log_habitacion;
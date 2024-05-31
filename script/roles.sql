-- Creacion de Roles 
USE PURACOMPRA;

-- Crear el usuario administrador con todos los privilegios
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

select * from mysql.user;

-- Crear el usuario normal con permisos limitados
CREATE USER 'normal_user'@'localhost' IDENTIFIED BY 'normal_password';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON puracompra.* TO 'normal_user'@'localhost';
FLUSH PRIVILEGES;

-- Crear el usuario de respaldo con permisos de respaldo
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_password';
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON puracompra.* TO 'backup_user'@'localhost';
FLUSH PRIVILEGES;

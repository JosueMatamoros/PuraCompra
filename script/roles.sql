-- Create the roles for the application
USE PURACOMPRA;

-- Create the admin user with all privileges
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_password';
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

select * from mysql.user;

-- Create the normal user with only select, insert, update, delete and execute privileges
CREATE USER 'normal_user'@'localhost' IDENTIFIED BY 'normal_password';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON puracompra.* TO 'normal_user'@'localhost';
FLUSH PRIVILEGES;

-- Create the backup user with only select, lock tables, show view, event and trigger privileges
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_password';
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON puracompra.* TO 'backup_user'@'localhost';
FLUSH PRIVILEGES;

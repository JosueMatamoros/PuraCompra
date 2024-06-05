-- Create the roles for the application
USE PURACOMPRA;

-- Create the admin user with all privileges
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'admin_password'; -- admin_user: admin_password
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

select * from mysql.user;

-- Create the normal user with only select, insert, update, delete and execute privileges
CREATE USER 'normal_user'@'localhost' IDENTIFIED BY 'normal_password'; -- normal_user: normal_password
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON puracompra.* TO 'normal_user'@'localhost';
FLUSH PRIVILEGES;

-- Create the backup user with only select, lock tables, show view, event and trigger privileges
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'backup_password'; -- backup_user: backup_password
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON puracompra.* TO 'backup_user'@'localhost';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user WHERE User = 'admin_user' AND Host = 'localhost';
SELECT User, Host FROM mysql.user WHERE User = 'normal_user' AND Host = 'localhost';
SELECT User, Host FROM mysql.user WHERE User = 'backup_user' AND Host = 'localhost';


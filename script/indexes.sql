-- Creación de algunos índices
USE PURACOMPRA;

-- Los correos electrónicos son únicos y frecuentemente se buscará por esta columna.
CREATE INDEX idx_users_mail ON Users(mail);

-- Facilita las búsquedas y filtrado por dirección.
CREATE INDEX idx_addresses_address ON Addresses(address);

-- Acelera las consultas que buscan órdenes por usuario y fecha.
CREATE INDEX idx_orders_usersid_date ON Orders(UsersID, date);

-- Mejora las consultas que ordenan o filtran productos por precio.
CREATE INDEX idx_products_price ON Products(price);

-- Optimiza las búsquedas y filtrado por tipo de vendedor.
CREATE INDEX idx_sellers_type ON Sellers(type);
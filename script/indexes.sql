-- Creación de algunos índices
USE PURACOMPRA;

-- The email is a unique value, so it is indexed.
CREATE INDEX idx_users_mail ON Users(mail);

-- the address is indexed to speed up the search for addresses.
CREATE INDEX idx_addresses_address ON Addresses(address);

-- the date and user id are indexed to speed up the search for orders.
CREATE INDEX idx_orders_usersid_date ON Orders(UsersID, date);

-- the price is indexed to speed up the search for products by price.
CREATE INDEX idx_products_price ON Products(price);

-- the type is indexed to speed up the search for sellers by type.
CREATE INDEX idx_sellers_type ON Sellers(type);
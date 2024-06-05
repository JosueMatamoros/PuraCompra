USE PURACOMPRA;

-- Table: addresses
CREATE TABLE address_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    AddressID INT,
    UsersID INT,
    old_address VARCHAR(255),
    new_address VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(10)
);

-- Triggers in the addresses table
-- Trigger to save the old address when a new address is inserted.
DELIMITER //
CREATE TRIGGER AfterUpdateAddress
AFTER UPDATE ON Addresses
FOR EACH ROW
BEGIN
    INSERT INTO address_history (AddressID, UsersID, old_address, new_address, action)
    VALUES (OLD.AddressID, OLD.UsersID, OLD.address, NEW.address, 'UPDATE');
END //
DELIMITER ;


-- Test
# UPDATE Addresses
# SET address = 'Penjamo, Florencia'
# WHERE AddressID = 3 AND UsersID = 2;

select * from addresses;

select * from address_history;



-- Triggers in the orders table
-- Verify that the price and taxes are not negative.

DELIMITER //
CREATE TRIGGER BeforeInsertOrder
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
    IF NEW.taxes < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los impuestos no pueden ser negativos';
    END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER BeforeUpdateOrder
BEFORE UPDATE ON Orders
FOR EACH ROW
BEGIN
    IF NEW.price < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio no puede ser negativo';
    END IF;
    IF NEW.taxes < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los impuestos no pueden ser negativos';
    END IF;
END //
DELIMITER ;

-- Triggers to prevent the deletion of orders associated with shipments in progress or pending.
DELIMITER //
CREATE TRIGGER BeforeDeleteOrder
BEFORE DELETE ON Orders
FOR EACH ROW
BEGIN
    DECLARE shipment_count INT;
    SELECT COUNT(*) INTO shipment_count 
    FROM Shipments 
    WHERE OrdersID = OLD.OrdersID 
    AND state IN ('IN_PROCESS', 'PENDING');

    IF shipment_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar una orden asociada con envíos en proceso o pendientes';
    END IF;
END //
DELIMITER ;


-- INSERT INTO Orders (UsersID, address, price, taxes) VALUES (2, 'Penjamo, Florencia', -895.00, 116.35); #Successful test
-- DELETE FROM Orders WHERE OrdersID = 2; Successful test


-- Triggers for the products table
-- Verify that the stock and price are not negative.
DELIMITER //
CREATE TRIGGER BeforeInsertProduct
BEFORE INSERT ON Products
FOR EACH ROW
BEGIN
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El stock no puede ser negativo';
    END IF;
    IF NEW.price <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio debe ser positivo';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeUpdateProduct
BEFORE UPDATE ON Products
FOR EACH ROW
BEGIN
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El stock no puede ser negativo';
    END IF;
    IF NEW.price <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El precio debe ser positivo';
    END IF;
END //
DELIMITER ;

-- Trigger to prevent the deletion of products associated with orders.
DELIMITER //
CREATE TRIGGER BeforeDeleteProduct
BEFORE DELETE ON Products
FOR EACH ROW
BEGIN
    DECLARE order_count INT;
    SELECT COUNT(*) INTO order_count 
    FROM OrderDetails 
    WHERE ProductID = OLD.ProductsID;
    
    IF order_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar un producto asociado con órdenes';
    END IF;
END //
DELIMITER ;


select * from orders;


-- DELETE FROM products WHERE productsId = 3;

-- Test
-- INSERT INTO Products (Sellers, name, stock, description, price, imageUrl) VALUES
-- (1, 'AirPods Max', 10, 'Apple AirPods Max with high-fidelity audio, Active Noise Cancellation, and spatial audio.', -549, '/assets/apple/airPodsMax/airPodsMax.png'); ##Successful test



-- Triggers for Sellers

-- Verify that the name is not empty and that the type is valid.
DELIMITER //
CREATE TRIGGER BeforeInsertSeller
BEFORE INSERT ON Sellers
FOR EACH ROW
BEGIN
    IF NEW.name = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre del vendedor no puede estar vacío';
    END IF;
    IF NEW.type NOT IN ('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de vendedor no es válido';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeUpdateSeller
BEFORE UPDATE ON Sellers
FOR EACH ROW
BEGIN
    IF NEW.name = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nombre del vendedor no puede estar vacío';
    END IF;
    IF NEW.type NOT IN ('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de vendedor no es válido';
    END IF;
END //
DELIMITER ;

-- Trigger to prevent the deletion of sellers associated with products.

DELIMITER //
CREATE TRIGGER BeforeDeleteSeller
BEFORE DELETE ON Sellers
FOR EACH ROW
BEGIN
    DECLARE product_count INT;
    SELECT COUNT(*) INTO product_count 
    FROM Products 
    WHERE Sellers = OLD.SellersID;
    
    IF product_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar un vendedor asociado con productos';
    END IF;
END //
DELIMITER ;

-- test
-- INSERT INTO Sellers (SellersID, name, url, type) VALUES (7, '', 'https://www.apple.com/', 'DIGITAL_RESELLERS'); ##successful test
-- DELETE FROM Sellers WHERE SellersID = 1; ##successful test



-- Triggers for ProductImages table
-- verify that the imageUrl is not empty and that the type is valid.
DELIMITER //
CREATE TRIGGER BeforeInsertProductImage
BEFORE INSERT ON ProductImages
FOR EACH ROW
BEGIN
    IF NEW.imageUrl = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La URL de la imagen no puede estar vacía';
    END IF;
    IF NEW.type NOT IN (0, 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de imagen debe ser 0 o 1';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER BeforeUpdateProductImage
BEFORE UPDATE ON ProductImages
FOR EACH ROW
BEGIN
    IF NEW.imageUrl = '' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La URL de la imagen no puede estar vacía';
    END IF;
    IF NEW.type NOT IN (0, 1) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El tipo de imagen debe ser 0 o 1';
    END IF;
END //
DELIMITER ;

-- Trigger to prevent the deletion of product images associated with products.
DELIMITER //
CREATE TRIGGER BeforeDeleteProductImage
BEFORE DELETE ON ProductImages
FOR EACH ROW
BEGIN
    DECLARE product_count INT;
    SELECT COUNT(*) INTO product_count 
    FROM Products 
    WHERE ProductsID = OLD.ProductsID;
    
    IF product_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No se puede eliminar una imagen de producto asociada con productos';
    END IF;
END //
DELIMITER ;

Drop trigger BeforeDeleteProductImage;

-- test
-- INSERT INTO ProductImages (ProductsID, imageUrl, type, color) VALUES (6, '', false, NULL);
-- DELETE FROM ProductImages WHERE ImageID = 7;

-- INSERT INTO ProductImages (ProductsID, imageUrl, type, color) VALUES (6, '', false, NULL);

-- Trigger para reducir el stock de un producto basado en la cantidad de productos de una orden
DELIMITER //
CREATE TRIGGER update_stock_after_order
AFTER INSERT ON OrderDetails
FOR EACH ROW
BEGIN
  DECLARE qty INT;
  SET qty = (SELECT quantity FROM CartItems WHERE UsersID = (SELECT UsersID FROM Orders WHERE OrdersID = NEW.OrdersID) AND ProductID = NEW.ProductID);
  UPDATE Products
  SET stock = stock - qty
  WHERE ProductsID = NEW.ProductID AND stock >= qty;
END;
//
DELIMITER ;

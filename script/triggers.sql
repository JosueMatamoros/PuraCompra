USE PURACOMPRA;

-- Tabla de historial de direcciones
CREATE TABLE address_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    AddressID INT,
    UsersID INT,
    old_address VARCHAR(255),
    new_address VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(10)
);

-- Triggers en la tabla addresses
-- Actualizar el historial de direcciones después de una actualización.
DELIMITER //
CREATE TRIGGER AfterUpdateAddress
AFTER UPDATE ON Addresses
FOR EACH ROW
BEGIN
    INSERT INTO address_history (AddressID, UsersID, old_address, new_address, action)
    VALUES (OLD.AddressID, OLD.UsersID, OLD.address, NEW.address, 'UPDATE');
END //
DELIMITER ;


-- Prueba
UPDATE Addresses
SET address = 'Penjamo, Florencia'
WHERE AddressID = 3 AND UsersID = 2;

select * from addresses;

select * from address_history;



-- Triggers en la tabla orders
-- Asegurarse de que el precio y los impuestos sean positivos.

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

-- Triggers de eliminación
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


-- INSERT INTO Orders (UsersID, address, price, taxes) VALUES (2, 'Penjamo, Florencia', -895.00, 116.35); Prueba exitosa
-- DELETE FROM Orders WHERE OrdersID = 2; Prueba exitosa


-- Triggers para la tabla orderdetails
-- Triggers para la tabla products
-- Asegurarse de que el stock no sea negativo y que el precio sea positivo.
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

-- Trigger de eliminación para evitar que se eliminen productos asociados con órdenes.
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


DELETE FROM products WHERE productsId = 1;

-- Prueba
-- INSERT INTO Products (Sellers, name, stock, description, price, imageUrl) VALUES 
-- (1, 'AirPods Max', 10, 'Apple AirPods Max with high-fidelity audio, Active Noise Cancellation, and spatial audio.', -549, '/assets/apple/airPodsMax/airPodsMax.png'); Prueba exitosa



-- Triggers para las tablas sellers

-- Asegurarse de que el nombre del vendedor no esté vacío y que el tipo sea uno de los valores permitidos.
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

-- Trigger de eliminación para evitar que se eliminen vendedores asociados con productos.

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

-- Prueba
-- INSERT INTO Sellers (SellersID, name, url, type) VALUES (7, '', 'https://www.apple.com/', 'DIGITAL_RESELLERS'); Prueba exitosa
-- DELETE FROM Sellers WHERE SellersID = 7; Prueba exitosa



-- Triggers para ProductImages
-- Asegurarse de que la URL de la imagen no esté vacía y que el tipo sea válido (0 o 1).
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

-- Trigger de eliminación para evitar que se eliminen imágenes de productos asociadas con productos.
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

-- Prueba
INSERT INTO ProductImages (ProductsID, imageUrl, type, color) VALUES (6, '', false, NULL);
DELETE FROM ProductImages WHERE ImageID = 7; 

-- INSERT INTO ProductImages (ProductsID, imageUrl, type, color) VALUES (6, '', false, NULL);
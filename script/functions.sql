-- Apartado de funciones
-- Tabla Users
-- Función para agregar un usuario a la base de datos
USE PURACOMPRA;
DELIMITER //
CREATE FUNCTION AddUser(
    p_name VARCHAR(255),
    p_lastname VARCHAR(255),
    p_mail VARCHAR(255),
    p_password VARCHAR(255),
    p_phoneNumber VARCHAR(15)
) RETURNS INT
BEGIN
    INSERT INTO Users (name, lastname, mail, password, phoneNumber)
    VALUES (p_name, p_lastname, p_mail, p_password, p_phoneNumber);
    RETURN LAST_INSERT_ID();
END //
DELIMITER ;

-- Prueba

SELECT AddUser('Juan', 'Perez', 'jperez@gmail.com', '1234', '1234-5678');

select * from Users;

-- Modificar usuario
DELIMITER //
CREATE FUNCTION UpdateUser(
    p_UsersID INT,
    p_name VARCHAR(255),
    p_lastname VARCHAR(255),
    p_mail VARCHAR(255),
    p_password VARCHAR(255),
    p_phoneNumber VARCHAR(15)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el usuario existe
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Actualizar los datos del usuario
    UPDATE Users
    SET name = p_name, lastname = p_lastname, mail = p_mail, password = p_password, phoneNumber = p_phoneNumber
    WHERE UsersID = p_UsersID;

    SET msg = 'Usuario actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT UpdateUser(6, 'Marcos', 'Gomez', 'mgomez@gmail.com', '4321', '123456789');

-- Eliminar usuario
DELIMITER //
CREATE FUNCTION DeleteUser(
    p_UsersID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el usuario existe
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Eliminar el usuario
    DELETE FROM Users WHERE UsersID = p_UsersID;

    SET msg = 'Usuario eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Tabla Addresses

-- Añadir direcciones

DELIMITER //
CREATE FUNCTION AddAddress(
    p_UsersID INT,
    p_address VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el usuario existe
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Insertar la nueva dirección
    INSERT INTO Addresses (UsersID, address)
    VALUES (p_UsersID, p_address);
    
    SET msg = 'Dirección añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT AddAddress(1, '123 Main St, Springfield');
select * from addresses;

-- Modificar direcciones

DELIMITER //
CREATE FUNCTION UpdateAddress(
    p_AddressID INT,
    p_UsersID INT,
    p_address VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la dirección existe
    IF (SELECT COUNT(*) FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Dirección no encontrada';
        RETURN msg;
    END IF;
    
    -- Actualizar la dirección
    UPDATE Addresses
    SET address = p_address
    WHERE AddressID = p_AddressID AND UsersID = p_UsersID;

    SET msg = 'Dirección actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT UpdateAddress(6, 1, '456 Elm St, Springfield');

-- Elimiar direcciones

DELIMITER //
CREATE FUNCTION DeleteAddress(
    p_AddressID INT,
    p_UsersID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la dirección existe
    IF (SELECT COUNT(*) FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Dirección no encontrada';
        RETURN msg;
    END IF;
    
    -- Eliminar la dirección
    DELETE FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID;

    SET msg = 'Dirección eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT DeleteAddress(6, 1);


-- Funciones para la tabla Orders

DELIMITER //
CREATE FUNCTION AddOrder(
    p_UsersID INT,
    p_address VARCHAR(255),
    p_price FLOAT,
    p_taxes FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el usuario existe
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Insertar la nueva orden
    INSERT INTO Orders (UsersID, address, price, taxes)
    VALUES (p_UsersID, p_address, p_price, p_taxes);
    
    SET msg = 'Orden añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

-- SELECT AddOrder(2, 'Penamo, Florencia', -100.00, 8.00);


DELIMITER //
CREATE FUNCTION UpdateOrder(
    p_OrdersID INT,
    p_UsersID INT,
    p_address VARCHAR(255),
    p_price FLOAT,
    p_taxes FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la orden existe
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;
    
    -- Actualizar la orden
    UPDATE Orders
    SET address = p_address, price = p_price, taxes = p_taxes
    WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID;

    SET msg = 'Orden actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

select * from orders;

SELECT UpdateOrder(2, 2, 'Penjamo, Florencia, San Carlos', 150.00, 12.00);

DELIMITER //
CREATE FUNCTION DeleteOrder(
    p_OrdersID INT,
    p_UsersID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la orden existe
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;
    
    -- Eliminar la orden
    DELETE FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID;

    SET msg = 'Orden eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;


SELECT DeleteOrder(2, 2);

-- Funciones para la tabla products

DELIMITER //
CREATE FUNCTION AddProduct(
    p_Sellers INT,
    p_name VARCHAR(255),
    p_stock INT,
    p_description VARCHAR(255),
    p_price FLOAT,
    p_imageUrl VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Insertar el nuevo producto
    INSERT INTO Products (Sellers, name, stock, description, price, imageUrl)
    VALUES (p_Sellers, p_name, p_stock, p_description, p_price, p_imageUrl);
    
    SET msg = 'Producto añadido correctamente';
    RETURN msg;
END //
DELIMITER ;


DELIMITER //
CREATE FUNCTION UpdateProduct(
    p_ProductsID INT,
    p_Sellers INT,
    p_name VARCHAR(255),
    p_stock INT,
    p_description VARCHAR(255),
    p_price FLOAT,
    p_imageUrl VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el producto existe
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;
    
    -- Actualizar el producto
    UPDATE Products
    SET Sellers = p_Sellers, name = p_name, stock = p_stock, description = p_description, price = p_price, imageUrl = p_imageUrl
    WHERE ProductsID = p_ProductsID;

    SET msg = 'Producto actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeleteProduct(
    p_ProductsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el producto existe
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;
    
    -- Eliminar el producto
    DELETE FROM Products WHERE ProductsID = p_ProductsID;

    SET msg = 'Producto eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Pruebas
SELECT AddProduct(1, 'Producto A', 50, 'Descripción del Producto A', 19.99, 'http://example.com/producto-a.jpg');
SELECT UpdateProduct(25, 1, 'Producto A Modificado', 100, 'Descripción modificada del Producto A', 29.99, 'http://example.com/producto-a-modificado.jpg');
SELECT DeleteProduct(25);
select * from products;

-- Tabla ProductImages
DELIMITER //
-- Agregar imagen
CREATE FUNCTION AddProductImage(
    p_ProductsID INT,
    p_imageUrl VARCHAR(255),
    p_type BOOLEAN,
    p_color VARCHAR(50)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si el producto existe
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;
    
    -- Insertar la nueva imagen del producto
    INSERT INTO ProductImages (ProductsID, imageUrl, type, color)
    VALUES (p_ProductsID, p_imageUrl, p_type, p_color);
    
    SET msg = 'Imagen del producto añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Editar imagen

DELIMITER //
CREATE FUNCTION UpdateProductImage(
    p_ImageID INT,
    p_ProductsID INT,
    p_imageUrl VARCHAR(255),
    p_type BOOLEAN,
    p_color VARCHAR(50)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la imagen del producto existe
    IF (SELECT COUNT(*) FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Imagen del producto no encontrada';
        RETURN msg;
    END IF;
    
    -- Actualizar la imagen del producto
    UPDATE ProductImages
    SET imageUrl = p_imageUrl, type = p_type, color = p_color
    WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID;

    SET msg = 'Imagen del producto actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Eliminar imagen 

DELIMITER //
CREATE FUNCTION DeleteProductImage(
    p_ImageID INT,
    p_ProductsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verificar si la imagen del producto existe
    IF (SELECT COUNT(*) FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Imagen del producto no encontrada';
        RETURN msg;
    END IF;
    
    -- Eliminar la imagen del producto
    DELETE FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID;

    SET msg = 'Imagen del producto eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Pruebas


-- Tabla shipments

DELIMITER //
CREATE FUNCTION AddShipment(
    p_OrdersID INT,
    p_tracking INT,
    p_price FLOAT,
    p_totalPrice FLOAT,
    p_state ENUM('DELIVED', 'IN_PROCESS', 'PENDING')
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el pedido existe
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID) = 0 THEN
        SET msg = 'Pedido no encontrado';
        RETURN msg;
    END IF;

    -- Insertar el nuevo envío
    INSERT INTO Shipments (OrdersID, tracking, date, price, totalPrice, state)
    VALUES (p_OrdersID, p_tracking, NOW(), p_price, p_totalPrice, p_state);

    SET msg = 'Envío añadido correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION UpdateShipment(
    p_ShipmentsID INT,
    p_OrdersID INT,
    p_tracking INT,
    p_price FLOAT,
    p_totalPrice FLOAT,
    p_state ENUM('DELIVED', 'IN_PROCESS', 'PENDING')
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el envío existe
    IF (SELECT COUNT(*) FROM Shipments WHERE ShipmentsID = p_ShipmentsID) = 0 THEN
        SET msg = 'Envío no encontrado';
        RETURN msg;
    END IF;

    -- Actualizar el envío
    UPDATE Shipments
    SET OrdersID = p_OrdersID, tracking = p_tracking, price = p_price, totalPrice = p_totalPrice, state = p_state
    WHERE ShipmentsID = p_ShipmentsID;

    SET msg = 'Envío actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeleteShipment(
    p_ShipmentsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el envío existe
    IF (SELECT COUNT(*) FROM Shipments WHERE ShipmentsID = p_ShipmentsID) = 0 THEN
        SET msg = 'Envío no encontrado';
        RETURN msg;
    END IF;

    -- Eliminar el envío
    DELETE FROM Shipments WHERE ShipmentsID = p_ShipmentsID;

    SET msg = 'Envío eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Tabla ProductsPromotions

DELIMITER //
CREATE FUNCTION AddProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el producto existe
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;
    
    -- Verificar si la promoción existe
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Insertar la nueva promoción del producto
    INSERT INTO ProductsPromotions (ProductsID, PromotionsID)
    VALUES (p_ProductsID, p_PromotionsID);

    SET msg = 'Promoción añadida al producto correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION UpdateProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT,
    p_newPromotionsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la relación de producto y promoción existe
    IF (SELECT COUNT(*) FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Relación de producto y promoción no encontrada';
        RETURN msg;
    END IF;

    -- Verificar si la nueva promoción existe
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_newPromotionsID) = 0 THEN
        SET msg = 'Nueva promoción no encontrada';
        RETURN msg;
    END IF;

    -- Actualizar la promoción del producto
    UPDATE ProductsPromotions
    SET PromotionsID = p_newPromotionsID
    WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID;

    SET msg = 'Promoción del producto actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeleteProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la relación de producto y promoción existe
    IF (SELECT COUNT(*) FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Relación de producto y promoción no encontrada';
        RETURN msg;
    END IF;

    -- Eliminar la promoción del producto
    DELETE FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID;

    SET msg = 'Promoción del producto eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- tabla promotions

DELIMITER //
CREATE FUNCTION AddPromotion(
    p_PromotionsID INT,
    p_category ENUM('HOLIDAYS', 'FREE_SHIPING', 'MEMBERS'),
    p_discount FLOAT,
    p_description VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la promoción ya existe
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) > 0 THEN
        SET msg = 'Promoción con ese ID ya existe';
        RETURN msg;
    END IF;

    -- Insertar la nueva promoción
    INSERT INTO Promotions (PromotionsID, category, discount, description)
    VALUES (p_PromotionsID, p_category, p_discount, p_description);

    SET msg = 'Promoción añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION UpdatePromotion(
    p_PromotionsID INT,
    p_category ENUM('HOLIDAYS', 'FREE_SHIPING', 'MEMBERS'),
    p_discount FLOAT,
    p_description VARCHAR(255)
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la promoción existe
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Actualizar la promoción
    UPDATE Promotions
    SET category = p_category, discount = p_discount, description = p_description
    WHERE PromotionsID = p_PromotionsID;

    SET msg = 'Promoción actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;


DELIMITER //
CREATE FUNCTION DeletePromotion(
    p_PromotionsID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la promoción existe
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Eliminar la promoción
    DELETE FROM Promotions WHERE PromotionsID = p_PromotionsID;

    SET msg = 'Promoción eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;


-- Pruebas


-- Tabla TransactionsLogs

DELIMITER //
CREATE FUNCTION AddTransactionLog(
    p_UsersID INT,
    p_OrderID INT,
    p_type ENUM('Refund', 'purchase'),
    p_quantity FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el usuario existe
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;

    -- Verificar si la orden existe
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrderID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;

    -- Insertar la nueva transacción
    INSERT INTO TransactionLogs (UsersID, OrderID, type, quantity, date)
    VALUES (p_UsersID, p_OrderID, p_type, p_quantity, NOW());

    SET msg = 'Transacción añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION UpdateTransactionLog(
    p_TransactionID INT,
    p_type ENUM('Refund', 'purchase'),
    p_quantity FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la transacción existe
    IF (SELECT COUNT(*) FROM TransactionLogs WHERE TransactionID = p_TransactionID) = 0 THEN
        SET msg = 'Transacción no encontrada';
        RETURN msg;
    END IF;

    -- Actualizar la transacción
    UPDATE TransactionLogs
    SET type = p_type, quantity = p_quantity, date = NOW()
    WHERE TransactionID = p_TransactionID;

    SET msg = 'Transacción actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeleteTransactionLog(
    p_TransactionID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si la transacción existe
    IF (SELECT COUNT(*) FROM TransactionLogs WHERE TransactionID = p_TransactionID) = 0 THEN
        SET msg = 'Transacción no encontrada';
        RETURN msg;
    END IF;

    -- Eliminar la transacción
    DELETE FROM TransactionLogs WHERE TransactionID = p_TransactionID;

    SET msg = 'Transacción eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;


-- Tabla PriceHistory

DELIMITER //
CREATE FUNCTION AddPriceHistory(
    p_ProductID INT,
    p_price FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el producto existe
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Insertar el nuevo historial de precios
    INSERT INTO PriceHistory (ProductID, price, date)
    VALUES (p_ProductID, p_price, NOW());

    SET msg = 'Historial de precios añadido correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION UpdatePriceHistory(
    p_PriceID INT,
    p_price FLOAT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el historial de precios existe
    IF (SELECT COUNT(*) FROM PriceHistory WHERE PriceID = p_PriceID) = 0 THEN
        SET msg = 'Historial de precios no encontrado';
        RETURN msg;
    END IF;

    -- Actualizar el historial de precios
    UPDATE PriceHistory
    SET price = p_price, date = NOW()
    WHERE PriceID = p_PriceID;

    SET msg = 'Historial de precios actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeletePriceHistory(
    p_PriceID INT
) RETURNS VARCHAR(255)
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verificar si el historial de precios existe
    IF (SELECT COUNT(*) FROM PriceHistory WHERE PriceID = p_PriceID) = 0 THEN
        SET msg = 'Historial de precios no encontrado';
        RETURN msg;
    END IF;

    -- Eliminar el historial de precios
    DELETE FROM PriceHistory WHERE PriceID = p_PriceID;

    SET msg = 'Historial de precios eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;
-- Functions for the PuraCompra database
-- Table: Users
-- Function to add a new user
USE PURACOMPRA;

DELIMITER //
CREATE FUNCTION AddUser(
    p_name VARCHAR(255),
    p_lastname VARCHAR(255),
    p_mail VARCHAR(255),
    p_password VARCHAR(255),
    p_phoneNumber VARCHAR(15),
    p_gender ENUM('male', 'female', 'other'),
    p_country VARCHAR(255),
    p_role ENUM('admin', 'user')
) RETURNS INT
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    INSERT INTO Users (
        name, lastname, mail, password, phoneNumber, gender, country, role
    ) VALUES (
        p_name, p_lastname, p_mail, p_password, p_phoneNumber, p_gender, p_country,COALESCE(p_role, 'user')
    );
    RETURN LAST_INSERT_ID();
END //

DELIMITER ;

-- test

SELECT AddUser(
    'John',
    'Doe',
    'john.doe@example.com',
    'securepassword123',
    '1234567890',
    'male',
    'USA',
    'admin'
);

select * from Users;

-- Function to update a user
DELIMITER //
CREATE FUNCTION UpdateUser(
    p_UsersID INT,
    p_name VARCHAR(255),
    p_lastname VARCHAR(255),
    p_mail VARCHAR(255),
    p_password VARCHAR(255),
    p_phoneNumber VARCHAR(15),
    p_gender ENUM('male', 'female', 'other'),
    p_country VARCHAR(255)
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the user exists
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Update the user
    UPDATE Users
    SET name = p_name, lastname = p_lastname, mail = p_mail, password = p_password, phoneNumber = p_phoneNumber, gender = p_gender, country = p_country
    WHERE UsersID = p_UsersID;

    SET msg = 'Usuario actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT UpdateUser(6, 'Marcos', 'Gomez', 'mgomez@gmail.com', '4321', '123456789', 'male', 'Costa Rica');

-- Function to delete a user
DELIMITER //
CREATE FUNCTION DeleteUser(
    p_UsersID INT
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the user exists
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Delete the user
    DELETE FROM Users WHERE UsersID = p_UsersID;

    SET msg = 'Usuario eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT DeleteUser(2);

-- Table: Addresses

-- Function to add a new address

DELIMITER //
CREATE FUNCTION AddAddress(
    p_UsersID INT,
    p_address VARCHAR(255)
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the user exists
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Insert the new address
    INSERT INTO Addresses (UsersID, address)
    VALUES (p_UsersID, p_address);
    
    SET msg = 'Dirección añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT AddAddress(1, '123 Main St, Springfield');
select * from addresses;

-- Function to update an address

DELIMITER //
CREATE FUNCTION UpdateAddress(
    p_AddressID INT,
    p_UsersID INT,
    p_address VARCHAR(255)
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the address exists
    IF (SELECT COUNT(*) FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Dirección no encontrada';
        RETURN msg;
    END IF;
    
    -- Update the address
    UPDATE Addresses
    SET address = p_address
    WHERE AddressID = p_AddressID AND UsersID = p_UsersID;

    SET msg = 'Dirección actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT UpdateAddress(6, 1, '456 Elm St, Springfield');

-- Function to delete an address

DELIMITER //
CREATE FUNCTION DeleteAddress(
    p_AddressID INT,
    p_UsersID INT
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the address exists
    IF (SELECT COUNT(*) FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Dirección no encontrada';
        RETURN msg;
    END IF;
    
    -- Delete the address
    DELETE FROM Addresses WHERE AddressID = p_AddressID AND UsersID = p_UsersID;

    SET msg = 'Dirección eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT DeleteAddress(6, 1);


-- Functions for the table orders
DELIMITER //
CREATE FUNCTION AddOrder(
    p_UsersID INT,
    p_address VARCHAR(255),
    p_price FLOAT,
    p_taxes FLOAT
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the user exists
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;
    
    -- Insert the new order
    INSERT INTO Orders (UsersID, address, price, taxes)
    VALUES (p_UsersID, p_address, p_price, p_taxes);
    
    SET msg = 'Orden añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

SELECT AddOrder(2, 'Penamo, Florencia', -100.00, 8.00);

-- Function to update an order
DELIMITER //
CREATE FUNCTION UpdateOrder(
    p_OrdersID INT,
    p_UsersID INT,
    p_address VARCHAR(255),
    p_price FLOAT,
    p_taxes FLOAT
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the order exists
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;
    
    -- Update the order
    UPDATE Orders
    SET address = p_address, price = p_price, taxes = p_taxes
    WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID;

    SET msg = 'Orden actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

select * from orders;

SELECT UpdateOrder(2, 2, 'Penjamo, Florencia, San Carlos', 150.00, 12.00);


-- Function to delete an order

DELIMITER //
CREATE FUNCTION DeleteOrder(
    p_OrdersID INT,
    p_UsersID INT
) RETURNS VARCHAR(255)
    DETERMINISTIC
    MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);
    
    -- Verify if the order exists
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;
    
    -- Delete the order
    DELETE FROM Orders WHERE OrdersID = p_OrdersID AND UsersID = p_UsersID;

    SET msg = 'Orden eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;


SELECT DeleteOrder(2, 2);

-- Functions for the table Products

-- Function to add a new product
-- Function to add a product
DELIMITER //
CREATE FUNCTION AddProduct(
    p_Sellers INT,
    p_name VARCHAR(255),
    p_stock INT,
    p_description VARCHAR(255),
    p_price FLOAT,
    p_imageUrl VARCHAR(255)
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Insert the new product
    INSERT INTO Products (Sellers, name, stock, description, price, imageUrl)
    VALUES (p_Sellers, p_name, p_stock, p_description, p_price, p_imageUrl);

    SET msg = 'Producto añadido correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a product
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
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product exists
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Update the product
    UPDATE Products
    SET Sellers = p_Sellers, name = p_name, stock = p_stock, description = p_description, price = p_price, imageUrl = p_imageUrl
    WHERE ProductsID = p_ProductsID;

    SET msg = 'Producto actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a product
DELIMITER //
CREATE FUNCTION DeleteProduct(
    p_ProductsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product exists
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Delete the product
    DELETE FROM Products WHERE ProductsID = p_ProductsID;

    SET msg = 'Producto eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: ProductImages
-- Function to add an image
DELIMITER //
CREATE FUNCTION AddProductImage(
    p_ProductsID INT,
    p_imageUrl VARCHAR(255),
    p_type BOOLEAN,
    p_color VARCHAR(50)
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product exists
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Insert the new product image
    INSERT INTO ProductImages (ProductsID, imageUrl, type, color)
    VALUES (p_ProductsID, p_imageUrl, p_type, p_color);

    SET msg = 'Imagen del producto añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update an image
DELIMITER //
CREATE FUNCTION UpdateProductImage(
    p_ImageID INT,
    p_ProductsID INT,
    p_imageUrl VARCHAR(255),
    p_type BOOLEAN,
    p_color VARCHAR(50)
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product image exists
    IF (SELECT COUNT(*) FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Imagen del producto no encontrada';
        RETURN msg;
    END IF;

    -- Update the product image
    UPDATE ProductImages
    SET imageUrl = p_imageUrl, type = p_type, color = p_color
    WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID;

    SET msg = 'Imagen del producto actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete an image
DELIMITER //
CREATE FUNCTION DeleteProductImage(
    p_ImageID INT,
    p_ProductsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product image exists
    IF (SELECT COUNT(*) FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Imagen del producto no encontrada';
        RETURN msg;
    END IF;

    -- Delete the product image
    DELETE FROM ProductImages WHERE ImageID = p_ImageID AND ProductsID = p_ProductsID;

    SET msg = 'Imagen del producto eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: Shipments
-- Function to add a shipment
DELIMITER //
CREATE FUNCTION AddShipment(
    p_OrdersID INT,
    p_tracking INT,
    p_price FLOAT,
    p_totalPrice FLOAT,
    p_state ENUM('DELIVERED', 'IN_PROCESS', 'PENDING')
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the order exists
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrdersID) = 0 THEN
        SET msg = 'Pedido no encontrado';
        RETURN msg;
    END IF;

    -- Insert the new shipment
    INSERT INTO Shipments (OrdersID, tracking, date, price, totalPrice, state)
    VALUES (p_OrdersID, p_tracking, NOW(), p_price, p_totalPrice, p_state);

    SET msg = 'Envío añadido correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a shipment
DELIMITER //
CREATE FUNCTION UpdateShipment(
    p_ShipmentsID INT,
    p_OrdersID INT,
    p_tracking INT,
    p_price FLOAT,
    p_totalPrice FLOAT,
    p_state ENUM('DELIVERED', 'IN_PROCESS', 'PENDING')
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the shipment exists
    IF (SELECT COUNT(*) FROM Shipments WHERE ShipmentsID = p_ShipmentsID) = 0 THEN
        SET msg = 'Envío no encontrado';
        RETURN msg;
    END IF;

    -- Update the shipment
    UPDATE Shipments
    SET OrdersID = p_OrdersID, tracking = p_tracking, price = p_price, totalPrice = p_totalPrice, state = p_state
    WHERE ShipmentsID = p_ShipmentsID;

    SET msg = 'Envío actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a shipment
DELIMITER //
CREATE FUNCTION DeleteShipment(
    p_ShipmentsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the shipment exists
    IF (SELECT COUNT(*) FROM Shipments WHERE ShipmentsID = p_ShipmentsID) = 0 THEN
        SET msg = 'Envío no encontrado';
        RETURN msg;
    END IF;

    -- Delete the shipment
    DELETE FROM Shipments WHERE ShipmentsID = p_ShipmentsID;

    SET msg = 'Envío eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: ProductsPromotions
-- Function to add a product promotion
DELIMITER //
CREATE FUNCTION AddProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product exists
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductsID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Verify if the promotion exists
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Insert the new product promotion
    INSERT INTO ProductsPromotions (ProductsID, PromotionsID)
    VALUES (p_ProductsID, p_PromotionsID);

    SET msg = 'Promoción añadida al producto correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a product promotion
DELIMITER //
CREATE FUNCTION UpdateProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT,
    p_newPromotionsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the relationship between product and promotion exists
    IF (SELECT COUNT(*) FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Relación de producto y promoción no encontrada';
        RETURN msg;
    END IF;

    -- Verify if the new promotion exists
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_newPromotionsID) = 0 THEN
        SET msg = 'Nueva promoción no encontrada';
        RETURN msg;
    END IF;

    -- Update the product promotion
    UPDATE ProductsPromotions
    SET PromotionsID = p_newPromotionsID
    WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID;

    SET msg = 'Promoción del producto actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a product promotion
DELIMITER //
CREATE FUNCTION DeleteProductPromotion(
    p_ProductsID INT,
    p_PromotionsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the relationship between product and promotion exists
    IF (SELECT COUNT(*) FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Relación de producto y promoción no encontrada';
        RETURN msg;
    END IF;

    -- Delete the product promotion
    DELETE FROM ProductsPromotions WHERE ProductsID = p_ProductsID AND PromotionsID = p_PromotionsID;

    SET msg = 'Promoción del producto eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: Promotions
-- Function to add a promotion
DELIMITER //
CREATE FUNCTION AddPromotion(
    p_PromotionsID INT,
    p_category ENUM('HOLIDAYS', 'FREE_SHIPPING', 'MEMBERS'),
    p_discount FLOAT,
    p_description VARCHAR(255)
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the promotion exists
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) > 0 THEN
        SET msg = 'Promoción con ese ID ya existe';
        RETURN msg;
    END IF;

    -- Insert the new promotion
    INSERT INTO Promotions (PromotionsID, category, discount, description)
    VALUES (p_PromotionsID, p_category, p_discount, p_description);

    SET msg = 'Promoción añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a promotion
DELIMITER //
CREATE FUNCTION UpdatePromotion(
    p_PromotionsID INT,
    p_category ENUM('HOLIDAYS', 'FREE_SHIPPING', 'MEMBERS'),
    p_discount FLOAT,
    p_description VARCHAR(255)
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the promotion exists
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Update the promotion
    UPDATE Promotions
    SET category = p_category, discount = p_discount, description = p_description
    WHERE PromotionsID = p_PromotionsID;

    SET msg = 'Promoción actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a promotion
DELIMITER //
CREATE FUNCTION DeletePromotion(
    p_PromotionsID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the promotion exists
    IF (SELECT COUNT(*) FROM Promotions WHERE PromotionsID = p_PromotionsID) = 0 THEN
        SET msg = 'Promoción no encontrada';
        RETURN msg;
    END IF;

    -- Delete the promotion
    DELETE FROM Promotions WHERE PromotionsID = p_PromotionsID;

    SET msg = 'Promoción eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: TransactionLogs
-- Function to add a transaction log
DELIMITER //
CREATE FUNCTION AddTransactionLog(
    p_UsersID INT,
    p_OrderID INT,
    p_type ENUM('Refund', 'purchase'),
    p_quantity FLOAT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the user exists
    IF (SELECT COUNT(*) FROM Users WHERE UsersID = p_UsersID) = 0 THEN
        SET msg = 'Usuario no encontrado';
        RETURN msg;
    END IF;

    -- Verify if the order exists
    IF (SELECT COUNT(*) FROM Orders WHERE OrdersID = p_OrderID) = 0 THEN
        SET msg = 'Orden no encontrada';
        RETURN msg;
    END IF;

    -- Insert the new transaction log
    INSERT INTO TransactionLogs (UsersID, OrderID, type, quantity, date)
    VALUES (p_UsersID, p_OrderID, p_type, p_quantity, NOW());

    SET msg = 'Transacción añadida correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a transaction log
DELIMITER //
CREATE FUNCTION UpdateTransactionLog(
    p_TransactionID INT,
    p_type ENUM('Refund', 'purchase'),
    p_quantity FLOAT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the transaction exists
    IF (SELECT COUNT(*) FROM TransactionLogs WHERE TransactionID = p_TransactionID) = 0 THEN
        SET msg = 'Transacción no encontrada';
        RETURN msg;
    END IF;

    -- Update the transaction log
    UPDATE TransactionLogs
    SET type = p_type, quantity = p_quantity, date = NOW()
    WHERE TransactionID = p_TransactionID;

    SET msg = 'Transacción actualizada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a transaction log
DELIMITER //
CREATE FUNCTION DeleteTransactionLog(
    p_TransactionID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the transaction exists
    IF (SELECT COUNT(*) FROM TransactionLogs WHERE TransactionID = p_TransactionID) = 0 THEN
        SET msg = 'Transacción no encontrada';
        RETURN msg;
    END IF;

    -- Delete the transaction log
    DELETE FROM TransactionLogs WHERE TransactionID = p_TransactionID;

    SET msg = 'Transacción eliminada correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Table: PriceHistory
-- Function to add a price history
DELIMITER //
CREATE FUNCTION AddPriceHistory(
    p_ProductID INT,
    p_price FLOAT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the product exists
    IF (SELECT COUNT(*) FROM Products WHERE ProductsID = p_ProductID) = 0 THEN
        SET msg = 'Producto no encontrado';
        RETURN msg;
    END IF;

    -- Insert the new price history
    INSERT INTO PriceHistory (ProductID, price, date)
    VALUES (p_ProductID, p_price, NOW());

    SET msg = 'Historial de precios añadido correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to update a price history
DELIMITER //
CREATE FUNCTION UpdatePriceHistory(
    p_PriceID INT,
    p_price FLOAT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the price history exists
    IF (SELECT COUNT(*) FROM PriceHistory WHERE PriceID = p_PriceID) = 0 THEN
        SET msg = 'Historial de precios no encontrado';
        RETURN msg;
    END IF;

    -- Update the price history
    UPDATE PriceHistory
    SET price = p_price, date = NOW()
    WHERE PriceID = p_PriceID;

    SET msg = 'Historial de precios actualizado correctamente';
    RETURN msg;
END //
DELIMITER ;

-- Function to delete a price history
DELIMITER //
CREATE FUNCTION DeletePriceHistory(
    p_PriceID INT
) RETURNS VARCHAR(255)
DETERMINISTIC
MODIFIES SQL DATA
BEGIN
    DECLARE msg VARCHAR(255);

    -- Verify if the price history exists
    IF (SELECT COUNT(*) FROM PriceHistory WHERE PriceID = p_PriceID) = 0 THEN
        SET msg = 'Historial de precios no encontrado';
        RETURN msg;
    END IF;

    -- Delete the price history
    DELETE FROM PriceHistory WHERE PriceID = p_PriceID;

    SET msg = 'Historial de precios eliminado correctamente';
    RETURN msg;
END //
DELIMITER ;
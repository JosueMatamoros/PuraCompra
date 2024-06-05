use puracompra;
DELIMITER //

CREATE PROCEDURE process_products()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE p_id INT;
    DECLARE seller_id INT;
    DECLARE p_name VARCHAR(255);
    DECLARE p_stock INT;
    DECLARE p_description VARCHAR(255);
    DECLARE p_price FLOAT;
    DECLARE p_imageUrl VARCHAR(255);
    
    -- Declare the cursor to select products
    DECLARE product_cursor CURSOR FOR 
    SELECT ProductsID, Sellers, name, stock, description, price, imageUrl FROM Products;
    
    -- Declare the continue handler for the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Open the cursor
    OPEN product_cursor;
    
    -- Loop to iterate over the rows
    read_loop: LOOP
        FETCH product_cursor INTO p_id, seller_id, p_name, p_stock, p_description, p_price, p_imageUrl;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Process each row
        -- For example, print the product information
        SELECT CONCAT('Product ID: ', p_id, ', Seller ID: ', seller_id, ', Name: ', p_name, ', Stock: ', p_stock, ', Description: ', p_description, ', Price: ', p_price, ', Image URL: ', p_imageUrl);
    END LOOP;
    
    -- Cerrar el cursor
    CLOSE product_cursor;
END //

DELIMITER ;

CALL process_products();


DELIMITER //

CREATE PROCEDURE process_users()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE u_id INT;
    DECLARE u_name VARCHAR(255);
    DECLARE u_lastname VARCHAR(255);
    DECLARE u_mail VARCHAR(255);
    DECLARE u_password VARCHAR(255);
    DECLARE u_phoneNumber VARCHAR(15);
    DECLARE u_gender ENUM('male', 'female', 'other');
    DECLARE u_country VARCHAR(255);
    
    -- Declare the cursor to select users
    DECLARE user_cursor CURSOR FOR 
    SELECT UsersID, name, lastname, mail, password, phoneNumber, gender, country FROM Users;
    
    -- Declare the continue handler for the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Open the cursor
    OPEN user_cursor;
    
    -- Loop to iterate over the rows
    read_loop: LOOP
        FETCH user_cursor INTO u_id, u_name, u_lastname, u_mail, u_password, u_phoneNumber, u_gender, u_country;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Process each row
        -- For example, print the user information
        SELECT CONCAT('User ID: ', u_id, ', Name: ', u_name, ', Lastname: ', u_lastname, ', Email: ', u_mail, ', Phone Number: ', u_phoneNumber, ', Gender: ', u_gender, ', Country: ', u_country);
    END LOOP;
    
    -- Close the cursor
    CLOSE user_cursor;
END //

DELIMITER ;

CALL process_users();


DELIMITER //
CREATE PROCEDURE process_shipments()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE s_id INT;
    DECLARE o_id INT;
    DECLARE s_tracking INT;
    DECLARE s_date DATETIME;
    DECLARE s_price FLOAT;
    DECLARE s_totalPrice FLOAT;
    DECLARE s_state ENUM('DELIVERED', 'IN_PROCESS', 'PENDING');

    -- Declare the cursor to select shipments
    DECLARE shipment_cursor CURSOR FOR
    SELECT ShipmentsID, OrdersID, IFNULL(tracking, 0), date, price, totalPrice, state FROM Shipments;

    -- Declare the continue handler for the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN shipment_cursor;

    -- Loop to iterate over the rows
    read_loop: LOOP
        FETCH shipment_cursor INTO s_id, o_id, s_tracking, s_date, s_price, s_totalPrice, s_state;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Process each row
        -- For example, print the shipment information
        SELECT CONCAT('Shipment ID: ', s_id, ', Order ID: ', o_id, ', Tracking: ', s_tracking, ', Date: ', s_date, ', Price: ', s_price, ', Total Price: ', s_totalPrice, ', State: ', s_state);
    END LOOP;

    -- Close the cursor
    CLOSE shipment_cursor;
END //
DELIMITER ;


CALL process_shipments();




use puracompra;
-- 1. Insert users
INSERT INTO Users (name, lastname, mail, password, phoneNumber, gender, country) VALUES
('Isaac', 'Ramírez', 'izackk26@icloud.com','1234', '1238-8281', 'male','Costa Rica' ),
('Roosevelt', 'Pérez', 'roperez@yahoo-questions.com','1234', '1234-9785', 'male', 'Costa Rica'),
('Josué', 'Matamoros', 'jmatamoros@kahoot.com','1234', '8745-1708', 'male', 'Costa Rica'),
('Luis', 'Cubillo', 'luisalonso@gmail.com', '1234', '1234-5678', 'male', 'Costa Rica');


-- 2. Insert addresses
INSERT INTO Addresses (UsersID, address) VALUES
(1, 'San Ramón, Alajuela'),
(1, 'Santa Clara, San Carlos'),
(2, 'Florencia, San Carlos'),
(3, 'Calle Pechuga, San Ramón'),
(3, 'Santa Clara, San Carlos (Solo Jueves)');

-- insert into Addresses (UsersID , address) values
-- (5, 'Penas Blancas, Barrio Experiencia');

-- Check the addresses
SELECT * FROM Addresses;

-- ENUM ('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS')
-- 3. Insert Sellers
-- Insertar datos en la tabla Sellers
INSERT INTO Sellers (SellersID, name, url, type) VALUES
(1, 'Apple', 'https://www.apple.com/', 'RETAIL_DISTRIBUTORS'),
(2, 'Razer', 'https://www.razer.com/', 'RETAIL_DISTRIBUTORS'),
(3, 'Gymshark', 'https://www.gymshark.com/', 'PLATFORM_PARTNERS'),
(4, 'Sonos', 'https://www.sonos.com/', 'PLATFORM_PARTNERS'),
(5, 'Yeezy', 'https://www.yeezy.com/', 'PLATFORM_PARTNERS'),
(6, 'Amazon', 'https://www.amazon.com/', 'DIGITAL_RESELLERS');

-- Check the sellers
SELECT * FROM Sellers;

-- 4. Insert Products

INSERT INTO Products (Sellers, name, stock, description, price, imageUrl) VALUES
(1, 'AirPods Max', 10, 'Apple AirPods Max', 549, '/assets/apple/airPodsMax/airPodsMax.png'),
(1, 'Apple Vision', 5, 'Apple Vision Pro', 3499, '/assets/apple/appleVision/appleVision.png'),
(1, 'iPad Pro', 20, 'Apple iPad Pro 2021', 1099, '/assets/apple/ipadPro/ipadPro.png'),
(1, 'iPhone 15', 15, 'Apple iPhone 15 Pro Max', 1199, '/assets/apple/iphone15/iphone15.png'),
(1, 'Mac M3 Air', 10, 'Apple MacBook Air M3', 999, '/assets/apple/macM3Air/macM3Air.png'),
(1, 'Mac M3 Pro', 8, 'Apple MacBook Pro M3', 1299, '/assets/apple/macM3Pro/macM3Pro.png'),
(2, 'Barracuda', 10, 'Razer Barracuda Headset', 159, '/assets/razer/barracuda/barracuda.png'),
(2, 'Blade', 5, 'Razer Blade 15', 2499, '/assets/razer/blade/blade.png'),
(2, 'Huntsman Mini', 20, 'Razer Huntsman Mini Keyboard', 129, '/assets/razer/huntsmanMini/huntsmanMini.png'),
(2, 'Mercury', 15, 'Razer Mercury Mouse', 69, '/assets/razer/mercury/mercury.png'),
(2, 'Viper', 10, 'Razer Viper Mouse', 79, '/assets/razer/viper/viper.png'),
(2, 'Viper Ultimate', 8, 'Razer Viper Ultimate Mouse', 149, '/assets/razer/viperUltimate/viperUltimate.png'),
(4, 'Arc', 10, 'Sonos Arc Soundbar', 899, '/assets/sonos/arc/arc.png'),
(4, 'Era 300', 15, 'Sonos Era 300 Speaker', 449, '/assets/sonos/era300/era300.png'),
(4, 'Move 2', 20, 'Sonos Move 2 Speaker', 399, '/assets/sonos/move2/move2.png'),
(4, 'Roam', 25, 'Sonos Roam Speaker', 179, '/assets/sonos/roam/roam.png'),
(4, 'Sub', 8, 'Sonos Sub Subwoofer', 749, '/assets/sonos/sub/sub.png'),
(4, 'Turntable Set', 5, 'Sonos Turntable Set', 849, '/assets/sonos/turntableSet/turntableSet.png'),
(5, 'Alien', 10, 'Yeezy Alien Shoes', 220, '/assets/yeezy/alien/alien.png'),
(5, 'Ararat', 15, 'Yeezy Ararat Shoes', 200, '/assets/yeezy/ararat/ararat.png'),
(5, 'Bone', 20, 'Yeezy Bone Shoes', 250, '/assets/yeezy/bone/bone.png'),
(5, 'Stone', 25, 'Yeezy Stone Shoes', 230, '/assets/yeezy/stone/stone.png'),
(5, 'Synth', 12, 'Yeezy Synth Shoes', 300, '/assets/yeezy/synth/synth.png'),
(5, 'Zebra', 18, 'Yeezy Zebra Shoes', 280, '/assets/yeezy/zebra/zebra.png');




-- Check the products
SELECT * FROM Products;

-- 5. Promotions

INSERT INTO Promotions (PromotionsID, category, discount, description) VALUES
(1, 'HOLIDAYS', 0.10, '10% off on all products, Thanksgiving Sale'),
(2, 'FREE_SHIPING', 0.05, '5% off on all products'),
(3, 'MEMBERS', 0.15, '15% off on all products'),
(4, 'HOLIDAYS', 0.20, '20% off on all products, Christmas Sale'),
(5, 'FREE_SHIPING', 0.10, '10% off on all products'),
(6, 'HOLIDAYS', 0.15, '15% off, Black Friday');

-- Check the promotions
SELECT * FROM Promotions;

-- 6. ProductsPromotions

INSERT INTO ProductsPromotions (ProductsID, PromotionsID) VALUES
(1, 1),
(1, 5),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 1),
(8, 2),
(9, 3),
(10, 4),
(11, 5),
(12, 6),
(13, 1),
(14, 2),
(15, 3),
(16, 4),
(17, 5),
(18, 6),
(19, 1),
(20, 2),
(21, 3);

-- Check the products promotions
SELECT * FROM ProductsPromotions;

-- 7. Price History

INSERT INTO PriceHistory ( ProductID, price) VALUES
(1, 459.99),
(1, 352.25),
(3, 1000),
(4, 1499.99),
(5, 50),
(6, 50),
(7, 100),
(8, 51.52),
(9, 180),
(10, 2000),
(11, 3500),
(6, 42.99),
(10, 2100);

-- Check the price history
SELECT * FROM PriceHistory;

-- 8. Reviews

INSERT INTO Reviews (UsersID, ProductsID, body, star) VALUES
(1, 6, 'This MacBook Pro is amazing! The performance is top-notch and the battery life is impressive. Highly recommended!', 'FIVE_STAR'),
(2, 6, 'The Mac M3 Pro is incredibly fast and handles all my tasks with ease. The display is stunning too!', 'FIVE_STAR'),
(3, 6, 'I am very satisfied with this MacBook. It is very reliable and has a great build quality. Perfect for professionals.', 'FIVE_STAR'),
(4, 6, 'I love this laptop! The speed and performance are unmatched. It is a bit pricey, but worth every penny.', 'FIVE_STAR');


-- Check the reviews
SELECT * FROM Reviews;

-- Insert Product Images
INSERT INTO ProductImages (ProductsID, imageUrl, type, color) VALUES
(6, '/assets/apple/macM3Pro/macM3ProAbove.png', false, NULL),
(6, '/assets/apple/macM3Pro/macM3ProBack.png', false, NULL ),
(6, '/assets/apple/macM3Pro/macM3ProModels.png', false, NULL ),
(6, '/assets/apple/macM3Pro/macM3ProWhite.png', true, 'White'),
(6, '/assets/apple/macM3Pro/macM3ProBlack.png', true, 'Black');

-- 9. Orders

INSERT INTO Orders (UsersID, address, price, taxes) VALUES
(1, 'San Ramón, Alajuela', 1214.50, 157.89),
(2, 'Florencia, San Carlos', 2340.00, 304.20),
(3, 'Calle Pechuga, San Ramón', 895.00, 116.35);


-- Order Details
INSERT INTO OrderDetails (OrdersID, ProductID) VALUES
(1, 1),
(2, 2),
(3, 3),
(1,3),
(2,4),
(3,5);

-- Check the orders
SELECT * FROM Orders;

-- 10. Shipments

INSERT INTO Shipments (OrdersID, tracking, price, totalPrice, state) VALUES
(1, 123456789, 100.00, 1314.50, 'DELIVED'),
(2, 987654321, 120.00, 2460.00, 'PENDING'),
(3, 123456789, 75.00, 970.00, 'DELIVED');


-- Check the shipments
SELECT * FROM Shipments;

-- 11. Transaction Logs

INSERT INTO TransactionLogs ( UsersID, OrderID, type, quantity) VALUES
(1, 1, 'purchase', 1214.50),
(2, 2, 'purchase', 2340.00),
(3, 3, 'purchase', 895.00);

-- Check the transaction logs
SELECT * FROM TransactionLogs;
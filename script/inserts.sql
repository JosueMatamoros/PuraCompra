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
(3, '/assets/apple/ipadPro/ipadPro.png', false, NULL),
(3, '/assets/apple/ipadPro/ipadProAbove.png', false, NULL),
(3, '/assets/apple/ipadPro/ipadProDiagonal.png', false, NULL),
(3, '/assets/apple/ipadPro/ipadProSide.png', false, NULL),
(3, '/assets/apple/ipadPro/ipadProBlack.png', true, 'Black'),
(3, '/assets/apple/ipadPro/ipadProWhite.png', true, 'White'),
(6, '/assets/apple/macM3Pro/macM3Pro.png', false, NULL),
(6, '/assets/apple/macM3Pro/macM3ProAbove.png', false, NULL),
(6, '/assets/apple/macM3Pro/macM3ProBack.png', false, NULL ),
(6, '/assets/apple/macM3Pro/macM3ProModels.png', false, NULL ),
(6, '/assets/apple/macM3Pro/macM3ProWhite.png', true, 'White'),
(6, '/assets/apple/macM3Pro/macM3ProBlack.png', true, 'Black'),
(14, '/assets/sonos/era300/era300.png', True, null),
(14, '/assets/sonos/era300/era300BlackAbove.png', false, null),
(14, '/assets/sonos/era300/era300Front.png', false, null),
(14, '/assets/sonos/era300/era300White.png', True, null),
(14, '/assets/sonos/era300/era300WhiteSpecs.png', false, null),
(5, '/assets/apple/macM3Air/macM3Air.png', false, NULL),
(5, '/assets/apple/macM3Air/macM3AirAbove.png', false, NULL),
(5, '/assets/apple/macM3Air/macM3AirModels.png', false, NULL),
(5, '/assets/apple/macM3Air/macM3AirMidnight.png', true, 'Midnight'),
(5, '/assets/apple/macM3Air/macM3AirSilver.png', true, 'Silver'),
(5, '/assets/apple/macM3Air/macM3AirSpaceGray.png', true, 'Space Gray'),
(5, '/assets/apple/macM3Air/macM3AirStarlight.png', true, 'Starlight'),
(4, '/assets/apple/iphone15/iphone15.png', false, NULL),
(4, '/assets/apple/iphone15/iphone15Back.png', false, NULL),
(4, '/assets/apple/iphone15/iphone15Side.png', false, NULL),
(4, '/assets/apple/iphone15/iphone15Models.png', false, NULL),
(4, '/assets/apple/iphone15/iphone15BlueTitanium.png', true, 'Blue Titanium'),
(4, '/assets/apple/iphone15/iphone15NaturalTitanium.png', true, 'Natural Titanium'),
(4, '/assets/apple/iphone15/iphone15WhiteTitanium.png', true, 'White Titanium'),
(1, '/assets/apple/airPodsMax/airPodsMax.png', false, NULL),
(1, '/assets/apple/airPodsMax/airPodsMaxSide.png', false, NULL),
(1, '/assets/apple/airPodsMax/airPodsMaxBlack.png', true, 'Black'),
(1, '/assets/apple/airPodsMax/airPodsMaxSilver.png', true, 'Silver'),
(1, '/assets/apple/airPodsMax/airPodsMaxPink.png', true, 'Pink'),
(1, '/assets/apple/airPodsMax/airPodsMaxSkyBlue.png', true, 'Sky Blue'),
(2, '/assets/apple/appleVision/appleVision.png', false, NULL),
(2, '/assets/apple/appleVision/appleVisionAbove.png', false, NULL),
(2, '/assets/apple/appleVision/appleVisionDiagonal.png', false, NULL),
(2, '/assets/apple/appleVision/appleVisionSide.png', false, NULL),
(7, '/assets/razer/barracuda/barracuda.png', false, 'White'),
(7, '/assets/razer/barracuda/barracudaSideBlack.png', true, 'Black'),
(7, '/assets/razer/barracuda/barracudaSidePink.png', true, 'Pink'),
(8, '/assets/razer/blade/blade.png', false, NULL),
(8, '/assets/razer/blade/bladeAbove.png', false, NULL),
(8, '/assets/razer/blade/bladeFront.png', false, NULL),
(8, '/assets/razer/blade/bladeSide.png', false, NULL),
(9, '/assets/razer/huntsmanMini/huntsmanMini.png', false, NULL),
(9, '/assets/razer/huntsmanMini/huntsmanMiniBlack.png', true, 'Black'),
(9, '/assets/razer/huntsmanMini/huntsmanMiniFrontWhite.png', true, 'White'),
(10,'/assets/razer/mercury/mercury.png', true, 'White'),
(10,'/assets/razer/mercury/mercurySideBlack.png', false, NULL),
(10,'/assets/razer/mercury/mercuryBackBlack.png', true, 'Black'),
(10,'/assets/razer/mercury/mercuryDiagonalPink.png', true, 'Pink'),
(13, '/assets/sonos/arc/arc.png', true, 'Black'),
(13, '/assets/sonos/arc/arcWhite.png', true, 'White'),
(13, '/assets/sonos/arc/arcDiagonal.png', false, NULL),
(13, '/assets/sonos/arc/arcDiagonalWhite.png', false, NULL),
(16, '/assets/sonos/roam/roam.png', false, NULL),
(16, '/assets/sonos/roam/roamModels.png', false, NULL),
(16, '/assets/sonos/roam/roamBlack.png', true, 'Black'),
(16, '/assets/sonos/roam/roamBlue.png', true, 'Blue'),
(16, '/assets/sonos/roam/roamGreen.png', true, 'Green'),
(16, '/assets/sonos/roam/roamRed.png', true, 'Red'),
(16, '/assets/sonos/roam/roamWhite.png', true, 'White'),
(17, '/assets/sonos/sub/sub.png', false, Null),
(17, '/assets/sonos/sub/subWhite.png', true, 'White'),
(17, '/assets/sonos/sub/subBlack.png', true, 'Black'),
(17, '/assets/sonos/sub/subBlackFront.png', false , NULL),
(17, '/assets/sonos/sub/subWhiteAbove.png', false, NULL),
(18, '/assets/sonos/turntableSet/turntableSet.png', true, 'Black'),
(18, '/assets/sonos/turntableSet/turntableSetWhite.png', true, 'White'),
(18, '/assets/sonos/turntableSet/turntableSetTableBlack.png', false, NULL),
(18, '/assets/sonos/turntableSet/turntableSetTableWhite.png', false, NULL),
(19, '/assets/yeezy/alien/alien.png', false, NULL),
(19, '/assets/yeezy/alien/alienAbove.png', false, NULL),
(19, '/assets/yeezy/alien/alienFront.png', false, NULL),
(20, '/assets/yeezy/ararat/ararat.png', false, NULL),
(20, '/assets/yeezy/ararat/araratSide.png', false, NULL),
(20, '/assets/yeezy/ararat/araratDiagonal.png', false, NULL),
(20, '/assets/yeezy/ararat/araratBack.png', false, NULL),
(21, '/assets/yeezy/bone/bone.png', false, NULL),
(21, '/assets/yeezy/bone/boneBack.png', false, NULL),
(21, '/assets/yeezy/bone/boneDiagonal.png', false, NULL),
(22, '/assets/yeezy/stone/stone.png', false, NULL),
(22, '/assets/yeezy/stone/stoneDiagonal.png', false, NULL),
(22, '/assets/yeezy/stone/stoneFront.png', false, NULL),
(22, '/assets/yeezy/stone/stoneSide.png', false, NULL);




TRUNCATE TABLE ProductImages;




select * from ProductImages;

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
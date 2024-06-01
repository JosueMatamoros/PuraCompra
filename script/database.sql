

-- Users Table
CREATE TABLE Users (
  `UsersID` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255),
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `gender` ENUM ('male', 'female', 'other'),
  `country` varchar(255) NOT NULL,
  `profilePicture` varchar(255)
);

UPDATE Users
SET profilePicture = NULL
WHERE UsersID = 1;

-- Addresses Table
CREATE TABLE Addresses (
  `AddressID` int NOT NULL AUTO_INCREMENT,
  `UsersID` int NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`AddressID`, `UsersID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`)
);

-- Orders Table
CREATE TABLE Orders (
  `OrdersID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `date` datetime DEFAULT (now()),
  `address` varchar(255),
  `price` float,
  `taxes` float
);

-- OrderDetails Table
CREATE TABLE OrderDetails (
  `OrdersID` int,
  `ProductID` int
);

-- Products Table
CREATE TABLE Products (
  `ProductsID` int PRIMARY KEY AUTO_INCREMENT,
  `Sellers` int,
  `name` varchar(255) NOT NULL,
  `stock` int DEFAULT 0,
  `description` varchar(255),
  `price` float NOT NULL,
  `imageUrl` varchar(255) NOT NULL

);

-- ProductImages Table
CREATE TABLE ProductImages (
  `ImageID` int PRIMARY KEY AUTO_INCREMENT,
  `ProductsID` int,
  `imageUrl` varchar(255) NOT NULL,
  `type` boolean NOT NULL,
  `color` varchar(50),
  FOREIGN KEY (`ProductsID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

-- Sellers Table
CREATE TABLE Sellers (
  `SellersID` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `url` varchar(255),
  `type` ENUM ('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS')
);

-- Shipments Table
CREATE TABLE Shipments (
  `ShipmentsID` int PRIMARY KEY AUTO_INCREMENT,
  `OrdersID` int,
  `tracking` int,
  `date` datetime DEFAULT (now()),
  `price` float,
  `totalPrice` float,
  `state` ENUM ('DELIVED', 'IN_PROCESS', 'PENDING') DEFAULT 'PENDING'
);

-- ProductsPromotions Table
CREATE TABLE ProductsPromotions (
  `ProductsID` int,
  `PromotionsID` int
);

-- Promotions Table
CREATE TABLE Promotions (
  `PromotionsID` int PRIMARY KEY,
  `category` ENUM ('HOLIDAYS', 'FREE_SHIPING', 'MEMBERS'),
  `discount` float,
  `description` varchar(255)
);


-- Reviews Table
CREATE TABLE Reviews (
  `ReviewsID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `ProductsID` int,
  `title` varchar(50),
  `body` varchar(255),
  `star` ENUM ('ONE_STAR', 'TWO_STAR', 'TREE_STAR', 'FOURTH_STAR', 'FIVE_STAR'),
  `date` datetime DEFAULT (now())
);

-- TransactionLogs
CREATE TABLE TransactionLogs (
  `TransactionID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `OrderID` int,
  `type` ENUM ('Refund', 'purchase'),
  `quantity` float,
  `date` datetime DEFAULT (now())
);

-- PriceHistory Table
CREATE TABLE PriceHistory (
  `PriceID` int PRIMARY KEY AUTO_INCREMENT,
  `ProductID` int,
  `price` float,
  `date` datetime DEFAULT (now())
);

CREATE TABLE CartItems (
  CartItemID int PRIMARY KEY AUTO_INCREMENT,
  UsersID int NOT NULL,
  ProductID int NOT NULL,
  quantity int DEFAULT 1,
  FOREIGN KEY (UsersID) REFERENCES Users (UsersID),
  FOREIGN KEY (ProductID) REFERENCES Products (ProductsID)
);


-- Relationships

-- Creates a relation between the Addresses table with the UserID, because a user may have different addresses
-- Adresses -> Users (1:1)
ALTER TABLE Addresses ADD FOREIGN KEY (UsersID) REFERENCES Users (UsersID);

-- Creates a relation between the Orders table with the UsersID, because a user may have different orders
-- Orders -> Users (1:N)
ALTER TABLE Orders ADD FOREIGN KEY (UsersID) REFERENCES Users (UsersID);

-- Creates a relation between the OrderDetails table with the OrdersID, because an order may have different products
-- OrderDetails -> Orders (1:N)
ALTER TABLE OrderDetails ADD FOREIGN KEY (OrdersID) REFERENCES Orders (OrdersID);

-- Creates a relation between the OrderDetails table with the ProductID, because a product may be in different orders
-- OrderDetails -> Products (1:N)
ALTER TABLE OrderDetails ADD FOREIGN KEY (ProductID) REFERENCES Products (ProductsID);

-- Creates a relation between the Shipments table with the OrdersID, because an order may have different shipments
-- Shipments -> Orders (1:N)
ALTER TABLE Shipments ADD FOREIGN KEY (OrdersID) REFERENCES Orders (OrdersID);

-- Creates a relation between the TransactionLogs table with the UsersID, because a user may have different transactions
-- TransactionLogs -> Users (1:N)
ALTER TABLE TransactionLogs ADD FOREIGN KEY (UsersID) REFERENCES Users (UsersID);

-- Creates a relation between the TransactionLogs table with the OrderID, because an order may have different transactions
-- TransactionLogs -> Orders (1:N)
ALTER TABLE TransactionLogs ADD FOREIGN KEY (OrderID) REFERENCES Orders (OrdersID);

-- Creates a relation between the Products table with the Sellers, because a product may have different sellers
-- Products -> Sellers (1:N)
ALTER TABLE Reviews ADD FOREIGN KEY (UsersID) REFERENCES Users (UsersID);

-- Creates a relation between the Reviews table with the UsersID, because a user may have different reviews
-- Reviews -> Users (1:N)
ALTER TABLE Reviews ADD FOREIGN KEY (ProductsID) REFERENCES Products (ProductsID);

-- Creates a relation between the Products table with the Sellers, because a product may have different sellers
-- Products -> Sellers (1:N)
ALTER TABLE Products ADD FOREIGN KEY (Sellers) REFERENCES Sellers (SellersID);

-- Creates a relation between the ProductsPromotions table with the ProductsID, because a product may have different promotions
-- ProductsPromotions -> Products (1:N)
ALTER TABLE ProductsPromotions ADD FOREIGN KEY (ProductsID) REFERENCES Products (ProductsID);

-- Creates a relation between the ProductsPromotions table with the PromotionsID, because a promotion may have different products
-- ProductsPromotions -> Promotions (1:N)
ALTER TABLE ProductsPromotions ADD FOREIGN KEY (PromotionsID) REFERENCES Promotions (PromotionsID);

-- Creates a relation between the PriceHistory table with the ProductID, because a product may have different prices
-- PriceHistory -> Products (1:N)
ALTER TABLE PriceHistory ADD FOREIGN KEY (ProductID) REFERENCES Products (ProductsID);






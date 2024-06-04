CREATE DATABASE IF NOT EXISTS puracompra;
USE puracompra;

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
  `profilePicture` varchar(255),
  `role` ENUM ('admin', 'user') DEFAULT 'user'
);

-- Addresses Table
CREATE TABLE Addresses (
  `AddressID` int NOT NULL AUTO_INCREMENT,
  `UsersID` int NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`AddressID`, `UsersID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE Orders (
  `OrdersID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `date` datetime DEFAULT (now()),
  `address` varchar(255),
  `price` float,
  `taxes` float,
  `card` int,
  FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`) ON DELETE CASCADE
);

-- Sellers Table
CREATE TABLE Sellers (
  `SellersID` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `url` varchar(255),
  `type` ENUM ('RETAIL_DISTRIBUTORS', 'PLATFORM_PARTNERS', 'DIGITAL_RESELLERS')
);

-- Products Table
CREATE TABLE Products (
  `ProductsID` int PRIMARY KEY AUTO_INCREMENT,
  `Sellers` int,
  `name` varchar(255) NOT NULL,
  `stock` int DEFAULT 0,
  `description` varchar(255),
  `price` float NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  FOREIGN KEY (`Sellers`) REFERENCES Sellers(`SellersID`)
);

-- OrderDetails Table
CREATE TABLE OrderDetails (
  `OrdersID` int,
  `ProductID` int,
  FOREIGN KEY (`OrdersID`) REFERENCES Orders(`OrdersID`) ON DELETE CASCADE,
  FOREIGN KEY (`ProductID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

-- ProductImages Table
CREATE TABLE ProductImages (
  `ImageID` int PRIMARY KEY AUTO_INCREMENT,
  `ProductsID` int,
  `imageUrl` varchar(255) NOT NULL,
  `type` boolean NOT NULL,
  `color` varchar(50),
  `colorName` varchar(50),
  FOREIGN KEY (`ProductsID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

-- Shipments Table
CREATE TABLE Shipments (
  `ShipmentsID` int PRIMARY KEY AUTO_INCREMENT,
  `OrdersID` int,
  `tracking` int,
  `date` datetime DEFAULT (now()),
  `price` float,
  `totalPrice` float,
  `state` ENUM ('DELIVERED', 'IN_PROCESS', 'PENDING') DEFAULT 'PENDING',
  FOREIGN KEY (`OrdersID`) REFERENCES Orders(`OrdersID`) ON DELETE CASCADE
);

-- Promotions Table
CREATE TABLE Promotions (
  `PromotionsID` int PRIMARY KEY,
  `category` ENUM ('HOLIDAYS', 'FREE_SHIPING', 'MEMBERS'),
  `discount` float,
  `description` varchar(255)
);

-- ProductsPromotions Table
CREATE TABLE ProductsPromotions (
  `ProductsID` int,
  `PromotionsID` int,
  FOREIGN KEY (`ProductsID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE,
  FOREIGN KEY (`PromotionsID`) REFERENCES Promotions(`PromotionsID`) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE Reviews (
  `ReviewsID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `ProductsID` int,
  `title` varchar(50),
  `body` varchar(255),
  `star` ENUM ('ONE_STAR', 'TWO_STAR', 'TREE_STAR', 'FOUR_STAR', 'FIVE_STAR'),
  `date` datetime DEFAULT now(),
  FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`) ON DELETE CASCADE,
  FOREIGN KEY (`ProductsID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

-- TransactionLogs
CREATE TABLE TransactionLogs (
  `TransactionID` int PRIMARY KEY AUTO_INCREMENT,
  `UsersID` int,
  `OrderID` int,
  `type` ENUM ('Refund', 'purchase'),
  `quantity` float,
  `date` datetime DEFAULT (now()),
  FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`) ON DELETE CASCADE,
  FOREIGN KEY (`OrderID`) REFERENCES Orders(`OrdersID`) ON DELETE CASCADE
);

-- PriceHistory Table
CREATE TABLE PriceHistory (
  `PriceID` int PRIMARY KEY AUTO_INCREMENT,
  `ProductID` int,
  `price` float,
  `date` datetime DEFAULT (now()),
  FOREIGN KEY (`ProductID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

CREATE TABLE CartItems (
  CartItemID int PRIMARY KEY AUTO_INCREMENT,
  UsersID int NOT NULL,
  ProductID int NOT NULL,
  quantity int DEFAULT 1,
  FOREIGN KEY (`UsersID`) REFERENCES Users(`UsersID`) ON DELETE CASCADE,
  FOREIGN KEY (`ProductID`) REFERENCES Products(`ProductsID`) ON DELETE CASCADE
);

-- Creation of Views for the Database
USE PURACOMPRA;
-- Details of Users and Orders
CREATE VIEW UserOrderDetails AS
SELECT 
    u.UsersID,
    u.name AS UserName,
    u.mail AS UserEmail,
    o.OrdersID,
    o.date AS OrderDate,
    o.price AS OrderPrice,
    s.ShipmentsID,
    s.state AS ShipmentState
FROM 
    Users u
JOIN 
    Orders o ON u.UsersID = o.UsersID
JOIN 
    Shipments s ON o.OrdersID = s.OrdersID;
    
select * from UserOrderDetails;

-- Details of Products and Sellers

CREATE VIEW ProductFullDetails AS
SELECT 
    p.ProductsID,
    p.name AS ProductName,
    p.price AS ProductPrice,
    p.stock AS ProductStock,
    s.name AS SellerName,
    s.url AS SellerURL,
    pi.imageUrl AS ProductImage,
    pi.type AS ImageType
FROM 
    Products p
JOIN 
    Sellers s ON p.Sellers = s.SellersID
LEFT JOIN 
    ProductImages pi ON p.ProductsID = pi.ProductsID;
    
select * from ProductFullDetails;

-- Details of Orders and Products

CREATE VIEW OrderProductDetails AS
SELECT 
    o.OrdersID,
    o.date AS OrderDate,
    o.price AS OrderPrice,
    u.UsersID,
    u.name AS UserName,
    u.mail AS UserEmail,
    p.ProductsID,
    p.name AS ProductName,
    p.price AS ProductPrice
FROM 
    Orders o
JOIN 
    Users u ON o.UsersID = u.UsersID
JOIN 
    OrderDetails od ON o.OrdersID = od.OrdersID
JOIN 
    Products p ON od.ProductID = p.ProductsID;


select * from OrderProductDetails;

-- Summary of Sellers and Products

CREATE VIEW SellerProductSummary AS
SELECT 
    s.SellersID,
    s.name AS SellerName,
    s.url AS SellerURL,
    s.type AS SellerType,
    p.ProductsID,
    p.name AS ProductName,
    p.price AS ProductPrice,
    p.stock AS ProductStock,
    p.description AS ProductDescription
FROM 
    Sellers s
JOIN 
    Products p ON s.SellersID = p.Sellers;

select * from SellerProductSummary;


-- Summary of Shipments and Orders
CREATE VIEW ShipmentSummary AS
SELECT 
    s.ShipmentsID,
    s.date AS ShipmentDate,
    s.price AS ShipmentPrice,
    s.totalPrice AS TotalShipmentPrice,
    s.state AS ShipmentState,
    o.OrdersID,
    o.date AS OrderDate,
    u.UsersID,
    u.name AS UserName,
    u.mail AS UserEmail
FROM 
    Shipments s
JOIN 
    Orders o ON s.OrdersID = o.OrdersID
JOIN 
    Users u ON o.UsersID = u.UsersID;

select * from ShipmentSummary;

-- =====================================
-- Restaurant POS Database Setup Script
-- =====================================
-- Run this in SQL Server Management Studio if EF migrations fail

USE master;
GO

-- Drop database if exists
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'RestaurantPOS')
BEGIN
    ALTER DATABASE RestaurantPOS SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE RestaurantPOS;
    PRINT 'Existing database dropped';
END
GO

-- Create new database
CREATE DATABASE RestaurantPOS;
GO

PRINT 'Database RestaurantPOS created successfully';
GO

USE RestaurantPOS;
GO

-- Now run the EF migrations
-- dotnet ef database update --project RestaurantPOS.API

-- Create a new database named 'lexicon'
CREATE DATABASE lexicon;
USE lexicon; 

-- Create a table named 'item' in lexicon database
CREATE TABLE item (
 id INT auto_increment PRIMARY KEY,
 dotted NVARCHAR(255) collate utf8_bin,
 undotted NVARCHAR(255) collate utf8_bin
);
-- Create a table named 'item_temp' in lexicon database. See below for its usage.
CREATE TABLE item_temp (
	id INT auto_increment PRIMARY KEY,
    undotted NVARCHAR(255) collate utf8_bin
);

-- Load dotted words from 'dotted.txt' into item.dotted
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/dotted.txt"
INTO TABLE item 
LINES TERMINATED BY '\r\n'
(@col1)
SET dotted = @col1;

-- Load undotted words from 'undotted.txt' into item_temp.undotted.
-- It's used only becuase LOAD DATA INFILE doesn't support loading data 
-- into the first row of an existing table. Meaning, that if we'd load
-- straight into lexicon.item, the load would be done starting from 
-- lexicon.item's last row, instead of its first row.
LOAD DATA INFILE "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/undotted.txt"
REPLACE
INTO TABLE item_temp 
LINES TERMINATED BY '\r\n'
(@col1)
SET undotted = @col1;

-- Update item.undotted with item_temp.undotted staged data.
SET SQL_SAFE_UPDATES = 0;
UPDATE item
SET item.undotted = (
  SELECT item_temp.undotted
  FROM item_temp
  WHERE item.id = item_temp.id
);

-- Get rid of item_temp
drop table lexicon.item_temp;
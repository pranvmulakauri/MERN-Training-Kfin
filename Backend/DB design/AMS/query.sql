-- INSERT QUERY 
INSERT INTO INVESTOR(id, name,active) values (01,'akshay',true);
INSERT INTO INVESTOR(id, name,active) values (01,'RAM',false);


-- UPDATE QUERY
-- DELETE QUERY


-- READ QUERY
-- retrieve all data
SELECT * FROM INVESTOR;

-- retrieve particular columns
SELECT name from INVESTOR;

-- select with where conditions
SELECT * from INVESTOR
where name = 'akshay'

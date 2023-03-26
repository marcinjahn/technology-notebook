---
title: T-SQL
description: T-SQL query language of SQL Server
tags: ["sql", "databases", "db", "server", "relational"]
lang: en-US
---

# T-SQL

Every RDBMS vendor uses their own variation of SQL. MS implemented T-SQL
(Transactional Structured Query Language) for their MS SQL Server offering.

SQL is strongly typed.

## Types

- text:
    - *char(n)* - fixed length - good when we know the length or when length is
      less than 3 (more optimized than varchar(n)) (non-Unicode)
    - *varchar(n)* - variable length (up to *n*) (non-Unicode)
    - *nchar(n)* - fixed length (Unicode)
    - *nvarchar(n)* - variable length (up to *n*) (Unicode)
- integers:
    - *tinyint* (1 byte - 0-255)
    - *smallint* (2 bytes)
    - *int* (4 bytes)
    - *bigint* (8 bytes)
- decimals:
    - *decimal/numeric* (5-17 bytes) - optionally, we can provide precision and
      scale
    - *money* (8 bytes) - 4 decimal places
    - *smallmoney* (4 bytes)
- date/time:
    - *date* (3 bytes)
    - *time* - time precision might be adjusted
    - *datetime* (8 bytes) - legacy type
    - *smalldatetime* (4 bytes)
    - *datetime2* (6-8 bytes) - adjustable precision, it's a good choice in
      general
    - *datetimeoffset* (10 bytes) - with timezone
- boolean
    - *bit*

::: tip money
The *money* and *smallmoney* sizes are unique to SQL Server, so potentially it's
not the best choice.
:::

### Casting

We can cast types using the `CAST` function. E.g.:

```sql
SELECT CAST(7 AS DECIMAL (5,2)) / 2
-- Without the cast, the resoult would be '3'
```

SQL can also cast by itself trying to guess the intention:

```sql
SELECT '4' + 4;
-- Returns 8 by converting '4' to a number
```

## Functions

SQL Server comes with a bunch of buit-in functions (like `GETDATE`, `SQRT`,
etc.), which we can use in our queries. We can also create our own functions.

## Operations

### Creating a DB

```sql
CREATE DATABASE BobsShoes;
GO
```

### Creating a table

```sql
-- set the right database context
USE BobsShoes;
GO

-- schema (namespace)
CREATE SCHEMA Orders 
    AUTHORIZATION dbo;
GO

CREATE TABLE Orders.Customers (
    CustID int IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Customers_CustID PRIMARY KEY,
    CustName nvarchar(200) NOT NULL,
    CustStreet nvarchar(100) NOT NULL,
    CustCity nvarchar(100) NOT NULL,
    CustStateProv nvarchar(100) NOT NULL,
    CustCountry nvarchar(100) NOT NULL,
    CustPostalCode nvarchar(20) NOT NULL,
    SalutationID int NOT NULL 
        CONSTRAINT FK_Customers_SaluationID_Salutations_SalutationID 
            REFERENCES Orders.Salutations (SalutationID)
);

CREATE TABLE Orders.Stock (
    StockID int IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Stock_StockID PRIMARY KEY,    
    StockSKU char(8) NOT NULL,
    StockSize varchar(10) NOT NULL,
    StockName varchar(100) NOT NULL,
    StockPrice numeric(7, 2) NOT NULL,
);

CREATE TABLE Orders.Orders (  
    OrderID int IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_Orders_OrderID PRIMARY KEY,
    OrderDate date NOT NULL,
    OrderRequestedDate date NOT NULL,
    OrderDeliveryDate datetime2(0) NULL,
    CustID int NOT NULL --,
        CONSTRAINT FK_Orders_CustID_Customers_CustID 
            FOREIGN KEY REFERENCES Orders.Customers (CustID),
    OrderIsExpedited bit NOT NULL
 );

CREATE TABLE Orders.OrderItems (
    OrderItemID int IDENTITY(1,1) NOT NULL
        CONSTRAINT PK_OrderItems_OrderItemID PRIMARY KEY,
    OrderID int NOT NULL --,
        CONSTRAINT FK_OrderItems_OrderID_Orders_OrderID
            FOREIGN KEY REFERENCES Orders.Orders (OrderID),
    StockID int NOT NULL --,
        CONSTRAINT FK_OrderItems_StockID_Stock_StockID
            FOREIGN KEY REFERENCES Orders.Stock (StockID),
    Quantity smallint NOT NULL,
    Discount numeric(4, 2) NOT NULL
);
```

- `TotalPrice` is a calculated colum (the values can be persisted with the
  `PERSISTED` keyword
- `Orders.OrderTracking` - `Orders` is the schema, `OrdreTracking` is table's
  name

### Inserting rows

```sql
INSERT INTO Orders.Stock (
        StockSKU, 
        StockName, 
        StockSize, 
        StockPrice)

VALUES
    ('OXFORD01', 'Oxford', '10_D', 50.),
    ('BABYSHO1', 'BabySneakers', '3', 20.),
    ('HEELS001', 'Killer Heels', '7', 75.)
```

### Queries

#### Order of Execution

A `SELECT` statement is executed in the following order:

1. `FROM` - dataset is prepared
2. `WHERE` filters data using predicates
3. `GROUP BY` - rows combined into groups
4. `HAVING` - another filter - for groups this time
5. `SELECT` - evaluates a provided list of expressions on every row
6. `ORDER BY` - ordering
7. `OFFSET - FETCH` - limit the number of rows

Examples:

```sql
SELECT 'ABC' AS Something
FROM Orders

-- returns:
-- Something
-- ---------
-- 'ABC'
-- 'ABC'
-- 'ABC'
-- ... -- as many 'ABC's as many rows the Orders table has
```

::: tip Just SELECT
SQL Server allows execution of queries that have only the `SELECT` clause, such
as `SELECT 2*2;`.
:::

#### JOIN

- **CROSS JOIN** - A **Cartesian Product** of two tables - every entity from table A
  is matched with every element from table B - it's rarely useful

    ```sql
    SELECT *
    FROM Customers
    CROSS JOIN Orders;
    ```
    
    Result:

    |Customer|Country|OrderID|OrderDate|Customer|
    |-|-|-|-|-|
    |Bob|NULL|1|2019-01-01|Jack|
    |Chen|China|1|2019-01-01|Jack|
    |Jack|USA|1|2019-01-01|Jack|
    |Kelly|USA|1|2019-01-01|Jack|
    |Sunil|India|1|2019-01-01|Jack|
    |Bob|NULL|2|2019-01-01|Bob|
    |Chen|China|2|2019-01-01|Bob|
    |Jack|USA|2|2019-01-01|Bob|
    |Kelly|USA|2|2019-01-01|Bob|
    |Sunil|India|2|2019-01-01|Bob|
    |Bob|NULL|3|2019-01-15|Jack|
    |Chen|China|3|2019-01-15|Jack|
    |Jack|USA|3|2019-01-15|Jack|
    |Kelly|USA|3|2019-01-15|Jack|
    |Sunil|India|3|2019-01-15|Jack|
    |Bob|NULL|4|2019-01-16|Chen|
    |Chen|China|4|2019-01-16|Chen|
    |Jack|USA|4|2019-01-16|Chen|
    |Kelly|USA|4|2019-01-16|Chen|
    |Sunil|India|4|2019-01-16|Chen|

    We have 5 Customers, and 4 Orders. We see every customer combined with every
    order using cartesian product - 20 rows. It doesn't really make any sense.

- **INNER JOIN** - It starts with a CROSS JOIN, and then uses a *Join Predicate*
  (like `ON A.Name = B.Name`) to extract only the rows where the predicate
  evaluates to true. E.g. if predicate was `ON 1=1`, we'd get the same result as
  for the CROSS JOIN.

    ```sql
    SELECT *
    FROM Customers AS C
    INNER JOIN Orders AS O
    ON C.Customer = O.Customer;
    ```

    Result:

    |Customer|Country|OrderID|OrderDate|Customer|
    |-|-|-|-|-|
    |Jack|USA|1|2019-01-01|Jack|
    |Bob|NULL|2|2019-01-01|Bob|
    |Jack|USA|3|2019-01-15|Jack|
    |Chen|China|4|2019-01-16|Chen|

    Jack did two orders. We do not see the customers that didn't do any orders.

- **LEFT/RIGHT OUTER JOIN** - Works like an INNER JOIN, however, we can specify that
  entities of one of the sets (tables) will be takes even if predicate is not
  satisfied. The choice of the set is made with `LEFT` or `RIGHT`. The selected
  set is a **Reserved Set**.

    ```sql
    SELECT *
    FROM Customers AS C
    LEFT OUTER JOIN Orders AS O
    ON C.Customer = O.Customer;
    ```
  
  Result:

    |Customer|Country|OrderID|OrderDate|Customer|
    |-|-|-|-|-|
    |Bob|NULL|2|2019-01-01|Bob|
    |Chen|China|4|2019-01-16|Chen|
    |Jack|USA|1|2019-01-01|Jack|
    |Jack|USA|3|2019-01-15|Jack|
    |Kelly|USA|NULL|NULL|NULL|
    |Sunil|India|NULL|NULL|NULL|

  The customers which did not make any orders are present as well. The columns
  of the Orders table are NULLed for them.

::: tip Default
If we just use the `JOIN` keyword in the query, the `INNER JOIN` will be used.

If we use `LEFT/RIGHT JOIN`, the `LEFT/RIGHT OUTER JOIN` will be used.
:::

#### WHERE

Due to the fact that SQL includes NULLs, we have to deal with **Ternary Logic**.
On top of `true`/`false` there is a possibllity of an `unknown` result. To test
for `unknown` we use the `IS NULL`/`IS NOT NULL` operators.

::: tip Not Equal
Both the `!=` and `<>` are inequality operators. It's better to use the `<>`
though since it follows the ISO standard.
:::

#### GROUP BY

`GROUP BY` is useful when we do not care about individual entities, but rather
about some aggreagation of them ("How many people...", "What's the average...").
We get a single answer for the entire group instead of getting answers for every
individual.

```sql
SELECT Country, COUNT(*) AS Count -- COUNT(*) refers to each group
FROM Customers
WHERE Country IS NOT NULL
GROUP BY Country;
```

|Country|Count|
|-|-|
|China|	1|
|India|	1|
|USA|	2|

::: tip SELECT *
When using `GROUP BY`, we can no longer use `SELECT *`. `GROUP BY` returns an
aggreagation on some colums, the other columns are not included.
:::

::: tip NULL
When using `GROUP BY` on some column, the rows with the NULL value on that
column fall into the same group (NULL).
:::

##### HAVING

After grouping we can apply filtering on top of it - using the `HAVING` clause.
The difference from `WHERE` is the fact that `WHERE` is applied to individual
rows, while `HAVING` is applied to groups. Basically, the order of when they are
applied differs.

```sql
SELECT Country, COUNT(*) AS Count
FROM Customers
WHERE Country IS NOT NULL
GROUP BY Country
HAVING COUNT(*) > 1; -- We cannot use the 'Count' alias here
```

#### SELECT

Some remarks:

- We cannot create expressions based on aliases used in different expressions.
  For example, `SELECT (Quantity * Price) AS Total, 0.9 * Total FROM Items;`
  will not work, because `Total` will be unrecognized.
- `DISTINCT` eliminates duplicates (NULLs are treated as equal). It looks at all
  the `SELECT`ed columns and removes rows that are exactly the same.

    ```sql
    SELECT DISTINCT Country
    FROM Customers;
     ```

    ::: tip ALL
    Without `DISTINCT`, every `SELECT` is actually a `SELECT ALL` - it returns
    all the rows that were retrieved.
    :::

- Dealing with NULLs:
    - `ISNULL(X, Y)` function replaces column X (if it's null) with Y. It's a
      simplified version of a more general `COALESCE` function (which is
      available in other RDBMSs as well).

        ```sql
        SELECT DISTINCT ISNULL(Country, 'N/A') Country
        FROM Customers;
        ```

#### ORDER BY

Some facts:

- NULLs have always the lowest ordering value (Postgres uses the opposite logic,
  but allows to change that)
- we can refer to aliases defined in `SELECT`
- ascending order is the default
- the order of rows that have the same values for the column(s) we're ordering by is
  undeterministic

```sql
SELECT *
FROM Orders
ORDER BY OrderDate DESC;

-- With GROUP BY
SELECT Item, SUM(Quantity) AS NumbersOfItemsSold
FROM OrderItems
GROUP BY Item
ORDER BY NumbersOfItemsSold
```

## Tips

- `TOP` is an SQL Server-only feature
    - `OFFSET - FETCH` is a more standard way, it also simplifies paging

    ```sql
    SELECT Item, SUM(Quantity) AS NumbersOfItemsSold
    FROM OrderItems
    GROUP BY Item
    ORDER BY NumbersOfItemsSold DESC
    OFFSET 0 ROWS FETCH NEXT 3 ROWS ONLY; -- Like TOP(3), but with paging
    ```
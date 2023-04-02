---
title: MongoDB Overview
description: MongoDB NoSQL Database Overview
tags: ["mongo", "mongodb", "nosql", "document", "database", "db"]
lang: en-US
---

# MongoDB Overview

- Document DB
- supports ACID
- uses JSON/BSON
- districuted scalability (sharding)
- high availability (replica set)
- free open source Community Edition
- pluggable storage engine support
- queries use MQL (MongoDB Query Language)
- has free text search capabilities

## Terminology

Compared with Relational databases, MongoDB has the following terms:

|SQL|MongoDB|
|-|-|
|Database|Database|
|Table|Collection|
|Row|Document|
|Column|Field|
|Index|Index|

## BSON

BSON stands for "Binary JSON", it's binary-encoded. It sacrifies
human-readability for performance. BSON supports more data types than
traditional JSON (different numeric types, raw binary, dates, ObjectId, etc.). 

Example:

```json
# JSON
{"hello": "world"}

# BSON
\x16\x00\x00\x00           // total document size
\x02                       // 0x02 = type String
hello\x00                  // field name
\x06\x00\x00\x00world\x00  // field value
\x00                       // 0x00 = type EOO ('end of object')
```

On the "frontend", we talk with MongoDB in JSON. In the backend, MongoDB stores
the documents as BSONs.

All the BSON types can be found in the [MongoDB
Docs](https://www.mongodb.com/docs/manual/reference/bson-types/).

### Dates

A date can be represented in MongoDB with `ISODate`.

```json
{
    "departureTime": ISODate("2019-05-07T09:13:00Z")
    "arrivalDate": ISODate("2019-05-08")
}
```

We can use filtering based on date, including comparison operators such as
`$gt` and `$lt`.

## Index

To create an index:

```js
db.{collection}.createIndex(
    {
        name: 1
    }
)
```

The index will be created on the `name` field in ascending order.

We can get all indexes on a collection with:

```json
db.{collection}.getIndexes()
```

## Tools

### Shell

Mongo Shell is a CLI interface for accessing MongoDB. It uses JS-like syntax.

:::tip[Mongosh]
There is a new version of CLI shell called **mongosh**. Currently, it's in the
Beta stage.
:::

```sh
mongosh "mongodb+srv://localhost/MyDatabase" --apiVersion 1 --username "myuser" --password "mypass"
```

#### Commands

```js
db // Shows current DB
show dbs // Shows all DBs with storage size
use somedb // Switches context to some DB

show collections // Shows all collections in the current DB
db.createCollection("newcollection") // Creates a new collection
db.{collection}.drop() // Removes a collection

db.{collection}.insertOne({ "name": "Marcin" }) // Creates a document
db.{collection}.insertOne([{ "name": "Marcin" }, { "name": "Tom" }]) // Creates documents

db.{collection}.find() // Gets all documents in a collection

```

:::tip[Formatting]
When using the older CLI - *mongo* - the output is in one line. To format it for
readability, we can use the `pretty()` function. E.g.,
`db.mycollection.find().pretty()`.
:::

:::caution[Casing]
Casing matters in the commands
:::

### GUI

MongoDB Compass is the official GUI for exploring MongoDB databases. It's
available for Linux, macOS, Windows.

### mongoimport

A tool that is added to MongoDB installations that allows for bulk imports of
data.

### Testing

MongoDB has MongoDB Atlas offering, which is a cloud deploymen of MongoDB.
There's a free tier that is shared, but great for testing. It can be deployed to
Azure/GCP/AWS. For testing, we can also load a Sample Dataset.

### Sources

- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Pluralsight](https://app.pluralsight.com/paths/skill/querying-and-modifying-data-in-mongodb)
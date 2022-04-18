---
title: MongoDB Overview
description: MongoDB NoSQL Database Overview
tags: mongo, mongodb, nosql, document, database, db
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
traditional JSON (different numeric types, raw binary, dates, etc.). 

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

On the "frontend", we talk with MongoDB in JSON. In the backend, MongoDB stored
the documents as BSONs.

## Operations

### Creation

```js
db.{collection}.insertOne()
db.{collection}.insertMany()
```

#### insertOne

```js
db.newusers.insertOne({
    "DisplayName": "Marcin Jahn",
    "UserName": "marcinjahn",
    "Job": {
        "Title": "Technology Evangelist",
        "Area": "IIoT",
        "IsManager": false
    },
    "ProgrammingLanguages": ["C#", "JS", "Rust"]
})
```

Response:

```json
{
  acknowledged: true,
  insertedId: ObjectId("625db707dcaea66b703dd542")
}
```

The `acknowledged: true` part means that the command was acknowledged by the
ReplicaSet. It does not mean that the command was successful.

#### insertMany

```js
db.newusers.insertMany([
    {
        "DisplayName": "Adam Black",
        "UserName": "adamblack",
        "Job": {
            "Title": "Software Developer",
            "Area": "IIoT",
            "IsManager": false
        },
        "ProgrammingLanguages": ["PHP", "Ruby"]
    },
    {
        "DisplayName": "John Smith",
        "UserName": "johnsmith",
        "Job": {
            "Title": "DBA",
            "Area": "IIoT",
            "IsManager": false
        },
        "ProgrammingLanguages": ["T-SQL"]
    }
])
```

Response:

```json
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("625db928dcaea66b703dd543"),
    '1': ObjectId("625db928dcaea66b703dd544")
  }
}
```

By default, all write operations are atomic on the level of a single document.
When we write/modify multiple documents, we keen make the whole operation atomic
by using distributed transactions.

Insert operation will create a collection if it doesn't exist yet.

Every document has an `_id` field. If the provided document doesn't have it,
MongoDB will add it by itself. It must be unique.

## Tools

### Shell

Mongo Shell is a CLI interface for accessing MongoDB. It uses JS-like syntax.

::: tip Mongosh
There is a new version of CLI shell called Mongosh. Currently, it's in the Beta
stage.
:::

```sh
mongosh "mongodb+srv://localhost/MyDatabase" --apiVersion 1 --username "myuser" --password "mypass"
```

#### Commands

```js
db // Shows current DB
show dbs // Shows all DBs with storage size
use somedb // Switch context to some DB

show collections // Shows all collections in the current DB
db.createCollection("newcollection") // Create a new collection

db.{collection}.insertOne({ "name": "Marcin" }) // Create a document
db.{collection}.insertOne([{ "name": "Marcin" }, { "name": "Tom" }]) // Create documents

db.{collection}.find() // Get all documents in a collection

```

::: tip Formatting
When using the older CLI - *mongo* - the output is in one line. To format it for
readability, we can use the `pretty()` function. E.g.,
`db.mycollection.find().pretty()`.
:::

::: warning Casing
Casing matters in the commands
:::

### GUI

MongoDB Compass is the official GUI for exploring MongoDB databases. It's
available for Linux, macOS, Windows.

### Testing

MongoDB has MongoDB Atlas offering, which is a cloud deploymen of MongoDB.
There's a free tier that is shared, but great for testing. It can be deployed to
Azure/GCP/AWS. For testing, we can also load a Sample Dataset.
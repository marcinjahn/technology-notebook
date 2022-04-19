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
- queries use MQL (MongoDB Query Language)

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

### CREATE

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

### READ

The `db.{collection}.find()` operation is used for queries. When invoked without
parameters, it returns all the documents. The optional parameters are:

- `filter`
- `projection`
- `readConcern` (useful for Replica Set)

We can also `skip` and `limit` results.

Some example:

```js
db.movies.find({rating: {$gte: 4}}, {title: 1, _id: 0}).sort({ rating: -1 }).limit(10).readConcern("majority")
```

#### Filter

The [MongoDB
documentation](https://www.mongodb.com/docs/manual/reference/operator/query/)
contains a list of supported operators.

Examples:

```js
{ name: 'Marcin' } // returns all documents with `name` equal to "Marcin". It's a simplified version of `{ name: { $eq: 'Marcin' } }`

{ amount: { $gt: 5 } } // returns all documents where the `amount` field is greater than 5.

{ cast: "John Smith" } // if `cast` is an array, it will return all the documents which contains "John Smith" as one of the array's elements.

{ "name.last": "Smith" } // when looking for a value within an object we can separate fields with a `.`. The key has to be decorated with a `"`.

{ $and: [ {amount: { $gt: 5 }}, { "name.last": "Smith" } ] } // joining multiple conditions with AND.
```

A full example: `db.{collection}.find({name: 'Marcin'})`.

#### Projections

Projections are used to specify the fields to return from the source documents.
It's a bit like a `SELECT` in SQL.

::: tip _id
The `_id` field is always included unless explicitly disabled with `_id: 0`.
:::

Example:

```json
{ title: 1, runtime: 1, "awards.wins": 1 }
```

As a result, 4 fields will be returned per document: `title`, `runtime`,
`award.wins`, `_id` (if they exist in source documents).

#### Read Concern

This parameter allows us to specify the level of consistency and isolation that
are expected. We can either opt for higher consistency or higher availability.
There is a way to specify a global read concern that will be used by default.

Levels:

- **Local** - The query returns data from the instance with no guarantee that the
  data has been written to a majority of the replica set members (i.e. may be
  rolled back). It's the **default**.
- **Available** - Similar to "Local", but it cannot be used with causally
  consistent sessions and transactions. For sharded clusters, it's the fastest
  query.
- **Majority** - returns document that was accepted by the majority of
  replicas
- **Linearizable** - The query returns data that reflects all successful
  majority-acknowledged writes that completed prior to the start of the read
  operation. The query may wait for concurrently executing writes to propagate
  to a majority of replica set members before returning results. This query
  might take more time, it makes sense to specify a timeout.
- **Snapshot** - For use with multi-document projections.

#### Limit

```js
db.{collection}.find().limit(3)
```

#### Sort

We can provide an object with field names that should be sorted.

An example:

```json
{
    title: 1,
    rating: -1
}
```

The `title` field will be sorted in an ascending order, while the `rating` field
will be sorted in a descending order.

#### Timeout

To specify a timeout we can add `maxTimeMS` to our query. An example:

```js
db.movies.find({rating: {$gte: 4}}, {title: 1, _id: 0}).maxTimeMS(1000)
```

#### Agregations

We can get the count of documents satisfying the query by adding `.count()` at
the end of the command.

### UPDATE

Documents in the DB can be updated.

::: warning _id
The `_id` field cannot be updated.
:::

#### Write Concern

Similarly to [Read Concern](#read-concern), we have Write Concern (the `w`
parameter). Levels:

- **0** - no acknowledgment is requested
- **1** - only acknowledgment from the Primary node is needed
- **(n)** - Primary + (n-1) Secondary nodes.
- **"majority"** - majority of nodes should acknowledge

We can also specify a timeout (`wtimeout`) for write concern. It makes sense to
always specify it. A `0` value will be indefinite timeout.

#### Commands

The update commands are:

- `db.{collection}.updateOne()` - some fields are updated
- `db.{collection}.updateMany()`
- `db.{collection}.replaceOne()` - the whole document is replaced

::: tip Atomicity
Atomicity is at the level of a single document.
:::

Examples:

 We can specify the filter for a document to find, and the changes to be made:

```js
db.movies.updateOne(
    { 
        title: { $eq: "The Old Movie" } 
    },
    {
        $set: { "title": "The New Movie", "year": 2000 }
    }
)

// Response:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

Multiple documents can be updated as well:

```js
db.movies.updateMany(
    { 
        year: { $eq: 1994 } 
    },
    {
        $set: { "year": 1996 }
    }
)
```

A document can be completely replaced, meaning that unspecified fields will be
lost. As a result, only the `_id` parameter stays the same, the only other
parameter is `year`.

```js
db.movies.replaceOne(
    { 
        title: { $eq: "Scarface" } 
    },
    {
        $set: { "year": 1234 }
    }
)
```

::: tip updateOne
`updateOne` will work on the first of the documents returned by the supplied
filter.
:::

##### More Options

With the 3rd parameter we can specify some additional options for the update,
for example for it to be an "upsert". If no documents are found to be updated, a
new document will be created with the specified fields. It works with
`updateOne` and `updateMany`.

An example:

```js
db.movies.updateMany(
    { 
        year: { $eq: 1994 } 
    },
    {
        $set: { "year": 2222 }
    },
    {
        upsert: true
    }
)
```

If there were no movies with `year` equal to "1994", no documents will be
updated. However, a single new document will be addded with `{year: 2222}` as
its content.

::: tip $set
If we specify some field that did not exist in the original documented, that
field will be added.
:::

Other options include the `w` for [Write Concern](#write-concern) and `wtimeout`
for the [timeout](#write-concern).

### DELETE

The commands for deletion are:

- `db.{collection}.deleteOne()`
- `db.{collection}.deleteMany()`
- `db.{collection}.remove()` - pretty much the same as the two above, there is a
  special parameter to control whther just one or many document should be
  removed.

Indexes are not dropped implicitly. We need to remove them explicitly if we want
that.

Similarly to [UPDATE](#update), DELETE supports [Write
Concerns](#write-concern).

#### Examples

Deleting a single document:

```js
db.movies.deleteOne({ title: "Scarface" })
```

Deleting multiple documents:

```js
db.movies.deleteMany({ rating: 2 })
```

::: danger Remove all
An empty object passed as a query will remove all the documents in a collection.
:::

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

## Tools

### Shell

Mongo Shell is a CLI interface for accessing MongoDB. It uses JS-like syntax.

::: tip Mongosh
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

### Sources

- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Pluralsight](https://app.pluralsight.com/paths/skill/querying-and-modifying-data-in-mongodb)
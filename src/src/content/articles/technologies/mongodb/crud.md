---
title: CRUD
description: MongoDB CRUD operations
tags: ["mongo", "mongodb", "nosql", "document", "database", "db", "queries", "query", "operations", "crud"]
lang: en-US
---

# Querying

## CREATE

- `db.{collection}.insertOne()`
- `db.{collection}.insertMany()`

::: tip insert
There's also the `insert()` command, but it's deprecated.
:::

### insertOne

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
ReplicaSet. It does not mean that the command was successful. It depends on
the selected [Write Concern](#write-concern).

### insertMany

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
When we write/modify multiple documents, we can make the whole operation atomic
by using distributed transactions.

Insert operation will create a collection if it doesn't exist yet.

We can provide a second parameter `{"ordered": false}` to speed up the
`insertMany`. This way, MongoDB does not have to insert documents in order and
can do it parallelly.

### _id

Every document has an `_id` field. If the provided document doesn't have it,
MongoDB will add it by itself. It must be unique. By default, it's of type
ObjectId (BSON), but we can set it ourselves as any type.

## READ

- `db.{collection}.find()`
- `db.{collection}.findOne()`

::: tip Cursor
`find` returns a cursor object, which exposes a few methods on it (like `sort`,
`count`, `limit`, `skip`, etc.).

`findOne` returns just a single document, without these methods.
:::

These operations is used for queries. When invoked without
parameters, it returns all the documents. The optional parameters are:

- `filter`
- `projection`
- `readConcern` (useful for Replica Set)

We can also `skip` and `limit` results. It's useful for **paging**.

Some example:

```js
db.movies
    .find({rating: {$gte: 4}}, {title: 1, _id: 0})
    .sort({ rating: -1 })
    .limit(10)
    .readConcern("majority")
```

### Filter

The [MongoDB
documentation](https://www.mongodb.com/docs/manual/reference/operator/query/)
contains a list of all the supported operators.

Examples:

```js
// All documents with `name` equal to "Marcin". It's a simplified version of `{ name: { $eq: 'Marcin' } }`
{ name: 'Marcin' } // or { name: { $eq: 'Marcin' } }

// Search for a document with a specific id.
{ _id: ObjectId(2jdf8sdnrbwuru8fsd3wrewfd) }

// All documents where the `amount` field is greater than 5.
{ amount: { $gt: 5 } }

// If `cast` is an array, it will return all the documents which contains "John Smith" as one of the array's elements.
{ cast: "John Smith" }

// When looking for a value within an object we can separate fields with a `.`. The key has to be decorated with a `"`. It can also be used with objects within arrays
{ "name.last": "Smith" }

// Joining multiple conditions with AND.
{ $and: [ {amount: { $gt: 5 }}, { "name.last": "Smith" } ] }

// IN
{ "name": { $in: [ "Mark", "Tom" ] } }
// for arrays, if any value provided in the filter is found in the array, there's a match

// NOT IN
{ "name": { $nin: [ "Mark", "Tom" ] } }
```

A full example: `db.{collection}.find({name: 'Marcin'})`.

::: tip $not vs $ne
`{ amount: { $ne: 5 } }` and `{ amount: { $not: 5 } }` are different. `$not`
will also return documents that do not even have the "amount" field. `$ne` will
only return documents that have this field.
:::

::: tip Regular Expressions
The `$in` operator can be used with regular expressions:

```js
// Cars that start with 'F'
db.cars.find({ model: { $in: [/^F/] } })
```

There's also a `$regex$` filter.
:::

::: tip Conversions
Implicit number conversions may occur in our filters. For example, if a value is
an int, but we pass it as a float, it will still work.
:::

::: tip Arrays and Objects
When comparing objects and arrays we need to provide them in full. The internal
elements have to be provided in the same orded as they were stored in the DB.
:::

::: tip Comments
As part of a filter, we can also include the `$comment` field, which is a string
that explains the filter. These commends end up in the tracing logs.
:::

#### $expr

There is also a way to filter documents based on operations on various fields
within a document. For example, we could return only those documents where the
difference between the values of fields "totalSeats" and "registeredSeats" is
greater than 5:

```json
{
    $expr: {
        $gt: [
            $subtract: ["$totalSeats", "$registeredSeats"],
            NumberDecimal(5)
        ]
    }
}
```

#### Arrays

There are operators to be used with arrays:

- `{$all: [...]}` - matches if an array contains all of the provided elements
  (order doesn't matter) 
- `{$size: n}` - matches if an array contains `n` elements
- `$elemMatch` - multiple conditions to be matched for an array item. It is
  useful when the array item is an object

    Example:

    ```js
    // Document sample:
    {
        "name": "John",
        "skils": [
            { "name": "flying", "lvl": 8 },
            { "name": "driving", "lvl": 4 },
        ]
    }

    //Query:
    db.players.find({ skills: { $elemMatch: { name: "flying", lvl: { $gt: 7 }}}})
    ```

::: warning $eg 
The `$eq` operator can be used as well, but it requires the elements to match
exactly (even order needs to be the same).
:::

#### Special Cases

Here are some special cases for queries;

- NULL values

    ```js
    // returns all documents where the filed is NULL explicitly, and those where it doesn't exist at all
    db.cars.find({ model: null })
    ```

    To find only explicit NULLs, it's better to use `{ $type: "null" }`

- documents where a field doesn't exist

    ```js
    // $exists: true would return also documents where the field is set to NULL explicitly
    db.cars.find({ model: { $exists: false }})
    ```

- query by a specific [BSON
  type]((https://www.mongodb.com/docs/manual/reference/bson-types/))

    ```js
    db.cars.find({ model: { $type: "string" }}) // { $type: 2 } would also work
    ```

    ::: tip NULL
    "null" is also a type.
    :::

### Projections

Projections are used to specify the fields to return from the source documents.
It's a bit like a `SELECT` in SQL.

::: tip _id
The "_id" field is always included unless explicitly disabled with `_id: 0`.
:::

Example:

```json
{ title: 1, runtime: 1, "awards.wins": 1 }
```

As a result, 4 fields will be returned per document: "title", "runtime",
"award.wins", "_id" (if they exist in source documents).

We can also use projections to exlude just the specified fields:

```json
{ title: 0, runtime: 0 }
```

Everything but "title" and "runtime" will be returned.

::: warning No mixing
We can't mix inclusions/exclusions in one query, unless we're excluding "_id"
while including other fields. In other words, if "_id" is not involved we can
use only "1"s or "0"s in a projection.
:::

#### Arrays

Arrays have their own projection operators:

- `$slice` - limits the number of items of an array to be returned

    ```js
    // Max two elements in the 'skills' array will be returned per document
    db.players.find({}, { skills: { $slice: 2 } })
    ```

    There is also another variant which allows to skip `m` elementes and return
    `n` elements (`[m,n]`):

    ```js
    // Return second and third skill only (per document)
    db.players.find({}, { skills: { $slice: [1, 2] } })
    ```

- `$` - a bit similar to `$slice`, but returns first `n` items that match the filter

    ```js
    // Returns only players who can drive, the returned documents will have only "driving"
    // skill present, even if it doesn't come first in the array
    db.players.find( 
        { skills: "driving" }, 
        { "skills.$": 1 })
    ```

- `$elemMatch` - useful for object items in the array. It can further filter the
  documents with specified confitions

    Example:

    ```js
    // Document samples:
    [
        {
            "name": "John",
            "skils": [
                { "name": "flying", "lvl": 8 },
                { "name": "driving", "lvl": 4 },
            ]
        },
        {
            "name": "Mark",
        }
    ]

    //Query:
    db.players.find({}, { skills: { $elemMatch: { lvl: { $gt: 7 }}}})

    // We'll get both documents back:
    [
        {
            "name": "John",
            "skils": [
                { "name": "flying", "lvl": 8 },
            ]
        },
        {
            "name": "Mark",
        }
    ]
    ```

    ::: tip Filter vs Projection
    The filter's `$elemMatch` is different from the projection's `$elemMatch`.
    The first one affects the number of documents being returned. The latter one
    only impacts the content of array field of a document.
    :::

### Read Concern

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

### Limit

```js
db.{collection}.find().limit(3)
```

### Sort

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

An example:

```json
// Get ratins in a descending order
db.movies.find({rating: {$gte: 4}}).sort({ rating: -1 })
```

We can sort by multiple fields. The order of the fields in the sort object
matters.

### Timeout

To specify a timeout we can add `maxTimeMS` to our query. An example:

```js
db.movies.find({rating: {$gte: 4}}, {title: 1, _id: 0}).maxTimeMS(1000)
```

### Agregations

We can get the count of documents satisfying the query by adding
`.count()` at the end of the command.

We can get a count of all the documents in a collection with `countDocuments()`.

### Collation

There is a way to fine tune collation of the query, making sure that the proper
language is used, casing, and many more.

## UPDATE

Documents in the DB can be updated.

::: warning _id
The `_id` field cannot be updated.
:::

### Write Concern

Similarly to [Read Concern](#read-concern), we have Write Concern (the `w`
parameter). Levels:

- **0** - no acknowledgment is requested
- **1** - only acknowledgment from the Primary node is needed
- **(n)** - Primary + (n-1) Secondary nodes.
- **"majority"** - majority of nodes should acknowledge

We can also specify a timeout (`wtimeout`) for write concern. It makes sense to
always specify it. A `0` value will be indefinite timeout.

### Commands

The update commands are:

- `db.{collection}.updateOne()` - some fields are updated
- `db.{collection}.updateMany()`
- `db.{collection}.replaceOne()` - the whole document is replaced

::: tip Atomicity
Atomicity is at the level of a single document.
:::

Examples:

We can specify the filter for a document to find, and the changes to be made:

```js{6}
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

#### More Options

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

Additionally, for upsert, we can specify `$setOnInsert`, which defines default
values for a documented in case it needs to be created.

Other options include:
- `w` for [Write Concern](#write-concern)
- `wtimeout` for the [timeout](#write-concern).
- `arrayFilters`

### Operators

Update may use the following operators:

- `$set` - sets a value of a field
- `$unset` - removes a field

    ```json
    { $unset: { "takenSeats": "" } }
    ```
- `$inc` - increment the field's value

    ```json
    { $inc: { "takenSeats": 1 } }
    ```
    
    If the field doesn't exist, the starting value is assumed to be 0.
    A negative value may be used as well.

- `$mul` - multiplies the field's value

The [MongoDB
Docs](https://www.mongodb.com/docs/manual/reference/operator/update/) contain
the complete list of update operators.

#### Arrays

Arrays have their own update operators:

- `$pop` - removes a single value from an array either from the beginning or the
  end.
- `$pull` - removes multiple elements, that meet some condition, from an array 
- `$push` - adds values to the array. There are modifiers that specify the
  position of elements, or multiple values to be added.

There's also the `arrayFilters` option that specifies elements that should be
updated in an array (e.g., with `$inc`).

## DELETE

The commands for deletion are:

- `db.{collection}.deleteOne()`
- `db.{collection}.deleteMany()`
- `db.{collection}.remove()` - pretty much the same as the two above, there is a
  special parameter to control whether just one or many document should be
  removed.

Indexes are not dropped implicitly. We need to remove them explicitly if we want
that.

Similarly to [UPDATE](#update), DELETE supports [Write
Concerns](#write-concern).

### Examples

Deleting a single document:

```js
db.movies.deleteOne({ title: "Scarface" })
```

Deleting multiple documents:

```js
db.movies.deleteMany({ rating: 2 })
```

::: danger Remove all
`db.{collection}.deleteMany({})` will remove all the documents in a collection.
:::
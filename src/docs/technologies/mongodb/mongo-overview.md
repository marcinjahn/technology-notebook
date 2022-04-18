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

## Deployment

MongoDB has MongoDB Atlas offering, which is a cloud deploymen of MongoDB.
There's a free tier that is shared, but great for testing. It can be deployed to
Azure/GCP/AWS.
---
title: NoSQL Overview
description: NoSQL Databases Overview
tags: mongo, mongodb, nosql, document, database, db
lang: en-US
---

# NoSQL

NoSQL meaning is not that clear, sometimes it's referred as "Not Only SQL".
However, such explanation would make SQL databases NoSQL, which doesn't make
sense (although some people actually think it does). In general, NoSQL databases
are the modern database systems built for the distributed environments. They
often are schema-less allowing to write data without predefining its shape
first.

In general, these types of DBs are considered NoSQL:

- Document DBs (MongoDB)
- Key-Value DBs (Redis)
- Wide-Column DBs (Cassandra)
- Graph DBs (Gremlin)

## Document Databases

In Document DBs (such as MongoDB) it's recommended to keep all related data
together in a document, opposed to having them as separate entites, like in
Relational DBs. Only this way the Document DB can be "faster than SQL". If we
decide to split data into separate documents and try to query them together
(simulating JOINs) we might end up with slower queries than in SQL DBs.

There is no predefined schema of entities. Each document/entity can have a
different schema, it's dynamic.

Most often, documents are JSONs.

## CAP Theorem

- **C** - Consistency - data in all nodes of DB system are consistent, meaning
  that reading data from any of them will result in the same data being
  returned.
- **A** - Availability - the data is always available
- **P** - Partition tolerance - network issues do not bring the system down

In case of a network partition, the system can be either Consistent or
Available, not both. Without a partition, both C and A can be delivered.

::: tip MongoDB
MongoDB is a CP system.
:::

When we choose *Consistency*, in case of some network failure, we might not be
able to read the data, because DB cannot be sure if it would be the latest
version of that data.

When we choose *Availability*, in case of some network failure, we cannot be
sure that the data we're reading is actually the latest version.

### PACELC

An extension to PAC is PACELC.  It states that in case of network partitioning
(**P**) in a distributed computer system, one has to choose between availability
(**A**) and consistency (**C**) (as per the CAP theorem), but else (**E**), even
when the system is running normally in the absence of partitions, one has to
choose between latency (**L**) and consistency (**C**).

## Sources

[Pluralsight](https://app.pluralsight.com/paths/skill/querying-and-modifying-data-in-mongodb)
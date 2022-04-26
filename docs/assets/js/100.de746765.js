(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{567:function(e,t,i){"use strict";i.r(t);var n=i(22),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("h1",{attrs:{id:"table-storage"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#table-storage"}},[e._v("#")]),e._v(" Table Storage")]),e._v(" "),i("h2",{attrs:{id:"characteristics"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#characteristics"}},[e._v("#")]),e._v(" Characteristics")]),e._v(" "),i("ul",[i("li",[e._v("stores NoSQL data (a single table can store entities with varying properties)")]),e._v(" "),i("li",[e._v("lower in cost compard to SQL")]),e._v(" "),i("li",[e._v("stores any number of entities")]),e._v(" "),i("li",[e._v("storage account can have any number of tables")]),e._v(" "),i("li",[e._v("good for structured, non-relational data")]),e._v(" "),i("li",[e._v("supports OData protocol")]),e._v(" "),i("li",[e._v("one entity can be 1MB max (2MB in CosmosDB Table API)")]),e._v(" "),i("li",[e._v("one entity can have max 252 properties (+ 3 system properties: timestamp,\npartition key, row key)")])]),e._v(" "),i("h2",{attrs:{id:"performance"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#performance"}},[e._v("#")]),e._v(" Performance")]),e._v(" "),i("h3",{attrs:{id:"indexing"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#indexing"}},[e._v("#")]),e._v(" Indexing")]),e._v(" "),i("p",[e._v("Entities with the same partition key can be queried more quickly, and\ninserted/updated in atomic operations. An entity's row key is its unique\nidentifier within a partition.")]),e._v(" "),i("p",[e._v("In Storage Account there is only primary index: PartitionKey and RowKey. In\nCosmosDB all properties are indexed and there is no manual index management.")]),e._v(" "),i("p",[e._v("Entities ofthe same PartitionKey can be updated in a single, atomic batch\ntransaction (max 100 operations (4MB)).")]),e._v(" "),i("p",[e._v("There is no limit on number of partitions and their number does not impact\nperformance.")]),e._v(" "),i("p",[e._v("More partitions = better loadbalancing, but also limits the ability to perform\natomic transactions")]),e._v(" "),i("h3",{attrs:{id:"querying"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#querying"}},[e._v("#")]),e._v(" Querying")]),e._v(" "),i("p",[e._v("Types of querying:")]),e._v(" "),i("ul",[i("li",[e._v("A Point Query is the most efficient lookup to use and is recommended to be\nused for high-volume lookups or lookups requiring lowest latency. Such a query\ncan use the indexes to locate an individual entity very efficiently by\nspecifying both the PartitionKey and RowKey values. For example:\n$filter=(PartitionKey eq 'Sales') and (RowKey eq '2')")]),e._v(" "),i("li",[e._v("Second best is a Range Query that uses the PartitionKey and filters on a range\nof RowKey values to return more than one entity. The PartitionKey value\nidentifies a specific partition, and the RowKey values identify a subset of\nthe entities in that partition. For example: $filter=PartitionKey eq 'Sales'\nand RowKey ge 'S' and RowKey lt 'T'")]),e._v(" "),i("li",[e._v("Third best is a Partition Scan that uses the PartitionKey and filters on\nanother non-key property and that may return more than one entity. The\nPartitionKey value identifies a specific partition, and the property values\nselect for a subset of the entities in that partition. For example:\n$filter=PartitionKey eq 'Sales' and LastName eq 'Smith'")]),e._v(" "),i("li",[e._v("A Table Scan does not include the PartitionKey and is very inefficient because\nit searches all of the partitions that make up your table in turn for any\nmatching entities. It will perform a table scan regardless of whether or not\nyour filter uses the RowKey. For example: $filter=LastName eq 'Jones'")]),e._v(" "),i("li",[e._v("Queries that return multiple entities return them sorted in PartitionKey and\nRowKey order. To avoid resorting the entities in the client, choose a RowKey\nthat defines the most common sort order.")])]),e._v(" "),i("p",[e._v("If your client application needs only a limited set of properties from the\nentities in your table, you can use projection to limit the size of the returned\ndata set. As with filtering, projection helps to reduce network load and client\nprocessing.")]),e._v(" "),i("h2",{attrs:{id:"tier"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#tier"}},[e._v("#")]),e._v(" Tier")]),e._v(" "),i("p",[i("strong",[e._v("General-purpose V2")]),e._v(" is the recommended choice. It seems that for "),i("strong",[e._v("Table\nStorage")]),e._v(" the Standard tier is recommended. Premium does not bring anything to\nthe table in this case.")])])}),[],!1,null,null,null);t.default=a.exports}}]);
---
title: Overview
description: What is blockchain
lang: en-US
---

# Overview

Blockchain is a chain of blocks (duh). Each block contains a varying number
of transactions.

A **transaction** contains:

- executed operations
- data of these operations
- sender
- receiver
- transaction fee
- timestamp

Transactions are peer-to-peer. No central entity looks over every transaction
(like a bank). If I want to send money (or another asset), I can send it to them
directly, without any intermediary. Transactions are also trackable and
irreversible.

The chain is immutable, and the blocks are immutable. This is the main strength
of blockchain. Once some transaction is registered, it stays there forever.
Every block contains a has of the previous block (exception from this rule
is the *Genesis* block - first block in the chain).

Blockchain is decentralized - every participant has the full copy of the
blockchain.

Blockchain enables trust in a decentralized system of transacting peer
participants. The purpose of blockchain is to verify and validate (or reject)
transactions and then execute them and record the proof of these actions with
the consensus of the peer participants.

## Decentralised vs Distributed

![](./assets/distributed-decentralized-cetralized.png)

A **decentralised** system is a subset of a **distributed** system. The main
difference comes down to where the decision is made and how the distribution of
the decision is sent across various nodes in the system.

**Decentralised** means that a decision is made across various nodes. Each node
decides its behaviour, which ultimately affects the system’s behaviour. This
ensures that no single node has complete system information. **The decision making
is not restricted to a single node.** The best example of a decentralised system
is Bitcoin and Ethereum. Bitcoin has a decentralised network, where no
government or entity has control over it. Ethereum offers a decentralised
blockchain where anyone can publish dapps that connect users and providers
directly.

In a **distributed** system, all parts of the system are located in different
physical locations. The processing is spread across multiple nodes, but decision
making can be centralised or decentralised. Various nodes can communicate and
coordinate by passing messages. Distributed blockchain systems are more secure
as the system is spread across various nodes. A great example of a distributed
system is AWS or cloud instances. Instead of data being stored in one single
point, it is spread across various points across the server. Even if one node
fails in these networks, it will not affect the entire system. 

## Bitcoin vs Ethereum

Bitcoin is just a currency. Its only application is a wallet. Ethereum (and some
other blockchains) allow using blockchain technology for verification,
validation and recording of transactions of other digital assets. Applications
may be created on top of the Ethereum protocol (**smart contracts**).

All Bitcoin transactions are about sending value. Ethereum transaction embeds a
function implemented by a smart contract.

Ethereum has a few networks. When deploying smart contracts they end up in
one of these networks.

## Accounts

All blockchain participants (including smart contracts) have an account number
that uniquely identifies them. They are 160 bits (40 bytes) long. All accouts
can hold a balance of ethers. Thus, there are two implicit attributes of an
account: a number and a balance.
 
There are two kinds of accounts:

- externally owned accounts (EOA)
- smart contract accounts

They both can invoke smart contract function by sending a message. Such a message
would contain: a sender and a value. The value is added to the balance held
by the smart contract. The smart contract needs to have payable modifier (rule) to
be eligible to receive funds.
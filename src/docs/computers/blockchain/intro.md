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

Transactions are peer-to-peer. There is no central entity that looks over every
transaction (like a bank). They are trackable and irreversible.

The chain is immutable, and the blocks are immutable. This is the main strength
of blockchain. Once some transaction is registered, it stays there forever.
Every block contains a has of the previous block (execption from this rule
is the *Genesis* block - first block in the chain).

Blockchain is decentralized - every participant has the full copy of the
blockchain.

Blockchain enables trust in a decentralized system of transacting peer
participants. The purpose of blockchain is to verify and validate (or reject)
transactions and then execute them and record the proof of these actions with
the consensus of the peer participants.

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
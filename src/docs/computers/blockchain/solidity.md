---
title: Solidity
description: Programming Smart Contracts with the Solidity programming language
lang: en-US
---

# Solidity

One of the languages supported by Ethereum is **Solidity**.

A simple program:

```sol
pragma solidity ^0.6.0;
contract Counter {
    uint value;

    function initialize(uint x) public {
        value = x;
    }

    function get() view public returns (uint) {
        return value;
    }

    function increment(uint n) public {
        value = value + n;
    }

    function decrement(uint n) public {
        value = value - n;
    }
}
```

Some facts:

- `public` keyword makes a function publicly visible; any blockchain participant
  may invoke it
- each function invocation is recorded in a ledger
- any change of `value` is recorded
- `view` functions do not change state, and their execution is not recorded in
  the ledger.

A deployed smart contract is accessible to anyone who has an identity on the
blockchain (human or a program).

## Features

### Data types

- `address` - refers to identity of participants
- `struct` - allows creation of structures of data
- `mapping` - defines a dictionary/map/hashtable

### Modifiers

They are used to guard access to data/functions.

### Payable

A function with the `payable` keyword accepts payments (in `msg.value`).

### Sender

Every function invocation has access to the `msg.sender` field that reveals the
address of the caller.

### Constructor

A contract might have a constructor. It is run during the deployment of the contract
to the blockchain. The deployment is done by some participant of the blockchain.
The deployment may be performed with some ethers attached. These ethers are added
to the contact's funds. It's no different from other functions' execution. These can
also accept funds.

## Remind IDE

It's a web-based IDE for Solidity. It can be found at
[https://remix.ethereum.org/](https://remix.ethereum.org/).
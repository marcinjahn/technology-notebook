---
title: Smart Contracts
description: Smart Contracts in Ethereum blockchain
lang: en-US
---

Smart Contract is an immutable executable code representing a logic of a Dapp.
They contain the state and operations that enforce the verification,
validation and recording rules on the blockchain.
Smart Contract is a brain of a Dapp.

**Dapps** are web or enterprise applications that involve logic to invoke
blockchain functions that implement trust intermediation.

Applications are hosted on **nodes**.

A smart contract is a bit like a class in OOP. It should have clear rules and
data.

A contract consists of:

- a name
- data/state
- rules for invoking functions
- functions that may change the state and generate transactions

Rules are not necessary. It may be allowed for anyone to invoke the functions.

## Programming Languages

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

- `public` keyword makes a function publicly visible, any blockchain participant
  may invoke it
- each function invocation is recorded in a ledger
- any change of `value` is recorded
- `view` functions do not change state and their execution is not recorded in
  the ledger.

A deployed smart contract is accessible to anyone who has an identity on the
blockchain (human or a program).
---
title: Dapps
description: Applications built on top of smart contracts - Dapps
lang: en-US
---

# Dapps

Dapps (decentralized applications) are user-facing apps that invoke Smart
Contracts.

## Tools

### Truffle

Truffle is a CLI tool for developing dapps.

The dapps usually have the following project structure:

- `{app-name}`
  - `{app-name}-contracts` - stores smart contracts
  - `{app-name}-app` - stores the web app

Truffle commands:

- `truffle init` initializes a directory for smart contracts.
- `truffle compile` compiles Solidity files and creates a JSON file that
  represents the *applicaton binary interface (ABI)*. It defines the interface
  that will be used to communicate between a web app and a smart contract.

Each contract needs to be specified in migrations script to be deployed.

- `truffle migrate --reset` - deploys smart contracts. The `--reset` redeploys
  existing contracts and it is a viable option only in developmnent. Production
  smart contracts are immutable.

### Ganache

Ganache is a blockchain running locally for testing. It's useful while developing
dapps or smart contracts. It's similar to what Remix IDE offers in the browser.

### MetaMask

MetaMask is a wallet browser extension that allows to connect to the blockchain from the
browser. It can be used in combination with Ganache for local development.

::: warning Ganache Network ID
For some reason, MetaMask does not want to connect with the defaul Ganache
networkId (5777). Changing Ganache's networkId to 1337 solves the problem.
:::
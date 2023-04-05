---
title: Overiew
description: Overview of TPM versions and basic information about its functionalities
lang: en-US
---


# Overview

## What is TPM?

TPM is a cryptographic coprocessor. It's present in personal PCs and servers. It
enables:

- Identification of devices - a private key embedded in a PC identifies it.
  Use-cases:
  - VPN only allowing client machines that are trusted
- Secure generation of keys
- Secure storage of keys - TPM can encrypt keys with its public key. Such
  encyrpted blobs might be stored on a disk (since TPM has limited storage
  capacity)
- Random number generation
- NVRAM storage - even if disk is wiped, data stays in TPM (certificate store).
  It stores:
  - root public keys for certificate chains - read-only
  - EKs
- Device health attestation

## History

### TPM 1.1b

Functionalities:

- key generation (only RSA)
- storage
- secure authorization
- device-health attestation

It was not standardized too well, different vendors required different drivers.
Additionally dictionary attacks were possible.

### TPM 1.2

Improvements:

- a standard software interface
- a standard package pinout (mostly)
- protection against dictionary attack
- direct anonymous attestation
- a small RAM storage for a certificate (NVRAM)

1.2 did not change programming interfaces, software written with 1.1b continued
to work.

Microsoft developed a Windows driver and IBM developed an open-source Linux
driver.

### TPM 2.0

Redesigned from scratch. It doesn't use SHA-1 hashing algorithm due to its
weakness. The specification is _algorithm agile_ - approved alghoritms may be
added/removed in the future. All the authentication techniques were unified with
a technique called _enhanced authorization_. That allows to establish various
rules regarding when secrets can be read (e.g. you have to identify yourself
with an HMAC key nd you need to use fingerprint reader). TPM 2.0 can do anything
that TPM 1.2 can do.

## Terms

### Seed

A secret that is used to generate other secrets from it. TPM has limited storage
space, but it might be required to have many secrets for different purposes. Key
Derivation Function (KDF) is used to generate those keys based on a seed. HMAC
might be used as a KDF. The seed is used as the HMAC key.

Each hierarchy (three of them) have their own seed (the endorsement primary
seed, the platform primary seed, and the storage primary seed).

### Primary Key

Root keys in the hierarchy. They have no parent. TPM 1.2 has one key analogical
to TPM 2.0's Primary key - **Storage Root Key (SRK)**, it is stored persistently
in TPM. TPM 2.0 permits unlimited number of Primary Keys (and they don't need to
be persistent).

TPM 1.2 could work with just one SRK, because:

- there was just one algorithm and key size (RSA-2048). TPM 2.0 may use many.
- there was just one key hierarchy (storage hierarchy). TPM 2.0 has three, each
  with at least one root.

TPM has limited storage. If we need more primary keys than storage allows, the
primary keys can be recreated when needed. If we supply the same template of the
key (some info about it like algorithm and some unique information) and use the
same seed (there's one per hierarchy) we will get the same key.

## SDKs

There are many ways to access TPM. Some are specific to 1.2 or 2.0, some are
specific to the platform (Windows, Linux). Main types:

- proprietary apps that talk with TPM directly
- PKCS #11 standard - only basic TPM services
- MS CAPI (Windows-only) - only basic TPM services
- TSS (e.g. TrouSerS) - TPM 1.2 only
- TBS (Windows-only) - low-level
- CNG (Windows-only)
- TSS.NET - cross-platform implementation for TPM 2.0

## TPM-supported Operations

TPM is able to run the following cryptographic operations:

- random number generation
- hashing
- HMACing
- RSA
- symmetric keys

Some of these operations expect a handle to a key used during an operation (e.g. HMAC needs a handle to a secret key).

## Resources

- [https://google.github.io/tpm-js/index.html](https://google.github.io/tpm-js/index.html)
- [https://tpm2-software.github.io/external/](https://tpm2-software.github.io/external/)
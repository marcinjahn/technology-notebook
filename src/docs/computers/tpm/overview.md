# Overview

## What is TPM?

TPM is a cryptographic coprocessor. It's present in personal PCs and servers.
It enables:

- Identification of devices - a private key embedded in a PC identifies it. Use-cases:
  - VPN only allowing client machines that are trusted
- Secure generation of keys
- Secure storage of keys - TPM can encrypt keys with its public key. Such encyrpted blobs might be stored on a disk (since TPM has limited storage capacity)
- Random number generation
- NVRAM storage - even if disk is wiped, data stays in TPM (certificate store). It stores:
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

It was not standardized too well, different vendors rquired different drivers.
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
weakness. The specification is *algorithm agile* - approved alghoritms may be
added/removed in the future. All the authentication techniques were unified with
a technique called *enhanced authorization*.
TPM 2.0 can do anything that TPM 1.2 can do.

## Terms

### PCR

A TPM register holding a hash value.
---
title: Cryptography Basics
description: Basic terms used in cryptography
lang: en-US
---

# Cryptography Basics

## Attacks

There are two ways to break cryptography system:

- brute force - protection against it is to have so many password possibilities
  that it'd be infeasible to try to break it. Another way is to limit the amount
  of attacks that may be performed in a period of time
- finding the algorithm weakness

An algorithm is well designed if its security does not depend on keeping the
algorithm itself secret.

## Hash

Examples: MD5 (broken), SHA-1 (broken), SHA-2, SHA-3

:::tip[SHA-2 and SHA-3 variants]
SHA-2/3 comes in different flavours: 224bit, 256bit, 384bit, 512bit.
SHA-2 omits "2" (e.g. SHA-256).
SHA-3 includes "3" (e.g. SHA-3-256)
:::

Hash function turns some data into an irreversible **digest**. It's used mostly
to check if data is correct - if it matches a known hash/digest (data integrity).

:::tip[Infinite inputs]
In reality, the second and third properties of hash functions are not possible
to hold. There are infinite possible inputs to hash functions and a finite
amount of digests (hash result length is fixed).
:::

SHA-256 is a good enough choice, but SHA-3 is recommended.

Hash functions have the following properties:

- pre-image resistance - we can't get back from the result to the initial form
- second pre-image resistance - given some input and output, we'll not find
  another input with the same output
- collision resistance - there are no two different inputs that result in
  the same output.

:::tip
The third property implies the second one. They're quite similar. The difference
is that *second pre-image resistance* requires the input 1 to be fixed.
:::

:::tip[Hashing passwords]
Argon2 hash function is the best choice for hashing passwords.
:::

## MAC

Examples: HMAC, KMAC

Uses hash function together with a private key (known to both the sender and the
receiver). It's mostly used to verify that the received data is correct (when we
create MAC by ourselves, it matches the received MAC) and sent by authorized
entity (it had to know the secret to create a MAC). The received data consists
of raw data and a MAC. The receiver should calculate the MAC from the raw data
and compare it with the received MAC.

MAc can be used for cookies. After login, we can return a cookie containing a
MAC of the login name. Since only the server knows the secret that is used to
produce a MAC, users cannot provide fake MACs.

### HMAC

A way to generate a MAC. It uses a pair of a hashing function and a secret key
to generate a MAC from some message.

Encryption does not guarantee integrity. The receiver of encrypted data does not
know if the received string has not been altered by someone (that someone would
not know the plain text, though). It's a good practice to first encrypt the
plain text and then HMAC it to get a MAC of the encrypted data. A receiver can
check if the encrypted string is correct and then they can decrypt it. Then the
receiver would need to know two secrets - HMAC secret and the encryption key.
Or, a seed might be used.

## Nonce

A number attached to the message. There shouldn't be two messages with the same
nonces. It guards against *replay attacks*.

## Symmetric Encryption

Examples: AES (128, 192, or 256 bits)

The bits in the algorithm name refer to the amount of bits in the key.

AES-128 is commonly used, it provides good enough encryption.

### Authenticated Symmetric Encryption

Ciphers generated with AES may be tempered with, and the result of decryption
might be invalid. That's why we call it *Unauthenticated encryption* - we don't know if the cipher is valid.

Authenticated encryption is used instead to provide some guarantees about
validity of the cipher. AES-GCM and ChaCha20-Poly1305 are used most often.

## Asymmetric Encryption

Examples: Diffie-Hellman (DH), RSA, ECDH (Elliptic Curve DH) (recommended)

Calculating a public key from a private key is simple. The opposite is
computationally infeasible.

Encrypting some data with a private key is called **signing**. Everyone can
decrypt it, but they can be sure that it was encrypted by the owner of the
private key. It helps to establish trust. If we trust the signer, then we can
trust the content of the message that was signed.

Encrypting some data with a public key ensures that only an owner of the private
key will be able to read it.

The size of data to be encrypted cannot be too big (~500 characters). Usually,
the symmetric key gets encrypted with a public key, and then the parties use
that symmetric key to encrypt the actual messages. Additionally, symmetric
encryption/decryption is much faster than asymmetric operations.

### Authenticated Encryption

Similarly to symmetric encryption, we need a way to be sure that we got a public
key of the entity we believe we got it from. If we don't have a way to verify
that then the key exchange is unauthenticated.

Asymmetric communication can be authenticated (one-sided authentication) or
mutually authenticated.

### Digital Signature

Signing a piece of data creates a digital signature. It is similar to the MAC.
Such a signature provides a proof of *authenticity* and *integrity* (like MAC).
Additionally, it:

- allows to verify the signature by anyone. MAC requires the verifier to have
  the private key
- only the trusted sender could generate the signature, because the private key
  was needed. In case of MAC, both the sender and receiver know the secret. The
  receiver cannot prove that the MAC was generated by the sender and not the
  receiver themselves.

Typically, signatures are created based on digests of the original data due to
size limitations in asymmetric encryption. The receiver applies hash to the
plain text data to compare it with the signed hash.

### X.509

X.509 is a format of digital certificates. It includes:

- the public key part of asymmetric pair - that key is being certified
- attributes of that key

The certificate must be signed by a CA (by its private key). CA's public key may
be signed by another CA, which creates a hierarchy - a certificate chain. At the
top, there's a root certificate, which is trusted unconditionally.

TPM does not generate or consume X.509 certificates. It can store them though.
There are some certification processes within TPM:

- TPM vendor and platform manufacturer may provision TPM with **Endorsement
  Keys** (EKs) and corresponding certificates before shipping to the end user.
  the certificates assert respectively that the TPM is produced by the vendor
  and included by the manufacturer in their platform. They are in X.509 format.
- the EKs (and their certs) may be used to certify other keys (if EKs are
  signing). TPM can create certificates (but not in X.509 format, it's too
  complex for TPMs).

## Resources

- Real-World Cryptography by David Wong
- http://jrruethe.github.io/blog/2014/10/25/cryptography-primer/
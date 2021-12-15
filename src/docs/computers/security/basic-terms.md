# Cryptography Basics

## Attacks

There are two ways to break cryptography system:

- brute force - protection against it is to have so many password possibilities
  that it'd be infeasible to try to break it. Another way is to limit amount of
  attacks that may be performed in a period of time
- finding algorith weakness

An algorithm is well designed if its security does not depend on keeping the
algorithm itself secret.

## Hash

Hash function turns some data into an irreversible **digest**. It's used mostly
to check if data is correct, it it matches a known hash/digest (data integrity).

## MAC

Uses hash function together with a private key (known to both the sender and the
receiver). It's mostly used to verify that the received data is correct (when we
create MAC by outselves, it matches the received MAC) and sent by authorized
entity (it had to know the secret to create a MAC). The received data consists
of raw data and a MAC. The receiver should calculate the MAC from the raw data
and compare with the received MAC.

## HMAC

A way to generate a MAC. It uses a pair of a hashing function and a secret key
to generate a MAC from some message.

Encryption does not guarantee integrity. The receiver of encrypted data does not
know if the received string has not been altered by someone (that someone would
not know the plain text though). It's a good practice to first encrypt the plain
text and then HMAC it to get a MAC of the encrypted data. A receiver can check
if the encrypted string is correct and then they can decrypt it. Then the
receiver would need to know two secrets - HMAC secret and the encryption key.
Or, a seed might be used.

## Nonce

A number attached to the message. There shouldn't be two messages with the same
nonces. It guards agains *replay attacks*.

## Asymmetric Encryption

Calculationg a public key from a private key is simple. The opposite is
computationally infeasible.

Encrypting some data with a private key is called **signing**. Everyone can
decrypt it, but they can be sure that it was encrypted by the owner of the
private key.

Encrypting one data with a public key ensures that only an owner of the private
key will be able to read it.

The size of data to be encrypted cannot be too big. Usually the symmetric key
gets encrypted with a public key and then the parties use that symmetric key to
encrypt the actual messages. Additionally, symmetric encryption/decryption is
much faster than asymmetric operations.

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

- TPM vendor and platform manufacturer may provision TPM with **Endorsment
  Keys** (EKs) and corresponding certificates before shipping to the end user.
  the certificates assert respectively that the TPM is produced by the vendor
  and included by the manufacturer in their platform. They are in X.509 format.
- the EKs (and their certs) may be used to certify other keys (if EKs are
  signing). TPM can create certificates (but not in X.509 format, it's too
  complex for TPMs).

## Resources

http://jrruethe.github.io/blog/2014/10/25/cryptography-primer/
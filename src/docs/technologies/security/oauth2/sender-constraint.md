---
title: Sender Constraint
description: Securing access tokens from being used by attackers
lang: en-US
---

# Sender Constraint

In a typical OAuth2 flow, a Client receives an access token from an
Authorization Server, and attaches that access token to every request to a
Resource Server.

This simple mechanism works well if we're sure that there is no chance for an
attacker to steal an access token. However, if such an event occurs, an attacker
can easily get access to the secured Resource Server just by attaching the
stolen access token to their request. The only security in such a scenario is
the fact that access tokens are time-constrained.

There are ways to make access tokens bound to the actual entity that received
the token in the first place.

## MTLS

One way is to use mutual TLS authentication. When retrieving an access token
from an Authorization Server, the communication uses mutual TLS. The token then
contains information about the public key (or hash of it) of the entity that
requested the token in its content.

Then, the Resource Server should also use mutual TLS in order to verify if the
caller's certificate matches the one included in the token.

The information about the caller's public key is included in the `cnf` claim of
the access token.

This solution is not very popular because mutual TLS authentication is not
popular as well.

## DPoP

The idea is a bit similar to MTLS, but without the overhead of mutual TLS.
Before making a request for an access token, the client needs to generate a pair
of public-private keys. When the client requests an access token, it provides an
Authorization Server with a bunch of information encoded in JWT, most
importantly its public key. That JWT is called the **DPoP Proof**. The proof is
signed so that the Authorization Server can verify that the author of the proof
knows the private key. Once again, the access token will contain
a `cnf` claim with the public key of the caller.

Now, whenever we call the Resource Server, we have to include in the request:

- access token
- a new DPoP proof (different than the one sent to the Authorization Server)

::: tip DPoP proof contents
Other than the public key, DPoP also contains the resource being accesses. When
attaching the proof to the call to the Authorization Server, the resource would
be the Authorization Server itself.

When calling the actual Resource Server, the resource would be that. That's why
we have to use different DPoP proofs when calling the Authorization Server and
Resource Server.

Additionally, there should also be a `htu` claim that contains the HTTP method
that we will use when calling the Resource Server.

There are also some other information.
:::

The Resource Server can check whether the `cnf` claim is the public key that
matches the private key that was used to sign the DPoP proof.

::: tip Replay
DPoP does not protect against the "replay attack". If an attacker gets a hold of
Access Token and DPoP proof, they can use these to send requests until the
access token is valid. However, compared to the past, with DPoP the attacker is
able to send only the type of requests that DPoP proof allows (e.g., the same
HTTP method).
:::

## Resources

- [https://auth0.com/blog/id-token-access-token-what-is-the-difference/](https://auth0.com/blog/id-token-access-token-what-is-the-difference/)
- [https://community.auth0.com/t/identity-unlocked-explained-episode-1/49866](https://community.auth0.com/t/identity-unlocked-explained-episode-1/49866)
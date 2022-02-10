---
title: Microsoft Identity
description: Things related to Microsoft Identity, AAD, etc.
tags: azure, identity, auth
lang: en-US
---

# Microsoft Identity

## Access Token vs. ID Token

OAuth2 protocol is used for **authorization** - to allow apps to get access to
users' resources without having the actual users' credentials to these
resources. Instead, the app gets permission to retrieve an access token that
grants access to some resource.

ID Token is similar, but it's used for **authentication**. Another difference is
that the access tokens are to be used by:

- identity providers (that issue them)
- resources (that give access to some data (or not) based on claims in the
  tokens)

The apps that read that data for the users are not supposed to look into the
access tokens (and they are not the *audience*)! However, they are allowed and
expected to read the ID Tokens to learn who the user is. The actual *audience*
of the ID Token is the app that is supposed to display user's name.

::: tip
Microsoft Identity implements OAuth2 and OpenID Connect standards.
:::

Access Token cannot contain permissions for multiple different services. One
access taken can have multiple permissions, but only in scope of a single
resource.

## B2X

### B2B

AAD tenant may invite users that are not part of the organization. Such users
would have *shadow accounts* created for the needs of business cooperation.
Admin of a tenant might manage access of the external users via the shadow
accounts. They may be treated as guest accounts in the organization.

Uing B2B, the app may be a signle-tenancy one. The B2B users are treated as
members of the tenant where they were invited to.

B2B is used for cooperation between businesses when they need to work on a
single project together.

### B2C

Allows to federate other identity providers under a single umbrella of AAD.
Without B2C, all users have to use Microsoft accounts. With B2C the users can
use any OpenId Connect-compliant IdP.

B2C is used to allow access to our product to users from the world, the actual
customers.

## Multi-tenant Apps

AAD apps that are multitenant may be logged-into by users from multiple AAD
tenants. Every tenant gets its own service principal entity for that app.


## App Registration vs. Service Principal

There is a concept of **app registration** (client ID) and **service
principal** (service principal ID).

In single-tenant apps these are basically the same thing. There's one app
registration and one service principal of the app in a single tenant.

In multi-tenant apps the concepts are separate. There is one app registration,
but for every tenant that has users accessing the app, there will be a separate
service principal created.

App Registration is like a template for multiple service principals to be
created based on it.

## App Registrations

### App Roles

App roles allow to create custom roles that the app understands and works with.
These roles can then be assigned to the users of the app. This way we can create
our own RBAC rules for the app, limiting what different users can access.

The roles may be applied to users/apps in the Enterprise Applications panel of
AAD. A set of roles would have been created in the app registration. Each tenant
might assign different sets of people to these roles via their own service
principals (my app in their tenant).

The assigned roles will be available in the access token.

### API Permissions

We can define the allowed set of permissions that the app may ask for. They may
be also consented by the admin of a tenant. With that, individual users of the
app will not be asked for consent.

App may also ask for permissions "dynamically", so the permission does not have
to be defined in *API Permissions* in AAD. In such a case, the user has to
consent the permission to allow the app to get the requested data.
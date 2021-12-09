# TPM Entities

## Permanent Entities

Defined by the TPM specification, can't be created or deleted.

### Persistent Hierarchies

TPM 2.0 has three of them:

- platform
- storage
- endorsement

Each one has a permanent handle. Each has authorizarion value and policy. They
can both change. They may be disabled by the admin of the platform of the admin
of the hierarchy.
They may have associated chains of keys and data.

### Ephemeral Hierarchy

There is a `NULL` hierarchy. It's utilized when the TPM is used as a
cryptographic coprocessor. Authorizarion and policy are always NULL. It's
automatically cleared when TPM goes throught a power cycle.

### Dictionary Attack Lockout Reset

It has both authorizarion and policy. It can be changed by the admin of this
hierarchy. It has no key nor object hierarchy. It may stop users from operating
after some password entry failures (for example for 24h). Admin can reset it.

### PCRs

Platform Configuration Registers. There are a few of them (24 minumum on a PC).
They're accessed by their index. They have authentication valuee and policy
(generally `NULL`). Reading value from a PCR does not require authentication.
Only one bank (a set of PCRs with the same hash algorithm) is mandatory.

### Reserved Handles

May be there or not, depends from the platform specification.

### Password Authorization Session

Used for plaintext password authorization.

### Platform NV Enable

When its handle is clear, access to any NV index in the platform hierarchy is
denied.

## Nonvolatile Indexes

NVRAM Index. There is some nonvolatile storage in TPM. It can be configured by
the user for storage. They aren't considered *Objects* due to having more
attributes than standard object. Reading and writing can be individually
controlled. They can be made into "write once" entities. They have authorization
value and policy. Authorization value can be changed by the owner of the index,
but policy cannot - it's set during creation of the index. When the hierarchy is
cleared, the NVRAM indexes associated with that hierarchy are deleted.

## Objects

It's either a **key** or **data**. It has a public part and perhaps (?) a
private part (asymmetric private key, as symmetric key or encrypted data).

Like NVRAM indexes all objects belong to one of four hierarchies: platform,
storage, endorsementm or NULL. When a hierarchy is cleared all objects in it are
cleared. They have authorization data and policy. A policy can't be changed
after it gets created (like with MV indexes). 

Object commands
can be administrative or user commands. At creation the user decides which of
these commands can be performed with the authorization data and which can be
exclusively done with a policy. Some commands can only be done with a policy no
matter how we set the attributes during creation. 

Most objects are keys. Using keys or other objects requires using a
non-persistent TPM entity - a session.

## Nonpersistent Entities

They don't persist through power cycles. Although they can be saved
(`TOM2_ContextSave`) TPM disallows loading saved content after a power cycle.

There are several classes of them.

## Persistent Entities

They persist power cycles. It's an object that an owner of a hierarchy has asked
to remain resident in the TPM through power cycles. The owner of the hierarchy
where it belongs can evict it. TPM has limited amount of persistent memory.

# Hierarchies

It's a collection of entities that are related and managed as a group. Those
entities include permanent objects (the hierarchy handles), primary objects at
the root of a tree, and other objects such as keys in the tree. NV indexes
belong to a hierarchy but aren’t in a tree. Entities, other than permanent
entities, can be erased as a group.

The cryptographic root of each hierarchy is a seed: a large random number that
the TPM generates and never exposes outside its secure boundary. The TPM uses
the seed to create primary objects such as storage root keys. Those keys form
the parent at the top of a hierarchy and are used to encrypt its children.

A hierarchy can be persistent (retained through a reboot) or volatile (erased at
reboot). Each hierarchy is targeted at specific use cases: for the platform
manufacturer, for the user, for privacy-sensitive applications, and for
ephemeral requirements.

TPM 1.2 has one hierarchy. TPM 2.0 has three.

## Platform Hierarchy

It's used under the control of the platform manufacturer.

## Storage Hierarchy

It's used by the platform owner (IT department or the end user). It has owner policy and an authorization value, both persist through reboots. They are rarely changed.

It's intended fo non-privacy-sensitive operations.
It can be turned off.

## Endorsement Hierarchy

It's privacy-sensitive.
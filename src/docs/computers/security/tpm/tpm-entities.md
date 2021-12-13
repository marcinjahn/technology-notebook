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

Fixed-size **Platform Configuration Registers**. There are a few of them (24
minumum on a PC). They're accessed by their index. They have authentication
value and policy (generally `NULL`). Reading value from a PCR does not require
authentication. Only one bank (a set of PCRs with the same hash algorithm) is
mandatory.

We can create keys in TPM and specify that they can only be read if PCR is in a
given state (_sealing_), or in a state approved by some authority (new in 2.0).
For example, an organization could issue an update of BIOS to company's PCs. New
version of BIOS will change values in PCRs. However, the organization knows
which values these will be and it can provide new signatures.

They support only **Read** and **Extend** operations. They store system state.

PCRs are extended as follows:

1. PCR <- 0
2. PCR <- Hash(PCR || M)
3. ...

PCR starts with value 0. Then it gets extended by a hash of current PCR
concatenated with a [digest](../basic-terms.md#hash) M. It's called a
**folding-hash**.

Since the result is deterministic if we always supply the same "M" (measurement)
values in the same sequence, it can be used to verify if the sequence is as
expected.

::: warning Reading PCRs
The result of `TPM2_CC_PCR_Read` cannot be trusted. It returns PCR values, but
with no security guarantees. An attacker can MITM your communication with the
TPM, and forge arbitrary `TPM2_CC_PCR_Read` responses.

The correct way to read PCR values is through quotes. A quote is a signed
statement from the TPM, attesting to its internal state. Use `TPM2_CC_Quote` to
read fresh PCR values. We can use AIK to sign the PCR quote.
:::

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
private part (asymmetric private key, a symmetric key or encrypted data).

Like NVRAM indexes all objects belong to one of four hierarchies: platform,
storage, endorsement or NULL. When a hierarchy is cleared all objects in it are
cleared. They have authorization data and policy. A policy can't be changed
after it gets created (like with NV indexes). 

**Object commands** can be administrative or user commands. At creation the user
decides which of these commands can be performed with the authorization data and
which can be exclusively done with a policy. Some commands can only be done with
a policy no matter how we set the attributes during creation. 

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

TPM 1.2 has one hierarchy. TPM 2.0 has four.

## Endorsement Hierarchy

It's reserved for objects created and certified by the TPM manufacturer. The
endorsement seed (`eseed`) is randomly generated at manufacturing time and never
changes during the lifetime of the device. The primary endorsement key is
certified by the TPM manufacturer, and because its seed never changes, it can be
used to identify the device. Since there's only one TPM device per machine, the
primary endorsement key can also be used as the machine's identity. It's
privacy-sensitive. 

## Platform Hierarchy

The platform hierarchy is reserved for objects created and certified by the OEM
that builds the host platform. The platform seed (pseed) is randomly generated
at manufacturing time, but can be changed by the OEM by calling
`TPM2_CC_ChangePPS`.

## Storage Hierarchy

It's used by the platform owner (IT department or the end user). It has owner
policy and an authorization value, both persist through reboots. They are rarely
changed. When a user takes ownership, for example, when the IT department
provisions a new host on the network, the owner hierarchy is reset. This is done
by calling `TPM2_CC_Clear`. In this critical setup step, two user keys should be
provisioned and certified by the owner: these form the root of trust for all the
keys generated on the owner hierarchy.

It's intended fo non-privacy-sensitive operations.
It can be turned off.

## Null Hierarchy

The null hierarchy is reserved for ephemeral keys. The null seed is re-generated
each time the host reboots.
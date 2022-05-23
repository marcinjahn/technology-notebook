---
title: Domain-Driven Design
description: Architecture for building applications - Domain-Driven Design (DDD)
lang: en-US
tags: .net, dotnet, asp.net, asp, core, architecture, ddd, domain driven design
---

# {{ $frontmatter.title }}

The Domain-Driven Design (DDD) is an architecture style for building
microservices-based software systems. Some argue that microservices architecture
is true only with DDD.

The main goal of DDD is to make software more maintainable, to make it less
complex to deal with.

## Bounded Context

As part of DDD, we identify **Subdomains** that take part in our system.
Subdomain is a subset of some larger **Domain**. The terms are rather fuzzy.
Every subdomain is some domain itself after all. Domains and subdomains are a
hierarchical concept.

When we design DDD-compliant system, the domain is the general problem we're
trying to solve, let's say "Monitoring of IoT Platform Instances". This great
domain may be splitted into smaller concerns - subdomains:

- users management
- platforms management
- notifications
- etc.

A **Bounded Context** represents a linguistic boundary within or across
subdomains. Often, a Bounded Context is aligned with a Subdomain. The difference
between these two concepts is as follows:

- a **Subdomain** is in the *Problem Space*.
- a **Bounded Context** is in the *Solution Space*.

So, a given bounded context is a proposed solution to a problem within some
subdomain.

In a typical project, there will be many bounded contexts. Ideally, each of them
should be developed by a different team. Each would also use a separate data
store.

### Bounded Context vs Microservice

There isn't a 1:1 relation between a bounded context and a microservice. A
single bounded context could be served by multiple microservices. For example,
one microservice could be in a form of an HTTP API, serving requests. Another
microservice could be a listener on some bus. Both could work on the same
database, but they'd work on a different parts of the overall responsibility of
the bounded context.

### Ubiquitous Language

One of the pillars of DDD is the establishment of the **Ubiquitous Language** -
an agreed vocabulary that will be used to describe various entities in the
Bounded Contexts. It should be used everywhere in the project: code, diagrams,
discussions, etc.

Every context will have its own ubiquitous language.

#### Context Maps

The namings in different Bounded Contexts and their relations is what defines
**Context Maps**. It could be that different Bounded Contexts use the same name
for different entities. It could also happen that different bounded context
would model the same entity (like a Customer in Appointment Scheduler context
and Customer in the Billing context).

A Context Map clearly shows what a given entity is represented by in another
context.

### Synchronization

Different bounded context may model data for the same physical entity. For
example, Patient Management context and scheduling context may contain the
Patient entity. Probably, the one in the Patient Management context will be more
detailed. Also, probably that one will allow for various modifications. E.g., we
could change the patient's name. The other contexts that model the Patient
should be notified about this change. E.g., it could be done via some message
bus. The Patient Management service would publish a message about the change,
and all other interested services would be listeners.

## Domain Model

Designing our domain model is crucial. According to Eric Evans:

> The domain is the heart of business software.

In our modeling, we should focus on the behaviours of the models. To find such
behaviours, we need to look at all the possible events that may occur in the
system - those events are basically the use-cases that the solution is expected
to fulfill. Some examples of these events could be (in medical clinic system):

- add a new patient
- schedule a visit
- move a visit to another date

### Rich Domain Models

DDD encourages the use of **Rich Domain Models**, opposed to the **Anemic Domain
Models**. Anemic models are simply classes that are DTOs, or classes with very
little logic inside of them.

Often in our programs we have DTO classes and other service classes that act on
these DTOs, potentially modifying them. This is an anti-pattern in the DDD
world. Martin Fowler argues that this is even an anti-pattern in the OOP sense,
since OOP is supposed to merge data and behaviour together.

### Entities

These are objects defined by their identity. That means that every instance of
an Entity is unique, it has its own key. identifier. Examples of entities:

- Patient
- Doctor
- Room
- Appointment

An entity should always be in the valid state. Hence any modification of an
entity (or its creation) should contain various guard clauses that make sure the
operation can be done. For example, before I rename a Patient, I should make
sure that the new name is not empty.

Entities also contain *Events*. These may be used to inform other parts of the
system of changes.

## Shared Kernel

In DDD, a **Shared Kernel** is code that is used between different bounded
context. It's basically a kind of project that .NET developers often call
*Common*. The shared part should be as stable as possible. Changes in that code
will affect a lot of places.

## Sources

- [Domain-Driven Design Fundamentals
  (Pluralsight)](https://app.pluralsight.com/library/courses/fundamentals-domain-driven-design)
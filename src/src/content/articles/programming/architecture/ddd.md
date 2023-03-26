---
title: Domain-Driven Design
description: Architecture for building applications - Domain-Driven Design (DDD)
lang: en-US
tags: [".net", "dotnet", "asp.net", "asp", "core", "architecture", "ddd", "domain driven design"]
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
would model the same entity differently (like a Customer in Appointment
Scheduler context and Customer in the Billing context).

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

Another point is that models evolve over time. Our initial assumptions can be
often invalidated as we progress in understanding the domain.

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

### Value Objects

Identity of **Value Objects** is based on composition of its values. They're
immutable. Value objects may contain methods (without side-effects).

Value Objects are basically non-identified types that are specific to our
sub-domain. They group together some related data. Examples include:

- money
- date range

An instance of a value object does not represent any unique entity, it's just a
set of information representing something in our domain.

It's recommended to first consider Value Object when deciding whether to use
[Entity](#entities) or Value Object for a given thing.

::: tip Identifiers
In some projects identifiers of Entities are value objects. These are custom
types that contain just an identifier (for example as a `Guid`). So, we could
have a type called `CustomerIdValueObject`. Some argue that it makes the
solution more explicit, but I don't really agree with that. I think it
complicates things more than necessary.

```csharp
// Supposedly, these types help to not pass arguments in the wrong order
public void CreateAppointment(ClientId clientId, DoctorId doctorId);
```
:::

Date types are a great example of value objects.

::: tip
It is OK for Value Objects to reference Entities!

A quote from Eric Evans:

> VALUE OBJECTS can even reference ENTITIES. For example, if I ask an online map
> service for a scenic driving route from San Francisco to Los Angeles, it might
> derive a Route object linking L.A. and San Francisco via the Pacific Coast
> Highway. That Route object would be a VALUE, even though the three objects it
> references (two cities and a highway) are all ENTITIES.
:::

### Domain Services

Logic/behaviour that doesn't fit into Entities or Value Objects goes into
separate classes called **Domain Services**. Such services often deal with
different kinds of entities/value objects. For example, they could orchestrate
some workflow.

Also infrastructure-level logic, like logging, sending notifications, etc. is
considered to be in the Doman Services area.

Before creating a service, we should make sure that the logic we're adding
doesn't fit into any of the existing domain elements (entities/value objects).

::: warning
Overuse of domain services might lead to anemic models.
:::

### Aggregates

When building our Entities we will often end up with **Aggregate** entities,
that is, entities that are linked with other entities or value objects. 

Citing [Martin Fowler](https://martinfowler.com/bliki/DDD_Aggregate.html):

> A DDD aggregate is a cluster of domain objects that can be treated as a single
> unit. An example may be an order and its line-items, these will be separate
> objects, but it's useful to treat the order (together with its line items) as
> a single aggregate.

::: tip
One Entity should only belong to one Aggregate. One Value Object can belong to
many Aggregates.
:::

::: warning
Just the fact that one entity refers to another (via some property) does not
mean that they are a part of the same Aggregate! It could be that some entity
belonging to one Aggregate refers to some other entity that is an Aggregate Root
of another Aggregate.

An example of that could be the Snack Machine scenario from [Domain-Driven
Design in Practice
(Pluralsight)](https://app.pluralsight.com/library/courses/domain-driven-design-in-practice).
We had there: *Snack Machine* -> *Slots* -> *Snacks*.

*Snack Machine* and *Slot* belonged to one Aggregate (since a *Slot* cannot exist
without a *Snack Machine*). A *Snack* was a separate Aggregate.
:::

#### Aggregate Root

There will also be an **Aggreagate Root** - an entry point of an aggregate that
"defines" the aggregate as a whole. To find out what is an aggregate root, we
need to look at individual components and think if the removal of a given
component would result in removal of its contained components (cascading
delete). If it would, that's probably an Aggregate Root.

Aggregate Root is like a central entity that defines it completely. It should
allow us to keep the whole object in a valid state (enforcing invariants). We
should access/modify the aggregate only throught the Aggregate Root. The root
will make sure that the invariants are satisfied.

::: tip 
There will also be entities that do not include other entities or value objects.
The convention is to call these Aggregates as well.
:::

A single bounded context or domain may contain a few Aggregate Roots.

### Associations

DDD encourages one-way relations between entities. It's popular in Entity
Framework to define navigation properties in both ways. It turns out it's not
always needed. It makes entities more complex. By default, we should start our
modeling with uni-directional relationships and switch to bi-directional ones
only when necessary.

It still is OK to keep an identifier of the other entity (like a foreign key) in
the "child" entity.

::: warning
One aggregate should only reference external entities that are aggregate roots.
For example, if a *Customer* has some *Address*, other aggregates (e.g.,
*Order*) should not reference the *Address* directly. Instead, they should get
that address through a *Customer*.

Aggregate Roots define the complete entity. We should not link some other
aggregate to a part of an aggregate.

However, it's OK to link to some other non-root entity by the FK.
:::

When thinking to associate two aggregates, it's worth to remember what defines
an Aggregate Root:

> We need to look at individual components and think if the removal of a given
component would result in removal of its contained components. If it would,
that's probably an Aggregate Root.

If removal of our root should not result in the removal of linked aggregates,
possibly we don't need to include these children as "Navigation Properties".
Instead, maybe just an ID of that other entitiy is enough.

An example is an aggregate called *Appointment*. It would contain references to:

- Patient
- Doctor

However, since removing an Appointment should not remove Patient and Doctor, it
makes sense to reference these just by ID, not by Navigation Properites.

## Shared Kernel

In DDD, a **Shared Kernel** is code that is used between different bounded
context. It's basically a kind of project that .NET developers often call
*Common*. The shared part should be as stable as possible. Changes in that code
will affect a lot of places.

## Repositories

Repository pattern is a well-known approach and it is also used outside of DDD.
DDD-specific fact is that only the Aggregate Roots should have their
repositories. Other aggregates should be accessed via their aggregate roots.

A few tips:

- there should be some common `IRepository<T>` interface implementated by all
  the repositories
- if some kind of repository (like `PatientsRepository`) has special needs, it's
  OK to add some special methods to just that repository (or rather its
  interface `IPatientsRepository`). An example of such a method could be
  `GetPatientsOfDoctorWithId(Guid doctorId)`.
- we could have separate repositories for querying and commanding, following CQRS.

### Specifications

The second point from the list above might turn some repositories into huge
classes. The solution for that is to turn these specific use-cases into
so-called **Specifications**. These are classes that provide predicates for
different use-cases. Then, our repositories would have a way to provide a
specification to it.

```csharp
public interface IRepository<T>
{
  public T GetBySpec(Specification spec);
}
```

It is similar to the Strategy pattern. It also provides separation of concerns
since the repository code can stay relatively clean and simple, while specific
use-cases will be handled by their own classes.

It will work well with Entity Framework or ORMs in general. Other data access
methods would requie Specifications that are aware of the persistance layer
query language, I believe.

## Events

There are two kinds of events:

- in-domain - Domain Events (in-process)
- across domains/bounded contexts - Integration Events

### Domain Events

Domain Events are raised when something happens in the domain that could be of
interest to the other pieces of our application (but in the same process!).
They should be describable in the Ubiquitous Language and their names should
correspond to that. The naming should be in the past tense, since the events
will always inform about something that has already happened. Some examples:

- Client Registered
- Appointment Scheduled

::: tip YAGNI
Create events only when there is some use case for it. Don't create them "just
in case".
:::

In code, each event is a separate class. It should iunclude the set of
information that might be interesting for a given event. The information should
be initailized via constructor and be immutable.

#### Creting Events

Each entity that is capable of emitting events would have `Events` property.

```csharp
public class Appointment : Entity
{
  public IList<IDomainEvent> Events { get; set; } = new List<INotification>();
}
```

#### Dispatching Events

The events could be dispatched in the **Repository**, right after the entities
emitting the events are saved. The generic repository base class is a good place
to handle that.

::: tip MediatR
MediatR could be used to dispatch and handle events.
:::

Events may have multiple handlers. Normally, the order of their execution should
not matter.

### Integration Events

These events are the way to share information that something happens across
domains or applications. They often include more information than the Domain
Events since the receiver of the event might not be able to get these
information on its own. For example, instead of just sharing the ID of some
changed entity, we would also share some more defining properties, like a Name.
It could also happen that the event handler would have to get back to the source
service to ask for more details. We don't really want that, especially if
there'll be a lot of events, or a lot of handlers.

::: tip Domain and Integration Events
We could have cases where some event has both Domain and Integration Events
defined. The entity would publish a Domain Event and one of the handlers would
publish an Integration Event, knowing that there might be some handlers
interested in this event outside of the domain or app.
:::

Integration Events often use some kind of message bus, like Azure Service Bus.

## Anti-Corruption Layer

It often happens that we have to integrate with systems that are outside of our
control. Such systems will most likely use a different modeling than ours. In
such cases, **Anti-Corruption Layers** help us to create a kind of mapper
between our domains and the other systems. Such layers are basically like
Adapters.

It could also work the other way round. We could have a "legacy" system that we
want to update to integrate with a "well-designed" DDD project. In order not to
introduce the new concepts into legacy codebase, we could create an ACL layer
(like some set of services) that will communicate with our DDD system properly
and return the data as the legacy system expects.

![](./assets/acl-legacy-to-ddd.png)

## Sources

- [DDD on Pluralsight](https://app.pluralsight.com/paths/skill/domain-driven-design)
  - [Domain-Driven Design Fundamentals](https://app.pluralsight.com/library/courses/fundamentals-domain-driven-design)
  - [Domain-Driven Design in
    Practice](https://app.pluralsight.com/library/courses/domain-driven-design-in-practice)
  - [Refactoring from Anemic Domain Model Towards a Rich
    One](https://app.pluralsight.com/library/courses/refactoring-anemic-domain-model)
  - [Domain-Driven Design: Working with Legacy
    Projects](https://app.pluralsight.com/library/courses/domain-driven-design-legacy-projects/table-of-contents)
- [Code
  Project](https://www.codeproject.com/Articles/1020932/Domain-Driven-Design-Reflecting-Business-in-the-Do)
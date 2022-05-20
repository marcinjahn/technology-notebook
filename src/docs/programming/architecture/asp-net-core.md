---
title: ASP.NET Core Projects
description: Architecture tips for ASP.NET Core apps
lang: en-US
tags: .net, dotnet, asp.net, asp, core, architecture
---

# {{ $frontmatter.title }}

## Projects Organization

Our code could be split into the following projects:

- **Domain** - domain model
- **Infrastructure** - dependencies like OS
- **Persistence** - database (e.g., repositories)
- **Application** - business cases/business logic
- **Presentation** - controllers/pages
- **Common** - cross-cutting concerns

![](./assets/domain-focued-arch.png)

The interfaces for various things like database accessshould be stored in the
Application layer. The Persistence/Infrastructure should depend on Application
and contain implementations of the interfaces. It makes sense, because the
database is the dependency of our Application. It's the Application that
contains the use-cases for our solution. Hence, it makes sense to define our
requirements (interfaces) in the Application layer. We fulfill these
requirements in Persistence/Infrastructure.

## Use-Cases

Our Application layer should mostly consist of use-cases that should be
available to the users via Presentation layer. These use-cases are basically the
business logic. We could have:

- queries
- commands

This falls a bit into the CQRS topic, but I rather want to focus on the fact
that both Commands and Queries are classes for specific use-cases. Within them
we'd use the dependencies (like a database) to do the actual work.

## Sources

- [Clean Architecture: Patterns, Practices, and Principles
  (Pluralsight)](https://app.pluralsight.com/library/courses/clean-architecture-patterns-practices-principles)
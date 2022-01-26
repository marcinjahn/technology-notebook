---
title: Puff
description: A CLI tool that manages configuration files of dev projects
lang: en-US
---

# Puff

Puff is a CLI tool that solves the issue of storing app configuration files in
various directories (typically, they live in various code projects' folders)
making it difficult to move these files to another dev machine. Such
configuration files are often excluded from version control systems due to
secrets that they may contain. Puff manages those files and stores them in one
common location. Your apps ccess the configuration files via symlinks that puff
creates.

For the .NET developers, these could be `appsettings.json` files. For the NodeJS
developers, these could be `.env` files. Often such files contain secrets that you
want to keep to yourself.

Puff is "noninvasive", meaning that your apps do not have to be adjusted to work
with configuration files managed by puff. The configuration files are just
replaced with symlinks (to a location managed by puff).

The tool is the most useful for those who are moving from one machine to another
and want to keep their app configs with them.

Puff is a bit similar to what [dotnet Secret
Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-6.0&tabs=windows#secret-manager)
offers. However, the only similarity is the implementation of a general idea of
keeping secrets out of the app's directory. The way how puff works is totally
different from what dotnet Secret Manager does (also, puff is not dotnet-only,
it can be used with any project).

## Links

- Code repository: [GitHub](https://github.com/marcinjahn/puff)
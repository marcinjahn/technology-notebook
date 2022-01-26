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
common location making it easy to transfer these files between dev machines
(potentially using a private version control repository that could store all these
config files).

For the .NET developers, these could be `appsettings.json` files. For the NodeJS
developers, these could be `.env` files. Often such files contain secrets that you
want to keep to yourself.

The tool is the most useful for those who work on more than one computer with the 
same projects. It's also helpful if you like to change your operating system often.

## Links

- Code repository: [GitHub](https://github.com/marcinjahn/puff)
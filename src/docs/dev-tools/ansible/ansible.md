---
title: Ansible
description: Information about RedHat Ansible
tags: ansible
lang: en-US
---

# Ansible

## Overview

It is used for automation of configuration processes. You inform Ansible what is
the DESIRED state and Ansible will try to achieve it, no matter what the CURRENT
state is. Example: you want to have a file in a spcified location with a
specified content. There ar ea few possible starting points:

- the file does not exist - Ansible will create it
- the file exist, but has a different content - Ansible will update the file
- the file exists and has the right contnet - Ansible will do nothing

## Manual -> Automation

Evolution of automation:

1. Manual setup
2. Writing scripts (.sh, .ps, etc.)
3. Using Ansible ad-hoc
4. Writing Ansible playbooks

Difference between scripting and Ansible is that in a script we need to say
exactly what to do and cover various cases. Ansible takes care of these
difficulties. We just say what we want to have in the end and not how to do
that.

## Modules

Ansible relies on modules. There are many of them for various operations (like
for file operations, macOS setup, specific device setup, etc.).

Most modules are idempotent, some are not.

Every module can have some return values (i.e. a `file` module returns SHA
checksum of the file afer modifications, owner of the file and other things).

## Documentation

`ansible-doc` command is useful, i.e. `ansible-doc copy` gives information about
`copy` module.

## Ad-hoc commands

`ansible` command allows to run one chosen module with specified inputs.

`--dry-run` allows to see what the result would be without doing any actual
changes.

## Playbooks

Playbooks are defined in YAML files and contain tasks that should be done.

Example:

```yaml
---
- name: Ensure ~/.gitconfig copied from master.gitconfig
  hosts: localhost
  tasks:
  - copy: src="../master.gitconfig" dest="~/.gitconfig"
```

We can have many "plays" in the same file:

```yaml
---
- name: Ensure ~/.gitconfig copied from master.gitconfig
  hosts: localhost
  tasks:
  - copy: src="../master.gitconfig" dest="~/.gitconfig"
  
- name: Ensure homebrw packages are installed
  hosts: localhost
  tasks:
  - homebrew: name=bat state=latest
  - homebrew:
      name: jq
      state: latest
```

### Tasks

The task's parameters can be defined in multiple ways, like the two homebrew
tasks above.

Plays can have tags, which allow to limit the plays that we want to execute from
a given file (`tags`).

A task can have a condition (`when`), i.e.: `when: ansible_os_family ==
'RedHat'` will run the task only if the host's OS is in the Red Hat family.

Task can have a `name`.

Task can `ignore_errors: yes` to not stop the play if it fails.

Tasks can store their outputs in variables with `register: my-variable` There is
a task that prints these variabes, it's called `debug`. i.e.: `debug:
var=my-variable`. Outputs are in JOSN format and we are able to `debug` a
specific subset of it (`my-variable.some-parameter` ).

### Command to run a playbook

```bash
ansible-playbook my-playbook.yml
```

`-v` flag shows more info. It can be added multiple times to increase verbosity
level.

## Multiple hosts

Although Ansible can work just with localhost, it is also suitable to configure
multiple hosts. They are referred to as **INVENTORY**.

Inventory can be defined as a set of files in a chosen directory. They can be
grouped under various labels. This helps us to target subsets of our inventory.
"all" group is the top level group, contains all of the hosts.

We can use both ad-hoc commnands and playbooks agains inventory. Example of an
ad-hoc command:

```bash
ansible -m command -a "git config --global --list" docker-containers
```

In the case above, I'd run the command agains hosts that are in the
"docker-containers" group (docker containers can be hosts!).

`ansible-inventory` command manages inventory.

`--list` shows all hosts in our inventory.

### Connections

We can use various connection types to reach hosts. For example, we could use
the `local` connection to create some docker containers on our localhost (with
the `docker_container` module) and then, use the `docker` connection to do
something on these containers.

### ansible-pull

Noramlly, there is a central Manager Node that runs the playbooks on the hosts
(push model). Ansible can also work in a different fashion. Each host can use
`ansible-pull` which connects to some VCS, pulls playbooks and runs them on the
host.

## Ansible Galaxy

Galaxy enables community to share **ROLES** and **COLLECTIONS** (kind of Roles
V2). These are constructs that sit between a module and a playbook.

Galaxy is like a package source for Ansible (same as .NET and NuGet or Node.JS
and npm)
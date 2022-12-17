---
title: SELinux
description: Overview of SELinux (Security-Enhanced Linux) kernel module that provides access control mechanisms for Linux-based operating systems
tags: linux, selinux, mac, permissions, control
lang: en-US
---

# SELinux

SELinux is an implementation of a MAC (Mandatory Access Control) mechanism. It
extends the default DAC (Discretionary Access Control).

SELinux, fundamentally answers questions in a form

> May {subject} do {action} to {object}?

SELinux disallows access by default. Access will be granted only if it was
explicitly allowed. SELinux intercepts system calls and invokes configured
policies to answer the question as it was defined above.

## Modes

`sestatus` command displays an overview of SELinux state.

SELinux can be in one of the modes:

- disabled - SELinux is not enabled
- enforcing - SELinux is enabled and actively allows/disallows access
- permissive - SELinux is enabled, but allows all access. If some access is
  declined by policies, it will be logged, but access will still be granted.
  It's good for troubleshooting.

::: tip Types
We can also mark some [types](#types) to use permissive mode, while the rest
of the system will stick with the enforcing mode.
:::

## DAC vs MAC

DAC specifies access for users, group, and others for each file using READ,
WRITE, EXECUTE flags (`rwxrwxrwx`). It's too simple for more complex scenarios.
Additionally, it allows a single user to modify access control rules of their
files however they want. It might not be desired from the administration
perspective. 

SELinux uses contexts/labels and policies that act on them to define access
rules for apps/users. An app cannot change its label (unless it has special
permission to do so). This is why SELinux is called a **mandatory** access
control system.

DAC and MAC are used together in modern Linux distributions. First, DAC is
checked. If it allows access, MAC goes next. However, if DAC disallows access to
some resource, MAC is not being used, and the user/process is denied access
upfront.

## Labels

In SELinux, every entity (application, user, file) has its own set of metadata -
a **label** (just one!). A label defines a security context. SELinux contexts
have the following fields: 

- **user** - ends with `_u`, e.g. "unconfined_u"
- **role** - ends with `_r`, e.g. "user_r"
- **type** - ends with `_t`, e.g. "httpd_t"
- **sensitivity**:
    - **security level** - s0 up to s16 (optional)
    - **category set** - cx - many categories can be applied on a resource

The "ends with..." part above is just a convention. SELinux does not require
such naming convention to be applied.

::: tip ls
We can see labels on files with the `-Z` flag of `ls`. Here's an example of an
output of `ls -laZ` in `$HOME`:

```sh
❯ ls -laZ
total 64
drwx------. 1 mnj  mnj  unconfined_u:object_r:user_home_dir_t:s0   780 Dec 17 10:58 .
drwxr-xr-x. 1 root root system_u:object_r:home_root_t:s0             6 Dec 15 15:30 ..
drwxr-xr-x. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0       216 Dec 15 18:16 .antidote
drwxr-xr-x. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0       414 Dec 15 19:02 Applications
-rw-------. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0     10810 Dec 15 19:27 .bash_history
-rw-r--r--. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0        18 Sep 27 16:25 .bash_logout
-rw-r--r--. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0       141 Sep 27 16:25 .bash_profile
-rw-r--r--. 1 mnj  mnj  unconfined_u:object_r:user_home_t:s0       689 Dec 15 19:33 .bashrc
drwx------. 1 mnj  mnj  system_u:object_r:cache_home_t:s0          856 Dec 17 10:48 .cache
drwxr-xr-x. 1 mnj  mnj  unconfined_u:object_r:home_cert_t:s0        20 Dec 15 20:43 .cert
```

Similarly, users labels can be viewed with `id -Z`.
:::

::: tip Domain
A security context's type attached to a process is sometimes called a
**domain**.
:::

### Inheritance

Process that was forked from another process inherits its parent's context. This
default behavior can be changed via a special `type_transition` policy. Such a
policy says what domain a new process should have when its parent process with
type *X* executes a file with type *Y*

A file created within a directory with some context will inherit that context
(again, unless there is some other rule defined).


### Classes

Labels can be put on different kinds of resources, and policies can also
differentiate betweeen them. A type `sometype_t` placed on a regular file and
the same type on a socket might result in different access decision.

Classes of resources that SELinux understands can be found in
`/sys/fs/selinux/class`. Each class will have its own set of actions that they
support. Eg. a regular file supports, among others:

- read
- rename
- write

(defined in `/sys/fs/selinux/class/file/perms/`)

Processes and users are just identified by their contexts.

### Context configuration for files

Files are not assigned contexts one-by-one. There are actually regex expressions
that control assignmnet of labels to the appropriate sets of files. (Almost) all
the file context assignments can be seen with `semanage fcontext -l`. The
`restorecon` sets contexts based on these configurations. Note that the
configured contexts are not applied unless `restorecon` is used! That's why
[inheritance](#inheritance) takes precedence when files are being created, even
if a specific rule is defined for a new file. Only after running `restorecon`,
the proper context is assigned to the new file.

As an example, new files within `$HOME` are automatically given the correct
`user_home_t` type.

#### Customizable Types

There's a list of types that, once applied, stay on files, even if
`restorecon` is used (unless you add the `-F` flag). The list is at
`/etc/selinux/*/contexts/customizable_types`. Customizable types allows us to
retain some desired context even if the "normal" rules specify otherwise.

This feature is useful for files that do not have fixed locations and defining
rules for their context would be difficult.

Normally, the list is defined by the Linux distribution and cannot be changed.

### Types

Most commonly, SELinux policies are built based on types (**type enforcement**).
A simple policy could define that processes with type "myapp_t" are allowed to
access resources typed "somedata_t". In reality, the latter could be applied to
some directory, e.g. `/etc/my_app_config`. This way, the process could access
only those files, even if DAC rules are much more permissive. The policies can
be much more complex though and they can use all the other information that
labels provide.

### Roles

Apps/users can have various roles. Based on them role-aware poliecies can be
built. Roles often define types that the role-assigned entity can be in. So, a
single role might give some process a few types that it can be in (domains).
That is important during [type transitions](#inheritance). If a given process
does not have a role with target type assigned to it, it will not be allowed to
transition.

We can display the list of allowed types for a given role with `seinfo -ruser_r
-x` (`user_r` is the name of the role in this example).

A user can switch its role with `newrole -r somerole_r`. The supported roles are defined for each SELinux user.

### Users

::: warning
SELinux user != Linux user. Instead, Linux users are mapped to SELInux users.
Many Linux users may use the same SELinux user. That makes SELinux users more
like roles that can be assigne to Linux users.
:::

Users have specific roles assigned to them. A list of users with their roles can be
seen with `semanage user -l`.

---

Summarizing types, roles and users:

- a user definition specifies what roles a user can be in
- a role definition specifies what types a user can be in
- a type is applied to a policy to get access (or be denied of it)

## Policies

Policies are a set of rules that define the desired behavior of the system. They
explicitly allow some actions to be invoked by specified actors on specified
resources. They are compiled into policy packages and are separate from the
SELinux system itself (which lives in kernel). Therefore, they can be
dynamically loaded and do not require kernel updates.

Policies are defined as follows:

```
allow {domain} {type}:{class} { {permissions} };
```

And here's a real example:

```
allow auditd_t auditd_log_t:file { write };
```

## Unconfined

Even though SELinux labels are applied to all processes, users and files, many
of them are not actually subject to any restrictions. In order for a given user
or app to be restricted by SELinux MAC, they need to fall under a confined
labeling. However, many users and apps are assigned an *unconfined_** label.

For example, when I run this very website using Node, I can see the following
output of `ps -eZ | grep node`:

```
unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023 22642 pts/0 00:00:39 node
```

The node process is running as an *unconfined_u* user, it has *unconfined_r*
role, and it runs in an *unconfined_t* domain. With all of that, we could
actually say that node runs (almost) without any restrictions, and it is only
subject to "normal" DAC rules.

The idea behind it is that making everything (every app and user) fall under
some specific SELinux policy would be rather cumbersome. The assumption was made
that local users/apps should be trusted. However, the apps that are exposed to
the network (like web servers) should be confined, since vulnerabilities in
these apps could lead to the host system getting hijacked.

That's why in a typical Linux distro most entities will be unconfined.

::: tip Distros
The fact that users are unconfined by default depends from distribution's setup.
For example, Fedora does exactly that and places typical users in unconfined
domain. Some other, more hardened distros, might do something else.
:::

## Troubleshooting

When some process is unable to access files due to SELinux, we can make sure that this is the case by:

1. Setting SELinux in permissive mode. If the access works then, its SELinux "fault"
2. Checking logs

The latter can be done with one of the following commands:

- `ausearch -m AVC,USER_AVC,SELINUX_ERR,USER_SELINUX_ERR -ts recent`
- `journalctl -t setroubleshoot`
- `dmesg | grep -i -e type=1300 -e type=1400`

It might be that we'll not see any log even though it was SELinux that prevented
access. It happens, because some events are silenced. To disable that, run
`semodule -DB` (shorthand for `semodule --disable_dontaudit --build`) and check
logs again. To enable silencing again run `semodule -B` (`semodule --build`).

When an SELinux issue is identified, we can see more details with `sealert -l "*"`.

## Resources

- [Getting Started with SELinux (Red
Hat)](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/using_selinux/getting-started-with-selinux_using-selinux)
- [SELinux in Gentoo Wiki](https://wiki.gentoo.org/wiki/SELinux)
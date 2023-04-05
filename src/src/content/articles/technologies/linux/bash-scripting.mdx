---
title: Bash Scripting
description: Basics about Bash scripting
tags: ["linux", "bash", "scripting"]
lang: en-US
---

# Bash Scripting

## Executable permission

`chmod u+x script.sh`

## Shabang

`#!/bin/bash`

Shabang makes sure that the script is executed using the right shell, no matter
which shell the user uses to execute the script file.

We can add some arguments to the shell:

`#!/bin/bash -v` - will print each script line before executing it. It's useful
for debugging when script suddenly stops at some point and hangs. Also shows
comments.

`#!/bin/bash -x` - like above, but it will also show variables values. Doesn't
show comments.

## Errors

It's a good idea to include the following line in the beginning of the 
script. It will stop execution in case of errors:

```sh
set -euo pipefail
```

It's a shorthand of:

```sh
set -o errexit   # abort on nonzero exitstatus
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
```

## Variables

### Naming

Only use letters, numbers, and underscores. First character cannot be a number.

It's recommended not to use upper-case names, becasue all default variables are
upper-case.

### Initialization

`name=Marcin`

Variable names ae case-sensitive. There can't be spaces around the `=`. If the
value has spaces, it needs to be in `""`.

### Usage
`echo $name`

Shell will replace the $variable with its value before executing the command. If
the variable does not exist, an empty string will be used.

Variable can contain a command and can be executed (can be dangerous!):

```bash
myVar="rm file1"
$myVar
```

The above removes `file1`.

### Subprocesses

Variables are available only in the process where they were defined. To change
that, `export` can be used:

```bash
export someVar=5
```

Now, if I run some script from this shell, the `myVar` variable will be
recongnized there.

### Script Arguments

When invoking a script, user might pass some arguments. These are available via
special variables: `$1`, `$2`, and so on.

It is a good idea to create new variables at the beginning of the script with
the argments, so that it is easier to understand what they contain.

```bash
name=$1
directory=$2
```

### Double Quotes

If our variables may contain spaces, it is a good idea to usethe varibale with
`""`. That way, commands will "understand" that the space is not for a separate
command, but rather a part of filename.

Example:

```bash
container="$1"
dir="$2"

mkdir -p "$dir"
grep "$container" shipments.csv > "$dir/$container.csv"

echo "Wrote report $dir/$container.csv"
```

Multiple variables can be put in one pair of `""`, as can be seen above Before
execution of a given line, the variables are substituted with  actual values. If
`dir` or `container` had spaces in it, it is OK, becasue there are `""` around
the values.

There is a utility *shellcheck* (command-line and shellcheck.net) that shows
issues in script files, i.e. missing `""`.

ZSH does not require `""`, because it does not split words from variables as
separate commands. It kind of automatically interprets variables as if they were
in `""`.

> ALWAYS USE `""`!

Single quotes are used to escape the `$`.

### End of Options

When passing arguments to scripts, someone could use `-`. Often, that would be a
problem, it could be interpreted as some command option. Example:

```bash
mkdir $1
```

Running this script with `./script.sh -p` will not create a directory  `-p`. It
will be taken as an option of `mkdir`.

There is a special "end of options" string: `--`. Example:

```bash
mkdir -- $1
```

Whatever is in `$1`, it will be interpreted as an argument, and not an option.

Not all commands understand `--` (i.e., `echo`). That's why it is a good idea to
use `printf` instead when the printed value is not granted to be safe:

```bash
printf "%s\n" $variable
#OR
printf "My name is %s and this is the current dir %s\n" "$USER" "$(pwd)"
```

### Explicit Names

It might happen that we need to construct a string containing the variable, like
this:

```bash
echo "$v1_$v2"
```

Only $v2 will be printed, becasue the shell will look for variable `v1_`!
Mitigation:

```bash
echo ${v1}_${v2}
```

In this case `_` was a problem, because `_` is a valid character in a variable
name. The issue would not be there if there was A `.`, `/`, or any other
character that is not valid in a variable name.

### Declare

`declare` allows for more advances variables creation. It allows to set a type
of varable (default is always string), and others.

## Exit Codes

UNIX programs can return values in range 0-255. 0 is success, any other code is
an error. There may be many kinds of errors, so different values can be
returned.

`exit 0` - success `exit 1` - error

## Conditionals

### If-Then-Else

These check the return value (exit code) of a `testcode` and act based on it
(either `then` or `else`).

Multiline:

```bash
if testcode; then
   # Some script
else
   # Some else script
fi
```

One-line:

```bash
if testcode; then somecode; else someelsecode; fi
```

`else` is optional.

### Conditional Expressions

`[[ $var ]]` - check if `var` has any value

`[[ $var = "ok" ]]` - check if `var` equals "ok" (SPACES AROUND `=`!)

`[[ -e file1 ]]` - check if a file `file1` exists

`[[ -d dir1 ]]` - check if a directory `dir1` exists

`[[ ! testcode ]]` - NOT (i.e., `[[ ! -e file1 ]]` is TRUE when `file1` doesn't
exist)

`[[ testcode1 && testcode2 ]]` - AND

`[[ testcode1 || testcode2 ]]` - OR

> Spaces after `[[`, and spaces before `]]` are necessary!

## Functions

Definition:

```bash
function create_app() {
    var1=1  # Global variable
    local var2=2  # Scoped variable
    
    echo "Parameter $1"  # The way to return data
}
```

Invocation:

```bash
create_app "argument"
```


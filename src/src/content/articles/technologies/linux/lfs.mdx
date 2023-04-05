---
title: Linux From Scratch
description: Summary of Linux From Scratch (LFS) progress
tags: ["linux"]
lang: en-US
---

# Linux From Scratch

This is a breakdown of the LFS book.

## Notes

- sticky bit - file can be removed only by its owner even if directory is
  accessible to multiple users. `/tmp` uses 777 with sticky-bit. Thanks to it
  anyone is able to create/read/execute in `/tmp`, but only owner of a given
  file can remove it.
- login and non-login shell - login shell loads `bash_profile` (which loads
  other things like `.bashrc`). Non-login shell may be started only when login
  shell session exists, and it loads `.bashrc` directly.

### Cross-compilers

Cross-compiler is a compiler that builds programs on machine A, but the programs
are supposed to run on machine B.

### Toolchain

Some of the most important packages on linux:

 - *binutils* - contains `ld` (linker) and `as` (assembler), and lots of other
   tools
 - *glibc* - GNU standard C library (provides basic things like `open`, `read`,
   `write`, `printf`, etc.).
 - *gcc* - GNU Compiler Collection (C and C++ among others)
- *libgcc* - internal library used by GCC

The installation order:

1. _binutils_ - linker and assembler are required by gcc's and glibc's
   `configure` scripts.
2. *gcc*
3. sanitized Linux API headers - allows glibc to interface with kernel's
   features
4. *glibc*
5. *libstdc++*

### Package Managers

Package manager tracks the files installed by applications making it easy to
update and remove software.

Approaches:

- installing each package in separate directory, and creating a symlink to
  executable in some shared directory (e.g. `/usr`).
- timestamp-based - package manager records the time of package installation.
  Later it can find package's files by looking at timestamp of the files on the
  system. This will not work if multiple packages are being installed at the
  same time.
- package archives - RPMs and DEBs use that. The package's structure is made in
  an archive and recreated on the target system.

## Issues

- Kernel 3.2 - I have 5.x...
- After downloading all packages from FTP, and checking their md5 I got the
  following: `md5sum: man-pages-5.12.tar.xz: No such file or directory`. It
  turns out that FTP had version 5.13 of that package only. Is it a problem?


## Steps

### Chapter 2 - prerequisites

1. Install Ubuntu 20.04 in a VM (I used Gnome Boxes)
2. Install all the missing packages (accoridng to version-check.sh)
3. Create a new partition for LFS (~20GB) and mount it.

```sh
mkdir -pv $LFS
sudo mount -v -t ext4 /dev/vda2 $LFS
```

4. Create `/sources` directory on the LFS partition.

### Chapter 3 - downloading sources

1. Download all software packages and patches from the FTP mirror of LFS, and
   check md5 checksums.

### Chapter 4 - bootstrap LFS partition

1. Create some dirs in LFS partition (`/etc`, `/var`, `/lib64`, `/usr/bin`,
   `/usr/sbin`, `/usr/lib`).
2. Create `/tools` directory for cross-compiler to be installed in.
3. Add `lfs` user and group to the host system.
4. `chown` directories in the LFS partition by the `lfs` user.
5. Log in as `lfs` in a terminal session.
6. Create `.bash_profile` and `.bashrc` files for `lfs` user.

### Chapter 5 - building cross-compiler and its associated tools

1. Build Binutils (pass 1)
2. Build GCC (pass 1)
3. Build sanitized Linux API headers
4. Build glibc
5. Build libstdc++ (pass 1)

### Chapter 6 - cross-compiling temporary tools

1. Build M4
2. Build Ncurses
3. Build Bash
4. Build Coreutils
5. Build Diffutils - by mistake I did make install before make. Later I rerun
   make install. Is it OK?
6. Build File - File on host needs to be in version 5.40? I have 5.38
7. Build Findutils
8. Build Gawk
9. Build Grep
10. Build Gzip
11. Build Make
12. Build Patch
13. Build sed
14. Build tar
15. Build Xz
16. Build Binutils (pass 2)
17. Build GCC (pass 2)

### Chapter 7 - chroot

1. Change ownership of dirs in $LFS to root.
2. Create console and null devices in $LFS/dev.
3. Mount Virtual Kernel File Systems on $LFS (`dev`, `proc`, `sys`, `run`).
4. Chroot on `$LFS` - `$LFS/etc/passwd` doesn't exist so "I have no name!" will
   appear instead of user name in bash.

```sh
sudo chroot "$LFS" /usr/bin/env -i HOME=/root TERM="$TERM" PS1='(lfs chroot) \u:\w\$ ' PATH=/usr/bin:/usr/sbin /bin/bash --login +h
```

6. Create Linux directories according to FHS (Filesystem Hierarchy Standard).
7. Link `/etc/mtab` to `/proc/self/mounts`
8. Create `/etc/hosts`.
9. Create `/etc/passwd`.
10. Create `/etc/group`.
11. Create "tester" user (needed for some tests later on).
12. Start a new shell to make use of the `/etc/passwd` and `/etc/group`. Shell
    now properly shows "root" as a user.
13. Create files for logs for various programs (login, agetty, init)
14. Build Libstdc++ (pass 2).
15. Build Gettext.
16. Build Bison.
17. Build Perl.
18. Build Python.
19. Build Texinfp.
20. Build Util-linux
21. Cleanup doc files and .la files
22. Delete the `$LFS/tools` directory, we no longer need it.
23. Backup current work (`$LFS`)


### Chapter 8

1. Build man-pages
2. Copy Iana-Etc `services` and `protocols` to `/etc`.
3. Build and test Glibc - hard to say if `make check` was successful or not (44
   fails, 67 unsupported, 16 xfail)
4. Install locales, timezones
5. Build Zlib
6. Build Bzip2
7. Build Xz
8. Build File
9. Build Readline

page 116 (M4 is next)
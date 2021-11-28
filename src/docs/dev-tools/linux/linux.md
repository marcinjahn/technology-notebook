# Administration Handbook Tips

## SSH

`ssh-keygen` - generates SSH keys `ssh-copy-id marcin@rpi.local` - copy client
SSH public key to server for SSH authentication (`.ssh/authorized_keys` on the
server).

`~/.ssh/known_hosts` - contains public keys of servers that we SSH-ed into.

Access to SSH with root should be disabled (`/etc/ssh/sshd_config`).

## Useful Commands

`tty` - current terminal `who` - logged in users `uptime` - shows server's
uptime `free` - shows free memory

`pwd -P` - shows the actual directory (mostly useful for dirs being symbolic
links)

`type <command>` - shows what a command is (program, alias, ...)

`!$` expands to the last used argument (if previous command had many arguments,
just the last one is used)

`md5sum <file>` can be used  to check md5 of a file (i.e., to compare if some
binary is the same as another binary)

`set -o noclobber` - using output redirect `>` is "blocked" if a file would be
overwritten. It can be bypasses using `>|`. `set +o noclobber` will remove the
"lock" back.

`uname -r` - kernel version `lsb_release -d ` - distribution description (not
always available) `cat /proc/version` - similar to above two

`runlevel` - current runlevel ("5" - "graphical.target", "3" -
"multi-user.target" (no GUI)) `systemctl isolate multi-user.target` - set
current runlevel `systemctl set-default multi-user.target` - set default
runlevel

`sleep 100` - waits for 100 seconds

- `whereis` - finds commands in more places than `which`

- `locate` - locates filenames using precompiled index. The DB is updated with
  `updatedb` (it runs using `cron`, so it's not always recent).


## Working with files

`mkdir -p some/dir` - creates all directories `cp -R one two` - copies files
recursively

## Redirection and pipes

`>`/`1>` - redirects *STDOUT* `2>` - redirects *STDERR* `&>` - redirects both
*STDOUT* and *STDERR* `<` - redirects *STDIN* `|` - unnamed pipe. It connects
*STDOUT* of one program to *STDIN* of another program

`tee` - can be used instead of `>` in various cases (and `tee -a` is an
equivalent of `>>`):

- to redirect output to a file, but also to display it in the terminal (`ls |
  tee myfile`)
- to redirect output to a file that requires root permissions (`echo "127.0.0.1
  localhost" | sudo tee -a /etc/hosts`). `>>` wouldn't be able to do that.

There are also named pipes, which are special kind of files (`p`) that act as
FIFO queues. When one process writes to it, it's blocked until another process
reads the data out. It accomplishes IPC (Inter-Process Communication).


## Links

`ls -l <file>` shows how many hard links (not soft-links) a file has (shown
after permissions).

`ln f1 f2` - creates a hard link `ln -s f1 f3` - creates a symbolic link

**Hard Link** - another name of an existing file. The hard-link is just another
entry for the same inode in the file names map.

- can be created only on the same filesystem nad same partition
- can't be created for directories
- has the same inode as the original file - so it's the same file!
- deleting the "original" file is OK - hard link will still contain data

**Soft Link** - a shortcut to a file. It just points to another file

- each soft link is a separate file
- deleteing the original file makes soft link unusable
- has a diffrent inode than the original file (becuse it is a different file!)
- can point to directories

## Archiving

`tar -cf backup.tar ./some_folder` - create an archive. The given folder path
will be recreated while extracting (`some_folder` vs
`/home/marcin/some_folder`). `tar -xf backup.tar` - extract an archive

`-v` parameter will add verbosity. Two `-v`s will add more vermosity.

We can create incremental backups using `-g` and a .snar file.

### Compression

`gzip archieve.tar` - compress an existing tar. Tar file will be deleted and
tar.gz will be created. `gunzip archieve.tar.gz` - returns `archieve.tar` `tar
-czf backup.tar.gz my_folder` - creates `my_folder.tar.gz`. Replace `c` with `x`
to extract.

`bzip2 archieve.tar` - better compression. Produces .bz2 from the source file
`bunzip2 archieve.tar.bz2` - returns `archieve.tar` `tar -cjf backup.tar.bz2
my_folder` - creates `my_folder.tar.bz2`. Replace `c` with `x` to extract.

### dd

`dd -if=/dev/sda1 of=disk.img` - creates an image of some source directory

## Permissions

By default each new file has `666` permissions (rw-rw-rw-). Each new directory
has`777`. However, this can be changed by `umask`. On Ubuntu, the `umask`
command prints `0002`. It means that WRITE permission is taken out from the
"others" when creating files. We can set different mask, i.e. `umask 27` - the
new files will have only rw-r----- permissions. `umask` can only decrease
default permissions, it can't add any.

If the user has some permission on a directory, he will also have that
permission on all the files inside of that directory, even if the files belong
to somebody else.

### Changing permissions

`chmod +x file1` - adds execution permission `chgrp group1 file1` - group of
"file1" is set to "group1" `chown root file2` - set owner of a file `chown
joe:joe file2` -set user and group owners of a file

`cp` command, by default, sets the owner of the copied file to the user:group
who did the copy. This behaviour can be changed with `-a` parameters (`cp -a`
requires root priviliges, because we're changing the owner of the file after
copying).

## External storage

`lsblk` - shows disks and partitions `sudo fdisk -l` - shows more details about
storage devices

`sudo mkdir /media/usb` - creates a directory where we'll mount the storage

`sudo mount /dev/sda1 /media/usb` - mounts `sudo umount /media/usb` - unmounts

### Sticky bits

?

## Root Access

`su` - requires knowledge of root's password. By default, switches to root, but
it could any other user. After running it, the environment variables are not
reloaded - $USER will be still "marcin", current directory also stays the same
`su -` - like above, but loads root's environment (envs, current directory).
This one is recommended.

`sudo` - delegated rights to root just once. User uses their own password to
authenticate. Authentication stays on for 5 minutes. `sudo -i` - opens a new
bash as a root (a bit like `su`, but no root password knowledge is required).

Permission available via `sudo` can be controlled using `/etc/sudoers` file (who
can use `sudo`, as who they can login, what commands they can run). The file can
be modified via `visudo` program. Also 5-minute period can be modified here.

## Processes

Not all processes are attached to TTYs.

`ps` - shows processes from current shell (PIDs, attached TTY) `ps aux` - show
all processes of users, also these without TTY attached. `pstree` - shows tree
of processes

`/proc` directory containing details of processes (directories inside are PIDs).

`echo $$` - PID of the current process

### Signalling

`kill -l` - shows all available signals and their numbers

The process does not have to respond to the signal!

`kill PID`/`kill -15 PID`/`kill -term PID`/`kill -sigterm PID` - sends SIGTERM

If process does not respond to SIGTERM (15), we can try with SIGKILL (9): `kill
-kill PID`. It removes process directory from `/proc/`!

### BG and FG processes

`sleep 100&` - `&` at the end starts the process in the background (a job)
`jobs` - displays all background jobs `CTRL + Z` - sends the SUSPEND to the
running process (a job is sent to the background and is STOPPED) `bg` - resumes
the job in the background (becomes RUNNING) `fg` - brings the background job to
the foreground

## Shared Libraries

`ldd /usr/bin/grep` - lists the shared libraries used by a given program.

`/etc/ld.so.conf.d/` contains config files with paths to shared libraries (i.e.
`/lib/`). If we add some paths there, we need to update lirbary cache with
`ldconfig`. `ldconfig -p` lists the lirbaries in the cache.

## CRON

`cron` - scheduled jobs (every 10 minutes, etc.) `anacron` - tun job after
system boot (10 minutes after, etc.) `at` - run a jon once at some time

## SELinux

DAC - users have full control over their stuff. If thye do `chmod +wrx` on their
files, everyone can do whatever they want with them MAC - there are some
policies that add another layer of control over the system

Booleans - various flags controlling different permissions (i.e. there is a
boolean that controls if httpd can access home directories ('false' by
default)).

## Services

`systemctl status cron.service` - shows the status `systemctl cat cron.service`
- shows the configuration file of the service

`sudo systemctl start docker.service` - start the service now `sytemctl enable
docker.service` - enable on next startup `systemctl enable docker.service --now`
- enable on next startup and start now

`sudo systemctl stop cron.service` - stops the service (if it's "enabled", it
will start on next boot) `systemctl disable docker.service` - disable a service
on next startup `systemctl disable docker.service --now` - disable a service on
next startup and now

`systemctl restart docker.service` - restart a service

`systemctl mask docker.service` - service cannot be started until it's unmasked
(`unmask`)


Unit files (`.service` suffix) are in:

- `/usr/lib/systemd/system` - unit files deposited by packages during their
  installation
- `/etc/systemd/system` - local unit files and customizations can go there


## Users & Groups

`/etc/passwd` - contains all users `/etc/group` - contains all groups `useradd
bob` - adds user

## Networking

`dig www.google.pl` uses DNS to find IP addresses `dig www.google.com @8.8.8.8`
- a way to specify DNS server to be used

`ip -4 a` - shows just IPv4 addresses

`traceroute google.com`/`tracepath google.com` - shows "hops" when going to some
address


ConnectionManager (`nmcli`) allows to manage connections using network
interfaces. It allows to stop/start connections (`down` and `up`).

### iptables

By default, the firewall is set to ACCEPT everything (there are no rules).
Additionally, the POLICY of each chain is set  to ACCEPT - if not rule is
matched, the traffic will be accepted. The rules are read from top to bottom. As
soon as one of them matches, the rest is ignored.

`iptables -L` - shows the current config. "FORWARDING" chain is used when the
machine acts as a router (by default, it doesn't). `iptables-save >
iptables.config` - saves the current config in the file `iptables-restore >
iptables.conf` - load config from a file

Examples: `iptables -A INPUT -i lo -j ACCEPT` - adds an ACCEPT rule to the INPUT
chain for all local traffic `iptables -A INPUT -p tcp --dport 22 -j ACCEPT` -
allow SSH into the system

### TCP Tunelling

Tunneling allows to use some protocol (i.e., SSH) to "hide" some other protocol
(i.e. HTTP).

`ssh -f - L 8080:localhost:80 root@server2 -N` - SSH will listen in the
background on the client for requests to port 8080. It will then send this
traffic to server2, where the traffic will be directed to localhost:80
(webserver running on the server2).

## Packages

Debian packaging format:

### DPKG

`dpkg` - manages DEB packages. `dpkg --get-selections`/`dpkg -l` - lists
installed packages. Packages marked as "dinstall" are no longer needed and can
be deinstalled (shown with `--get-selections`). `dpkg -i package.deb` - install
a package `dpkg --purge some-package` - removes package and its configuration
`dpkg -l some-package` - shows information about a package `dpkg -L
some-package` - shows files that the package consists of `dpkg -S /some/file` -
shows the package that the file is associated with `dpkg-reconfigure
package-name` - reruns the configuration scripts that normally are used when the
package in installed (i.e., we can set tzdata time-zone).

### APT

`/var/cache/apt/archives/` - directory containing all debs installed by APT `apt
clean` - removes APT cache. Good for Docker images.

`apt remove package` - removes a packages, but leaves the configuration `apt
purge package` - removes a package and its configuration

`apt show package` - shows information about a package (it can be installed or
not) `apt search package` - looks for matching packages in the repo (useful when
we don't know the name of the package since it looks in descriptions, names,
etc.)

`/etc/apt/sources.list` and `/etc/apt/sources/list.d` directory contain all
repositories that APT uses. `apt edit-sources` - modifies sources file with
checking when saving

#### Environment Variables

APT uses various environment variables for its operations.

`DEBIAN_PRIORITY` - depending on this value, programs may ask a different set of
configuration questions during the installation. We can set it to ignore less
important config, or set it in a way that we will be setting everything during
the installtion.

`DEBIAN_FRONTEND` - controls interaction during packages installation. Options:
noninteractive (no questions will be asked), dialog, readline, editor.

## systemd

systemd manages various entities, known as "units". These can be: services,
sockets, devices, ... Each unit is configured with a unit file. Depending on a
unit type, a proper suffix is applied.

## Interesting Facts

In every directory there are 2 files: `.`, `..`. These are links to current and
parent directories!

If we don't want to see erors from some command, we can redirect them to
`/dev/null`: `some-command 2> /dev/null`.

The "recovery mode" is just a single-user.target (runlevel "1").



# Pods

Each pod has its own IP, hostname, processes, network interfaces and other resources.

A pod contains one or more containers. These containers share a node and some Linux namespaces (it's configurable, e.g. pod's containers by default do not share PID namespace).

![](https://i.imgur.com/GmKGhhn.png)

Sharing network namespaces by pod's containers:

![](https://i.imgur.com/uEDYRs9.png)

It makes sense to have multiple containers in a pod if these containers need to work together closely. The example below shows some web app and a sidecar container providing TLS support:

![](https://i.imgur.com/j38h4ZB.png)

Another example:

![](https://i.imgur.com/7475N9l.png)

Containers in a single pod are scaled together.

## Networking

All pods can talk to each other, and they are reachable from any node. Pods may define the ports they use in YAML, but they do not have to. It's only informative (and it gives possibility to name the ports, which is useful when creating Services for them).

Checking if pod accepts requests:

- SSH into any node, and try to curl the IP address of a pod
- create another Pod, get into it, and curl the other pod from it
- `k port-forward <pod-name> <pod-port>` - it's the easiest thing to do, but the most complex under the hood. It can also be used with Services.

![](https://i.imgur.com/R8QArw1.png)

## Logs

`k logs <pod>` - displays pod logs

Options:

- `-f` for follow
- `--timestamps` for timestamps
- `-p` - logs from the previous instance of the pod (if died)

Deleting a pod deletes the logs as well. Logs are kept in `/var/log/containers` on the nodes.

## Accessing Pods

- `k cp kiada:html/index.html /tmp/index.html` - copying friles to/from containers
- `k exec <pod> -- ps aux` - execute a command in a pod (`-it` for interactive)
- `k attach` - attaches to stdin, stderr, stdin (useful if pod's container expects input). If stdin is not needed, it is not different than `k logs -f`
- ephemeral containers - currently in Alpha

## Init Containers

Pod can have **init container(s)** specified. They can start before the "main" container(s), finish successfully, and only then the "main" container(s) start.

![](https://i.imgur.com/hViRCNQ.png)

"Main" containers run in parallel. Init containers run consecutively (1 at a time).

Some usecases:

- prepare some files on a volume for main container
- configure some networking
- delay container start until some condition is met
- notify some external service that the pod is starting

Init containers should work in an idempotent way.

## Lifecycle

![](https://i.imgur.com/qF126K8.png)

Pod's conditions (a part of "status"):

![](https://i.imgur.com/Yq0SLM6.png)

Restart policies of pods:

![](https://i.imgur.com/lqVAMNq.png)

These policies can be defined only on the pod level, not on the container level.

When container dies and gets restarted, there is a varying delay before the container starts:

![](https://i.imgur.com/VKxVqXl.png)

First time is immediate, then it grows exponentially up to 5 minutes. This behaviour is reset if the container has run successfully for at least 10 minutes.

## Probes

### Liveness Probe

K8s automatically restarts container that crashes. However, there are situtions when the app does not terminate, but is unhealthy (i.e., in a deadlock).

**Liveness probe** may be defined for every cotnainer in a pod. It is checked periodically. If container does not respond, it is considered unhealthy and is terminated (and restarted).
They cannot be used with *init containers*.

Types:

- HTTP GET - response code between 200-399 is considered successful
- TCP socket - just a TCP connection is attempted
- Exec - executes a command inside of the container and checks exit code

Additional configurable parameters:

![](https://i.imgur.com/eJjyMxt.png)

K8s does not mention anywhere that probe is successful. It could be logged by a tested container by an app running on it.

When probe fails, K8s tries to terminate the app gracefully (with TERM). If that fails, it kills is forcefully (`kill -9`).

### Startup probe

Additional proble - **Startup probe** may be added if the app is known to start long. Then, separate configuration is used to check app health during startup. We might define how long it should take for the app to start responding for health checks. It's perfectly normal for the Startup probe to fail a couple times initially. Successful Startup probe indicates that K8s should switch to the *Liveness probe*. It is usually executed at shorted intervals making sure the app is alive.

Usually both probes use the same endpoint, but they can be different (or even use different type).

## Hooks

There are two hooks:

- post-start - run immediately after the container is started parallelly to it
- pre-stop

![](https://i.imgur.com/0HjOp57.png)

They are specified per container.

> Init containes are similar to post-start hooks, but they're defined per pod.

They can be defined as HTTP GET, or as "exec" (just like probes). "tcpSocket" is not supported.

Container is in the "Pending" state until post-start is completed. Logs also cannot be seen even though container is already running.
If the hook fails, the container is restarted.

The post-start HTTP hook should not be used if we want to target the same container with it (or the same pod in general). It could happen that the hook will be executed before the webserver is started in the container. It will cause a restart since HTTP request will fail. We end up in a restart loop.
HTTP hook is good for notifying some other apps about the container starting.

The pre-stop hook is not invoked if the app terminates by itself.

## Termination

If the pod is to be killed, a `TERM` signal is sent to it. By default, 30s is given for the container to shut down gracefully. It can be changed with the `terminationGracePeriodSeconds` setting in `spec`. If the time passes and container still lives, `KILL` is sent to it.

![](https://i.imgur.com/IAZMN8c.png)

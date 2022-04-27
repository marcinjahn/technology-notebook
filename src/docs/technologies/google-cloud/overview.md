---
title: Overview
description: Google Cloud Platform Overview
tags: gcp, google, cloud, platform
lang: en-US
---

# Google Cloud Overview

## Projects

GCP is organized into **Projects**. Projects may belong to some **Organization**
or not.

Different Projects may be used for Testing and Production. Projects have
separation of data. If we store data within the same Project (e.g. Firestore),
this data is hosted in the same space (instance?).

GCP Projects are a little bit like Resource Groups on Azure.

## CLI

[Google Cloud SDK](https://cloud.google.com/sdk/docs/install-sdk)

The command is `gcloud`. After the installation, we should run `gcloud init` to
log in.

Google Cloud Storage uses the `gsutil`.

`gcloud config` allows us to manage the config of the CLI.

### Cloud Shell

Cloud Shell is available from the Web Console interface. Highlights:

- has preinstalled SDKs (e.g. dotnet)
- allows setting up a web server on some port and accessing it from the outside

## App Engine

It's a GCP's version of Azure's App Service.

A single GCP project may have only one App Engine Application. However, an
Application may have multiple Services, where each service is a different app
(very intuitive (not)).

A Service may have multiple versions, all of them running parallelly. The
traffic may be managed for specific versions (e.g., canary deployment). For
example, feature braches could be deployed as separate versions of a service.

Each version is scalable horizontally.

```mermaid
flowchart TD
    Project --> Application --> ServiceA[Service A] & ServiceB[Service B]

    ServiceA --> v1.0[v1.0 - 50%] & v1.1[v1.1 - 50%]
    ServiceB --> v1.3[v1.3 - 80%] & v2.0-alpha[v2.0-alpha - 20%]

    v1.0 --> i1[Instance 1] & i2[Instance 2 ]
    v1.1 --> i3[Instance 1]
    v1.3 --> i4[Instance 1] & i5[Instance 2] & i6[Instance 3]
    v2.0-alpha --> i7[Instance 1]
```

::: tip Default
By default, when deploying an app to the project, a "default" service name is
chosen.
:::

### URL Template

Each service version can be reached independently:

```
https://{VERSION_ID}-dot-{SERVICE_ID}-dot-{PROJECT_ID}.{REGION_ID}.r.appspot.com
```

Support for .NET seems to be really bad. The [provided
examples](https://github.com/GoogleCloudPlatform/dotnet-docs-samples) are for
.NET Core 2.1. The best option for .NET apps seems to be the "custom" runtime,
which is basically Docker containers.

Any app running on App Engine requires the `app.yaml` file. Here's an example of
it for the "custom" runtime:

```yaml
runtime: custom
env: flex
```

Here's a full ASP.NET Core Web API project example:
[GitHub](https://github.com/marcinjahn/gcp-dotnet-example).

The app can be deployed with `gcloud app deploy app.yaml`

::: tip Port
Apps using runtimes other than "custom" are expected to listed on the port
provided in the `PORT` environment variable. The "custom" Docker apps are
expected to listed on port `8080`.
:::
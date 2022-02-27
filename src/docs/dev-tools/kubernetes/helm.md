---
title: Helm
description: Packaging of apps in Kubernetes - Helm Charts
tegs: k8s, kubernetes, helm, chart
lang: en-US
---

# Helm

## Why?

- Typically, K8s applications require multiple objects: deployments, services,
  ingresses, storage, configs, etc. Usually, these are defined in separate YAML
  files.
    - we'd like to treat these objects "atomically" - they are all parts of one app
    - the order of objects creation might matter
    - versioning is not straightforward - we have to remember the differences
      between two versions and manually apply them

With Helm, we get the following:

- We treat the app as a single entity, "forgetting" that it consists of multiple
  objects - an app in a **package**
- Packages are versioned, making it much easier to upgrade/downgrade apps
- Templates allow to extract variables from YAML files
- Management of dependencies

## Resources

[Pluralsight](https://app.pluralsight.com/library/courses/kubernetes-packaging-applications-helm/table-of-contents)
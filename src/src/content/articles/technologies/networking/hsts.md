---
tags: ["networking"]
title: HSTS
description: HSTS
---

# HSTS

HSTS solves the following problem:

If you try to reach some website via HTTP, nowadays, most likely, you will be
redirected to the HTTPS URL. The problem is that the initial HTTP request can
be MITMed and you might be presented with attacker's version of the website.

In order to prevent that, HSTS comes with a list of websites that are known to
support HTTPS (on all their subdomains!). Browsers have that list and stop users
from making HTTP requests to websites that are on the HSTS list.

In order to be onboarded on the list, one should follow the steps enlisted on
[https://hstspreload.org/](https://hstspreload.org/). Basically, particular headers
should be included in the response from your server.

:::caution[Removal]
Before doing the submission you should understand all the requirements of HSTS.
If you fail to support them, your website might become unreachable. Removal from
the HSTS list takes time since certain users don't update their browsers too
often and the lists are updated with browser updates.

Removal is done by submitting a [removal form](https://hstspreload.org/).
:::
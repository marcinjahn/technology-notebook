---
title: About This Website
description: How this website was built and what its purpose is.
lang: en-US
---

# About This Website

I have created [marcinjahn.com](https://marcinjahn.com) because I needed a place
to store various notes that I create while learning/working. I use many sources
(books, videos, tutorials) to find valuable knowledge. Anytime I learn a new
technology, I like to note down key points that I can later use to remind myself
what it's all about. The notes are not too detailed, because that's not their
purpose. The details can be found in the source material, while the notes
contain the gist of it. Don't treat it as a learning material, it's rather a
summary of what a given technology has to offer.

I find these notes to be quite useful since I tend to easily forget various
concepts if I don't use them in a week or more.

I have gone through other solutions that took me to a conclusion that I actually
need a website. In the past I had used the following approaches:

- pen and paper - initially, I noted all stuff in a paper notebook. It would be
  perfect if only it was easy to add information in between of what I had
  already noted. I could use a tablet for it, but somehow I find writing or
  reading using a tablet to be a rather bad experience. When I really am out of
  ideas of what to do, I transfer these notes to a digital form (and they land
  on this website)
- [OneNote](https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app) - 
  good for notes in general, but not great for programmer notes.
- [Boost Note](https://boostnote.io/) - I used it briefly, at the time the Free
  tier had some limitations regarding tagging that were a pain to live with.
- [HackMD](https://hackmd.io/) - cool markdown notebook, but the organization of
  pages was not ideal. I couldn't organize notes in a way that I wanted.

Since none of the above worked for me, I have decided to build something myself.
Instead of creating an actual note-taking app I realized that a simple website
with markdown documents is all I need! Other than the simplicity, I also get the
following:

- a developer experience - each update of my notes is a git commit.
- a personal website - as an addtional result, I'd have my own website, like all
  the other cool kids out there! It's not a blog though, I'm too lazy for that.
- a small project to experiment with - building something in your free time is
  difficult to have motivation for if you don't really see any use for it
  realistically. Building a website that I actually am going to use (I read my
  notes!) gives me a motivation to work on it. Together with that comes
  motivation to play a bit more with various technologies (like Kubernetes).

## Code

This site is open-source. You can find the source code and K8s manifests on
[GitHub](https://github.com/marcinjahn/technology-notebook).

## Technologies

### Frontend

The website is built using [VuePress](https://vuepress.vuejs.org/). It's a great
static site generator that turns markdown into HTML, CSS, and JS files that in
the end load up in your web browser. It's really easy to use and powerful when
needed. For the needs of this website I've developed my own theme based on the
default one provided in the package.

### Infrastructure

#### Kubernetes

I use [Kubernetes](https://kubernetes.io/), or more specifically [Azure
Kubernetes Service
(AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/), to host
and manage various components that the project is composed of. The nodes are
automatically scaled keeping the cost as low as possible.

I used [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) to
expose the website publicly.

For TLS needs, I installed [cert-manager](https://cert-manager.io/) (using
[Helm](https://helm.sh/)). It has automatically set up [Let's
Encrypt](https://letsencrypt.org/) certificate for my site and it renews it
periodically.

::: tip Overkill? 
Going with Kubernetes is definitely an overkill for a website
like this one. It would be much more logical to go with something like [Azure
Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/)
(especially in cost, management, and ease of starting out areas). In my case
though, I already had a K8s cluster that I use for various other projects.
Adding this site to it was quite reasonable.
:::

The DNS records are managed via [NameCheap](https://www.namecheap.com/).

The website has a CI/CD workflow defined using [GitHub
Actions](https://docs.github.com/en/actions). In order to make any change, all I
have to do is push a commit to the _main_ branch of my
[repository](https://github.com/marcinjahn/technology-notebook).

#### GitHub Pages

Due to the fact that my K8s cluster is used for various experiments, it might
stop working sometimes (also, I might run out of Azure credit in a given month
:|). Since a notebook that is accessible a bit randomly is not what I wanted, I
decided to host the website somewhere else as a backup. Since the page's source
code is already on GitHub I decided to go with [GitHub
Pages](https://pages.github.com/) for this purpose. I have a separate GitHub
Actions workflow defined that automatically builds the artifacts from the *main*
branch and places them on a [separate
branch](https://github.com/marcinjahn/technology-notebook/tree/gh-pages) that is
configured to be a source of data for the GitHub Pages hosting.

Both the AKS and the GitHub Pages IPs are configured for my domain, so when
visiting [https://marcinjahn.com](marcinjahn.com) you might get the bits from
either one of these randomly.
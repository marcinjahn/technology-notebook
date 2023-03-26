---
title: Alpha Img
description: A small side-project that helps finding transparent images
lang: en-US
tags: ["web", "app", "project", "alpha", "image", "transparent"]
---

# Alpha Img

**Alpha Img** is a small web project that aims to solve the following problem:

> During my work I often have to prepare presentations where I have to include
> logos of various solutions that I've used in the projects. Looking for these
> logos is easy in Google, however, it requires you to go and select proper
> filtering in Google Images search every time, making it a bit tedious.

Alpha Img is a simple search engine that returns ONLY images that are
transparent. It also allows you to quickly save/copy/preview the image with a
single click.

![](./assets/alpha-img-spa.png)

The solution consists of (the code is available on GitHub):

- [Vue.js SPA](https://github.com/marcinjahn/alpha-img.spa-vue)
- [.NET C# Web API](https://github.com/marcinjahn/alpha-img.webapi-dotnet)

~~A public instance of the solution is deployed to Heroku at
[https://alpha-imgs-spa.herokuapp.com/](https://alpha-imgs-spa.herokuapp.com/).~~
Heroku no longer offers free hosting, I'll be looking for some alternative
solutions.

The web-api backend uses Google Search API to retrieve the results.

::: tip Cold Run
Heroku apps are not running all the time, but rather on demand. You can expect
some seconds of delay for your first request.
:::

::: warning Styling
The app is in a rather raw state in regards to its styling. I plan to improve
that if I find some time for it.
:::

## Technologies

- .NET Core (C#)
- Vue.js
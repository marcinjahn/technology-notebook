---
title: TypeScript Environment Setup
description: How to set up Node.js project to use TypeScript
tags: environment, typescript
lang: en-US
---

# TypeScript Environment Setup

This setup is suited for Fastify, it can be adjusted for other frameworks.

```
npm init
npm i -D @types/node @tsconfig/node16 nodemon ts-node typescript
npm i fastify @sinclair/typebox
```

tsconfig.json:

```json
{
  "extends": "@tsconfig/node16/tsconfig.json",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "dist",
  }
}
```

package.json scripts:

```json
"scripts": {
    "start": "nodemon index.ts",
    "build": "tsc --project ./"
}
```
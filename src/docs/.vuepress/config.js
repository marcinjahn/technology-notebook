const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Marcin Jahn | Technology Notebook",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "white" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-ZSM2N36X8P",
      },
    ],
    [
      "script",
      {},
      [
        "(function() { if (window.location.href.startsWith('http://localhost')) { return; } window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-ZSM2N36X8P'); })();",
      ],
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    search: false,
    repo: "marcinjahn/technology-notebook",
    repoLabel: "Code on GitHub",
    docsBranch: "main",
    docsDir: "src/docs",
    editLinks: false,
    lastUpdated: "Last Updated",
    externalServices: [
      {
        img: "/img/linkedin.webp",
        url: "https://www.linkedin.com/in/marcin-jahn-63a9b915b/?locale=en_US",
      },
      {
        img: "/img/github.webp",
        url: "https://github.com/marcinjahn",
      },
    ],
    nav: [
      {
        text: "Programming",
        link: "/programming/",
      },
      {
        text: "Tools and Infrastructure",
        link: "/dev-tools/",
      },
      {
        text: "Technologies",
        link: "/technologies/",
      },
      {
        text: "Projects",
        link: "/projects/",
      },
      {
        text: "Meta",
        link: "/meta/",
      },
    ],
    sidebar: {
      "/programming/": [
        "./",
        {
          title: ".NET",
          children: [
            "dotnet/http-client",
            "dotnet/async",
            "dotnet/equality",
            "dotnet/comparisons",
            "dotnet/generic-host",
            "dotnet/logging",
            "dotnet/configuration",
            "dotnet/records",
            "dotnet/entity-framework",
            {
              title: "ASP.NET Core",
              children: [
                "dotnet/asp-net-core/overview",
                "dotnet/asp-net-core/razor-pages",
                "dotnet/asp-net-core/routing",
                "dotnet/asp-net-core/validation",
                "dotnet/asp-net-core/tips"
              ],
            },
            {
              title: "Functional Programming",
              children: [
                "dotnet/functional/fundamentals",
                "dotnet/functional/dotnet-features",
                "dotnet/functional/signatures",
                "dotnet/functional/composition",
                "dotnet/functional/error-handling",
                "dotnet/functional/partial-application",
                "dotnet/functional/modularity",
              ],
            },
          ],
        },
        {
          title: "JavaScript",
          children: [
            "javascript/oop",
            "javascript/weird-js",
            "javascript/functions",
            "javascript/es-modules",
            "javascript/advanced-vuejs",
            "javascript/nodejs",
            "javascript/axios",
            {
              title: "TypeScript",
              children: [
                "javascript/typescript/env-setup",
                "javascript/typescript/tips",
              ],
            },
            {
              title: "React",
              children: ["javascript/react/routing", "javascript/react/mobx"],
            },
          ],
        },
        {
          title: "Rust",
          children: [
            "rust/overview",
            "rust/cargo",
            "rust/basics",
            "rust/ownership",
            "rust/structs",
            "rust/enums",
            "rust/organization",
            "rust/collections",
            "rust/error-handling",
            "rust/generics",
            "rust/traits",
            "rust/lifetimes",
            "rust/closures",
            "rust/pointers",
            "rust/smart-pointers",
            "rust/concurrency",
            "rust/testing",
            "rust/tips",
          ],
        },
        {
          title: "C/C++",
          children: [
            "c/pointers",
            "c/strings",
            "c/dynamic-memory",
            "c/argc-argv-visualized",
          ],
        },
        {
          title: "CSS",
          children: ["css/layouts"],
        },
        {
          title: "Algorithms",
          children: ["algorithms/big-o", "algorithms/arrays"],
        },
      ],
      "/dev-tools/": [
        "./",
        {
          title: "Linux",
          children: [
            "linux/linux",
            "linux/containers",
            "linux/bash-scripting",
            "linux/lfs",
          ],
        },
        {
          title: "Kubernetes",
          children: [
            "kubernetes/meaning",
            "kubernetes/cluster",
            "kubernetes/dev-env",
            "kubernetes/api",
            "kubernetes/objects",
            "kubernetes/pods",
            "kubernetes/deployments",
            "kubernetes/events",
            "kubernetes/storage",
            "kubernetes/configuration",
            "kubernetes/organization",
            "kubernetes/services",
            "kubernetes/ingress",
            "kubernetes/helm",
          ],
        },
        {
          title: "Git",
          children: ["git/overview"],
        },
        {
          title: "Ansible",
          children: ["ansible/ansible"],
        },
        {
          title: "Azure",
          children: ["azure/azure-table-storage", "azure/identity"],
        },
      ],
      "/technologies/": [
        "./",
        {
          title: "Web Protocols",
          children: [
            "networking/osi-model",
            "networking/tcp",
            "networking/udp",
            "networking/http",
          ],
        },
        {
          title: "Security",
          children: [
            {
              title: "OAuth2",
              children: ["security/oauth2/sender-constraint"],
            },
            {
              title: "Cryptography",
              children: ["security/cryptography/basic-terms"],
            },
            {
              title: "TPM",
              children: [
                "security/tpm/overview",
                "security/tpm/tpm-entities",
                "security/tpm/tpm-operations",
              ],
            },
          ],
        },
        {
          title: "Blockchain",
          children: [
            "blockchain/intro",
            "blockchain/smart-contracts",
            "blockchain/solidity",
            "blockchain/dapps",
          ],
        },
      ],
      "/meta/": ["./", "who-am-i", "cv", "this-website"],
      "/projects/": ["./", "puff", "mjiot", "alpha-img"],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    [
      "sitemap",
      {
        hostname: "https://marcinjahn.com",
      },
    ],
    [
      "@mr-hope/seo",
      {
        author: "Marcin Jahn",
      },
    ],
  ],
};

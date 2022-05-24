const { description } = require("../../package");

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Marcin Jahn | Tech Notebook",
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
    ["meta", { name: "theme-color", content: "#7D84B2" }],
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
    // repo: "marcinjahn/technology-notebook",
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
      {
        title: "cirro.services",
        url: "https://www.cirro.services"
      },
    ],
    nav: [
      {
        text: "Programming",
        link: "/programming/",
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
          img: "dotnet.webp",
          children: [
            "dotnet/http-client",
            {
              title: "Async",
              children: ["dotnet/async/async", "dotnet/async/tips"],
            },
            "dotnet/equality",
            "dotnet/comparisons",
            "dotnet/generic-host",
            "dotnet/logging",
            "dotnet/configuration",
            "dotnet/records",
            "dotnet/grpc",
            "dotnet/platform-invoke",
            {
              title: "ASP.NET Core",
              children: [
                "dotnet/asp-net-core/overview",
                "dotnet/asp-net-core/middleware",
                "dotnet/asp-net-core/razor-pages",
                "dotnet/asp-net-core/razor-pages-routing",
                "dotnet/asp-net-core/web-apis",
                "dotnet/asp-net-core/filters",
                "dotnet/asp-net-core/identity",
                "dotnet/asp-net-core/validation",
                "dotnet/asp-net-core/tips",
              ],
            },
            {
              title: "Entity Framework Core",
              children: [
                "dotnet/entity-framework-core/",
                "dotnet/entity-framework-core/testing",
                "dotnet/entity-framework-core/tips",
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
          img: "javascript.webp",
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
          img: "rust.webp",
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
          img: "c.webp",
          children: [
            "c/classes",
            "c/compilation",
            "c/pointers",
            "c/strings",
            "c/dynamic-memory",
            "c/argc-argv-visualized",
          ],
        },
        {
          title: "CSS",
          img: "css.webp",
          children: ["css/layouts"],
        },
        {
          title: "Unity",
          img: "unity.webp",
          children: ["unity/"],
        },
        {
          title: "Algorithms",
          img: "algorithms.webp",
          children: [
            "algorithms/big-o",
            "algorithms/arrays",
            "algorithms/linked-lists",
            "algorithms/queue",
            "algorithms/hash-table",
            "algorithms/tree",
            "algorithms/sorting",
            "algorithms/searching",
          ],
        },
        {
          title: "Architecture",
          img: "architecture.webp",
          children: [
            "architecture/asp-net-core",
            "architecture/ddd"
          ]
        }
      ],
      "/technologies/": [
        "./",
        {
          title: "Networking",
          img: "network.webp",
          children: [
            "networking/osi-model",
            "networking/tcp",
            "networking/udp",
            "networking/http",
            "networking/hsts",
            "networking/dns",
            "networking/sni",
            "networking/grpc",
          ],
        },
        {
          title: "Security",
          img: "security.webp",
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
          img: "blockchain.webp",
          children: [
            "blockchain/intro",
            "blockchain/smart-contracts",
            "blockchain/solidity",
            "blockchain/dapps",
          ],
        },
        {
          title: "Linux",
          img: "linux.webp",
          children: [
            "linux/gist",
            "linux/system-calls",
            "linux/containers",
            "linux/bash-scripting",
            "linux/lfs",
            "linux/networking"
          ],
        },
        {
          title: "Kubernetes",
          img: "kubernetes.webp",
          children: [
            "kubernetes/meaning",
            "kubernetes/cluster",
            "kubernetes/dev-env",
            "kubernetes/api",
            "kubernetes/objects",
            "kubernetes/pods",
            "kubernetes/scaling",
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
          title: "SQL Server",
          img: "sql-server.webp",
          children: ["sql-server/", "sql-server/t-sql"],
        },
        {
          title: "MongoDB",
          img: "mongodb.webp",
          children: [
            "mongodb/nosql",
            "mongodb/mongo-overview",
            "mongodb/crud",
            "mongodb/free-text-search",
          ],
        },
        {
          title: "Git",
          img: "git.webp",
          children: ["git/overview"],
        },
        {
          title: "Ansible",
          img: "ansible.webp",
          children: ["ansible/ansible"],
        },
        {
          title: "Azure",
          img: "azure.webp",
          children: ["azure/azure-table-storage", "azure/identity"],
        },
        {
          title: "Google Cloud",
          img: "gcp.webp",
          children: ["google-cloud/overview"],
        },
      ],
      "/meta/": ["./", "who-am-i", "cv", "this-website"],
      "/projects/": [
        "./",
        "feedback-panel-vuepress-plugin",
        "puff",
        "nand2tetris-implementation",
        "alpha-img",
        "mjiot",
        "io-module",
      ],
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
    "mermaidjs",
    "tabs"
  ]
};

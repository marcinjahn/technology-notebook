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
  base: "/knowledge-website/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
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
    repo: "marcinjahn/knowledge-website",
    repoLabel: "Code on GitHub",
    docsBranch: "main",
    docsDir: "src/docs",
    editLinks: true,
    editLinkText: "Feel free to contribute to this article!",
    lastUpdated: "Last Updated",
    externalServices: [
      {
        img: "/img/linkedin.webp",
        url: "https://www.linkedin.com/in/marcin-jahn-63a9b915b",
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
        text: "Dev Tools",
        link: "/dev-tools/",
      },
      {
        text: "Computers",
        link: "/computers/",
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
            "dotnet/asp-net",
            "dotnet/entity-framework.md",
            "dotnet/asp-net-validation",
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
            "rust/traits",
          ],
        },
        {
          title: "CSS",
          children: ["css/layouts"],
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
            "kubernetes/services",
            "kubernetes/events",
            "kubernetes/storage",
            "kubernetes/configuration",
            "kubernetes/organization",
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
          children: ["azure/azure-table-storage"],
        },
      ],
      "/computers/": [
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
            "security/basic-terms",
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
      ],
      "/meta/": ["./", "who-am-i", "cv", "this-website"],
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
  ],
};

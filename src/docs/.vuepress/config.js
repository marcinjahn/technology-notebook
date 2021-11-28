const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Marcin Jahn - Personal Knowledge Base',
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
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Programming',
        link: '/programming/',
      },
      {
        text: 'Dev Tools',
        link: '/dev-tools/'
      },
      {
        text: 'Networking',
        link: '/networking/'
      }
    ],
    sidebar: {
      '/programming/': [
        './',
        {
          title: 'Programming',
          children: [
            {
              title: '.NET',
              children: [
                'dotnet/http-client',
                'dotnet/async',
                'dotnet/equality',
                'dotnet/comparisons',
                'dotnet/generic-host',
                'dotnet/logging',
                'dotnet/configuration',
                'dotnet/asp-net',
                'dotnet/entity-framework.md',
                'dotnet/asp-net-validation'
              ]
            },
            {
              title: 'JavaScript',
              children: [
                'javascript/oop',
                'javascript/weird-js',
                'javascript/functions',
                'javascript/es-modules',
                'javascript/advanced-vuejs',
                'javascript/nodejs',
                'javascript/axios',
                {
                  title: 'TypeScript',
                  children: [
                    'javascript/typescript/env-setup',
                    'javascript/typescript/tips'
                  ]
                },
                {
                  title: 'React',
                  children: [
                    'javascript/react/routing',
                    'javascript/react/mobx'
                  ]
                }
              ]
            },
            {
              title: 'Rust',
              children: [
                'rust/overview',
                'rust/cargo',
                'rust/basics'
              ]
            },
            {
              title: 'CSS',
              children: [
                'css/layouts'
              ]
            }
          ]
        }
      ],
      '/dev-tools/': [
        './',
        {
          title: 'Linux',
          children: [
            'linux/linux',
            'linux/containers',
            'linux/bash-scripting',
            'linux/lfs'
          ]
        },
        {
          title: 'Kubernetes',
          children: [
            'kubernetes/meaning',
            'kubernetes/cluster',
            'kubernetes/dev-env',
            'kubernetes/api',
            'kubernetes/objects',
            'kubernetes/pods',
            'kubernetes/deployments',
            'kubernetes/services',
            'kubernetes/events',
            'kubernetes/storage',
            'kubernetes/configuration',
            'kubernetes/organization'
          ]
        },
        {
          title: 'Git',
          children: [
            'git/overview'
          ]
        },
        {
          title: 'Ansible',
          children: [
            'ansible/ansible'
          ]
        },
        {
          title: 'Azure',
          children: [
            'azure/azure-table-storage'
          ]
        }
      ],
      '/networking/': [
        './',
        {
          title: 'Web Protocols',
          children: [
            'osi-model',
            'tcp',
            'udp',
            'http'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}

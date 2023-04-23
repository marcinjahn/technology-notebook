export interface SidebarItem {
    title: string;
    icon?: string;
    children: (string | SidebarItem)[];
}

export interface Sidebar {
    [key: string]: (SidebarItem | string)[];
}

const structure: Sidebar = {
    "/programming/": [
        {
            title: ".NET",
            icon: "dotnet.webp",
            children: [
                "dotnet/http-client",
                {
                    title: "Async",
                    children: ["dotnet/async", "dotnet/async/tips"],
                },
                "dotnet/equality",
                "dotnet/comparisons",
                "dotnet/enumerable",
                "dotnet/unit-tests",
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
                        "dotnet/entity-framework-core",
                        "dotnet/entity-framework-core/testing",
                        "dotnet/entity-framework-core/tips",
                    ],
                },
            ],
        },
        {
            title: "Angular",
            icon: "angular.webp",
            children: [
                "angular/overview",
                "angular/components",
                "angular/directives",
                "angular/services",
                "angular/routing",
                "angular/observables",
                "angular/forms",
                "angular/pipes",
                "angular/http",
                "angular/modules",
                "angular/ngrx",
                "angular/angular-universal",
                "angular/tips",
                "angular/standalone-components",
            ],
        },
        {
            title: "JavaScript",
            icon: "javascript.webp",
            children: [
                "javascript/oop",
                "javascript/weird-js",
                "javascript/functions",
                "javascript/es-modules",
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
                    children: [
                        "javascript/react/routing",
                        "javascript/react/mobx",
                    ],
                },
                "javascript/advanced-vuejs",
            ],
        },
        {
            title: "Rust",
            icon: "rust.webp",
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
            icon: "c.webp",
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
            title: "GTK",
            icon: "gtk.webp",
            children: ["gtk/overview", "gtk/gjs"],
        },
        {
            title: "CSS",
            icon: "css.webp",
            children: ["css/responsive-design", "css/tips", "css/pixels"],
        },
        {
            title: "Unity",
            icon: "unity.webp",
            children: ["unity"],
        },
        {
            title: "Functional Programming",
            icon: "lambda.webp",
            children: [
                "functional-programming/fundamentals",
                "functional-programming/dotnet-features",
                "functional-programming/signatures",
                "functional-programming/composition",
                "functional-programming/error-handling",
                "functional-programming/partial-application",
                "functional-programming/modularity",
                {
                    title: "Category Theory",
                    children: [
                        "functional-programming/category-theory/overview",
                        "functional-programming/category-theory/monoid",
                    ],
                },
            ],
        },
        {
            title: "Algorithms",
            icon: "algorithms.webp",
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
            icon: "architecture.webp",
            children: [
                "architecture/basics",
                "architecture/ddd",
                "architecture/asp-net-core",
            ],
        },
    ],
    "/technologies/": [
        {
            title: "Networking",
            icon: "network.webp",
            children: [
                "networking/http",
                "networking/osi-model",
                "networking/tcp",
                "networking/udp",
                "networking/websocket",
                "networking/hsts",
                "networking/dns",
                "networking/sni",
                "networking/grpc",
            ],
        },
        {
            title: "Security",
            icon: "security.webp",
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
            title: "Linux",
            icon: "linux.webp",
            children: [
                "linux/gist",
                "linux/system-calls",
                "linux/selinux",
                "linux/containers",
                "linux/bash-scripting",
                "linux/lfs",
                "linux/networking",
            ],
        },
        {
            title: "Kubernetes",
            icon: "kubernetes.webp",
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
            title: "Observability",
            icon: "observability.webp",
            children: ["observability/tracing"],
        },
        {
            title: "SQL Server",
            icon: "sql-server.webp",
            children: ["sql-server", "sql-server/t-sql"],
        },
        {
            title: "MongoDB",
            icon: "mongodb.webp",
            children: [
                "mongodb/nosql",
                "mongodb/mongo-overview",
                "mongodb/crud",
                "mongodb/free-text-search",
            ],
        },
        {
            title: "Git",
            icon: "git.webp",
            children: ["git/overview"],
        },
        {
            title: "Ansible",
            icon: "ansible.webp",
            children: ["ansible/ansible"],
        },
        {
            title: "Azure",
            icon: "azure.webp",
            children: ["azure/azure-table-storage", "azure/identity"],
        },
        {
            title: "Google Cloud",
            icon: "gcp.webp",
            children: ["google-cloud/overview"],
        },
        {
            title: "Blockchain",
            icon: "blockchain.webp",
            children: [
                "blockchain/intro",
                "blockchain/smart-contracts",
                "blockchain/solidity",
                "blockchain/dapps",
            ],
        },
    ],
    "/about/": ["who-am-i", "cv", "this-website"],
    "/projects/": [
        "open-multiple-links-browser-extension",
        "feedback-panel-vuepress-plugin",
        "puff",
        "nand2tetris-implementation",
        "alpha-img",
        "mjiot",
        "io-module",
    ],
};

export default structure;

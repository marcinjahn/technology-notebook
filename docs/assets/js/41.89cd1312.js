(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{448:function(e,t,a){"use strict";a.r(t);var n=a(31),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"about-this-website"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#about-this-website"}},[e._v("#")]),e._v(" About This Website")]),e._v(" "),a("p",[e._v("I have created "),a("a",{attrs:{href:"https://marcinjahn.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("marcinjahn.com"),a("OutboundLink")],1),e._v(" because I needed a place\nto store various notes that I create while learning/working. I use many sources\n(books, videos, tutorials) to find valuable knowledge. Anytime I learn a new\ntechnology, I like to note down key points that I can later use to remind myself\nwhat it's all about. The notes are not too detailed, because that's not their\npurpose. The details can be found in the source material, while the notes\ncontain the gist of it. Don't treat it as a learning material, it's rather a\nsummary of what a given technology has to offer.")]),e._v(" "),a("p",[e._v("I find these notes to be quite useful since I tend to easily forget various\nconcepts if I don't use them in a week or more.")]),e._v(" "),a("p",[e._v("I have gone through other solutions that took me to a conclusion that I actually\nneed a website. In the past I had used the following approaches:")]),e._v(" "),a("ul",[a("li",[e._v("pen and paper - initially, I noted all stuff in a paper notebook. It would be\nperfect if only it was easy to add information in between of what I had\nalready noted. I could use a tablet for it, but somehow I find writing or\nreading using a tablet to be a rather bad experience. When I really am out of\nideas of what to do, I transfer these notes to a digital form (and they land\non this website)")]),e._v(" "),a("li",[a("a",{attrs:{href:"https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app",target:"_blank",rel:"noopener noreferrer"}},[e._v("OneNote"),a("OutboundLink")],1),e._v(" "),a("ul",[a("li",[e._v("good for notes in general, but not great for programmer notes.")])])]),e._v(" "),a("li",[a("a",{attrs:{href:"https://boostnote.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Boost Note"),a("OutboundLink")],1),e._v(" - I used it briefly, at the time the Free\ntier had some limitations regarding tagging that were a pain to live with.")]),e._v(" "),a("li",[a("a",{attrs:{href:"https://hackmd.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("HackMD"),a("OutboundLink")],1),e._v(" - cool markdown notebook, but the organization of\npages was not ideal. I couldn't organize notes in a way that I wsanted.")])]),e._v(" "),a("p",[e._v("Since none of the above worked for me, I have decided to build something myself.\nInstead of creating an actual note-taking app I realized that a simple website\nwith markdown documents is all I need! Other than the simplicity, I also get the\nfollowing:")]),e._v(" "),a("ul",[a("li",[e._v("a developer experience - each update of my notes is a git commit.")]),e._v(" "),a("li",[e._v("a personal website - as an addtional result, I'd have my own website, like all\nthe other cool kids out there! It's not a blog though, I'm too lazy for that.")]),e._v(" "),a("li",[e._v("a small project to experiment with - building something in your free time is\ndifficult to have motivation for if you don't really see any use for it\nrealistically. Building a website that I actually am going to use (I read my\nnotes!) gives me a motivation to work on it. Together with that comes\nmotivation to play a bit more with various technologies (like Kubernetes).")])]),e._v(" "),a("h2",{attrs:{id:"code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#code"}},[e._v("#")]),e._v(" Code")]),e._v(" "),a("p",[e._v("This site is open-source. You can find the source code and K8s manifests on\n"),a("a",{attrs:{href:"https://github.com/marcinjahn/knowledge-website",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"technologies"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#technologies"}},[e._v("#")]),e._v(" Technologies")]),e._v(" "),a("h3",{attrs:{id:"frontend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontend"}},[e._v("#")]),e._v(" Frontend")]),e._v(" "),a("p",[e._v("The website is built using "),a("a",{attrs:{href:"https://vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("VuePress"),a("OutboundLink")],1),e._v(". It's a great\nstatic site generator that turns markdown into HTML, CSS, and JS that in the end\nloads up in your web browser. It's really easy to use and powerful when needed.\nFor the needs of this website I've developed my own theme based on the default\none provided in the package.")]),e._v(" "),a("h3",{attrs:{id:"backend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backend"}},[e._v("#")]),e._v(" Backend")]),e._v(" "),a("h4",{attrs:{id:"kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes"}},[e._v("#")]),e._v(" Kubernetes")]),e._v(" "),a("p",[e._v("I use "),a("a",{attrs:{href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes"),a("OutboundLink")],1),e._v(", or more specifically "),a("a",{attrs:{href:"https://azure.microsoft.com/en-us/services/kubernetes-service/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure\nKubernetes Service\n(AKS)"),a("OutboundLink")],1),e._v(", to host\nand manage various components that the project is composed of. The nodes are\nautomatically scaled keeping the cost as low as possible.")]),e._v(" "),a("p",[e._v("I used "),a("a",{attrs:{href:"https://kubernetes.github.io/ingress-nginx/",target:"_blank",rel:"noopener noreferrer"}},[e._v("NGINX Ingrss Controller"),a("OutboundLink")],1),e._v(" to\nexpose the website publicly.")]),e._v(" "),a("p",[e._v("For TLS needs, I installed "),a("a",{attrs:{href:"https://cert-manager.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("cert-manager"),a("OutboundLink")],1),e._v(" (using\n"),a("a",{attrs:{href:"https://helm.sh/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Helm"),a("OutboundLink")],1),e._v("). It has automatically set up "),a("a",{attrs:{href:"https://letsencrypt.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Let's\nEncrypt"),a("OutboundLink")],1),e._v(" certificate for my site and it renews it\nperiodically.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Overkill?")]),e._v(" "),a("p",[e._v("Going with Kubernetes is definitely an overkill for a website like this one. It\nwould be much more logical to go with something like "),a("a",{attrs:{href:"https://azure.microsoft.com/en-us/services/app-service/static/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Azure Static Web\nApps"),a("OutboundLink")],1),e._v(" (especially in cost, management, and ease of starting out areas). In my\ncase though, I already had a K8s cluster that I use for various other projects.\nAdding this site to it was quite reasonable.")])]),e._v(" "),a("p",[e._v("The DNS records are managed via "),a("a",{attrs:{href:"https://www.namecheap.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("NameCheap"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("The website has a CI/CD workflow defined using "),a("a",{attrs:{href:"https://docs.github.com/en/actions",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub\nActions"),a("OutboundLink")],1),e._v(". In order to make any change, all I\nhave to do is push a commit to the "),a("em",[e._v("main")]),e._v(" branch of my\n"),a("a",{attrs:{href:"https://github.com/marcinjahn/knowledge-website",target:"_blank",rel:"noopener noreferrer"}},[e._v("repository"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"github-pages"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-pages"}},[e._v("#")]),e._v(" GitHub Pages")]),e._v(" "),a("p",[e._v("Due to the fact that my K8s cluster is used for various experiments, it might\nstop working sometimes (also, I might run out of Azure credit in a given month\n😐). Since a notebook that is accessible a bit randomly is not what I wanted, I\ndecided to host the website somewhere else as a backup. Since the page's source\ncode is already on GitHub I decided to go with "),a("a",{attrs:{href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub\nPages"),a("OutboundLink")],1),e._v(" for this purpose. I have a separate GitHub\nActions workflow defined that automatically builds the artifacts from the "),a("em",[e._v("main")]),e._v("\nbranch and places them on a "),a("a",{attrs:{href:"https://github.com/marcinjahn/technology-notebook/tree/gh-pages",target:"_blank",rel:"noopener noreferrer"}},[e._v("separate\nbranch"),a("OutboundLink")],1),e._v(" that is\nconfigured to be a source of data for the GitHub Pages hosting.")]),e._v(" "),a("p",[e._v("Both the AKS and the GitHub Pages IPs are configured for my domain, so when\nvisiting "),a("a",{attrs:{href:"marcinjahn.com"}},[e._v("https://marcinjahn.com")]),e._v(" you might get the bits from\neither one of these randomly.")])])}),[],!1,null,null,null);t.default=o.exports}}]);
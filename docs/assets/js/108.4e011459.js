(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{558:function(e,t,o){"use strict";o.r(t);var s=o(31),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"http-protocol"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#http-protocol"}},[e._v("#")]),e._v(" HTTP Protocol")]),e._v(" "),o("h2",{attrs:{id:"simple-implementation"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#simple-implementation"}},[e._v("#")]),e._v(" Simple Implementation")]),e._v(" "),o("p",[e._v("HTTP is all about sending appropriately formatted messages over TCP (unless\nHTTP/3 is used). The simplest HTTP server below shows it quite well:")]),e._v(" "),o("p",[e._v("https://medium.com/from-the-scratch/http-server-what-do-you-need-to-know-to-build-a-simple-http-server-from-scratch-d1ef8945e4fa")]),e._v(" "),o("h2",{attrs:{id:"versions"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#versions"}},[e._v("#")]),e._v(" Versions")]),e._v(" "),o("p",[o("strong",[e._v("HTTP/1.0")]),e._v(" was establishing a separate TCP connection per each request -\nexpensive - every CSS, image, etc. of a website had to be fetched through a\nseparate TCP connection.")]),e._v(" "),o("p",[o("strong",[e._v("HTTP/1.1")]),e._v(" introduced:")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Host")]),e._v(" header containing the target domain. Without this, proxies could not\nwork (they wouldn't know where to send the request)")]),e._v(" "),o("li",[o("code",[e._v("keep-alive")]),e._v(" header, which reused a connection when loading content\n("),o("em",[e._v("persisted TCP connection")]),e._v("). The server understands it and keeps the TCP\nconnection open")]),e._v(" "),o("li",[o("code",[e._v("ETag")]),e._v(" caching.")]),e._v(" "),o("li",[o("em",[e._v("Streaming")]),e._v(" of content.")])]),e._v(" "),o("p",[o("strong",[e._v("HTTP/2")]),e._v(" introduced:")]),e._v(" "),o("ul",[o("li",[e._v("compression")]),e._v(" "),o("li",[e._v("multiplexing - client joins his requests into one request")]),e._v(" "),o("li",[e._v("always HTTPS (TLS)")]),e._v(" "),o("li",[e._v("ALPN - negotiates protocol during the TLS handshake")])]),e._v(" "),o("p",[o("strong",[e._v("HTTP/3")]),e._v(" introduced:")]),e._v(" "),o("ul",[o("li",[e._v("uses QUIC (UDP with Congestion control) instead of TCP, making the amount of\ncommunication much smaller, resulting in reduced latencies.")])]),e._v(" "),o("h2",{attrs:{id:"browser-storage"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#browser-storage"}},[e._v("#")]),e._v(" Browser Storage")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://i.imgur.com/UXLpHD2.png",alt:""}})]),e._v(" "),o("p",[e._v("The main diference is that cookies are sent to servers, while localStorage and\nsessionStorage stay on the client only. Also, localStorage stays in forever.")]),e._v(" "),o("h2",{attrs:{id:"proxying"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#proxying"}},[e._v("#")]),e._v(" Proxying")]),e._v(" "),o("h3",{attrs:{id:"http-proxy"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#http-proxy"}},[e._v("#")]),e._v(" HTTP Proxy")]),e._v(" "),o("p",[e._v("It needs to be configured on the client. When I send any HTTP request, it's\ngoing to be modified in a layer 3. The IP address will be set to the IP address\nof the proxy. The proxy will receive my request (on TCP connection 1), and by\ninspecting the layer 7 data it will see what request I wanted to make. It will\ncreate another TCP connection (with the target server), get the data, and send\nit back to me (on TCP connection 1). The target server does not know that the\nclient was behind a proxy.")]),e._v(" "),o("p",[e._v("Reference: https://www.youtube.com/watch?v=x4E4mbobGEc")]),e._v(" "),o("h3",{attrs:{id:"https-proxy"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#https-proxy"}},[e._v("#")]),e._v(" HTTPS Proxy")]),e._v(" "),o("p",[e._v("The proxy needs to see what domain we want to access. This information is\ndecrypted though. To go around that, the proxy needs to offer TLS termination\nand provide a certificate that the client needs to trust.")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://i.imgur.com/vdj2Ebz.png",alt:""}})]),e._v(" "),o("p",[e._v("Reference: https://www.youtube.com/watch?v=PAJ5kK50qp8")]),e._v(" "),o("h3",{attrs:{id:"http-connect-proxy"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#http-connect-proxy"}},[e._v("#")]),e._v(" HTTP CONNECT proxy")]),e._v(" "),o("ol",[o("li",[e._v("First, a client sends HTTP CONNECT to the proxy with domain of the target\nserver.")]),e._v(" "),o("li",[e._v("The proxy establishes a TCP connection with the target server and returns\nsuccess to the client")]),e._v(" "),o("li",[e._v("For any packet sent from the client to the proxy, proxy hanges the source IP\nto itself and sends this packet via the previouslu established TCP connection\nto the target server.")]),e._v(" "),o("li",[e._v("Any response from the target server gets its source IP modified to the\nproxy's IP and sent back to the client.")])]),e._v(" "),o("p",[e._v("The communication is end-to-end, the proxy does not see the encrypted content.\nTe proxy knows only the domain we're communicating with.")]),e._v(" "),o("p",[e._v("Proxies may be chained, so that a proxy has its own proxy:")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://i.imgur.com/J7mOhkO.png",alt:""}})]),e._v(" "),o("h2",{attrs:{id:"enforcing-https"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#enforcing-https"}},[e._v("#")]),e._v(" Enforcing HTTPS")]),e._v(" "),o("p",[e._v("There are at least two ways to enforce HTTPS:")]),e._v(" "),o("ul",[o("li",[e._v("Redirect from HTTP to HTTPS on your server")]),e._v(" "),o("li",[e._v("Use HSTS - it's a header that informs the browser to ALWAYS use HTTPS when\nreaching the app.")])]),e._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[e._v("ASP.NET Core")]),e._v(" "),o("p",[e._v("ASP.NET Core has built-in middleware for both of the points above.")])]),e._v(" "),o("p",[e._v("HSTS should be used only if we do not plan to make use of HTTP in the app.\nOtherwise we can make it impossible for the users to reach the HTTP endpoints.")]),e._v(" "),o("p",[e._v("HSTS should not be used in development.")])])}),[],!1,null,null,null);t.default=n.exports}}]);
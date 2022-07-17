(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{529:function(t,e,a){"use strict";a.r(e);var s=a(22),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"middleware-in-asp-net-core"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#middleware-in-asp-net-core"}},[t._v("#")]),t._v(" Middleware in ASP.NET Core")]),t._v(" "),a("p",[t._v("The "),a("strong",[t._v("middleware")]),t._v(" are C# classes or functions that handle HTTP requests and\nresponses. They are chained together, forming a pipeline, similarly to how\n"),a("code",[t._v("HTTPHandler")]),t._v("s can be chained in an "),a("code",[t._v("HTTPClient")]),t._v(".")]),t._v(" "),a("p",[t._v("All the requests pass through the middleware, so it's the right place to handle\ncommon cross-cutting concerns. The middleware can process the request/response,\noptionally modify it and pass on in the pipeline.")]),t._v(" "),a("p",[t._v("Requests/responses travel through the pipeline as "),a("code",[t._v("HttpContext")]),t._v(" objects that can\nbe modified.")]),t._v(" "),a("p",[t._v("Middleware components should be small and handle just one responsibility.")]),t._v(" "),a("p",[t._v("Middleware can short-circuit the request causing it not to be passed to the\nmiddleware parts behind it. If some middleware receives a request, it will also\nreceive a response going back.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("404")]),t._v(" "),a("p",[t._v("ASP.NET Core adds a middleware returning "),a("code",[t._v("404")]),t._v(" in the end of the pipeline.\nIf none of our middleware handles the requests, that "),a("code",[t._v("404")]),t._v(" one handles it.")])]),t._v(" "),a("p",[t._v("Middleware is added to the "),a("code",[t._v("WebApplication")]),t._v(" (.NET 6) or to the\n"),a("code",[t._v("IApplicationBuilder")]),t._v(" (prior to .NET 6).")]),t._v(" "),a("p",[t._v("In general, middleware is added like this:")]),t._v(" "),a("div",{staticClass:"language-cs extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token generic-method"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseMiddleware")]),a("span",{pre:!0,attrs:{class:"token generic class-name"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("WelcomePageMiddleware"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Often, middleware comess with extension methods that are more readable:")]),t._v(" "),a("div",{staticClass:"language-cs extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseWelcomePage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// calls the above behind the scenes")]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Use")]),t._v(" "),a("p",[t._v("Methods starting with "),a("code",[t._v("Use")]),t._v(" are a convention for adding middleware.")])]),t._v(" "),a("h2",{attrs:{id:"errors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#errors"}},[t._v("#")]),t._v(" Errors")]),t._v(" "),a("p",[t._v("The error handling should be added to the pipeline as early as possible to\nhandle all errors. Useful middleware:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("DeveloperExceptionPageMiddleware")]),t._v(" - displays stacktrace of an exception")]),t._v(" "),a("li",[a("code",[t._v("ExceptionHandlerMiddleware")]),t._v(" - alternative to the above, more suitable for\nproduction")]),t._v(" "),a("li",[a("code",[t._v("StatusCodePagesMiddleware")]),t._v(" - transforms raw error codes into some meaningful\nerror-pages, it can redirect to different pages for different errors. It\nexecutes only if response payload is empty, making it possible to use it\ntogether with the "),a("code",[t._v("ExceptionHandlerMiddleware")]),t._v(".")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Error Loop")]),t._v(" "),a("p",[t._v("In case of an exception, the "),a("code",[t._v("ExceptionHandlerMiddleware")]),t._v(" reexecutes the\nmiddleware pipeline by redirecting to "),a("code",[t._v("/Error")]),t._v(" (redirecting internally, not with\n30X). If during that redirection another exeption is thrown, a raw error will be\nreturned to the user.")])]),t._v(" "),a("h2",{attrs:{id:"endpointmiddleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#endpointmiddleware"}},[t._v("#")]),t._v(" EndpointMiddleware")]),t._v(" "),a("p",[t._v("The actual content is generated by various "),a("code",[t._v("EndpointMiddleware")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"branching"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#branching"}},[t._v("#")]),t._v(" Branching")]),t._v(" "),a("p",[t._v("Normally, middleware pipeline is a single line of components that execute one\nafter another. We can change that and create branches where some requests go one\nway, while others go another way. We use "),a("code",[t._v("Map")]),t._v(" for that.")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseDeveloperExceptionPage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// always runs")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/branch"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" builder "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    builder"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseExceptionHandler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// executed only for paths starting with /branch")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// always execute")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseStaticFiles")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("UseRouting")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("MapRazorPages")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"middleware-endpoints"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#middleware-endpoints"}},[t._v("#")]),t._v(" Middleware Endpoints")]),t._v(" "),a("p",[t._v("We can create simple endpoints in middleware with the "),a("code",[t._v("Run")]),t._v(" extension method:")]),t._v(" "),a("div",{staticClass:"language-csharp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-csharp"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Run")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" context "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ContentType "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text/plain"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("WriteAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"some content"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);
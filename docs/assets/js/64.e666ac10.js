(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{507:function(t,s,n){"use strict";n.r(s);var a=n(31),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"error-handling"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#error-handling"}},[t._v("#")]),t._v(" Error Handling")]),t._v(" "),n("p",[t._v("In imperative programs, it's normal to see "),n("code",[t._v("throw")]),t._v(" statements or "),n("code",[t._v("try/catch")]),t._v(".\nExceptions are discouraged in FP. Instead, the return value of a function should\ncontain information about the possible error. It's very similar to Rust's\n"),n("code",[t._v("Result<T,E>")]),t._v(".")]),t._v(" "),n("p",[t._v("In FP, the "),n("code",[t._v("Either")]),t._v(" type is used to signal that an operation can potentially\nfail. It's quite similar to "),n("code",[t._v("Option<T>")]),t._v('. The difference is that the "bad" case\nmay return an additional payload, unlike '),n("code",[t._v("None")]),t._v(" that doesn't bear any additional\ninformation on why "),n("code",[t._v("None")]),t._v(" was returned.")]),t._v(" "),n("p",[n("code",[t._v("Either")]),t._v(" has two possible variants:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("Left<L>")]),t._v(" - failure")]),t._v(" "),n("li",[n("code",[t._v("Right<R>")]),t._v(" - success")])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("Where")]),t._v(" "),n("p",[t._v("Among the typical FP functions ("),n("code",[t._v("Map")]),t._v(", "),n("code",[t._v("Bind")]),t._v(", "),n("code",[t._v("Where")]),t._v(", etc.), the "),n("code",[t._v("Where")]),t._v("\nfunction is not applicable to "),n("code",[t._v("Either")]),t._v(". That's because "),n("code",[t._v("Where")]),t._v(" only accepts a\npredicate that returns a boolean. It is unable to create a proper "),n("code",[t._v("Left<L>")]),t._v(". A\nworkaround is to use "),n("code",[t._v("Bind")]),t._v(" with a function that either returns "),n("code",[t._v("Right<R>")]),t._v(" or\n"),n("code",[t._v("Left<L>")])]),t._v(" "),n("div",{staticClass:"language-csharp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-csharp"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("person"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("CheckAge"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// with Option<T> it'd be .Where(HasRightAge)")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Greet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LetIn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token return-type class-name"}},[t._v("Either"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("Rejection"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Person"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("CheckAge")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),t._v(" p"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("person"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Age "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" p"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constructor-invocation class-name"}},[t._v("Rejection")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Age less than 18"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),n("h2",{attrs:{id:"checking-for-errors"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#checking-for-errors"}},[t._v("#")]),t._v(" Checking For Errors")]),t._v(" "),n("p",[t._v("Typically, "),n("code",[t._v("Either")]),t._v("-based flows follow a track where each function may either\nsucceed or fail. At the end of the flow, the failure scenario should be checked.")]),t._v(" "),n("div",{staticClass:"language-csharp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-csharp"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("person"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("CheckAge"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// with Option<T> it'd be .Where(HasRightAge)")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Greet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Bind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("LetIn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Match")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token named-parameter punctuation"}},[t._v("Right")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" _ "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token named-parameter punctuation"}},[t._v("Left")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" rejection "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" \n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("LogRejection")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rejection"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// impure function")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("Left track")]),t._v(" "),n("p",[t._v("Once any of the functions returns "),n("code",[t._v("Left<T>")]),t._v(' there is no way back to the "right"\ntrack.')])]),t._v(" "),n("h2",{attrs:{id:"error-types"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#error-types"}},[t._v("#")]),t._v(" Error Types")]),t._v(" "),n("p",[t._v('There should be a special type for the "left" (error) scenario. We could have a\nsimple base '),n("code",[t._v("Error")]),t._v(" with all necessary properties (like "),n("code",[t._v("string Message")]),t._v(") and,\nwhen needed, we could create derived error types. Such error types could contain\npredefined error messages for convenience.")]),t._v(" "),n("div",{staticClass:"language-csharp extra-class"},[n("pre",{pre:!0,attrs:{class:"language-csharp"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("record")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("UserDoesntExist")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"The provided username does not exist"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[t._v("Custom error types help to establish a domain, they give a good overview of\npossible errors.")])]),t._v(" "),n("h2",{attrs:{id:"throwing-exceptions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#throwing-exceptions"}},[t._v("#")]),t._v(" Throwing Exceptions")]),t._v(" "),n("p",[t._v("It is OK to throw exceptions when something is wrong in the program logic. In\nsuch a case, an exception is a clear sign that some code needs to be fixed.")]),t._v(" "),n("p",[t._v("Additionally, throwing exceptions is alright during the initialization. In\ninitialization requires connecting to some message bus and that connection\nfails, it's an exceptional situation and the progrm should probably terminate.")])])}),[],!1,null,null,null);s.default=e.exports}}]);
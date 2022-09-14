(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{521:function(t,s,a){"use strict";a.r(s);var n=a(22),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"ngrx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ngrx"}},[t._v("#")]),t._v(" NgRx")]),t._v(" "),a("p",[t._v("NgRx is a framework for managing application state. Without it, our apps would\ntypically:")]),t._v(" "),a("ul",[a("li",[t._v("manage app state via services;")]),t._v(" "),a("li",[t._v("services would be accessed from various components;")]),t._v(" "),a("li",[t._v("there would be no control over state mutations.")])]),t._v(" "),a("p",[t._v("NgRx is an Angular version of Redux - React's state management framework. It\nmakes use of RxJS making the state observable.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("NgRx is an overkill for smaller applications.")])]),t._v(" "),a("h2",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" i @ngrx/store\n\n")])])]),a("h2",{attrs:{id:"building-blocks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#building-blocks"}},[t._v("#")]),t._v(" Building Blocks")]),t._v(" "),a("p",[t._v("NgRx exposes three main types of entities:")]),t._v(" "),a("ul",[a("li",[t._v("store")]),t._v(" "),a("li",[t._v("reducers")]),t._v(" "),a("li",[t._v("actions")])]),t._v(" "),a("p",[t._v("There is one store, but there are many actions and reducers:")]),t._v(" "),a("ul",[a("li",[t._v("each entity type will have its own reducer (e.g. Products or Users will have\ntheir own reducers)")]),t._v(" "),a("li",[t._v("each entity type will have 1 or more actions (e.g. Product will have\nAddProduct, UpdateProduct, while Users will have AddUser, RemoveUser, etc.)")])]),t._v(" "),a("h3",{attrs:{id:"actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#actions"}},[t._v("#")]),t._v(" Actions")]),t._v(" "),a("p",[t._v("Actions are the atomic operations that we want to apply on our state. Things\nsuch as adding, modifying, deleting data from our state is exposed via actions.\nEach action is a separate class, with its own data. Additionally, each action\nhas its own "),a("code",[t._v("type")]),t._v(". That type is used to inform a reducer about the kind of\naction that we want to execute.")]),t._v(" "),a("p",[t._v("Since actions are typically small, it's OK to keep them all in one file. Here's\nan example:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// action types")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_PRODUCT")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ADD_INGREDIENT'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_PRODUCTS")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'ADD_INGREDIENTS'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// actions")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AddProduct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Action")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" type "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_INGREDIENT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// comes with the Action interface")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// optional data")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" payload"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AddProducts")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Action")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v(" type "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_INGREDIENTS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" payload"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// such a union type makes the reducer's code more succinct")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ProductsActions")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" AddIngredient "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" AddIngredients"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("Actions are "),a("strong",[t._v("dispatched")]),t._v(", as we will see a bit later. Actions are a bit\nsimilar to DTO objects. Some actor wants to do something with the store, so it\ncreates a new "),a("code",[t._v("Action")]),t._v(" instance and dispatches it to the store (to be handled by\na reducer).")]),t._v(" "),a("h3",{attrs:{id:"reducers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reducers"}},[t._v("#")]),t._v(" Reducers")]),t._v(" "),a("p",[t._v("Reducers handle actions. A single reducer will handle all the actions of a\nspecific entity kind (like a Product).")]),t._v(" "),a("p",[t._v("Typically, reducer will be use a "),a("code",[t._v("switch-case")]),t._v(". Here's an example:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// a typical import grouping all actions under one object")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" ProductsCatalogActions "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./products.actions"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// a type of ProductsCatalog state")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("State")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  products"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  selectedProduct"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Product\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// optional initial state")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" initialState"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" State "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  products"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Product")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Book'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Ingredient")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Steam Deck'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  selectedProduct"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the actual reducer is a function")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("productsCatalogReducer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  state"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" State "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" initialState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// reducer will be called by Angular on init with null state, so initialStae will jump in")]),t._v("\n  action"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ProductsCatalogActions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ProductsActions "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// our union type")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// handles each action")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" ProductsActions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_PRODUCT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        products"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("products"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("payload "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" ProductsActions"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ADD_PRODUCTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        products"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("products"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("payload"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// the initial call (invoked by Angular) will not have any action.type, we return the initialState here")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("State Modifications")]),t._v(" "),a("p",[t._v("Reducer should always return new object(s). Modifications of existing state are\nforbidden!")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("Union Type")]),t._v(" "),a("p",[t._v("TypeScript's union type that groups all the actions makes the type recognition\ngreat with "),a("code",[t._v("switch-case")]),t._v(" or "),a("code",[t._v("if-else")]),t._v(". The compiler automatically infers the\ntype of "),a("code",[t._v("action.payload")]),t._v(" based on the "),a("code",[t._v("case")]),t._v(" that we're currently in.\nWe don't need to manually cast anything.")])]),t._v(" "),a("h3",{attrs:{id:"store-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#store-type"}},[t._v("#")]),t._v(" Store Type")]),t._v(" "),a("p",[t._v("We probably are going to have a few kinds of data and a few reducers. It makes\nsense to define a global type that defines all kinds of data being stored:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppState")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  productsCatalog"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" State\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("With such a type it's easier to inject the store into classes.")]),t._v(" "),a("h2",{attrs:{id:"using-store"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-store"}},[t._v("#")]),t._v(" Using Store")]),t._v(" "),a("h3",{attrs:{id:"register"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#register"}},[t._v("#")]),t._v(" Register")]),t._v(" "),a("p",[t._v("First of all, our store needs to be imported in some module:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token decorator"}},[a("span",{pre:!0,attrs:{class:"token at operator"}},[t._v("@")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("NgModule")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  declarations"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    AppComponent\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  imports"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    BrowserModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    StoreModule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forRoot")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      productsCatalog"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" productsCatalogReducer\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  bootstrap"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("AppComponent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppModule")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"inject"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#inject"}},[t._v("#")]),t._v(" Inject")]),t._v(" "),a("p",[t._v("Our components or services may inject the "),a("code",[t._v("Store")]),t._v(" in order to access\nits data:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" store"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Store"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("AppState"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("The "),a("code",[t._v("Store<>")]),t._v(" is a generic type. We need to inform what data interests us\n("),a("code",[t._v("ProductsCatalog")]),t._v(") and what kind of data it stores ("),a("code",[t._v("products")]),t._v(" of type\n"),a("code",[t._v("Product[]")]),t._v(").")]),t._v(" "),a("h3",{attrs:{id:"use"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#use"}},[t._v("#")]),t._v(" Use")]),t._v(" "),a("h4",{attrs:{id:"dispatch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dispatch"}},[t._v("#")]),t._v(" Dispatch")]),t._v(" "),a("p",[t._v("We can dispatch actions like this:")]),t._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("store"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ProductsCatalogActions")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddProduct")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("product"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("That dispatch will go through NgRx's internals, which will invoke our reducer.\nBased on the action ("),a("code",[t._v("AddProduct")]),t._v(") it will update the store with the new\n"),a("code",[t._v("product")]),t._v(".")]),t._v(" "),a("h4",{attrs:{id:"subscribe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#subscribe"}},[t._v("#")]),t._v(" Subscribe")]),t._v(" "),a("p",[t._v("Store's data is exposed via "),a("code",[t._v("Observable")]),t._v("s:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("products$: Observable<{ products: products[] }>;\n\n...\n\nthis.products$ = this.store.select('productsCatalog');\n")])])]),a("p",[t._v("Any "),a("code",[t._v("dispatch")]),t._v(' that "modifies" the store, would bring data via the subscription.')]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("We do not have to "),a("code",[t._v("unsubscribe")]),t._v(" from NgRx store subscriptions. It will happen\nautomatically.")])])])}),[],!1,null,null,null);s.default=e.exports}}]);
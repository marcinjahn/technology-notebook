(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{413:function(e,t,a){e.exports=a.p+"assets/img/mjiot-architecture.68419319.png"},414:function(e,t,a){e.exports=a.p+"assets/img/mjiot-webapp1.b3c6def6.png"},415:function(e,t,a){e.exports=a.p+"assets/img/mjiot-webapp2.218dd8ef.png"},416:function(e,t,a){e.exports=a.p+"assets/img/mjiot-webapp3.c057af5e.png"},417:function(e,t,a){e.exports=a.p+"assets/img/mjiot-webapp4.50a4a284.png"},418:function(e,t,a){e.exports=a.p+"assets/img/mjiot-webapp5.1dd504af.png"},419:function(e,t,a){e.exports=a.p+"assets/img/mjiot-heater.093b0236.png"},420:function(e,t,a){e.exports=a.p+"assets/img/mjiot-heater-electric.6052b003.png"},421:function(e,t,a){e.exports=a.p+"assets/img/mjiot-humidity-sensor.f7aee6f8.png"},422:function(e,t,a){e.exports=a.p+"assets/img/mjiot-display.143f375b.png"},423:function(e,t,a){e.exports=a.p+"assets/img/mjiot-hysteresis-controller.5cc5d5fa.png"},424:function(e,t,a){e.exports=a.p+"assets/img/mjiot-chat.07b8f511.png"},425:function(e,t,a){e.exports=a.p+"assets/img/temp-control-loop.a8febe28.png"},426:function(e,t,a){e.exports=a.p+"assets/img/mjiot-temp-control-devices.e7e91142.png"},427:function(e,t,a){e.exports=a.p+"assets/img/mjiot-temp-control-connections.9c98215c.png"},428:function(e,t,a){e.exports=a.p+"assets/img/mjiot-temp-control-graph.bb9fa251.png"},429:function(e,t,a){e.exports=a.p+"assets/img/mjiot-chat-sysem-connections.f3ef4f48.png"},430:function(e,t,a){e.exports=a.p+"assets/img/mjiot-chat-world.c304d139.png"},524:function(e,t,a){"use strict";a.r(t);var s=a(31),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"mj-iot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mj-iot"}},[e._v("#")]),e._v(" MJ IoT")]),e._v(" "),s("p",[e._v('MJ IoT was a result of my work on a thesis titled "Design and implementation of\nInternet of Things System based on cloud computing model". It is an IoT system\nbuild using the microservices architecture.')]),e._v(" "),s("h2",{attrs:{id:"abstract"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),s("p",[e._v("The thesis presents practical implementation of Internet of Things system that\nemphasizes the possibility of connecting many devices together. Another useful\nfeature is the ability to collect telemetric data from connected “things”. This\nproject makes use of cloud services, that are subject of most of the thesis.")]),e._v(" "),s("p",[e._v("The most important part of the designed platform exists in the cloud. The chosen\ncloud provider is Microsoft with its Azure subscription offering. Transport of\ndata in the system is achieved by the means of IoT Hub service. Users’ data are\nstored in two database systems: Azure SQL and CosmosDB. The platform’s logic is\nhosted in a serverless architecture, delivered by Azure Functions.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(413),alt:""}})]),e._v(" "),s("p",[e._v("Another crucial part of the thesis is modelling approach. Every “thing” that is\nconnected with the platform has a corresponding model, which defines its\nproperties set. Each of these properties is characterized, among others, by its\ndata type that it can store. The user has the ability to define new models based\non the ones that already exist. This feature is available through the usage of\ninheritance.")]),e._v(" "),s("p",[e._v('Connecting devices is done by associating together properties of these devices.\nAny property of a given device (such as state of a light bulb) can be used as an\noutput or as an input. The simplest example would be a pair of a button and a\nlight bulb. A button could have a property called "pressed". It can be either\ntrue or false. That propertyl may be connected to the light bulb\'s "powered"\nproperty. As a result we would get a button-controller light.')]),e._v(" "),s("p",[e._v("User has an option to set filters and calculations. Filters provide\nfunctionality to block communication in defined situations, while calculations\nenable the possibility of modifying messages before they are delivered to the\nrecipient device. One of the available calculations is custom C# scripts. The\nuser is able to create a program that can modify communication data in any way.")]),e._v(" "),s("p",[e._v("The user has access to the platform by the use of web application based on the\nAngular framework. Features of this application include: viewing a list of\nuser’s devices with its details; defining and deleting connections; displaying\ntelemetry data in a form of a chart or a list, with corresponding timestamps.")]),e._v(" "),s("h2",{attrs:{id:"control-panel"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#control-panel"}},[e._v("#")]),e._v(" Control Panel")]),e._v(" "),s("p",[e._v("An essential part of the project was a web application allowing users to manage\ntheir devices. The app was created in Agular.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(414),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(415),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(416),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(417),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(418),alt:""}})]),e._v(" "),s("h2",{attrs:{id:"devices"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#devices"}},[e._v("#")]),e._v(" Devices")]),e._v(" "),s("p",[e._v("Here are a few examples of the devices that I've built for the needs of the project.\nSome of them are a mixture of hardware and software, while some others were purely software-based.")]),e._v(" "),s("h3",{attrs:{id:"heater"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#heater"}},[e._v("#")]),e._v(" Heater")]),e._v(" "),s("p",[e._v("I've purchased a generic heater and modified it by including a controlled relay\nin its electrical circuit.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(419),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(420),alt:""}})]),e._v(" "),s("h3",{attrs:{id:"temperature-and-humidity-sensor"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#temperature-and-humidity-sensor"}},[e._v("#")]),e._v(" Temperature and Humidity sensor")]),e._v(" "),s("p",[e._v("One of my sensors was a simple temperature and humidity sensor that I've connected with a microcontroller.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(421),alt:""}})]),e._v(" "),s("h3",{attrs:{id:"display"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#display"}},[e._v("#")]),e._v(" Display")]),e._v(" "),s("p",[e._v("A purely software-based device - a display. It could be connected to other devices\nto display their outputs (e.g. when connected to the temperature output of the\ntemperature and humidity sensor we could observe the temperature).")]),e._v(" "),s("p",[s("img",{attrs:{src:a(422),alt:""}})]),e._v(" "),s("h3",{attrs:{id:"hysteresis-controller"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hysteresis-controller"}},[e._v("#")]),e._v(" Hysteresis Controller")]),e._v(" "),s("p",[e._v("Another software-based device was a hysteresis controller that allows for an automated control of other appliances based on configuration parameters.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(423),alt:""}})]),e._v(" "),s("h3",{attrs:{id:"chat-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#chat-app"}},[e._v("#")]),e._v(" Chat App")]),e._v(" "),s("p",[e._v('One of the most interesting "devices" that I designed was the chat application.\nIts input was an incoming message. The output was an outgoing message.')]),e._v(" "),s("p",[s("img",{attrs:{src:a(424),alt:""}})]),e._v(" "),s("h2",{attrs:{id:"applications"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#applications"}},[e._v("#")]),e._v(" Applications")]),e._v(" "),s("p",[e._v("As part of my work, I have also prepared a few practical use-cases of the MJ IoT\nPlatform.")]),e._v(" "),s("h3",{attrs:{id:"temperature-control"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#temperature-control"}},[e._v("#")]),e._v(" Temperature Control")]),e._v(" "),s("p",[e._v("Connecting a few of my devices together and using the capabilities of MJIoT\nPlatform I was able to have a working room temperature control system. This\nsystem uses some basic automation principles like the feedback loop.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(425),alt:""}})]),e._v(" "),s("p",[e._v("Here's how I've connected various devices together to get a working system:")]),e._v(" "),s("p",[s("img",{attrs:{src:a(426),alt:""}})]),e._v(" "),s("p",[e._v("The Heater was obviously responsible to heat the room. Depending on the input\nfrom the Hysteresis Control, it was either ON or OFF. In order to change the\ntemperature settings I used two instances of the Chat App. In order to configure\nSet Point (desired temperature) and Hysteresis Gap (a characteristic of any\nhysteresis controller) I'd just send a message to the controller. The controller\nwouldn't be able to work properly without a feedback signal. Such a signal came\nfrom the Temperature Sensor that I've connected to the Controller. Additionally,\nto have live temperature information I've added the Display. It was connected to\nthe output of the Temperature Sensor.")]),e._v(" "),s("p",[e._v("All of the connections were configured via the MJ IoT Control Panel as follows:")]),e._v(" "),s("p",[s("img",{attrs:{src:a(427),alt:""}})]),e._v(" "),s("p",[e._v("With all that, I achieved typical temperature control characteristics with a\nhysteresis controller:")]),e._v(" "),s("p",[s("img",{attrs:{src:a(428),alt:""}})]),e._v(" "),s("p",[e._v("The blue color represents the controller output (commands for the heater to be\non or off); the yellow color represents the desired temperature; the green color\nrepresents the actual room temperature. You can see that it has a sinusoidal\nshape, which is typical for the type of a controller that I've designed.")]),e._v(" "),s("h3",{attrs:{id:"world-wide-chat-service"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#world-wide-chat-service"}},[e._v("#")]),e._v(" World-wide Chat Service")]),e._v(" "),s("p",[e._v("A really fun application of MJIoT was to use it as a chat platform. I have\nconnected two instances of my Chat app together (output of one goes as\nan input to another) and got a simple chat system.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(429),alt:""}})]),e._v(" "),s("p",[s("img",{attrs:{src:a(430),alt:""}})]),e._v(" "),s("p",[e._v("The image shows an example of how I've been testing the solution. The PC on the\nleft was in Poland (me), while the one on the right was in Tunisia (my\nfriend's). We were able to communicate similarly to other popular solutions such\nas Facebook Messenger.")]),e._v(" "),s("h2",{attrs:{id:"links"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#links"}},[e._v("#")]),e._v(" Links")]),e._v(" "),s("p",[e._v("The thesis was written in the Polish language. It's available here:\n"),s("a",{attrs:{href:"https://github.com/marcinjahn/MJIoT-Master-Thesis",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("p",[e._v("All of the code is open-source and can be found on "),s("a",{attrs:{href:"https://github.com/marcinjahn",target:"_blank",rel:"noopener noreferrer"}},[e._v("my\nGitHub"),s("OutboundLink")],1),e._v(' (all microservices and apps are under\ndifferent repos with the name including "MjIoT").')])])}),[],!1,null,null,null);t.default=o.exports}}]);
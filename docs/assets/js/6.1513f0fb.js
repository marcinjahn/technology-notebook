(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{398:function(e,t,s){e.exports=s.p+"assets/img/pods-network-flat.aafc2a3f.png"},399:function(e,t,s){e.exports=s.p+"assets/img/k8s-service.f2c49956.png"},400:function(e,t,s){e.exports=s.p+"assets/img/service-binding-to-pods.b2cb138e.png"},401:function(e,t,s){e.exports=s.p+"assets/img/load-balancer-service.8775594d.png"},402:function(e,t,s){e.exports=s.p+"assets/img/headless-services.b4b88733.png"},465:function(e,t,s){"use strict";s.r(t);var a=s(31),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"services"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#services"}},[e._v("#")]),e._v(" Services")]),e._v(" "),a("p",[e._v("Pods can communicate with each other using private IP address space. They can be\non different nodes, but K8s handles appropriate routing. For a pod, all other\npods are on the same LAN.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(398),alt:""}})]),e._v(" "),a("p",[e._v("Problems:")]),e._v(" "),a("ul",[a("li",[e._v("Pods are ephemeral and their IP might suddenly change.")]),e._v(" "),a("li",[e._v("Pods are not accessible on the outside by default.")])]),e._v(" "),a("p",[e._v("Services enable a single communication entry point to the pods. There'll be a\nsingle IP address regardless of how many replicas are deployed.")]),e._v(" "),a("p",[e._v("Service's IP never changes, it's static, unlike the IPs of pods (pods die, and\nnew ones get created).")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Services make the pods accessible at one static entry point (IP), no matter how\nmany replicas there are.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(399),alt:""}})])]),e._v(" "),a("p",[e._v("Services operate at the Layer 4 of the "),a("RouterLink",{attrs:{to:"/technologies/networking/osi-model.html"}},[e._v("OSI\nmodel")]),e._v(". They do not understand URLs, cookies\n(e.g. cookie-based affinity is not supported, only IP-based is supported), etc.")],1),e._v(" "),a("p",[e._v("Creating a simple service: "),a("code",[e._v("kubectl expose deployment kiada --type=LoadBalancer --port 8080")]),e._v('. It exposes all pods in the "kiada" deployment as a new service.\nThe pods will be accessible via a load balancer. Service name is inherited from\nthe deployment since we didn\'t specify any name.')]),e._v(" "),a("h2",{attrs:{id:"dns"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#dns"}},[e._v("#")]),e._v(" DNS")]),e._v(" "),a("p",[e._v("K8s runs pods with DNS servers (and a service to expose them as ClusterIP!),\nwhich all pods are configured to use. Thanks to them, service's IP is resolvable\nby service's name. If a service resides in a different namespace than the client\npod, the namespace must be appended to the URL. Examples:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("http://quiz")]),e._v(" - when the "),a("code",[e._v("quiz")]),e._v(" service is in the same ns")]),e._v(" "),a("li",[a("code",[e._v("http://quiz.kiada")]),e._v(" - when the "),a("code",[e._v("quiz")]),e._v(" service is in another namespace (called\n"),a("code",[e._v("kiada")]),e._v(")")])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Other URLs")]),e._v(" "),a("p",[e._v("Services are resolvable with:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("<service-name>")]),e._v(" - same NS")]),e._v(" "),a("li",[a("code",[e._v("<service-name>.<service-namespace>")]),e._v(" - different NS")]),e._v(" "),a("li",[a("code",[e._v("<service-name>.<service-namespace>.svc")])]),e._v(" "),a("li",[a("code",[e._v("<service-name>.<service-namespace>.svc.cluster.local")]),e._v(" - the "),a("code",[e._v("cluster.local")]),e._v("\nsuffix might be changed at the cluster level.")])])]),e._v(" "),a("p",[e._v("The IP addresses of services in a namespace are also available as envs in all\npods (the pod needs to be started after the service is created!). It's better to\nrely on DNS though. These envs may be disabled with "),a("code",[e._v("enableServiceLinks")]),e._v(" on a\npod.")]),e._v(" "),a("h2",{attrs:{id:"binding-services-to-pods"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#binding-services-to-pods"}},[e._v("#")]),e._v(" Binding services to pods")]),e._v(" "),a("p",[e._v("Services use "),a("strong",[e._v("label selectors")]),e._v(" to find pods that belong to a Service.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(400),alt:""}})]),e._v(" "),a("h2",{attrs:{id:"services-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#services-types"}},[e._v("#")]),e._v(" Services types")]),e._v(" "),a("p",[e._v("K8s supports the following Service types:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("ClusterIP")]),e._v(" - only within the cluster (it's the "),a("strong",[e._v("default")]),e._v("). It acts as a\nload balancer when multiple pods are behind it.")]),e._v(" "),a("li",[a("strong",[e._v("NodePort")]),e._v(" - a port on all nodes takes us to the pod. It is accessible from\nthe outside via any node's IP. Node ports may be explicitly specified in the\nmanifest or K8s may assign them randomly.")]),e._v(" "),a("li",[a("strong",[e._v("LoadBalancer")]),e._v(" - depends on cloud provider. There is an external load\nbalancer in front of the nodes that routes the traffic to the nodes. It is an\nextension of NodePort. The pods will be accessible via a new IP address\nbelonging to the load balancer.")])]),e._v(" "),a("p",[a("img",{attrs:{src:s(401),alt:""}})]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("ExternalName")]),e._v(" - creates CNAME records in K8s DNS. They have no clusterIP.\nThe client gets the IP of the CNAMEd service.")])]),e._v(" "),a("h3",{attrs:{id:"load-balancer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#load-balancer"}},[e._v("#")]),e._v(" Load Balancer")]),e._v(" "),a("p",[e._v("Kuberneets allows to create a service of LoadBalancer type, but it does not\nprovide load balancing itself. It asks the cloud infrastucture to provide it.\nThe IP address of the load balancer becomes an External IP of the service.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/ClDDOJ7.png",alt:""}})]),e._v(" "),a("p",[e._v("Using Minikube or kind, the external IP will always be "),a("code",[e._v("<Pending>")]),e._v(", because load\nbalancing functionality does not exist (it can be installed though, for example\nwith MetalLB). We can access the service via any worker node IP with a port of\nthe service:")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/TFPxmnh.png",alt:""}})]),e._v(" "),a("p",[e._v("These node ports are what the load balancer forwards the traffic to:")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://i.imgur.com/xp9CneN.png",alt:""}})]),e._v(" "),a("p",[e._v("There are actually two load balancers:")]),e._v(" "),a("ul",[a("li",[e._v("cloud-provider one that load balances traffic between nodes")]),e._v(" "),a("li",[e._v("K8s one that load balances traffic between pods")])]),e._v(" "),a("p",[e._v("With such a setup, every request has added latency, there're a lot of hops (load\nbalancer -> node -> potentially another node if first one didn't have a pod ->\npod).\nAdditionally, original client's IP is lost due to these hops.")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[e._v("The Load Balancer service allows to exposes just one service outside under a\nsingle IP address. "),a("RouterLink",{attrs:{to:"/dev-tools/kubernetes/ingress.html"}},[e._v("Ingresses")]),e._v(" remove that limitation.s")],1)]),e._v(" "),a("h2",{attrs:{id:"endpoints"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#endpoints"}},[e._v("#")]),e._v(" Endpoints")]),e._v(" "),a("p",[e._v("Together with a Service, an "),a("strong",[e._v("Endpoints")]),e._v(" object is created. Its name matches\nthat of the Service. It contains a list of "),a("code",[e._v("{IP}:{PORT}")]),e._v(" that a given service\nleads to together with other metadata (which node, which pod). It is built based\non selectors specified for a service.")]),e._v(" "),a("p",[e._v("There are also "),a("strong",[e._v("EndpointSlices")]),e._v(" objects, which are created by K8s when the\nnumber of endpoints of a service is large. Sending around a huge Endpoints\nobject in a cluster becomes a performance issue. One Endpoints object may be\nsplitted into multiple EndpointSlices.\nThese two types of objects exist at the same time (why?).")]),e._v(" "),a("p",[e._v("These objects are fully managed by K8s, it automatically updates\nEndpoints/EndpointSlices as pods are created/deleted - only if a service has a\nlabel selector! If it doesn't, we need to create Endpoints objects by ourselves.\nWe don't need to create EndpointSlices, K8s will do that for us based on\nEndpoints object. It's useful when we want to expose some external service via a\nService to the pods with an internal DNS name. We could, for example, switch\nfrom some K8s-hosted service to an external one (e.g. a DB) and just by removing\na selector from a Service and creating Endpoints object that would work. The\npods wouldn't notice any difference. We could also do the opposite.")]),e._v(" "),a("p",[e._v("Availability of a given pod in Endpoints object depends from the status of the\n"),a("RouterLink",{attrs:{to:"/dev-tools/kubernetes/pods.html#readiness-probe"}},[e._v("readiness probe")]),e._v(" of that pod. If it's not ready,\nit'll be moved to "),a("code",[e._v("notReadyAddresses")]),e._v(" in the Endpoints object. Readiness of pods\nmay also be ignored by Services with proper configuration. Additionally, K8s\nautomatically removes pods that are being shut down from Endpoints.")],1),e._v(" "),a("h2",{attrs:{id:"headless-services"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#headless-services"}},[e._v("#")]),e._v(" Headless Services")]),e._v(" "),a("p",[e._v("We can skip the Service hop (pod -> Service -> pod) by creating headless\nservice. When a DNS name of such a service gets resolved, instead of returning\nservice's IP, the IPs of endpoints behind it are returned.")]),e._v(" "),a("p",[e._v("It enables scenarios such as:")]),e._v(" "),a("ul",[a("li",[e._v("load balancing from the client side")]),e._v(" "),a("li",[e._v("ability to contact all pods of a given service")])]),e._v(" "),a("p",[e._v("If a pod does not need to know IP addresses of all the pods and it just wants to\nuse the service as normal, it can. The DNS will randomly return any pod's IP and\nthe client will talk directly to a pod. DNS-aware clients can make use of the\nadvantages listed above though.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(402),alt:""}})]),e._v(" "),a("p",[e._v("Headless services are created by placing "),a("code",[e._v("clusterIP: None")]),e._v(" in the YAML definition.")]),e._v(" "),a("h2",{attrs:{id:"tips"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tips"}},[e._v("#")]),e._v(" Tips")]),e._v(" "),a("ul",[a("li",[e._v("Services cannot be pinged")])])])}),[],!1,null,null,null);t.default=n.exports}}]);
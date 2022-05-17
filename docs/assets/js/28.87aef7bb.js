(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{475:function(e,t,a){e.exports=a.p+"assets/img/nat.fb9f7406.png"},611:function(e,t,a){"use strict";a.r(t);var s=a(22),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"frontmatter-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),s("h2",{attrs:{id:"toolset"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#toolset"}},[e._v("#")]),e._v(" Toolset")]),e._v(" "),s("p",[e._v("There two most commonly used tools for the configuration of networks on Linux:")]),e._v(" "),s("ul",[s("li",[e._v("old toolset (e.g., "),s("code",[e._v("ifconfig")]),e._v(")")]),e._v(" "),s("li",[e._v("new toolset (e.g., "),s("code",[e._v("ip")]),e._v(")")])]),e._v(" "),s("p",[e._v("The old toolset may be installed with the "),s("code",[e._v("net-tools")]),e._v(" package. The new tools are\navailable in the "),s("code",[e._v("iproute2")]),e._v(" package.")]),e._v(" "),s("p",[e._v("Basic commands:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("ip a")]),e._v(" - shows interfaces")]),e._v(" "),s("li",[s("code",[e._v("ip r")]),e._v(" - shows routes")]),e._v(" "),s("li",[s("code",[e._v("nmcli")]),e._v(" - Network Manager CLI, can be used to modify interfaces (e.g., to set\nstatic IP address)")]),e._v(" "),s("li",[s("code",[e._v("sudo ip link set ens33 [up/down]")]),e._v(" - enabling/disabling an interface")]),e._v(" "),s("li",[s("code",[e._v("netstat -tuan")]),e._v(" - shows open ports on the host (TCP/UDP)")]),e._v(" "),s("li",[s("code",[e._v("nmap")]),e._v(" - port scanner")])]),e._v(" "),s("h2",{attrs:{id:"firewall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#firewall"}},[e._v("#")]),e._v(" Firewall")]),e._v(" "),s("p",[e._v("There are a bunch of tools that allow us to manage firewall:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("iptables")]),e._v(" - deprecated, but the syntax is still in use via nftables\ncompatibility layer.")]),e._v(" "),s("li",[s("code",[e._v("nftables")]),e._v(" - a replacement for iptables, it also has iptables-compatible CLI.\nThe new CLI is invoked with "),s("code",[e._v("nft")]),e._v(".")]),e._v(" "),s("li",[s("code",[e._v("ufw")]),e._v(" - shipped with Ubuntu-based distros")]),e._v(" "),s("li",[s("code",[e._v("firewalld")]),e._v(" - part of systemd suite. It's controlled with the "),s("code",[e._v("firewall-cmd")]),e._v("\ncommand.")])]),e._v(" "),s("h3",{attrs:{id:"iptables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#iptables"}},[e._v("#")]),e._v(" iptables")]),e._v(" "),s("p",[e._v("The rules are stored in a files. They are split into:")]),e._v(" "),s("ul",[s("li",[e._v("tables\n"),s("ul",[s("li",[e._v("chains")])])])]),e._v(" "),s("p",[e._v("The rules have one of the following outcomes:")]),e._v(" "),s("ul",[s("li",[e._v("ACCEPT - packet is accepted")]),e._v(" "),s("li",[e._v("DROP - packet is dropped")]),e._v(" "),s("li",[e._v("RETURN - stops traversal of the current chain and goes back to the previous\none")]),e._v(" "),s("li",[e._v("LOG - logs the packet that executed the rule")]),e._v(" "),s("li",[e._v("switch to another chain")])]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("Persistance")]),e._v(" "),s("p",[e._v("The rules are stored in memory. We need to explicitly persist them to have them\nworking after a restart.")])]),e._v(" "),s("p",[e._v("There are some default tables: filter, NAT, Mangle.")]),e._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[e._v("IPv6")]),e._v(" "),s("p",[e._v("iptables does not handle IPv6. There is a separate package for that: ip6tables.")])]),e._v(" "),s("h4",{attrs:{id:"filter-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#filter-table"}},[e._v("#")]),e._v(" Filter Table")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("Default")]),e._v(" "),s("p",[e._v("Filter table is the default one.")])]),e._v(" "),s("p",[e._v("The Filter table has has 3 chains:")]),e._v(" "),s("ul",[s("li",[e._v("Input - for inbound packets")]),e._v(" "),s("li",[e._v("Output - for outbound packets")]),e._v(" "),s("li",[e._v("Forward - for packets that need to be sent elsewhere (router)")])]),e._v(" "),s("p",[e._v("We can see the defined rules with "),s("code",[e._v("iptables -L -v")]),e._v(".")]),e._v(" "),s("p",[e._v("The order of the rules matters, since they are examined from top to bottom. We\nshould put the rules that are to be the most relevant in our scenario close to\nthe top, for better performance.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("Accept")]),e._v(" "),s("p",[e._v("By default, if a packets goes through all of the rules and none is matched, it\nwill be ACCEPTed.")]),e._v(" "),s("p",[e._v("We can change that with "),s("code",[e._v("iptables –P INPUT DENY")]),e._v(".")])]),e._v(" "),s("h4",{attrs:{id:"nat-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nat-table"}},[e._v("#")]),e._v(" NAT Table")]),e._v(" "),s("p",[e._v("The NAT table is used for the NAT operation, which is all about switching\nsource/destination IP addresses (just like router gateways do that at homes).")]),e._v(" "),s("p",[e._v("The usual config is like this:")]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE\n")])])]),s("p",[e._v("The MASQUERADE target will use the IP address of eth1 for all traffic that\nleaves eth1.")]),e._v(" "),s("p",[s("img",{attrs:{src:a(475),alt:""}})]),e._v(" "),s("h4",{attrs:{id:"mangle-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mangle-table"}},[e._v("#")]),e._v(" Mangle Table")]),e._v(" "),s("p",[e._v("The Mangle table is used to modify packets.")]),e._v(" "),s("hr"),e._v(" "),s("h4",{attrs:{id:"logs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#logs"}},[e._v("#")]),e._v(" Logs")]),e._v(" "),s("p",[e._v("The "),s("strong",[e._v("LOG")]),e._v(" target of the rule saves the logs in a file. In Ubuntu (our example\nOS), they are added to /var/log/\nkern.log. In Red Hat or Fedora, look for them in /var/log/messages.")]),e._v(" "),s("h3",{attrs:{id:"nftables"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nftables"}},[e._v("#")]),e._v(" nftables")]),e._v(" "),s("p",[e._v("It's a modern replacement for iptables. It contains CLI and API (HTTP?).")]),e._v(" "),s("p",[e._v("The rules added via CLI are not persisted. To persist them, they should be added\nto "),s("code",[e._v("/etc/nftools.conf")]),e._v(". We can also create more files and "),s("code",[e._v("Include")]),e._v(" them in the\n"),s("code",[e._v("/etc/nftools.conf")]),e._v(" file.")]),e._v(" "),s("h2",{attrs:{id:"sources"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sources"}},[e._v("#")]),e._v(" Sources")]),e._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://www.packtpub.com/product/linux-for-networking-professionals/9781800202399",target:"_blank",rel:"noopener noreferrer"}},[e._v("Linux for Networking\nProfessionals"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://opensource.com/article/18/9/linux-iptables-firewalld",target:"_blank",rel:"noopener noreferrer"}},[e._v("Linux firewalls: What you need to know about iptables and firewalld\n(opensource.com)"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=o.exports}}]);
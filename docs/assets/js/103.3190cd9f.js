(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{543:function(e,t,a){"use strict";a.r(t);var r=a(31),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("h2",{attrs:{id:"what-is-tpm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-is-tpm"}},[e._v("#")]),e._v(" What is TPM?")]),e._v(" "),a("p",[e._v("TPM is a cryptographic coprocessor. It's present in personal PCs and servers. It\nenables:")]),e._v(" "),a("ul",[a("li",[e._v("Identification of devices - a private key embedded in a PC identifies it.\nUse-cases:\n"),a("ul",[a("li",[e._v("VPN only allowing client machines that are trusted")])])]),e._v(" "),a("li",[e._v("Secure generation of keys")]),e._v(" "),a("li",[e._v("Secure storage of keys - TPM can encrypt keys with its public key. Such\nencyrpted blobs might be stored on a disk (since TPM has limited storage\ncapacity)")]),e._v(" "),a("li",[e._v("Random number generation")]),e._v(" "),a("li",[e._v("NVRAM storage - even if disk is wiped, data stays in TPM (certificate store).\nIt stores:\n"),a("ul",[a("li",[e._v("root public keys for certificate chains - read-only")]),e._v(" "),a("li",[e._v("EKs")])])]),e._v(" "),a("li",[e._v("Device health attestation")])]),e._v(" "),a("h2",{attrs:{id:"history"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#history"}},[e._v("#")]),e._v(" History")]),e._v(" "),a("h3",{attrs:{id:"tpm-1-1b"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tpm-1-1b"}},[e._v("#")]),e._v(" TPM 1.1b")]),e._v(" "),a("p",[e._v("Functionalities:")]),e._v(" "),a("ul",[a("li",[e._v("key generation (only RSA)")]),e._v(" "),a("li",[e._v("storage")]),e._v(" "),a("li",[e._v("secure authorization")]),e._v(" "),a("li",[e._v("device-health attestation")])]),e._v(" "),a("p",[e._v("It was not standardized too well, different vendors required different drivers.\nAdditionally dictionary attacks were possible.")]),e._v(" "),a("h3",{attrs:{id:"tpm-1-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tpm-1-2"}},[e._v("#")]),e._v(" TPM 1.2")]),e._v(" "),a("p",[e._v("Improvements:")]),e._v(" "),a("ul",[a("li",[e._v("a standard software interface")]),e._v(" "),a("li",[e._v("a standard package pinout (mostly)")]),e._v(" "),a("li",[e._v("protection against dictionary attack")]),e._v(" "),a("li",[e._v("direct anonymous attestation")]),e._v(" "),a("li",[e._v("a small RAM storage for a certificate (NVRAM)")])]),e._v(" "),a("p",[e._v("1.2 did not change programming interfaces, software written with 1.1b continued\nto work.")]),e._v(" "),a("p",[e._v("Microsoft developed a Windows driver and IBM developed an open-source Linux\ndriver.")]),e._v(" "),a("h3",{attrs:{id:"tpm-2-0"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tpm-2-0"}},[e._v("#")]),e._v(" TPM 2.0")]),e._v(" "),a("p",[e._v("Redesigned from scratch. It doesn't use SHA-1 hashing algorithm due to its\nweakness. The specification is "),a("em",[e._v("algorithm agile")]),e._v(" - approved alghoritms may be\nadded/removed in the future. All the authentication techniques were unified with\na technique called "),a("em",[e._v("enhanced authorization")]),e._v(". That allows to establish various\nrules regarding when secrets can be read (e.g. you have to identify yourself\nwith an HMAC key nd you need to use fingerprint reader). TPM 2.0 can do anything\nthat TPM 1.2 can do.")]),e._v(" "),a("h2",{attrs:{id:"terms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#terms"}},[e._v("#")]),e._v(" Terms")]),e._v(" "),a("h3",{attrs:{id:"seed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#seed"}},[e._v("#")]),e._v(" Seed")]),e._v(" "),a("p",[e._v("A secret that is used to generate other secrets from it. TPM has limited storage\nspace, but it might be required to have many secrets for different purposes. Key\nDerivation Function (KDF) is used to generate those keys based on a seed. HMAC\nmight be used as a KDF. The seed is used as the HMAC key.")]),e._v(" "),a("p",[e._v("Each hierarchy (three of them) have their own seed (the endorsement primary\nseed, the platform primary seed, and the storage primary seed).")]),e._v(" "),a("h3",{attrs:{id:"primary-key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#primary-key"}},[e._v("#")]),e._v(" Primary Key")]),e._v(" "),a("p",[e._v("Root keys in the hierarchy. They have no parent. TPM 1.2 has one key analogical\nto TPM 2.0's Primary key - "),a("strong",[e._v("Storage Root Key (SRK)")]),e._v(", it is stored persistently\nin TPM. TPM 2.0 permits unlimited number of Primary Keys (and they don't need to\nbe persistent).")]),e._v(" "),a("p",[e._v("TPM 1.2 could work with just one SRK, because:")]),e._v(" "),a("ul",[a("li",[e._v("there was just one algorithm and key size (RSA-2048). TPM 2.0 may use many.")]),e._v(" "),a("li",[e._v("there was just one key hierarchy (storage hierarchy). TPM 2.0 has three, each\nwith at least one root.")])]),e._v(" "),a("p",[e._v("TPM has limited storage. If we need more primary keys than storage allows, the\nprimary keys can be recreated when needed. If we supply the same template of the\nkey (some info about it like algorithm and some unique information) and use the\nsame seed (there's one per hierarchy) we will get the same key.")]),e._v(" "),a("h2",{attrs:{id:"sdks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sdks"}},[e._v("#")]),e._v(" SDKs")]),e._v(" "),a("p",[e._v("There are many ways to access TPM. Some are specific to 1.2 or 2.0, some are\nspecific to the platform (Windows, Linux). Main types:")]),e._v(" "),a("ul",[a("li",[e._v("proprietary apps that talk with TPM directly")]),e._v(" "),a("li",[e._v("PKCS #11 standard - only basic TPM services")]),e._v(" "),a("li",[e._v("MS CAPI (Windows-only) - only basic TPM services")]),e._v(" "),a("li",[e._v("TSS (e.g. TrouSerS) - TPM 1.2 only")]),e._v(" "),a("li",[e._v("TBS (Windows-only) - low-level")]),e._v(" "),a("li",[e._v("CNG (Windows-only)")]),e._v(" "),a("li",[e._v("TSS.NET - cross-platform implementation for TPM 2.0")])]),e._v(" "),a("h2",{attrs:{id:"tpm-supported-operations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tpm-supported-operations"}},[e._v("#")]),e._v(" TPM-supported Operations")]),e._v(" "),a("p",[e._v("TPM is able to run the following cryptographic operations:")]),e._v(" "),a("ul",[a("li",[e._v("random number generation")]),e._v(" "),a("li",[e._v("hashing")]),e._v(" "),a("li",[e._v("HMACing")]),e._v(" "),a("li",[e._v("RSA")]),e._v(" "),a("li",[e._v("symmetric keys")])]),e._v(" "),a("p",[e._v("Some of these operations expect a handle to a key used during an operation (e.g. HMAC needs a handle to a secret key).")]),e._v(" "),a("h2",{attrs:{id:"resources"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resources"}},[e._v("#")]),e._v(" Resources")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://google.github.io/tpm-js/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://google.github.io/tpm-js/index.html"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://tpm2-software.github.io/external/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://tpm2-software.github.io/external/"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=s.exports}}]);
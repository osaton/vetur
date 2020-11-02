(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{171:function(t,e,s){"use strict";s.r(e);var n=s(0),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("Sometimes new releases have bugs that you want to avoid. Here's an easy way to downgrade Vetur to a working version:")]),t._v(" "),s("ul",[t._m(2),t._v(" "),s("li",[t._v("Find the version you want and download VSIX "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/blob/master/CHANGELOG.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/vuejs/vetur/blob/master/CHANGELOG.md"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("li",[t._v("Install VSIX following this guide: "),s("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix"),s("OutboundLink")],1),t._v(".")])]),t._v(" "),t._m(3),t._v(" "),s("p",[t._v("The two possible causes are:")]),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("For 1, try disabling all other Vue related extensions.")]),t._v(" "),s("p",[t._v("For 2, try these methods:")]),t._v(" "),s("ul",[t._m(5),t._v(" "),s("li",[t._v("Remove Vetur in your "),s("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/extension-gallery#_common-questions",target:"_blank",rel:"noopener noreferrer"}},[t._v("extensions folder"),s("OutboundLink")],1),t._v(" and do a clean reinstall.")]),t._v(" "),s("li",[t._v("(Windows): Try removing & reinstall Vetur with admin privilege.")]),t._v(" "),s("li",[t._v("If nothing above works, download the "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("latest pre-packaged vsix file"),s("OutboundLink")],1),t._v(" and "),s("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix",target:"_blank",rel:"noopener noreferrer"}},[t._v("install through vsix"),s("OutboundLink")],1),t._v(".")])]),t._v(" "),t._m(6),t._v(" "),s("ul",[s("li",[t._m(7),t._v(" "),t._m(8),t._v(" "),s("p",[t._v("You can also try uninstall/reinstall Vetur."),s("br"),t._v("\nMore details at: "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/issues/352#issuecomment-318168811",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/vuejs/vetur/issues/352#issuecomment-318168811"),s("OutboundLink")],1)])]),t._v(" "),s("li",[s("p",[t._v("If it says problem related to memory and cpu, try to add a "),s("code",[t._v("jsconfig.json")]),t._v(" or "),s("code",[t._v("tsconfig.json")]),t._v(" and only include Vue-related code: "),s("a",{attrs:{href:"https://vuejs.github.io/vetur/setup.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://vuejs.github.io/vetur/setup.html"),s("OutboundLink")],1)])])]),t._v(" "),t._m(9),t._v(" "),s("ul",[s("li",[s("p",[t._v("You need to setup path mapping in "),s("code",[t._v("jsconfig.json")]),t._v(" or "),s("code",[t._v("tsconfig.json")]),t._v(": "),s("a",{attrs:{href:"https://www.typescriptlang.org/docs/handbook/module-resolution.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.typescriptlang.org/docs/handbook/module-resolution.html"),s("OutboundLink")],1),t._v(". For example:")]),t._v(" "),t._m(10),t._m(11)])]),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),s("p",[t._v("Related issues: "),s("a",{attrs:{href:"https://github.com/vuejs/vue/issues/8721",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuejs/vue#8721"),s("OutboundLink")],1),t._v(", "),s("a",{attrs:{href:"https://github.com/vuejs/vue/issues/9873",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuejs/vue#9873"),s("OutboundLink")],1),t._v(" and "),s("a",{attrs:{href:"https://github.com/microsoft/TypeScript/issues/30854",target:"_blank",rel:"noopener noreferrer"}},[t._v("microsoft/TypeScript#30854"),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("p",[t._v("You can work around it by:")]),t._v(" "),s("ul",[s("li",[t._v("Annotating return type for each computed property, by either "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/issues/1707#issuecomment-686851677",target:"_blank",rel:"noopener noreferrer"}},[t._v("adding JSDoc"),s("OutboundLink")],1),t._v(" or "),s("a",{attrs:{href:"https://vuejs.org/v2/guide/typescript.html#Annotating-Return-Types",target:"_blank",rel:"noopener noreferrer"}},[t._v("TS types"),s("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),s("li",[t._v("Use "),s("a",{attrs:{href:"https://composition-api.vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("Composition API"),s("OutboundLink")],1),t._v(".")])]),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),s("p",[t._v("More details at: "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/issues/423#issuecomment-340235722",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/vuejs/vetur/issues/423#issuecomment-340235722"),s("OutboundLink")],1)]),t._v(" "),t._m(18),t._v(" "),s("p",[t._v("You need to add "),s("code",[t._v("declare module '*.vue'")]),t._v(" in your dts files: "),s("a",{attrs:{href:"https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/Microsoft/TypeScript-Vue-Starter#single-file-components"),s("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(19),t._v(" "),s("p",[t._v("To build and install the extension from source, you need to install "),s("a",{attrs:{href:"https://code.visualstudio.com/docs/extensions/publish-extension",target:"_blank",rel:"noopener noreferrer"}},[s("code",[t._v("vsce")]),s("OutboundLink")],1),t._v(".")]),t._v(" "),s("p",[t._v("Then, clone the repository and compile it.")]),t._v(" "),t._m(20),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),t._m(24),t._v(" "),t._m(25),t._v(" "),s("p",[t._v("However, we'd appreciate it if you can file a "),s("a",{attrs:{href:"https://github.com/vuejs/vetur/blob/master/.github/PERF_ISSUE.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("performance issue report with a profile"),s("OutboundLink")],1),t._v(" to help us fix the issue.")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"faq"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#faq"}},[this._v("#")]),this._v(" FAQ")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"install-an-old-version-of-vetur"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-an-old-version-of-vetur"}},[this._v("#")]),this._v(" Install an old version of Vetur")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[this._v("Set "),e("code",[this._v('"extensions.autoUpdate": false')]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"no-syntax-highlighting-no-language-features-working"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#no-syntax-highlighting-no-language-features-working"}},[this._v("#")]),this._v(" No Syntax Highlighting & No Language Features working")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("Other extensions also contribute a Vue language, and that conflicts with Vetur.")]),this._v(" "),e("li",[this._v("VS Code didn't install Vetur properly.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[this._v("Run command: "),e("code",[this._v("Developer: Reinstall Extension")]),this._v(" for Vetur.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vetur-crash"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vetur-crash"}},[this._v("#")]),this._v(" Vetur Crash")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("If it says "),e("code",[this._v("cannot find module <some-module>")]),this._v(", go to Vetur's client code installation directory and run "),e("code",[this._v("yarn")]),this._v(" or "),e("code",[this._v("npm install")]),this._v(".\nThis is usually caused by VS Code not correctly updating Vetur's dependencies from version to version.\nPaths:")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[t._v("Win: "),s("code",[t._v("%USERPROFILE%\\.vscode\\extensions\\octref.vetur-<version>\\client")])]),t._v(" "),s("li",[t._v("Mac: "),s("code",[t._v("~/.vscode/extensions/octref.vetur-<version>/client")])]),t._v(" "),s("li",[t._v("Linux: "),s("code",[t._v("~/.vscode/extensions/octref.vetur-<version>/client")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vetur-can-t-recognize-components-imported-using-webpack-s-alias"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vetur-can-t-recognize-components-imported-using-webpack-s-alias"}},[this._v("#")]),this._v(" Vetur can't recognize components imported using webpack's alias")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Webpack")]),t._v("\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  resolve"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    alias"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@'")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'src'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// tsconfig.json")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"compilerOptions"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"baseUrl"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"paths"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"@/*"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"src/*"')]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"property-xxx-does-not-exist-on-type-combinedvueinstance"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#property-xxx-does-not-exist-on-type-combinedvueinstance"}},[this._v("#")]),this._v(" "),e("code",[this._v("Property 'xxx' does not exist on type 'CombinedVueInstance'")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("If you are getting a lot of "),e("code",[this._v("Property 'xxx' does not exist on type 'CombinedVueInstance'")]),this._v(" errors, it's an issue with Vue's typing and TypeScript.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[this._v("Setting "),e("code",[this._v("vetur.validation.interpolation: false")]),this._v(". You'll not get any template error checking.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[this._v("Downgrading TS to a version before 3.4 and enabling "),e("code",[this._v("vetur.useWorkspaceDependencies")]),this._v(". You'll not get support for new TS syntaxes, such as optional chaining.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vetur-cannot-recognize-my-vue-component-import-such-as-import-comp-from-comp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vetur-cannot-recognize-my-vue-component-import-such-as-import-comp-from-comp"}},[this._v("#")]),this._v(" Vetur cannot recognize my Vue component import, such as "),e("code",[this._v("import Comp from './comp'")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("You need to add "),e("code",[this._v(".vue")]),this._v(" extension when importing SFC.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vue-file-cannot-be-imported-in-ts-file"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-file-cannot-be-imported-in-ts-file"}},[this._v("#")]),this._v(" .vue file cannot be imported in TS file.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"install-from-source"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-from-source"}},[this._v("#")]),this._v(" Install from source.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("git clone https://github.com/vuejs/vetur\ncd vetur\nyarn\nyarn compile\nvsce package\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Now you'll find "),e("code",[this._v("vetur-{version}.vsix")]),this._v(', you can install it by editor command "Install from VSIX".')])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vetur-uses-different-version-of-typescript-in-vue-files-to-what-i-installed-in-node-modules"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vetur-uses-different-version-of-typescript-in-vue-files-to-what-i-installed-in-node-modules"}},[this._v("#")]),this._v(" Vetur uses different version of TypeScript in .vue files to what I installed in "),e("code",[this._v("node_modules")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can enable "),e("code",[this._v("Vetur: Use Workspace Dependencies")]),this._v(" setting so that it uses the same version of TypeScript in your workspace.\nNB: It will use "),e("code",[this._v("typescript.tsdk")]),this._v(" setting as the path to look for if defined, defaulting to "),e("code",[this._v("node_modules/typescript")]),this._v(". This enables tools like Yarn PnP to set their own custom resolver.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"vetur-is-slow"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vetur-is-slow"}},[this._v("#")]),this._v(" Vetur is slow")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can run the command "),e("code",[this._v("Vetur: Restart VLS (Vue Language Server)")]),this._v(" to restart VLS.")])}],!1,null,null,null);e.default=r.exports}}]);
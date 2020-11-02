(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{181:function(t,s,e){"use strict";e.r(s);var a=e(0),n=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content"},[t._m(0),t._v(" "),e("p",[t._v("Vue template allows JavaScript-esque expression in four constructs:")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://vuejs.org/v2/guide/syntax.html#Directives",target:"_blank",rel:"noopener noreferrer"}},[t._v("Directives"),e("OutboundLink")],1),t._v(" like "),e("code",[t._v('v-if="exp"')])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://vuejs.org/v2/guide/syntax.html#Attributes",target:"_blank",rel:"noopener noreferrer"}},[t._v("Attributes"),e("OutboundLink")],1),t._v(" like "),e("code",[t._v(':id="exp"')])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://vuejs.org/v2/guide/events.html#Method-Event-Handlers",target:"_blank",rel:"noopener noreferrer"}},[t._v("Event Handlers"),e("OutboundLink")],1),t._v(" like "),e("code",[t._v('@click="exp"')])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://vuejs.org/v2/guide/syntax.html#Text",target:"_blank",rel:"noopener noreferrer"}},[t._v("Template Interpolations"),e("OutboundLink")],1),t._v(" like")])]),t._v(" "),t._m(1),e("p",[t._v("Other than the "),e("a",{attrs:{href:"https://vuejs.org/v2/guide/filters.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("filter syntax"),e("OutboundLink")],1),t._v(", the expression is 100% JavaScript expression.")]),t._v(" "),e("p",[t._v("Vetur now offers completion, diagnostics, hover, jump to definition, find references for these JavaScript snippets.")]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),e("p",[t._v("Currently diagnostics, hover, jump to definition and find references are implemented in this way:")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),e("p",[t._v("If you do find bugs, please "),e("a",{attrs:{href:"https://github.com/vuejs/vetur/issues",target:"_blank",rel:"noopener noreferrer"}},[t._v("fill an issue"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("p",[t._v("If you want more details as to how this feature is implemented, I wrote a blog post: "),e("a",{attrs:{href:"https://blog.matsu.io/generic-vue-template-interpolation-language-features",target:"_blank",rel:"noopener noreferrer"}},[t._v("Generic Vue Template Interpolation Language Features\n"),e("OutboundLink")],1),t._v(".")]),t._v(" "),t._m(6),t._v(" "),e("p",[t._v("Completion now works a little bit differently than the other language features. Mainly because completion works off a\nSyntactically incomplete file and the generic compiler from Vue template to virtual TypeScript file cannot handle that yet.")]),t._v(" "),e("p",[t._v("Completion:")]),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._m(11),t._v(" "),t._m(12),t._v(" "),e("p",[t._v("Vetur will now validate HTML templates that uses child components. For example, given two children:")]),t._v(" "),t._m(13),t._v(" "),t._m(14),t._m(15),t._v(" "),t._m(16),t._m(17),t._v(" "),e("p",[t._v("The rules are:")]),t._v(" "),e("ul",[e("li",[t._v("When using "),e("a",{attrs:{href:"https://vuejs.org/v2/guide/components-props.html#Prop-Types",target:"_blank",rel:"noopener noreferrer"}},[t._v("array props"),e("OutboundLink")],1),t._v(", show "),e("strong",[t._v("warning")]),t._v(" for missing props.")]),t._v(" "),e("li",[t._v("When using "),e("a",{attrs:{href:"https://vuejs.org/v2/guide/components-props.html#Prop-Validation",target:"_blank",rel:"noopener noreferrer"}},[t._v("object prop validation"),e("OutboundLink")],1),t._v(", show errors for missing "),e("code",[t._v("required")]),t._v(" props.")])]),t._v(" "),t._m(18),t._v(" "),t._m(19),t._v(" "),e("p",[t._v("Vetur will now validate that the interpolation expression you pass to child component's props match the props signature. Consider this simple case:")]),t._v(" "),t._m(20),t._v(" "),t._m(21),t._m(22),t._v(" "),t._m(23),t._m(24),t._v(" "),e("p",[t._v("Supported:")]),t._v(" "),t._m(25)])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"interpolation-support"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#interpolation-support"}},[this._v("#")]),this._v(" Interpolation Support")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{ exp }}"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"generic-language-features"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#generic-language-features"}},[this._v("#")]),this._v(" Generic Language Features")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[this._v("WARNING")]),this._v(" "),s("p",[this._v("These features are experimental and you need to set "),s("code",[this._v("vetur.experimental.templateInterpolationService: true")]),this._v(" to enable them. You can also only disable template diagnostics with "),s("code",[this._v("vetur.validation.interpolation: false")]),this._v(".")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",[e("li",[t._v("Compile original Vue template into a virtual TypeSript file")]),t._v(" "),e("li",[t._v("Generate a sourcemap between expressions in original "),e("code",[t._v(".vue")]),t._v(" file and the virtual file")]),t._v(" "),e("li",[t._v("Run language feature requests on the virtual TypeScript file")]),t._v(" "),e("li",[t._v("Map results back to original "),e("code",[t._v(".vue")]),t._v(" file")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[this._v("TIP")]),this._v(" "),s("p",[this._v('Use the command "Vetur: Show corresponding virtual file and sourcemap" to understand how the\ntemplates are represented in Vetur. Useful for bug filing too.')])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"completion"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#completion"}},[this._v("#")]),this._v(" Completion")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",[e("li",[t._v("Collects information from "),e("code",[t._v("<script>")]),t._v(" region by traversing its AST")]),t._v(" "),e("li",[t._v("Offer "),e("code",[t._v("props")]),t._v(", "),e("code",[t._v("data")]),t._v(" and "),e("code",[t._v("methods")]),t._v(" in interpolation regions")]),t._v(" "),e("li",[t._v("Offer "),e("code",[t._v(":prop")]),t._v(" completion on child components")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"type-checking-with-jsdocs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#type-checking-with-jsdocs"}},[this._v("#")]),this._v(" Type Checking with JSDocs")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("You don't have to use "),s("code",[this._v('lang="ts"')]),this._v(" for typing functions. This would show error that "),s("code",[this._v("'foo'")]),this._v(" is not assignable to "),s("code",[this._v("number")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{{ numOnly(post.body) }}"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token script"}},[e("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @typedef {object} Post\n * @property {string} body\n */")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  props"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    post"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n       * @type {import('vue').PropType<Post>}\n       */")]),t._v("\n      type"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Object"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      required"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n  methods"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n     * @param {number} num\n     */")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("numOnly")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("num")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"prop-validation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prop-validation"}},[this._v("#")]),this._v(" Prop Validation")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("em",[this._v("You can turn on/off this feature with "),s("code",[this._v("vetur.validation.templateProps")]),this._v(".")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Simple.vue")]),this._v(":")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token script"}},[e("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  props"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'foo'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Complex.vue")]),this._v(":")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token script"}},[e("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  props"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    foo"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      type"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" String"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      required"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("Vetur will show a warning for "),s("code",[this._v("<simple>")]),this._v(" and an error for "),s("code",[this._v("<complex>")]),this._v(".")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"prop-type-validation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prop-type-validation"}},[this._v("#")]),this._v(" Prop Type Validation")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("em",[this._v("You can turn on/off this feature with "),s("code",[this._v("vetur.validation.templateProps")]),this._v(".")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Child.vue")]),this._v(":")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token script"}},[e("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  props"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" str"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" String "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Parent.vue")]),this._v(":")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"language-vue extra-class"},[e("pre",{pre:!0,attrs:{class:"language-vue"}},[e("code",[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("test")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":str")]),e("span",{pre:!0,attrs:{class:"token attr-value"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("num"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token script"}},[e("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Test "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./Test.vue'")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  components"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Test "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      num"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("42")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("p",[t._v("Vetur will generate a diagnostic error on "),e("code",[t._v("str")]),t._v(" in "),e("code",[t._v("Parent.vue")]),t._v(" template "),e("code",[t._v(':str="num"')]),t._v(", with a message that "),e("code",[t._v("type 'number' is not assignable to type 'string'")]),t._v(".")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",[e("li",[t._v("JS file with "),e("code",[t._v("export default {...}")])]),t._v(" "),e("li",[t._v("TS file with "),e("code",[t._v("defineComponent")]),t._v(" in Vue 3 or "),e("code",[t._v("Vue.extend")]),t._v(" in Vue 2")]),t._v(" "),e("li",[t._v("Prop Type: "),e("code",[t._v("foo: String")]),t._v(", "),e("code",[t._v("foo: { type: String }")]),t._v(" or "),e("code",[t._v("foo: String as PropType<string>")]),t._v(" or "),e("code",[t._v("foo: String as Vue.PropType<string>")]),t._v(" "),e("ul",[e("li",[t._v("This is useful in the case of "),e("code",[t._v("foo: Array")]),t._v(". If you are using JS, there's no way to say "),e("code",[t._v("foo is a string array")]),t._v(", however with TS you can use "),e("code",[t._v("foo: Array as PropType<string[]>")]),t._v(". Vetur will then check that the provided expression matches "),e("code",[t._v("string[]")]),t._v(".")])])])])}],!1,null,null,null);s.default=n.exports}}]);
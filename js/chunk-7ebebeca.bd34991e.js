(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ebebeca"],{2962:function(t,e,a){},"2f05":function(t,e,a){},"36c9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-knowledge-search"},[a("el-input",{attrs:{placeholder:"请输入搜索内容"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[a("span",{attrs:{slot:"prepend"},slot:"prepend"},[t._v("关键词")]),a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1)],1)},i=[],s={name:"Search",data:function(){return{search:""}},watch:{search:function(t){this.$emit("onSearchKey",t)}}},r=s,c=a("2877"),o=Object(c["a"])(r,n,i,!1,null,null,null);e["a"]=o.exports},4309:function(t,e,a){"use strict";a("2f05")},"434b":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return r}));var n=a("41cb");function i(t){return Object(n["b"])().get("api/knowledge/menu_list",{params:t}).then((function(t){return t.data.data}))}function s(t){return Object(n["b"])().get("api/knowledges",{params:t}).then((function(t){return t.data.data}))}function r(t){return Object(n["b"])().get("api/wiki/post",{params:{source_id:t,type:"knowledge"}}).then((function(t){return t.data.data}))}},"498a":function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").trim,s=a("c8d2");n({target:"String",proto:!0,forced:s("trim")},{trim:function(){return i(this)}})},"56ce":function(t,e,a){},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("e330"),i=a("1d80"),s=a("577e"),r=a("5899"),c=n("".replace),o="["+r+"]",l=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),d=function(t){return function(e){var a=s(i(e));return 1&t&&(a=c(a,l,"")),2&t&&(a=c(a,u,"")),a}};t.exports={start:d(1),end:d(2),trim:d(3)}},"79a6":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"v-knowledge-index"},[a("knowledgeSearch",{on:{onSearchKey:t.onSearchKey}}),t.search?a("knowledgeList",{attrs:{list:t.list,pagination:t.pagination},on:{onSearchKey:t.onSearchKey}}):[a("wikiGuide",{attrs:{data:t.guide}}),a("wikiHot",{attrs:{data:t.hot}}),a("wikiRecent",{attrs:{list:t.recent}})]],2)},i=[],s=(a("ac1f"),a("841c"),a("d3b7"),a("159b"),a("2ca0"),a("b0c0"),a("1276"),a("a15b"),a("36c9")),r=a("fd0c"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-wiki-panel"},[a("div",{staticClass:"m-title"},[t._m(0),a("router-link",{staticClass:"u-title-right",attrs:{to:"/type/game"}},[t._v("查看更多 »")])],1),a("div",{staticClass:"m-guide m-panel"},t._l(t.data,(function(e,n){return a("div",{key:n,staticClass:"u-guide"},[a("div",{staticClass:"u-title"},[t._v(t._s(e.label))]),a("div",{staticClass:"u-list"},t._l(e.menus,(function(e,n){return a("a",{key:n,staticClass:"u-label",attrs:{href:e.link,target:"_blank"},domProps:{innerHTML:t._s(e.label)}})})),0)])})),0)])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"u-title-left"},[a("i",{staticClass:"el-icon-orange"}),a("span",[t._v(" 玩法指南")])])}],l={name:"Guide",props:["data"],data:function(){return{loading:!1}},computed:{},watch:{},methods:{},created:function(){},mounted:function(){}},u=l,d=a("2877"),p=Object(d["a"])(u,c,o,!1,null,null,null),f=p.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-wiki-panel"},[a("div",{staticClass:"m-title"},[a("span",{staticClass:"u-title-left"},[a("i",{class:t.icon}),a("span",[t._v(" "+t._s(t.title))])]),t.link?a("router-link",{staticClass:"u-title-right",attrs:{to:"link"}},[t._v("查看更多 »")]):t._e()],1),a("div",{staticClass:"m-panel"},[t.list.length?a("el-carousel",{attrs:{height:"66",direction:"vertical","indicator-position":"none"}},t._l(t.list,(function(e,n){return a("el-carousel-item",{key:n,staticClass:"m-hot"},t._l(e,(function(e,n){return a("router-link",{key:n,staticClass:"u-hot",attrs:{to:{name:"view",params:{source_id:e.id}}}},[a("img",{staticClass:"u-icon",attrs:{src:t.hot_img}}),a("div",{staticClass:"u-content"},[a("div",{staticClass:"u-title",domProps:{textContent:t._s(e.name)}}),e.post?a("div",{staticClass:"u-desc"},[a("span",{attrs:{title:e.post.remark}},[t._v(t._s("By "+e.post.user_nickname))])]):t._e()])])})),1)})),1):a("div",[t._v("😂 暂无热门事件")])],1)])},h=[],g=(a("9911f"),a("4de4"),a("fb6a"),a("65c2")),v={name:"Hot",props:["data"],data:function(){return{hot_img:g["__iconPath"]+"icon/243.png"}},computed:{icon:function(){return this.data.icon},title:function(){return this.data.title},link:function(){return this.data.link||""},list:function(){var t,e=[];if(null!==(t=this.data)&&void 0!==t&&t.list)for(var a=this.data.list.filter(Boolean),n=0;n<a.length;n+=3)e.push(a.slice(n,n+3));return e}}},_=v,k=(a("4309"),Object(d["a"])(_,m,h,!1,null,"4770e3aa",null)),C=k.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-wiki-panel"},[t._m(0),a("div",{staticClass:"m-recent m-panel"},t._l(t.list,(function(e,n){return a("div",{key:n,staticClass:"m-post"},[a("div",{staticClass:"m-head"},[a("div",{staticClass:"m-user"},[a("div",{staticClass:"u-author"},[a("img",{staticClass:"u-icon",attrs:{src:e.user_avatar,alt:e.user_nickname}}),a("a",{staticClass:"u-name",attrs:{href:e.user_id?t.authorLink(e.user_id):null},domProps:{textContent:t._s(e.user_nickname)}})]),a("div",{staticClass:"u-updated",domProps:{textContent:t._s(t.ts2str(e.updated))}})]),a("div",{staticClass:"m-source"},[a("div",{staticClass:"u-source"},[a("svg",{class:"u-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 412.72 412.72","svg-inline":"",role:"presentation",focusable:"false",tabindex:"-1"}},[a("path",{attrs:{d:"M404.72 82.944h-27.2v-9.28a8 8 0 00-5.76-8 225.345 225.345 0 00-57.68-7.36c-32 0-75.6 7.2-107.84 40-32-33.12-75.92-40-107.84-40a225.345 225.345 0 00-57.68 7.36 8 8 0 00-5.76 8v9.2H8a8 8 0 00-8 8v255.52a8 8 0 008 8 7.996 7.996 0 003.92-1.04c.8-.4 80.8-44.16 192.48-16h1.92a8.008 8.008 0 001.92 0c112-28.4 192 15.28 192.48 16a8 8 0 0012-6.88V90.944a8 8 0 00-8-8zM16 333.664V98.944h19.12v200.64a8 8 0 009.2 8 350.096 350.096 0 0150-4 207.516 207.516 0 0168.32 10.32A294.1 294.1 0 0016 333.664zm78.32-46a351.994 351.994 0 00-43.52 2.8V79.984a220.645 220.645 0 0147.44-5.28c29.92 0 71.2 6.88 99.84 39.2l.24 199.28c-16.64-10.88-49.12-25.52-104-25.52zm120-173.76c28.64-32 69.92-39.2 99.84-39.2a221.61 221.61 0 0147.44 5.28v210.48a351.895 351.895 0 00-43.28-2.88c-54.56 0-87.12 14.64-104 25.52v-199.2zm182.32 219.76a294.158 294.158 0 00-146.96-19.76 208.008 208.008 0 0168.64-10.32 349.994 349.994 0 0150.32 3.92 8 8 0 009.2-8V98.944h19.12l-.32 234.72z"}})]),a("router-link",{staticClass:"u-name",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{textContent:t._s(e.title)}})],1),e.remark?a("div",{staticClass:"u-remark",domProps:{textContent:t._s("📑 "+e.remark)}}):t._e()])]),a("div",{staticClass:"m-body"},[a("div",{staticClass:"u-excerpt",attrs:{to:{name:"view",params:{source_id:e.source_id}}},domProps:{innerHTML:t._s(t.ellipsis(e.excerpt))}})])])})),0)])},w=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"m-title"},[a("span",{staticClass:"u-title-left"},[a("i",{staticClass:"el-icon-time"}),a("span",[t._v(" 最新更新")])])])}],x=(a("498a"),a("85e4")),y={name:"Recent",props:["list"],components:{},data:function(){return{}},computed:{},watch:{},methods:{authorLink:x["authorLink"],ts2str:x["ts2str"],ellipsis:function(t){return t=t?t.trim():"",t.length>100?t.slice(0,100)+"...":t}},created:function(){this.list&&console.log(this.list)}},j=y,O=Object(d["a"])(j,b,w,!1,null,null,null),P=O.exports,S=a("434b"),$=a("c967"),E=a("9616"),K={name:"KnowledgeIndex",components:{knowledgeSearch:s["a"],knowledgeList:r["a"],wikiGuide:f,wikiHot:C,wikiRecent:P},data:function(){return{loading:!1,search:"",list:"",page:1,per:20,total:1,pages:1,guide:"",hot:{title:"热门剧情",icon:"el-icon-collection",list:""},recent:""}},computed:{params:function(){var t={limit:this.per,page:this.page,keyword:this.search};return t},pagination:function(){return{page:this.page,total:this.total,per:this.per}}},methods:{getGuideData:function(){var t=this;Object($["c"])({names:["guide-pve","guide-pvx","guide-pvp"]}).then((function(e){t.guide=e.data}))},getHotData:function(){var t=this;Object(E["b"])("plot","views",18).then((function(e){var a=[];e.data.forEach((function(t){if(t.name.startsWith("plot")){var e=t.name.split("-").pop();a.push(e)}})),Object(S["c"])({ids:a.join()}).then((function(e){t.hot.list=e.data}))}))},getRecentData:function(){var t=this;Object($["b"])({type:"knowledge"}).then((function(e){t.recent=e.newest}))},getSearchData:function(){var t=this;this.loading=!0,Object(S["c"])(this.params).then((function(e){t.list=e.data,t.total=e.total})).finally((function(){t.loading=!1}))},onSearchKey:function(t){this.search=t,this.page=1},onPageKey:function(t){this.page=t}},watch:{params:function(){this.getSearchData()}},created:function(){this.getGuideData(),this.getRecentData()}},R=K,L=(a("abb4"),Object(d["a"])(R,n,i,!1,null,null,null));e["default"]=L.exports},"857a":function(t,e,a){var n=a("e330"),i=a("1d80"),s=a("577e"),r=/"/g,c=n("".replace);t.exports=function(t,e,a,n){var o=s(i(t)),l="<"+e;return""!==a&&(l+=" "+a+'="'+c(s(n),r,"&quot;")+'"'),l+">"+o+"</"+e+">"}},9006:function(t,e,a){"use strict";a("56ce")},"9911f":function(t,e,a){"use strict";var n=a("23e7"),i=a("857a"),s=a("af03");n({target:"String",proto:!0,forced:s("link")},{link:function(t){return i(this,"a","href",t)}})},a15b:function(t,e,a){"use strict";var n=a("23e7"),i=a("e330"),s=a("44ad"),r=a("fc6a"),c=a("a640"),o=i([].join),l=s!=Object,u=c("join",",");n({target:"Array",proto:!0,forced:l||!u},{join:function(t){return o(r(this),void 0===t?",":t)}})},abb4:function(t,e,a){"use strict";a("2962")},ad56:function(t,e,a){"use strict";a("e459")},ae25:function(t){t.exports=JSON.parse('{"game":"el-icon-orange","jargon":"el-icon-postcard","plot":"el-icon-collection","bigbang":"el-icon-mic","gossip":"el-icon-film","organization":"el-icon-school","player":"el-icon-user","sleep":"el-icon-map-location","npc":"el-icon-monitor","castle":"el-icon-coordinate","blacklist":"el-icon-warning-outline","other":"el-icon-more-outline"}')},af03:function(t,e,a){var n=a("d039");t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},c8d2:function(t,e,a){var n=a("5e77").PROPER,i=a("d039"),s=a("5899"),r="​᠎";t.exports=function(t){return i((function(){return!!s[t]()||r[t]()!==r||n&&s[t].name!==t}))}},e459:function(t,e,a){},fd0c:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.list?a("div",{staticClass:"m-knowledge"},[t.list.length?t._l(t.list,(function(t,e){return a("knowledgeItem",{key:e,attrs:{data:t}})})):a("div",{staticClass:"m-noKnowledge"},[a("el-alert",{attrs:{title:"没有对应的百科",type:"info",center:"","show-icon":""}})],1)],2):t._e(),a("el-pagination",{staticClass:"m-archive-pages",attrs:{background:"",layout:"total, prev, pager, next, jumper","hide-on-single-page":!0,"page-size":t.pagination.per,total:t.pagination.total,"current-page":t.pagination.page},on:{"update:currentPage":function(e){return t.$set(t.pagination,"page",e)},"update:current-page":function(e){return t.$set(t.pagination,"page",e)},"current-change":t.changePage}})],1)},i=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.data?a("router-link",{staticClass:"m-knowledge-item",attrs:{to:{name:"view",params:{source_id:t.data.id}}}},[a("div",{staticClass:"u-name"},[a("span",{staticClass:"u-type"},[a("i",{staticClass:"u-icon",class:t.icons[t.data.type]}),t._v(" "+t._s(t.data.label))]),a("span",{staticClass:"u-title"},[t._v(t._s(t.data.name))])]),t.hasTag(t.data.post)?a("div",{staticClass:"u-tags"},[a("i",{staticClass:"el-icon-price-tag"}),t._l(t.data.post.tags,(function(e){return a("span",{key:e},[t._v(t._s(e))])}))],2):t._e(),t.data.post?a("span",{staticClass:"u-remark"},[a("i",{staticClass:"el-icon-edit"}),t._v("最后修订："+t._s(t.data.post.remark)+"@"+t._s(t.data.post.user_nickname)+" ")]):t._e(),t.data.updated?a("div",{staticClass:"u-updated"},[a("i",{staticClass:"el-icon-refresh"}),a("span",[t._v(" 最后更新于"+t._s(t.date_format(t.data.updated)))])]):t._e()]):t._e()},r=[],c=(a("4de4"),a("d3b7"),a("ae25")),o=a("85e4"),l={name:"item",props:["data"],data:function(){return{icons:c,date_format:o["ts2str"]}},computed:{},watch:{},methods:{hasTag:function(t){var e;return!(!t||null===(e=t.tags)||void 0===e||!e.filter(Boolean).length)}},created:function(){}},u=l,d=(a("ad56"),a("2877")),p=Object(d["a"])(u,s,r,!1,null,null,null),f=p.exports,m={name:"list",props:["list","pagination"],components:{knowledgeItem:f},methods:{changePage:function(t){this.$emit("onPageKey",t)}}},h=m,g=(a("9006"),Object(d["a"])(h,n,i,!1,null,null,null));e["a"]=g.exports}}]);
//# sourceMappingURL=chunk-7ebebeca.bd34991e.js.map
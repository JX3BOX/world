(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-018863d8"],{ccb0:function(t,e,n){},fd04:function(t,e,n){"use strict";n("ccb0")},ffda:function(t,e,n){"use strict";n.r(e);n("ac1f"),n("841c");var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"m-book-home"},[e("search-input"),e("wiki-panel",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"border-none":!0}},[e("template",{slot:"body"},[e("list-head"),t._l(t.list,(function(t){return e("item-card",{key:t.id,attrs:{item:t}})})),e("el-pagination",{staticStyle:{"text-align":"center","margin-top":"1.5rem"},attrs:{"hide-on-single-page":"",background:"",layout:"prev, pager, next","current-page":t.currentPage,total:t.total,"page-size":t.pageSize},on:{"current-change":t.search,"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e}}})],2)],2)],1)},i=[],c=(n("d3b7"),n("9412")),o=n("662c"),r=n("d2e3"),l=n("e424"),s=n("65c2"),d=n("85e4"),u=n("1339"),g={name:"Index",components:{SearchInput:c["a"],WikiPanel:o["a"],ListHead:r["a"],ItemCard:l["a"]},data:function(){return{by:"all",feedback:s["feedback"],list:[],loading:!1,total:1,pageSize:10,input:"",currentPage:1}},computed:{client:function(){return this.$store.state.client}},methods:{iconLink:d["iconLink"],search:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.loading=!0;var n={ids:this.id,keyword:this.keyword,page:e,client:this.client};this.list=[],Object(u["b"])(n).then((function(e){t.list=e.data.list,t.total=e.data.total,t.pageSize=e.data.per})).finally((function(){t.loading=!1})).catch((function(){t.loading=!1}))}},mounted:function(){this.search()}},p=g,f=(n("fd04"),n("2877")),h=Object(f["a"])(p,a,i,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-018863d8.d8dd9d7e.js.map
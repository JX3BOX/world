(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee4860ea"],{5605:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"m-reputation-home"},[t("search-input"),t("wiki-panel",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"border-none":!0}},[t("template",{slot:"head-title"},[t("i",{staticClass:"el-icon-notebook-2"}),t("span",[e._v("最新声望")])]),t("template",{slot:"body"},[t("list-head"),e._l(-1===e.level?e.news:e.list,(function(n){return t("item-card",{key:n.dwForceID,attrs:{item:n,level:e.level}})}))],2)],2)],1)},a=[],s=(n("4de4"),n("d3b7"),n("b64b"),n("34f8")),l=n("662c"),c=n("08dd"),o=n("ac02"),d=n("65c2"),r=n("85e4"),u=n("4238"),f={name:"Index",components:{SearchInput:s["a"],WikiPanel:l["a"],ListHead:c["a"],ItemCard:o["a"]},data:function(){return{by:"all",feedback:d["feedback"],news:[],list:[],level:-1,loading:!1}},computed:{client:function(){return this.$store.state.client}},watch:{level:function(e){this.list=-1!==e?this.news.filter((function(t){return Object.keys(t.RewardItems).some((function(t){return t>=e}))})):this.news}},methods:{iconLink:r["iconLink"],getNews:function(){var e=this;this.loading=!0,Object(u["d"])({client:this.client}).then((function(t){e.news=t.data.list||[]})).finally((function(){e.loading=!1})).catch((function(){e.loading=!1}))}},mounted:function(){this.getNews()}},h=f,w=(n("c711"),n("2877")),m=Object(w["a"])(h,i,a,!1,null,null,null);t["default"]=m.exports},7850:function(e,t,n){},c711:function(e,t,n){"use strict";n("7850")}}]);
//# sourceMappingURL=chunk-ee4860ea.aafe2312.js.map
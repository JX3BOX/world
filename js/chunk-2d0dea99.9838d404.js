(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dea99"],{8737:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"m-newest-quest"},[e("search-input"),e("list-head"),e("div",{staticClass:"u-quest-list"},t._l(t.data,(function(t,a){return e("quest-card",{key:a,attrs:{quest:t}})})),1),e("el-pagination",{staticStyle:{"text-align":"center"},attrs:{background:"",layout:"prev, pager, next",total:t.total,"page-size":15,"hide-on-single-page":""},on:{"current-change":t.getData}})],1)},s=[],i=a("9622"),c=a("7744"),u=a("c4306"),o=a("5ce7"),l={name:"QuestNewest",components:{QuestCard:u["a"],SearchInput:c["a"],ListHead:o["a"]},data:function(){return{data:[],total:0}},computed:{client:function(){return this.$store.state.client}},methods:{getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a={page:e,pageSize:15,client:this.client};Object(i["c"])(a).then((function(e){t.data=e.data.list,t.total=e.data.total}))}},mounted:function(){this.getData()}},r=l,d=a("2877"),p=Object(d["a"])(r,n,s,!1,null,"f243e98a",null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0dea99.9838d404.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1928c265"],{2909:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var a=n("6b75");function r(t){if(Array.isArray(t))return Object(a["a"])(t)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function i(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var s=n("06c5");n("d9e2");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return r(t)||i(t)||Object(s["a"])(t)||o()}},"35d2":function(t,e,n){"use strict";n("eb5a")},9852:function(t,e,n){},b64b:function(t,e,n){var a=n("23e7"),r=n("7b0b"),i=n("df75"),s=n("d039"),o=s((function(){i(1)}));a({target:"Object",stat:!0,forced:o},{keys:function(t){return i(r(t))}})},bb07:function(t){t.exports=JSON.parse('{"a":["一","二","三","四","五","六","七","八","九","十","十一","十二"],"b":["一","二","三","四","五","六","日"]}')},c2fb:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-calendar m-calendar"},[n("main",{staticClass:"m-calendar-main",class:t.getSloganMeta("style"),style:t.topStyle},[n("div",{staticClass:"m-calendar-header"},[n("div",{staticClass:"u-time"},[n("section",{staticClass:"m-calendar-year"},[n("el-button",{staticClass:"u-btn",attrs:{icon:"el-icon-arrow-left",size:"medium",disabled:t.prevDisabled},on:{click:function(e){return t.toggleYear("prev")}}}),n("span",{staticClass:"u-year"},[t._v(t._s(t.current.year))]),n("el-button",{staticClass:"u-btn",attrs:{icon:"el-icon-arrow-right",size:"medium",disabled:t.nextDisabled},on:{click:function(e){return t.toggleYear("next")}}})],1)]),n("div",{staticClass:"u-slogan m-calendar-slogan"},[n("a",{attrs:{href:t.getSloganMeta("url"),target:"_blank"}},[n("img",{attrs:{src:t.getSloganMeta("banner")}})])])]),n("section",{staticClass:"m-calendar-content"},[n("section",{staticClass:"m-calendar-week"},t._l(t.weeks,(function(e){return n("div",{key:e,staticClass:"u-week"},[n("span",[t._v(t._s(e))])])})),0),n("section",{staticClass:"m-calendar-date"},t._l(t.dataArr,(function(e,a){return n("div",{key:a,staticClass:"u-date",class:[{"u-other":["pre","next"].includes(e.type)},{"u-today":t.isToday(e)},{"u-current":t.isCurrent(e)}],on:{click:function(n){return n.preventDefault(),t.dateClick(e)}}},[t._v(" "+t._s(e.date)+" "),n("calendar-item",{attrs:{data:e,counts:t.counts,slogans:t.slogans}})],1)})),0)])]),n("aside",{staticClass:"m-calendar-aside"},[n("calendar-detail",{attrs:{"date-obj":t.current}})],1)])},r=[],i=n("5530"),s=(n("7db0"),n("d3b7"),n("99af"),n("caad"),n("159b"),n("c740"),n("d81d"),n("bb07")),o=n("3675"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"m-calendar-detail"},[n("header",{staticClass:"m-calendar-detail-header"},[n("h1",{staticClass:"m-calendar-detail-title"},[t._v(t._s(t.currentDate))]),n("el-button",{staticClass:"m-calendar-detail-add",attrs:{size:"medium",type:"primary",icon:"el-icon-plus"},on:{click:t.add}},[t._v("新增")])],1),n("main",{staticClass:"m-calendar-detail-content"},[n("section",{staticClass:"m-content-part"},[n("div",{staticClass:"u-part-header"},[n("el-divider",{attrs:{"content-position":"left"}},[n("i",{staticClass:"el-icon-s-flag"}),t._v(" 活动"),n("span",{staticClass:"u-count"},[t._v("("+t._s(t.activities_count)+")")])])],1),n("div",{staticClass:"m-part-content"},[t.activities&&t.activities.length?t._l(t.activities,(function(e){return n("calendar-detail-item",{key:e.id,staticClass:"u-item",attrs:{data:e},on:{edit:t.edit}})})):[t._m(0)]],2)]),t.events&&t.events.length?n("section",{staticClass:"m-content-part"},[n("div",{staticClass:"u-part-header"},[n("el-divider",{attrs:{"content-position":"left"}},[n("i",{staticClass:"el-icon-collection-tag"}),t._v(" 事件"),n("span",{staticClass:"u-count"},[t._v("("+t._s(t.events_count)+")")])])],1),n("div",{staticClass:"m-part-content"},[t.events&&t.events.length?t._l(t.events,(function(e){return n("calendar-detail-item",{key:e.id,staticClass:"u-item",attrs:{data:e},on:{edit:t.edit}})})):[t._m(1)]],2)]):t._e()]),n("calendar-dialog",{attrs:{"date-obj":t.dateObj,selected:t.selected,mode:t.mode,isSuper:!0},on:{update:t.update,del:t.del},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}})],1)},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"u-null"},[n("i",{staticClass:"el-icon-warning-outline"}),t._v("暂时没有任何活动记录")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"u-null"},[n("i",{staticClass:"el-icon-warning-outline"}),t._v("暂时没有任何事件记录")])}],u=(n("4de4"),n("b0c0"),n("864b")),d=n("cc1b"),h=n("c9d2"),v={name:"calendar-detail",props:{dateObj:{type:Object,default:function(){}}},components:{"calendar-dialog":u["a"],"calendar-detail-item":d["a"]},data:function(){return{loading:!1,list:[],visible:!1,selected:"",mode:""}},computed:{currentDate:function(){var t=this.dateObj,e=t.year,n=t.month,a=t.date;return"".concat(e," / ").concat(n," / ").concat(a)},client:function(){return this.$store.state.client},activities:function(){var t,e=this;return null===(t=this.list)||void 0===t?void 0:t.filter((function(t){return t.client==e.client&&2===t.type}))},activities_count:function(){var t;return(null===(t=this.activities)||void 0===t?void 0:t.length)||0},events:function(){var t;return null===(t=this.list)||void 0===t?void 0:t.filter((function(t){return 1===t.type}))},events_count:function(){var t;return(null===(t=this.events)||void 0===t?void 0:t.length)||0}},watch:{dateObj:{deep:!0,immediate:!0,handler:function(){this.loadData()}},visible:function(t){!t&&(this.selected="")}},methods:{loadData:function(){var t=this;return this.loading=!0,Object(o["f"])(this.dateObj).then((function(e){t.list=e.data.data})).finally((function(){t.loading=!1}))},add:function(){this.visible=!0,this.mode="create",this.selected=""},edit:function(t){this.visible=!0,this.mode="update",this.selected=t},update:function(t){var e=(null===t||void 0===t?void 0:t.data)||{},n=e.data;console.log(n),n&&this.isSameDate(n,this.dateObj)&&(n.desc="(待审核) ".concat(n.desc),n.user_info={display_name:h["a"].getInfo().name,user_avatar:h["a"].getInfo().avatar_origin},this.list.unshift(n)),this.visible=!1},del:function(t){var e=this;Object(o["b"])(t).then((function(){e.list=e.list.filter((function(e){return e.id!==t})),e.visible=!1}))},isSameDate:function(t,e){return t.year==e.year&&t.month==e.month&&t.date==e.date}}},f=v,m=(n("35d2"),n("2877")),y=Object(m["a"])(f,c,l,!1,null,null,null),g=y.exports,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-calendar-item",class:t.slogan?t.slogan.style:"",style:t.sloganStyle},[t._l(t.links,(function(e){return n("div",{key:e.id,staticClass:"u-link",class:t.linkClassName(e)},[t._v(" "+t._s(e.desc)+" ")])})),t.countData?n("div",{staticClass:"u-date-count"},[n("b",[t._v(t._s(t.countData.count))]),t._v("条纪事")]):t._e()],2)},p=[],C=n("2909"),_={name:"calendar-item",props:{data:{type:Object,default:null},counts:{type:Array,default:function(){return[]}},slogans:{type:Array,default:function(){return[]}}},computed:{links:function(){var t,e,n=null===(t=this.data)||void 0===t?void 0:t.children.filter((function(t){return 1==t.type})),a=null===(e=this.data)||void 0===e?void 0:e.children.filter((function(t){return 2==t.type}));return[].concat(Object(C["a"])(n),Object(C["a"])(a))},countData:function(){var t=this.data;return this.counts.find((function(e){return e.year===t.year&&e.month===t.month&&e.date===t.date}))},slogan:function(){var t=this.data;return this.slogans.find((function(e){return e.year===t.year&&e.month===t.month&&e.date===t.date}))},sloganStyle:function(){var t,e;return{backgroundColor:null===(t=this.slogan)||void 0===t?void 0:t.bgcolor,backgroundImage:"url(".concat(null===(e=this.slogan)||void 0===e?void 0:e.img,")")}}},methods:{linkClassName:function(t){var e=t.type;return 1===e?"is-event":"is-activity"}}},k=_,j=(n("f92c"),Object(m["a"])(k,b,p,!1,null,null,null)),D=j.exports,w={name:"Archive",components:{calendarDetail:g,"calendar-item":D},data:function(){return{current:{year:"",month:"",date:""},months:s["a"],weeks:s["b"],dataArr:[],counts:[],slogans:[]}},computed:{nextDisabled:function(){var t=(new Date).getFullYear();return t+1<=this.current.year},prevDisabled:function(){return this.current.year<=2009},params:function(){var t=this.current,e=t.year,n=t.month,a=t.date;return{year:e,month:n,date:a}},today:function(){return(new Date).getDate()},client:function(){return this.$store.state.client},pageSlogan:function(){var t=this.current;return this.slogans.find((function(e){return e.year===t.year&&e.month===t.month&&!e.date}))},topStyle:function(){var t,e;return{backgroundColor:null===(t=this.pageSlogan)||void 0===t?void 0:t.bgcolor,backgroundImage:"url(".concat(null===(e=this.pageSlogan)||void 0===e?void 0:e.img,")")}}},watch:{"$route.params":{immediate:!0,handler:function(t,e){var n=t.year,a=t.month,r=t.date;this.current={year:~~n,month:~~a,date:~~r||1},(null===e||void 0===e?void 0:e.year)===n&&(null===e||void 0===e?void 0:e.month)===a&&e||(this.getMonthData(),this.loadCalendar(),this.loadCalendarCount()),this.loadCalendarSlogans()}}},mounted:function(){},methods:{toggleYear:function(t){"prev"===t?this.current.year-=1:this.current.year+=1,this.current.date=1,this.$router.push("/archive/".concat(this.current.year,"/").concat(this.current.month,"/").concat(this.current.date))},toggleMonth:function(t){this.current.month=t+1,this.current.date=1,this.$router.push("/archive/".concat(this.current.year,"/").concat(this.current.month,"/").concat(this.current.date))},getMonthData:function(){var t=this.current,e=t.year,n=t.month,a=8,r=[],i=[31,28,31,30,31,30,31,31,30,31,30,31];(e%4===0&&e%100!==0||e%400===0)&&(i[1]=29,[3].includes(n)&&(a=7));for(var s=new Date(e,n-1,1).getDay(),o=new Date(e,n,1).getDay()||7,c=this.getPreMonth(this.current),l=this.getNextMonth(),u=0;u<s-1;u++){var d={type:"pre",date:i[c.month-1]-(s-u-2),month:c.month,year:c.year,children:[]};r.push(d)}for(var h=0;h<i[n-1];h++){var v={type:"normal",date:h+1,month:n,year:e,children:[]};r.push(v)}for(var f=0;f<a-o;f++){var m={type:"next",date:f+1,month:l.month,year:l.year,children:[]};r.push(m)}this.dataArr=r},getPreMonth:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=t||this.current,a=n.year,r=n.month;return 1===r?(a-=1,r=12):r-=1,{year:a,month:r,date:e}},getNextMonth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.current,n=e.year,a=e.month;return 12===a?(n+=1,a=1):a+=1,{year:n,month:a,date:t}},dateClick:function(t){var e=t.date,n=t.month,a=t.year;this.current.year=a,this.current.month=n,this.current.date=e,this.$router.push("/archive/".concat(this.current.year,"/").concat(this.current.month,"/").concat(this.current.date))},isToday:function(t){var e=t.year,n=t.month,a=t.date,r=new Date;return r.getFullYear()===e&&r.getMonth()+1===n&&r.getDate()===a},isCurrent:function(t){var e=t.year,n=t.month,a=t.date,r=this.current;return r.year===e&&r.month===n&&r.date===a},loadCalendar:function(){var t=this,e=this.current,n=e.year,a=e.month;Object(o["c"])({year:n,month:a},this.client).then((function(e){var n=e.data.data;null===n||void 0===n||n.forEach((function(e){var n=e.year,a=e.month,r=e.date,i=t.dataArr.findIndex((function(t){return t.year===n&&t.month===a&&t.date===r}));i&&t.dataArr[i].children.push(e)}))}))},loadCalendarCount:function(){var t=this,e=this.current,n=e.year,a=e.month;Object(o["d"])({year:n,month:a}).then((function(e){t.counts=e.data.map((function(t){return Object(i["a"])(Object(i["a"])({},t),{},{month:a,year:n})}))}))},loadCalendarSlogans:function(){var t=this,e=this.current,n=e.year,a=e.month;Object(o["e"])({year:n,month:a}).then((function(e){t.slogans=e.data}))},getSloganMeta:function(t){var e;return null===(e=this.pageSlogan)||void 0===e?void 0:e[t]}}},O=w,S=Object(m["a"])(O,a,r,!1,null,null,null);e["default"]=S.exports},c740:function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").findIndex,i=n("44d2"),s="findIndex",o=!0;s in[]&&Array(1)[s]((function(){o=!1})),a({target:"Array",proto:!0,forced:o},{findIndex:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),i(s)},d81d:function(t,e,n){"use strict";var a=n("23e7"),r=n("b727").map,i=n("1dde"),s=i("map");a({target:"Array",proto:!0,forced:!s},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},eb5a:function(t,e,n){},f92c:function(t,e,n){"use strict";n("9852")}}]);
//# sourceMappingURL=chunk-1928c265.0c6b648c.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[17,18],{554:function(e,t,n){"use strict";n.r(t),n.d(t,"pieConfigDefault",(function(){return r}));var r={chart:{type:"pie",spacing:[0,0,0,0],backgroundColor:"rgba(0,0,0,0)"},credits:!1,title:{text:"Sensors by types",align:"center",verticalAlign:"middle",floating:!0},legend:{enabled:!1}}},590:function(e,t,n){"use strict";n.r(t);n(101),n(7),n(40),n(35),n(45),n(55),n(49),n(27),n(12),n(56),n(62),n(50);var r=n(145),o=n(554);function l(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,f=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){f=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(f)throw o}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var f={setup:function(e,t){var n=Object(r.f)(),c=Object(r.a)((function(){return n.getters["sensors/list"]})),f=Object(r.a)((function(){return n.getters["sensorTypes/list"]})),d={},y=JSON.parse(JSON.stringify(o.pieConfigDefault)),v=Object(r.d)(null),h=Object(r.d)(null);return Object(r.g)(c,(function(){if(d={},y.series=[{name:"Amount of sensor of particular type",colorByPoint:!0,innerSize:"75%",data:[]}],c.value.length>0){var e,t=l(c.value);try{for(t.s();!(e=t.n()).done;){var n=e.value;d[n.type]||(d[n.type]=[]),d[n.type].push(n)}}catch(e){t.e(e)}finally{t.f()}var r=function(e){var t=f.value.find((function(t){return t.id===Number(e)}));if(!t)return"continue";y.series[0].data.push({name:t.name,y:d[e].length})};for(var o in d)r(o);v.value=y,h.value&&h.value.chart.series[0].update({data:v.value.series[0].data})}}),{immediate:!0}),{config:v,chartref:h}}},d=f,y=n(102),component=Object(y.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.config?n("VueHighcharts",{ref:"chartref",attrs:{options:e.config}}):e._e()}),[],!1,null,null,null);t.default=component.exports}}]);
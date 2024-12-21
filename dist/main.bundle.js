(()=>{"use strict";var e={365:(e,n,t)=>{t.d(n,{A:()=>g});var r=t(601),a=t.n(r),o=t(314),i=t.n(o),l=t(417),s=t.n(l),c=new URL(t(575),t.b),d=new URL(t(911),t.b),u=new URL(t(97),t.b),m=i()(a()),p=s()(c),f=s()(d),h=s()(u);m.push([e.id,`@font-face {\n  font-family: "aquire-bold";\n  src: url(${p});\n}\n@font-face {\n  font-family: "aquire";\n  src: url(${f});\n}\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  user-select: none;\n}\n:root {\n  --cell-size: 6vmin;\n  --border-width: 1px;\n  --usermapcolour: 0, 74, 140;\n  --scannercolour: 0, 86, 163;\n  --enemymapcolour: 255, 165, 0;\n  color: white;\n}\n\nbody {\n  height: 100vh;\n  width: 100vw;\n  background-image: url(${h});\n  background-size: cover;\n}\n\n.header {\n  height: 10vh;\n  font-family: "aquire-bold", system-ui;\n  font-weight: 400;\n  font-style: normal;\n  font-size: 10vmin;\n  color: black;\n  animation: fadeIn 1s forwards;\n}\n\n.maindiv {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  opacity: 0.9;\n  position: relative;\n}\n\n.playernames {\n  background-color: rgb(44, 44, 44);\n  opacity: 0.95;\n  font-family: "aquire";\n  font-size: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 3rem;\n  border-radius: 1rem;\n  gap: 1rem;\n  margin: auto 0;\n  animation: fadeIn forwards 1s;\n}\n\n.playernames input {\n  font-family: "Montserrat";\n  font-size: 1.6rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.75rem;\n  border: none;\n  outline: none;\n  align-self: stretch;\n}\n\n.confirmname {\n  display: flex;\n  font-family: "Montserrat";\n  font-size: 1.6rem;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  border-radius: 1rem;\n  background-color: green;\n  transition: all 0.2s ease-in-out;\n}\n\n.confirmname:hover {\n  cursor: pointer;\n  transform: scale(1.07);\n}\n\n.playernames img {\n  width: 2rem;\n}\n\n.gamemode {\n  display: flex;\n  flex-direction: column;\n  font-family: "aquire";\n  font-size: 2rem;\n  background-color: rgb(44, 44, 44);\n  opacity: 0.95;\n  border-radius: 1rem;\n  padding: 1rem;\n  gap: 1rem;\n  animation: fadeIn 1s forwards;\n}\n\n.gamemode .infotext {\n  align-self: center;\n}\n\n.gamechoice {\n  display: flex;\n  gap: 2rem;\n}\n\n.ai,\n.pvp {\n  border: 2px solid white;\n  padding: 1rem;\n  border-radius: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: black;\n  transition: all 0.3s ease-in-out;\n}\n\n.ai:hover,\n.pvp:hover {\n  background-color: white;\n  color: black;\n  transition: all 0.3s ease-in-out;\n  cursor: pointer;\n}\n\n.gamechoice .maintext {\n  font-size: 3rem;\n}\n\n.gamechoice .subtext {\n  font-size: 1.5rem;\n}\n\n.battlePage {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n  width: min-content;\n  position: relative;\n  z-index: 1;\n}\n\n.attackres {\n  background-color: rgb(27, 27, 27);\n  align-self: stretch;\n  display: flex;\n  justify-content: center;\n  font-family: "aquire", sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  padding: 1rem;\n  border-radius: 1rem;\n}\n\n.boards {\n  display: flex;\n  gap: 50px;\n}\n\n.passdevice {\n  align-self: stretch;\n  padding: 1rem;\n  background-color: rgb(27, 27, 27);\n  border-radius: 1rem;\n  font-family: "Montserrat", sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  display: flex;\n  justify-content: center;\n  text-align: center;\n}\n\n.player {\n  background-color: rgb(27, 27, 27);\n  padding: 2rem;\n  padding-top: 3rem;\n  border-radius: 1.5rem;\n  font-family: "Montserrat", sans-serif;\n  font-optical-sizing: auto;\n  font-style: normal;\n}\n\n.player1 {\n  color: #87ceeb;\n}\n\n.player2 {\n  color: #ffa500;\n}\n\n.player.setup {\n  display: grid;\n  grid-template-columns: auto auto;\n  grid-template-rows: auto auto auto 1fr;\n  gap: 1rem;\n}\n\n.setup .title {\n  grid-column: 1 / span 1;\n  grid-row: 2 / span 1;\n}\n\n.setup .playername {\n  font-family: "aquire";\n}\n\n.setup .fleet {\n  grid-row: 2 / span 2;\n  grid-column: 2 / span 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.setup .board {\n  background: radial-gradient(\n    rgba(var(--usermapcolour), 0.07),\n    rgba(var(--usermapcolour), 0.6)\n  );\n  position: relative;\n}\n\n.orientation,\n.confirm {\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n\n.orientation {\n  background-color: white;\n  width: 100%;\n  padding: 1rem;\n  gap: 1rem;\n  color: black;\n  justify-content: center;\n  justify-content: center;\n}\n\n.confirm img,\n.orientation img,\n.reset img,\n.randomize img {\n  width: 2rem;\n}\n\n.randomize img {\n  width: 2rem;\n}\n\n.shipdiv {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  background-color: rgba(0, 0, 0, 0.5);\n  padding: 0.5rem;\n  border-radius: 1rem;\n  outline: 2px solid white;\n  cursor: pointer;\n  transition: all 0.2s ease-in-out;\n}\n\n.shipdiv.dragging {\n  transform: scale(0.95);\n}\n\n.fleet .shipimg {\n  height: var(--cell-size);\n  user-select: none;\n  -webkit-user-drag: none;\n}\n\n.boardInfo {\n  grid-row: 3 / span 1;\n  grid-column: 1 / span 1;\n  display: grid;\n  grid-template-columns: var(--cell-size) repeat(10, var(--cell-size));\n  grid-template-rows: var(--cell-size) repeat(10, var(--cell-size));\n  place-content: start;\n}\n\n.columnnames {\n  grid-column: 2 / span 10;\n  grid-row: 1 / 2;\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-template-rows: subgrid;\n  align-items: center;\n}\n\n.rownames {\n  grid-column: 1 / 2;\n  grid-row: 2 / span 10;\n  display: grid;\n  grid-template-columns: subgrid;\n  grid-template-rows: subgrid;\n  align-items: center;\n}\n\n.board {\n  grid-column: 2 / span 10;\n  grid-row: 2 / span 10;\n  display: grid;\n  grid-template-columns: subgrid;\n  position: relative;\n  align-self: flex-start;\n  border-collapse: collapse;\n  outline: calc(var(--border-width) * 2) solid white;\n}\n\n.boardInfo > div > div {\n  text-align: center;\n}\n\n.player1 .board {\n  background: radial-gradient(\n    rgba(var(--usermapcolour), 0.07),\n    rgba(var(--usermapcolour), 0.6)\n  );\n}\n\n.player2 .board {\n  background: radial-gradient(\n    rgba(var(--enemymapcolour), 0.07),\n    rgba(var(--enemymapcolour), 0.6)\n  );\n  position: relative;\n  justify-content: start;\n}\n\n.boards .title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.boards .title .playername {\n  font-family: "aquire";\n}\n\n@keyframes scanning {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.radar {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  width: calc(var(--cell-size) * 10);\n  height: calc(var(--cell-size) * 10);\n  overflow: hidden;\n  background-color: rgba(0, 0, 0, 0);\n}\n\n.scanner {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: calc(var(--cell-size) * 5 * 1.5);\n  height: calc(var(--cell-size) * 5 * 1.5);\n  background-image: linear-gradient(\n    to top right,\n    rgba(var(--scannercolour), 1) 0%,\n    rgba(0, 0, 0, 0) 50%\n  );\n  transform-origin: top left;\n  animation: scanning 6s infinite linear;\n  position: relative;\n  z-index: 0;\n}\n\n.cell {\n  width: var(--cell-size);\n  height: var(--cell-size);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-collapse: collapse;\n  cursor: pointer;\n  border-bottom: var(--border-width) solid white;\n  border-right: var(--border-width) solid white;\n}\n\n.setup .cell {\n  z-index: 2;\n}\n\n.cell:nth-child(1 + 10n) {\n  border-right: none;\n}\n\n.cell:nth-child(n + 92) {\n  border-bottom: none;\n}\n\n.dragover {\n  background-color: green;\n}\n\n.invalid {\n  background-color: red;\n}\n\n@keyframes opacitykf {\n  0% {\n    opacity: 0.9;\n  }\n  50% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 0.9;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeOut {\n  0% {\n    opacity: initial;\n  }\n  100% {\n    opacity: 0.5;\n  }\n}\n\n@keyframes removekf {\n  0% {\n    opacity: initial;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.board .shipimg {\n  position: relative;\n  align-self: stretch;\n  z-index: 2;\n  height: var(--cell-size);\n  animation: opacitykf 4s infinite;\n}\n\n.hit {\n  position: absolute;\n  z-index: 4;\n  width: calc(0.6 * var(--cell-size));\n}\n\n.buttons {\n  grid-column: 1 / span 2;\n  grid-row: 4 / span 1;\n  display: flex;\n  gap: 1rem;\n  justify-content: end;\n}\n\n.confirm,\n.reset,\n.randomize {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem;\n  background-color: green;\n  border-radius: 1rem;\n  opacity: 1;\n  font-weight: 600;\n  font-size: 1.25rem;\n  transition: all 0.2s ease-in-out;\n}\n\n.confirm:hover,\n.reset:hover,\n.randomize:hover {\n  cursor: pointer;\n  transform: scale(1.08);\n}\n\n.reset {\n  background-color: #ed2939;\n}\n\n.randomize {\n  background-color: #00bcd4;\n}\n\ndialog[open] {\n  align-self: center;\n  margin: 0 auto;\n  width: max-content;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2rem;\n  padding: 2rem;\n  border-radius: 1rem;\n  outline: none;\n  border: none;\n  background-color: rgb(27, 27, 27);\n  opacity: 0.8;\n  color: #17ace7;\n  animation: fadeIn forwards 1s;\n}\n\ndialog[open].remove {\n  animation: removekf 1s forwards;\n}\n\ndialog.defeat {\n  color: #ed2939;\n}\n\ndialog .maintext {\n  font-family: "aquire-bold";\n  font-size: 3.2rem;\n}\n\ndialog .subtext {\n  font-family: "aquire";\n  font-size: 2rem;\n  align-self: center;\n  text-align: center;\n}\ndialog .restart {\n  font-family: "Montserrat", sans-serif;\n  font-optical-sizing: auto;\n  font-style: normal;\n  background-color: green;\n  border-radius: 1rem;\n  padding: 1rem;\n  color: white;\n  width: max-content;\n  align-self: center;\n  font-size: 1.5rem;\n  transition: all 0.18s ease-in-out;\n}\n\ndialog .restart:hover {\n  cursor: pointer;\n  transform: scale(1.1);\n}\n\n.remove {\n  animation: removekf forwards 1s;\n}\n\n.overlay {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: fadeIn forwards 0.4s;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 1);\n  z-index: 10;\n}\n\n.overlay.hidden {\n  display: none; /* Hide the overlay when not needed */\n}\n\n.overlay-content {\n  width: max-content;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem;\n  border-radius: 1rem;\n  box-shadow: 0 4px 100px rgba(0, 0, 0, 0.9);\n}\n\n.overlay .maintext {\n  font-family: "aquire";\n  color: white;\n  font-size: 4rem;\n}\n\n.overlay .subtext {\n  font-family: "aquire";\n  color: white;\n  font-size: 2rem;\n}\n\n.changeplayer {\n  border-radius: 1rem;\n  border: 2px solid white;\n  padding: 1rem;\n  font-family: "Montserrat";\n  font-weight: 500;\n  transition: all 0.3s ease-in-out;\n}\n\n.changeplayer:hover {\n  background-color: white;\n  color: black;\n  cursor: pointer;\n}\n`,""]);const g=m},314:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var l=0;l<this.length;l++){var s=this[l][0];null!=s&&(i[s]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);r&&i[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),n.push(d))}},n}},417:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var o={},i=[],l=0;l<e.length;l++){var s=e[l],c=r.base?s[0]+r.base:s[0],d=o[c]||0,u="".concat(c," ").concat(d);o[c]=d+1;var m=t(u),p={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==m)n[m].references++,n[m].updater(p);else{var f=a(p,r);r.byIndex=l,n.splice(l,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function a(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,a){var o=r(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var l=t(o[i]);n[l].references--}for(var s=r(e,a),c=0;c<o.length;c++){var d=t(o[c]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}o=s}}},659:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},540:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},56:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var a=void 0!==t.layer;a&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,a&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},113:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},97:(e,n,t)=>{e.exports=t.p+"1a1a21d87d1401dba4c7.jpg"},575:(e,n,t)=>{e.exports=t.p+"cfc5ce07bacb3e5972c3.otf"},911:(e,n,t)=>{e.exports=t.p+"a37a828dd20a35dc68d2.otf"}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var o=n[r]={id:r,exports:{}};return e[r](o,o.exports,t),o.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&"SCRIPT"===n.currentScript.tagName.toUpperCase()&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=r[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0;var r=t(72),a=t.n(r),o=t(825),i=t.n(o),l=t(659),s=t.n(l),c=t(56),d=t.n(c),u=t(540),m=t.n(u),p=t(113),f=t.n(p),h=t(365),g={};g.styleTagTransform=f(),g.setAttributes=d(),g.insert=s().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=m(),a()(h.A,g),h.A&&h.A.locals&&h.A.locals;const y=t.p+"ddcf7d794ea7846dcddf.svg",v=t.p+"1c4937303581e3806ef9.svg",b=t.p+"50221eb2398e51dcb1ed.svg",E=t.p+"f6ef7c23bfd6c4a21d83.svg",C=t.p+"1936f37fbc0d2379f21c.svg",S=t.p+"8b026238b74df9a23e47.svg",x=t.p+"f81ff8d680ac010b2cee.svg",L=t.p+"42fa9f0fa292e721fe9f.svg",w=t.p+"081a1aa675dbb2c08440.svg",k=t.p+"23444f031968f5d2ea2d.svg",A=[v,E,b,C,S],T=["CARRIER","BATTLESHIP","CRUISER","SUBMARINE","DESTROYER"],q=[5,4,3,3,2];let O,M,R=0,N=[],I=[],z=[];function $(){N.forEach((e=>{e.classList.remove("dragover"),e.classList.remove("invalid")})),N=[]}function U(e,n,t,r){if($(),r){let r,a=!1;for(r=0;r<t&&e+r<10;r++){const t=document.querySelectorAll(".cell")[10*(e+r)+n];t&&(t.classList.add("dragover"),N.push(t),"null"!=t.dataset.ship&&(a=!0))}if(r<t)for(let t=0;t<r;t++)document.querySelectorAll(".cell")[10*(e+t)+n].classList.add("invalid");else if(a)for(let r=0;r<t;r++)document.querySelectorAll(".cell")[10*(e+r)+n].classList.add("invalid")}else{let r,a=!1;for(r=0;r<t&&n+r<10;r++){const t=document.querySelectorAll(".cell")[10*e+n+r];t&&(t.classList.add("dragover"),N.push(t),"null"!=t.dataset.ship&&(a=!0))}if(r<t)for(let t=0;t<r;t++)document.querySelectorAll(".cell")[10*e+n+t].classList.add("invalid");else if(a)for(let r=0;r<t;r++)document.querySelectorAll(".cell")[10*e+n+r].classList.add("invalid")}}function P(e,n){const t=document.createElement("div");t.classList.add("player"),t.classList.add("setup");const r=document.createElement("div");r.classList.add("boardInfo");const a=document.createElement("div");a.classList.add("board");const o=document.createElement("div");o.classList.add("radar");const i=document.createElement("div");i.classList.add("scanner"),o.appendChild(i),a.appendChild(o);for(let e=0;e<10;e++)for(let n=0;n<10;n++){const t=document.createElement("div");t.classList.add("cell"),t.dataset.pos=`${e} ${n}`,t.dataset.ship=null,t.addEventListener("dragover",(e=>{e.preventDefault()})),t.addEventListener("dragenter",(e=>{const n=e.target;if(n.classList.contains("cell")){const[e,t]=n.dataset.pos.split(" ").map(Number);U(e,t,O,R)}})),t.addEventListener("drop",(e=>{const n=e.target;if(n.classList.contains("cell")){let t=n.dataset.pos.split(" ").map(Number),r=e.dataTransfer.getData("text");if(!n.classList.contains("invalid")){let e=!0;if(R){for(let n=0;n<O;n++)if(document.querySelectorAll(".cell")[10*(t[0]+n)+t[1]].classList.contains("invalid")){e=!1;break}}else for(let n=0;n<O;n++)if(document.querySelectorAll(".cell")[10*t[0]+t[1]+n].classList.contains("invalid")){e=!1;break}e&&(D(r,t,R),z.push([r,t,R]))}}$()})),a.appendChild(t)}r.appendChild(a),a.addEventListener("dragleave",(e=>{a.contains(e.relatedTarget)||$()}));const l=document.createElement("div");l.classList.add("columnnames");for(let e=0;e<10;e++){const n=document.createElement("div");n.textContent=String.fromCharCode(e+65),l.appendChild(n)}const s=document.createElement("div");s.classList.add("rownames");for(let e=0;e<10;e++){const n=document.createElement("div");n.textContent=e+1,s.appendChild(n)}const c=document.createElement("h1");c.classList.add("playername"),c.textContent=`COMMANDER ${e},`;const d=document.createElement("h1");d.classList.add("title"),r.append(l,s),d.textContent="DEPLOY YOUR FLEET";const u=H();u.classList.add("fleet");const m=document.createElement("div");m.classList.add("buttons");const p=document.createElement("div");p.classList.add("confirm");const f=document.createElement("img");f.src=y;const h=document.createElement("div");h.textContent="CONFIRM",p.append(f,h);const g=document.createElement("div");g.classList.add("reset");const v=document.createElement("img");v.src=w;const b=document.createElement("div");b.textContent="RESET",g.append(v,b);const E=document.createElement("div");E.classList.add("randomize");const C=document.createElement("img");C.src=k;const S=document.createElement("div");function x(){I.forEach((e=>{e.removeChild(e.firstChild)})),I=[];const e=document.querySelector(".board");z.forEach((([n,t,r])=>{let a=q[T.indexOf(n.toUpperCase())];if(r)for(let n=0;n<a;n++)e.querySelectorAll(".cell")[10*(t[0]+n)+t[1]].dataset.ship=null;else for(let n=0;n<a;n++)e.querySelectorAll(".cell")[10*t[0]+t[1]+n].dataset.ship=null})),z=[];const n=t.querySelector(".fleet"),r=H();r.classList.add("fleet"),t.removeChild(n),t.insertBefore(r,m)}return S.textContent="RANDOMIZE",E.append(C,S),m.append(E,g,p),p.addEventListener("click",(()=>{5==z.length&&n(z,e)})),g.addEventListener("click",(()=>{x()})),E.addEventListener("click",(()=>{!function(){x(),z=[];const e=Array(10).fill().map((()=>Array(10).fill().map((()=>0)))),n=["carrier","battleship","cruiser","submarine","destroyer"],t=[5,4,3,3,2];for(let r=0;r<5;r++){let a,o,i=Math.random()>.5?1:0,l=t[r],s=n[r];if(i){let n;do{n=!1,a=Math.floor(Math.random()*(10-l)),o=Math.floor(10*Math.random());for(let t=0;t<l;t++)if(e[a+t][o]){n=!0;break}}while(n);for(let n=0;n<l;n++)e[a+n][o]=1}else{let n;do{n=!1,a=Math.floor(10*Math.random()),o=Math.floor(Math.random()*(10-l));for(let t=0;t<l;t++)if(e[a][o+t]){n=!0;break}}while(n);for(let n=0;n<l;n++)e[a][o+n]=1}D(s,[a,o],i),z.push([s,[a,o],i])}}()})),t.append(c,d,r,u,m),t.style.animation="fadeIn forwards 1s",document.querySelector(".maindiv").appendChild(t),t}function D(e,n,t){!function(e){switch(e){case"carrier":O=5,M=v;break;case"battleship":O=4,M=E;break;case"cruiser":O=3,M=b;break;case"submarine":O=3,M=C;break;case"destroyer":O=2,M=S}}(e);const r=document.querySelector(".board"),a=document.createElement("img");if(a.src=M,a.classList.add("shipimg"),a.draggable=!1,a.style.width=`calc(var(--cell-size)*${O})`,"submarine"==e&&(a.style.width=`calc(var(--cell-size)*${O}*0.94)`),t){a.style.transform="rotate(270deg)",a.style.transformOrigin=1/(2*O)*100+"% 50%",r.querySelectorAll(".cell")[10*(n[0]+O-1)+n[1]].appendChild(a),I.push(r.querySelectorAll(".cell")[10*(n[0]+O-1)+n[1]]);for(let t=0;t<O;t++)r.querySelectorAll(".cell")[10*(n[0]+t)+n[1]].dataset.ship=e}else{r.querySelectorAll(".cell")[10*n[0]+n[1]].appendChild(a),I.push(r.querySelectorAll(".cell")[10*n[0]+n[1]]);for(let t=0;t<O;t++)r.querySelectorAll(".cell")[10*n[0]+n[1]+t].dataset.ship=e}let o=T.indexOf(e.toUpperCase());const i=document.querySelectorAll(".shipdiv")[o],l=i.getBoundingClientRect();for(i.style.width=`${l.width}px`,i.style.height=`${l.height}px`;i.hasChildNodes();)i.removeChild(i.firstChild);i.draggable=!1}function H(){const e=document.createElement("div"),n=document.createElement("div");n.classList.add("orientation");const t=document.createElement("img");t.src=L;const r=document.createElement("div");r.textContent="HORIZONTAL",n.append(t,r),n.addEventListener("click",(()=>{n.removeChild(n.firstChild);const e=document.createElement("img");"VERTICAL"==r.textContent?(e.src=L,r.textContent="HORIZONTAL",R=0):(e.src=x,r.textContent="VERTICAL",R=1),n.insertBefore(e,n.childNodes[0])})),e.appendChild(n);for(let n=0;n<5;n++){const t=document.createElement("div");t.draggable=!0,t.classList.add("shipdiv");const r=document.createElement("img");r.classList.add("shipimg");const a=document.createElement("div");a.classList.add("shipname"),r.src=A[n],a.textContent=T[n],t.append(r,a),t.dataset.name=T[n].toLowerCase(),t.dataset.length=q[n],e.appendChild(t),t.addEventListener("dragstart",(e=>{const n=e.target,t=n.getBoundingClientRect(),r=n.cloneNode(!0);r.style.position="absolute",r.style.opacity=.001,r.style.width=`${t.width}px`,r.style.border="2px solid white",r.style.outline="none",document.querySelector(".fleet").appendChild(r),e.dataTransfer.setDragImage(r,.8*t.width,50),e.dataTransfer.setData("text",n.dataset.name),O=parseInt(n.dataset.length),n.addEventListener("dragend",(()=>{r.remove()}))}))}return e}function B(e,n,t){let r=0,a=0,o=!1;switch(e){case"carrier":r=5;break;case"battleship":r=4;break;case"cruiser":case"submarine":r=3;break;case"destroyer":r=2}function i(){return!o&&a>=r?(o=!0,!0):o}return{shipName:e,orientation:n,startCoords:t,isSunk:i,hit:function(){o||(a++,i())},hitCount:()=>a,getLength:()=>r}}const j=t.p+"6d775e6663db2f21628d.svg",Y=t.p+"101c497a5ad7aaea1d1e.svg",F=t.p+"31eac9c001c18af7ea34.svg",K=t.p+"5b8a7d0a3eb7d4276024.svg",G=t.p+"3f162e7064b55abfd7d7.svg",V=t.p+"d521eee49d389052ecbc.svg",W=t.p+"c8891ae4233d821e84dd.svg";let X,_,Z;function J(e,n){switch(e){case"carrier":X=5,_="ally"==n?v:j;break;case"battleship":X=4,_="ally"==n?E:Y;break;case"cruiser":X=3,_="ally"==n?b:K;break;case"submarine":X=3,_="ally"==n?C:F;break;case"destroyer":X=2,_="ally"==n?S:G}}function Q(e){let n=5,t=function(){const e=Array(10).fill().map((()=>Array(10).fill().map((()=>({ship:null,hit:!1}))))),n=Array(5).fill(null);let t,r=0;function a(){return 0==n.filter((e=>null==e)).length}return{receiveAttack:function([n,o],i){if(!function([n,t]){return e[n][t].hit}([n,o])&&a()){let a=0;return!function([n,t]){return!!e[n][t].ship}([n,o])||e[n][o].ship.isSunk()?(e[n][o].hit=!0,a=-1):(e[n][o].hit=!0,t=e[n][o].ship,t.hit(),a=1,t.isSunk()&&(r++,a=2)),function([e,n],t,r,a){let o="enemy"==r?"player2":"player1";if(-1==t){const t=document.createElement("img");t.src=V,t.classList.add("hit"),document.querySelectorAll(`.${o} .cell`)[10*e+n].appendChild(t)}else{if(2==t){let e=a.shipName,n=a.orientation,t=a.startCoords;if(J(e,"enemy"),"player2"==o){const r=document.createElement("img");r.classList.add("shipimg"),r.src=_,r.style.width=`calc(var(--cell-size)*${X})`,r.style.animation="fadeIn 0.5s forwards",r.style.opacity="0.3","submarine"==e&&(r.style.height="var(--cell-size)*0.8"),n?(r.style.transform="rotate(270deg)",r.style.transformOrigin=1/(2*X)*100+"% 50%",document.querySelectorAll(".player2 .cell")[10*(t[0]+X-1)+t[1]].appendChild(r)):document.querySelectorAll(".player2 .cell")[10*t[0]+t[1]].appendChild(r)}else{let e;e=n?document.querySelectorAll(".player1 .cell")[10*(t[0]+X-1)+t[1]]:document.querySelectorAll(".player1 .cell")[10*t[0]+t[1]],console.log(e),e.querySelector(".shipimg").style.animation="fadeOut 0.5s forwards"}}const r=document.createElement("img");r.src=W,r.classList.add("hit"),document.querySelectorAll(`.${o} .cell`)[10*e+n].appendChild(r)}}([n,o],a,i,t),a}return 0},allSunk:()=>5==r,placeShip:(t,r,a)=>{let o;switch(t){case"carrier":o=4;break;case"battleship":o=3;break;case"cruiser":o=2;break;case"submarine":o=1;break;case"destroyer":o=0;break;default:return!1}if(null!=n[o])return!1;let i=new B(t,a,r),[l,s]=r;if(l<0||s<0||l>9||s>9)return!1;let c=i.getLength();if(0==a){if(s+c-1>9)return!1;for(let n=0;n<c;n++){if(e[l][s+n].ship){for(let t=0;t<n;t++)e[l][s+t].ship=null;return!1}e[l][s+n].ship=i}}else{if(l+c-1>9)return!1;for(let n=0;n<c;n++){if(e[l+n][s].ship){for(let t=0;t<n;t++)e[l+t][s].ship=null;return!1}e[l+n][s].ship=i}}return n[o]=i,!0},allShipsPlaced:a,getFleet:()=>n,getShipHits:()=>{let e=[];return n.forEach((n=>{null!=n?e.push(n.hitCount()):e.push(null)})),e},getShipName:([n,t])=>e[n][t].ship.shipName,getShipOrientation:([n,t])=>e[n][t].ship.orientation,getShipStartCoords:([n,t])=>e[n][t].ship.startCoords,renderBoard:(t,r)=>function(e,n,t,r){function a(e,n,t){const r=document.createElement("img");r.src=_,r.classList.add("shipimg"),r.style.width=`calc(var(--cell-size)*${X})`,n&&(r.style.animation="fadeOut 0.5s forwards"),e.orientation?(r.style.transform="rotate(270deg)",r.style.transformOrigin=1/(2*X)*100+"% 50%","submarine"==e.shipName&&(r.style.width=`calc(var(--cell-size)*${X}*0.94)`),document.querySelectorAll(`.${t} .cell`)[10*(e.startCoords[0]+X-1)+e.startCoords[1]].appendChild(r)):("submarine"==e.shipName&&(r.style.width=`calc(var(--cell-size)*${X}*0.94)`),document.querySelectorAll(`.${t} .cell`)[10*e.startCoords[0]+e.startCoords[1]].appendChild(r))}function o(e){document.querySelectorAll(`.${e} .cell`).forEach((e=>{if(e.hasChildNodes())for(;e.hasChildNodes();)e.removeChild(e.firstChild)}))}let i="user"==n?"player1":"player2";"player1"==i?(o("player1"),t.forEach((e=>{J(e.shipName,"ally"),a(e,e.isSunk(),"player1")}))):(o("player2"),t.forEach((e=>{e.isSunk()&&(J(e.shipName,"enemy"),a(e,e.isSunk(),"player2"))}))),r.forEach(((e,n)=>{e.forEach(((e,t)=>{if(e.hit)if(null!=e.ship){const e=document.createElement("img");e.src=W,e.classList.add("hit"),document.querySelectorAll(`.${i} .cell`)[10*n+t].appendChild(e)}else{const e=document.createElement("img");e.src=V,e.classList.add("hit"),document.querySelectorAll(`.${i} .cell`)[10*n+t].appendChild(e)}}))}))}(0,r,n,e)}}();return{name:e,placeShip:function(e,n,r){return t.placeShip(e,n,r)},allShipsPlaced:()=>t.allShipsPlaced(),allShipsSunk:()=>t.allSunk(),recordHit:function([e,r],a){let o=t.receiveAttack([e,r],a);return 2==o&&n--,o},renderBoard:n=>t.renderBoard(e,n),getFleet:()=>t.getFleet(),shipsLeft:()=>n}}function ee(e){const n=document.createElement("div");n.classList.add("player"),n.classList.add(e);const t=document.createElement("div");t.classList.add("boardInfo");const r=document.createElement("div");r.classList.add("board");for(let e=0;e<10;e++)for(let n=0;n<10;n++){const t=document.createElement("div");t.classList.add("cell"),t.dataset.pos=`${e} ${n}`,r.appendChild(t)}t.appendChild(r);const a=document.createElement("div");a.classList.add("columnnames");for(let e=0;e<10;e++){const n=document.createElement("div");n.textContent=String.fromCharCode(e+65),a.appendChild(n)}const o=document.createElement("div");o.classList.add("rownames");for(let e=0;e<10;e++){const n=document.createElement("div");n.textContent=e+1,o.appendChild(n)}const i=document.createElement("div");i.classList.add("title");const l=document.createElement("h1"),s=document.createElement("h1");return s.classList.add("playername"),i.append(s,l),t.append(a,o),l.textContent="player1"==e?"ALLY WATERS":"ENEMY WATERS",n.append(i,t),n}function ne(e,n,t,r,a,o){const i=document.createElement("div");i.classList.add("battlePage");const l=document.createElement("div");l.classList.add("boards");const s=document.createElement("dialog"),c=document.createElement("div");if(c.classList.add("attackres"),i.append(c,l),"pvp"==e){const e=document.createElement("div");e.classList.add("passdevice"),e.textContent='PLEASE WAIT TILL THE "PASS DEVICE" SCREEN APPEARS BEFORE PASSING THE DEVICE TO YOUR OPPONENT TO AVOID SPOILERS',i.appendChild(e);const n=document.createElement("div");n.classList.add("overlay");const t=document.createElement("div");t.classList.add("overlay-content");const r=document.createElement("div");r.classList.add("maintext"),r.textContent="It's Time to Switch!";const a=document.createElement("div");a.classList.add("subtext"),a.textContent="Pass the device to your opponent to continue the battle.";const o=document.createElement("div");o.classList.add("changeplayer"),o.textContent="Done",o.addEventListener("click",(()=>{n.classList.add("hidden")})),t.append(r,a,o),n.appendChild(t),document.querySelector(".maindiv").appendChild(n)}let d,u;i.style.animation="fadeIn forwards 1s",document.querySelector(".maindiv").append(i,s);let m=0;return"ai"==e?(!function(e,n){d=Q(e),u=function(){let e,n=[],t=Q("player2");const r=Array(10).fill().map((()=>Array(10).fill().map((()=>0))));function a(e,n,t,r){return{pos:[e,n],dir:[t,r]}}function o(e,n){return e>=0&&n>=0&&e<10&&n<10&&0==r[e][n]}return{placeShips:()=>{const e=Array(10).fill().map((()=>Array(10).fill().map((()=>0)))),n=["carrier","battleship","cruiser","submarine","destroyer"],r=[5,4,3,3,2];for(let a=0;a<5;a++){let o,i,l=Math.random()>.5?1:0,s=r[a],c=n[a];if(l){let n;do{n=!1,o=Math.floor(Math.random()*(10-s)),i=Math.floor(10*Math.random());for(let t=0;t<s;t++)if(e[o+t][i]){n=!0;break}}while(n)}else{let n;do{n=!1,o=Math.floor(10*Math.random()),i=Math.floor(Math.random()*(10-s));for(let t=0;t<s;t++)if(e[o][i+t]){n=!0;break}}while(n)}if(t.placeShip(c,[o,i],l))if(l)for(let n=0;n<s;n++)e[o+n][i]=1;else for(let n=0;n<s;n++)e[o][i+n]=1}},recordHit:function([e,n],r){return t.recordHit([e,n],r)},launchAttack:function(){if(0==n.length){let n;do{n=t()}while(!o(n[0],n[1]));return e=null,n}{let r;do{if(0==n.length){e=null;break}r=n.pop(),e=r.dir}while(!o(r.pos[0],r.pos[1]));if(null!=e)return r.pos;{let n;do{n=t()}while(!o(n[0],n[1]));return e=null,n}}function t(){return[Math.floor(10*Math.random()),Math.floor(10*Math.random())]}},logResult:([t,i],l)=>{if(r[t][i]=l,2==l)n=[];else if(1==l)if(null==e){const e=[[-1,0],[1,0],[0,-1],[0,1]];for(const[r,l]of e){const e=t+r,s=i+l;o(e,s)&&n.push(a(e,s,r,l))}}else{let r,o;r=t+e[0],o=i+e[1],n.push(a(r,o,e[0],e[1]))}},allShipsSunk:()=>t.allShipsSunk(),renderBoard:e=>t.renderBoard(e),getFleet:()=>t.getFleet(),shipsLeft:()=>t.shipsLeft()}}(),document.querySelector(".boards").appendChild(ee("player1")),document.querySelector(".boards").appendChild(ee("player2")),n.forEach((([e,n,t])=>d.placeShip(e,n,t))),u.placeShips(),document.querySelectorAll(".title .playername")[0].textContent=e,document.querySelectorAll(".title .playername")[1].textContent="COMPUTER",d.renderBoard("user"),u.renderBoard("enemy"),document.querySelector(".attackres").textContent=`COMMANDER ${d.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`}(n,t),document.querySelector(".player2 .board").addEventListener("click",(function e(n){const t=document.querySelector(".player2 .board");let r=n.target;if(r.classList.contains("cell")){let n,a,i=r.dataset.pos;[n,a]=i.split(" ");const l=document.querySelector(".attackres");let s=u.recordHit([parseInt(n),parseInt(a)],"enemy");if(l.textContent="IT'S THE COMPUTER'S TURN",2==s&&(l.textContent=`COMMANDER ${d.name.toUpperCase()}, ${5-u.shipsLeft()} SHIP${5-u.shipsLeft()>1?"S":""} DOWN. ${u.shipsLeft()} TO GO`),t.removeEventListener("click",e),u.allShipsSunk())return void o(d.name,!1);0!=s?setTimeout((()=>{let n=u.launchAttack(),r=d.recordHit(n,"user");if(d.allShipsSunk())return t.removeEventListener("click",e),void o(d.name,!0);u.logResult(n,r),t.addEventListener("click",e),l.textContent=`COMMANDER ${d.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`}),2e3):(t.addEventListener("click",e),l.textContent=`COMMANDER ${d.name.toUpperCase()}, YOU CANNOT ATTACK AN ALREADY ATTACKED REGION. CHOOSE A DIFFERENT ATTACK`)}}))):(!function(e,n,t,r){d=Q(e),u=Q(t),l.appendChild(ee("player1")),l.appendChild(ee("player2")),n.forEach((([e,n,t])=>d.placeShip(e,n,t))),r.forEach((([e,n,t])=>u.placeShip(e,n,t))),document.querySelectorAll(".title .playername")[0].textContent=e,document.querySelectorAll(".title .playername")[1].textContent=t,d.renderBoard("user"),u.renderBoard("enemy"),document.querySelector(".overlay").classList.remove("hidden"),document.querySelector(".attackres").textContent=`COMMANDER ${d.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`}(n,t,r,a),document.querySelector(".player2 .board").addEventListener("click",(function e(n){const t=document.querySelector(".player2 .board");let r,a,i=n.target;if(0==m?(r=d,a=u):(r=u,a=d),i.classList.contains("cell")){let n,l,s,c=i.dataset.pos;if([n,l]=c.split(" "),s=a.recordHit([parseInt(n),parseInt(l)],"enemy"),2==s&&(document.querySelector(".attackres").textContent=`COMMANDER ${a.name.toUpperCase()}, ${5-a.shipsLeft()} SHIP${5-a.shipsLeft()>1?"S":""} DOWN. ${a.shipsLeft()} TO GO`),a.allShipsSunk())return t.removeEventListener("click",e),void o(r.name,!1);0!=s&&setTimeout((()=>{document.querySelector(".overlay").classList.remove("hidden"),setTimeout((()=>{document.querySelector(".attackres").textContent=`COMMANDER ${a.name.toUpperCase()}, IT'S YOUR TURN. CHOOSE YOUR NEXT ATTACK`,document.querySelectorAll(".title .playername")[0].textContent=a.name,document.querySelectorAll(".title .playername")[1].textContent=r.name,a.renderBoard("user"),r.renderBoard("enemy"),0==m?m++:m--}),400)}),1750)}}))),i}function te(e,n,t){const r=document.querySelector(".maindiv");let a,o;function i(e,n){Z.classList.add("remove"),setTimeout((()=>{r.removeChild(Z),function(e,n,t){const r=document.querySelector("dialog"),a=document.createElement("div");a.classList.add("maintext");const o=document.createElement("div");o.classList.add("subtext"),n?(a.textContent="The Tide Has Turned Against You!",o.innerText=`Commander ${e}, you have faced defeat\n but a true Commander never gives up.`,r.classList.add("defeat")):(a.textContent="No Ship Left Standing!",o.innerText=`Commander ${e}, you have emerged victorious\nyou are A true Commander of the seas!`);const i=document.createElement("div");i.classList.add("restart"),i.textContent="PLAY AGAIN",i.addEventListener("click",(()=>{t()})),r.append(a,o,i),r.showModal()}(e,n,l)}))}function l(){!function(){const e=document.querySelector("dialog");e.classList.add("remove"),setTimeout((()=>{e.close(),document.querySelector(".maindiv").removeChild(e)}),1e3)}(),setTimeout((()=>re()),1e3)}Z=P(n,(function l(s,c){c==n?(a=s,"pvp"==e?(r.removeChild(Z),Z=P(t,l)):(r.removeChild(Z),Z=ne(e,n,a,null,null,i))):(o=s,r.removeChild(Z),Z=ne(e,n,a,t,o,i))}))}function re(){let e,n;const t=document.querySelector(".maindiv"),r=document.createElement("div");function a(r,o){t.removeChild(Z),"ai"==e?(""==r&&(r="Player 1"),te("ai",r)):0==o?(n=r,""==n&&(n="Player 1"),Z=ae(e,1,a)):(""==r&&(r="Player 2"),te("pvp",n,r))}r.classList.add("header"),r.textContent="BATTLESHIP",t.appendChild(r),Z=function(e){const n=document.createElement("div");n.classList.add("gamemode");const t=document.createElement("div"),r=document.createElement("div");r.classList.add("infotext"),r.textContent="Choose your opponent",t.classList.add("gamechoice");const a=document.createElement("div");a.classList.add("ai");const o=document.createElement("div");o.classList.add("maintext"),o.textContent="Single Player Mode";const i=document.createElement("div");i.classList.add("subtext"),i.textContent="User vs Computer",a.append(o,i),a.addEventListener("click",(()=>{e("ai")}));const l=document.createElement("div");l.classList.add("pvp");const s=document.createElement("div");s.classList.add("maintext"),s.textContent="Multiplayer Mode";const c=document.createElement("div");return c.classList.add("subtext"),c.textContent="User vs. User",l.append(s,c),l.addEventListener("click",(()=>e("pvp"))),t.append(a,l),n.append(r,t),document.querySelector(".maindiv").appendChild(n),n}((function(n){t.removeChild(document.querySelector(".header")),t.removeChild(Z),e=n,Z=ae(e,0,a)}))}function ae(e,n,t){const r=document.createElement("div");r.classList.add("playernames");const a=document.createElement("div");a.classList.add("infotext"),a.innerText="Enter your name,\ncommander";const o=document.createElement("input");o.placeholder=`Player ${n+1}`;const i=document.createElement("div");i.classList.add("confirmname");const l=document.createElement("img");l.src=y;const s=document.createElement("div");if(s.textContent="CONFIRM",i.append(l,s),i.addEventListener("click",(()=>{let e=o.value.toUpperCase();o.textContent="",t(e,n)})),document.addEventListener("keydown",(e=>{if("Enter"==e.key){let e=o.value.toUpperCase();o.textContent="",t(e,n)}})),r.append(a,o,i),"pvp"==e){const e=document.createElement("div");e.textContent=`Player ${n+1}`,r.insertBefore(e,a),r.style.paddingTop="1rem"}return document.querySelector(".maindiv").appendChild(r),r}re()})();
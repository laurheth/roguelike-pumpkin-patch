(()=>{"use strict";var t=function(){return(t=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},e="pumpkin-tile";const i=function(){function i(t,i,n){this.element=document.createElement("div"),this.element.classList.add(e);var o=t.content,s=void 0===o?"":o,r=t.color,a=void 0===r?"":r,l=t.background,h=void 0===l?"":l,c=t.className,u=void 0===c?"":c,p=t.classList,d=void 0===p?[]:p;!function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(i[n[o]]=t[n[o]])}}(t,["content","color","background","className","classList"]),this.content=s,this.color=a,this.background=h,d.length>0?this.classList=d:this.className=u,this.tileWidth=(null==n?void 0:n.tileWidth)?n.tileWidth:16,this.tileHeight=(null==n?void 0:n.tileHeight)?n.tileHeight:this.tileWidth,this.position=i}return Object.defineProperty(i.prototype,"content",{get:function(){return this._content},set:function(t){if(this.confirmContentElement(),this._content!==t){if("string"==typeof t)this.contentElement.innerHTML=t;else{for(;this.contentElement.lastElementChild;)this.contentElement.removeChild(this.contentElement.lastElementChild);this.contentElement.appendChild(t)}this._content=t}},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"background",{get:function(){return this._background},set:function(t){t!==this._background&&(this._background=t,this.element.style.backgroundColor=t)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"color",{get:function(){return this._color},set:function(t){t!==this._color&&(this._color=t,this.element.style.color=t)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"position",{get:function(){return this._position},set:function(e){this._position=t({},e),this.element.style.left=e.x*this.tileWidth+"px",this.element.style.top=e.y*this.tileHeight+"px"},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"tileWidth",{get:function(){return this._tileWidth},set:function(t){this._tileWidth=t,this.element.style.width=t+"px"},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"tileHeight",{get:function(){return this._tileHeight},set:function(t){this._tileHeight=t,this.element.style.height=t+"px"},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"className",{get:function(){return this.classList.join(" ")},set:function(t){this.classList=t?t.split(" "):[]},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"classList",{get:function(){return function(){for(var t=0,e=0,i=arguments.length;e<i;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<i;e++)for(var s=arguments[e],r=0,a=s.length;r<a;r++,o++)n[o]=s[r];return n}([e],this._classList)},set:function(t){var i,n,o=this;this._classList||(this._classList=[]),t.length===this._classList.length&&t.every((function(t){return o._classList.includes(t)}))&&this._classList.every((function(e){return t.includes(e)}))||(this._classList.length>0&&(i=this.element.classList).remove.apply(i,this._classList),this._classList=t.filter((function(t){return t.trim()&&t!==e})),t.length>0&&(n=this.element.classList).add.apply(n,this.classList))},enumerable:!1,configurable:!0}),i.prototype.setOptions=function(t){var e=t.content,i=void 0===e?"":e,n=t.background,o=void 0===n?"":n,s=t.color,r=void 0===s?"":s,a=t.className,l=void 0===a?"":a,h=t.classList;this.content=i,this.background=o,this.color=r,h?this.classList=h:this.className=l},i.prototype.updateOptions=function(t){var e=t.content,i=t.background,n=t.color,o=t.className,s=t.classList;void 0!==e&&(this.content=e),void 0!==i&&(this.background=i),void 0!==n&&(this.color=n),s&&s.length>0?this.classList=s:void 0!==o&&(this.className=o)},i.prototype.confirmContentElement=function(){this.contentElement||(this.contentElement=document.createElement("div"),this.element.appendChild(this.contentElement))},i}();const n=function(){function t(t){var e=t.target,i=t.width,n=void 0===i?1:i,o=t.height,s=void 0===o?1:o,r=t.tileWidth,a=t.tileHeight;!function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(i[n[o]]=t[n[o]])}}(t,["target","width","height","tileWidth","tileHeight"]),this.target=e,this.target.className?this.target.classList.add("pumpkin-container"):this.target.className="pumpkin-container",this.element=document.createElement("div"),this.element.className="pumpkin-display",this.element.setAttribute("aria-hidden","true"),this.dimensions={width:n,height:s},this.tileSize={tileWidth:r||16,tileHeight:a||r||16},this.applyDefaultStyles(),this.target.appendChild(this.element)}return Object.defineProperty(t.prototype,"tileSize",{get:function(){return this._tileSize},set:function(t){var e;this._tileSize=t,this.element.style.fontSize=t.tileHeight+"px",null===(e=this.tiles)||void 0===e||e.forEach((function(e){e.tileWidth=t.tileWidth,e.tileHeight=t.tileHeight,e.position=e.position})),this.resetSize()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"dimensions",{get:function(){return{width:this._width,height:this._height}},set:function(t){t.width!==this._width&&t.height!==this._height&&(this._width=t.width,this._height=t.height,this.allocateDisplay(),this.resetSize(),this.moveToCenter())},enumerable:!1,configurable:!0}),t.prototype.resetSize=function(){this._width&&this._height&&this.tileSize&&(this.element.style.width=this._width*this.tileSize.tileWidth+"px",this.element.style.height=this._height*this.tileSize.tileHeight+"px")},t.prototype.centerDisplay=function(t,e){this.centerPosition=void 0===t||void 0===e?void 0:{x:t,y:e},this.moveToCenter()},t.prototype.moveToCenter=function(){if(this.centerPosition){var t=(this.centerPosition.x+.5)/this.dimensions.width,e=(this.centerPosition.y+.5)/this.dimensions.height;this.element.style.transform="translate("+100*-t+"%,"+100*-e+"%)"}else this.element.style.transform=""},t.prototype.allocateDisplay=function(){var t=this;this.tiles&&this.tiles.forEach((function(e){t.element.removeChild(e.element)})),this.tiles=[];for(var e=0;e<this._height;e++)for(var n=0;n<this._width;n++){var o=new i({content:""},{x:n,y:e},this.tileSize);this.tiles.push(o),this.element.appendChild(o.element)}},t.prototype.getTile=function(t,e){if(t>=0&&t<this._width&&e>=0&&e<this._height){var i=t+e*this._width;return this.tiles[i]}},t.prototype.formatTileOptions=function(t){return"string"==typeof t||t instanceof HTMLElement?{content:t}:t},t.prototype.setTile=function(t,e,i){var n=this.getTile(t,e);n&&n.setOptions(this.formatTileOptions(i))},t.prototype.updateTile=function(t,e,i){var n=this.getTile(t,e);n&&n.updateOptions(this.formatTileOptions(i))},t.prototype.calculateDimensions=function(t){void 0===t&&(t=this.target.getBoundingClientRect());var e=Math.abs(t.right-t.left),i=Math.abs(t.bottom-t.top);return{width:Math.floor(e/this.tileSize.tileWidth),height:Math.floor(i/this.tileSize.tileHeight)}},t.prototype.calculateTileSize=function(t){void 0===t&&(t=this.target.getBoundingClientRect());var e=Math.abs(t.right-t.left),i=Math.abs(t.bottom-t.top),n={tileWidth:e/this.dimensions.width,tileHeight:i/this.dimensions.height},o=Math.min(n.tileWidth,n.tileHeight);return{tileWidth:o,tileHeight:o}},t.prototype.applyDefaultStyles=function(){var t="pumpkin-default-styles";if(!document.getElementById(t)){var e=document.createElement("style");e.id=t,e.type="text/css",e.appendChild(document.createTextNode("\n.pumpkin-container {\n    position: relative;\n    overflow: hidden;\n    background-color: #000000;\n    color: #ffffff;\n}\n\n.pumpkin-display {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.pumpkin-tile {\n    position: absolute;\n}\n\n.pumpkin-tile > * {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n}\n"));var i=document.head,n=document.querySelector("style, link");i.insertBefore(e,n)}},t}();const o=function(){function t(t){t||(t={});var e=t.type,i=void 0===e?"simple":e;this.type=i,this.queue=[],this.time=0}return t.prototype.add=function(t){var e={};if(t instanceof Function?e.callback=t:"act"in t?e.actor=t:Object.assign(e,t),void 0===e.repeats&&e.actor&&(e.repeats=!0),"complex"===this.type){e.delay||(e.delay=1);var i=e.delay+this.time;if(0===this.queue.length||this.queue[this.queue.length-1].time<=i)this.queue.push({event:e,time:i});else for(var n=0;n<this.queue.length;n++)if(i<this.queue[n].time){this.queue.splice(n,0,{event:e,time:i});break}}else this.queue.push({event:e,time:0})},t.prototype.advance=function(){return t=this,e=void 0,n=function(){var t;return function(t,e){var i,n,o,s,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(i)throw new TypeError("Generator is already executing.");for(;r;)try{if(i=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,n=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!((o=(o=r.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){r=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){r.label=s[1];break}if(6===s[0]&&r.label<o[1]){r.label=o[1],o=s;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(s);break}o[2]&&r.ops.pop(),r.trys.pop();continue}s=e.call(t,r)}catch(t){s=[6,t],n=0}finally{i=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}(this,(function(e){switch(e.label){case 0:if(0===this.queue.length)throw new Error("Event queue is empty.");return t=this.queue.shift(),this.time=t.time,"number"==typeof t.event.repeats&&t.event.repeats--,t.event.repeats&&this.add(t.event),t.event.callback?[4,t.event.callback()]:[3,2];case 1:e.sent(),e.label=2;case 2:return t.event.actor?[4,t.event.actor.act()]:[3,4];case 3:e.sent(),e.label=4;case 4:return[2]}}))},new((i=void 0)||(i=Promise))((function(o,s){function r(t){try{l(n.next(t))}catch(t){s(t)}}function a(t){try{l(n.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}));var t,e,i,n},t.prototype.remove=function(t){var e=this,i=[];this.queue.forEach((function(e,n){e.event.actor===t&&i.push(n)})),i.reverse(),i.forEach((function(t){e.queue.splice(t,1)}))},Object.defineProperty(t.prototype,"length",{get:function(){return this.queue.length},enumerable:!1,configurable:!0}),t}(),s=function(){function t(t,e){t||(t=Date.now()),this.seed=Math.floor(t),this.weyl=0,this.x=0,this.base=e||1e5;for(var i=0;i<10;i++)this.getRandom()}return t.prototype.getRandom=function(){return this.x*=this.x,this.x+=this.weyl+=this.seed,this.x=(this.x>>>32|this.x<<32)>>>0,this.x%this.base/this.base},t.prototype.getNumber=function(t,e,i){return void 0===i&&Number.isInteger(t)&&Number.isInteger(e)&&(i=!0),i?Math.floor(this.getRandom()*(e+1-t))+Math.ceil(t):this.getRandom()*(e-t)+t},t.prototype.getRandomElement=function(t){return t[this.getNumber(0,t.length-1,!0)]},t.prototype.getWeightedElement=function(t){var e=0,i=!0;t.forEach((function(t){e+=t.weight,i=i&&Number.isInteger(t.weight)}));for(var n=this.getNumber(i?1:0,e,i),o=0;o<t.length;o++)if((n-=t[o].weight)<=0)return t[o].option;throw new Error("No match found.")},t}();var r=function(){for(var t=0,e=0,i=arguments.length;e<i;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<i;e++)for(var s=arguments[e],r=0,a=s.length;r<a;r++,o++)n[o]=s[r];return n};!function(){function t(t){var e=t.canPass,i=t.metric,n=t.maxIterations,o=t.weight;!function(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(i[n[o]]=t[n[o]])}}(t,["canPass","metric","maxIterations","weight"]),this.canPass=e,i||(i=function(t,e){return Math.abs(e[1]-t[1])+Math.abs(e[0]-t[0])}),o||(o=function(t){return 1}),this.maxIterations=n,this.metric=i,this.weight=o}t.prototype.findPath=function(t,e,i){var n=this;void 0===i&&(i=!1);for(var o=[],s=this.maxIterations?this.maxIterations:40*this.metric(t,e),a=0,l=[{position:r(t),steps:0,distanceFromGoal:this.metric(t,e),previousLocation:null}],h=[],c=[0,1,1.2];a<s&&!this.contains(l,e);)a++,l.forEach((function(t){for(var o=-1;o<2;o++)for(var s=-1;s<2;s++)if(!i||0===o||0===s){var r=[t.position[0]+o,t.position[1]+s],a=c[Math.abs(o)+Math.abs(s)]*n.weight(r);if(n.canPass(r)){var u=n.getLocation(l,r),p=n.getLocation(h,r);u||p?(u&&u.steps>t.steps+a&&(u.steps=t.steps+a,u.previousLocation=t),p&&p.steps>t.steps+a&&(p.steps=t.steps+a,p.previousLocation=t)):h.push({position:r,steps:t.steps+a,distanceFromGoal:n.metric(r,e),previousLocation:t})}}})),h.sort((function(t,e){return e.steps+e.distanceFromGoal-(t.steps+t.distanceFromGoal)})),l.push(h.pop());var u=this.getLocation(l,e);if(this.contains(l,e))for(a=0;(u.position[0]!==t[0]||u.position[1]!==t[1])&&a<s;)a++,o.push(u.position),u=u.previousLocation;return o.reverse()},t.prototype.isEqual=function(t,e){return t.position[0]===e.position[0]&&t.position[1]===e.position[1]},t.prototype.contains=function(t,e){var i=this;return Array.isArray(e)?t.some((function(t){return t.position[0]===e[0]&&t.position[1]===e[1]})):t.some((function(t){return i.isEqual(t,e)}))},t.prototype.getLocation=function(t,e){for(var i=0,n=t;i<n.length;i++){var o=n[i];if(o.position[0]===e[0]&&o.position[1]===e[1])return o}}}();const a=function(){function t(t,e){this.canSee=t,this.range=e||8}return t.prototype.look=function(t,e){var i=e||this.range;this.canSee(t);for(var n=[],o=[],s=1;s<=i;s++){for(var r=-s;r<=s;r++)for(var a=-s;a<=s;a++)if(Math.abs(r)===s||Math.abs(a)===s){var l=[t[0]+r,t[1]+a];if(!(this.distance(t,l)>i)){var h=this.angleTo(t,l),c=this.angularSize(t,l)/2;this.isInShadows(h,n)&&this.isInShadows(h+c,n)&&this.isInShadows(h-c,n)||this.canSee(l)||o.push({startAngle:h-c,endAngle:h+c})}}for(;o.length>0;)n.push(o.pop())}},t.prototype.angleTo=function(t,e){var i=e[1]-t[1],n=e[0]-t[0];return 180*Math.atan2(i,n)/Math.PI},t.prototype.angularSize=function(t,e){var i=this.distance(t,e);return 360*Math.atan(1/i)/Math.PI},t.prototype.distance=function(t,e){return Math.sqrt(Math.pow(e[1]-t[1],2)+Math.pow(e[0]-t[0],2))},t.prototype.isInShadows=function(t,e){for(var i=t<0?t+360:t-360,n=0,o=e;n<o.length;n++){var s=o[n];if(t<=s.endAngle&&t>=s.startAngle||i<=s.endAngle&&i>=s.startAngle)return!0}return!1},t}(),l={target:document.getElementById("displayExample"),width:20,height:15},h=new n(l);h.tileSize=h.calculateTileSize();for(let t=0;t<l.width;t++)for(let e=0;e<l.height;e++)0===t||0===e||t===l.width-1||e===l.height-1?h.setTile(t,e,{content:"#",className:"brickWall"}):3===t&&5===e?h.setTile(t,e,{content:"@",classList:["player"]}):h.setTile(t,e,{content:".",className:"coolFloor"});for(let t=5;t<10;t++)h.updateTile(t,t,{className:"superAwesome"});const c=()=>{const t=Math.floor(Date.now()),e=new s(t),i=e.getRandom(),n=e.getNumber(0,10),o=e.getNumber(0,10,!1),r=e.getRandomElement([1,2,3,4,5,6,7]),a=e.getWeightedElement([{weight:10,option:"Cute dog"},{weight:15,option:"Awesome cat"},{weight:1,option:"Rare Franklin"}]),l=document.getElementById("randomResults");for(;l.lastChild;)l.removeChild(l.lastChild);const h=function(t,e){const i=document.createElement("li"),n=`${t} : ${e}`;i.appendChild(document.createTextNode(n)),l.appendChild(i)};h("x",i.toString()),h("y",n.toString()),h("noThanksNotInteger",o.toString()),h("randomElement",r.toString()),h("randomWeightedElement",a.toString())};c(),document.getElementById("randomButton").addEventListener("click",c);const u=new n({target:document.querySelector(".colorDisplay"),width:10,height:10});for(let t=0;t<10;t++)for(let e=0;e<10;e++)0===t||0===e||9===t||9===e?u.setTile(t,e,"#"):3===t&&3===e?u.setTile(t,e,"@"):4===t&&5===e?u.setTile(t,e,{content:"g",color:"green",background:"rgba(128,0,0,0.2)"}):u.setTile(t,e,".");u.tileSize=u.calculateTileSize(),u.centerDisplay(3,3);const p=["####################","#..................#","#..#.....#....#....#","#..#.....###...##..#","#..#.....#.........#","#.............#....#","#........#.........#","####...###....#....#","#........#.........#","####################"],d=p[0].length,f=p.length,m=new n({target:document.getElementById("fovMap"),width:d,height:f});m.tileSize=m.calculateTileSize();const g=new a((t=>{const e=t[0],i=t[1],n=p[i][e];return m.setTile(e,i,n),"#"!==n}),10),y=[5,5],v=p[y[1]];p[y[1]]=v.slice(0,y[0])+"@"+v.slice(y[0]),g.look(y),m.setTile(y[0],y[1],"@");const b=document.getElementById("simpleEventList"),w=document.getElementById("complexEventList"),E=(t,e)=>{const i=document.createElement("li");i.appendChild(document.createTextNode(t)),e.appendChild(i)},O=new o({type:"simple"}),S={act:()=>E("The Goblin goblins!",b)},x={act:()=>E("The cat meows!",b)};O.add(S),O.add(x),O.add({callback:()=>E("Drip drip goes the faucet.",b),repeats:!0}),O.add({callback:()=>E("Rushing wind! Oh no!",b),repeats:2}),O.add({callback:()=>E("The house of cards falls over. Whoops!",b)});for(let t=0;t<20;t++)O.advance();const k=new o({type:"complex"}),_={act:()=>E("Fast cat nyooms!",w)},L={act:()=>E("Slow ogre is sloooow",w)};k.add({actor:_,delay:1}),k.add({actor:L,delay:5}),k.add({callback:()=>E("The mail has just arrived. Sweet!",w),delay:16});for(let t=0;t<20;t++)k.advance()})();
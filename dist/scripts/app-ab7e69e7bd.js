!function(){"use strict";angular.module("gulpAngularMqttWs",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngMaterial","ngStorage"])}(),function(){"use strict";function e(){function e(e){var n=this;n.relativeDate=e(n.creationDate).fromNow()}var n={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment"],n}angular.module("gulpAngularMqttWs").directive("acmeNavbar",e)}(),angular.module("gulpAngularMqttWs").filter("status",function(){return function(e,n){if("ALL"==n)return e;var t={};return angular.forEach(e,function(e,o){e.status==n&&(t[o]=e)}),t}}).filter("name",function(){return function(e,n){var t={};return angular.forEach(e,function(e,o){e.d.myName.toLowerCase().indexOf(n.toLowerCase())>-1&&(t[o]=e)}),t}}).filter("isEmpty",function(){var e;return function(n){for(e in n)if(n.hasOwnProperty(e))return!1;return!0}}),angular.module("gulpAngularMqttWs").provider("mqttwsProvider",function(){this.$get=["$q","$window",function(e,n){return function(n){var t,o,i,a=!1,r=!1,l={},c={},d={on:function(e,n){l[e]=n},addListener:function(e,n){l[e]=n},subscribe:function(n,t){return t=t||{qos:0},function(){var o=e.defer(),a=function(){o.resolve(i)};return t.onSuccess=a,i.subscribe(n,t),console.log("SUB",n,t),o.promise}},create:function(n){var a=e.defer();return n=angular.extend(c,n),t=n.host,o=parseInt(n.port,10),console.log("CRESATE",n),i=new Paho.MQTT.Client(t,o,n.clientId),a.resolve(i),a.promise},connect:function(){return function(){var n=e.defer(),t=function(){var e=l.connected||function(){};console.log("CONNECTED"),e.call(null,arguments),n.resolve(arguments)},o=function(e){console.log(e),n.reject(e)},d={timeout:3,useSSL:a,mqttVersion:3,cleanSession:r,onSuccess:t,onFailure:o};return console.log(c),c.username&&(d.userName=c.username,d.password=c.password),i.connect(d),i.onMessageArrived=function(e){var n=e.destinationName,t=e.payloadString,o=l.message||function(){};o.apply(null,[n,t,e]);var i=l[n.toString()]||function(){};i.apply(null,[t,e])},n.promise}}};return d}}]}),function(){"use strict";function e(e,n,t,o,i,a,r,l){function c(e,n,t,o){e.devices=o,e.deviceUUID=t,e.hide=function(){n.hide()},e.cancel=function(){n.cancel()},e.answer=function(e){n.hide(e)}}var d=this;d.devices={},d.LWT={};var u=function(e){var n=r.debounce(function(){a(e).toggle().then(function(){console.log("toggle "+e+" is done")})},200);return n};e.storage=o.$default({config:{host:"gearbroker.netpie.io",port:8083,username:"BZXrhDBMKutYd68%1443014670",password:"i4jmEZaflGYzXxxi2g5byEM5VA4=",clientId:"eqSZOmyJ2oXN4CJs"}}),e.toggleRight=u("right"),e.config=e.storage.config,e.onlineStatus="ALL",e.filterDevice={},e.filterDevice.name="";var s=function(){var n=function(n,t){var o=JSON.parse(t),i=o.info&&o.info.id,a=o.d&&o.d.id;o.status=d.LWT[a||i]||"ONLINE"||"UNKNOWN",o.online="DEAD"!==o.status,d.devices[a||i]=o,delete d.devices.undefined,e.$apply()};t.on("message",n)};e.showDetail=function(n,t){l.show({controller:c,templateUrl:"app/main/detail.html",parent:angular.element(document.body),targetEvent:n,clickOutsideToClose:!0,locals:{deviceUUID:t,devices:e.allDevices}}).then(function(n){e.status='You said the information was "'+n+'".'},function(){e.status="You cancelled the dialog."})};e.allDevices=function(){return d.devices},e.connect=function(){s(),d.devices={},e.config={host:"cmmc.xyz",port:9001,clientId:"pX1LPwvk6iETiP2Y"},t.create(e.config).then(t.connect()).then(t.subscribe("/HelloChiangMaiMakerClub/gearname/#")).then(t.subscribe("/HelloChiangMaiMakerClub/#")).then(t.subscribe("esp8266/+/status")).then(function(){console.log("ALL DONE")})},e.disconnect=function(){},c.$inject=["$scope","$mdDialog","deviceUUID","devices"],e.connect()}angular.module("gulpAngularMqttWs").factory("myMqtt",["mqttwsProvider",function(e){var n=e(options);return n}]).controller("MainController",e),e.$inject=["$scope","$timeout","myMqtt","$localStorage","$sessionStorage","$mdSidenav","$mdUtil","$mdDialog"]}(),function(){"use strict";function e(e){e.debug("runBlock end")}angular.module("gulpAngularMqttWs").run(e),e.$inject=["$log"]}(),function(){"use strict";function e(e,n){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}angular.module("gulpAngularMqttWs").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("gulpAngularMqttWs").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e,n,t){e.debugEnabled(!0),n.options.timeOut=3e3,n.options.positionClass="toast-top-right",n.options.preventDuplicates=!0,n.options.progressBar=!0}angular.module("gulpAngularMqttWs").config(e),e.$inject=["$logProvider","toastr","$mdThemingProvider"]}(),angular.module("gulpAngularMqttWs").run(["$templateCache",function(e){e.put("app/main/detail.html",'<md-dialog flex="40"><md-toolbar><div class="md-toolbar-tools"><h2>{{ devices()[deviceUUID].d.myName }}</h2><span flex=""></span></div></md-toolbar><md-dialog-content><div ng-repeat="(key, value) in devices()[deviceUUID].d" layout="row"><div flex="20">{{ key }}</div><div flex="80">{{ value }}</div></div><h3>info</h3><div ng-repeat="(key, value) in devices()[deviceUUID].info" layout="row"><div flex="20">{{ key }}</div><div flex="80">{{ value }}</div></div></md-dialog-content></md-dialog>'),e.put("app/main/main.html",'<div layout="column" layout-fill="" class="nat-wrapper"><md-content layout-padding=""><header><acme-navbar creationdate="main.creationDate"></acme-navbar></header><section class="jumbotron"><div layout="row" layout-align="end center"><md-input-container><label>Filter by name</label> <input ng-model="filterDevice.name"></md-input-container><md-input-container><label>Status</label><md-select name="onlineStatus" ng-model="onlineStatus" required=""><md-optgroup label="Status"><md-option value="ALL">All</md-option><md-option value="ONLINE">Online</md-option><md-option value="DEAD">Offline</md-option></md-optgroup></md-select></md-input-container><md-button ng-click="toggleRight()" class="md-primary">Config</md-button></div><div class="techs" layout-align="center"><md-card ng-class="device.status" ng-repeat="(key, device) in main.devices | name:filterDevice.name | status:onlineStatus | orderBy:\'status\'"><div class="thumbnail"><div class="caption"><h3>{{ device.d.myName }} - {{ device.status }}</h3><div ng-show="{{ device.info.id !=\'\' || device.d.id != \'\'}}">{{ device.info.id || device.d.id }}</div><div>{{ device.d.ip }}</div><div>{{ device.d.seconds }} ({{ device.d.subscription }})</div><div>{{ device.info.sensor || device.d.sensor || "?" }}</div><div ng-show="{{device.online}}">{{ device.info.id || device.d.id }}/status</div></div></div><div class="md-actions" layout="row" layout-align="end center"><md-button ng-click="showDetail($event, key)">Detail</md-button></div></md-card></div></section><section><md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="right" layout-align="start center"><md-toolbar class="md-theme-light" layout="row" layout-align="center center">Config</md-toolbar><md-content layout-padding="" class="autoScroll"><md-input-container><label>Host</label> <input ng-model="config.host"></md-input-container><md-input-container><label>Port</label> <input ng-model="config.port"></md-input-container><md-input-container><label>Username</label> <input ng-model="config.username"></md-input-container><md-input-container><label>Password</label> <input ng-model="config.password" type="password"></md-input-container><md-input-container><label>clientId</label> <input ng-model="config.clientId" type="clientId"></md-input-container><md-input-container><md-button class="md-raised" ng-click="save()">Save</md-button></md-input-container><md-input-container><md-button class="md-raised md-warn" ng-click="cancel()">Cancel</md-button></md-input-container></md-content></md-sidenav></section></md-content></div>'),e.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">CMMC Devices</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section></md-toolbar>')}]);
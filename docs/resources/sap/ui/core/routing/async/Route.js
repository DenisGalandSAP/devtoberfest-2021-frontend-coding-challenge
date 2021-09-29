/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/core/Component"],function(e,t,i,r){"use strict";return{_routeMatched:function(o,a,n){var s=this._oRouter,g,h,f,_,u=null,l=null,c,d,p,T,C=this;s._stopWaitingTitleChangedFromChild();s._oMatchedRoute=this;s._bMatchingProcessStarted=true;f=i.extend({},s._oConfig,this._oConfig);h=s.getTargets();var v;if(h){v=h._getTitleTargetName(f.target,f.titleTarget);if(v&&s._oPreviousTitleChangedRoute!==this){s._bFireTitleChanged=true;if(s._oOwner&&s._oOwner._bRoutingPropagateTitle){var m=r.getOwnerComponentFor(s._oOwner);var w=m&&m.getRouter();if(w){w._waitForTitleChangedOn(s)}}}else{s._bFireTitleChanged=false}if(this._oConfig.target){T=h._alignTargetsInfo(this._oConfig.target);T.forEach(function(e){e.propagateTitle=e.hasOwnProperty("propagateTitle")?e.propagateTitle:s._oConfig.propagateTitle})}}else{T=this._oConfig.target}if(!a||a===true){c=true;a=Promise.resolve()}if(this._oParent){a=this._oParent._routeMatched(o,a)}else if(this._oNestingParent){this._oNestingParent._routeMatched(o,a,this)}d=i.extend({},o);d.routeConfig=f;_={name:f.name,arguments:o,config:f};if(n){_.nestedRoute=n}this.fireBeforeMatched(_);s.fireBeforeRouteMatched(_);if(this._oTarget){g=this._oTarget;g._updateOptions(this._convertToTargetOptions(f));a=g._place(a);if(this._oRouter._oTargetHandler&&this._oRouter._oTargetHandler._chainNavigation){p=a;a=this._oRouter._oTargetHandler._chainNavigation(function(){return p})}}else{if(e.browser.msie||e.browser.edge){p=a;a=new Promise(function(e,t){setTimeout(function(){if(s._oTargets){var i=s._oTargets._display(T,d,C._oConfig.titleTarget,p);i.then(e,t)}else{e()}},0)})}else{a=s._oTargets._display(T,d,this._oConfig.titleTarget,a)}}return a.then(function(e){s._bMatchingProcessStarted=false;var i,r,a;if(Array.isArray(e)){i=e;e=i[0]}e=e||{};u=e.view;l=e.control;_.view=u;_.targetControl=l;if(i){r=[];a=[];i.forEach(function(e){r.push(e.view);a.push(e.control)});_.views=r;_.targetControls=a}if(f.callback){f.callback(this,o,f,l,u)}this.fireEvent("matched",_);s.fireRouteMatched(_);if(c){t.info("The route named '"+f.name+"' did match with its pattern",this);this.fireEvent("patternMatched",_);s.fireRoutePatternMatched(_)}return e}.bind(this))}}});
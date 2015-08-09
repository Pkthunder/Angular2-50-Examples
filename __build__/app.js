webpackJsonp([2,0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(221);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var lang_1 = __webpack_require__(1);
	function _abstract() {
	    return new lang_1.BaseException('This method is abstract');
	}
	var LocationStrategy = (function () {
	    function LocationStrategy() {
	    }
	    LocationStrategy.prototype.path = function () { throw _abstract(); };
	    LocationStrategy.prototype.pushState = function (ctx, title, url) { throw _abstract(); };
	    LocationStrategy.prototype.forward = function () { throw _abstract(); };
	    LocationStrategy.prototype.back = function () { throw _abstract(); };
	    LocationStrategy.prototype.onPopState = function (fn) { throw _abstract(); };
	    LocationStrategy.prototype.getBaseHref = function () { throw _abstract(); };
	    return LocationStrategy;
	})();
	exports.LocationStrategy = LocationStrategy;
	//# sourceMappingURL=location_strategy.js.map

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var lang_1 = __webpack_require__(1);
	/**
	 * You use the RouteConfig annotation to add routes to a component.
	 *
	 * Supported keys:
	 * - `path` (required)
	 * - `component`,  `redirectTo` (requires exactly one of these)
	 * - `as` (optional)
	 */
	var RouteConfig = (function () {
	    function RouteConfig(configs) {
	        this.configs = configs;
	    }
	    RouteConfig = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [Object])
	    ], RouteConfig);
	    return RouteConfig;
	})();
	exports.RouteConfig = RouteConfig;
	var Route = (function () {
	    function Route(_a) {
	        var path = _a.path, component = _a.component, as = _a.as;
	        this.path = path;
	        this.component = component;
	        this.as = as;
	    }
	    Route = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [Object])
	    ], Route);
	    return Route;
	})();
	exports.Route = Route;
	var AsyncRoute = (function () {
	    function AsyncRoute(_a) {
	        var path = _a.path, loader = _a.loader, as = _a.as;
	        this.path = path;
	        this.loader = loader;
	        this.as = as;
	    }
	    AsyncRoute = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [Object])
	    ], AsyncRoute);
	    return AsyncRoute;
	})();
	exports.AsyncRoute = AsyncRoute;
	var Redirect = (function () {
	    function Redirect(_a) {
	        var path = _a.path, redirectTo = _a.redirectTo;
	        this.as = null;
	        this.path = path;
	        this.redirectTo = redirectTo;
	    }
	    Redirect = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [Object])
	    ], Redirect);
	    return Redirect;
	})();
	exports.Redirect = Redirect;
	//# sourceMappingURL=route_config_impl.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var async_1 = __webpack_require__(5);
	var collection_1 = __webpack_require__(2);
	var lang_1 = __webpack_require__(1);
	var route_lifecycle_reflector_1 = __webpack_require__(38);
	var _resolveToTrue = async_1.PromiseWrapper.resolve(true);
	var _resolveToFalse = async_1.PromiseWrapper.resolve(false);
	/**
	 * # Router
	 * The router is responsible for mapping URLs to components.
	 *
	 * You can see the state of the router by inspecting the read-only field `router.navigating`.
	 * This may be useful for showing a spinner, for instance.
	 *
	 * ## Concepts
	 * Routers and component instances have a 1:1 correspondence.
	 *
	 * The router holds reference to a number of "outlets." An outlet is a placeholder that the
	 * router dynamically fills in depending on the current URL.
	 *
	 * When the router navigates from a URL, it must first recognizes it and serialize it into an
	 * `Instruction`.
	 * The router uses the `RouteRegistry` to get an `Instruction`.
	 */
	var Router = (function () {
	    // todo(jeffbcross): rename _registry to registry since it is accessed from subclasses
	    // todo(jeffbcross): rename _pipeline to pipeline since it is accessed from subclasses
	    function Router(registry, _pipeline, parent, hostComponent) {
	        this.registry = registry;
	        this._pipeline = _pipeline;
	        this.parent = parent;
	        this.hostComponent = hostComponent;
	        this.navigating = false;
	        this._currentInstruction = null;
	        this._currentNavigation = _resolveToTrue;
	        this._outlet = null;
	        this._subject = new async_1.EventEmitter();
	    }
	    /**
	     * Constructs a child router. You probably don't need to use this unless you're writing a reusable
	     * component.
	     */
	    Router.prototype.childRouter = function (hostComponent) { return new ChildRouter(this, hostComponent); };
	    /**
	     * Register an object to notify of route changes. You probably don't need to use this unless
	     * you're writing a reusable component.
	     */
	    Router.prototype.registerOutlet = function (outlet) {
	        // TODO: sibling routes
	        this._outlet = outlet;
	        if (lang_1.isPresent(this._currentInstruction)) {
	            return outlet.commit(this._currentInstruction);
	        }
	        return _resolveToTrue;
	    };
	    /**
	     * Dynamically update the routing configuration and trigger a navigation.
	     *
	     * # Usage
	     *
	     * ```
	     * router.config([
	     *   { 'path': '/', 'component': IndexComp },
	     *   { 'path': '/user/:id', 'component': UserComp },
	     * ]);
	     * ```
	     */
	    Router.prototype.config = function (definitions) {
	        var _this = this;
	        definitions.forEach(function (routeDefinition) { _this.registry.config(_this.hostComponent, routeDefinition); });
	        return this.renavigate();
	    };
	    /**
	     * Navigate to a URL. Returns a promise that resolves when navigation is complete.
	     *
	     * If the given URL begins with a `/`, router will navigate absolutely.
	     * If the given URL does not begin with `/`, the router will navigate relative to this component.
	     */
	    Router.prototype.navigate = function (url) {
	        var _this = this;
	        return this._currentNavigation = this._currentNavigation.then(function (_) {
	            _this.lastNavigationAttempt = url;
	            _this._startNavigating();
	            return _this._afterPromiseFinishNavigating(_this.recognize(url).then(function (matchedInstruction) {
	                if (lang_1.isBlank(matchedInstruction)) {
	                    return false;
	                }
	                return _this._reuse(matchedInstruction)
	                    .then(function (_) { return _this._canActivate(matchedInstruction); })
	                    .then(function (result) {
	                    if (!result) {
	                        return false;
	                    }
	                    return _this._canDeactivate(matchedInstruction)
	                        .then(function (result) {
	                        if (result) {
	                            return _this.commit(matchedInstruction)
	                                .then(function (_) {
	                                _this._emitNavigationFinish(matchedInstruction.accumulatedUrl);
	                                return true;
	                            });
	                        }
	                    });
	                });
	            }));
	        });
	    };
	    Router.prototype._emitNavigationFinish = function (url) { async_1.ObservableWrapper.callNext(this._subject, url); };
	    Router.prototype._afterPromiseFinishNavigating = function (promise) {
	        var _this = this;
	        return async_1.PromiseWrapper.catchError(promise.then(function (_) { return _this._finishNavigating(); }), function (err) {
	            _this._finishNavigating();
	            throw err;
	        });
	    };
	    Router.prototype._reuse = function (instruction) {
	        var _this = this;
	        if (lang_1.isBlank(this._outlet)) {
	            return _resolveToFalse;
	        }
	        return this._outlet.canReuse(instruction)
	            .then(function (result) {
	            instruction.reuse = result;
	            if (lang_1.isPresent(_this._outlet.childRouter) && lang_1.isPresent(instruction.child)) {
	                return _this._outlet.childRouter._reuse(instruction.child);
	            }
	        });
	    };
	    Router.prototype._canActivate = function (instruction) {
	        return canActivateOne(instruction, this._currentInstruction);
	    };
	    Router.prototype._canDeactivate = function (instruction) {
	        var _this = this;
	        if (lang_1.isBlank(this._outlet)) {
	            return _resolveToTrue;
	        }
	        var next;
	        if (lang_1.isPresent(instruction) && instruction.reuse) {
	            next = _resolveToTrue;
	        }
	        else {
	            next = this._outlet.canDeactivate(instruction);
	        }
	        return next.then(function (result) {
	            if (result == false) {
	                return false;
	            }
	            if (lang_1.isPresent(_this._outlet.childRouter)) {
	                return _this._outlet.childRouter._canDeactivate(lang_1.isPresent(instruction) ? instruction.child :
	                    null);
	            }
	            return true;
	        });
	    };
	    /**
	     * Updates this router and all descendant routers according to the given instruction
	     */
	    Router.prototype.commit = function (instruction) {
	        this._currentInstruction = instruction;
	        if (lang_1.isPresent(this._outlet)) {
	            return this._outlet.commit(instruction);
	        }
	        return _resolveToTrue;
	    };
	    Router.prototype._startNavigating = function () { this.navigating = true; };
	    Router.prototype._finishNavigating = function () { this.navigating = false; };
	    /**
	     * Subscribe to URL updates from the router
	     */
	    Router.prototype.subscribe = function (onNext) {
	        async_1.ObservableWrapper.subscribe(this._subject, onNext);
	    };
	    /**
	     * Removes the contents of this router's outlet and all descendant outlets
	     */
	    Router.prototype.deactivate = function (instruction) {
	        if (lang_1.isPresent(this._outlet)) {
	            return this._outlet.deactivate(instruction);
	        }
	        return _resolveToTrue;
	    };
	    /**
	     * Given a URL, returns an instruction representing the component graph
	     */
	    Router.prototype.recognize = function (url) {
	        return this.registry.recognize(url, this.hostComponent);
	    };
	    /**
	     * Navigates to either the last URL successfully navigated to, or the last URL requested if the
	     * router has yet to successfully navigate.
	     */
	    Router.prototype.renavigate = function () {
	        if (lang_1.isBlank(this.lastNavigationAttempt)) {
	            return this._currentNavigation;
	        }
	        return this.navigate(this.lastNavigationAttempt);
	    };
	    /**
	     * Generate a URL from a component name and optional map of parameters. The URL is relative to the
	     * app's base href.
	     */
	    Router.prototype.generate = function (linkParams) {
	        var normalizedLinkParams = splitAndFlattenLinkParams(linkParams);
	        var first = collection_1.ListWrapper.first(normalizedLinkParams);
	        var rest = collection_1.ListWrapper.slice(normalizedLinkParams, 1);
	        var router = this;
	        // The first segment should be either '.' (generate from parent) or '' (generate from root).
	        // When we normalize above, we strip all the slashes, './' becomes '.' and '/' becomes ''.
	        if (first == '') {
	            while (lang_1.isPresent(router.parent)) {
	                router = router.parent;
	            }
	        }
	        else if (first == '..') {
	            router = router.parent;
	            while (collection_1.ListWrapper.first(rest) == '..') {
	                rest = collection_1.ListWrapper.slice(rest, 1);
	                router = router.parent;
	                if (lang_1.isBlank(router)) {
	                    throw new lang_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" has too many \"../\" segments.");
	                }
	            }
	        }
	        else if (first != '.') {
	            throw new lang_1.BaseException("Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must start with \"/\", \"./\", or \"../\"");
	        }
	        if (rest[rest.length - 1] == '') {
	            collection_1.ListWrapper.removeLast(rest);
	        }
	        if (rest.length < 1) {
	            var msg = "Link \"" + collection_1.ListWrapper.toJSON(linkParams) + "\" must include a route name.";
	            throw new lang_1.BaseException(msg);
	        }
	        var url = '';
	        if (lang_1.isPresent(router.parent) && lang_1.isPresent(router.parent._currentInstruction)) {
	            url = router.parent._currentInstruction.capturedUrl;
	        }
	        return url + '/' + this.registry.generate(rest, router.hostComponent);
	    };
	    return Router;
	})();
	exports.Router = Router;
	var RootRouter = (function (_super) {
	    __extends(RootRouter, _super);
	    function RootRouter(registry, pipeline, location, hostComponent) {
	        var _this = this;
	        _super.call(this, registry, pipeline, null, hostComponent);
	        this._location = location;
	        this._location.subscribe(function (change) { return _this.navigate(change['url']); });
	        this.registry.configFromComponent(hostComponent);
	        this.navigate(location.path());
	    }
	    RootRouter.prototype.commit = function (instruction) {
	        var _this = this;
	        return _super.prototype.commit.call(this, instruction)
	            .then(function (_) { _this._location.go(instruction.accumulatedUrl); });
	    };
	    return RootRouter;
	})(Router);
	exports.RootRouter = RootRouter;
	var ChildRouter = (function (_super) {
	    __extends(ChildRouter, _super);
	    function ChildRouter(parent, hostComponent) {
	        _super.call(this, parent.registry, parent._pipeline, parent, hostComponent);
	        this.parent = parent;
	    }
	    ChildRouter.prototype.navigate = function (url) {
	        // Delegate navigation to the root router
	        return this.parent.navigate(url);
	    };
	    return ChildRouter;
	})(Router);
	/*
	 * Given: ['/a/b', {c: 2}]
	 * Returns: ['', 'a', 'b', {c: 2}]
	 */
	var SLASH = new RegExp('/');
	function splitAndFlattenLinkParams(linkParams) {
	    return collection_1.ListWrapper.reduce(linkParams, function (accumulation, item) {
	        if (lang_1.isString(item)) {
	            return collection_1.ListWrapper.concat(accumulation, lang_1.StringWrapper.split(item, SLASH));
	        }
	        accumulation.push(item);
	        return accumulation;
	    }, []);
	}
	function canActivateOne(nextInstruction, currentInstruction) {
	    var next = _resolveToTrue;
	    if (lang_1.isPresent(nextInstruction.child)) {
	        next = canActivateOne(nextInstruction.child, lang_1.isPresent(currentInstruction) ? currentInstruction.child : null);
	    }
	    return next.then(function (res) {
	        if (res == false) {
	            return false;
	        }
	        if (nextInstruction.reuse) {
	            return true;
	        }
	        var hook = route_lifecycle_reflector_1.getCanActivateHook(nextInstruction.component);
	        if (lang_1.isPresent(hook)) {
	            return hook(nextInstruction, currentInstruction);
	        }
	        return true;
	    });
	}
	//# sourceMappingURL=router.js.map

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';/**
	 * @module
	 * @description
	 * Maps application URLs into application states, to support deep-linking and navigation.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var router_1 = __webpack_require__(16);
	exports.Router = router_1.Router;
	exports.RootRouter = router_1.RootRouter;
	var router_outlet_1 = __webpack_require__(41);
	exports.RouterOutlet = router_outlet_1.RouterOutlet;
	var router_link_1 = __webpack_require__(40);
	exports.RouterLink = router_link_1.RouterLink;
	var instruction_1 = __webpack_require__(23);
	exports.RouteParams = instruction_1.RouteParams;
	var route_registry_1 = __webpack_require__(39);
	exports.RouteRegistry = route_registry_1.RouteRegistry;
	var location_strategy_1 = __webpack_require__(10);
	exports.LocationStrategy = location_strategy_1.LocationStrategy;
	var hash_location_strategy_1 = __webpack_require__(92);
	exports.HashLocationStrategy = hash_location_strategy_1.HashLocationStrategy;
	var html5_location_strategy_1 = __webpack_require__(34);
	exports.HTML5LocationStrategy = html5_location_strategy_1.HTML5LocationStrategy;
	var location_1 = __webpack_require__(25);
	exports.Location = location_1.Location;
	exports.appBaseHrefToken = location_1.appBaseHrefToken;
	var pipeline_1 = __webpack_require__(36);
	exports.Pipeline = pipeline_1.Pipeline;
	__export(__webpack_require__(37));
	var lifecycle_annotations_1 = __webpack_require__(35);
	exports.CanActivate = lifecycle_annotations_1.CanActivate;
	var location_strategy_2 = __webpack_require__(10);
	var html5_location_strategy_2 = __webpack_require__(34);
	var router_2 = __webpack_require__(16);
	var router_outlet_2 = __webpack_require__(41);
	var router_link_2 = __webpack_require__(40);
	var route_registry_2 = __webpack_require__(39);
	var pipeline_2 = __webpack_require__(36);
	var location_2 = __webpack_require__(25);
	var application_tokens_1 = __webpack_require__(48);
	var di_1 = __webpack_require__(3);
	var lang_1 = __webpack_require__(1);
	exports.routerDirectives = lang_1.CONST_EXPR([router_outlet_2.RouterOutlet, router_link_2.RouterLink]);
	exports.routerInjectables = [
	    route_registry_2.RouteRegistry,
	    pipeline_2.Pipeline,
	    di_1.bind(location_strategy_2.LocationStrategy).toClass(html5_location_strategy_2.HTML5LocationStrategy),
	    location_2.Location,
	    di_1.bind(router_2.Router)
	        .toFactory(function (registry, pipeline, location, appRoot) { return new router_2.RootRouter(registry, pipeline, location, appRoot); }, [route_registry_2.RouteRegistry, pipeline_2.Pipeline, location_2.Location, application_tokens_1.appComponentTypeToken])
	];
	//# sourceMappingURL=router.js.map

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var collection_1 = __webpack_require__(2);
	var lang_1 = __webpack_require__(1);
	var RouteParams = (function () {
	    function RouteParams(params) {
	        this.params = params;
	    }
	    RouteParams.prototype.get = function (param) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.params, param)); };
	    return RouteParams;
	})();
	exports.RouteParams = RouteParams;
	/**
	 * An `Instruction` represents the component hierarchy of the application based on a given route
	 */
	var Instruction = (function () {
	    function Instruction(component, capturedUrl, _recognizer, child) {
	        if (child === void 0) { child = null; }
	        this.component = component;
	        this.capturedUrl = capturedUrl;
	        this._recognizer = _recognizer;
	        this.child = child;
	        this.reuse = false;
	        this.accumulatedUrl = capturedUrl;
	        this.specificity = _recognizer.specificity;
	        if (lang_1.isPresent(child)) {
	            this.child = child;
	            this.specificity += child.specificity;
	            var childUrl = child.accumulatedUrl;
	            if (lang_1.isPresent(childUrl)) {
	                this.accumulatedUrl += childUrl;
	            }
	        }
	    }
	    Instruction.prototype.params = function () {
	        if (lang_1.isBlank(this._params)) {
	            this._params = this._recognizer.parseParams(this.capturedUrl);
	        }
	        return this._params;
	    };
	    return Instruction;
	})();
	exports.Instruction = Instruction;
	//# sourceMappingURL=instruction.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var lang_1 = __webpack_require__(1);
	var RouteLifecycleHook = (function () {
	    function RouteLifecycleHook(name) {
	        this.name = name;
	    }
	    RouteLifecycleHook = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [String])
	    ], RouteLifecycleHook);
	    return RouteLifecycleHook;
	})();
	exports.RouteLifecycleHook = RouteLifecycleHook;
	var CanActivate = (function () {
	    function CanActivate(fn) {
	        this.fn = fn;
	    }
	    CanActivate = __decorate([
	        lang_1.CONST(), 
	        __metadata('design:paramtypes', [Function])
	    ], CanActivate);
	    return CanActivate;
	})();
	exports.CanActivate = CanActivate;
	exports.canReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("canReuse"));
	exports.canDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("canDeactivate"));
	exports.onActivate = lang_1.CONST_EXPR(new RouteLifecycleHook("onActivate"));
	exports.onReuse = lang_1.CONST_EXPR(new RouteLifecycleHook("onReuse"));
	exports.onDeactivate = lang_1.CONST_EXPR(new RouteLifecycleHook("onDeactivate"));
	//# sourceMappingURL=lifecycle_annotations_impl.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var location_strategy_1 = __webpack_require__(10);
	var lang_1 = __webpack_require__(1);
	var async_1 = __webpack_require__(5);
	var lang_2 = __webpack_require__(1);
	var di_1 = __webpack_require__(3);
	exports.appBaseHrefToken = lang_1.CONST_EXPR(new di_1.OpaqueToken('locationHrefToken'));
	/**
	 * This is the service that an application developer will directly interact with.
	 *
	 * Responsible for normalizing the URL against the application's base href.
	 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
	 * trailing slash:
	 * - `/my/app/user/123` is normalized
	 * - `my/app/user/123` **is not** normalized
	 * - `/my/app/user/123/` **is not** normalized
	 */
	var Location = (function () {
	    function Location(_platformStrategy, href) {
	        var _this = this;
	        this._platformStrategy = _platformStrategy;
	        this._subject = new async_1.EventEmitter();
	        var browserBaseHref = lang_1.isPresent(href) ? href : this._platformStrategy.getBaseHref();
	        if (lang_2.isBlank(browserBaseHref)) {
	            throw new lang_2.BaseException("No base href set. Either provide a binding to \"appBaseHrefToken\" or add a base element.");
	        }
	        this._baseHref = stripTrailingSlash(stripIndexHtml(browserBaseHref));
	        this._platformStrategy.onPopState(function (_) { return _this._onPopState(_); });
	    }
	    Location.prototype._onPopState = function (_) { async_1.ObservableWrapper.callNext(this._subject, { 'url': this.path() }); };
	    Location.prototype.path = function () { return this.normalize(this._platformStrategy.path()); };
	    Location.prototype.normalize = function (url) {
	        return stripTrailingSlash(this._stripBaseHref(stripIndexHtml(url)));
	    };
	    Location.prototype.normalizeAbsolutely = function (url) {
	        if (!url.startsWith('/')) {
	            url = '/' + url;
	        }
	        return stripTrailingSlash(this._addBaseHref(url));
	    };
	    Location.prototype._stripBaseHref = function (url) {
	        if (this._baseHref.length > 0 && url.startsWith(this._baseHref)) {
	            return url.substring(this._baseHref.length);
	        }
	        return url;
	    };
	    Location.prototype._addBaseHref = function (url) {
	        if (!url.startsWith(this._baseHref)) {
	            return this._baseHref + url;
	        }
	        return url;
	    };
	    Location.prototype.go = function (url) {
	        var finalUrl = this.normalizeAbsolutely(url);
	        this._platformStrategy.pushState(null, '', finalUrl);
	    };
	    Location.prototype.forward = function () { this._platformStrategy.forward(); };
	    Location.prototype.back = function () { this._platformStrategy.back(); };
	    Location.prototype.subscribe = function (onNext, onThrow, onReturn) {
	        if (onThrow === void 0) { onThrow = null; }
	        if (onReturn === void 0) { onReturn = null; }
	        async_1.ObservableWrapper.subscribe(this._subject, onNext, onThrow, onReturn);
	    };
	    Location = __decorate([
	        di_1.Injectable(),
	        __param(1, di_1.Optional()),
	        __param(1, di_1.Inject(exports.appBaseHrefToken)), 
	        __metadata('design:paramtypes', [location_strategy_1.LocationStrategy, String])
	    ], Location);
	    return Location;
	})();
	exports.Location = Location;
	function stripIndexHtml(url) {
	    if (/\/index.html$/g.test(url)) {
	        // '/index.html'.length == 11
	        return url.substring(0, url.length - 11);
	    }
	    return url;
	}
	function stripTrailingSlash(url) {
	    if (/\/$/g.test(url)) {
	        url = url.substring(0, url.length - 1);
	    }
	    return url;
	}
	//# sourceMappingURL=location.js.map

/***/ },
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var dom_adapter_1 = __webpack_require__(6);
	var di_1 = __webpack_require__(3);
	var location_strategy_1 = __webpack_require__(10);
	var HTML5LocationStrategy = (function (_super) {
	    __extends(HTML5LocationStrategy, _super);
	    function HTML5LocationStrategy() {
	        _super.call(this);
	        this._location = dom_adapter_1.DOM.getLocation();
	        this._history = dom_adapter_1.DOM.getHistory();
	        this._baseHref = dom_adapter_1.DOM.getBaseHref();
	    }
	    HTML5LocationStrategy.prototype.onPopState = function (fn) {
	        dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
	    };
	    HTML5LocationStrategy.prototype.getBaseHref = function () { return this._baseHref; };
	    HTML5LocationStrategy.prototype.path = function () { return this._location.pathname; };
	    HTML5LocationStrategy.prototype.pushState = function (state, title, url) { this._history.pushState(state, title, url); };
	    HTML5LocationStrategy.prototype.forward = function () { this._history.forward(); };
	    HTML5LocationStrategy.prototype.back = function () { this._history.back(); };
	    HTML5LocationStrategy = __decorate([
	        di_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], HTML5LocationStrategy);
	    return HTML5LocationStrategy;
	})(location_strategy_1.LocationStrategy);
	exports.HTML5LocationStrategy = HTML5LocationStrategy;
	//# sourceMappingURL=html5_location_strategy.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';/**
	 * This indirection is needed to free up Component, etc symbols in the public API
	 * to be used by the decorator versions of these annotations.
	 */
	var decorators_1 = __webpack_require__(26);
	var lifecycle_annotations_impl_1 = __webpack_require__(24);
	var lifecycle_annotations_impl_2 = __webpack_require__(24);
	exports.canReuse = lifecycle_annotations_impl_2.canReuse;
	exports.canDeactivate = lifecycle_annotations_impl_2.canDeactivate;
	exports.onActivate = lifecycle_annotations_impl_2.onActivate;
	exports.onReuse = lifecycle_annotations_impl_2.onReuse;
	exports.onDeactivate = lifecycle_annotations_impl_2.onDeactivate;
	exports.CanActivate = decorators_1.makeDecorator(lifecycle_annotations_impl_1.CanActivate);
	//# sourceMappingURL=lifecycle_annotations.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var async_1 = __webpack_require__(5);
	var di_1 = __webpack_require__(3);
	/**
	 * Responsible for performing each step of navigation.
	 * "Steps" are conceptually similar to "middleware"
	 */
	var Pipeline = (function () {
	    function Pipeline() {
	        this.steps = [function (instruction) { return instruction.router.activateOutlets(instruction); }];
	    }
	    Pipeline.prototype.process = function (instruction) {
	        var steps = this.steps, currentStep = 0;
	        function processOne(result) {
	            if (result === void 0) { result = true; }
	            if (currentStep >= steps.length) {
	                return async_1.PromiseWrapper.resolve(result);
	            }
	            var step = steps[currentStep];
	            currentStep += 1;
	            return async_1.PromiseWrapper.resolve(step(instruction)).then(processOne);
	        }
	        return processOne();
	    };
	    Pipeline = __decorate([
	        di_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Pipeline);
	    return Pipeline;
	})();
	exports.Pipeline = Pipeline;
	//# sourceMappingURL=pipeline.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var route_config_impl_1 = __webpack_require__(15);
	var decorators_1 = __webpack_require__(26);
	var route_config_impl_2 = __webpack_require__(15);
	exports.Route = route_config_impl_2.Route;
	exports.Redirect = route_config_impl_2.Redirect;
	exports.AsyncRoute = route_config_impl_2.AsyncRoute;
	exports.RouteConfig = decorators_1.makeDecorator(route_config_impl_1.RouteConfig);
	//# sourceMappingURL=route_config_decorator.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var lang_1 = __webpack_require__(1);
	var lifecycle_annotations_impl_1 = __webpack_require__(24);
	var reflection_1 = __webpack_require__(9);
	function hasLifecycleHook(e, type) {
	    if (!(type instanceof lang_1.Type))
	        return false;
	    return e.name in type.prototype;
	}
	exports.hasLifecycleHook = hasLifecycleHook;
	function getCanActivateHook(type) {
	    var annotations = reflection_1.reflector.annotations(type);
	    for (var i = 0; i < annotations.length; i += 1) {
	        var annotation = annotations[i];
	        if (annotation instanceof lifecycle_annotations_impl_1.CanActivate) {
	            return annotation.fn;
	        }
	    }
	    return null;
	}
	exports.getCanActivateHook = getCanActivateHook;
	//# sourceMappingURL=route_lifecycle_reflector.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var route_recognizer_1 = __webpack_require__(95);
	var instruction_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(2);
	var async_1 = __webpack_require__(5);
	var lang_1 = __webpack_require__(1);
	var route_config_impl_1 = __webpack_require__(15);
	var reflection_1 = __webpack_require__(9);
	var di_1 = __webpack_require__(3);
	var route_config_nomalizer_1 = __webpack_require__(94);
	/**
	 * The RouteRegistry holds route configurations for each component in an Angular app.
	 * It is responsible for creating Instructions from URLs, and generating URLs based on route and
	 * parameters.
	 */
	var RouteRegistry = (function () {
	    function RouteRegistry() {
	        this._rules = new collection_1.Map();
	    }
	    /**
	     * Given a component and a configuration object, add the route to this registry
	     */
	    RouteRegistry.prototype.config = function (parentComponent, config) {
	        config = route_config_nomalizer_1.normalizeRouteConfig(config);
	        var recognizer = this._rules.get(parentComponent);
	        if (lang_1.isBlank(recognizer)) {
	            recognizer = new route_recognizer_1.RouteRecognizer();
	            this._rules.set(parentComponent, recognizer);
	        }
	        var terminal = recognizer.config(config);
	        if (config instanceof route_config_impl_1.Route) {
	            if (terminal) {
	                assertTerminalComponent(config.component, config.path);
	            }
	            else {
	                this.configFromComponent(config.component);
	            }
	        }
	    };
	    /**
	     * Reads the annotations of a component and configures the registry based on them
	     */
	    RouteRegistry.prototype.configFromComponent = function (component) {
	        var _this = this;
	        if (!lang_1.isType(component)) {
	            return;
	        }
	        // Don't read the annotations from a type more than once –
	        // this prevents an infinite loop if a component routes recursively.
	        if (this._rules.has(component)) {
	            return;
	        }
	        var annotations = reflection_1.reflector.annotations(component);
	        if (lang_1.isPresent(annotations)) {
	            for (var i = 0; i < annotations.length; i++) {
	                var annotation = annotations[i];
	                if (annotation instanceof route_config_impl_1.RouteConfig) {
	                    collection_1.ListWrapper.forEach(annotation.configs, function (config) { return _this.config(component, config); });
	                }
	            }
	        }
	    };
	    /**
	     * Given a URL and a parent component, return the most specific instruction for navigating
	     * the application into the state specified by the url
	     */
	    RouteRegistry.prototype.recognize = function (url, parentComponent) {
	        var _this = this;
	        var componentRecognizer = this._rules.get(parentComponent);
	        if (lang_1.isBlank(componentRecognizer)) {
	            return async_1.PromiseWrapper.resolve(null);
	        }
	        // Matches some beginning part of the given URL
	        var possibleMatches = componentRecognizer.recognize(url);
	        var matchPromises = collection_1.ListWrapper.map(possibleMatches, function (candidate) { return _this._completeRouteMatch(candidate); });
	        return async_1.PromiseWrapper.all(matchPromises)
	            .then(function (solutions) {
	            // remove nulls
	            var fullSolutions = collection_1.ListWrapper.filter(solutions, function (solution) { return lang_1.isPresent(solution); });
	            if (fullSolutions.length > 0) {
	                return mostSpecific(fullSolutions);
	            }
	            return null;
	        });
	    };
	    RouteRegistry.prototype._completeRouteMatch = function (partialMatch) {
	        var _this = this;
	        var recognizer = partialMatch.recognizer;
	        var handler = recognizer.handler;
	        return handler.resolveComponentType().then(function (componentType) {
	            _this.configFromComponent(componentType);
	            if (partialMatch.unmatchedUrl.length == 0) {
	                if (recognizer.terminal) {
	                    return new instruction_1.Instruction(componentType, partialMatch.matchedUrl, recognizer);
	                }
	                else {
	                    return null;
	                }
	            }
	            return _this.recognize(partialMatch.unmatchedUrl, componentType)
	                .then(function (childInstruction) {
	                if (lang_1.isBlank(childInstruction)) {
	                    return null;
	                }
	                else {
	                    return new instruction_1.Instruction(componentType, partialMatch.matchedUrl, recognizer, childInstruction);
	                }
	            });
	        });
	    };
	    /**
	     * Given a normalized list with component names and params like: `['user', {id: 3 }]`
	     * generates a url with a leading slash relative to the provided `parentComponent`.
	     */
	    RouteRegistry.prototype.generate = function (linkParams, parentComponent) {
	        var url = '';
	        var componentCursor = parentComponent;
	        for (var i = 0; i < linkParams.length; i += 1) {
	            var segment = linkParams[i];
	            if (lang_1.isBlank(componentCursor)) {
	                throw new lang_1.BaseException("Could not find route named \"" + segment + "\".");
	            }
	            if (!lang_1.isString(segment)) {
	                throw new lang_1.BaseException("Unexpected segment \"" + segment + "\" in link DSL. Expected a string.");
	            }
	            else if (segment == '' || segment == '.' || segment == '..') {
	                throw new lang_1.BaseException("\"" + segment + "/\" is only allowed at the beginning of a link DSL.");
	            }
	            var params = null;
	            if (i + 1 < linkParams.length) {
	                var nextSegment = linkParams[i + 1];
	                if (lang_1.isStringMap(nextSegment)) {
	                    params = nextSegment;
	                    i += 1;
	                }
	            }
	            var componentRecognizer = this._rules.get(componentCursor);
	            if (lang_1.isBlank(componentRecognizer)) {
	                throw new lang_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(componentCursor) + "\" has no route config.");
	            }
	            var response = componentRecognizer.generate(segment, params);
	            if (lang_1.isBlank(response)) {
	                throw new lang_1.BaseException("Component \"" + lang_1.getTypeNameForDebugging(componentCursor) + "\" has no route named \"" + segment + "\".");
	            }
	            url += response['url'];
	            componentCursor = response['nextComponent'];
	        }
	        return url;
	    };
	    RouteRegistry = __decorate([
	        di_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], RouteRegistry);
	    return RouteRegistry;
	})();
	exports.RouteRegistry = RouteRegistry;
	/*
	 * Given a list of instructions, returns the most specific instruction
	 */
	function mostSpecific(instructions) {
	    var mostSpecificSolution = instructions[0];
	    for (var solutionIndex = 1; solutionIndex < instructions.length; solutionIndex++) {
	        var solution = instructions[solutionIndex];
	        if (solution.specificity > mostSpecificSolution.specificity) {
	            mostSpecificSolution = solution;
	        }
	    }
	    return mostSpecificSolution;
	}
	function assertTerminalComponent(component, path) {
	    if (!lang_1.isType(component)) {
	        return;
	    }
	    var annotations = reflection_1.reflector.annotations(component);
	    if (lang_1.isPresent(annotations)) {
	        for (var i = 0; i < annotations.length; i++) {
	            var annotation = annotations[i];
	            if (annotation instanceof route_config_impl_1.RouteConfig) {
	                throw new lang_1.BaseException("Child routes are not allowed for \"" + path + "\". Use \"...\" on the parent's route path.");
	            }
	        }
	    }
	}
	//# sourceMappingURL=route_registry.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var decorators_1 = __webpack_require__(31);
	var router_1 = __webpack_require__(16);
	var location_1 = __webpack_require__(25);
	/**
	 * The RouterLink directive lets you link to specific parts of your app.
	 *
	 * Consider the following route configuration:
	
	 * ```
	 * @RouteConfig({
	 *   path: '/user', component: UserCmp, as: 'user'
	 * });
	 * class MyComp {}
	 * ```
	 *
	 * When linking to this `user` route, you can write:
	 *
	 * ```
	 * <a [router-link]="['./user']">link to user component</a>
	 * ```
	 *
	 * RouterLink expects the value to be an array of route names, followed by the params
	 * for that level of routing. For instance `['/team', {teamId: 1}, 'user', {userId: 2}]`
	 * means that we want to generate a link for the `team` route with params `{teamId: 1}`,
	 * and with a child route `user` with params `{userId: 2}`.
	 *
	 * The first route name should be prepended with `/`, `./`, or `../`.
	 * If the route begins with `/`, the router will look up the route from the root of the app.
	 * If the route begins with `./`, the router will instead look in the current component's
	 * children for the route. And if the route begins with `../`, the router will look at the
	 * current component's parent.
	 */
	var RouterLink = (function () {
	    function RouterLink(_router, _location) {
	        this._router = _router;
	        this._location = _location;
	    }
	    Object.defineProperty(RouterLink.prototype, "routeParams", {
	        set: function (changes) {
	            this._routeParams = changes;
	            this._navigationHref = this._router.generate(this._routeParams);
	            this.visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RouterLink.prototype.onClick = function () {
	        this._router.navigate(this._navigationHref);
	        return false;
	    };
	    RouterLink = __decorate([
	        decorators_1.Directive({
	            selector: '[router-link]',
	            properties: ['routeParams: routerLink'],
	            host: { '(^click)': 'onClick()', '[attr.href]': 'visibleHref' }
	        }), 
	        __metadata('design:paramtypes', [router_1.Router, location_1.Location])
	    ], RouterLink);
	    return RouterLink;
	})();
	exports.RouterLink = RouterLink;
	//# sourceMappingURL=router_link.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var async_1 = __webpack_require__(5);
	var collection_1 = __webpack_require__(2);
	var lang_1 = __webpack_require__(1);
	var decorators_1 = __webpack_require__(31);
	var core_1 = __webpack_require__(13);
	var di_1 = __webpack_require__(3);
	var routerMod = __webpack_require__(16);
	var instruction_1 = __webpack_require__(23);
	var hookMod = __webpack_require__(35);
	var route_lifecycle_reflector_1 = __webpack_require__(38);
	/**
	 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
	 *
	 * ## Use
	 *
	 * ```
	 * <router-outlet></router-outlet>
	 * ```
	 */
	var RouterOutlet = (function () {
	    function RouterOutlet(_elementRef, _loader, _parentRouter, nameAttr) {
	        this._elementRef = _elementRef;
	        this._loader = _loader;
	        this._parentRouter = _parentRouter;
	        this.childRouter = null;
	        this._componentRef = null;
	        this._currentInstruction = null;
	        // TODO: reintroduce with new // sibling routes
	        // if (isBlank(nameAttr)) {
	        //  nameAttr = 'default';
	        //}
	        this._parentRouter.registerOutlet(this);
	    }
	    /**
	     * Given an instruction, update the contents of this outlet.
	     */
	    RouterOutlet.prototype.commit = function (instruction) {
	        var _this = this;
	        var next;
	        if (instruction.reuse) {
	            next = this._reuse(instruction);
	        }
	        else {
	            next = this.deactivate(instruction).then(function (_) { return _this._activate(instruction); });
	        }
	        return next.then(function (_) { return _this._commitChild(instruction); });
	    };
	    RouterOutlet.prototype._commitChild = function (instruction) {
	        if (lang_1.isPresent(this.childRouter)) {
	            return this.childRouter.commit(instruction.child);
	        }
	        else {
	            return async_1.PromiseWrapper.resolve(true);
	        }
	    };
	    RouterOutlet.prototype._activate = function (instruction) {
	        var _this = this;
	        var previousInstruction = this._currentInstruction;
	        this._currentInstruction = instruction;
	        this.childRouter = this._parentRouter.childRouter(instruction.component);
	        var bindings = di_1.Injector.resolve([
	            di_1.bind(instruction_1.RouteParams)
	                .toValue(new instruction_1.RouteParams(instruction.params())),
	            di_1.bind(routerMod.Router).toValue(this.childRouter)
	        ]);
	        return this._loader.loadNextToLocation(instruction.component, this._elementRef, bindings)
	            .then(function (componentRef) {
	            _this._componentRef = componentRef;
	            if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onActivate, instruction.component)) {
	                return _this._componentRef.instance.onActivate(instruction, previousInstruction);
	            }
	        });
	    };
	    /**
	     * Called by Router during recognition phase
	     */
	    RouterOutlet.prototype.canDeactivate = function (nextInstruction) {
	        if (lang_1.isBlank(this._currentInstruction)) {
	            return async_1.PromiseWrapper.resolve(true);
	        }
	        if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.canDeactivate, this._currentInstruction.component)) {
	            return async_1.PromiseWrapper.resolve(this._componentRef.instance.canDeactivate(nextInstruction, this._currentInstruction));
	        }
	        return async_1.PromiseWrapper.resolve(true);
	    };
	    /**
	     * Called by Router during recognition phase
	     */
	    RouterOutlet.prototype.canReuse = function (nextInstruction) {
	        var result;
	        if (lang_1.isBlank(this._currentInstruction) ||
	            this._currentInstruction.component != nextInstruction.component) {
	            result = false;
	        }
	        else if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.canReuse, this._currentInstruction.component)) {
	            result = this._componentRef.instance.canReuse(nextInstruction, this._currentInstruction);
	        }
	        else {
	            result = nextInstruction == this._currentInstruction ||
	                collection_1.StringMapWrapper.equals(nextInstruction.params(), this._currentInstruction.params());
	        }
	        return async_1.PromiseWrapper.resolve(result);
	    };
	    RouterOutlet.prototype._reuse = function (instruction) {
	        var previousInstruction = this._currentInstruction;
	        this._currentInstruction = instruction;
	        return async_1.PromiseWrapper.resolve(route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onReuse, this._currentInstruction.component) ?
	            this._componentRef.instance.onReuse(instruction, previousInstruction) :
	            true);
	    };
	    RouterOutlet.prototype.deactivate = function (nextInstruction) {
	        var _this = this;
	        return (lang_1.isPresent(this.childRouter) ?
	            this.childRouter.deactivate(lang_1.isPresent(nextInstruction) ? nextInstruction.child :
	                null) :
	            async_1.PromiseWrapper.resolve(true))
	            .then(function (_) {
	            if (lang_1.isPresent(_this._componentRef) && lang_1.isPresent(_this._currentInstruction) &&
	                route_lifecycle_reflector_1.hasLifecycleHook(hookMod.onDeactivate, _this._currentInstruction.component)) {
	                return _this._componentRef.instance.onDeactivate(nextInstruction, _this._currentInstruction);
	            }
	        })
	            .then(function (_) {
	            if (lang_1.isPresent(_this._componentRef)) {
	                _this._componentRef.dispose();
	                _this._componentRef = null;
	            }
	        });
	    };
	    RouterOutlet = __decorate([
	        decorators_1.Directive({ selector: 'router-outlet' }),
	        __param(3, decorators_1.Attribute('name')), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, routerMod.Router, String])
	    ], RouterOutlet);
	    return RouterOutlet;
	})();
	exports.RouterOutlet = RouterOutlet;
	//# sourceMappingURL=router_outlet.js.map

/***/ },
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var lang_1 = __webpack_require__(1);
	var AsyncRouteHandler = (function () {
	    function AsyncRouteHandler(_loader) {
	        this._loader = _loader;
	        this._resolvedComponent = null;
	    }
	    AsyncRouteHandler.prototype.resolveComponentType = function () {
	        var _this = this;
	        if (lang_1.isPresent(this._resolvedComponent)) {
	            return this._resolvedComponent;
	        }
	        return this._resolvedComponent = this._loader().then(function (componentType) {
	            _this.componentType = componentType;
	            return componentType;
	        });
	    };
	    return AsyncRouteHandler;
	})();
	exports.AsyncRouteHandler = AsyncRouteHandler;
	//# sourceMappingURL=async_route_handler.js.map

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var dom_adapter_1 = __webpack_require__(6);
	var di_1 = __webpack_require__(3);
	var location_strategy_1 = __webpack_require__(10);
	var HashLocationStrategy = (function (_super) {
	    __extends(HashLocationStrategy, _super);
	    function HashLocationStrategy() {
	        _super.call(this);
	        this._location = dom_adapter_1.DOM.getLocation();
	        this._history = dom_adapter_1.DOM.getHistory();
	    }
	    HashLocationStrategy.prototype.onPopState = function (fn) {
	        dom_adapter_1.DOM.getGlobalEventTarget('window').addEventListener('popstate', fn, false);
	    };
	    HashLocationStrategy.prototype.getBaseHref = function () { return ''; };
	    HashLocationStrategy.prototype.path = function () {
	        // the hash value is always prefixed with a `#`
	        // and if it is empty then it will stay empty
	        var path = this._location.hash;
	        // Dart will complain if a call to substring is
	        // executed with a position value that extends the
	        // length of string.
	        return path.length > 0 ? path.substring(1) : path;
	    };
	    HashLocationStrategy.prototype.pushState = function (state, title, url) {
	        this._history.pushState(state, title, '#' + url);
	    };
	    HashLocationStrategy.prototype.forward = function () { this._history.forward(); };
	    HashLocationStrategy.prototype.back = function () { this._history.back(); };
	    HashLocationStrategy = __decorate([
	        di_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], HashLocationStrategy);
	    return HashLocationStrategy;
	})(location_strategy_1.LocationStrategy);
	exports.HashLocationStrategy = HashLocationStrategy;
	//# sourceMappingURL=hash_location_strategy.js.map

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var lang_1 = __webpack_require__(1);
	var collection_1 = __webpack_require__(2);
	var lang_2 = __webpack_require__(1);
	var url_1 = __webpack_require__(97);
	// TODO(jeffbcross): implement as interface when ts2dart adds support:
	// https://github.com/angular/ts2dart/issues/173
	var Segment = (function () {
	    function Segment() {
	    }
	    Segment.prototype.generate = function (params) { return ''; };
	    return Segment;
	})();
	exports.Segment = Segment;
	var TouchMap = (function () {
	    function TouchMap(map) {
	        var _this = this;
	        this.map = collection_1.StringMapWrapper.create();
	        this.keys = collection_1.StringMapWrapper.create();
	        if (lang_1.isPresent(map)) {
	            collection_1.StringMapWrapper.forEach(map, function (value, key) {
	                _this.map[key] = lang_1.isPresent(value) ? value.toString() : null;
	                _this.keys[key] = true;
	            });
	        }
	    }
	    TouchMap.prototype.get = function (key) {
	        collection_1.StringMapWrapper.delete(this.keys, key);
	        return this.map[key];
	    };
	    TouchMap.prototype.getUnused = function () {
	        var _this = this;
	        var unused = collection_1.StringMapWrapper.create();
	        var keys = collection_1.StringMapWrapper.keys(this.keys);
	        collection_1.ListWrapper.forEach(keys, function (key) { unused[key] = collection_1.StringMapWrapper.get(_this.map, key); });
	        return unused;
	    };
	    return TouchMap;
	})();
	function normalizeString(obj) {
	    if (lang_1.isBlank(obj)) {
	        return null;
	    }
	    else {
	        return obj.toString();
	    }
	}
	function parseAndAssignMatrixParams(keyValueMap, matrixString) {
	    if (matrixString[0] == ';') {
	        matrixString = matrixString.substring(1);
	    }
	    matrixString.split(';').forEach(function (entry) {
	        var tuple = entry.split('=');
	        var key = tuple[0];
	        var value = tuple.length > 1 ? tuple[1] : true;
	        keyValueMap[key] = value;
	    });
	}
	var ContinuationSegment = (function (_super) {
	    __extends(ContinuationSegment, _super);
	    function ContinuationSegment() {
	        _super.apply(this, arguments);
	    }
	    return ContinuationSegment;
	})(Segment);
	var StaticSegment = (function (_super) {
	    __extends(StaticSegment, _super);
	    function StaticSegment(string) {
	        _super.call(this);
	        this.string = string;
	        this.name = '';
	        this.regex = url_1.escapeRegex(string);
	        // we add this property so that the route matcher still sees
	        // this segment as a valid path even if do not use the matrix
	        // parameters
	        this.regex += '(;[^\/]+)?';
	    }
	    StaticSegment.prototype.generate = function (params) { return this.string; };
	    return StaticSegment;
	})(Segment);
	var DynamicSegment = (function () {
	    function DynamicSegment(name) {
	        this.name = name;
	        this.regex = "([^/]+)";
	    }
	    DynamicSegment.prototype.generate = function (params) {
	        if (!collection_1.StringMapWrapper.contains(params.map, this.name)) {
	            throw new lang_1.BaseException("Route generator for '" + this.name + "' was not included in parameters passed.");
	        }
	        return normalizeString(params.get(this.name));
	    };
	    DynamicSegment = __decorate([
	        lang_2.IMPLEMENTS(Segment), 
	        __metadata('design:paramtypes', [String])
	    ], DynamicSegment);
	    return DynamicSegment;
	})();
	var StarSegment = (function () {
	    function StarSegment(name) {
	        this.name = name;
	        this.regex = "(.+)";
	    }
	    StarSegment.prototype.generate = function (params) { return normalizeString(params.get(this.name)); };
	    return StarSegment;
	})();
	var paramMatcher = /^:([^\/]+)$/g;
	var wildcardMatcher = /^\*([^\/]+)$/g;
	function parsePathString(route) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (lang_1.StringWrapper.startsWith(route, "/")) {
	        route = lang_1.StringWrapper.substring(route, 1);
	    }
	    var segments = splitBySlash(route);
	    var results = [];
	    var specificity = 0;
	    // The "specificity" of a path is used to determine which route is used when multiple routes match
	    // a URL.
	    // Static segments (like "/foo") are the most specific, followed by dynamic segments (like
	    // "/:id"). Star segments
	    // add no specificity. Segments at the start of the path are more specific than proceeding ones.
	    // The code below uses place values to combine the different types of segments into a single
	    // integer that we can
	    // sort later. Each static segment is worth hundreds of points of specificity (10000, 9900, ...,
	    // 200), and each
	    // dynamic segment is worth single points of specificity (100, 99, ... 2).
	    if (segments.length > 98) {
	        throw new lang_1.BaseException("'" + route + "' has more than the maximum supported number of segments.");
	    }
	    var limit = segments.length - 1;
	    for (var i = 0; i <= limit; i++) {
	        var segment = segments[i], match;
	        if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(paramMatcher, segment))) {
	            results.push(new DynamicSegment(match[1]));
	            specificity += (100 - i);
	        }
	        else if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(wildcardMatcher, segment))) {
	            results.push(new StarSegment(match[1]));
	        }
	        else if (segment == '...') {
	            if (i < limit) {
	                // TODO (matsko): setup a proper error here `
	                throw new lang_1.BaseException("Unexpected \"...\" before the end of the path for \"" + route + "\".");
	            }
	            results.push(new ContinuationSegment());
	        }
	        else if (segment.length > 0) {
	            results.push(new StaticSegment(segment));
	            specificity += 100 * (100 - i);
	        }
	    }
	    var result = collection_1.StringMapWrapper.create();
	    collection_1.StringMapWrapper.set(result, 'segments', results);
	    collection_1.StringMapWrapper.set(result, 'specificity', specificity);
	    return result;
	}
	function splitBySlash(url) {
	    return url.split('/');
	}
	var RESERVED_CHARS = lang_1.RegExpWrapper.create('//|\\(|\\)|;|\\?|=');
	function assertPath(path) {
	    if (lang_1.StringWrapper.contains(path, '#')) {
	        throw new lang_1.BaseException("Path \"" + path + "\" should not include \"#\". Use \"HashLocationStrategy\" instead.");
	    }
	    var illegalCharacter = lang_1.RegExpWrapper.firstMatch(RESERVED_CHARS, path);
	    if (lang_1.isPresent(illegalCharacter)) {
	        throw new lang_1.BaseException("Path \"" + path + "\" contains \"" + illegalCharacter[0] + "\" which is not allowed in a route config.");
	    }
	}
	// represents something like '/foo/:bar'
	var PathRecognizer = (function () {
	    function PathRecognizer(path, handler) {
	        var _this = this;
	        this.path = path;
	        this.handler = handler;
	        this.terminal = true;
	        assertPath(path);
	        var parsed = parsePathString(path);
	        var specificity = parsed['specificity'];
	        var segments = parsed['segments'];
	        var regexString = '^';
	        collection_1.ListWrapper.forEach(segments, function (segment) {
	            if (segment instanceof ContinuationSegment) {
	                _this.terminal = false;
	            }
	            else {
	                regexString += '/' + segment.regex;
	            }
	        });
	        if (this.terminal) {
	            regexString += '$';
	        }
	        this.regex = lang_1.RegExpWrapper.create(regexString);
	        this.segments = segments;
	        this.specificity = specificity;
	    }
	    PathRecognizer.prototype.parseParams = function (url) {
	        // the last segment is always the star one since it's terminal
	        var segmentsLimit = this.segments.length - 1;
	        var containsStarSegment = segmentsLimit >= 0 && this.segments[segmentsLimit] instanceof StarSegment;
	        var matrixString;
	        if (!containsStarSegment) {
	            var matches = lang_1.RegExpWrapper.firstMatch(lang_1.RegExpWrapper.create('^(.*\/[^\/]+?)(;[^\/]+)?\/?$'), url);
	            if (lang_1.isPresent(matches)) {
	                url = matches[1];
	                matrixString = matches[2];
	            }
	            url = lang_1.StringWrapper.replaceAll(url, /(;[^\/]+)(?=(\/|\Z))/g, '');
	        }
	        var params = collection_1.StringMapWrapper.create();
	        var urlPart = url;
	        for (var i = 0; i <= segmentsLimit; i++) {
	            var segment = this.segments[i];
	            if (segment instanceof ContinuationSegment) {
	                continue;
	            }
	            var match = lang_1.RegExpWrapper.firstMatch(lang_1.RegExpWrapper.create('/' + segment.regex), urlPart);
	            urlPart = lang_1.StringWrapper.substring(urlPart, match[0].length);
	            if (segment.name.length > 0) {
	                params[segment.name] = match[1];
	            }
	        }
	        if (lang_1.isPresent(matrixString) && matrixString.length > 0 && matrixString[0] == ';') {
	            parseAndAssignMatrixParams(params, matrixString);
	        }
	        return params;
	    };
	    PathRecognizer.prototype.generate = function (params) {
	        var paramTokens = new TouchMap(params);
	        var applyLeadingSlash = false;
	        var url = '';
	        for (var i = 0; i < this.segments.length; i++) {
	            var segment = this.segments[i];
	            var s = segment.generate(paramTokens);
	            applyLeadingSlash = applyLeadingSlash || (segment instanceof ContinuationSegment);
	            if (s.length > 0) {
	                url += (i > 0 ? '/' : '') + s;
	            }
	        }
	        var unusedParams = paramTokens.getUnused();
	        collection_1.StringMapWrapper.forEach(unusedParams, function (value, key) {
	            url += ';' + key;
	            if (lang_1.isPresent(value)) {
	                url += '=' + value;
	            }
	        });
	        if (applyLeadingSlash) {
	            url += '/';
	        }
	        return url;
	    };
	    PathRecognizer.prototype.resolveComponentType = function () { return this.handler.resolveComponentType(); };
	    return PathRecognizer;
	})();
	exports.PathRecognizer = PathRecognizer;
	//# sourceMappingURL=path_recognizer.js.map

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var route_config_decorator_1 = __webpack_require__(37);
	var lang_1 = __webpack_require__(1);
	/**
	 * Given a JS Object that represents... returns a corresponding Route, AsyncRoute, or Redirect
	 */
	function normalizeRouteConfig(config) {
	    if (config instanceof route_config_decorator_1.Route || config instanceof route_config_decorator_1.Redirect || config instanceof route_config_decorator_1.AsyncRoute) {
	        return config;
	    }
	    if ((!config.component) == (!config.redirectTo)) {
	        throw new lang_1.BaseException("Route config should contain exactly one 'component', or 'redirectTo' property");
	    }
	    if (config.component) {
	        if (typeof config.component == 'object') {
	            var componentDefinitionObject = config.component;
	            if (componentDefinitionObject.type == 'constructor') {
	                return new route_config_decorator_1.Route({
	                    path: config.path,
	                    component: componentDefinitionObject.constructor,
	                    as: config.as
	                });
	            }
	            else if (componentDefinitionObject.type == 'loader') {
	                return new route_config_decorator_1.AsyncRoute({ path: config.path, loader: componentDefinitionObject.loader, as: config.as });
	            }
	            else {
	                throw new lang_1.BaseException("Invalid component type '" + componentDefinitionObject.type + "'. Valid types are \"constructor\" and \"loader\".");
	            }
	        }
	        return new route_config_decorator_1.Route(config);
	    }
	    if (config.redirectTo) {
	        return new route_config_decorator_1.Redirect({ path: config.path, redirectTo: config.redirectTo });
	    }
	    return config;
	}
	exports.normalizeRouteConfig = normalizeRouteConfig;
	//# sourceMappingURL=route_config_nomalizer.js.map

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var lang_1 = __webpack_require__(1);
	var collection_1 = __webpack_require__(2);
	var path_recognizer_1 = __webpack_require__(93);
	var route_config_impl_1 = __webpack_require__(15);
	var async_route_handler_1 = __webpack_require__(91);
	var sync_route_handler_1 = __webpack_require__(96);
	/**
	 * `RouteRecognizer` is responsible for recognizing routes for a single component.
	 * It is consumed by `RouteRegistry`, which knows how to recognize an entire hierarchy of
	 * components.
	 */
	var RouteRecognizer = (function () {
	    function RouteRecognizer() {
	        this.names = new collection_1.Map();
	        this.redirects = new collection_1.Map();
	        this.matchers = new collection_1.Map();
	    }
	    RouteRecognizer.prototype.config = function (config) {
	        var handler;
	        if (config instanceof route_config_impl_1.Redirect) {
	            var path = config.path == '/' ? '' : config.path;
	            this.redirects.set(path, config.redirectTo);
	            return true;
	        }
	        else if (config instanceof route_config_impl_1.Route) {
	            handler = new sync_route_handler_1.SyncRouteHandler(config.component);
	        }
	        else if (config instanceof route_config_impl_1.AsyncRoute) {
	            handler = new async_route_handler_1.AsyncRouteHandler(config.loader);
	        }
	        var recognizer = new path_recognizer_1.PathRecognizer(config.path, handler);
	        collection_1.MapWrapper.forEach(this.matchers, function (matcher, _) {
	            if (recognizer.regex.toString() == matcher.regex.toString()) {
	                throw new lang_1.BaseException("Configuration '" + config.path + "' conflicts with existing route '" + matcher.path + "'");
	            }
	        });
	        this.matchers.set(recognizer.regex, recognizer);
	        if (lang_1.isPresent(config.as)) {
	            this.names.set(config.as, recognizer);
	        }
	        return recognizer.terminal;
	    };
	    /**
	     * Given a URL, returns a list of `RouteMatch`es, which are partial recognitions for some route.
	     *
	     */
	    RouteRecognizer.prototype.recognize = function (url) {
	        var solutions = [];
	        if (url.length > 0 && url[url.length - 1] == '/') {
	            url = url.substring(0, url.length - 1);
	        }
	        collection_1.MapWrapper.forEach(this.redirects, function (target, path) {
	            // "/" redirect case
	            if (path == '/' || path == '') {
	                if (path == url) {
	                    url = target;
	                }
	            }
	            else if (url.startsWith(path)) {
	                url = target + url.substring(path.length);
	            }
	        });
	        collection_1.MapWrapper.forEach(this.matchers, function (pathRecognizer, regex) {
	            var match;
	            if (lang_1.isPresent(match = lang_1.RegExpWrapper.firstMatch(regex, url))) {
	                var matchedUrl = '/';
	                var unmatchedUrl = '';
	                if (url != '/') {
	                    matchedUrl = match[0];
	                    unmatchedUrl = url.substring(match[0].length);
	                }
	                solutions.push(new RouteMatch(pathRecognizer, matchedUrl, unmatchedUrl));
	            }
	        });
	        return solutions;
	    };
	    RouteRecognizer.prototype.hasRoute = function (name) { return this.names.has(name); };
	    RouteRecognizer.prototype.generate = function (name, params) {
	        var pathRecognizer = this.names.get(name);
	        if (lang_1.isBlank(pathRecognizer)) {
	            return null;
	        }
	        var url = pathRecognizer.generate(params);
	        return { url: url, 'nextComponent': pathRecognizer.handler.componentType };
	    };
	    return RouteRecognizer;
	})();
	exports.RouteRecognizer = RouteRecognizer;
	var RouteMatch = (function () {
	    function RouteMatch(recognizer, matchedUrl, unmatchedUrl) {
	        this.recognizer = recognizer;
	        this.matchedUrl = matchedUrl;
	        this.unmatchedUrl = unmatchedUrl;
	    }
	    RouteMatch.prototype.params = function () { return this.recognizer.parseParams(this.matchedUrl); };
	    return RouteMatch;
	})();
	exports.RouteMatch = RouteMatch;
	function configObjToHandler(config) {
	    if (lang_1.isType(config)) {
	        return new sync_route_handler_1.SyncRouteHandler(config);
	    }
	    else if (lang_1.isStringMap(config)) {
	        if (lang_1.isBlank(config['type'])) {
	            throw new lang_1.BaseException("Component declaration when provided as a map should include a 'type' property");
	        }
	        var componentType = config['type'];
	        if (componentType == 'constructor') {
	            return new sync_route_handler_1.SyncRouteHandler(config['constructor']);
	        }
	        else if (componentType == 'loader') {
	            return new async_route_handler_1.AsyncRouteHandler(config['loader']);
	        }
	        else {
	            throw new lang_1.BaseException("oops");
	        }
	    }
	    throw new lang_1.BaseException("Unexpected component \"" + config + "\".");
	}
	//# sourceMappingURL=route_recognizer.js.map

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var async_1 = __webpack_require__(5);
	var SyncRouteHandler = (function () {
	    function SyncRouteHandler(componentType) {
	        this.componentType = componentType;
	        this._resolvedComponent = null;
	        this._resolvedComponent = async_1.PromiseWrapper.resolve(componentType);
	    }
	    SyncRouteHandler.prototype.resolveComponentType = function () { return this._resolvedComponent; };
	    return SyncRouteHandler;
	})();
	exports.SyncRouteHandler = SyncRouteHandler;
	//# sourceMappingURL=sync_route_handler.js.map

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var lang_1 = __webpack_require__(1);
	var specialCharacters = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	var escapeRe = lang_1.RegExpWrapper.create('(\\' + specialCharacters.join('|\\') + ')', 'g');
	function escapeRegex(string) {
	    return lang_1.StringWrapper.replaceAllMapped(string, escapeRe, function (match) { return "\\" + match; });
	}
	exports.escapeRegex = escapeRegex;
	//# sourceMappingURL=url.js.map

/***/ },
/* 98 */,
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, process) {// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.
	
	;(function (undefined) {
	
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };
	
	  var root = (objectTypes[typeof window] && window) || this,
	    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
	    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
	    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
	    freeGlobal = objectTypes[typeof global] && global;
	
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  var Rx = {
	      internals: {},
	      config: {
	        Promise: root.Promise
	      },
	      helpers: { }
	  };
	
	  // Defaults
	  var noop = Rx.helpers.noop = function () { },
	    notDefined = Rx.helpers.notDefined = function (x) { return typeof x === 'undefined'; },
	    identity = Rx.helpers.identity = function (x) { return x; },
	    pluck = Rx.helpers.pluck = function (property) { return function (x) { return x[property]; }; },
	    just = Rx.helpers.just = function (value) { return function () { return value; }; },
	    defaultNow = Rx.helpers.defaultNow = Date.now,
	    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
	    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
	    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
	    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
	    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
	    asArray = Rx.helpers.asArray = function () { return Array.prototype.slice.call(arguments); },
	    not = Rx.helpers.not = function (a) { return !a; },
	    isFunction = Rx.helpers.isFunction = (function () {
	
	      var isFn = function (value) {
	        return typeof value == 'function' || false;
	      }
	
	      // fallback for older versions of Chrome and Safari
	      if (isFn(/x/)) {
	        isFn = function(value) {
	          return typeof value == 'function' && toString.call(value) == '[object Function]';
	        };
	      }
	
	      return isFn;
	    }());
	
	  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}
	
	  Rx.config.longStackSupport = false;
	  var hasStacks = false;
	  try {
	    throw new Error();
	  } catch (e) {
	    hasStacks = !!e.stack;
	  }
	
	  // All code after this point will be filtered from stack traces reported by RxJS
	  var rStartingLine = captureLine(), rFileName;
	
	  var STACK_JUMP_SEPARATOR = "From previous event:";
	
	  function makeStackTraceLong(error, observable) {
	      // If possible, transform the error stack trace by removing Node and RxJS
	      // cruft, then concatenating with the stack trace of `observable`.
	      if (hasStacks &&
	          observable.stack &&
	          typeof error === "object" &&
	          error !== null &&
	          error.stack &&
	          error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	      ) {
	        var stacks = [];
	        for (var o = observable; !!o; o = o.source) {
	          if (o.stack) {
	            stacks.unshift(o.stack);
	          }
	        }
	        stacks.unshift(error.stack);
	
	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	  }
	
	  function filterStackString(stackString) {
	    var lines = stackString.split("\n"),
	        desiredLines = [];
	    for (var i = 0, len = lines.length; i < len; i++) {
	      var line = lines[i];
	
	      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	        desiredLines.push(line);
	      }
	    }
	    return desiredLines.join("\n");
	  }
	
	  function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	    if (!fileNameAndLineNumber) {
	      return false;
	    }
	    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];
	
	    return fileName === rFileName &&
	      lineNumber >= rStartingLine &&
	      lineNumber <= rEndingLine;
	  }
	
	  function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	      stackLine.indexOf("(node.js:") !== -1;
	  }
	
	  function captureLine() {
	    if (!hasStacks) { return; }
	
	    try {
	      throw new Error();
	    } catch (e) {
	      var lines = e.stack.split("\n");
	      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	      if (!fileNameAndLineNumber) { return; }
	
	      rFileName = fileNameAndLineNumber[0];
	      return fileNameAndLineNumber[1];
	    }
	  }
	
	  function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }
	
	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }
	
	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
	  }
	
	  var EmptyError = Rx.EmptyError = function() {
	    this.message = 'Sequence contains no elements.';
	    Error.call(this);
	  };
	  EmptyError.prototype = Error.prototype;
	
	  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
	    this.message = 'Object has been disposed';
	    Error.call(this);
	  };
	  ObjectDisposedError.prototype = Error.prototype;
	
	  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
	    this.message = 'Argument out of range';
	    Error.call(this);
	  };
	  ArgumentOutOfRangeError.prototype = Error.prototype;
	
	  var NotSupportedError = Rx.NotSupportedError = function (message) {
	    this.message = message || 'This operation is not supported';
	    Error.call(this);
	  };
	  NotSupportedError.prototype = Error.prototype;
	
	  var NotImplementedError = Rx.NotImplementedError = function (message) {
	    this.message = message || 'This operation is not implemented';
	    Error.call(this);
	  };
	  NotImplementedError.prototype = Error.prototype;
	
	  var notImplemented = Rx.helpers.notImplemented = function () {
	    throw new NotImplementedError();
	  };
	
	  var notSupported = Rx.helpers.notSupported = function () {
	    throw new NotSupportedError();
	  };
	
	  // Shim in iterator support
	  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
	    '_es6shim_iterator_';
	  // Bug for mozilla version
	  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	    $iterator$ = '@@iterator';
	  }
	
	  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };
	
	  var isIterable = Rx.helpers.isIterable = function (o) {
	    return o[$iterator$] !== undefined;
	  }
	
	  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
	    return o && o.length !== undefined;
	  }
	
	  Rx.helpers.iterator = $iterator$;
	
	  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
	    if (typeof thisArg === 'undefined') { return func; }
	    switch(argCount) {
	      case 0:
	        return function() {
	          return func.call(thisArg)
	        };
	      case 1:
	        return function(arg) {
	          return func.call(thisArg, arg);
	        }
	      case 2:
	        return function(value, index) {
	          return func.call(thisArg, value, index);
	        };
	      case 3:
	        return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	    }
	
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  };
	
	  /** Used to determine if values are of the language type Object */
	  var dontEnums = ['toString',
	    'toLocaleString',
	    'valueOf',
	    'hasOwnProperty',
	    'isPrototypeOf',
	    'propertyIsEnumerable',
	    'constructor'],
	  dontEnumsLength = dontEnums.length;
	
	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	    arrayClass = '[object Array]',
	    boolClass = '[object Boolean]',
	    dateClass = '[object Date]',
	    errorClass = '[object Error]',
	    funcClass = '[object Function]',
	    numberClass = '[object Number]',
	    objectClass = '[object Object]',
	    regexpClass = '[object RegExp]',
	    stringClass = '[object String]';
	
	  var toString = Object.prototype.toString,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
	    supportNodeClass,
	    errorProto = Error.prototype,
	    objectProto = Object.prototype,
	    stringProto = String.prototype,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	  try {
	    supportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
	  } catch (e) {
	    supportNodeClass = true;
	  }
	
	  var nonEnumProps = {};
	  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	  nonEnumProps[objectClass] = { 'constructor': true };
	
	  var support = {};
	  (function () {
	    var ctor = function() { this.x = 1; },
	      props = [];
	
	    ctor.prototype = { 'valueOf': 1, 'y': 1 };
	    for (var key in new ctor) { props.push(key); }
	    for (key in arguments) { }
	
	    // Detect if `name` or `message` properties of `Error.prototype` are enumerable by default.
	    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
	
	    // Detect if `prototype` properties are enumerable by default.
	    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');
	
	    // Detect if `arguments` object indexes are non-enumerable
	    support.nonEnumArgs = key != 0;
	
	    // Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	    support.nonEnumShadows = !/valueOf/.test(props);
	  }(1));
	
	  var isObject = Rx.internals.isObject = function(value) {
	    var type = typeof value;
	    return value && (type == 'function' || type == 'object') || false;
	  };
	
	  function keysIn(object) {
	    var result = [];
	    if (!isObject(object)) {
	      return result;
	    }
	    if (support.nonEnumArgs && object.length && isArguments(object)) {
	      object = slice.call(object);
	    }
	    var skipProto = support.enumPrototypes && typeof object == 'function',
	        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);
	
	    for (var key in object) {
	      if (!(skipProto && key == 'prototype') &&
	          !(skipErrorProps && (key == 'message' || key == 'name'))) {
	        result.push(key);
	      }
	    }
	
	    if (support.nonEnumShadows && object !== objectProto) {
	      var ctor = object.constructor,
	          index = -1,
	          length = dontEnumsLength;
	
	      if (object === (ctor && ctor.prototype)) {
	        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
	            nonEnum = nonEnumProps[className];
	      }
	      while (++index < length) {
	        key = dontEnums[index];
	        if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
	          result.push(key);
	        }
	      }
	    }
	    return result;
	  }
	
	  function internalFor(object, callback, keysFunc) {
	    var index = -1,
	      props = keysFunc(object),
	      length = props.length;
	
	    while (++index < length) {
	      var key = props[index];
	      if (callback(object[key], key, object) === false) {
	        break;
	      }
	    }
	    return object;
	  }
	
	  function internalForIn(object, callback) {
	    return internalFor(object, callback, keysIn);
	  }
	
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }
	
	  var isArguments = function(value) {
	    return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
	  }
	
	  // fallback for browsers that can't detect `arguments` objects by [[Class]]
	  if (!supportsArgsClass) {
	    isArguments = function(value) {
	      return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
	    };
	  }
	
	  var isEqual = Rx.internals.isEqual = function (x, y) {
	    return deepEquals(x, y, [], []);
	  };
	
	  /** @private
	   * Used for deep comparison
	   **/
	  function deepEquals(a, b, stackA, stackB) {
	    // exit early for identical values
	    if (a === b) {
	      // treat `+0` vs. `-0` as not equal
	      return a !== 0 || (1 / a == 1 / b);
	    }
	
	    var type = typeof a,
	        otherType = typeof b;
	
	    // exit early for unlike primitive values
	    if (a === a && (a == null || b == null ||
	        (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
	      return false;
	    }
	
	    // compare [[Class]] names
	    var className = toString.call(a),
	        otherClass = toString.call(b);
	
	    if (className == argsClass) {
	      className = objectClass;
	    }
	    if (otherClass == argsClass) {
	      otherClass = objectClass;
	    }
	    if (className != otherClass) {
	      return false;
	    }
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        // coerce dates and booleans to numbers, dates to milliseconds and booleans
	        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	        return +a == +b;
	
	      case numberClass:
	        // treat `NaN` vs. `NaN` as equal
	        return (a != +a) ?
	          b != +b :
	          // but treat `-0` vs. `+0` as not equal
	          (a == 0 ? (1 / a == 1 / b) : a == +b);
	
	      case regexpClass:
	      case stringClass:
	        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	        // treat string primitives and their corresponding object instances as equal
	        return a == String(b);
	    }
	    var isArr = className == arrayClass;
	    if (!isArr) {
	
	      // exit for functions and DOM nodes
	      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
	        return false;
	      }
	      // in older versions of Opera, `arguments` objects have `Array` constructors
	      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
	          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;
	
	      // non `Object` object instances with different constructors are not equal
	      if (ctorA != ctorB &&
	            !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) &&
	            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	            ('constructor' in a && 'constructor' in b)
	          ) {
	        return false;
	      }
	    }
	    // assume cyclic structures are equal
	    // the algorithm for detecting cyclic structures is adapted from ES 5.1
	    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	    var initedStack = !stackA;
	    stackA || (stackA = []);
	    stackB || (stackB = []);
	
	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == a) {
	        return stackB[length] == b;
	      }
	    }
	    var size = 0;
	    var result = true;
	
	    // add `a` and `b` to the stack of traversed objects
	    stackA.push(a);
	    stackB.push(b);
	
	    // recursively compare objects and arrays (susceptible to call stack limits)
	    if (isArr) {
	      // compare lengths to determine if a deep comparison is necessary
	      length = a.length;
	      size = b.length;
	      result = size == length;
	
	      if (result) {
	        // deep compare the contents, ignoring non-numeric properties
	        while (size--) {
	          var index = length,
	              value = b[size];
	
	          if (!(result = deepEquals(a[size], value, stackA, stackB))) {
	            break;
	          }
	        }
	      }
	    }
	    else {
	      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	      // which, in this case, is more costly
	      internalForIn(b, function(value, key, b) {
	        if (hasOwnProperty.call(b, key)) {
	          // count the number of properties.
	          size++;
	          // deep compare each property value.
	          return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
	        }
	      });
	
	      if (result) {
	        // ensure both objects have the same number of properties
	        internalForIn(a, function(value, key, a) {
	          if (hasOwnProperty.call(a, key)) {
	            // `size` will be `-1` if `a` has more properties than `b`
	            return (result = --size > -1);
	          }
	        });
	      }
	    }
	    stackA.pop();
	    stackB.pop();
	
	    return result;
	  }
	
	  var hasProp = {}.hasOwnProperty,
	      slice = Array.prototype.slice;
	
	  var inherits = this.inherits = Rx.internals.inherits = function (child, parent) {
	    function __() { this.constructor = child; }
	    __.prototype = parent.prototype;
	    child.prototype = new __();
	  };
	
	  var addProperties = Rx.internals.addProperties = function (obj) {
	    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
	      var source = sources[idx];
	      for (var prop in source) {
	        obj[prop] = source[prop];
	      }
	    }
	  };
	
	  // Rx Utils
	  var addRef = Rx.internals.addRef = function (xs, r) {
	    return new AnonymousObservable(function (observer) {
	      return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
	    });
	  };
	
	  function arrayInitialize(count, factory) {
	    var a = new Array(count);
	    for (var i = 0; i < count; i++) {
	      a[i] = factory();
	    }
	    return a;
	  }
	
	  var errorObj = {e: {}};
	  var tryCatchTarget;
	  function tryCatcher() {
	    try {
	      return tryCatchTarget.apply(this, arguments);
	    } catch (e) {
	      errorObj.e = e;
	      return errorObj;
	    }
	  }
	  function tryCatch(fn) {
	    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
	    tryCatchTarget = fn;
	    return tryCatcher;
	  }
	  function thrower(e) {
	    throw e;
	  }
	
	  // Collections
	  function IndexedItem(id, value) {
	    this.id = id;
	    this.value = value;
	  }
	
	  IndexedItem.prototype.compareTo = function (other) {
	    var c = this.value.compareTo(other.value);
	    c === 0 && (c = this.id - other.id);
	    return c;
	  };
	
	  // Priority Queue for Scheduling
	  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
	    this.items = new Array(capacity);
	    this.length = 0;
	  };
	
	  var priorityProto = PriorityQueue.prototype;
	  priorityProto.isHigherPriority = function (left, right) {
	    return this.items[left].compareTo(this.items[right]) < 0;
	  };
	
	  priorityProto.percolate = function (index) {
	    if (index >= this.length || index < 0) { return; }
	    var parent = index - 1 >> 1;
	    if (parent < 0 || parent === index) { return; }
	    if (this.isHigherPriority(index, parent)) {
	      var temp = this.items[index];
	      this.items[index] = this.items[parent];
	      this.items[parent] = temp;
	      this.percolate(parent);
	    }
	  };
	
	  priorityProto.heapify = function (index) {
	    +index || (index = 0);
	    if (index >= this.length || index < 0) { return; }
	    var left = 2 * index + 1,
	        right = 2 * index + 2,
	        first = index;
	    if (left < this.length && this.isHigherPriority(left, first)) {
	      first = left;
	    }
	    if (right < this.length && this.isHigherPriority(right, first)) {
	      first = right;
	    }
	    if (first !== index) {
	      var temp = this.items[index];
	      this.items[index] = this.items[first];
	      this.items[first] = temp;
	      this.heapify(first);
	    }
	  };
	
	  priorityProto.peek = function () { return this.items[0].value; };
	
	  priorityProto.removeAt = function (index) {
	    this.items[index] = this.items[--this.length];
	    this.items[this.length] = undefined;
	    this.heapify();
	  };
	
	  priorityProto.dequeue = function () {
	    var result = this.peek();
	    this.removeAt(0);
	    return result;
	  };
	
	  priorityProto.enqueue = function (item) {
	    var index = this.length++;
	    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
	    this.percolate(index);
	  };
	
	  priorityProto.remove = function (item) {
	    for (var i = 0; i < this.length; i++) {
	      if (this.items[i].value === item) {
	        this.removeAt(i);
	        return true;
	      }
	    }
	    return false;
	  };
	  PriorityQueue.count = 0;
	
	  /**
	   * Represents a group of disposable resources that are disposed together.
	   * @constructor
	   */
	  var CompositeDisposable = Rx.CompositeDisposable = function () {
	    var args = [], i, len;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	      len = args.length;
	    } else {
	      len = arguments.length;
	      args = new Array(len);
	      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    for(i = 0; i < len; i++) {
	      if (!isDisposable(args[i])) { throw new TypeError('Not a disposable'); }
	    }
	    this.disposables = args;
	    this.isDisposed = false;
	    this.length = args.length;
	  };
	
	  var CompositeDisposablePrototype = CompositeDisposable.prototype;
	
	  /**
	   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	   * @param {Mixed} item Disposable to add.
	   */
	  CompositeDisposablePrototype.add = function (item) {
	    if (this.isDisposed) {
	      item.dispose();
	    } else {
	      this.disposables.push(item);
	      this.length++;
	    }
	  };
	
	  /**
	   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	   * @param {Mixed} item Disposable to remove.
	   * @returns {Boolean} true if found; false otherwise.
	   */
	  CompositeDisposablePrototype.remove = function (item) {
	    var shouldDispose = false;
	    if (!this.isDisposed) {
	      var idx = this.disposables.indexOf(item);
	      if (idx !== -1) {
	        shouldDispose = true;
	        this.disposables.splice(idx, 1);
	        this.length--;
	        item.dispose();
	      }
	    }
	    return shouldDispose;
	  };
	
	  /**
	   *  Disposes all disposables in the group and removes them from the group.
	   */
	  CompositeDisposablePrototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var len = this.disposables.length, currentDisposables = new Array(len);
	      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
	      this.disposables = [];
	      this.length = 0;
	
	      for (i = 0; i < len; i++) {
	        currentDisposables[i].dispose();
	      }
	    }
	  };
	
	  /**
	   * Provides a set of static methods for creating Disposables.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   */
	  var Disposable = Rx.Disposable = function (action) {
	    this.isDisposed = false;
	    this.action = action || noop;
	  };
	
	  /** Performs the task of cleaning up resources. */
	  Disposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.action();
	      this.isDisposed = true;
	    }
	  };
	
	  /**
	   * Creates a disposable object that invokes the specified action when disposed.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   * @return {Disposable} The disposable object that runs the given action upon disposal.
	   */
	  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };
	
	  /**
	   * Gets the disposable that does nothing when disposed.
	   */
	  var disposableEmpty = Disposable.empty = { dispose: noop };
	
	  /**
	   * Validates whether the given object is a disposable
	   * @param {Object} Object to test whether it has a dispose method
	   * @returns {Boolean} true if a disposable object, else false.
	   */
	  var isDisposable = Disposable.isDisposable = function (d) {
	    return d && isFunction(d.dispose);
	  };
	
	  var checkDisposed = Disposable.checkDisposed = function (disposable) {
	    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
	  };
	
	  // Single assignment
	  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SingleAssignmentDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
	    if (this.current) { throw new Error('Disposable has already been assigned'); }
	    var shouldDispose = this.isDisposed;
	    !shouldDispose && (this.current = value);
	    shouldDispose && value && value.dispose();
	  };
	  SingleAssignmentDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };
	
	  // Multiple assignment disposable
	  var SerialDisposable = Rx.SerialDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SerialDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SerialDisposable.prototype.setDisposable = function (value) {
	    var shouldDispose = this.isDisposed;
	    if (!shouldDispose) {
	      var old = this.current;
	      this.current = value;
	    }
	    old && old.dispose();
	    shouldDispose && value && value.dispose();
	  };
	  SerialDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };
	
	  /**
	   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
	   */
	  var RefCountDisposable = Rx.RefCountDisposable = (function () {
	
	    function InnerDisposable(disposable) {
	      this.disposable = disposable;
	      this.disposable.count++;
	      this.isInnerDisposed = false;
	    }
	
	    InnerDisposable.prototype.dispose = function () {
	      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
	        this.isInnerDisposed = true;
	        this.disposable.count--;
	        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
	          this.disposable.isDisposed = true;
	          this.disposable.underlyingDisposable.dispose();
	        }
	      }
	    };
	
	    /**
	     * Initializes a new instance of the RefCountDisposable with the specified disposable.
	     * @constructor
	     * @param {Disposable} disposable Underlying disposable.
	      */
	    function RefCountDisposable(disposable) {
	      this.underlyingDisposable = disposable;
	      this.isDisposed = false;
	      this.isPrimaryDisposed = false;
	      this.count = 0;
	    }
	
	    /**
	     * Disposes the underlying disposable only when all dependent disposables have been disposed
	     */
	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed && !this.isPrimaryDisposed) {
	        this.isPrimaryDisposed = true;
	        if (this.count === 0) {
	          this.isDisposed = true;
	          this.underlyingDisposable.dispose();
	        }
	      }
	    };
	
	    /**
	     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
	     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
	     */
	    RefCountDisposable.prototype.getDisposable = function () {
	      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
	    };
	
	    return RefCountDisposable;
	  })();
	
	  function ScheduledDisposable(scheduler, disposable) {
	    this.scheduler = scheduler;
	    this.disposable = disposable;
	    this.isDisposed = false;
	  }
	
	  function scheduleItem(s, self) {
	    if (!self.isDisposed) {
	      self.isDisposed = true;
	      self.disposable.dispose();
	    }
	  }
	
	  ScheduledDisposable.prototype.dispose = function () {
	    this.scheduler.scheduleWithState(this, scheduleItem);
	  };
	
	  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
	    this.scheduler = scheduler;
	    this.state = state;
	    this.action = action;
	    this.dueTime = dueTime;
	    this.comparer = comparer || defaultSubComparer;
	    this.disposable = new SingleAssignmentDisposable();
	  }
	
	  ScheduledItem.prototype.invoke = function () {
	    this.disposable.setDisposable(this.invokeCore());
	  };
	
	  ScheduledItem.prototype.compareTo = function (other) {
	    return this.comparer(this.dueTime, other.dueTime);
	  };
	
	  ScheduledItem.prototype.isCancelled = function () {
	    return this.disposable.isDisposed;
	  };
	
	  ScheduledItem.prototype.invokeCore = function () {
	    return this.action(this.scheduler, this.state);
	  };
	
	  /** Provides a set of static properties to access commonly used schedulers. */
	  var Scheduler = Rx.Scheduler = (function () {
	
	    function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
	      this.now = now;
	      this._schedule = schedule;
	      this._scheduleRelative = scheduleRelative;
	      this._scheduleAbsolute = scheduleAbsolute;
	    }
	
	    /** Determines whether the given object is a scheduler */
	    Scheduler.isScheduler = function (s) {
	      return s instanceof Scheduler;
	    }
	
	    function invokeAction(scheduler, action) {
	      action();
	      return disposableEmpty;
	    }
	
	    var schedulerProto = Scheduler.prototype;
	
	    /**
	     * Schedules an action to be executed.
	     * @param {Function} action Action to execute.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.schedule = function (action) {
	      return this._schedule(action, invokeAction);
	    };
	
	    /**
	     * Schedules an action to be executed.
	     * @param state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithState = function (state, action) {
	      return this._schedule(state, action);
	    };
	
	    /**
	     * Schedules an action to be executed after the specified relative due time.
	     * @param {Function} action Action to execute.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithRelative = function (dueTime, action) {
	      return this._scheduleRelative(action, dueTime, invokeAction);
	    };
	
	    /**
	     * Schedules an action to be executed after dueTime.
	     * @param state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithRelativeAndState = function (state, dueTime, action) {
	      return this._scheduleRelative(state, dueTime, action);
	    };
	
	    /**
	     * Schedules an action to be executed at the specified absolute due time.
	     * @param {Function} action Action to execute.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	      */
	    schedulerProto.scheduleWithAbsolute = function (dueTime, action) {
	      return this._scheduleAbsolute(action, dueTime, invokeAction);
	    };
	
	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to be executed.
	     * @param {Number}dueTime Absolute time at which to execute the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
	      return this._scheduleAbsolute(state, dueTime, action);
	    };
	
	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.now = defaultNow;
	
	    /**
	     * Normalizes the specified TimeSpan value to a positive value.
	     * @param {Number} timeSpan The time span value to normalize.
	     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
	     */
	    Scheduler.normalize = function (timeSpan) {
	      timeSpan < 0 && (timeSpan = 0);
	      return timeSpan;
	    };
	
	    return Scheduler;
	  }());
	
	  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;
	
	  (function (schedulerProto) {
	
	    function invokeRecImmediate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	
	      function recursiveAction(state1) {
	        action(state1, function (state2) {
	          var isAdded = false, isDone = false,
	          d = scheduler.scheduleWithState(state2, function (scheduler1, state3) {
	            if (isAdded) {
	              group.remove(d);
	            } else {
	              isDone = true;
	            }
	            recursiveAction(state3);
	            return disposableEmpty;
	          });
	          if (!isDone) {
	            group.add(d);
	            isAdded = true;
	          }
	        });
	      }
	      recursiveAction(state);
	      return group;
	    }
	
	    function invokeRecDate(scheduler, pair, method) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      function recursiveAction(state1) {
	        action(state1, function (state2, dueTime1) {
	          var isAdded = false, isDone = false,
	          d = scheduler[method](state2, dueTime1, function (scheduler1, state3) {
	            if (isAdded) {
	              group.remove(d);
	            } else {
	              isDone = true;
	            }
	            recursiveAction(state3);
	            return disposableEmpty;
	          });
	          if (!isDone) {
	            group.add(d);
	            isAdded = true;
	          }
	        });
	      };
	      recursiveAction(state);
	      return group;
	    }
	
	    function scheduleInnerRecursive(action, self) {
	      action(function(dt) { self(action, dt); });
	    }
	
	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursive = function (action) {
	      return this.scheduleRecursiveWithState(action, scheduleInnerRecursive);
	    };
	
	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithState = function (state, action) {
	      return this.scheduleWithState([state, action], invokeRecImmediate);
	    };
	
	    /**
	     * Schedules an action to be executed recursively after a specified relative due time.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified relative time.
	     * @param {Number}dueTime Relative time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithRelative = function (dueTime, action) {
	      return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
	    };
	
	    /**
	     * Schedules an action to be executed recursively after a specified relative due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number}dueTime Relative time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
	      return this._scheduleRelative([state, action], dueTime, function (s, p) {
	        return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
	      });
	    };
	
	    /**
	     * Schedules an action to be executed recursively at a specified absolute due time.
	     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified absolute time.
	     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithAbsolute = function (dueTime, action) {
	      return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
	    };
	
	    /**
	     * Schedules an action to be executed recursively at a specified absolute due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
	      return this._scheduleAbsolute([state, action], dueTime, function (s, p) {
	        return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
	      });
	    };
	  }(Scheduler.prototype));
	
	  (function (schedulerProto) {
	
	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    Scheduler.prototype.schedulePeriodic = function (period, action) {
	      return this.schedulePeriodicWithState(null, period, action);
	    };
	
	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
	      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
	      period = normalizeTime(period);
	      var s = state, id = root.setInterval(function () { s = action(s); }, period);
	      return disposableCreate(function () { root.clearInterval(id); });
	    };
	
	  }(Scheduler.prototype));
	
	  (function (schedulerProto) {
	    /**
	     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
	     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
	     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
	     */
	    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
	      return new CatchScheduler(this, handler);
	    };
	  }(Scheduler.prototype));
	
	  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
	    function tick(command, recurse) {
	      recurse(0, this._period);
	      try {
	        this._state = this._action(this._state);
	      } catch (e) {
	        this._cancel.dispose();
	        throw e;
	      }
	    }
	
	    function SchedulePeriodicRecursive(scheduler, state, period, action) {
	      this._scheduler = scheduler;
	      this._state = state;
	      this._period = period;
	      this._action = action;
	    }
	
	    SchedulePeriodicRecursive.prototype.start = function () {
	      var d = new SingleAssignmentDisposable();
	      this._cancel = d;
	      d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));
	
	      return d;
	    };
	
	    return SchedulePeriodicRecursive;
	  }());
	
	  /** Gets a scheduler that schedules work immediately on the current thread. */
	  var immediateScheduler = Scheduler.immediate = (function () {
	    function scheduleNow(state, action) { return action(this, state); }
	    return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
	  }());
	
	  /**
	   * Gets a scheduler that schedules work as soon as possible on the current thread.
	   */
	  var currentThreadScheduler = Scheduler.currentThread = (function () {
	    var queue;
	
	    function runTrampoline () {
	      while (queue.length > 0) {
	        var item = queue.dequeue();
	        !item.isCancelled() && item.invoke();
	      }
	    }
	
	    function scheduleNow(state, action) {
	      var si = new ScheduledItem(this, state, action, this.now());
	
	      if (!queue) {
	        queue = new PriorityQueue(4);
	        queue.enqueue(si);
	
	        var result = tryCatch(runTrampoline)();
	        queue = null;
	        if (result === errorObj) { return thrower(result.e); }
	      } else {
	        queue.enqueue(si);
	      }
	      return si.disposable;
	    }
	
	    var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
	    currentScheduler.scheduleRequired = function () { return !queue; };
	
	    return currentScheduler;
	  }());
	
	  var scheduleMethod, clearMethod;
	
	  var localTimer = (function () {
	    var localSetTimeout, localClearTimeout = noop;
	    if (!!root.setTimeout) {
	      localSetTimeout = root.setTimeout;
	      localClearTimeout = root.clearTimeout;
	    } else if (!!root.WScript) {
	      localSetTimeout = function (fn, time) {
	        root.WScript.Sleep(time);
	        fn();
	      };
	    } else {
	      throw new NotSupportedError();
	    }
	
	    return {
	      setTimeout: localSetTimeout,
	      clearTimeout: localClearTimeout
	    };
	  }());
	  var localSetTimeout = localTimer.setTimeout,
	    localClearTimeout = localTimer.clearTimeout;
	
	  (function () {
	
	    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;
	
	    clearMethod = function (handle) {
	      delete tasksByHandle[handle];
	    };
	
	    function runTask(handle) {
	      if (currentlyRunning) {
	        localSetTimeout(function () { runTask(handle) }, 0);
	      } else {
	        var task = tasksByHandle[handle];
	        if (task) {
	          currentlyRunning = true;
	          var result = tryCatch(task)();
	          clearMethod(handle);
	          currentlyRunning = false;
	          if (result === errorObj) { return thrower(result.e); }
	        }
	      }
	    }
	
	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );
	
	    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
	      !reNative.test(setImmediate) && setImmediate;
	
	    function postMessageSupported () {
	      // Ensure not in a worker
	      if (!root.postMessage || root.importScripts) { return false; }
	      var isAsync = false, oldHandler = root.onmessage;
	      // Test for async
	      root.onmessage = function () { isAsync = true; };
	      root.postMessage('', '*');
	      root.onmessage = oldHandler;
	
	      return isAsync;
	    }
	
	    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
	    if (isFunction(setImmediate)) {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        setImmediate(function () { runTask(id); });
	
	        return id;
	      };
	    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        process.nextTick(function () { runTask(id); });
	
	        return id;
	      };
	    } else if (postMessageSupported()) {
	      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();
	
	      function onGlobalPostMessage(event) {
	        // Only if we're a match to avoid any other global events
	        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
	          runTask(event.data.substring(MSG_PREFIX.length));
	        }
	      }
	
	      if (root.addEventListener) {
	        root.addEventListener('message', onGlobalPostMessage, false);
	      } else if (root.attachEvent) {
	        root.attachEvent('onmessage', onGlobalPostMessage);
	      } else {
	        root.onmessage = onGlobalPostMessage;
	      }
	
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        root.postMessage(MSG_PREFIX + currentId, '*');
	        return id;
	      };
	    } else if (!!root.MessageChannel) {
	      var channel = new root.MessageChannel();
	
	      channel.port1.onmessage = function (e) { runTask(e.data); };
	
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        channel.port2.postMessage(id);
	        return id;
	      };
	    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {
	
	      scheduleMethod = function (action) {
	        var scriptElement = root.document.createElement('script');
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	
	        scriptElement.onreadystatechange = function () {
	          runTask(id);
	          scriptElement.onreadystatechange = null;
	          scriptElement.parentNode.removeChild(scriptElement);
	          scriptElement = null;
	        };
	        root.document.documentElement.appendChild(scriptElement);
	        return id;
	      };
	
	    } else {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        localSetTimeout(function () {
	          runTask(id);
	        }, 0);
	
	        return id;
	      };
	    }
	  }());
	
	  /**
	   * Gets a scheduler that schedules work via a timed callback based upon platform.
	   */
	  var timeoutScheduler = Scheduler.timeout = Scheduler['default'] = (function () {
	
	    function scheduleNow(state, action) {
	      var scheduler = this, disposable = new SingleAssignmentDisposable();
	      var id = scheduleMethod(function () {
	        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
	      });
	      return new CompositeDisposable(disposable, disposableCreate(function () {
	        clearMethod(id);
	      }));
	    }
	
	    function scheduleRelative(state, dueTime, action) {
	      var scheduler = this, dt = Scheduler.normalize(dueTime), disposable = new SingleAssignmentDisposable();
	      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
	      var id = localSetTimeout(function () {
	        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
	      }, dt);
	      return new CompositeDisposable(disposable, disposableCreate(function () {
	        localClearTimeout(id);
	      }));
	    }
	
	    function scheduleAbsolute(state, dueTime, action) {
	      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
	    }
	
	    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
	  })();
	
	  var CatchScheduler = (function (__super__) {
	
	    function scheduleNow(state, action) {
	      return this._scheduler.scheduleWithState(state, this._wrap(action));
	    }
	
	    function scheduleRelative(state, dueTime, action) {
	      return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
	    }
	
	    function scheduleAbsolute(state, dueTime, action) {
	      return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
	    }
	
	    inherits(CatchScheduler, __super__);
	
	    function CatchScheduler(scheduler, handler) {
	      this._scheduler = scheduler;
	      this._handler = handler;
	      this._recursiveOriginal = null;
	      this._recursiveWrapper = null;
	      __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
	    }
	
	    CatchScheduler.prototype._clone = function (scheduler) {
	        return new CatchScheduler(scheduler, this._handler);
	    };
	
	    CatchScheduler.prototype._wrap = function (action) {
	      var parent = this;
	      return function (self, state) {
	        try {
	          return action(parent._getRecursiveWrapper(self), state);
	        } catch (e) {
	          if (!parent._handler(e)) { throw e; }
	          return disposableEmpty;
	        }
	      };
	    };
	
	    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
	      if (this._recursiveOriginal !== scheduler) {
	        this._recursiveOriginal = scheduler;
	        var wrapper = this._clone(scheduler);
	        wrapper._recursiveOriginal = scheduler;
	        wrapper._recursiveWrapper = wrapper;
	        this._recursiveWrapper = wrapper;
	      }
	      return this._recursiveWrapper;
	    };
	
	    CatchScheduler.prototype.schedulePeriodicWithState = function (state, period, action) {
	      var self = this, failed = false, d = new SingleAssignmentDisposable();
	
	      d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function (state1) {
	        if (failed) { return null; }
	        try {
	          return action(state1);
	        } catch (e) {
	          failed = true;
	          if (!self._handler(e)) { throw e; }
	          d.dispose();
	          return null;
	        }
	      }));
	
	      return d;
	    };
	
	    return CatchScheduler;
	  }(Scheduler));
	
	  /**
	   *  Represents a notification to an observer.
	   */
	  var Notification = Rx.Notification = (function () {
	    function Notification(kind, value, exception, accept, acceptObservable, toString) {
	      this.kind = kind;
	      this.value = value;
	      this.exception = exception;
	      this._accept = accept;
	      this._acceptObservable = acceptObservable;
	      this.toString = toString;
	    }
	
	    /**
	     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
	     *
	     * @memberOf Notification
	     * @param {Any} observerOrOnNext Delegate to invoke for an OnNext notification or Observer to invoke the notification on..
	     * @param {Function} onError Delegate to invoke for an OnError notification.
	     * @param {Function} onCompleted Delegate to invoke for an OnCompleted notification.
	     * @returns {Any} Result produced by the observation.
	     */
	    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
	      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
	        this._acceptObservable(observerOrOnNext) :
	        this._accept(observerOrOnNext, onError, onCompleted);
	    };
	
	    /**
	     * Returns an observable sequence with a single notification.
	     *
	     * @memberOf Notifications
	     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
	     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
	     */
	    Notification.prototype.toObservable = function (scheduler) {
	      var self = this;
	      isScheduler(scheduler) || (scheduler = immediateScheduler);
	      return new AnonymousObservable(function (observer) {
	        return scheduler.scheduleWithState(self, function (_, notification) {
	          notification._acceptObservable(observer);
	          notification.kind === 'N' && observer.onCompleted();
	        });
	      });
	    };
	
	    return Notification;
	  })();
	
	  /**
	   * Creates an object that represents an OnNext notification to an observer.
	   * @param {Any} value The value contained in the notification.
	   * @returns {Notification} The OnNext notification containing the value.
	   */
	  var notificationCreateOnNext = Notification.createOnNext = (function () {
	      function _accept(onNext) { return onNext(this.value); }
	      function _acceptObservable(observer) { return observer.onNext(this.value); }
	      function toString() { return 'OnNext(' + this.value + ')'; }
	
	      return function (value) {
	        return new Notification('N', value, null, _accept, _acceptObservable, toString);
	      };
	  }());
	
	  /**
	   * Creates an object that represents an OnError notification to an observer.
	   * @param {Any} error The exception contained in the notification.
	   * @returns {Notification} The OnError notification containing the exception.
	   */
	  var notificationCreateOnError = Notification.createOnError = (function () {
	    function _accept (onNext, onError) { return onError(this.exception); }
	    function _acceptObservable(observer) { return observer.onError(this.exception); }
	    function toString () { return 'OnError(' + this.exception + ')'; }
	
	    return function (e) {
	      return new Notification('E', null, e, _accept, _acceptObservable, toString);
	    };
	  }());
	
	  /**
	   * Creates an object that represents an OnCompleted notification to an observer.
	   * @returns {Notification} The OnCompleted notification.
	   */
	  var notificationCreateOnCompleted = Notification.createOnCompleted = (function () {
	    function _accept (onNext, onError, onCompleted) { return onCompleted(); }
	    function _acceptObservable(observer) { return observer.onCompleted(); }
	    function toString () { return 'OnCompleted()'; }
	
	    return function () {
	      return new Notification('C', null, null, _accept, _acceptObservable, toString);
	    };
	  }());
	
	  /**
	   * Supports push-style iteration over an observable sequence.
	   */
	  var Observer = Rx.Observer = function () { };
	
	  /**
	   *  Creates a notification callback from an observer.
	   * @returns The action that forwards its input notification to the underlying observer.
	   */
	  Observer.prototype.toNotifier = function () {
	    var observer = this;
	    return function (n) { return n.accept(observer); };
	  };
	
	  /**
	   *  Hides the identity of an observer.
	   * @returns An observer that hides the identity of the specified observer.
	   */
	  Observer.prototype.asObserver = function () {
	    return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
	  };
	
	  /**
	   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
	   *  If a violation is detected, an Error is thrown from the offending observer method call.
	   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
	   */
	  Observer.prototype.checked = function () { return new CheckedObserver(this); };
	
	  /**
	   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
	   * @param {Function} [onNext] Observer's OnNext action implementation.
	   * @param {Function} [onError] Observer's OnError action implementation.
	   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
	   * @returns {Observer} The observer object implemented using the given actions.
	   */
	  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
	    onNext || (onNext = noop);
	    onError || (onError = defaultError);
	    onCompleted || (onCompleted = noop);
	    return new AnonymousObserver(onNext, onError, onCompleted);
	  };
	
	  /**
	   *  Creates an observer from a notification callback.
	   *
	   * @static
	   * @memberOf Observer
	   * @param {Function} handler Action that handles a notification.
	   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
	   */
	  Observer.fromNotifier = function (handler, thisArg) {
	    return new AnonymousObserver(function (x) {
	      return handler.call(thisArg, notificationCreateOnNext(x));
	    }, function (e) {
	      return handler.call(thisArg, notificationCreateOnError(e));
	    }, function () {
	      return handler.call(thisArg, notificationCreateOnCompleted());
	    });
	  };
	
	  /**
	   * Schedules the invocation of observer methods on the given scheduler.
	   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
	   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
	   */
	  Observer.prototype.notifyOn = function (scheduler) {
	    return new ObserveOnObserver(scheduler, this);
	  };
	
	  Observer.prototype.makeSafe = function(disposable) {
	    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
	  };
	
	  /**
	   * Abstract base class for implementations of the Observer class.
	   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
	   */
	  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
	    inherits(AbstractObserver, __super__);
	
	    /**
	     * Creates a new observer in a non-stopped state.
	     */
	    function AbstractObserver() {
	      this.isStopped = false;
	      __super__.call(this);
	    }
	
	    // Must be implemented by other observers
	    AbstractObserver.prototype.next = notImplemented;
	    AbstractObserver.prototype.error = notImplemented;
	    AbstractObserver.prototype.completed = notImplemented;
	
	    /**
	     * Notifies the observer of a new element in the sequence.
	     * @param {Any} value Next element in the sequence.
	     */
	    AbstractObserver.prototype.onNext = function (value) {
	      if (!this.isStopped) { this.next(value); }
	    };
	
	    /**
	     * Notifies the observer that an exception has occurred.
	     * @param {Any} error The error that has occurred.
	     */
	    AbstractObserver.prototype.onError = function (error) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(error);
	      }
	    };
	
	    /**
	     * Notifies the observer of the end of the sequence.
	     */
	    AbstractObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.completed();
	      }
	    };
	
	    /**
	     * Disposes the observer, causing it to transition to the stopped state.
	     */
	    AbstractObserver.prototype.dispose = function () {
	      this.isStopped = true;
	    };
	
	    AbstractObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    return AbstractObserver;
	  }(Observer));
	
	  /**
	   * Class to create an Observer instance from delegate-based implementations of the on* methods.
	   */
	  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
	    inherits(AnonymousObserver, __super__);
	
	    /**
	     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
	     * @param {Any} onNext Observer's OnNext action implementation.
	     * @param {Any} onError Observer's OnError action implementation.
	     * @param {Any} onCompleted Observer's OnCompleted action implementation.
	     */
	    function AnonymousObserver(onNext, onError, onCompleted) {
	      __super__.call(this);
	      this._onNext = onNext;
	      this._onError = onError;
	      this._onCompleted = onCompleted;
	    }
	
	    /**
	     * Calls the onNext action.
	     * @param {Any} value Next element in the sequence.
	     */
	    AnonymousObserver.prototype.next = function (value) {
	      this._onNext(value);
	    };
	
	    /**
	     * Calls the onError action.
	     * @param {Any} error The error that has occurred.
	     */
	    AnonymousObserver.prototype.error = function (error) {
	      this._onError(error);
	    };
	
	    /**
	     *  Calls the onCompleted action.
	     */
	    AnonymousObserver.prototype.completed = function () {
	      this._onCompleted();
	    };
	
	    return AnonymousObserver;
	  }(AbstractObserver));
	
	  var CheckedObserver = (function (__super__) {
	    inherits(CheckedObserver, __super__);
	
	    function CheckedObserver(observer) {
	      __super__.call(this);
	      this._observer = observer;
	      this._state = 0; // 0 - idle, 1 - busy, 2 - done
	    }
	
	    var CheckedObserverPrototype = CheckedObserver.prototype;
	
	    CheckedObserverPrototype.onNext = function (value) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onNext).call(this._observer, value);
	      this._state = 0;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.onError = function (err) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onError).call(this._observer, err);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.onCompleted = function () {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onCompleted).call(this._observer);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.checkAccess = function () {
	      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
	      if (this._state === 2) { throw new Error('Observer completed'); }
	      if (this._state === 0) { this._state = 1; }
	    };
	
	    return CheckedObserver;
	  }(Observer));
	
	  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
	    inherits(ScheduledObserver, __super__);
	
	    function ScheduledObserver(scheduler, observer) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.observer = observer;
	      this.isAcquired = false;
	      this.hasFaulted = false;
	      this.queue = [];
	      this.disposable = new SerialDisposable();
	    }
	
	    ScheduledObserver.prototype.next = function (value) {
	      var self = this;
	      this.queue.push(function () { self.observer.onNext(value); });
	    };
	
	    ScheduledObserver.prototype.error = function (e) {
	      var self = this;
	      this.queue.push(function () { self.observer.onError(e); });
	    };
	
	    ScheduledObserver.prototype.completed = function () {
	      var self = this;
	      this.queue.push(function () { self.observer.onCompleted(); });
	    };
	
	    ScheduledObserver.prototype.ensureActive = function () {
	      var isOwner = false, parent = this;
	      if (!this.hasFaulted && this.queue.length > 0) {
	        isOwner = !this.isAcquired;
	        this.isAcquired = true;
	      }
	      if (isOwner) {
	        this.disposable.setDisposable(this.scheduler.scheduleRecursive(function (self) {
	          var work;
	          if (parent.queue.length > 0) {
	            work = parent.queue.shift();
	          } else {
	            parent.isAcquired = false;
	            return;
	          }
	          try {
	            work();
	          } catch (ex) {
	            parent.queue = [];
	            parent.hasFaulted = true;
	            throw ex;
	          }
	          self();
	        }));
	      }
	    };
	
	    ScheduledObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.disposable.dispose();
	    };
	
	    return ScheduledObserver;
	  }(AbstractObserver));
	
	  var ObserveOnObserver = (function (__super__) {
	    inherits(ObserveOnObserver, __super__);
	
	    function ObserveOnObserver(scheduler, observer, cancel) {
	      __super__.call(this, scheduler, observer);
	      this._cancel = cancel;
	    }
	
	    ObserveOnObserver.prototype.next = function (value) {
	      __super__.prototype.next.call(this, value);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.error = function (e) {
	      __super__.prototype.error.call(this, e);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.completed = function () {
	      __super__.prototype.completed.call(this);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this._cancel && this._cancel.dispose();
	      this._cancel = null;
	    };
	
	    return ObserveOnObserver;
	  })(ScheduledObserver);
	
	  var observableProto;
	
	  /**
	   * Represents a push-style collection.
	   */
	  var Observable = Rx.Observable = (function () {
	
	    function Observable(subscribe) {
	      if (Rx.config.longStackSupport && hasStacks) {
	        try {
	          throw new Error();
	        } catch (e) {
	          this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }
	
	        var self = this;
	        this._subscribe = function (observer) {
	          var oldOnError = observer.onError.bind(observer);
	
	          observer.onError = function (err) {
	            makeStackTraceLong(err, self);
	            oldOnError(err);
	          };
	
	          return subscribe.call(self, observer);
	        };
	      } else {
	        this._subscribe = subscribe;
	      }
	    }
	
	    observableProto = Observable.prototype;
	
	    /**
	     *  Subscribes an observer to the observable sequence.
	     *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
	     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
	     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
	     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribe = observableProto.forEach = function (observerOrOnNext, onError, onCompleted) {
	      return this._subscribe(typeof observerOrOnNext === 'object' ?
	        observerOrOnNext :
	        observerCreate(observerOrOnNext, onError, onCompleted));
	    };
	
	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onNext The function to invoke on each element in the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnNext = function (onNext, thisArg) {
	      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
	    };
	
	    /**
	     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
	     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnError = function (onError, thisArg) {
	      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
	    };
	
	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
	      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
	    };
	
	    return Observable;
	  })();
	
	  var ObservableBase = Rx.ObservableBase = (function (__super__) {
	    inherits(ObservableBase, __super__);
	
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }
	
	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.subscribeCore).call(self, ado);
	
	      if (sub === errorObj) {
	        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
	      }
	      ado.setDisposable(fixSubscriber(sub));
	    }
	
	    function subscribe(observer) {
	      var ado = new AutoDetachObserver(observer), state = [ado, this];
	
	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.scheduleWithState(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    }
	
	    function ObservableBase() {
	      __super__.call(this, subscribe);
	    }
	
	    ObservableBase.prototype.subscribeCore = notImplemented;
	
	    return ObservableBase;
	  }(Observable));
	
	  var Enumerable = Rx.internals.Enumerable = function () { };
	
	  var ConcatEnumerableObservable = (function(__super__) {
	    inherits(ConcatEnumerableObservable, __super__);
	    function ConcatEnumerableObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	    
	    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(this.sources[$iterator$](), function (e, self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }
	
	        if (currentItem.done) {
	          return o.onCompleted();
	        }
	
	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(new InnerObserver(o, self, e)));
	      });
	
	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
	    function InnerObserver(o, s, e) {
	      this.o = o;
	      this.s = s;
	      this.e = e;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.o.onNext(x); } };
	    InnerObserver.prototype.onError = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.s(this.e);
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	        return true;
	      }
	      return false;
	    };
	    
	    return ConcatEnumerableObservable;
	  }(ObservableBase));
	
	  Enumerable.prototype.concat = function () {
	    return new ConcatEnumerableObservable(this);
	  };
	  
	  var CatchErrorObservable = (function(__super__) {
	    inherits(CatchErrorObservable, __super__);
	    function CatchErrorObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	    
	    CatchErrorObservable.prototype.subscribeCore = function (o) {
	      var e = this.sources[$iterator$]();
	
	      var isDisposed, subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }
	
	        if (currentItem.done) {
	          return lastException !== null ? o.onError(lastException) : o.onCompleted();
	        }
	
	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          self,
	          function() { o.onCompleted(); }));
	      });
	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
	    return CatchErrorObservable;
	  }(ObservableBase));
	
	  Enumerable.prototype.catchError = function () {
	    return new CatchErrorObservable(this);
	  };
	
	  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var exceptions = new Subject(),
	        notifier = new Subject(),
	        handled = notificationHandler(exceptions),
	        notificationDisposable = handled.subscribe(notifier);
	
	      var e = sources[$iterator$]();
	
	      var isDisposed,
	        lastException,
	        subscription = new SerialDisposable();
	      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
	        if (isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }
	
	        if (currentItem.done) {
	          if (lastException) {
	            o.onError(lastException);
	          } else {
	            o.onCompleted();
	          }
	          return;
	        }
	
	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	        var outer = new SingleAssignmentDisposable();
	        var inner = new SingleAssignmentDisposable();
	        subscription.setDisposable(new CompositeDisposable(inner, outer));
	        outer.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          function (exn) {
	            inner.setDisposable(notifier.subscribe(self, function(ex) {
	              o.onError(ex);
	            }, function() {
	              o.onCompleted();
	            }));
	
	            exceptions.onNext(exn);
	          },
	          function() { o.onCompleted(); }));
	      });
	
	      return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    });
	  };
	  
	  var RepeatEnumerable = (function (__super__) {
	    inherits(RepeatEnumerable, __super__);
	    
	    function RepeatEnumerable(v, c) {
	      this.v = v;
	      this.c = c == null ? -1 : c;
	    }
	    RepeatEnumerable.prototype[$iterator$] = function () {
	      return new RepeatEnumerator(this); 
	    };
	    
	    function RepeatEnumerator(p) {
	      this.v = p.v;
	      this.l = p.c;
	    }
	    RepeatEnumerator.prototype.next = function () {
	      if (this.l === 0) { return doneEnumerator; }
	      if (this.l > 0) { this.l--; }
	      return { done: false, value: this.v }; 
	    };
	    
	    return RepeatEnumerable;
	  }(Enumerable));
	
	  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
	    return new RepeatEnumerable(value, repeatCount);
	  };
	  
	  var OfEnumerable = (function(__super__) {
	    inherits(OfEnumerable, __super__);
	    function OfEnumerable(s, fn, thisArg) {
	      this.s = s;
	      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
	    }
	    OfEnumerable.prototype[$iterator$] = function () {
	      return new OfEnumerator(this);
	    };
	    
	    function OfEnumerator(p) {
	      this.i = -1;
	      this.s = p.s;
	      this.l = this.s.length;
	      this.fn = p.fn;
	    }
	    OfEnumerator.prototype.next = function () {
	     return ++this.i < this.l ?
	       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
	       doneEnumerator; 
	    };
	    
	    return OfEnumerable;
	  }(Enumerable));
	
	  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
	    return new OfEnumerable(source, selector, thisArg);
	  };
	
	   /**
	   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
	   *
	   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
	   *  that require to be run on a scheduler, use subscribeOn.
	   *
	   *  @param {Scheduler} scheduler Scheduler to notify observers on.
	   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
	   */
	  observableProto.observeOn = function (scheduler) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      return source.subscribe(new ObserveOnObserver(scheduler, observer));
	    }, source);
	  };
	
	   /**
	   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
	   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.
	
	   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
	   *  callbacks on a scheduler, use observeOn.
	
	   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
	   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
	   */
	  observableProto.subscribeOn = function (scheduler) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
	      d.setDisposable(m);
	      m.setDisposable(scheduler.schedule(function () {
	        d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
	      }));
	      return d;
	    }, source);
	  };
	
		var FromPromiseObservable = (function(__super__) {
			inherits(FromPromiseObservable, __super__);
			function FromPromiseObservable(p) {
				this.p = p;
				__super__.call(this);
			}
			
			FromPromiseObservable.prototype.subscribeCore = function(o) {
				this.p.then(function (data) {
					o.onNext(data);
					o.onCompleted();
				}, function (err) { o.onError(err); });
				return disposableEmpty;	
			};
			
			return FromPromiseObservable;
		}(ObservableBase));	 
		 
		 /**
		 * Converts a Promise to an Observable sequence
		 * @param {Promise} An ES6 Compliant promise.
		 * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
		 */
		var observableFromPromise = Observable.fromPromise = function (promise) {
			return new FromPromiseObservable(promise);
		};
	  /*
	   * Converts an existing observable sequence to an ES6 Compatible Promise
	   * @example
	   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
	   *
	   * // With config
	   * Rx.config.Promise = RSVP.Promise;
	   * var promise = Rx.Observable.return(42).toPromise();
	   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
	   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
	   */
	  observableProto.toPromise = function (promiseCtor) {
	    promiseCtor || (promiseCtor = Rx.config.Promise);
	    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
	    var source = this;
	    return new promiseCtor(function (resolve, reject) {
	      // No cancellation can be done
	      var value, hasValue = false;
	      source.subscribe(function (v) {
	        value = v;
	        hasValue = true;
	      }, reject, function () {
	        hasValue && resolve(value);
	      });
	    });
	  };
	
	  var ToArrayObservable = (function(__super__) {
	    inherits(ToArrayObservable, __super__);
	    function ToArrayObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    ToArrayObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };
	
	    function InnerObserver(o) {
	      this.o = o;
	      this.a = [];
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
	    InnerObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onNext(this.a);
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	 
	      return false;
	    };
	
	    return ToArrayObservable;
	  }(ObservableBase));
	
	  /**
	  * Creates an array from an observable sequence.
	  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
	  */
	  observableProto.toArray = function () {
	    return new ToArrayObservable(this);
	  };
	
	  /**
	   *  Creates an observable sequence from a specified subscribe method implementation.
	   * @example
	   *  var res = Rx.Observable.create(function (observer) { return function () { } );
	   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
	   *  var res = Rx.Observable.create(function (observer) { } );
	   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
	   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
	   */
	  Observable.create = Observable.createWithDisposable = function (subscribe, parent) {
	    return new AnonymousObservable(subscribe, parent);
	  };
	
	  /**
	   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
	   *
	   * @example
	   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
	   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
	   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
	   */
	  var observableDefer = Observable.defer = function (observableFactory) {
	    return new AnonymousObservable(function (observer) {
	      var result;
	      try {
	        result = observableFactory();
	      } catch (e) {
	        return observableThrow(e).subscribe(observer);
	      }
	      isPromise(result) && (result = observableFromPromise(result));
	      return result.subscribe(observer);
	    });
	  };
	
	  var EmptyObservable = (function(__super__) {
	    inherits(EmptyObservable, __super__);
	    function EmptyObservable(scheduler) {
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    EmptyObservable.prototype.subscribeCore = function (observer) {
	      var sink = new EmptySink(observer, this);
	      return sink.run();
	    };
	
	    function EmptySink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }
	
	    function scheduleItem(s, state) {
	      state.onCompleted();
	    }
	
	    EmptySink.prototype.run = function () {
	      return this.parent.scheduler.scheduleWithState(this.observer, scheduleItem);
	    };
	
	    return EmptyObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
	   *
	   * @example
	   *  var res = Rx.Observable.empty();
	   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
	   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
	   * @returns {Observable} An observable sequence with no elements.
	   */
	  var observableEmpty = Observable.empty = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new EmptyObservable(scheduler);
	  };
	
	  var FromObservable = (function(__super__) {
	    inherits(FromObservable, __super__);
	    function FromObservable(iterable, mapper, scheduler) {
	      this.iterable = iterable;
	      this.mapper = mapper;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    FromObservable.prototype.subscribeCore = function (observer) {
	      var sink = new FromSink(observer, this);
	      return sink.run();
	    };
	
	    return FromObservable;
	  }(ObservableBase));
	
	  var FromSink = (function () {
	    function FromSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }
	
	    FromSink.prototype.run = function () {
	      var list = Object(this.parent.iterable),
	          it = getIterable(list),
	          observer = this.observer,
	          mapper = this.parent.mapper;
	
	      function loopRecursive(i, recurse) {
	        try {
	          var next = it.next();
	        } catch (e) {
	          return observer.onError(e);
	        }
	        if (next.done) {
	          return observer.onCompleted();
	        }
	
	        var result = next.value;
	
	        if (mapper) {
	          try {
	            result = mapper(result, i);
	          } catch (e) {
	            return observer.onError(e);
	          }
	        }
	
	        observer.onNext(result);
	        recurse(i + 1);
	      }
	
	      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	    };
	
	    return FromSink;
	  }());
	
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	
	  function StringIterable(str) {
	    this._s = s;
	  }
	
	  StringIterable.prototype[$iterator$] = function () {
	    return new StringIterator(this._s);
	  };
	
	  function StringIterator(str) {
	    this._s = s;
	    this._l = s.length;
	    this._i = 0;
	  }
	
	  StringIterator.prototype[$iterator$] = function () {
	    return this;
	  };
	
	  StringIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
	  };
	
	  function ArrayIterable(a) {
	    this._a = a;
	  }
	
	  ArrayIterable.prototype[$iterator$] = function () {
	    return new ArrayIterator(this._a);
	  };
	
	  function ArrayIterator(a) {
	    this._a = a;
	    this._l = toLength(a);
	    this._i = 0;
	  }
	
	  ArrayIterator.prototype[$iterator$] = function () {
	    return this;
	  };
	
	  ArrayIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
	  };
	
	  function numberIsFinite(value) {
	    return typeof value === 'number' && root.isFinite(value);
	  }
	
	  function isNan(n) {
	    return n !== n;
	  }
	
	  function getIterable(o) {
	    var i = o[$iterator$], it;
	    if (!i && typeof o === 'string') {
	      it = new StringIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i && o.length !== undefined) {
	      it = new ArrayIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i) { throw new TypeError('Object is not iterable'); }
	    return o[$iterator$]();
	  }
	
	  function sign(value) {
	    var number = +value;
	    if (number === 0) { return number; }
	    if (isNaN(number)) { return number; }
	    return number < 0 ? -1 : 1;
	  }
	
	  function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) { return 0; }
	    if (len === 0 || !numberIsFinite(len)) { return len; }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) { return 0; }
	    if (len > maxSafeInteger) { return maxSafeInteger; }
	    return len;
	  }
	
	  /**
	  * This method creates a new Observable sequence from an array-like or iterable object.
	  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
	  * @param {Function} [mapFn] Map function to call on every element of the array.
	  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
	  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
	  */
	  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
	    if (iterable == null) {
	      throw new Error('iterable cannot be null.')
	    }
	    if (mapFn && !isFunction(mapFn)) {
	      throw new Error('mapFn when provided must be a function');
	    }
	    if (mapFn) {
	      var mapper = bindCallback(mapFn, thisArg, 2);
	    }
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromObservable(iterable, mapper, scheduler);
	  }
	
	  var FromArrayObservable = (function(__super__) {
	    inherits(FromArrayObservable, __super__);
	    function FromArrayObservable(args, scheduler) {
	      this.args = args;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    FromArrayObservable.prototype.subscribeCore = function (observer) {
	      var sink = new FromArraySink(observer, this);
	      return sink.run();
	    };
	
	    return FromArrayObservable;
	  }(ObservableBase));
	
	  function FromArraySink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }
	
	  FromArraySink.prototype.run = function () {
	    var observer = this.observer, args = this.parent.args, len = args.length;
	    function loopRecursive(i, recurse) {
	      if (i < len) {
	        observer.onNext(args[i]);
	        recurse(i + 1);
	      } else {
	        observer.onCompleted();
	      }
	    }
	
	    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	  };
	
	  /**
	  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
	  * @deprecated use Observable.from or Observable.of
	  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
	  */
	  var observableFromArray = Observable.fromArray = function (array, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler)
	  };
	
	  /**
	   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
	   *
	   * @example
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new AnonymousObservable(function (o) {
	      var first = true;
	      return scheduler.scheduleRecursiveWithState(initialState, function (state, self) {
	        var hasResult, result;
	        try {
	          if (first) {
	            first = false;
	          } else {
	            state = iterate(state);
	          }
	          hasResult = condition(state);
	          hasResult && (result = resultSelector(state));
	        } catch (e) {
	          return o.onError(e);
	        }
	        if (hasResult) {
	          o.onNext(result);
	          self(state);
	        } else {
	          o.onCompleted();
	        }
	      });
	    });
	  };
	
	  function observableOf (scheduler, array) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler);
	  }
	
	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.of = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return new FromArrayObservable(args, currentThreadScheduler);
	  };
	
	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.ofWithScheduler = function (scheduler) {
	    var len = arguments.length, args = new Array(len - 1);
	    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
	    return new FromArrayObservable(args, scheduler);
	  };
	
	  /**
	   * Creates an Observable sequence from changes to an array using Array.observe.
	   * @param {Array} array An array to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an array from Array.observe.
	   */
	  Observable.ofArrayChanges = function(array) {
	    if (!Array.isArray(array)) { throw new TypeError('Array.observe only accepts arrays.'); }
	    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }
	      
	      Array.observe(array, observerFn);
	
	      return function () {
	        Array.unobserve(array, observerFn);
	      };
	    });
	  };
	
	  /**
	   * Creates an Observable sequence from changes to an object using Object.observe.
	   * @param {Object} obj An object to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an object from Object.observe.
	   */
	  Observable.ofObjectChanges = function(obj) {
	    if (obj == null) { throw new TypeError('object must not be null or undefined.'); }
	    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') { throw new TypeError('Object.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }
	
	      Object.observe(obj, observerFn);
	
	      return function () {
	        Object.unobserve(obj, observerFn);
	      };
	    });
	  };
	
	  var NeverObservable = (function(__super__) {
	    inherits(NeverObservable, __super__);
	    function NeverObservable() {
	      __super__.call(this);
	    }
	
	    NeverObservable.prototype.subscribeCore = function (observer) {
	      return disposableEmpty;
	    };
	
	    return NeverObservable;
	  }(ObservableBase));
	
	  /**
	   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
	   * @returns {Observable} An observable sequence whose observers will never get called.
	   */
	  var observableNever = Observable.never = function () {
	    return new NeverObservable();
	  };
	
	  var PairsObservable = (function(__super__) {
	    inherits(PairsObservable, __super__);
	    function PairsObservable(obj, scheduler) {
	      this.obj = obj;
	      this.keys = Object.keys(obj);
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    PairsObservable.prototype.subscribeCore = function (observer) {
	      var sink = new PairsSink(observer, this);
	      return sink.run();
	    };
	
	    return PairsObservable;
	  }(ObservableBase));
	
	  function PairsSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }
	
	  PairsSink.prototype.run = function () {
	    var observer = this.observer, obj = this.parent.obj, keys = this.parent.keys, len = keys.length;
	    function loopRecursive(i, recurse) {
	      if (i < len) {
	        var key = keys[i];
	        observer.onNext([key, obj[key]]);
	        recurse(i + 1);
	      } else {
	        observer.onCompleted();
	      }
	    }
	
	    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	  };
	
	  /**
	   * Convert an object into an observable sequence of [key, value] pairs.
	   * @param {Object} obj The object to inspect.
	   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
	   */
	  Observable.pairs = function (obj, scheduler) {
	    scheduler || (scheduler = currentThreadScheduler);
	    return new PairsObservable(obj, scheduler);
	  };
	
	    var RangeObservable = (function(__super__) {
	    inherits(RangeObservable, __super__);
	    function RangeObservable(start, count, scheduler) {
	      this.start = start;
	      this.rangeCount = count;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    RangeObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RangeSink(observer, this);
	      return sink.run();
	    };
	
	    return RangeObservable;
	  }(ObservableBase));
	
	  var RangeSink = (function () {
	    function RangeSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }
	
	    RangeSink.prototype.run = function () {
	      var start = this.parent.start, count = this.parent.rangeCount, observer = this.observer;
	      function loopRecursive(i, recurse) {
	        if (i < count) {
	          observer.onNext(start + i);
	          recurse(i + 1);
	        } else {
	          observer.onCompleted();
	        }
	      }
	
	      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
	    };
	
	    return RangeSink;
	  }());
	
	  /**
	  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
	  * @param {Number} start The value of the first integer in the sequence.
	  * @param {Number} count The number of sequential integers to generate.
	  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
	  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
	  */
	  Observable.range = function (start, count, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RangeObservable(start, count, scheduler);
	  };
	
	  var RepeatObservable = (function(__super__) {
	    inherits(RepeatObservable, __super__);
	    function RepeatObservable(value, repeatCount, scheduler) {
	      this.value = value;
	      this.repeatCount = repeatCount == null ? -1 : repeatCount;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    RepeatObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RepeatSink(observer, this);
	      return sink.run();
	    };
	
	    return RepeatObservable;
	  }(ObservableBase));
	
	  function RepeatSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }
	
	  RepeatSink.prototype.run = function () {
	    var observer = this.observer, value = this.parent.value;
	    function loopRecursive(i, recurse) {
	      if (i === -1 || i > 0) {
	        observer.onNext(value);
	        i > 0 && i--;
	      }
	      if (i === 0) { return observer.onCompleted(); }
	      recurse(i);
	    }
	
	    return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, loopRecursive);
	  };
	
	  /**
	   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
	   * @param {Mixed} value Element to repeat.
	   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
	   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
	   */
	  Observable.repeat = function (value, repeatCount, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RepeatObservable(value, repeatCount, scheduler);
	  };
	
	  var JustObservable = (function(__super__) {
	    inherits(JustObservable, __super__);
	    function JustObservable(value, scheduler) {
	      this.value = value;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    JustObservable.prototype.subscribeCore = function (observer) {
	      var sink = new JustSink(observer, this);
	      return sink.run();
	    };
	
	    function JustSink(observer, parent) {
	      this.observer = observer;
	      this.parent = parent;
	    }
	
	    function scheduleItem(s, state) {
	      var value = state[0], observer = state[1];
	      observer.onNext(value);
	      observer.onCompleted();
	    }
	
	    JustSink.prototype.run = function () {
	      return this.parent.scheduler.scheduleWithState([this.parent.value, this.observer], scheduleItem);
	    };
	
	    return JustObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
	   *  There is an alias called 'just' or browsers <IE9.
	   * @param {Mixed} value Single element in the resulting observable sequence.
	   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence containing the single specified element.
	   */
	  var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function (value, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new JustObservable(value, scheduler);
	  };
	
	  var ThrowObservable = (function(__super__) {
	    inherits(ThrowObservable, __super__);
	    function ThrowObservable(error, scheduler) {
	      this.error = error;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    ThrowObservable.prototype.subscribeCore = function (o) {
	      var sink = new ThrowSink(o, this);
	      return sink.run();
	    };
	
	    function ThrowSink(o, p) {
	      this.o = o;
	      this.p = p;
	    }
	
	    function scheduleItem(s, state) {
	      var e = state[0], o = state[1];
	      o.onError(e);
	    }
	
	    ThrowSink.prototype.run = function () {
	      return this.p.scheduler.scheduleWithState([this.p.error, this.o], scheduleItem);
	    };
	
	    return ThrowObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
	   *  There is an alias to this method called 'throwError' for browsers <IE9.
	   * @param {Mixed} error An object used for the sequence's termination.
	   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
	   */
	  var observableThrow = Observable['throw'] = Observable.throwError = Observable.throwException = function (error, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new ThrowObservable(error, scheduler);
	  };
	
	  /**
	   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
	   * @param {Function} resourceFactory Factory function to obtain a resource object.
	   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
	   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
	   */
	  Observable.using = function (resourceFactory, observableFactory) {
	    return new AnonymousObservable(function (observer) {
	      var disposable = disposableEmpty, resource, source;
	      try {
	        resource = resourceFactory();
	        resource && (disposable = resource);
	        source = observableFactory(resource);
	      } catch (exception) {
	        return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
	      }
	      return new CompositeDisposable(source.subscribe(observer), disposable);
	    });
	  };
	
	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @param {Observable} rightSource Second observable sequence or Promise.
	   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
	   */
	  observableProto.amb = function (rightSource) {
	    var leftSource = this;
	    return new AnonymousObservable(function (observer) {
	      var choice,
	        leftChoice = 'L', rightChoice = 'R',
	        leftSubscription = new SingleAssignmentDisposable(),
	        rightSubscription = new SingleAssignmentDisposable();
	
	      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));
	
	      function choiceL() {
	        if (!choice) {
	          choice = leftChoice;
	          rightSubscription.dispose();
	        }
	      }
	
	      function choiceR() {
	        if (!choice) {
	          choice = rightChoice;
	          leftSubscription.dispose();
	        }
	      }
	
	      leftSubscription.setDisposable(leftSource.subscribe(function (left) {
	        choiceL();
	        choice === leftChoice && observer.onNext(left);
	      }, function (err) {
	        choiceL();
	        choice === leftChoice && observer.onError(err);
	      }, function () {
	        choiceL();
	        choice === leftChoice && observer.onCompleted();
	      }));
	
	      rightSubscription.setDisposable(rightSource.subscribe(function (right) {
	        choiceR();
	        choice === rightChoice && observer.onNext(right);
	      }, function (err) {
	        choiceR();
	        choice === rightChoice && observer.onError(err);
	      }, function () {
	        choiceR();
	        choice === rightChoice && observer.onCompleted();
	      }));
	
	      return new CompositeDisposable(leftSubscription, rightSubscription);
	    });
	  };
	
	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   *
	   * @example
	   * var = Rx.Observable.amb(xs, ys, zs);
	   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
	   */
	  Observable.amb = function () {
	    var acc = observableNever(), items = [];
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
	    }
	
	    function func(previous, current) {
	      return previous.amb(current);
	    }
	    for (var i = 0, len = items.length; i < len; i++) {
	      acc = func(acc, items[i]);
	    }
	    return acc;
	  };
	
	  function observableCatchHandler(source, handler) {
	    return new AnonymousObservable(function (o) {
	      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
	      subscription.setDisposable(d1);
	      d1.setDisposable(source.subscribe(function (x) { o.onNext(x); }, function (e) {
	        try {
	          var result = handler(e);
	        } catch (ex) {
	          return o.onError(ex);
	        }
	        isPromise(result) && (result = observableFromPromise(result));
	
	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(result.subscribe(o));
	      }, function (x) { o.onCompleted(x); }));
	
	      return subscription;
	    }, source);
	  }
	
	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @example
	   * 1 - xs.catchException(ys)
	   * 2 - xs.catchException(function (ex) { return ys(ex); })
	   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
	   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
	   */
	  observableProto['catch'] = observableProto.catchError = observableProto.catchException = function (handlerOrSecond) {
	    return typeof handlerOrSecond === 'function' ?
	      observableCatchHandler(this, handlerOrSecond) :
	      observableCatch([this, handlerOrSecond]);
	  };
	
	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
	   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
	   */
	  var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function () {
	    var items = [];
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
	    }
	    return enumerableOf(items).catchError();
	  };
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   * This can be in the form of an argument list of observables or an array.
	   *
	   * @example
	   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return combineLatest.apply(this, args);
	  };
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   *
	   * @example
	   * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  var combineLatest = Observable.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = args.pop();
	    Array.isArray(args[0]) && (args = args[0]);
	
	    return new AnonymousObservable(function (o) {
	      var n = args.length,
	        falseFactory = function () { return false; },
	        hasValue = arrayInitialize(n, falseFactory),
	        hasValueAll = false,
	        isDone = arrayInitialize(n, falseFactory),
	        values = new Array(n);
	
	      function next(i) {
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          try {
	            var res = resultSelector.apply(null, values);
	          } catch (e) {
	            return o.onError(e);
	          }
	          o.onNext(res);
	        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	          o.onCompleted();
	        }
	      }
	
	      function done (i) {
	        isDone[i] = true;
	        isDone.every(identity) && o.onCompleted();
	      }
	
	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var source = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(source) && (source = observableFromPromise(source));
	          sad.setDisposable(source.subscribe(function (x) {
	              values[i] = x;
	              next(i);
	            },
	            function(e) { o.onError(e); },
	            function () { done(i); }
	          ));
	          subscriptions[i] = sad;
	        }(idx));
	      }
	
	      return new CompositeDisposable(subscriptions);
	    }, this);
	  };
	
	  /**
	   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  observableProto.concat = function () {
	    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    args.unshift(this);
	    return observableConcat.apply(null, args);
	  };
	
		var ConcatObservable = (function(__super__) {
			inherits(ConcatObservable, __super__);
			function ConcatObservable(sources) {
				this.sources = sources;
				__super__.call(this);
			}
			
			ConcatObservable.prototype.subscribeCore = function(o) {
	      var sink = new ConcatSink(this.sources, o);
	      return sink.run();
			};
	    
	    function ConcatSink(sources, o) {
	      this.sources = sources;
	      this.o = o;
	    }
	    ConcatSink.prototype.run = function () {
	      var isDisposed, subscription = new SerialDisposable(), sources = this.sources, length = sources.length, o = this.o;
	      var cancelable = immediateScheduler.scheduleRecursiveWithState(0, function (i, self) {
	        if (isDisposed) { return; }
	        if (i === length) {
						return o.onCompleted();
					}
		
	        // Check if promise
	        var currentValue = sources[i];
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	        var d = new SingleAssignmentDisposable();
	        subscription.setDisposable(d);
	        d.setDisposable(currentValue.subscribe(
	          function (x) { o.onNext(x); },
	          function (e) { o.onError(e); },
	          function () { self(i + 1); }
	        ));
	      });
	
	      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
	        isDisposed = true;
	      }));
	    };
	    
			
			return ConcatObservable;
		}(ObservableBase));
	  
	  /**
	   * Concatenates all the observable sequences.
	   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  var observableConcat = Observable.concat = function () {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      args = new Array(arguments.length);
	      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
	    }
	    return new ConcatObservable(args);
	  };
	
	  /**
	   * Concatenates an observable sequence of observable sequences.
	   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
	   */
	  observableProto.concatAll = observableProto.concatObservable = function () {
	    return this.merge(1);
	  };
	
	  var MergeObservable = (function (__super__) {
	    inherits(MergeObservable, __super__);
	
	    function MergeObservable(source, maxConcurrent) {
	      this.source = source;
	      this.maxConcurrent = maxConcurrent;
	      __super__.call(this);
	    }
	
	    MergeObservable.prototype.subscribeCore = function(observer) {
	      var g = new CompositeDisposable();
	      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
	      return g;
	    };
	
	    return MergeObservable;
	
	  }(ObservableBase));
	
	  var MergeObserver = (function () {
	    function MergeObserver(o, max, g) {
	      this.o = o;
	      this.max = max;
	      this.g = g;
	      this.done = false;
	      this.q = [];
	      this.activeCount = 0;
	      this.isStopped = false;
	    }
	    MergeObserver.prototype.handleSubscribe = function (xs) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(xs) && (xs = observableFromPromise(xs));
	      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
	    };
	    MergeObserver.prototype.onNext = function (innerSource) {
	      if (this.isStopped) { return; }
	        if(this.activeCount < this.max) {
	          this.activeCount++;
	          this.handleSubscribe(innerSource);
	        } else {
	          this.q.push(innerSource);
	        }
	      };
	      MergeObserver.prototype.onError = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.o.onError(e);
	        }
	      };
	      MergeObserver.prototype.onCompleted = function () {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.done = true;
	          this.activeCount === 0 && this.o.onCompleted();
	        }
	      };
	      MergeObserver.prototype.dispose = function() { this.isStopped = true; };
	      MergeObserver.prototype.fail = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.o.onError(e);
	          return true;
	        }
	
	        return false;
	      };
	
	      function InnerObserver(parent, sad) {
	        this.parent = parent;
	        this.sad = sad;
	        this.isStopped = false;
	      }
	      InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.parent.o.onNext(x); } };
	      InnerObserver.prototype.onError = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.parent.o.onError(e);
	        }
	      };
	      InnerObserver.prototype.onCompleted = function () {
	        if(!this.isStopped) {
	          this.isStopped = true;
	          var parent = this.parent;
	          parent.g.remove(this.sad);
	          if (parent.q.length > 0) {
	            parent.handleSubscribe(parent.q.shift());
	          } else {
	            parent.activeCount--;
	            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
	          }
	        }
	      };
	      InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	      InnerObserver.prototype.fail = function (e) {
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.parent.o.onError(e);
	          return true;
	        }
	
	        return false;
	      };
	
	      return MergeObserver;
	  }());
	
	
	
	
	
	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
	  * Or merges two observable sequences into a single observable sequence.
	  *
	  * @example
	  * 1 - merged = sources.merge(1);
	  * 2 - merged = source.merge(otherSource);
	  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.merge = function (maxConcurrentOrOther) {
	    return typeof maxConcurrentOrOther !== 'number' ?
	      observableMerge(this, maxConcurrentOrOther) :
	      new MergeObservable(this, maxConcurrentOrOther);
	  };
	
	  /**
	   * Merges all the observable sequences into a single observable sequence.
	   * The scheduler is optional and if not specified, the immediate scheduler is used.
	   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
	   */
	  var observableMerge = Observable.merge = function () {
	    var scheduler, sources = [], i, len = arguments.length;
	    if (!arguments[0]) {
	      scheduler = immediateScheduler;
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else if (isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else {
	      scheduler = immediateScheduler;
	      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
	    }
	    if (Array.isArray(sources[0])) {
	      sources = sources[0];
	    }
	    return observableOf(scheduler, sources).mergeAll();
	  };
	
	  var MergeAllObservable = (function (__super__) {
	    inherits(MergeAllObservable, __super__);
	
	    function MergeAllObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    MergeAllObservable.prototype.subscribeCore = function (observer) {
	      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
	      g.add(m);
	      m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
	      return g;
	    };
	    
	    function MergeAllObserver(o, g) {
	      this.o = o;
	      this.g = g;
	      this.isStopped = false;
	      this.done = false;
	    }
	    MergeAllObserver.prototype.onNext = function(innerSource) {
	      if(this.isStopped) { return; }
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	
	      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
	    };
	    MergeAllObserver.prototype.onError = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    MergeAllObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.done = true;
	        this.g.length === 1 && this.o.onCompleted();
	      }
	    };
	    MergeAllObserver.prototype.dispose = function() { this.isStopped = true; };
	    MergeAllObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    function InnerObserver(parent, g, sad) {
	      this.parent = parent;
	      this.g = g;
	      this.sad = sad;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) { if (!this.isStopped) { this.parent.o.onNext(x); } };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        var parent = this.parent;
	        this.isStopped = true;
	        parent.g.remove(this.sad);
	        parent.done && parent.g.length === 1 && parent.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    return MergeAllObservable;
	  }(ObservableBase));
	
	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.mergeAll = observableProto.mergeObservable = function () {
	    return new MergeAllObservable(this);
	  };
	
	  var CompositeError = Rx.CompositeError = function(errors) {
	    this.name = "NotImplementedError";
	    this.innerErrors = errors;
	    this.message = 'This contains multiple errors. Check the innerErrors';
	    Error.call(this);
	  }
	  CompositeError.prototype = Error.prototype;
	
	  /**
	  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
	  * receive all successfully emitted items from all of the source Observables without being interrupted by
	  * an error notification from one of them.
	  *
	  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
	  * error via the Observer's onError, mergeDelayError will refrain from propagating that
	  * error notification until all of the merged Observables have finished emitting items.
	  * @param {Array | Arguments} args Arguments or an array to merge.
	  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
	  */
	  Observable.mergeDelayError = function() {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      var len = arguments.length;
	      args = new Array(len);
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    var source = observableOf(null, args);
	
	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable(),
	        m = new SingleAssignmentDisposable(),
	        isStopped = false,
	        errors = [];
	
	      function setCompletion() {
	        if (errors.length === 0) {
	          o.onCompleted();
	        } else if (errors.length === 1) {
	          o.onError(errors[0]);
	        } else {
	          o.onError(new CompositeError(errors));
	        }
	      }
	
	      group.add(m);
	
	      m.setDisposable(source.subscribe(
	        function (innerSource) {
	          var innerSubscription = new SingleAssignmentDisposable();
	          group.add(innerSubscription);
	
	          // Check for promises support
	          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	
	          innerSubscription.setDisposable(innerSource.subscribe(
	            function (x) { o.onNext(x); },
	            function (e) {
	              errors.push(e);
	              group.remove(innerSubscription);
	              isStopped && group.length === 1 && setCompletion();
	            },
	            function () {
	              group.remove(innerSubscription);
	              isStopped && group.length === 1 && setCompletion();
	          }));
	        },
	        function (e) {
	          errors.push(e);
	          isStopped = true;
	          group.length === 1 && setCompletion();
	        },
	        function () {
	          isStopped = true;
	          group.length === 1 && setCompletion();
	        }));
	      return group;
	    });
	  };
	
	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
	   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
	   */
	  observableProto.onErrorResumeNext = function (second) {
	    if (!second) { throw new Error('Second observable is required'); }
	    return onErrorResumeNext([this, second]);
	  };
	
	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   *
	   * @example
	   * 1 - res = Rx.Observable.onErrorResumeNext(xs, ys, zs);
	   * 1 - res = Rx.Observable.onErrorResumeNext([xs, ys, zs]);
	   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
	   */
	  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
	    var sources = [];
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    }
	    return new AnonymousObservable(function (observer) {
	      var pos = 0, subscription = new SerialDisposable(),
	      cancelable = immediateScheduler.scheduleRecursive(function (self) {
	        var current, d;
	        if (pos < sources.length) {
	          current = sources[pos++];
	          isPromise(current) && (current = observableFromPromise(current));
	          d = new SingleAssignmentDisposable();
	          subscription.setDisposable(d);
	          d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
	        } else {
	          observer.onCompleted();
	        }
	      });
	      return new CompositeDisposable(subscription, cancelable);
	    });
	  };
	
	  /**
	   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
	   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
	   */
	  observableProto.skipUntil = function (other) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var isOpen = false;
	      var disposables = new CompositeDisposable(source.subscribe(function (left) {
	        isOpen && o.onNext(left);
	      }, function (e) { o.onError(e); }, function () {
	        isOpen && o.onCompleted();
	      }));
	
	      isPromise(other) && (other = observableFromPromise(other));
	
	      var rightSubscription = new SingleAssignmentDisposable();
	      disposables.add(rightSubscription);
	      rightSubscription.setDisposable(other.subscribe(function () {
	        isOpen = true;
	        rightSubscription.dispose();
	      }, function (e) { o.onError(e); }, function () {
	        rightSubscription.dispose();
	      }));
	
	      return disposables;
	    }, source);
	  };
	
	  var SwitchObservable = (function(__super__) {
	    inherits(SwitchObservable, __super__);
	    function SwitchObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    SwitchObservable.prototype.subscribeCore = function (o) {
	      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
	      return new CompositeDisposable(s, inner);
	    };
	
	    function SwitchObserver(o, inner) {
	      this.o = o;
	      this.inner = inner;
	      this.stopped = false;
	      this.latest = 0;
	      this.hasLatest = false;
	      this.isStopped = false;
	    }
	    SwitchObserver.prototype.onNext = function (innerSource) {
	      if (this.isStopped) { return; }
	      var d = new SingleAssignmentDisposable(), id = ++this.latest;
	      this.hasLatest = true;
	      this.inner.setDisposable(d);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
	    };
	    SwitchObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	      }
	    };
	    SwitchObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.stopped = true;
	        !this.hasLatest && this.o.onCompleted();
	      }
	    };
	    SwitchObserver.prototype.dispose = function () { this.isStopped = true; };
	    SwitchObserver.prototype.fail = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    function InnerObserver(parent, id) {
	      this.parent = parent;
	      this.id = id;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      this.parent.latest === this.id && this.parent.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.parent.latest === this.id && this.parent.o.onError(e);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        if (this.parent.latest === this.id) {
	          this.parent.hasLatest = false;
	          this.parent.isStopped && this.parent.o.onCompleted();
	        }
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; }
	    InnerObserver.prototype.fail = function (e) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.parent.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    return SwitchObservable;
	  }(ObservableBase));
	
	  /**
	  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	  */
	  observableProto['switch'] = observableProto.switchLatest = function () {
	    return new SwitchObservable(this);
	  };
	
	  var TakeUntilObservable = (function(__super__) {
	    inherits(TakeUntilObservable, __super__);
	
	    function TakeUntilObservable(source, other) {
	      this.source = source;
	      this.other = isPromise(other) ? observableFromPromise(other) : other;
	      __super__.call(this);
	    }
	
	    TakeUntilObservable.prototype.subscribeCore = function(o) {
	      return new CompositeDisposable(
	        this.source.subscribe(o),
	        this.other.subscribe(new InnerObserver(o))
	      );
	    };
	
	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      this.o.onCompleted();
	    };
	    InnerObserver.prototype.onError = function (err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      !this.isStopped && (this.isStopped = true);
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    return TakeUntilObservable;
	  }(ObservableBase));
	
	  /**
	   * Returns the values from the source observable sequence until the other observable sequence produces a value.
	   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
	   */
	  observableProto.takeUntil = function (other) {
	    return new TakeUntilObservable(this, other);
	  };
	
	  function falseFactory() { return false; }
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.withLatestFrom = function () {
	    var len = arguments.length, args = new Array(len)
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = args.pop(), source = this;
	    Array.isArray(args[0]) && (args = args[0]);
	
	    return new AnonymousObservable(function (observer) {
	      var n = args.length,
	        hasValue = arrayInitialize(n, falseFactory),
	        hasValueAll = false,
	        values = new Array(n);
	
	      var subscriptions = new Array(n + 1);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var other = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(other) && (other = observableFromPromise(other));
	          sad.setDisposable(other.subscribe(function (x) {
	            values[i] = x;
	            hasValue[i] = true;
	            hasValueAll = hasValue.every(identity);
	          }, function (e) { observer.onError(e); }, noop));
	          subscriptions[i] = sad;
	        }(idx));
	      }
	
	      var sad = new SingleAssignmentDisposable();
	      sad.setDisposable(source.subscribe(function (x) {
	        var allValues = [x].concat(values);
	        if (!hasValueAll) { return; }
	        var res = tryCatch(resultSelector).apply(null, allValues);
	        if (res === errorObj) { return observer.onError(res.e); }
	        observer.onNext(res);
	      }, function (e) { observer.onError(e); }, function () {
	        observer.onCompleted();
	      }));
	      subscriptions[n] = sad;
	
	      return new CompositeDisposable(subscriptions);
	    }, this);
	  };
	
	  function zipArray(second, resultSelector) {
	    var first = this;
	    return new AnonymousObservable(function (o) {
	      var index = 0, len = second.length;
	      return first.subscribe(function (left) {
	        if (index < len) {
	          var right = second[index++], res = tryCatch(resultSelector)(left, right);
	          if (res === errorObj) { return o.onError(res.e); }
	          o.onNext(res);
	        } else {
	          o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, first);
	  }
	
	  function falseFactory() { return false; }
	  function emptyArrayFactory() { return []; }
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	   */
	  observableProto.zip = function () {
	    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	
	    var parent = this, resultSelector = args.pop();
	    args.unshift(parent);
	    return new AnonymousObservable(function (o) {
	      var n = args.length,
	        queues = arrayInitialize(n, emptyArrayFactory),
	        isDone = arrayInitialize(n, falseFactory);
	
	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          var source = args[i], sad = new SingleAssignmentDisposable();
	          isPromise(source) && (source = observableFromPromise(source));
	          sad.setDisposable(source.subscribe(function (x) {
	            queues[i].push(x);
	            if (queues.every(function (x) { return x.length > 0; })) {
	              var queuedValues = queues.map(function (x) { return x.shift(); }),
	                  res = tryCatch(resultSelector).apply(parent, queuedValues);
	              if (res === errorObj) { return o.onError(res.e); }
	              o.onNext(res);
	            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	              o.onCompleted();
	            }
	          }, function (e) { o.onError(e); }, function () {
	            isDone[i] = true;
	            isDone.every(identity) && o.onCompleted();
	          }));
	          subscriptions[i] = sad;
	        })(idx);
	      }
	
	      return new CompositeDisposable(subscriptions);
	    }, parent);
	  };
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
	   * @param arguments Observable sources.
	   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  Observable.zip = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var first = args.shift();
	    return first.zip.apply(first, args);
	  };
	
	  function falseFactory() { return false; }
	  function arrayFactory() { return []; }
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by emitting a list with the elements of the observable sequences at corresponding indexes.
	   * @param arguments Observable sources.
	   * @returns {Observable} An observable sequence containing lists of elements at corresponding indexes.
	   */
	  Observable.zipArray = function () {
	    var sources;
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      var len = arguments.length;
	      sources = new Array(len);
	      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var n = sources.length,
	        queues = arrayInitialize(n, arrayFactory),
	        isDone = arrayInitialize(n, falseFactory);
	
	      var subscriptions = new Array(n);
	      for (var idx = 0; idx < n; idx++) {
	        (function (i) {
	          subscriptions[i] = new SingleAssignmentDisposable();
	          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
	            queues[i].push(x);
	            if (queues.every(function (x) { return x.length > 0; })) {
	              var res = queues.map(function (x) { return x.shift(); });
	              o.onNext(res);
	            } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
	              return o.onCompleted();
	            }
	          }, function (e) { o.onError(e); }, function () {
	            isDone[i] = true;
	            isDone.every(identity) && o.onCompleted();
	          }));
	        })(idx);
	      }
	
	      return new CompositeDisposable(subscriptions);
	    });
	  };
	
	  /**
	   *  Hides the identity of an observable sequence.
	   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
	   */
	  observableProto.asObservable = function () {
	    var source = this;
	    return new AnonymousObservable(function (o) { return source.subscribe(o); }, source);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
	   *
	   * @example
	   *  var res = xs.bufferWithCount(10);
	   *  var res = xs.bufferWithCount(10, 1);
	   * @param {Number} count Length of each buffer.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithCount = function (count, skip) {
	    if (typeof skip !== 'number') {
	      skip = count;
	    }
	    return this.windowWithCount(count, skip).selectMany(function (x) {
	      return x.toArray();
	    }).where(function (x) {
	      return x.length > 0;
	    });
	  };
	
	  /**
	   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
	   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
	   */
	  observableProto.dematerialize = function () {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(function (x) { return x.accept(o); }, function(e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };
	
	  /**
	   *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
	   *
	   *  var obs = observable.distinctUntilChanged();
	   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; });
	   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
	   *
	   * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
	   * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
	   * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinctUntilChanged = function (keySelector, comparer) {
	    var source = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var hasCurrentKey = false, currentKey;
	      return source.subscribe(function (value) {
	        var key = value;
	        if (keySelector) {
	          key = tryCatch(keySelector)(value);
	          if (key === errorObj) { return o.onError(key.e); }
	        }
	        if (hasCurrentKey) {
	          var comparerEquals = tryCatch(comparer)(currentKey, key);
	          if (comparerEquals === errorObj) { return o.onError(comparerEquals.e); }
	        }
	        if (!hasCurrentKey || !comparerEquals) {
	          hasCurrentKey = true;
	          currentKey = key;
	          o.onNext(value);
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };
	
	  var TapObservable = (function(__super__) {
	    inherits(TapObservable,__super__);
	    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
	      this.source = source;
	      this.t = !observerOrOnNext || isFunction(observerOrOnNext) ?
	        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
	        observerOrOnNext;
	      __super__.call(this);
	    }
	
	    TapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this.t));
	    };
	
	    function InnerObserver(o, t) {
	      this.o = o;
	      this.t = t;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var res = tryCatch(this.t.onNext).call(this.t, x);
	      if (res === errorObj) { this.o.onError(res.e); }
	      this.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function(err) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        var res = tryCatch(this.t.onError).call(this.t, err);
	        if (res === errorObj) { return this.o.onError(res.e); }
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function() {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        var res = tryCatch(this.t.onCompleted).call(this.t);
	        if (res === errorObj) { return this.o.onError(res.e); }
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    return TapObservable;
	  }(ObservableBase));
	
	  /**
	  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
	  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
	    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
	  };
	
	  /**
	  *  Invokes an action for each element in the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onNext Action to invoke for each element in the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
	    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
	  };
	
	  /**
	  *  Invokes an action upon exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
	    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
	  };
	
	  /**
	  *  Invokes an action upon graceful termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
	    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
	  };
	
	  /**
	   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
	   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
	   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
	   */
	  observableProto['finally'] = observableProto.ensure = function (action) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var subscription;
	      try {
	        subscription = source.subscribe(observer);
	      } catch (e) {
	        action();
	        throw e;
	      }
	      return disposableCreate(function () {
	        try {
	          subscription.dispose();
	        } catch (e) {
	          throw e;
	        } finally {
	          action();
	        }
	      });
	    }, this);
	  };
	
	  /**
	   * @deprecated use #finally or #ensure instead.
	   */
	  observableProto.finallyAction = function (action) {
	    //deprecate('finallyAction', 'finally or ensure');
	    return this.ensure(action);
	  };
	
	  var IgnoreElementsObservable = (function(__super__) {
	    inherits(IgnoreElementsObservable, __super__);
	
	    function IgnoreElementsObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };
	
	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = noop;
	    InnerObserver.prototype.onError = function (err) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.observer.onError(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    return IgnoreElementsObservable;
	  }(ObservableBase));
	
	  /**
	   *  Ignores all elements in an observable sequence leaving only the termination messages.
	   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
	   */
	  observableProto.ignoreElements = function () {
	    return new IgnoreElementsObservable(this);
	  };
	
	  /**
	   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
	   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
	   */
	  observableProto.materialize = function () {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      return source.subscribe(function (value) {
	        observer.onNext(notificationCreateOnNext(value));
	      }, function (e) {
	        observer.onNext(notificationCreateOnError(e));
	        observer.onCompleted();
	      }, function () {
	        observer.onNext(notificationCreateOnCompleted());
	        observer.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
	   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
	   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
	   */
	  observableProto.repeat = function (repeatCount) {
	    return enumerableRepeat(this, repeatCount).concat();
	  };
	
	  /**
	   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
	   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
	   *
	   * @example
	   *  var res = retried = retry.repeat();
	   *  var res = retried = retry.repeat(2);
	   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retry = function (retryCount) {
	    return enumerableRepeat(this, retryCount).catchError();
	  };
	
	  /**
	   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
	   *  if the notifier completes, the observable sequence completes.
	   *
	   * @example
	   *  var timer = Observable.timer(500);
	   *  var source = observable.retryWhen(timer);
	   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retryWhen = function (notifier) {
	    return enumerableRepeat(this).catchErrorWhen(notifier);
	  };
	  var ScanObservable = (function(__super__) {
	    inherits(ScanObservable, __super__);
	    function ScanObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }
	
	    ScanObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new ScanObserver(observer,this));
	    };
	
	    return ScanObservable;
	  }(ObservableBase));
	
	  function ScanObserver(observer, parent) {
	    this.observer = observer;
	    this.accumulator = parent.accumulator;
	    this.hasSeed = parent.hasSeed;
	    this.seed = parent.seed;
	    this.hasAccumulation = false;
	    this.accumulation = null;
	    this.hasValue = false;
	    this.isStopped = false;
	  }
	  ScanObserver.prototype.onNext = function (x) {
	    if (this.isStopped) { return; }
	    !this.hasValue && (this.hasValue = true);
	    try {
	      if (this.hasAccumulation) {
	        this.accumulation = this.accumulator(this.accumulation, x);
	      } else {
	        this.accumulation = this.hasSeed ? this.accumulator(this.seed, x) : x;
	        this.hasAccumulation = true;
	      }
	    } catch (e) {
	      return this.observer.onError(e);
	    }
	    this.observer.onNext(this.accumulation);
	  };
	  ScanObserver.prototype.onError = function (e) { 
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	    }
	  };
	  ScanObserver.prototype.onCompleted = function () {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      !this.hasValue && this.hasSeed && this.observer.onNext(this.seed);
	      this.observer.onCompleted();
	    }
	  };
	  ScanObserver.prototype.dispose = function() { this.isStopped = true; };
	  ScanObserver.prototype.fail = function (e) {
	    if (!this.isStopped) {
	      this.isStopped = true;
	      this.observer.onError(e);
	      return true;
	    }
	    return false;
	  };
	
	  /**
	  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
	  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
	  * @param {Mixed} [seed] The initial accumulator value.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @returns {Observable} An observable sequence containing the accumulated values.
	  */
	  observableProto.scan = function () {
	    var hasSeed = false, seed, accumulator, source = this;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[0];
	      accumulator = arguments[1];
	    } else {
	      accumulator = arguments[0];
	    }
	    return new ScanObservable(this, accumulator, hasSeed, seed);
	  };
	
	  /**
	   *  Bypasses a specified number of elements at the end of an observable sequence.
	   * @description
	   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
	   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
	   * @param count Number of elements to bypass at the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
	   */
	  observableProto.skipLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && o.onNext(q.shift());
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };
	
	  /**
	   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
	   *  @example
	   *  var res = source.startWith(1, 2, 3);
	   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
	   * @param {Arguments} args The specified values to prepend to the observable sequence
	   * @returns {Observable} The source sequence prepended with the specified values.
	   */
	  observableProto.startWith = function () {
	    var values, scheduler, start = 0;
	    if (!!arguments.length && isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      start = 1;
	    } else {
	      scheduler = immediateScheduler;
	    }
	    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
	  };
	
	  /**
	   *  Returns a specified number of contiguous elements from the end of an observable sequence.
	   * @description
	   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
	   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && q.shift();
	      }, function (e) { o.onError(e); }, function () {
	        while (q.length > 0) { o.onNext(q.shift()); }
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
	   *
	   * @description
	   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
	   *  source sequence, this buffer is produced on the result sequence.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLastBuffer = function (count) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        q.push(x);
	        q.length > count && q.shift();
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(q);
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
	   *
	   *  var res = xs.windowWithCount(10);
	   *  var res = xs.windowWithCount(10, 1);
	   * @param {Number} count Length of each window.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithCount = function (count, skip) {
	    var source = this;
	    +count || (count = 0);
	    Math.abs(count) === Infinity && (count = 0);
	    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
	    skip == null && (skip = count);
	    +skip || (skip = 0);
	    Math.abs(skip) === Infinity && (skip = 0);
	
	    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(),
	        refCountDisposable = new RefCountDisposable(m),
	        n = 0,
	        q = [];
	
	      function createWindow () {
	        var s = new Subject();
	        q.push(s);
	        observer.onNext(addRef(s, refCountDisposable));
	      }
	
	      createWindow();
	
	      m.setDisposable(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	          var c = n - count + 1;
	          c >= 0 && c % skip === 0 && q.shift().onCompleted();
	          ++n % skip === 0 && createWindow();
	        },
	        function (e) {
	          while (q.length > 0) { q.shift().onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          while (q.length > 0) { q.shift().onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	  function concatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).concatAll();
	  }
	
	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
	   * source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.concatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));
	
	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      });
	    }
	    return isFunction(selector) ?
	      concatMap(this, selector, thisArg) :
	      concatMap(this, function () { return selector; });
	  };
	
	  /**
	   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
	    var source = this,
	        onNextFunc = bindCallback(onNext, thisArg, 2),
	        onErrorFunc = bindCallback(onError, thisArg, 1),
	        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNextFunc(x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onErrorFunc(err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompletedFunc();
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, this).concatAll();
	  };
	
	    /**
	     *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
	     *
	     *  var res = obs = xs.defaultIfEmpty();
	     *  2 - obs = xs.defaultIfEmpty(false);
	     *
	     * @memberOf Observable#
	     * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
	     * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
	     */
	    observableProto.defaultIfEmpty = function (defaultValue) {
	      var source = this;
	      defaultValue === undefined && (defaultValue = null);
	      return new AnonymousObservable(function (observer) {
	        var found = false;
	        return source.subscribe(function (x) {
	          found = true;
	          observer.onNext(x);
	        },
	        function (e) { observer.onError(e); }, 
	        function () {
	          !found && observer.onNext(defaultValue);
	          observer.onCompleted();
	        });
	      }, source);
	    };
	
	  // Swap out for Array.findIndex
	  function arrayIndexOfComparer(array, item, comparer) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      if (comparer(array[i], item)) { return i; }
	    }
	    return -1;
	  }
	
	  function HashSet(comparer) {
	    this.comparer = comparer;
	    this.set = [];
	  }
	  HashSet.prototype.push = function(value) {
	    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
	    retValue && this.set.push(value);
	    return retValue;
	  };
	
	  /**
	   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
	   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
	   *
	   * @example
	   *  var res = obs = xs.distinct();
	   *  2 - obs = xs.distinct(function (x) { return x.id; });
	   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
	   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
	   * @param {Function} [comparer]  Used to compare items in the collection.
	   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinct = function (keySelector, comparer) {
	    var source = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var hashSet = new HashSet(comparer);
	      return source.subscribe(function (x) {
	        var key = x;
	
	        if (keySelector) {
	          try {
	            key = keySelector(x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        hashSet.push(key) && o.onNext(x);
	      },
	      function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, this);
	  };
	
	  /**
	   *  Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function.
	   *
	   * @example
	   *  var res = observable.groupBy(function (x) { return x.id; });
	   *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; });
	   *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; }, function (x) { return x.toString(); });
	   * @param {Function} keySelector A function to extract the key for each element.
	   * @param {Function} [elementSelector]  A function to map each source element to an element in an observable group.
	   * @param {Function} [comparer] Used to determine whether the objects are equal.
	   * @returns {Observable} A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	   */
	  observableProto.groupBy = function (keySelector, elementSelector, comparer) {
	    return this.groupByUntil(keySelector, elementSelector, observableNever, comparer);
	  };
	
	    /**
	     *  Groups the elements of an observable sequence according to a specified key selector function.
	     *  A duration selector function is used to control the lifetime of groups. When a group expires, it receives an OnCompleted notification. When a new element with the same
	     *  key value as a reclaimed group occurs, the group will be reborn with a new lifetime request.
	     *
	     * @example
	     *  var res = observable.groupByUntil(function (x) { return x.id; }, null,  function () { return Rx.Observable.never(); });
	     *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); });
	     *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); }, function (x) { return x.toString(); });
	     * @param {Function} keySelector A function to extract the key for each element.
	     * @param {Function} durationSelector A function to signal the expiration of a group.
	     * @param {Function} [comparer] Used to compare objects. When not specified, the default comparer is used.
	     * @returns {Observable}
	     *  A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	     *  If a group's lifetime expires, a new group with the same key value can be created once an element with such a key value is encoutered.
	     *
	     */
	    observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector, comparer) {
	      var source = this;
	      elementSelector || (elementSelector = identity);
	      comparer || (comparer = defaultComparer);
	      return new AnonymousObservable(function (observer) {
	        function handleError(e) { return function (item) { item.onError(e); }; }
	        var map = new Dictionary(0, comparer),
	          groupDisposable = new CompositeDisposable(),
	          refCountDisposable = new RefCountDisposable(groupDisposable);
	
	        groupDisposable.add(source.subscribe(function (x) {
	          var key;
	          try {
	            key = keySelector(x);
	          } catch (e) {
	            map.getValues().forEach(handleError(e));
	            observer.onError(e);
	            return;
	          }
	
	          var fireNewMapEntry = false,
	            writer = map.tryGetValue(key);
	          if (!writer) {
	            writer = new Subject();
	            map.set(key, writer);
	            fireNewMapEntry = true;
	          }
	
	          if (fireNewMapEntry) {
	            var group = new GroupedObservable(key, writer, refCountDisposable),
	              durationGroup = new GroupedObservable(key, writer);
	            try {
	              duration = durationSelector(durationGroup);
	            } catch (e) {
	              map.getValues().forEach(handleError(e));
	              observer.onError(e);
	              return;
	            }
	
	            observer.onNext(group);
	
	            var md = new SingleAssignmentDisposable();
	            groupDisposable.add(md);
	
	            var expire = function () {
	              map.remove(key) && writer.onCompleted();
	              groupDisposable.remove(md);
	            };
	
	            md.setDisposable(duration.take(1).subscribe(
	              noop,
	              function (exn) {
	                map.getValues().forEach(handleError(exn));
	                observer.onError(exn);
	              },
	              expire)
	            );
	          }
	
	          var element;
	          try {
	            element = elementSelector(x);
	          } catch (e) {
	            map.getValues().forEach(handleError(e));
	            observer.onError(e);
	            return;
	          }
	
	          writer.onNext(element);
	      }, function (ex) {
	        map.getValues().forEach(handleError(ex));
	        observer.onError(ex);
	      }, function () {
	        map.getValues().forEach(function (item) { item.onCompleted(); });
	        observer.onCompleted();
	      }));
	
	      return refCountDisposable;
	    }, source);
	  };
	
	  var MapObservable = (function (__super__) {
	    inherits(MapObservable, __super__);
	
	    function MapObservable(source, selector, thisArg) {
	      this.source = source;
	      this.selector = bindCallback(selector, thisArg, 3);
	      __super__.call(this);
	    }
	    
	    function innerMap(selector, self) {
	      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }
	    }
	
	    MapObservable.prototype.internalMap = function (selector, thisArg) {
	      return new MapObservable(this.source, innerMap(selector, this), thisArg);
	    };
	
	    MapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this));
	    };
	    
	    function InnerObserver(o, selector, source) {
	      this.o = o;
	      this.selector = selector;
	      this.source = source;
	      this.i = 0;
	      this.isStopped = false;
	    }
	  
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var result = tryCatch(this.selector)(x, this.i++, this.source);
	      if (result === errorObj) {
	        return this.o.onError(result.e);
	      }
	      this.o.onNext(result);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	  
	      return false;
	    };
	
	    return MapObservable;
	
	  }(ObservableBase));
	
	  /**
	  * Projects each element of an observable sequence into a new form by incorporating the element's index.
	  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
	  */
	  observableProto.map = observableProto.select = function (selector, thisArg) {
	    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
	    return this instanceof MapObservable ?
	      this.internalMap(selectorFn, thisArg) :
	      new MapObservable(this, selectorFn, thisArg);
	  };
	
	  /**
	   * Retrieves the value of a specified nested property from all elements in
	   * the Observable sequence.
	   * @param {Arguments} arguments The nested properties to pluck.
	   * @returns {Observable} Returns a new Observable sequence of property values.
	   */
	  observableProto.pluck = function () {
	    var args = arguments, len = arguments.length;
	    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
	    return this.map(function (x) {
	      var currentProp = x;
	      for (var i = 0; i < len; i++) {
	        var p = currentProp[args[i]];
	        if (typeof p !== 'undefined') {
	          currentProp = p;
	        } else {
	          return undefined;
	        }
	      }
	      return currentProp;
	    });
	  };
	
	  function flatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).mergeAll();
	  }
	
	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.selectMany(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectMany = observableProto.flatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.flatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));
	
	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      }, thisArg);
	    }
	    return isFunction(selector) ?
	      flatMap(this, selector, thisArg) :
	      flatMap(this, function () { return selector; });
	  };
	
	  /**
	   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNext.call(thisArg, x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onError.call(thisArg, err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompleted.call(thisArg);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, source).mergeAll();
	  };
	
	  /**
	   *  Projects each element of an observable sequence into a new sequence of observable sequences by incorporating the element's index and then
	   *  transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	   * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source producing an Observable of Observable sequences
	   *  and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	   */
	  observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function (selector, thisArg) {
	    return this.select(selector, thisArg).switchLatest();
	  };
	
	  var SkipObservable = (function(__super__) {
	    inherits(SkipObservable, __super__);
	    function SkipObservable(source, count) {
	      this.source = source;
	      this.skipCount = count;
	      __super__.call(this);
	    }
	    
	    SkipObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.skipCount));
	    };
	    
	    function InnerObserver(o, c) {
	      this.c = c;
	      this.r = c;
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      if (this.r <= 0) { 
	        this.o.onNext(x);
	      } else {
	        this.r--;
	      }
	    };
	    InnerObserver.prototype.onError = function(e) {
	      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function() {
	      if (!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function(e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	    
	    return SkipObservable;
	  }(ObservableBase));  
	  
	  /**
	   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
	   * @param {Number} count The number of elements to skip before returning the remaining elements.
	   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
	   */
	  observableProto.skip = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipObservable(this, count);
	  };
	  /**
	   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
	   *  The element's index is used in the logic of the predicate function.
	   *
	   *  var res = source.skipWhile(function (value) { return value < 10; });
	   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
	   */
	  observableProto.skipWhile = function (predicate, thisArg) {
	    var source = this,
	        callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0, running = false;
	      return source.subscribe(function (x) {
	        if (!running) {
	          try {
	            running = !callback(x, i++, source);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	        }
	        running && o.onNext(x);
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };
	
	  /**
	   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
	   *
	   *  var res = source.take(5);
	   *  var res = source.take(0, Rx.Scheduler.timeout);
	   * @param {Number} count The number of elements to return.
	   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
	   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
	   */
	  observableProto.take = function (count, scheduler) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    if (count === 0) { return observableEmpty(scheduler); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var remaining = count;
	      return source.subscribe(function (x) {
	        if (remaining-- > 0) {
	          o.onNext(x);
	          remaining <= 0 && o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };
	
	  /**
	   *  Returns elements from an observable sequence as long as a specified condition is true.
	   *  The element's index is used in the logic of the predicate function.
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
	   */
	  observableProto.takeWhile = function (predicate, thisArg) {
	    var source = this,
	        callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0, running = true;
	      return source.subscribe(function (x) {
	        if (running) {
	          try {
	            running = callback(x, i++, source);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	          if (running) {
	            o.onNext(x);
	          } else {
	            o.onCompleted();
	          }
	        }
	      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
	    }, source);
	  };
	
	  var FilterObservable = (function (__super__) {
	    inherits(FilterObservable, __super__);
	
	    function FilterObservable(source, predicate, thisArg) {
	      this.source = source;
	      this.predicate = bindCallback(predicate, thisArg, 3);
	      __super__.call(this);
	    }
	
	    FilterObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
	    };
	    
	    function innerPredicate(predicate, self) {
	      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
	    }
	
	    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
	      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
	    };
	    
	    function InnerObserver(o, predicate, source) {
	      this.o = o;
	      this.predicate = predicate;
	      this.source = source;
	      this.i = 0;
	      this.isStopped = false;
	    }
	  
	    InnerObserver.prototype.onNext = function(x) {
	      if (this.isStopped) { return; }
	      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
	      if (shouldYield === errorObj) {
	        return this.o.onError(shouldYield.e);
	      }
	      shouldYield && this.o.onNext(x);
	    };
	    InnerObserver.prototype.onError = function (e) {
	      if(!this.isStopped) { this.isStopped = true; this.o.onError(e); }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) { this.isStopped = true; this.o.onCompleted(); }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    return FilterObservable;
	
	  }(ObservableBase));
	
	  /**
	  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
	  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
	  */
	  observableProto.filter = observableProto.where = function (predicate, thisArg) {
	    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
	      new FilterObservable(this, predicate, thisArg);
	  };
	
	  function extremaBy(source, keySelector, comparer) {
	    return new AnonymousObservable(function (o) {
	      var hasValue = false, lastKey = null, list = [];
	      return source.subscribe(function (x) {
	        var comparison, key;
	        try {
	          key = keySelector(x);
	        } catch (ex) {
	          o.onError(ex);
	          return;
	        }
	        comparison = 0;
	        if (!hasValue) {
	          hasValue = true;
	          lastKey = key;
	        } else {
	          try {
	            comparison = comparer(key, lastKey);
	          } catch (ex1) {
	            o.onError(ex1);
	            return;
	          }
	        }
	        if (comparison > 0) {
	          lastKey = key;
	          list = [];
	        }
	        if (comparison >= 0) { list.push(x); }
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(list);
	        o.onCompleted();
	      });
	    }, source);
	  }
	
	  function firstOnly(x) {
	    if (x.length === 0) { throw new EmptyError(); }
	    return x[0];
	  }
	
	  /**
	   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	   * For aggregation behavior with incremental intermediate results, see Observable.scan.
	   * @deprecated Use #reduce instead
	   * @param {Mixed} [seed] The initial accumulator value.
	   * @param {Function} accumulator An accumulator function to be invoked on each element.
	   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	   */
	  observableProto.aggregate = function () {
	    var hasSeed = false, accumulator, seed, source = this;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[0];
	      accumulator = arguments[1];
	    } else {
	      accumulator = arguments[0];
	    }
	    return new AnonymousObservable(function (o) {
	      var hasAccumulation, accumulation, hasValue;
	      return source.subscribe (
	        function (x) {
	          !hasValue && (hasValue = true);
	          try {
	            if (hasAccumulation) {
	              accumulation = accumulator(accumulation, x);
	            } else {
	              accumulation = hasSeed ? accumulator(seed, x) : x;
	              hasAccumulation = true;
	            }
	          } catch (e) {
	            return o.onError(e);
	          }
	        },
	        function (e) { o.onError(e); },
	        function () {
	          hasValue && o.onNext(accumulation);
	          !hasValue && hasSeed && o.onNext(seed);
	          !hasValue && !hasSeed && o.onError(new EmptyError());
	          o.onCompleted();
	        }
	      );
	    }, source);
	  };
	
	  var ReduceObservable = (function(__super__) {
	    inherits(ReduceObservable, __super__);
	    function ReduceObservable(source, acc, hasSeed, seed) {
	      this.source = source;
	      this.acc = acc;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }
	
	    ReduceObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new InnerObserver(observer,this));
	    };
	
	    function InnerObserver(o, parent) {
	      this.o = o;
	      this.acc = parent.acc;
	      this.hasSeed = parent.hasSeed;
	      this.seed = parent.seed;
	      this.hasAccumulation = false;
	      this.result = null;
	      this.hasValue = false;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = function (x) {
	      if (this.isStopped) { return; }
	      !this.hasValue && (this.hasValue = true);
	      if (this.hasAccumulation) {
	        this.result = tryCatch(this.acc)(this.result, x);
	      } else {
	        this.result = this.hasSeed ? tryCatch(this.acc)(this.seed, x) : x;
	        this.hasAccumulation = true;
	      }
	      if (this.result === errorObj) { this.o.onError(this.result.e); }
	    };
	    InnerObserver.prototype.onError = function (e) { 
	      if (!this.isStopped) { this.isStopped = true; this.o.onError(e); } 
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.hasValue && this.o.onNext(this.result);
	        !this.hasValue && this.hasSeed && this.o.onNext(this.seed);
	        !this.hasValue && !this.hasSeed && this.o.onError(new EmptyError());
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function () { this.isStopped = true; };
	    InnerObserver.prototype.fail = function(e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(e);
	        return true;
	      }
	      return false;
	    };
	
	    return ReduceObservable;
	  }(ObservableBase));
	
	  /**
	  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	  * For aggregation behavior with incremental intermediate results, see Observable.scan.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @param {Any} [seed] The initial accumulator value.
	  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	  */
	  observableProto.reduce = function (accumulator) {
	    var hasSeed = false;
	    if (arguments.length === 2) {
	      hasSeed = true;
	      var seed = arguments[1];
	    }
	    return new ReduceObservable(this, accumulator, hasSeed, seed);
	  };
	
	  /**
	   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
	   */
	  observableProto.some = function (predicate, thisArg) {
	    var source = this;
	    return predicate ?
	      source.filter(predicate, thisArg).some() :
	      new AnonymousObservable(function (observer) {
	        return source.subscribe(function () {
	          observer.onNext(true);
	          observer.onCompleted();
	        }, function (e) { observer.onError(e); }, function () {
	          observer.onNext(false);
	          observer.onCompleted();
	        });
	      }, source);
	  };
	
	  /** @deprecated use #some instead */
	  observableProto.any = function () {
	    //deprecate('any', 'some');
	    return this.some.apply(this, arguments);
	  };
	
	  /**
	   * Determines whether an observable sequence is empty.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
	   */
	  observableProto.isEmpty = function () {
	    return this.any().map(not);
	  };
	
	  /**
	   * Determines whether all elements of an observable sequence satisfy a condition.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
	   */
	  observableProto.every = function (predicate, thisArg) {
	    return this.filter(function (v) { return !predicate(v); }, thisArg).some().map(not);
	  };
	
	  /** @deprecated use #every instead */
	  observableProto.all = function () {
	    //deprecate('all', 'every');
	    return this.every.apply(this, arguments);
	  };
	
	  /**
	   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
	   * @param searchElement The value to locate in the source sequence.
	   * @param {Number} [fromIndex] An equality comparer to compare elements.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
	   */
	  observableProto.includes = function (searchElement, fromIndex) {
	    var source = this;
	    function comparer(a, b) {
	      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
	    }
	    return new AnonymousObservable(function (o) {
	      var i = 0, n = +fromIndex || 0;
	      Math.abs(n) === Infinity && (n = 0);
	      if (n < 0) {
	        o.onNext(false);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	      return source.subscribe(
	        function (x) {
	          if (i++ >= n && comparer(x, searchElement)) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(false);
	          o.onCompleted();
	        });
	    }, this);
	  };
	
	  /**
	   * @deprecated use #includes instead.
	   */
	  observableProto.contains = function (searchElement, fromIndex) {
	    //deprecate('contains', 'includes');
	    observableProto.includes(searchElement, fromIndex);
	  };
	
	  /**
	   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
	   * @example
	   * res = source.count();
	   * res = source.count(function (x) { return x > 3; });
	   * @param {Function} [predicate]A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
	   */
	  observableProto.count = function (predicate, thisArg) {
	    return predicate ?
	      this.filter(predicate, thisArg).count() :
	      this.reduce(function (count) { return count + 1; }, 0);
	  };
	
	  /**
	   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.indexOf = function(searchElement, fromIndex) {
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var i = 0, n = +fromIndex || 0;
	      Math.abs(n) === Infinity && (n = 0);
	      if (n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	      return source.subscribe(
	        function (x) {
	          if (i >= n && x === searchElement) {
	            o.onNext(i);
	            o.onCompleted();
	          }
	          i++;
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(-1);
	          o.onCompleted();
	        });
	    }, source);
	  };
	
	  /**
	   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
	   */
	  observableProto.sum = function (keySelector, thisArg) {
	    return keySelector && isFunction(keySelector) ?
	      this.map(keySelector, thisArg).sum() :
	      this.reduce(function (prev, curr) { return prev + curr; }, 0);
	  };
	
	  /**
	   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
	   * @example
	   * var res = source.minBy(function (x) { return x.value; });
	   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer] Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
	   */
	  observableProto.minBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return extremaBy(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
	  };
	
	  /**
	   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
	   * @example
	   * var res = source.min();
	   * var res = source.min(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
	   */
	  observableProto.min = function (comparer) {
	    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };
	
	  /**
	   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
	   * @example
	   * var res = source.maxBy(function (x) { return x.value; });
	   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer]  Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
	   */
	  observableProto.maxBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return extremaBy(this, keySelector, comparer);
	  };
	
	  /**
	   * Returns the maximum value in an observable sequence according to the specified comparer.
	   * @example
	   * var res = source.max();
	   * var res = source.max(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
	   */
	  observableProto.max = function (comparer) {
	    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };
	
	  /**
	   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
	   */
	  observableProto.average = function (keySelector, thisArg) {
	    return keySelector && isFunction(keySelector) ?
	      this.map(keySelector, thisArg).average() :
	      this.reduce(function (prev, cur) {
	        return {
	          sum: prev.sum + cur,
	          count: prev.count + 1
	        };
	      }, {sum: 0, count: 0 }).map(function (s) {
	        if (s.count === 0) { throw new EmptyError(); }
	        return s.sum / s.count;
	      });
	  };
	
	  /**
	   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
	   *
	   * @example
	   * var res = res = source.sequenceEqual([1,2,3]);
	   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
	   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
	   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
	   * @param {Observable} second Second observable sequence or array to compare.
	   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
	   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
	   */
	  observableProto.sequenceEqual = function (second, comparer) {
	    var first = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var donel = false, doner = false, ql = [], qr = [];
	      var subscription1 = first.subscribe(function (x) {
	        var equal, v;
	        if (qr.length > 0) {
	          v = qr.shift();
	          try {
	            equal = comparer(v, x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (doner) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          ql.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        donel = true;
	        if (ql.length === 0) {
	          if (qr.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (doner) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	
	      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
	      isPromise(second) && (second = observableFromPromise(second));
	      var subscription2 = second.subscribe(function (x) {
	        var equal;
	        if (ql.length > 0) {
	          var v = ql.shift();
	          try {
	            equal = comparer(v, x);
	          } catch (exception) {
	            o.onError(exception);
	            return;
	          }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (donel) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          qr.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        doner = true;
	        if (qr.length === 0) {
	          if (ql.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (donel) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	      return new CompositeDisposable(subscription1, subscription2);
	    }, first);
	  };
	
	  function elementAtOrDefault(source, index, hasDefault, defaultValue) {
	    if (index < 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (o) {
	      var i = index;
	      return source.subscribe(function (x) {
	        if (i-- === 0) {
	          o.onNext(x);
	          o.onCompleted();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        if (!hasDefault) {
	          o.onError(new ArgumentOutOfRangeError());
	        } else {
	          o.onNext(defaultValue);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }
	
	  /**
	   * Returns the element at a specified index in a sequence.
	   * @example
	   * var res = source.elementAt(5);
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
	   */
	  observableProto.elementAt =  function (index) {
	    return elementAtOrDefault(this, index, false);
	  };
	
	  /**
	   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
	   * @example
	   * var res = source.elementAtOrDefault(5);
	   * var res = source.elementAtOrDefault(5, 0);
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence, or a default value if the index is outside the bounds of the source sequence.
	   */
	  observableProto.elementAtOrDefault = function (index, defaultValue) {
	    return elementAtOrDefault(this, index, true, defaultValue);
	  };
	
	  function singleOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      var value = defaultValue, seenValue = false;
	      return source.subscribe(function (x) {
	        if (seenValue) {
	          o.onError(new Error('Sequence contains more than one element'));
	        } else {
	          value = x;
	          seenValue = true;
	        }
	      }, function (e) { o.onError(e); }, function () {
	        if (!seenValue && !hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(value);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }
	
	  /**
	   * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.single = function (predicate, thisArg) {
	    return predicate && isFunction(predicate) ?
	      this.where(predicate, thisArg).single() :
	      singleOrDefaultAsync(this, false);
	  };
	
	  /**
	   * Returns the only element of an observable sequence that matches the predicate, or a default value if no such element exists; this method reports an exception if there is more than one element in the observable sequence.
	   * @example
	   * var res = res = source.singleOrDefault();
	   * var res = res = source.singleOrDefault(function (x) { return x === 42; });
	   * res = source.singleOrDefault(function (x) { return x === 42; }, 0);
	   * res = source.singleOrDefault(null, 0);
	   * @memberOf Observable#
	   * @param {Function} predicate A predicate function to evaluate for elements in the source sequence.
	   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.singleOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate && isFunction(predicate) ?
	      this.filter(predicate, thisArg).singleOrDefault(null, defaultValue) :
	      singleOrDefaultAsync(this, true, defaultValue);
	  };
	
	  function firstOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(function (x) {
	        o.onNext(x);
	        o.onCompleted();
	      }, function (e) { o.onError(e); }, function () {
	        if (!hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(defaultValue);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }
	
	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
	   * @example
	   * var res = res = source.first();
	   * var res = res = source.first(function (x) { return x > 3; });
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
	   */
	  observableProto.first = function (predicate, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).first() :
	      firstOrDefaultAsync(this, false);
	  };
	
	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.firstOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate ?
	      this.where(predicate).firstOrDefault(null, defaultValue) :
	      firstOrDefaultAsync(this, true, defaultValue);
	  };
	
	  function lastOrDefaultAsync(source, hasDefault, defaultValue) {
	    return new AnonymousObservable(function (o) {
	      var value = defaultValue, seenValue = false;
	      return source.subscribe(function (x) {
	        value = x;
	        seenValue = true;
	      }, function (e) { o.onError(e); }, function () {
	        if (!seenValue && !hasDefault) {
	          o.onError(new EmptyError());
	        } else {
	          o.onNext(value);
	          o.onCompleted();
	        }
	      });
	    }, source);
	  }
	
	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.last = function (predicate, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).last() :
	      lastOrDefaultAsync(this, false);
	  };
	
	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
	   * @param [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
	   */
	  observableProto.lastOrDefault = function (predicate, defaultValue, thisArg) {
	    return predicate ?
	      this.where(predicate, thisArg).lastOrDefault(null, defaultValue) :
	      lastOrDefaultAsync(this, true, defaultValue);
	  };
	
	  function findValue (source, predicate, thisArg, yieldIndex) {
	    var callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      var i = 0;
	      return source.subscribe(function (x) {
	        var shouldRun;
	        try {
	          shouldRun = callback(x, i, source);
	        } catch (e) {
	          o.onError(e);
	          return;
	        }
	        if (shouldRun) {
	          o.onNext(yieldIndex ? i : x);
	          o.onCompleted();
	        } else {
	          i++;
	        }
	      }, function (e) { o.onError(e); }, function () {
	        o.onNext(yieldIndex ? -1 : undefined);
	        o.onCompleted();
	      });
	    }, source);
	  }
	
	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
	   */
	  observableProto.find = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, false);
	  };
	
	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns
	   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
	  */
	  observableProto.findIndex = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, true);
	  };
	
	  /**
	   * Converts the observable sequence to a Set if it exists.
	   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
	   */
	  observableProto.toSet = function () {
	    if (typeof root.Set === 'undefined') { throw new TypeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var s = new root.Set();
	      return source.subscribe(
	        function (x) { s.add(x); },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(s);
	          o.onCompleted();
	        });
	    }, source);
	  };
	
	  /**
	  * Converts the observable sequence to a Map if it exists.
	  * @param {Function} keySelector A function which produces the key for the Map.
	  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
	  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
	  */
	  observableProto.toMap = function (keySelector, elementSelector) {
	    if (typeof root.Map === 'undefined') { throw new TypeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var m = new root.Map();
	      return source.subscribe(
	        function (x) {
	          var key;
	          try {
	            key = keySelector(x);
	          } catch (e) {
	            o.onError(e);
	            return;
	          }
	
	          var element = x;
	          if (elementSelector) {
	            try {
	              element = elementSelector(x);
	            } catch (e) {
	              o.onError(e);
	              return;
	            }
	          }
	
	          m.set(key, element);
	        },
	        function (e) { o.onError(e); },
	        function () {
	          o.onNext(m);
	          o.onCompleted();
	        });
	    }, source);
	  };
	
	  var fnString = 'function',
	      throwString = 'throw',
	      isObject = Rx.internals.isObject;
	
	  function toThunk(obj, ctx) {
	    if (Array.isArray(obj)) {  return objectToThunk.call(ctx, obj); }
	    if (isGeneratorFunction(obj)) { return observableSpawn(obj.call(ctx)); }
	    if (isGenerator(obj)) {  return observableSpawn(obj); }
	    if (isObservable(obj)) { return observableToThunk(obj); }
	    if (isPromise(obj)) { return promiseToThunk(obj); }
	    if (typeof obj === fnString) { return obj; }
	    if (isObject(obj) || Array.isArray(obj)) { return objectToThunk.call(ctx, obj); }
	
	    return obj;
	  }
	
	  function objectToThunk(obj) {
	    var ctx = this;
	
	    return function (done) {
	      var keys = Object.keys(obj),
	          pending = keys.length,
	          results = new obj.constructor(),
	          finished;
	
	      if (!pending) {
	        timeoutScheduler.schedule(function () { done(null, results); });
	        return;
	      }
	
	      for (var i = 0, len = keys.length; i < len; i++) {
	        run(obj[keys[i]], keys[i]);
	      }
	
	      function run(fn, key) {
	        if (finished) { return; }
	        try {
	          fn = toThunk(fn, ctx);
	
	          if (typeof fn !== fnString) {
	            results[key] = fn;
	            return --pending || done(null, results);
	          }
	
	          fn.call(ctx, function(err, res) {
	            if (finished) { return; }
	
	            if (err) {
	              finished = true;
	              return done(err);
	            }
	
	            results[key] = res;
	            --pending || done(null, results);
	          });
	        } catch (e) {
	          finished = true;
	          done(e);
	        }
	      }
	    }
	  }
	
	  function observableToThunk(observable) {
	    return function (fn) {
	      var value, hasValue = false;
	      observable.subscribe(
	        function (v) {
	          value = v;
	          hasValue = true;
	        },
	        fn,
	        function () {
	          hasValue && fn(null, value);
	        });
	    }
	  }
	
	  function promiseToThunk(promise) {
	    return function(fn) {
	      promise.then(function(res) {
	        fn(null, res);
	      }, fn);
	    }
	  }
	
	  function isObservable(obj) {
	    return obj && typeof obj.subscribe === fnString;
	  }
	
	  function isGeneratorFunction(obj) {
	    return obj && obj.constructor && obj.constructor.name === 'GeneratorFunction';
	  }
	
	  function isGenerator(obj) {
	    return obj && typeof obj.next === fnString && typeof obj[throwString] === fnString;
	  }
	
	  /*
	   * Spawns a generator function which allows for Promises, Observable sequences, Arrays, Objects, Generators and functions.
	   * @param {Function} The spawning function.
	   * @returns {Function} a function which has a done continuation.
	   */
	  var observableSpawn = Rx.spawn = function (fn) {
	    var isGenFun = isGeneratorFunction(fn);
	
	    return function (done) {
	      var ctx = this,
	        gen = fn;
	
	      if (isGenFun) {
	        for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	        var len = args.length,
	          hasCallback = len && typeof args[len - 1] === fnString;
	
	        done = hasCallback ? args.pop() : handleError;
	        gen = fn.apply(this, args);
	      } else {
	        done = done || handleError;
	      }
	
	      next();
	
	      function exit(err, res) {
	        timeoutScheduler.schedule(done.bind(ctx, err, res));
	      }
	
	      function next(err, res) {
	        var ret;
	
	        // multiple args
	        if (arguments.length > 2) {
	          for(var res = [], i = 1, len = arguments.length; i < len; i++) { res.push(arguments[i]); }
	        }
	
	        if (err) {
	          try {
	            ret = gen[throwString](err);
	          } catch (e) {
	            return exit(e);
	          }
	        }
	
	        if (!err) {
	          try {
	            ret = gen.next(res);
	          } catch (e) {
	            return exit(e);
	          }
	        }
	
	        if (ret.done)  {
	          return exit(null, ret.value);
	        }
	
	        ret.value = toThunk(ret.value, ctx);
	
	        if (typeof ret.value === fnString) {
	          var called = false;
	          try {
	            ret.value.call(ctx, function() {
	              if (called) {
	                return;
	              }
	
	              called = true;
	              next.apply(ctx, arguments);
	            });
	          } catch (e) {
	            timeoutScheduler.schedule(function () {
	              if (called) {
	                return;
	              }
	
	              called = true;
	              next.call(ctx, e);
	            });
	          }
	          return;
	        }
	
	        // Not supported
	        next(new TypeError('Rx.spawn only supports a function, Promise, Observable, Object or Array.'));
	      }
	    }
	  };
	
	  function handleError(err) {
	    if (!err) { return; }
	    timeoutScheduler.schedule(function() {
	      throw err;
	    });
	  }
	
	  /**
	   * Invokes the specified function asynchronously on the specified scheduler, surfacing the result through an observable sequence.
	   *
	   * @example
	   * var res = Rx.Observable.start(function () { console.log('hello'); });
	   * var res = Rx.Observable.start(function () { console.log('hello'); }, Rx.Scheduler.timeout);
	   * var res = Rx.Observable.start(function () { this.log('hello'); }, Rx.Scheduler.timeout, console);
	   *
	   * @param {Function} func Function to run asynchronously.
	   * @param {Scheduler} [scheduler]  Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param [context]  The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   *
	   * Remarks
	   * * The function is called immediately, not during the subscription of the resulting sequence.
	   * * Multiple subscriptions to the resulting sequence can observe the function's result.
	   */
	  Observable.start = function (func, context, scheduler) {
	    return observableToAsync(func, context, scheduler)();
	  };
	
	  /**
	   * Converts the function into an asynchronous function. Each invocation of the resulting asynchronous function causes an invocation of the original synchronous function on the specified scheduler.
	   * @param {Function} function Function to convert to an asynchronous function.
	   * @param {Scheduler} [scheduler] Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Function} Asynchronous function.
	   */
	  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return function () {
	      var args = arguments,
	        subject = new AsyncSubject();
	
	      scheduler.schedule(function () {
	        var result;
	        try {
	          result = func.apply(context, args);
	        } catch (e) {
	          subject.onError(e);
	          return;
	        }
	        subject.onNext(result);
	        subject.onCompleted();
	      });
	      return subject.asObservable();
	    };
	  };
	
	  /**
	   * Converts a callback function to an observable sequence.
	   *
	   * @param {Function} function Function with a callback as the last parameter to convert to an Observable sequence.
	   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @param {Function} [selector] A selector which takes the arguments from the callback to produce a single item to yield on next.
	   * @returns {Function} A function, when executed with the required parameters minus the callback, produces an Observable sequence with a single value of the arguments to the callback as an array.
	   */
	  Observable.fromCallback = function (func, context, selector) {
	    return function () {
	      var len = arguments.length, args = new Array(len)
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	
	      return new AnonymousObservable(function (observer) {
	        function handler() {
	          var len = arguments.length, results = new Array(len);
	          for(var i = 0; i < len; i++) { results[i] = arguments[i]; }
	
	          if (selector) {
	            try {
	              results = selector.apply(context, results);
	            } catch (e) {
	              return observer.onError(e);
	            }
	
	            observer.onNext(results);
	          } else {
	            if (results.length <= 1) {
	              observer.onNext.apply(observer, results);
	            } else {
	              observer.onNext(results);
	            }
	          }
	
	          observer.onCompleted();
	        }
	
	        args.push(handler);
	        func.apply(context, args);
	      }).publishLast().refCount();
	    };
	  };
	
	  /**
	   * Converts a Node.js callback style function to an observable sequence.  This must be in function (err, ...) format.
	   * @param {Function} func The function to call
	   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @param {Function} [selector] A selector which takes the arguments from the callback minus the error to produce a single item to yield on next.
	   * @returns {Function} An async function which when applied, returns an observable sequence with the callback arguments as an array.
	   */
	  Observable.fromNodeCallback = function (func, context, selector) {
	    return function () {
	      var len = arguments.length, args = new Array(len);
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	
	      return new AnonymousObservable(function (observer) {
	        function handler(err) {
	          if (err) {
	            observer.onError(err);
	            return;
	          }
	
	          var len = arguments.length, results = [];
	          for(var i = 1; i < len; i++) { results[i - 1] = arguments[i]; }
	
	          if (selector) {
	            try {
	              results = selector.apply(context, results);
	            } catch (e) {
	              return observer.onError(e);
	            }
	            observer.onNext(results);
	          } else {
	            if (results.length <= 1) {
	              observer.onNext.apply(observer, results);
	            } else {
	              observer.onNext(results);
	            }
	          }
	
	          observer.onCompleted();
	        }
	
	        args.push(handler);
	        func.apply(context, args);
	      }).publishLast().refCount();
	    };
	  };
	
	  function createListener (element, name, handler) {
	    if (element.addEventListener) {
	      element.addEventListener(name, handler, false);
	      return disposableCreate(function () {
	        element.removeEventListener(name, handler, false);
	      });
	    }
	    throw new Error('No listener found');
	  }
	
	  function createEventListener (el, eventName, handler) {
	    var disposables = new CompositeDisposable();
	
	    // Asume NodeList or HTMLCollection
	    var toStr = Object.prototype.toString;
	    if (toStr.call(el) === '[object NodeList]' || toStr.call(el) === '[object HTMLCollection]') {
	      for (var i = 0, len = el.length; i < len; i++) {
	        disposables.add(createEventListener(el.item(i), eventName, handler));
	      }
	    } else if (el) {
	      disposables.add(createListener(el, eventName, handler));
	    }
	
	    return disposables;
	  }
	
	  /**
	   * Configuration option to determine whether to use native events only
	   */
	  Rx.config.useNativeEvents = false;
	
	  /**
	   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
	   *
	   * @example
	   *   var source = Rx.Observable.fromEvent(element, 'mouseup');
	   *
	   * @param {Object} element The DOMElement or NodeList to attach a listener.
	   * @param {String} eventName The event name to attach the observable sequence.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
	   */
	  Observable.fromEvent = function (element, eventName, selector) {
	    // Node.js specific
	    if (element.addListener) {
	      return fromEventPattern(
	        function (h) { element.addListener(eventName, h); },
	        function (h) { element.removeListener(eventName, h); },
	        selector);
	    }
	
	    // Use only if non-native events are allowed
	    if (!Rx.config.useNativeEvents) {
	      // Handles jq, Angular.js, Zepto, Marionette, Ember.js
	      if (typeof element.on === 'function' && typeof element.off === 'function') {
	        return fromEventPattern(
	          function (h) { element.on(eventName, h); },
	          function (h) { element.off(eventName, h); },
	          selector);
	      }
	    }
	    return new AnonymousObservable(function (observer) {
	      return createEventListener(
	        element,
	        eventName,
	        function handler (e) {
	          var results = e;
	
	          if (selector) {
	            try {
	              results = selector(arguments);
	            } catch (err) {
	              return observer.onError(err);
	            }
	          }
	
	          observer.onNext(results);
	        });
	    }).publish().refCount();
	  };
	
	  /**
	   * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
	   * @param {Function} addHandler The function to add a handler to the emitter.
	   * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence which wraps an event from an event emitter
	   */
	  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
	    return new AnonymousObservable(function (observer) {
	      function innerHandler (e) {
	        var result = e;
	        if (selector) {
	          try {
	            result = selector(arguments);
	          } catch (err) {
	            return observer.onError(err);
	          }
	        }
	        observer.onNext(result);
	      }
	
	      var returnValue = addHandler(innerHandler);
	      return disposableCreate(function () {
	        if (removeHandler) {
	          removeHandler(innerHandler, returnValue);
	        }
	      });
	    }).publish().refCount();
	  };
	
	  /**
	   * Invokes the asynchronous function, surfacing the result through an observable sequence.
	   * @param {Function} functionAsync Asynchronous function which returns a Promise to run.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   */
	  Observable.startAsync = function (functionAsync) {
	    var promise;
	    try {
	      promise = functionAsync();
	    } catch (e) {
	      return observableThrow(e);
	    }
	    return observableFromPromise(promise);
	  }
	
	  var PausableObservable = (function (__super__) {
	
	    inherits(PausableObservable, __super__);
	
	    function subscribe(observer) {
	      var conn = this.source.publish(),
	        subscription = conn.subscribe(observer),
	        connection = disposableEmpty;
	
	      var pausable = this.pauser.distinctUntilChanged().subscribe(function (b) {
	        if (b) {
	          connection = conn.connect();
	        } else {
	          connection.dispose();
	          connection = disposableEmpty;
	        }
	      });
	
	      return new CompositeDisposable(subscription, connection, pausable);
	    }
	
	    function PausableObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();
	
	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }
	
	      __super__.call(this, subscribe, source);
	    }
	
	    PausableObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };
	
	    PausableObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };
	
	    return PausableObservable;
	
	  }(Observable));
	
	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausable(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausable = function (pauser) {
	    return new PausableObservable(this, pauser);
	  };
	
	  function combineLatestSource(source, subject, resultSelector) {
	    return new AnonymousObservable(function (o) {
	      var hasValue = [false, false],
	        hasValueAll = false,
	        isDone = false,
	        values = new Array(2),
	        err;
	
	      function next(x, i) {
	        values[i] = x
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          if (err) { return o.onError(err); }
	          var res = tryCatch(resultSelector).apply(null, values);
	          if (res === errorObj) { return o.onError(res.e); }
	          o.onNext(res);
	        }
	        isDone && values[1] && o.onCompleted();
	      }
	
	      return new CompositeDisposable(
	        source.subscribe(
	          function (x) {
	            next(x, 0);
	          },
	          function (e) {
	            if (values[1]) {
	              o.onError(e);
	            } else {
	              err = e;
	            }
	          },
	          function () {
	            isDone = true;
	            values[1] && o.onCompleted();
	          }),
	        subject.subscribe(
	          function (x) {
	            next(x, 1);
	          },
	          function (e) { o.onError(e); },
	          function () {
	            isDone = true;
	            next(true, 1);
	          })
	        );
	    }, source);
	  }
	
	  var PausableBufferedObservable = (function (__super__) {
	
	    inherits(PausableBufferedObservable, __super__);
	
	    function subscribe(o) {
	      var q = [], previousShouldFire;
	
	      function drainQueue() { while (q.length > 0) { o.onNext(q.shift()); } }
	
	      var subscription =
	        combineLatestSource(
	          this.source,
	          this.pauser.distinctUntilChanged().startWith(false),
	          function (data, shouldFire) {
	            return { data: data, shouldFire: shouldFire };
	          })
	          .subscribe(
	            function (results) {
	              if (previousShouldFire !== undefined && results.shouldFire != previousShouldFire) {
	                previousShouldFire = results.shouldFire;
	                // change in shouldFire
	                if (results.shouldFire) { drainQueue(); }
	              } else {
	                previousShouldFire = results.shouldFire;
	                // new data
	                if (results.shouldFire) {
	                  o.onNext(results.data);
	                } else {
	                  q.push(results.data);
	                }
	              }
	            },
	            function (err) {
	              drainQueue();
	              o.onError(err);
	            },
	            function () {
	              drainQueue();
	              o.onCompleted();
	            }
	          );
	      return subscription;
	    }
	
	    function PausableBufferedObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();
	
	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }
	
	      __super__.call(this, subscribe, source);
	    }
	
	    PausableBufferedObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };
	
	    PausableBufferedObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };
	
	    return PausableBufferedObservable;
	
	  }(Observable));
	
	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false,
	   * and yields the values that were buffered while paused.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausableBuffered(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausableBuffered = function (subject) {
	    return new PausableBufferedObservable(this, subject);
	  };
	
	  var ControlledObservable = (function (__super__) {
	
	    inherits(ControlledObservable, __super__);
	
	    function subscribe (observer) {
	      return this.source.subscribe(observer);
	    }
	
	    function ControlledObservable (source, enableQueue, scheduler) {
	      __super__.call(this, subscribe, source);
	      this.subject = new ControlledSubject(enableQueue, scheduler);
	      this.source = source.multicast(this.subject).refCount();
	    }
	
	    ControlledObservable.prototype.request = function (numberOfItems) {
	      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
	    };
	
	    return ControlledObservable;
	
	  }(Observable));
	
	  var ControlledSubject = (function (__super__) {
	
	    function subscribe (observer) {
	      return this.subject.subscribe(observer);
	    }
	
	    inherits(ControlledSubject, __super__);
	
	    function ControlledSubject(enableQueue, scheduler) {
	      enableQueue == null && (enableQueue = true);
	
	      __super__.call(this, subscribe);
	      this.subject = new Subject();
	      this.enableQueue = enableQueue;
	      this.queue = enableQueue ? [] : null;
	      this.requestedCount = 0;
	      this.requestedDisposable = disposableEmpty;
	      this.error = null;
	      this.hasFailed = false;
	      this.hasCompleted = false;
	      this.scheduler = scheduler || currentThreadScheduler;
	    }
	
	    addProperties(ControlledSubject.prototype, Observer, {
	      onCompleted: function () {
	        this.hasCompleted = true;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onCompleted();
	        } else {
	          this.queue.push(Notification.createOnCompleted());
	        }
	      },
	      onError: function (error) {
	        this.hasFailed = true;
	        this.error = error;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onError(error);
	        } else {
	          this.queue.push(Notification.createOnError(error));
	        }
	      },
	      onNext: function (value) {
	        var hasRequested = false;
	
	        if (this.requestedCount === 0) {
	          this.enableQueue && this.queue.push(Notification.createOnNext(value));
	        } else {
	          (this.requestedCount !== -1 && this.requestedCount-- === 0) && this.disposeCurrentRequest();
	          hasRequested = true;
	        }
	        hasRequested && this.subject.onNext(value);
	      },
	      _processRequest: function (numberOfItems) {
	        if (this.enableQueue) {
	          while ((this.queue.length >= numberOfItems && numberOfItems > 0) ||
	          (this.queue.length > 0 && this.queue[0].kind !== 'N')) {
	            var first = this.queue.shift();
	            first.accept(this.subject);
	            if (first.kind === 'N') {
	              numberOfItems--;
	            } else {
	              this.disposeCurrentRequest();
	              this.queue = [];
	            }
	          }
	
	          return { numberOfItems : numberOfItems, returnValue: this.queue.length !== 0};
	        }
	
	        return { numberOfItems: numberOfItems, returnValue: false };
	      },
	      request: function (number) {
	        this.disposeCurrentRequest();
	        var self = this;
	
	        this.requestedDisposable = this.scheduler.scheduleWithState(number,
	        function(s, i) {
	          var r = self._processRequest(i), remaining = r.numberOfItems;
	          if (!r.returnValue) {
	            self.requestedCount = remaining;
	            self.requestedDisposable = disposableCreate(function () {
	              self.requestedCount = 0;
	            });
	          }
	        });
	
	        return this.requestedDisposable;
	      },
	      disposeCurrentRequest: function () {
	        this.requestedDisposable.dispose();
	        this.requestedDisposable = disposableEmpty;
	      }
	    });
	
	    return ControlledSubject;
	  }(Observable));
	
	  /**
	   * Attaches a controller to the observable sequence with the ability to queue.
	   * @example
	   * var source = Rx.Observable.interval(100).controlled();
	   * source.request(3); // Reads 3 values
	   * @param {bool} enableQueue truthy value to determine if values should be queued pending the next request
	   * @param {Scheduler} scheduler determines how the requests will be scheduled
	   * @returns {Observable} The observable sequence which only propagates values on request.
	   */
	  observableProto.controlled = function (enableQueue, scheduler) {
	
	    if (enableQueue && isScheduler(enableQueue)) {
	        scheduler = enableQueue;
	        enableQueue = true;
	    }
	
	    if (enableQueue == null) {  enableQueue = true; }
	    return new ControlledObservable(this, enableQueue, scheduler);
	  };
	
	  var StopAndWaitObservable = (function (__super__) {
	
	    function subscribe (observer) {
	      this.subscription = this.source.subscribe(new StopAndWaitObserver(observer, this, this.subscription));
	
	      var self = this;
	      timeoutScheduler.schedule(function () { self.source.request(1); });
	
	      return this.subscription;
	    }
	
	    inherits(StopAndWaitObservable, __super__);
	
	    function StopAndWaitObservable (source) {
	      __super__.call(this, subscribe, source);
	      this.source = source;
	    }
	
	    var StopAndWaitObserver = (function (__sub__) {
	
	      inherits(StopAndWaitObserver, __sub__);
	
	      function StopAndWaitObserver (observer, observable, cancel) {
	        __sub__.call(this);
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	      }
	
	      var stopAndWaitObserverProto = StopAndWaitObserver.prototype;
	
	      stopAndWaitObserverProto.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };
	
	      stopAndWaitObserverProto.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      }
	
	      stopAndWaitObserverProto.next = function (value) {
	        this.observer.onNext(value);
	
	        var self = this;
	        timeoutScheduler.schedule(function () {
	          self.observable.source.request(1);
	        });
	      };
	
	      stopAndWaitObserverProto.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };
	
	      return StopAndWaitObserver;
	    }(AbstractObserver));
	
	    return StopAndWaitObservable;
	  }(Observable));
	
	
	  /**
	   * Attaches a stop and wait observable to the current observable.
	   * @returns {Observable} A stop and wait observable.
	   */
	  ControlledObservable.prototype.stopAndWait = function () {
	    return new StopAndWaitObservable(this);
	  };
	
	  var WindowedObservable = (function (__super__) {
	
	    function subscribe (observer) {
	      this.subscription = this.source.subscribe(new WindowedObserver(observer, this, this.subscription));
	
	      var self = this;
	      timeoutScheduler.schedule(function () {
	        self.source.request(self.windowSize);
	      });
	
	      return this.subscription;
	    }
	
	    inherits(WindowedObservable, __super__);
	
	    function WindowedObservable(source, windowSize) {
	      __super__.call(this, subscribe, source);
	      this.source = source;
	      this.windowSize = windowSize;
	    }
	
	    var WindowedObserver = (function (__sub__) {
	
	      inherits(WindowedObserver, __sub__);
	
	      function WindowedObserver(observer, observable, cancel) {
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	        this.received = 0;
	      }
	
	      var windowedObserverPrototype = WindowedObserver.prototype;
	
	      windowedObserverPrototype.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };
	
	      windowedObserverPrototype.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      };
	
	      windowedObserverPrototype.next = function (value) {
	        this.observer.onNext(value);
	
	        this.received = ++this.received % this.observable.windowSize;
	        if (this.received === 0) {
	          var self = this;
	          timeoutScheduler.schedule(function () {
	            self.observable.source.request(self.observable.windowSize);
	          });
	        }
	      };
	
	      windowedObserverPrototype.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };
	
	      return WindowedObserver;
	    }(AbstractObserver));
	
	    return WindowedObservable;
	  }(Observable));
	
	  /**
	   * Creates a sliding windowed observable based upon the window size.
	   * @param {Number} windowSize The number of items in the window
	   * @returns {Observable} A windowed observable based upon the window size.
	   */
	  ControlledObservable.prototype.windowed = function (windowSize) {
	    return new WindowedObservable(this, windowSize);
	  };
	
	  /**
	   * Pipes the existing Observable sequence into a Node.js Stream.
	   * @param {Stream} dest The destination Node.js stream.
	   * @returns {Stream} The destination stream.
	   */
	  observableProto.pipe = function (dest) {
	    var source = this.pausableBuffered();
	
	    function onDrain() {
	      source.resume();
	    }
	
	    dest.addListener('drain', onDrain);
	
	    source.subscribe(
	      function (x) {
	        !dest.write(String(x)) && source.pause();
	      },
	      function (err) {
	        dest.emit('error', err);
	      },
	      function () {
	        // Hack check because STDIO is not closable
	        !dest._isStdio && dest.end();
	        dest.removeListener('drain', onDrain);
	      });
	
	    source.resume();
	
	    return dest;
	  };
	
	  /**
	   * Multicasts the source sequence notifications through an instantiated subject into all uses of the sequence within a selector function. Each
	   * subscription to the resulting sequence causes a separate multicast invocation, exposing the sequence resulting from the selector function's
	   * invocation. For specializations with fixed subject types, see Publish, PublishLast, and Replay.
	   *
	   * @example
	   * 1 - res = source.multicast(observable);
	   * 2 - res = source.multicast(function () { return new Subject(); }, function (x) { return x; });
	   *
	   * @param {Function|Subject} subjectOrSubjectSelector
	   * Factory function to create an intermediate subject through which the source sequence's elements will be multicast to the selector function.
	   * Or:
	   * Subject to push source elements into.
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. Specified only if <paramref name="subjectOrSubjectSelector" is a factory function.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
	    var source = this;
	    return typeof subjectOrSubjectSelector === 'function' ?
	      new AnonymousObservable(function (observer) {
	        var connectable = source.multicast(subjectOrSubjectSelector());
	        return new CompositeDisposable(selector(connectable).subscribe(observer), connectable.connect());
	      }, source) :
	      new ConnectableObservable(source, subjectOrSubjectSelector);
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of Multicast using a regular Subject.
	   *
	   * @example
	   * var resres = source.publish();
	   * var res = source.publish(function (x) { return x; });
	   *
	   * @param {Function} [selector] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publish = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new Subject(); }, selector) :
	      this.multicast(new Subject());
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of publish which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.share = function () {
	    return this.publish().refCount();
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
	   * This operator is a specialization of Multicast using a AsyncSubject.
	   *
	   * @example
	   * var res = source.publishLast();
	   * var res = source.publishLast(function (x) { return x; });
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will only receive the last notification of the source.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishLast = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new AsyncSubject(); }, selector) :
	      this.multicast(new AsyncSubject());
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
	   * This operator is a specialization of Multicast using a BehaviorSubject.
	   *
	   * @example
	   * var res = source.publishValue(42);
	   * var res = source.publishValue(function (x) { return x.select(function (y) { return y * y; }) }, 42);
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive immediately receive the initial value, followed by all notifications of the source from the time of the subscription on.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
	    return arguments.length === 2 ?
	      this.multicast(function () {
	        return new BehaviorSubject(initialValue);
	      }, initialValueOrSelector) :
	      this.multicast(new BehaviorSubject(initialValueOrSelector));
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence and starts with an initialValue.
	   * This operator is a specialization of publishValue which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareValue = function (initialValue) {
	    return this.publishValue(initialValue).refCount();
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of Multicast using a ReplaySubject.
	   *
	   * @example
	   * var res = source.replay(null, 3);
	   * var res = source.replay(null, 3, 500);
	   * var res = source.replay(null, 3, 500, scheduler);
	   * var res = source.replay(function (x) { return x.take(6).repeat(); }, 3, 500, scheduler);
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all the notifications of the source subject to the specified replay buffer trimming policy.
	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param windowSize [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new ReplaySubject(bufferSize, windowSize, scheduler); }, selector) :
	      this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of replay which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   *
	   * @example
	   * var res = source.shareReplay(3);
	   * var res = source.shareReplay(3, 500);
	   * var res = source.shareReplay(3, 500, scheduler);
	   *
	
	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param window [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
	    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
	  };
	
	  var InnerSubscription = function (subject, observer) {
	    this.subject = subject;
	    this.observer = observer;
	  };
	
	  InnerSubscription.prototype.dispose = function () {
	    if (!this.subject.isDisposed && this.observer !== null) {
	      var idx = this.subject.observers.indexOf(this.observer);
	      this.subject.observers.splice(idx, 1);
	      this.observer = null;
	    }
	  };
	
	  /**
	   *  Represents a value that changes over time.
	   *  Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
	   */
	  var BehaviorSubject = Rx.BehaviorSubject = (function (__super__) {
	    function subscribe(observer) {
	      checkDisposed(this);
	      if (!this.isStopped) {
	        this.observers.push(observer);
	        observer.onNext(this.value);
	        return new InnerSubscription(this, observer);
	      }
	      if (this.hasError) {
	        observer.onError(this.error);
	      } else {
	        observer.onCompleted();
	      }
	      return disposableEmpty;
	    }
	
	    inherits(BehaviorSubject, __super__);
	
	    /**
	     *  Initializes a new instance of the BehaviorSubject class which creates a subject that caches its last value and starts with the specified value.
	     *  @param {Mixed} value Initial value sent to observers when no other value has been received by the subject yet.
	     */
	    function BehaviorSubject(value) {
	      __super__.call(this, subscribe);
	      this.value = value,
	      this.observers = [],
	      this.isDisposed = false,
	      this.isStopped = false,
	      this.hasError = false;
	    }
	
	    addProperties(BehaviorSubject.prototype, Observer, {
	      /**
	       * Gets the current value or throws an exception.
	       * Value is frozen after onCompleted is called.
	       * After onError is called always throws the specified exception.
	       * An exception is always thrown after dispose is called.
	       * @returns {Mixed} The initial value passed to the constructor until onNext is called; after which, the last value passed to onNext.
	       */
	      getValue: function () {
	          checkDisposed(this);
	          if (this.hasError) {
	              throw this.error;
	          }
	          return this.value;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onCompleted();
	        }
	
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.hasError = true;
	        this.error = error;
	
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onError(error);
	        }
	
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onNext(value);
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.value = null;
	        this.exception = null;
	      }
	    });
	
	    return BehaviorSubject;
	  }(Observable));
	
	  /**
	   * Represents an object that is both an observable sequence as well as an observer.
	   * Each notification is broadcasted to all subscribed and future observers, subject to buffer trimming policies.
	   */
	  var ReplaySubject = Rx.ReplaySubject = (function (__super__) {
	
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	
	    function createRemovableDisposable(subject, observer) {
	      return disposableCreate(function () {
	        observer.dispose();
	        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
	      });
	    }
	
	    function subscribe(observer) {
	      var so = new ScheduledObserver(this.scheduler, observer),
	        subscription = createRemovableDisposable(this, so);
	      checkDisposed(this);
	      this._trim(this.scheduler.now());
	      this.observers.push(so);
	
	      for (var i = 0, len = this.q.length; i < len; i++) {
	        so.onNext(this.q[i].value);
	      }
	
	      if (this.hasError) {
	        so.onError(this.error);
	      } else if (this.isStopped) {
	        so.onCompleted();
	      }
	
	      so.ensureActive();
	      return subscription;
	    }
	
	    inherits(ReplaySubject, __super__);
	
	    /**
	     *  Initializes a new instance of the ReplaySubject class with the specified buffer size, window size and scheduler.
	     *  @param {Number} [bufferSize] Maximum element count of the replay buffer.
	     *  @param {Number} [windowSize] Maximum time length of the replay buffer.
	     *  @param {Scheduler} [scheduler] Scheduler the observers are invoked on.
	     */
	    function ReplaySubject(bufferSize, windowSize, scheduler) {
	      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
	      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
	      this.scheduler = scheduler || currentThreadScheduler;
	      this.q = [];
	      this.observers = [];
	      this.isStopped = false;
	      this.isDisposed = false;
	      this.hasError = false;
	      this.error = null;
	      __super__.call(this, subscribe);
	    }
	
	    addProperties(ReplaySubject.prototype, Observer.prototype, {
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        return this.observers.length > 0;
	      },
	      _trim: function (now) {
	        while (this.q.length > this.bufferSize) {
	          this.q.shift();
	        }
	        while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
	          this.q.shift();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        var now = this.scheduler.now();
	        this.q.push({ interval: now, value: value });
	        this._trim(now);
	
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onNext(value);
	          observer.ensureActive();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.error = error;
	        this.hasError = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onError(error);
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onCompleted();
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });
	
	    return ReplaySubject;
	  }(Observable));
	
	  var ConnectableObservable = Rx.ConnectableObservable = (function (__super__) {
	    inherits(ConnectableObservable, __super__);
	
	    function ConnectableObservable(source, subject) {
	      var hasSubscription = false,
	        subscription,
	        sourceObservable = source.asObservable();
	
	      this.connect = function () {
	        if (!hasSubscription) {
	          hasSubscription = true;
	          subscription = new CompositeDisposable(sourceObservable.subscribe(subject), disposableCreate(function () {
	            hasSubscription = false;
	          }));
	        }
	        return subscription;
	      };
	
	      __super__.call(this, function (o) { return subject.subscribe(o); });
	    }
	
	    ConnectableObservable.prototype.refCount = function () {
	      var connectableSubscription, count = 0, source = this;
	      return new AnonymousObservable(function (observer) {
	          var shouldConnect = ++count === 1,
	            subscription = source.subscribe(observer);
	          shouldConnect && (connectableSubscription = source.connect());
	          return function () {
	            subscription.dispose();
	            --count === 0 && connectableSubscription.dispose();
	          };
	      });
	    };
	
	    return ConnectableObservable;
	  }(Observable));
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence. This observable sequence
	   * can be resubscribed to, even if all prior subscriptions have ended. (unlike `.publish().refCount()`)
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source.
	   */
	  observableProto.singleInstance = function() {
	    var source = this, hasObservable = false, observable;
	
	    function getObservable() {
	      if (!hasObservable) {
	        hasObservable = true;
	        observable = source.finally(function() { hasObservable = false; }).publish().refCount();
	      }
	      return observable;
	    };
	
	    return new AnonymousObservable(function(o) {
	      return getObservable().subscribe(o);
	    });
	  };
	
	  var Dictionary = (function () {
	
	    var primes = [1, 3, 7, 13, 31, 61, 127, 251, 509, 1021, 2039, 4093, 8191, 16381, 32749, 65521, 131071, 262139, 524287, 1048573, 2097143, 4194301, 8388593, 16777213, 33554393, 67108859, 134217689, 268435399, 536870909, 1073741789, 2147483647],
	      noSuchkey = "no such key",
	      duplicatekey = "duplicate key";
	
	    function isPrime(candidate) {
	      if ((candidate & 1) === 0) { return candidate === 2; }
	      var num1 = Math.sqrt(candidate),
	        num2 = 3;
	      while (num2 <= num1) {
	        if (candidate % num2 === 0) { return false; }
	        num2 += 2;
	      }
	      return true;
	    }
	
	    function getPrime(min) {
	      var index, num, candidate;
	      for (index = 0; index < primes.length; ++index) {
	        num = primes[index];
	        if (num >= min) { return num; }
	      }
	      candidate = min | 1;
	      while (candidate < primes[primes.length - 1]) {
	        if (isPrime(candidate)) { return candidate; }
	        candidate += 2;
	      }
	      return min;
	    }
	
	    function stringHashFn(str) {
	      var hash = 757602046;
	      if (!str.length) { return hash; }
	      for (var i = 0, len = str.length; i < len; i++) {
	        var character = str.charCodeAt(i);
	        hash = ((hash << 5) - hash) + character;
	        hash = hash & hash;
	      }
	      return hash;
	    }
	
	    function numberHashFn(key) {
	      var c2 = 0x27d4eb2d;
	      key = (key ^ 61) ^ (key >>> 16);
	      key = key + (key << 3);
	      key = key ^ (key >>> 4);
	      key = key * c2;
	      key = key ^ (key >>> 15);
	      return key;
	    }
	
	    var getHashCode = (function () {
	      var uniqueIdCounter = 0;
	
	      return function (obj) {
	        if (obj == null) { throw new Error(noSuchkey); }
	
	        // Check for built-ins before tacking on our own for any object
	        if (typeof obj === 'string') { return stringHashFn(obj); }
	        if (typeof obj === 'number') { return numberHashFn(obj); }
	        if (typeof obj === 'boolean') { return obj === true ? 1 : 0; }
	        if (obj instanceof Date) { return numberHashFn(obj.valueOf()); }
	        if (obj instanceof RegExp) { return stringHashFn(obj.toString()); }
	        if (typeof obj.valueOf === 'function') {
	          // Hack check for valueOf
	          var valueOf = obj.valueOf();
	          if (typeof valueOf === 'number') { return numberHashFn(valueOf); }
	          if (typeof valueOf === 'string') { return stringHashFn(valueOf); }
	        }
	        if (obj.hashCode) { return obj.hashCode(); }
	
	        var id = 17 * uniqueIdCounter++;
	        obj.hashCode = function () { return id; };
	        return id;
	      };
	    }());
	
	    function newEntry() {
	      return { key: null, value: null, next: 0, hashCode: 0 };
	    }
	
	    function Dictionary(capacity, comparer) {
	      if (capacity < 0) { throw new ArgumentOutOfRangeError(); }
	      if (capacity > 0) { this._initialize(capacity); }
	
	      this.comparer = comparer || defaultComparer;
	      this.freeCount = 0;
	      this.size = 0;
	      this.freeList = -1;
	    }
	
	    var dictionaryProto = Dictionary.prototype;
	
	    dictionaryProto._initialize = function (capacity) {
	      var prime = getPrime(capacity), i;
	      this.buckets = new Array(prime);
	      this.entries = new Array(prime);
	      for (i = 0; i < prime; i++) {
	        this.buckets[i] = -1;
	        this.entries[i] = newEntry();
	      }
	      this.freeList = -1;
	    };
	
	    dictionaryProto.add = function (key, value) {
	      this._insert(key, value, true);
	    };
	
	    dictionaryProto._insert = function (key, value, add) {
	      if (!this.buckets) { this._initialize(0); }
	      var index3,
	        num = getHashCode(key) & 2147483647,
	        index1 = num % this.buckets.length;
	      for (var index2 = this.buckets[index1]; index2 >= 0; index2 = this.entries[index2].next) {
	        if (this.entries[index2].hashCode === num && this.comparer(this.entries[index2].key, key)) {
	          if (add) { throw new Error(duplicatekey); }
	          this.entries[index2].value = value;
	          return;
	        }
	      }
	      if (this.freeCount > 0) {
	        index3 = this.freeList;
	        this.freeList = this.entries[index3].next;
	        --this.freeCount;
	      } else {
	        if (this.size === this.entries.length) {
	          this._resize();
	          index1 = num % this.buckets.length;
	        }
	        index3 = this.size;
	        ++this.size;
	      }
	      this.entries[index3].hashCode = num;
	      this.entries[index3].next = this.buckets[index1];
	      this.entries[index3].key = key;
	      this.entries[index3].value = value;
	      this.buckets[index1] = index3;
	    };
	
	    dictionaryProto._resize = function () {
	      var prime = getPrime(this.size * 2),
	        numArray = new Array(prime);
	      for (index = 0; index < numArray.length; ++index) {  numArray[index] = -1; }
	      var entryArray = new Array(prime);
	      for (index = 0; index < this.size; ++index) { entryArray[index] = this.entries[index]; }
	      for (var index = this.size; index < prime; ++index) { entryArray[index] = newEntry(); }
	      for (var index1 = 0; index1 < this.size; ++index1) {
	        var index2 = entryArray[index1].hashCode % prime;
	        entryArray[index1].next = numArray[index2];
	        numArray[index2] = index1;
	      }
	      this.buckets = numArray;
	      this.entries = entryArray;
	    };
	
	    dictionaryProto.remove = function (key) {
	      if (this.buckets) {
	        var num = getHashCode(key) & 2147483647,
	          index1 = num % this.buckets.length,
	          index2 = -1;
	        for (var index3 = this.buckets[index1]; index3 >= 0; index3 = this.entries[index3].next) {
	          if (this.entries[index3].hashCode === num && this.comparer(this.entries[index3].key, key)) {
	            if (index2 < 0) {
	              this.buckets[index1] = this.entries[index3].next;
	            } else {
	              this.entries[index2].next = this.entries[index3].next;
	            }
	            this.entries[index3].hashCode = -1;
	            this.entries[index3].next = this.freeList;
	            this.entries[index3].key = null;
	            this.entries[index3].value = null;
	            this.freeList = index3;
	            ++this.freeCount;
	            return true;
	          } else {
	            index2 = index3;
	          }
	        }
	      }
	      return false;
	    };
	
	    dictionaryProto.clear = function () {
	      var index, len;
	      if (this.size <= 0) { return; }
	      for (index = 0, len = this.buckets.length; index < len; ++index) {
	        this.buckets[index] = -1;
	      }
	      for (index = 0; index < this.size; ++index) {
	        this.entries[index] = newEntry();
	      }
	      this.freeList = -1;
	      this.size = 0;
	    };
	
	    dictionaryProto._findEntry = function (key) {
	      if (this.buckets) {
	        var num = getHashCode(key) & 2147483647;
	        for (var index = this.buckets[num % this.buckets.length]; index >= 0; index = this.entries[index].next) {
	          if (this.entries[index].hashCode === num && this.comparer(this.entries[index].key, key)) {
	            return index;
	          }
	        }
	      }
	      return -1;
	    };
	
	    dictionaryProto.count = function () {
	      return this.size - this.freeCount;
	    };
	
	    dictionaryProto.tryGetValue = function (key) {
	      var entry = this._findEntry(key);
	      return entry >= 0 ?
	        this.entries[entry].value :
	        undefined;
	    };
	
	    dictionaryProto.getValues = function () {
	      var index = 0, results = [];
	      if (this.entries) {
	        for (var index1 = 0; index1 < this.size; index1++) {
	          if (this.entries[index1].hashCode >= 0) {
	            results[index++] = this.entries[index1].value;
	          }
	        }
	      }
	      return results;
	    };
	
	    dictionaryProto.get = function (key) {
	      var entry = this._findEntry(key);
	      if (entry >= 0) { return this.entries[entry].value; }
	      throw new Error(noSuchkey);
	    };
	
	    dictionaryProto.set = function (key, value) {
	      this._insert(key, value, false);
	    };
	
	    dictionaryProto.containskey = function (key) {
	      return this._findEntry(key) >= 0;
	    };
	
	    return Dictionary;
	  }());
	
	  /**
	   *  Correlates the elements of two sequences based on overlapping durations.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (observer) {
	      var group = new CompositeDisposable();
	      var leftDone = false, rightDone = false;
	      var leftId = 0, rightId = 0;
	      var leftMap = new Dictionary(), rightMap = new Dictionary();
	
	      group.add(left.subscribe(
	        function (value) {
	          var id = leftId++;
	          var md = new SingleAssignmentDisposable();
	
	          leftMap.add(id, value);
	          group.add(md);
	
	          var expire = function () {
	            leftMap.remove(id) && leftMap.count() === 0 && leftDone && observer.onCompleted();
	            group.remove(md);
	          };
	
	          var duration;
	          try {
	            duration = leftDurationSelector(value);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	
	          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));
	
	          rightMap.getValues().forEach(function (v) {
	            var result;
	            try {
	              result = resultSelector(value, v);
	            } catch (exn) {
	              observer.onError(exn);
	              return;
	            }
	
	            observer.onNext(result);
	          });
	        },
	        observer.onError.bind(observer),
	        function () {
	          leftDone = true;
	          (rightDone || leftMap.count() === 0) && observer.onCompleted();
	        })
	      );
	
	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++;
	          var md = new SingleAssignmentDisposable();
	
	          rightMap.add(id, value);
	          group.add(md);
	
	          var expire = function () {
	            rightMap.remove(id) && rightMap.count() === 0 && rightDone && observer.onCompleted();
	            group.remove(md);
	          };
	
	          var duration;
	          try {
	            duration = rightDurationSelector(value);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	
	          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));
	
	          leftMap.getValues().forEach(function (v) {
	            var result;
	            try {
	              result = resultSelector(v, value);
	            } catch (exn) {
	              observer.onError(exn);
	              return;
	            }
	
	            observer.onNext(result);
	          });
	        },
	        observer.onError.bind(observer),
	        function () {
	          rightDone = true;
	          (leftDone || rightMap.count() === 0) && observer.onCompleted();
	        })
	      );
	      return group;
	    }, left);
	  };
	
	  /**
	   *  Correlates the elements of two sequences based on overlapping durations, and groups the results.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (observer) {
	      var group = new CompositeDisposable();
	      var r = new RefCountDisposable(group);
	      var leftMap = new Dictionary(), rightMap = new Dictionary();
	      var leftId = 0, rightId = 0;
	
	      function handleError(e) { return function (v) { v.onError(e); }; };
	
	      group.add(left.subscribe(
	        function (value) {
	          var s = new Subject();
	          var id = leftId++;
	          leftMap.add(id, s);
	
	          var result;
	          try {
	            result = resultSelector(value, addRef(s, r));
	          } catch (e) {
	            leftMap.getValues().forEach(handleError(e));
	            observer.onError(e);
	            return;
	          }
	          observer.onNext(result);
	
	          rightMap.getValues().forEach(function (v) { s.onNext(v); });
	
	          var md = new SingleAssignmentDisposable();
	          group.add(md);
	
	          var expire = function () {
	            leftMap.remove(id) && s.onCompleted();
	            group.remove(md);
	          };
	
	          var duration;
	          try {
	            duration = leftDurationSelector(value);
	          } catch (e) {
	            leftMap.getValues().forEach(handleError(e));
	            observer.onError(e);
	            return;
	          }
	
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.getValues().forEach(handleError(e));
	              observer.onError(e);
	            },
	            expire)
	          );
	        },
	        function (e) {
	          leftMap.getValues().forEach(handleError(e));
	          observer.onError(e);
	        },
	        observer.onCompleted.bind(observer))
	      );
	
	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++;
	          rightMap.add(id, value);
	
	          var md = new SingleAssignmentDisposable();
	          group.add(md);
	
	          var expire = function () {
	            rightMap.remove(id);
	            group.remove(md);
	          };
	
	          var duration;
	          try {
	            duration = rightDurationSelector(value);
	          } catch (e) {
	            leftMap.getValues().forEach(handleError(e));
	            observer.onError(e);
	            return;
	          }
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.getValues().forEach(handleError(e));
	              observer.onError(e);
	            },
	            expire)
	          );
	
	          leftMap.getValues().forEach(function (v) { v.onNext(value); });
	        },
	        function (e) {
	          leftMap.getValues().forEach(handleError(e));
	          observer.onError(e);
	        })
	      );
	
	      return r;
	    }, left);
	  };
	
	    /**
	     *  Projects each element of an observable sequence into zero or more buffers.
	     *
	     *  @param {Mixed} bufferOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	     *  @param {Function} [bufferClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	     *  @returns {Observable} An observable sequence of windows.
	     */
	    observableProto.buffer = function (bufferOpeningsOrClosingSelector, bufferClosingSelector) {
	        return this.window.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
	    };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows.
	   *
	   *  @param {Mixed} windowOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	   *  @param {Function} [windowClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	   *  @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
	    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
	      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
	    }
	    return typeof windowOpeningsOrClosingSelector === 'function' ?
	      observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) :
	      observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
	  };
	
	  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
	    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
	      return win;
	    });
	  }
	
	  function observableWindowWithBoundaries(windowBoundaries) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var win = new Subject(),
	        d = new CompositeDisposable(),
	        r = new RefCountDisposable(d);
	
	      observer.onNext(addRef(win, r));
	
	      d.add(source.subscribe(function (x) {
	        win.onNext(x);
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));
	
	      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));
	
	      d.add(windowBoundaries.subscribe(function (w) {
	        win.onCompleted();
	        win = new Subject();
	        observer.onNext(addRef(win, r));
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));
	
	      return r;
	    }, source);
	  }
	
	  function observableWindowWithClosingSelector(windowClosingSelector) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        r = new RefCountDisposable(d),
	        win = new Subject();
	      observer.onNext(addRef(win, r));
	      d.add(source.subscribe(function (x) {
	          win.onNext(x);
	      }, function (err) {
	          win.onError(err);
	          observer.onError(err);
	      }, function () {
	          win.onCompleted();
	          observer.onCompleted();
	      }));
	
	      function createWindowClose () {
	        var windowClose;
	        try {
	          windowClose = windowClosingSelector();
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }
	
	        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));
	
	        var m1 = new SingleAssignmentDisposable();
	        m.setDisposable(m1);
	        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
	          win.onError(err);
	          observer.onError(err);
	        }, function () {
	          win.onCompleted();
	          win = new Subject();
	          observer.onNext(addRef(win, r));
	          createWindowClose();
	        }));
	      }
	
	      createWindowClose();
	      return r;
	    }, source);
	  }
	
	  /**
	   * Returns a new observable that triggers on the second and subsequent triggerings of the input observable.
	   * The Nth triggering of the input observable passes the arguments from the N-1th and Nth triggering as a pair.
	   * The argument passed to the N-1th triggering is held in hidden internal state until the Nth triggering occurs.
	   * @returns {Observable} An observable that triggers on successive pairs of observations from the input observable as an array.
	   */
	  observableProto.pairwise = function () {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var previous, hasPrevious = false;
	      return source.subscribe(
	        function (x) {
	          if (hasPrevious) {
	            observer.onNext([previous, x]);
	          } else {
	            hasPrevious = true;
	          }
	          previous = x;
	        },
	        observer.onError.bind(observer),
	        observer.onCompleted.bind(observer));
	    }, source);
	  };
	
	  /**
	   * Returns two observables which partition the observations of the source by the given function.
	   * The first will trigger observations for those values for which the predicate returns true.
	   * The second will trigger observations for those values where the predicate returns false.
	   * The predicate is executed once for each subscribed observer.
	   * Both also propagate all error observations arising from the source and each completes
	   * when the source completes.
	   * @param {Function} predicate
	   *    The function to determine which output Observable will trigger a particular observation.
	   * @returns {Array}
	   *    An array of observables. The first triggers when the predicate returns true,
	   *    and the second triggers when the predicate returns false.
	  */
	  observableProto.partition = function(predicate, thisArg) {
	    return [
	      this.filter(predicate, thisArg),
	      this.filter(function (x, i, o) { return !predicate.call(thisArg, x, i, o); })
	    ];
	  };
	
	  var WhileEnumerable = (function(__super__) {
	    inherits(WhileEnumerable, __super__);
	    function WhileEnumerable(c, s) {
	      this.c = c;
	      this.s = s;
	    }
	    WhileEnumerable.prototype[$iterator$] = function () {
	      var self = this;
	      return {
	        next: function () {
	          return self.c() ?
	           { done: false, value: self.s } :
	           { done: true, value: void 0 };
	        }
	      };
	    };
	    return WhileEnumerable;
	  }(Enumerable));
	  
	  function enumerableWhile(condition, source) {
	    return new WhileEnumerable(condition, source);
	  }  
	
	   /**
	   *  Returns an observable sequence that is the result of invoking the selector on the source sequence, without sharing subscriptions.
	   *  This operator allows for a fluent style of writing queries that use the same sequence multiple times.
	   *
	   * @param {Function} selector Selector function which can use the source sequence as many times as needed, without sharing subscriptions to the source sequence.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.letBind = observableProto['let'] = function (func) {
	    return func(this);
	  };
	
	   /**
	   *  Determines whether an observable collection contains values. There is an alias for this method called 'ifThen' for browsers <IE9
	   *
	   * @example
	   *  1 - res = Rx.Observable.if(condition, obs1);
	   *  2 - res = Rx.Observable.if(condition, obs1, obs2);
	   *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
	   * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
	   * @param {Observable} thenSource The observable sequence or Promise that will be run if the condition function returns true.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
	   * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
	   */
	  Observable['if'] = Observable.ifThen = function (condition, thenSource, elseSourceOrScheduler) {
	    return observableDefer(function () {
	      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());
	
	      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
	      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));
	
	      // Assume a scheduler for empty only
	      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
	      return condition() ? thenSource : elseSourceOrScheduler;
	    });
	  };
	
	   /**
	   *  Concatenates the observable sequences obtained by running the specified result selector for each element in source.
	   * There is an alias for this method called 'forIn' for browsers <IE9
	   * @param {Array} sources An array of values to turn into an observable sequence.
	   * @param {Function} resultSelector A function to apply to each item in the sources array to turn it into an observable sequence.
	   * @returns {Observable} An observable sequence from the concatenated observable sequences.
	   */
	  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
	    return enumerableOf(sources, resultSelector, thisArg).concat();
	  };
	
	   /**
	   *  Repeats source as long as condition holds emulating a while loop.
	   * There is an alias for this method called 'whileDo' for browsers <IE9
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
	    isPromise(source) && (source = observableFromPromise(source));
	    return enumerableWhile(condition, source).concat();
	  };
	
	   /**
	   *  Repeats source as long as condition holds emulating a do while loop.
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  observableProto.doWhile = function (condition) {
	    return observableConcat([this, observableWhileDo(condition, this)]);
	  };
	
	   /**
	   *  Uses selector to determine which source in sources to use.
	   *  There is an alias 'switchCase' for browsers <IE9.
	   *
	   * @example
	   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 });
	   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, obs0);
	   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, scheduler);
	   *
	   * @param {Function} selector The function which extracts the value for to test in a case statement.
	   * @param {Array} sources A object which has keys which correspond to the case statement labels.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.empty with the specified scheduler.
	   *
	   * @returns {Observable} An observable sequence which is determined by a case statement.
	   */
	  Observable['case'] = Observable.switchCase = function (selector, sources, defaultSourceOrScheduler) {
	    return observableDefer(function () {
	      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
	      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());
	
	      typeof defaultSourceOrScheduler.now === 'function' && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));
	
	      var result = sources[selector()];
	      isPromise(result) && (result = observableFromPromise(result));
	
	      return result || defaultSourceOrScheduler;
	    });
	  };
	
	   /**
	   *  Expands an observable sequence by recursively invoking selector.
	   *
	   * @param {Function} selector Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.
	   * @param {Scheduler} [scheduler] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.
	   * @returns {Observable} An observable sequence containing all the elements produced by the recursive expansion.
	   */
	  observableProto.expand = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var q = [],
	        m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        activeCount = 0,
	        isAcquired = false;
	
	      var ensureActive = function () {
	        var isOwner = false;
	        if (q.length > 0) {
	          isOwner = !isAcquired;
	          isAcquired = true;
	        }
	        if (isOwner) {
	          m.setDisposable(scheduler.scheduleRecursive(function (self) {
	            var work;
	            if (q.length > 0) {
	              work = q.shift();
	            } else {
	              isAcquired = false;
	              return;
	            }
	            var m1 = new SingleAssignmentDisposable();
	            d.add(m1);
	            m1.setDisposable(work.subscribe(function (x) {
	              observer.onNext(x);
	              var result = null;
	              try {
	                result = selector(x);
	              } catch (e) {
	                observer.onError(e);
	              }
	              q.push(result);
	              activeCount++;
	              ensureActive();
	            }, observer.onError.bind(observer), function () {
	              d.remove(m1);
	              activeCount--;
	              if (activeCount === 0) {
	                observer.onCompleted();
	              }
	            }));
	            self();
	          }));
	        }
	      };
	
	      q.push(source);
	      activeCount++;
	      ensureActive();
	      return d;
	    }, this);
	  };
	
	   /**
	   *  Runs all observable sequences in parallel and collect their last elements.
	   *
	   * @example
	   *  1 - res = Rx.Observable.forkJoin([obs1, obs2]);
	   *  1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);
	   * @returns {Observable} An observable sequence with an array collecting the last elements of all the input sequences.
	   */
	  Observable.forkJoin = function () {
	    var allSources = [];
	    if (Array.isArray(arguments[0])) {
	      allSources = arguments[0];
	    } else {
	      for(var i = 0, len = arguments.length; i < len; i++) { allSources.push(arguments[i]); }
	    }
	    return new AnonymousObservable(function (subscriber) {
	      var count = allSources.length;
	      if (count === 0) {
	        subscriber.onCompleted();
	        return disposableEmpty;
	      }
	      var group = new CompositeDisposable(),
	        finished = false,
	        hasResults = new Array(count),
	        hasCompleted = new Array(count),
	        results = new Array(count);
	
	      for (var idx = 0; idx < count; idx++) {
	        (function (i) {
	          var source = allSources[i];
	          isPromise(source) && (source = observableFromPromise(source));
	          group.add(
	            source.subscribe(
	              function (value) {
	              if (!finished) {
	                hasResults[i] = true;
	                results[i] = value;
	              }
	            },
	            function (e) {
	              finished = true;
	              subscriber.onError(e);
	              group.dispose();
	            },
	            function () {
	              if (!finished) {
	                if (!hasResults[i]) {
	                    subscriber.onCompleted();
	                    return;
	                }
	                hasCompleted[i] = true;
	                for (var ix = 0; ix < count; ix++) {
	                  if (!hasCompleted[ix]) { return; }
	                }
	                finished = true;
	                subscriber.onNext(results);
	                subscriber.onCompleted();
	              }
	            }));
	        })(idx);
	      }
	
	      return group;
	    });
	  };
	
	   /**
	   *  Runs two observable sequences in parallel and combines their last elemenets.
	   *
	   * @param {Observable} second Second observable sequence.
	   * @param {Function} resultSelector Result selector function to invoke with the last elements of both sequences.
	   * @returns {Observable} An observable sequence with the result of calling the selector function with the last elements of both input sequences.
	   */
	  observableProto.forkJoin = function (second, resultSelector) {
	    var first = this;
	    return new AnonymousObservable(function (observer) {
	      var leftStopped = false, rightStopped = false,
	        hasLeft = false, hasRight = false,
	        lastLeft, lastRight,
	        leftSubscription = new SingleAssignmentDisposable(), rightSubscription = new SingleAssignmentDisposable();
	
	      isPromise(second) && (second = observableFromPromise(second));
	
	      leftSubscription.setDisposable(
	          first.subscribe(function (left) {
	            hasLeft = true;
	            lastLeft = left;
	          }, function (err) {
	            rightSubscription.dispose();
	            observer.onError(err);
	          }, function () {
	            leftStopped = true;
	            if (rightStopped) {
	              if (!hasLeft) {
	                  observer.onCompleted();
	              } else if (!hasRight) {
	                  observer.onCompleted();
	              } else {
	                var result;
	                try {
	                  result = resultSelector(lastLeft, lastRight);
	                } catch (e) {
	                  observer.onError(e);
	                  return;
	                }
	                observer.onNext(result);
	                observer.onCompleted();
	              }
	            }
	          })
	      );
	
	      rightSubscription.setDisposable(
	        second.subscribe(function (right) {
	          hasRight = true;
	          lastRight = right;
	        }, function (err) {
	          leftSubscription.dispose();
	          observer.onError(err);
	        }, function () {
	          rightStopped = true;
	          if (leftStopped) {
	            if (!hasLeft) {
	              observer.onCompleted();
	            } else if (!hasRight) {
	              observer.onCompleted();
	            } else {
	              var result;
	              try {
	                result = resultSelector(lastLeft, lastRight);
	              } catch (e) {
	                observer.onError(e);
	                return;
	              }
	              observer.onNext(result);
	              observer.onCompleted();
	            }
	          }
	        })
	      );
	
	      return new CompositeDisposable(leftSubscription, rightSubscription);
	    }, first);
	  };
	
	  /**
	   * Comonadic bind operator.
	   * @param {Function} selector A transform function to apply to each element.
	   * @param {Object} scheduler Scheduler used to execute the operation. If not specified, defaults to the ImmediateScheduler.
	   * @returns {Observable} An observable sequence which results from the comonadic bind operation.
	   */
	  observableProto.manySelect = observableProto.extend = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    var source = this;
	    return observableDefer(function () {
	      var chain;
	
	      return source
	        .map(function (x) {
	          var curr = new ChainObservable(x);
	
	          chain && chain.onNext(x);
	          chain = curr;
	
	          return curr;
	        })
	        .tap(
	          noop,
	          function (e) { chain && chain.onError(e); },
	          function () { chain && chain.onCompleted(); }
	        )
	        .observeOn(scheduler)
	        .map(selector);
	    }, source);
	  };
	
	  var ChainObservable = (function (__super__) {
	
	    function subscribe (observer) {
	      var self = this, g = new CompositeDisposable();
	      g.add(currentThreadScheduler.schedule(function () {
	        observer.onNext(self.head);
	        g.add(self.tail.mergeAll().subscribe(observer));
	      }));
	
	      return g;
	    }
	
	    inherits(ChainObservable, __super__);
	
	    function ChainObservable(head) {
	      __super__.call(this, subscribe);
	      this.head = head;
	      this.tail = new AsyncSubject();
	    }
	
	    addProperties(ChainObservable.prototype, Observer, {
	      onCompleted: function () {
	        this.onNext(Observable.empty());
	      },
	      onError: function (e) {
	        this.onNext(Observable.throwError(e));
	      },
	      onNext: function (v) {
	        this.tail.onNext(v);
	        this.tail.onCompleted();
	      }
	    });
	
	    return ChainObservable;
	
	  }(Observable));
	
	  /** @private */
	  var Map = root.Map || (function () {
	
	    function Map() {
	      this._keys = [];
	      this._values = [];
	    }
	
	    Map.prototype.get = function (key) {
	      var i = this._keys.indexOf(key);
	      return i !== -1 ? this._values[i] : undefined;
	    };
	
	    Map.prototype.set = function (key, value) {
	      var i = this._keys.indexOf(key);
	      i !== -1 && (this._values[i] = value);
	      this._values[this._keys.push(key) - 1] = value;
	    };
	
	    Map.prototype.forEach = function (callback, thisArg) {
	      for (var i = 0, len = this._keys.length; i < len; i++) {
	        callback.call(thisArg, this._values[i], this._keys[i]);
	      }
	    };
	
	    return Map;
	  }());
	
	  /**
	   * @constructor
	   * Represents a join pattern over observable sequences.
	   */
	  function Pattern(patterns) {
	    this.patterns = patterns;
	  }
	
	  /**
	   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
	   *  @param other Observable sequence to match in addition to the current pattern.
	   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
	   */
	  Pattern.prototype.and = function (other) {
	    return new Pattern(this.patterns.concat(other));
	  };
	
	  /**
	   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
	   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
	   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  Pattern.prototype.thenDo = function (selector) {
	    return new Plan(this, selector);
	  };
	
	  function Plan(expression, selector) {
	      this.expression = expression;
	      this.selector = selector;
	  }
	
	  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
	    var self = this;
	    var joinObservers = [];
	    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
	      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], observer.onError.bind(observer)));
	    }
	    var activePlan = new ActivePlan(joinObservers, function () {
	      var result;
	      try {
	        result = self.selector.apply(self, arguments);
	      } catch (e) {
	        observer.onError(e);
	        return;
	      }
	      observer.onNext(result);
	    }, function () {
	      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
	        joinObservers[j].removeActivePlan(activePlan);
	      }
	      deactivate(activePlan);
	    });
	    for (i = 0, len = joinObservers.length; i < len; i++) {
	      joinObservers[i].addActivePlan(activePlan);
	    }
	    return activePlan;
	  };
	
	  function planCreateObserver(externalSubscriptions, observable, onError) {
	    var entry = externalSubscriptions.get(observable);
	    if (!entry) {
	      var observer = new JoinObserver(observable, onError);
	      externalSubscriptions.set(observable, observer);
	      return observer;
	    }
	    return entry;
	  }
	
	  function ActivePlan(joinObserverArray, onNext, onCompleted) {
	    this.joinObserverArray = joinObserverArray;
	    this.onNext = onNext;
	    this.onCompleted = onCompleted;
	    this.joinObservers = new Map();
	    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      var joinObserver = this.joinObserverArray[i];
	      this.joinObservers.set(joinObserver, joinObserver);
	    }
	  }
	
	  ActivePlan.prototype.dequeue = function () {
	    this.joinObservers.forEach(function (v) { v.queue.shift(); });
	  };
	
	  ActivePlan.prototype.match = function () {
	    var i, len, hasValues = true;
	    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      if (this.joinObserverArray[i].queue.length === 0) {
	        hasValues = false;
	        break;
	      }
	    }
	    if (hasValues) {
	      var firstValues = [],
	          isCompleted = false;
	      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	        firstValues.push(this.joinObserverArray[i].queue[0]);
	        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
	      }
	      if (isCompleted) {
	        this.onCompleted();
	      } else {
	        this.dequeue();
	        var values = [];
	        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
	          values.push(firstValues[i].value);
	        }
	        this.onNext.apply(this, values);
	      }
	    }
	  };
	
	  var JoinObserver = (function (__super__) {
	    inherits(JoinObserver, __super__);
	
	    function JoinObserver(source, onError) {
	      __super__.call(this);
	      this.source = source;
	      this.onError = onError;
	      this.queue = [];
	      this.activePlans = [];
	      this.subscription = new SingleAssignmentDisposable();
	      this.isDisposed = false;
	    }
	
	    var JoinObserverPrototype = JoinObserver.prototype;
	
	    JoinObserverPrototype.next = function (notification) {
	      if (!this.isDisposed) {
	        if (notification.kind === 'E') {
	          return this.onError(notification.exception);
	        }
	        this.queue.push(notification);
	        var activePlans = this.activePlans.slice(0);
	        for (var i = 0, len = activePlans.length; i < len; i++) {
	          activePlans[i].match();
	        }
	      }
	    };
	
	    JoinObserverPrototype.error = noop;
	    JoinObserverPrototype.completed = noop;
	
	    JoinObserverPrototype.addActivePlan = function (activePlan) {
	      this.activePlans.push(activePlan);
	    };
	
	    JoinObserverPrototype.subscribe = function () {
	      this.subscription.setDisposable(this.source.materialize().subscribe(this));
	    };
	
	    JoinObserverPrototype.removeActivePlan = function (activePlan) {
	      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
	      this.activePlans.length === 0 && this.dispose();
	    };
	
	    JoinObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this.subscription.dispose();
	      }
	    };
	
	    return JoinObserver;
	  } (AbstractObserver));
	
	  /**
	   *  Creates a pattern that matches when both observable sequences have an available value.
	   *
	   *  @param right Observable sequence to match with the current sequence.
	   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
	   */
	  observableProto.and = function (right) {
	    return new Pattern([this, right]);
	  };
	
	  /**
	   *  Matches when the observable sequence has an available value and projects the value.
	   *
	   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
	   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  observableProto.thenDo = function (selector) {
	    return new Pattern([this]).thenDo(selector);
	  };
	
	  /**
	   *  Joins together the results from several patterns.
	   *
	   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
	   *  @returns {Observable} Observable sequence with the results form matching several patterns.
	   */
	  Observable.when = function () {
	    var len = arguments.length, plans;
	    if (Array.isArray(arguments[0])) {
	      plans = arguments[0];
	    } else {
	      plans = new Array(len);
	      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var activePlans = [],
	          externalSubscriptions = new Map();
	      var outObserver = observerCreate(
	        function (x) { o.onNext(x); },
	        function (err) {
	          externalSubscriptions.forEach(function (v) { v.onError(err); });
	          o.onError(err);
	        },
	        function (x) { o.onCompleted(); }
	      );
	      try {
	        for (var i = 0, len = plans.length; i < len; i++) {
	          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
	            var idx = activePlans.indexOf(activePlan);
	            activePlans.splice(idx, 1);
	            activePlans.length === 0 && o.onCompleted();
	          }));
	        }
	      } catch (e) {
	        observableThrow(e).subscribe(o);
	      }
	      var group = new CompositeDisposable();
	      externalSubscriptions.forEach(function (joinObserver) {
	        joinObserver.subscribe();
	        group.add(joinObserver);
	      });
	
	      return group;
	    });
	  };
	
	  function observableTimerDate(dueTime, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      return scheduler.scheduleWithAbsolute(dueTime, function () {
	        observer.onNext(0);
	        observer.onCompleted();
	      });
	    });
	  }
	
	  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      var d = dueTime, p = normalizeTime(period);
	      return scheduler.scheduleRecursiveWithAbsoluteAndState(0, d, function (count, self) {
	        if (p > 0) {
	          var now = scheduler.now();
	          d = d + p;
	          d <= now && (d = now + p);
	        }
	        observer.onNext(count);
	        self(count + 1, d);
	      });
	    });
	  }
	
	  function observableTimerTimeSpan(dueTime, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      return scheduler.scheduleWithRelative(normalizeTime(dueTime), function () {
	        observer.onNext(0);
	        observer.onCompleted();
	      });
	    });
	  }
	
	  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
	    return dueTime === period ?
	      new AnonymousObservable(function (observer) {
	        return scheduler.schedulePeriodicWithState(0, period, function (count) {
	          observer.onNext(count);
	          return count + 1;
	        });
	      }) :
	      observableDefer(function () {
	        return observableTimerDateAndPeriod(scheduler.now() + dueTime, period, scheduler);
	      });
	  }
	
	  /**
	   *  Returns an observable sequence that produces a value after each period.
	   *
	   * @example
	   *  1 - res = Rx.Observable.interval(1000);
	   *  2 - res = Rx.Observable.interval(1000, Rx.Scheduler.timeout);
	   *
	   * @param {Number} period Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, Rx.Scheduler.timeout is used.
	   * @returns {Observable} An observable sequence that produces a value after each period.
	   */
	  var observableinterval = Observable.interval = function (period, scheduler) {
	    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : timeoutScheduler);
	  };
	
	  /**
	   *  Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.
	   * @param {Mixed} [periodOrScheduler]  Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence that produces a value after due time has elapsed and then each period.
	   */
	  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
	    var period;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    if (periodOrScheduler !== undefined && typeof periodOrScheduler === 'number') {
	      period = periodOrScheduler;
	    } else if (isScheduler(periodOrScheduler)) {
	      scheduler = periodOrScheduler;
	    }
	    if (dueTime instanceof Date && period === undefined) {
	      return observableTimerDate(dueTime.getTime(), scheduler);
	    }
	    if (dueTime instanceof Date && period !== undefined) {
	      period = periodOrScheduler;
	      return observableTimerDateAndPeriod(dueTime.getTime(), period, scheduler);
	    }
	    return period === undefined ?
	      observableTimerTimeSpan(dueTime, scheduler) :
	      observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
	  };
	
	  function observableDelayTimeSpan(source, dueTime, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      var active = false,
	        cancelable = new SerialDisposable(),
	        exception = null,
	        q = [],
	        running = false,
	        subscription;
	      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
	        var d, shouldRun;
	        if (notification.value.kind === 'E') {
	          q = [];
	          q.push(notification);
	          exception = notification.value.exception;
	          shouldRun = !running;
	        } else {
	          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
	          shouldRun = !active;
	          active = true;
	        }
	        if (shouldRun) {
	          if (exception !== null) {
	            observer.onError(exception);
	          } else {
	            d = new SingleAssignmentDisposable();
	            cancelable.setDisposable(d);
	            d.setDisposable(scheduler.scheduleRecursiveWithRelative(dueTime, function (self) {
	              var e, recurseDueTime, result, shouldRecurse;
	              if (exception !== null) {
	                return;
	              }
	              running = true;
	              do {
	                result = null;
	                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
	                  result = q.shift().value;
	                }
	                if (result !== null) {
	                  result.accept(observer);
	                }
	              } while (result !== null);
	              shouldRecurse = false;
	              recurseDueTime = 0;
	              if (q.length > 0) {
	                shouldRecurse = true;
	                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
	              } else {
	                active = false;
	              }
	              e = exception;
	              running = false;
	              if (e !== null) {
	                observer.onError(e);
	              } else if (shouldRecurse) {
	                self(recurseDueTime);
	              }
	            }));
	          }
	        }
	      });
	      return new CompositeDisposable(subscription, cancelable);
	    }, source);
	  }
	
	  function observableDelayDate(source, dueTime, scheduler) {
	    return observableDefer(function () {
	      return observableDelayTimeSpan(source, dueTime - scheduler.now(), scheduler);
	    });
	  }
	
	  /**
	   *  Time shifts the observable sequence by dueTime. The relative time intervals between the values are preserved.
	   *
	   * @example
	   *  1 - res = Rx.Observable.delay(new Date());
	   *  2 - res = Rx.Observable.delay(new Date(), Rx.Scheduler.timeout);
	   *
	   *  3 - res = Rx.Observable.delay(5000);
	   *  4 - res = Rx.Observable.delay(5000, 1000, Rx.Scheduler.timeout);
	   * @memberOf Observable#
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.
	   * @param {Scheduler} [scheduler] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delay = function (dueTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return dueTime instanceof Date ?
	      observableDelayDate(this, dueTime.getTime(), scheduler) :
	      observableDelayTimeSpan(this, dueTime, scheduler);
	  };
	
	  /**
	   *  Ignores values from an observable sequence which are followed by another value before dueTime.
	   * @param {Number} dueTime Duration of the debounce period for each value (specified as an integer denoting milliseconds).
	   * @param {Scheduler} [scheduler]  Scheduler to run the debounce timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The debounced sequence.
	   */
	  observableProto.debounce = observableProto.throttleWithTimeout = function (dueTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var cancelable = new SerialDisposable(), hasvalue = false, value, id = 0;
	      var subscription = source.subscribe(
	        function (x) {
	          hasvalue = true;
	          value = x;
	          id++;
	          var currentId = id,
	            d = new SingleAssignmentDisposable();
	          cancelable.setDisposable(d);
	          d.setDisposable(scheduler.scheduleWithRelative(dueTime, function () {
	            hasvalue && id === currentId && observer.onNext(value);
	            hasvalue = false;
	          }));
	        },
	        function (e) {
	          cancelable.dispose();
	          observer.onError(e);
	          hasvalue = false;
	          id++;
	        },
	        function () {
	          cancelable.dispose();
	          hasvalue && observer.onNext(value);
	          observer.onCompleted();
	          hasvalue = false;
	          id++;
	        });
	      return new CompositeDisposable(subscription, cancelable);
	    }, this);
	  };
	
	  /**
	   * @deprecated use #debounce or #throttleWithTimeout instead.
	   */
	  observableProto.throttle = function(dueTime, scheduler) {
	    //deprecate('throttle', 'debounce or throttleWithTimeout');
	    return this.debounce(dueTime, scheduler);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
	   * @param {Number} timeSpan Length of each window (specified as an integer denoting milliseconds).
	   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	    var source = this, timeShift;
	    timeShiftOrScheduler == null && (timeShift = timeSpan);
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    if (typeof timeShiftOrScheduler === 'number') {
	      timeShift = timeShiftOrScheduler;
	    } else if (isScheduler(timeShiftOrScheduler)) {
	      timeShift = timeSpan;
	      scheduler = timeShiftOrScheduler;
	    }
	    return new AnonymousObservable(function (observer) {
	      var groupDisposable,
	        nextShift = timeShift,
	        nextSpan = timeSpan,
	        q = [],
	        refCountDisposable,
	        timerD = new SerialDisposable(),
	        totalTime = 0;
	        groupDisposable = new CompositeDisposable(timerD),
	        refCountDisposable = new RefCountDisposable(groupDisposable);
	
	       function createTimer () {
	        var m = new SingleAssignmentDisposable(),
	          isSpan = false,
	          isShift = false;
	        timerD.setDisposable(m);
	        if (nextSpan === nextShift) {
	          isSpan = true;
	          isShift = true;
	        } else if (nextSpan < nextShift) {
	            isSpan = true;
	        } else {
	          isShift = true;
	        }
	        var newTotalTime = isSpan ? nextSpan : nextShift,
	          ts = newTotalTime - totalTime;
	        totalTime = newTotalTime;
	        if (isSpan) {
	          nextSpan += timeShift;
	        }
	        if (isShift) {
	          nextShift += timeShift;
	        }
	        m.setDisposable(scheduler.scheduleWithRelative(ts, function () {
	          if (isShift) {
	            var s = new Subject();
	            q.push(s);
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          isSpan && q.shift().onCompleted();
	          createTimer();
	        }));
	      };
	      q.push(new Subject());
	      observer.onNext(addRef(q[0], refCountDisposable));
	      createTimer();
	      groupDisposable.add(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	        },
	        function (e) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
	   * @param {Number} timeSpan Maximum time length of a window.
	   * @param {Number} count Maximum element count of a window.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (observer) {
	      var timerD = new SerialDisposable(),
	          groupDisposable = new CompositeDisposable(timerD),
	          refCountDisposable = new RefCountDisposable(groupDisposable),
	          n = 0,
	          windowId = 0,
	          s = new Subject();
	
	      function createTimer(id) {
	        var m = new SingleAssignmentDisposable();
	        timerD.setDisposable(m);
	        m.setDisposable(scheduler.scheduleWithRelative(timeSpan, function () {
	          if (id !== windowId) { return; }
	          n = 0;
	          var newId = ++windowId;
	          s.onCompleted();
	          s = new Subject();
	          observer.onNext(addRef(s, refCountDisposable));
	          createTimer(newId);
	        }));
	      }
	
	      observer.onNext(addRef(s, refCountDisposable));
	      createTimer(0);
	
	      groupDisposable.add(source.subscribe(
	        function (x) {
	          var newId = 0, newWindow = false;
	          s.onNext(x);
	          if (++n === count) {
	            newWindow = true;
	            n = 0;
	            newId = ++windowId;
	            s.onCompleted();
	            s = new Subject();
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          newWindow && createTimer(newId);
	        },
	        function (e) {
	          s.onError(e);
	          observer.onError(e);
	        }, function () {
	          s.onCompleted();
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	    /**
	     *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
	     *
	     * @example
	     *  1 - res = xs.bufferWithTime(1000, scheduler); // non-overlapping segments of 1 second
	     *  2 - res = xs.bufferWithTime(1000, 500, scheduler; // segments of 1 second with time shift 0.5 seconds
	     *
	     * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
	     * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
	     * @param {Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
	     * @returns {Observable} An observable sequence of buffers.
	     */
	    observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	        return this.windowWithTime.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
	    };
	
	    /**
	     *  Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
	     *
	     * @example
	     *  1 - res = source.bufferWithTimeOrCount(5000, 50); // 5s or 50 items in an array
	     *  2 - res = source.bufferWithTimeOrCount(5000, 50, scheduler); // 5s or 50 items in an array
	     *
	     * @param {Number} timeSpan Maximum time length of a buffer.
	     * @param {Number} count Maximum element count of a buffer.
	     * @param {Scheduler} [scheduler]  Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.
	     * @returns {Observable} An observable sequence of buffers.
	     */
	    observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
	        return this.windowWithTimeOrCount(timeSpan, count, scheduler).selectMany(function (x) {
	            return x.toArray();
	        });
	    };
	
	  /**
	   *  Records the time interval between consecutive values in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timeInterval();
	   *  2 - res = source.timeInterval(Rx.Scheduler.timeout);
	   *
	   * @param [scheduler]  Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence with time interval information on values.
	   */
	  observableProto.timeInterval = function (scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return observableDefer(function () {
	      var last = scheduler.now();
	      return source.map(function (x) {
	        var now = scheduler.now(), span = now - last;
	        last = now;
	        return { value: x, interval: span };
	      });
	    });
	  };
	
	  /**
	   *  Records the timestamp for each value in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timestamp(); // produces { value: x, timestamp: ts }
	   *  2 - res = source.timestamp(Rx.Scheduler.default);
	   *
	   * @param {Scheduler} [scheduler]  Scheduler used to compute timestamps. If not specified, the default scheduler is used.
	   * @returns {Observable} An observable sequence with timestamp information on values.
	   */
	  observableProto.timestamp = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return this.map(function (x) {
	      return { value: x, timestamp: scheduler.now() };
	    });
	  };
	
	  function sampleObservable(source, sampler) {
	    return new AnonymousObservable(function (o) {
	      var atEnd = false, value, hasValue = false;
	
	      function sampleSubscribe() {
	        if (hasValue) {
	          hasValue = false;
	          o.onNext(value);
	        }
	        atEnd && o.onCompleted();
	      }
	
	      var sourceSubscription = new SingleAssignmentDisposable();
	      sourceSubscription.setDisposable(source.subscribe(
	        function (newValue) {
	          hasValue = true;
	          value = newValue;
	        },
	        function (e) { o.onError(e); },
	        function () {
	          atEnd = true;
	          sourceSubscription.dispose(); 
	        }
	      ));
	
	      return new CompositeDisposable(
	        sourceSubscription,
	        sampler.subscribe(sampleSubscribe, function (e) { o.onError(e); }, sampleSubscribe)
	      );
	    }, source);
	  }
	
	  /**
	   *  Samples the observable sequence at each interval.
	   *
	   * @example
	   *  1 - res = source.sample(sampleObservable); // Sampler tick sequence
	   *  2 - res = source.sample(5000); // 5 seconds
	   *  2 - res = source.sample(5000, Rx.Scheduler.timeout); // 5 seconds
	   *
	   * @param {Mixed} intervalOrSampler Interval at which to sample (specified as an integer denoting milliseconds) or Sampler Observable.
	   * @param {Scheduler} [scheduler]  Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Sampled observable sequence.
	   */
	  observableProto.sample = observableProto.throttleLatest = function (intervalOrSampler, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return typeof intervalOrSampler === 'number' ?
	      sampleObservable(this, observableinterval(intervalOrSampler, scheduler)) :
	      sampleObservable(this, intervalOrSampler);
	  };
	
	  /**
	   *  Returns the source observable sequence or the other observable sequence if dueTime elapses.
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) when a timeout occurs.
	   * @param {Observable} [other]  Sequence to return in case of a timeout. If not specified, a timeout error throwing sequence will be used.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timeout timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
	   */
	  observableProto.timeout = function (dueTime, other, scheduler) {
	    (other == null || typeof other === 'string') && (other = observableThrow(new Error(other || 'Timeout')));
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	
	    var source = this, schedulerMethod = dueTime instanceof Date ?
	      'scheduleWithAbsolute' :
	      'scheduleWithRelative';
	
	    return new AnonymousObservable(function (observer) {
	      var id = 0,
	        original = new SingleAssignmentDisposable(),
	        subscription = new SerialDisposable(),
	        switched = false,
	        timer = new SerialDisposable();
	
	      subscription.setDisposable(original);
	
	      function createTimer() {
	        var myId = id;
	        timer.setDisposable(scheduler[schedulerMethod](dueTime, function () {
	          if (id === myId) {
	            isPromise(other) && (other = observableFromPromise(other));
	            subscription.setDisposable(other.subscribe(observer));
	          }
	        }));
	      }
	
	      createTimer();
	
	      original.setDisposable(source.subscribe(function (x) {
	        if (!switched) {
	          id++;
	          observer.onNext(x);
	          createTimer();
	        }
	      }, function (e) {
	        if (!switched) {
	          id++;
	          observer.onError(e);
	        }
	      }, function () {
	        if (!switched) {
	          id++;
	          observer.onCompleted();
	        }
	      }));
	      return new CompositeDisposable(subscription, timer);
	    }, source);
	  };
	
	  /**
	   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithAbsoluteTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return new Date(); }
	   *  });
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning Date values.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (observer) {
	      var first = true,
	        hasResult = false;
	      return scheduler.scheduleRecursiveWithAbsoluteAndState(initialState, scheduler.now(), function (state, self) {
	        hasResult && observer.onNext(state);
	
	        try {
	          if (first) {
	            first = false;
	          } else {
	            state = iterate(state);
	          }
	          hasResult = condition(state);
	          if (hasResult) {
	            var result = resultSelector(state);
	            var time = timeSelector(state);
	          }
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }
	        if (hasResult) {
	          self(result, time);
	        } else {
	          observer.onCompleted();
	        }
	      });
	    });
	  };
	
	  /**
	   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithRelativeTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return 500; }
	   *  );
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (observer) {
	      var first = true,
	        hasResult = false;
	      return scheduler.scheduleRecursiveWithRelativeAndState(initialState, 0, function (state, self) {
	        hasResult && observer.onNext(state);
	
	        try {
	          if (first) {
	            first = false;
	          } else {
	            state = iterate(state);
	          }
	          hasResult = condition(state);
	          if (hasResult) {
	            var result = resultSelector(state);
	            var time = timeSelector(state);
	          }
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }
	        if (hasResult) {
	          self(result, time);
	        } else {
	          observer.onCompleted();
	        }
	      });
	    });
	  };
	
	  /**
	   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.delaySubscription(5000); // 5s
	   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
	   *
	   * @param {Number} dueTime Relative or absolute time shift of the subscription.
	   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delaySubscription = function (dueTime, scheduler) {
	    var scheduleMethod = dueTime instanceof Date ? 'scheduleWithAbsolute' : 'scheduleWithRelative';
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (o) {
	      var d = new SerialDisposable();
	
	      d.setDisposable(scheduler[scheduleMethod](dueTime, function() {
	        d.setDisposable(source.subscribe(o));
	      }));
	
	      return d;
	    }, this);
	  };
	
	  /**
	   *  Time shifts the observable sequence based on a subscription delay and a delay selector function for each element.
	   *
	   * @example
	   *  1 - res = source.delayWithSelector(function (x) { return Rx.Scheduler.timer(5000); }); // with selector only
	   *  1 - res = source.delayWithSelector(Rx.Observable.timer(2000), function (x) { return Rx.Observable.timer(x); }); // with delay and selector
	   *
	   * @param {Observable} [subscriptionDelay]  Sequence indicating the delay for the subscription to the source.
	   * @param {Function} delayDurationSelector Selector function to retrieve a sequence indicating the delay for each given element.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delayWithSelector = function (subscriptionDelay, delayDurationSelector) {
	    var source = this, subDelay, selector;
	    if (isFunction(subscriptionDelay)) {
	      selector = subscriptionDelay;
	    } else {
	      subDelay = subscriptionDelay;
	      selector = delayDurationSelector;
	    }
	    return new AnonymousObservable(function (observer) {
	      var delays = new CompositeDisposable(), atEnd = false, subscription = new SerialDisposable();
	
	      function start() {
	        subscription.setDisposable(source.subscribe(
	          function (x) {
	            var delay = tryCatch(selector)(x);
	            if (delay === errorObj) { return observer.onError(delay.e); }
	            var d = new SingleAssignmentDisposable();
	            delays.add(d);
	            d.setDisposable(delay.subscribe(
	              function () {
	                observer.onNext(x);
	                delays.remove(d);
	                done();
	              },
	              function (e) { observer.onError(e); },
	              function () {
	                observer.onNext(x);
	                delays.remove(d);
	                done();
	              }
	            ))
	          },
	          function (e) { observer.onError(e); },
	          function () {
	            atEnd = true;
	            subscription.dispose();
	            done();
	          }
	        ))
	      }
	
	      function done () {
	        atEnd && delays.length === 0 && observer.onCompleted();
	      }
	
	      if (!subDelay) {
	        start();
	      } else {
	        subscription.setDisposable(subDelay.subscribe(start, function (e) { observer.onError(e); }, start));
	      }
	
	      return new CompositeDisposable(subscription, delays);
	    }, this);
	  };
	
	    /**
	     *  Returns the source observable sequence, switching to the other observable sequence if a timeout is signaled.
	     * @param {Observable} [firstTimeout]  Observable sequence that represents the timeout for the first element. If not provided, this defaults to Observable.never().
	     * @param {Function} timeoutDurationSelector Selector to retrieve an observable sequence that represents the timeout between the current element and the next element.
	     * @param {Observable} [other]  Sequence to return in case of a timeout. If not provided, this is set to Observable.throwException().
	     * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
	     */
	    observableProto.timeoutWithSelector = function (firstTimeout, timeoutdurationSelector, other) {
	      if (arguments.length === 1) {
	          timeoutdurationSelector = firstTimeout;
	          firstTimeout = observableNever();
	      }
	      other || (other = observableThrow(new Error('Timeout')));
	      var source = this;
	      return new AnonymousObservable(function (observer) {
	        var subscription = new SerialDisposable(), timer = new SerialDisposable(), original = new SingleAssignmentDisposable();
	
	        subscription.setDisposable(original);
	
	        var id = 0, switched = false;
	
	        function setTimer(timeout) {
	          var myId = id;
	
	          function timerWins () {
	            return id === myId;
	          }
	
	          var d = new SingleAssignmentDisposable();
	          timer.setDisposable(d);
	          d.setDisposable(timeout.subscribe(function () {
	            timerWins() && subscription.setDisposable(other.subscribe(observer));
	            d.dispose();
	          }, function (e) {
	            timerWins() && observer.onError(e);
	          }, function () {
	            timerWins() && subscription.setDisposable(other.subscribe(observer));
	          }));
	        };
	
	        setTimer(firstTimeout);
	
	        function observerWins() {
	          var res = !switched;
	          if (res) { id++; }
	          return res;
	        }
	
	        original.setDisposable(source.subscribe(function (x) {
	          if (observerWins()) {
	            observer.onNext(x);
	            var timeout;
	            try {
	              timeout = timeoutdurationSelector(x);
	            } catch (e) {
	              observer.onError(e);
	              return;
	            }
	            setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
	          }
	        }, function (e) {
	          observerWins() && observer.onError(e);
	        }, function () {
	          observerWins() && observer.onCompleted();
	        }));
	        return new CompositeDisposable(subscription, timer);
	      }, source);
	    };
	
	  /**
	   * Ignores values from an observable sequence which are followed by another value within a computed throttle duration.
	   * @param {Function} durationSelector Selector function to retrieve a sequence indicating the throttle duration for each given element.
	   * @returns {Observable} The debounced sequence.
	   */
	  observableProto.debounceWithSelector = function (durationSelector) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var value, hasValue = false, cancelable = new SerialDisposable(), id = 0;
	      var subscription = source.subscribe(function (x) {
	        var throttle;
	        try {
	          throttle = durationSelector(x);
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }
	
	        isPromise(throttle) && (throttle = observableFromPromise(throttle));
	
	        hasValue = true;
	        value = x;
	        id++;
	        var currentid = id, d = new SingleAssignmentDisposable();
	        cancelable.setDisposable(d);
	        d.setDisposable(throttle.subscribe(function () {
	          hasValue && id === currentid && observer.onNext(value);
	          hasValue = false;
	          d.dispose();
	        }, observer.onError.bind(observer), function () {
	          hasValue && id === currentid && observer.onNext(value);
	          hasValue = false;
	          d.dispose();
	        }));
	      }, function (e) {
	        cancelable.dispose();
	        observer.onError(e);
	        hasValue = false;
	        id++;
	      }, function () {
	        cancelable.dispose();
	        hasValue && observer.onNext(value);
	        observer.onCompleted();
	        hasValue = false;
	        id++;
	      });
	      return new CompositeDisposable(subscription, cancelable);
	    }, source);
	  };
	
	  /**
	   * @deprecated use #debounceWithSelector instead.
	   */
	  observableProto.throttleWithSelector = function (durationSelector) {
	    //deprecate('throttleWithSelector', 'debounceWithSelector');
	    return this.debounceWithSelector(durationSelector);
	  };
	
	  /**
	   *  Skips elements for the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   *
	   *  1 - res = source.skipLastWithTime(5000);
	   *  2 - res = source.skipLastWithTime(5000, scheduler);
	   *
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for skipping elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the end of the source sequence.
	   */
	  observableProto.skipLastWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        var now = scheduler.now();
	        q.push({ interval: now, value: x });
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          o.onNext(q.shift().value);
	        }
	      }, function (e) { o.onError(e); }, function () {
	        var now = scheduler.now();
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          o.onNext(q.shift().value);
	        }
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Returns elements within the specified duration from the end of the observable source sequence, using the specified schedulers to run timers and to drain the collected elements.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        var now = scheduler.now();
	        q.push({ interval: now, value: x });
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          q.shift();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        var now = scheduler.now();
	        while (q.length > 0) {
	          var next = q.shift();
	          if (now - next.interval <= duration) { o.onNext(next.value); }
	        }
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Returns an array with the elements within the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence containing a single array with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        var now = scheduler.now();
	        q.push({ interval: now, value: x });
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          q.shift();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        var now = scheduler.now(), res = [];
	        while (q.length > 0) {
	          var next = q.shift();
	          now - next.interval <= duration && res.push(next.value);
	        }
	        o.onNext(res);
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  /**
	   *  Takes elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.takeWithTime(5000,  [optional scheduler]);
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the start of the source sequence.
	   */
	  observableProto.takeWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (o) {
	      return new CompositeDisposable(scheduler.scheduleWithRelative(duration, function () { o.onCompleted(); }), source.subscribe(o));
	    }, source);
	  };
	
	  /**
	   *  Skips elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.skipWithTime(5000, [optional scheduler]);
	   *
	   * @description
	   *  Specifying a zero value for duration doesn't guarantee no elements will be dropped from the start of the source sequence.
	   *  This is a side-effect of the asynchrony introduced by the scheduler, where the action that causes callbacks from the source sequence to be forwarded
	   *  may not execute immediately, despite the zero due time.
	   *
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the duration.
	   * @param {Number} duration Duration for skipping elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the start of the source sequence.
	   */
	  observableProto.skipWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    return new AnonymousObservable(function (observer) {
	      var open = false;
	      return new CompositeDisposable(
	        scheduler.scheduleWithRelative(duration, function () { open = true; }),
	        source.subscribe(function (x) { open && observer.onNext(x); }, observer.onError.bind(observer), observer.onCompleted.bind(observer)));
	    }, source);
	  };
	
	  /**
	   *  Skips elements from the observable source sequence until the specified start time, using the specified scheduler to run timers.
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the start time.
	   *
	   * @examples
	   *  1 - res = source.skipUntilWithTime(new Date(), [scheduler]);
	   *  2 - res = source.skipUntilWithTime(5000, [scheduler]);
	   * @param {Date|Number} startTime Time to start taking elements from the source sequence. If this value is less than or equal to Date(), no elements will be skipped.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped until the specified start time.
	   */
	  observableProto.skipUntilWithTime = function (startTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    var source = this, schedulerMethod = startTime instanceof Date ?
	      'scheduleWithAbsolute' :
	      'scheduleWithRelative';
	    return new AnonymousObservable(function (o) {
	      var open = false;
	
	      return new CompositeDisposable(
	        scheduler[schedulerMethod](startTime, function () { open = true; }),
	        source.subscribe(
	          function (x) { open && o.onNext(x); },
	          function (e) { o.onError(e); }, function () { o.onCompleted(); }));
	    }, source);
	  };
	
	  /**
	   *  Takes elements for the specified duration until the specified end time, using the specified scheduler to run timers.
	   * @param {Number | Date} endTime Time to stop taking elements from the source sequence. If this value is less than or equal to new Date(), the result stream will complete immediately.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on.
	   * @returns {Observable} An observable sequence with the elements taken until the specified end time.
	   */
	  observableProto.takeUntilWithTime = function (endTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    var source = this, schedulerMethod = endTime instanceof Date ?
	      'scheduleWithAbsolute' :
	      'scheduleWithRelative';
	    return new AnonymousObservable(function (o) {
	      return new CompositeDisposable(
	        scheduler[schedulerMethod](endTime, function () { o.onCompleted(); }),
	        source.subscribe(o));
	    }, source);
	  };
	
	  /**
	   * Returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration.
	   * @param {Number} windowDuration time to wait before emitting another item after emitting the last item
	   * @param {Scheduler} [scheduler] the Scheduler to use internally to manage the timers that handle timeout for each item. If not provided, defaults to Scheduler.timeout.
	   * @returns {Observable} An Observable that performs the throttle operation.
	   */
	  observableProto.throttleFirst = function (windowDuration, scheduler) {
	    isScheduler(scheduler) || (scheduler = timeoutScheduler);
	    var duration = +windowDuration || 0;
	    if (duration <= 0) { throw new RangeError('windowDuration cannot be less or equal zero.'); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var lastOnNext = 0;
	      return source.subscribe(
	        function (x) {
	          var now = scheduler.now();
	          if (lastOnNext === 0 || now - lastOnNext >= duration) {
	            lastOnNext = now;
	            o.onNext(x);
	          }
	        },function (e) { o.onError(e); }, function () { o.onCompleted(); }
	      );
	    }, source);
	  };
	
	  /**
	   * Executes a transducer to transform the observable sequence
	   * @param {Transducer} transducer A transducer to execute
	   * @returns {Observable} An Observable sequence containing the results from the transducer.
	   */
	  observableProto.transduce = function(transducer) {
	    var source = this;
	
	    function transformForObserver(o) {
	      return {
	        '@@transducer/init': function() {
	          return o;
	        },
	        '@@transducer/step': function(obs, input) {
	          return obs.onNext(input);
	        },
	        '@@transducer/result': function(obs) {
	          return obs.onCompleted();
	        }
	      };
	    }
	
	    return new AnonymousObservable(function(o) {
	      var xform = transducer(transformForObserver(o));
	      return source.subscribe(
	        function(v) {
	          try {
	            xform['@@transducer/step'](o, v);
	          } catch (e) {
	            o.onError(e);
	          }
	        },
	        function (e) { o.onError(e); },
	        function() { xform['@@transducer/result'](o); }
	      );
	    }, source);
	  };
	
	  /*
	   * Performs a exclusive waiting for the first to finish before subscribing to another observable.
	   * Observables that come in between subscriptions will be dropped on the floor.
	   * @returns {Observable} A exclusive observable with only the results that happen when subscribed.
	   */
	  observableProto.exclusive = function () {
	    var sources = this;
	    return new AnonymousObservable(function (observer) {
	      var hasCurrent = false,
	        isStopped = false,
	        m = new SingleAssignmentDisposable(),
	        g = new CompositeDisposable();
	
	      g.add(m);
	
	      m.setDisposable(sources.subscribe(
	        function (innerSource) {
	          if (!hasCurrent) {
	            hasCurrent = true;
	
	            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	
	            var innerSubscription = new SingleAssignmentDisposable();
	            g.add(innerSubscription);
	
	            innerSubscription.setDisposable(innerSource.subscribe(
	              observer.onNext.bind(observer),
	              observer.onError.bind(observer),
	              function () {
	                g.remove(innerSubscription);
	                hasCurrent = false;
	                if (isStopped && g.length === 1) {
	                  observer.onCompleted();
	                }
	            }));
	          }
	        },
	        observer.onError.bind(observer),
	        function () {
	          isStopped = true;
	          if (!hasCurrent && g.length === 1) {
	            observer.onCompleted();
	          }
	        }));
	
	      return g;
	    }, this);
	  };
	
	  /*
	   * Performs a exclusive map waiting for the first to finish before subscribing to another observable.
	   * Observables that come in between subscriptions will be dropped on the floor.
	   * @param {Function} selector Selector to invoke for every item in the current subscription.
	   * @param {Any} [thisArg] An optional context to invoke with the selector parameter.
	   * @returns {Observable} An exclusive observable with only the results that happen when subscribed.
	   */
	  observableProto.exclusiveMap = function (selector, thisArg) {
	    var sources = this,
	        selectorFunc = bindCallback(selector, thisArg, 3);
	    return new AnonymousObservable(function (observer) {
	      var index = 0,
	        hasCurrent = false,
	        isStopped = true,
	        m = new SingleAssignmentDisposable(),
	        g = new CompositeDisposable();
	
	      g.add(m);
	
	      m.setDisposable(sources.subscribe(
	        function (innerSource) {
	
	          if (!hasCurrent) {
	            hasCurrent = true;
	
	            innerSubscription = new SingleAssignmentDisposable();
	            g.add(innerSubscription);
	
	            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	
	            innerSubscription.setDisposable(innerSource.subscribe(
	              function (x) {
	                var result;
	                try {
	                  result = selectorFunc(x, index++, innerSource);
	                } catch (e) {
	                  observer.onError(e);
	                  return;
	                }
	
	                observer.onNext(result);
	              },
	              function (e) { observer.onError(e); },
	              function () {
	                g.remove(innerSubscription);
	                hasCurrent = false;
	
	                if (isStopped && g.length === 1) {
	                  observer.onCompleted();
	                }
	              }));
	          }
	        },
	        function (e) { observer.onError(e); },
	        function () {
	          isStopped = true;
	          if (g.length === 1 && !hasCurrent) {
	            observer.onCompleted();
	          }
	        }));
	      return g;
	    }, this);
	  };
	
	  /** Provides a set of extension methods for virtual time scheduling. */
	  Rx.VirtualTimeScheduler = (function (__super__) {
	
	    function localNow() {
	      return this.toDateTimeOffset(this.clock);
	    }
	
	    function scheduleNow(state, action) {
	      return this.scheduleAbsoluteWithState(state, this.clock, action);
	    }
	
	    function scheduleRelative(state, dueTime, action) {
	      return this.scheduleRelativeWithState(state, this.toRelative(dueTime), action);
	    }
	
	    function scheduleAbsolute(state, dueTime, action) {
	      return this.scheduleRelativeWithState(state, this.toRelative(dueTime - this.now()), action);
	    }
	
	    function invokeAction(scheduler, action) {
	      action();
	      return disposableEmpty;
	    }
	
	    inherits(VirtualTimeScheduler, __super__);
	
	    /**
	     * Creates a new virtual time scheduler with the specified initial clock value and absolute time comparer.
	     *
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function VirtualTimeScheduler(initialClock, comparer) {
	      this.clock = initialClock;
	      this.comparer = comparer;
	      this.isEnabled = false;
	      this.queue = new PriorityQueue(1024);
	      __super__.call(this, localNow, scheduleNow, scheduleRelative, scheduleAbsolute);
	    }
	
	    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;
	
	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    VirtualTimeSchedulerPrototype.add = notImplemented;
	
	    /**
	     * Converts an absolute time to a number
	     * @param {Any} The absolute time.
	     * @returns {Number} The absolute time in ms
	     */
	    VirtualTimeSchedulerPrototype.toDateTimeOffset = notImplemented;
	
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    VirtualTimeSchedulerPrototype.toRelative = notImplemented;
	
	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be emulated using recursive scheduling.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.schedulePeriodicWithState = function (state, period, action) {
	      var s = new SchedulePeriodicRecursive(this, state, period, action);
	      return s.start();
	    };
	
	    /**
	     * Schedules an action to be executed after dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleRelativeWithState = function (state, dueTime, action) {
	      var runAt = this.add(this.clock, dueTime);
	      return this.scheduleAbsoluteWithState(state, runAt, action);
	    };
	
	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleRelative = function (dueTime, action) {
	      return this.scheduleRelativeWithState(action, dueTime, invokeAction);
	    };
	
	    /**
	     * Starts the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.start = function () {
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	      }
	    };
	
	    /**
	     * Stops the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.stop = function () {
	      this.isEnabled = false;
	    };
	
	    /**
	     * Advances the scheduler's clock to the specified time, running all work till that point.
	     * @param {Number} time Absolute time to advance the scheduler's clock to.
	     */
	    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
	      var dueToClock = this.comparer(this.clock, time);
	      if (this.comparer(this.clock, time) > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) { return; }
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	        this.clock = time;
	      }
	    };
	
	    /**
	     * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
	      var dt = this.add(this.clock, time),
	          dueToClock = this.comparer(this.clock, dt);
	      if (dueToClock > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) {  return; }
	
	      this.advanceTo(dt);
	    };
	
	    /**
	     * Advances the scheduler's clock by the specified relative time.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.sleep = function (time) {
	      var dt = this.add(this.clock, time);
	      if (this.comparer(this.clock, dt) >= 0) { throw new ArgumentOutOfRangeError(); }
	
	      this.clock = dt;
	    };
	
	    /**
	     * Gets the next scheduled item to be executed.
	     * @returns {ScheduledItem} The next scheduled item.
	     */
	    VirtualTimeSchedulerPrototype.getNext = function () {
	      while (this.queue.length > 0) {
	        var next = this.queue.peek();
	        if (next.isCancelled()) {
	          this.queue.dequeue();
	        } else {
	          return next;
	        }
	      }
	      return null;
	    };
	
	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Scheduler} scheduler Scheduler to execute the action on.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (dueTime, action) {
	      return this.scheduleAbsoluteWithState(action, dueTime, invokeAction);
	    };
	
	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleAbsoluteWithState = function (state, dueTime, action) {
	      var self = this;
	
	      function run(scheduler, state1) {
	        self.queue.remove(si);
	        return action(scheduler, state1);
	      }
	
	      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
	      this.queue.enqueue(si);
	
	      return si.disposable;
	    };
	
	    return VirtualTimeScheduler;
	  }(Scheduler));
	
	  /** Provides a virtual time scheduler that uses Date for absolute time and number for relative time. */
	  Rx.HistoricalScheduler = (function (__super__) {
	    inherits(HistoricalScheduler, __super__);
	
	    /**
	     * Creates a new historical scheduler with the specified initial clock value.
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function HistoricalScheduler(initialClock, comparer) {
	      var clock = initialClock == null ? 0 : initialClock;
	      var cmp = comparer || defaultSubComparer;
	      __super__.call(this, clock, cmp);
	    }
	
	    var HistoricalSchedulerProto = HistoricalScheduler.prototype;
	
	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    HistoricalSchedulerProto.add = function (absolute, relative) {
	      return absolute + relative;
	    };
	
	    HistoricalSchedulerProto.toDateTimeOffset = function (absolute) {
	      return new Date(absolute).getTime();
	    };
	
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @memberOf HistoricalScheduler
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    HistoricalSchedulerProto.toRelative = function (timeSpan) {
	      return timeSpan;
	    };
	
	    return HistoricalScheduler;
	  }(Rx.VirtualTimeScheduler));
	
	  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
	    inherits(AnonymousObservable, __super__);
	
	    // Fix subscriber to check for undefined or function returned to decorate as Disposable
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }
	
	    function setDisposable(s, state) {
	      var ado = state[0], subscribe = state[1];
	      var sub = tryCatch(subscribe)(ado);
	
	      if (sub === errorObj) {
	        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
	      }
	      ado.setDisposable(fixSubscriber(sub));
	    }
	
	    function AnonymousObservable(subscribe, parent) {
	      this.source = parent;
	
	      function s(observer) {
	        var ado = new AutoDetachObserver(observer), state = [ado, subscribe];
	
	        if (currentThreadScheduler.scheduleRequired()) {
	          currentThreadScheduler.scheduleWithState(state, setDisposable);
	        } else {
	          setDisposable(null, state);
	        }
	        return ado;
	      }
	
	      __super__.call(this, s);
	    }
	
	    return AnonymousObservable;
	
	  }(Observable));
	
	  var AutoDetachObserver = (function (__super__) {
	    inherits(AutoDetachObserver, __super__);
	
	    function AutoDetachObserver(observer) {
	      __super__.call(this);
	      this.observer = observer;
	      this.m = new SingleAssignmentDisposable();
	    }
	
	    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;
	
	    AutoDetachObserverPrototype.next = function (value) {
	      var result = tryCatch(this.observer.onNext).call(this.observer, value);
	      if (result === errorObj) {
	        this.dispose();
	        thrower(result.e);
	      }
	    };
	
	    AutoDetachObserverPrototype.error = function (err) {
	      var result = tryCatch(this.observer.onError).call(this.observer, err);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };
	
	    AutoDetachObserverPrototype.completed = function () {
	      var result = tryCatch(this.observer.onCompleted).call(this.observer);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };
	
	    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
	    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };
	
	    AutoDetachObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.m.dispose();
	    };
	
	    return AutoDetachObserver;
	  }(AbstractObserver));
	
	  var GroupedObservable = (function (__super__) {
	    inherits(GroupedObservable, __super__);
	
	    function subscribe(observer) {
	      return this.underlyingObservable.subscribe(observer);
	    }
	
	    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
	      __super__.call(this, subscribe);
	      this.key = key;
	      this.underlyingObservable = !mergedDisposable ?
	        underlyingObservable :
	        new AnonymousObservable(function (observer) {
	          return new CompositeDisposable(mergedDisposable.getDisposable(), underlyingObservable.subscribe(observer));
	        });
	    }
	
	    return GroupedObservable;
	  }(Observable));
	
	  /**
	   *  Represents an object that is both an observable sequence as well as an observer.
	   *  Each notification is broadcasted to all subscribed observers.
	   */
	  var Subject = Rx.Subject = (function (__super__) {
	    function subscribe(observer) {
	      checkDisposed(this);
	      if (!this.isStopped) {
	        this.observers.push(observer);
	        return new InnerSubscription(this, observer);
	      }
	      if (this.hasError) {
	        observer.onError(this.error);
	        return disposableEmpty;
	      }
	      observer.onCompleted();
	      return disposableEmpty;
	    }
	
	    inherits(Subject, __super__);
	
	    /**
	     * Creates a subject.
	     */
	    function Subject() {
	      __super__.call(this, subscribe);
	      this.isDisposed = false,
	      this.isStopped = false,
	      this.observers = [];
	      this.hasError = false;
	    }
	
	    addProperties(Subject.prototype, Observer.prototype, {
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onCompleted();
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.error = error;
	          this.hasError = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onNext(value);
	          }
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });
	
	    /**
	     * Creates a subject from the specified observer and observable.
	     * @param {Observer} observer The observer used to send messages to the subject.
	     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
	     * @returns {Subject} Subject implemented using the given observer and observable.
	     */
	    Subject.create = function (observer, observable) {
	      return new AnonymousSubject(observer, observable);
	    };
	
	    return Subject;
	  }(Observable));
	
	  /**
	   *  Represents the result of an asynchronous operation.
	   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
	   */
	  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {
	
	    function subscribe(observer) {
	      checkDisposed(this);
	
	      if (!this.isStopped) {
	        this.observers.push(observer);
	        return new InnerSubscription(this, observer);
	      }
	
	      if (this.hasError) {
	        observer.onError(this.error);
	      } else if (this.hasValue) {
	        observer.onNext(this.value);
	        observer.onCompleted();
	      } else {
	        observer.onCompleted();
	      }
	
	      return disposableEmpty;
	    }
	
	    inherits(AsyncSubject, __super__);
	
	    /**
	     * Creates a subject that can only receive one value and that value is cached for all future observations.
	     * @constructor
	     */
	    function AsyncSubject() {
	      __super__.call(this, subscribe);
	
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasValue = false;
	      this.observers = [];
	      this.hasError = false;
	    }
	
	    addProperties(AsyncSubject.prototype, Observer, {
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        checkDisposed(this);
	        return this.observers.length > 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
	       */
	      onCompleted: function () {
	        var i, len;
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          var os = cloneArray(this.observers), len = os.length;
	
	          if (this.hasValue) {
	            for (i = 0; i < len; i++) {
	              var o = os[i];
	              o.onNext(this.value);
	              o.onCompleted();
	            }
	          } else {
	            for (i = 0; i < len; i++) {
	              os[i].onCompleted();
	            }
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the error.
	       * @param {Mixed} error The Error to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.hasError = true;
	          this.error = error;
	
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
	       * @param {Mixed} value The value to store in the subject.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        this.hasValue = true;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.exception = null;
	        this.value = null;
	      }
	    });
	
	    return AsyncSubject;
	  }(Observable));
	
	  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
	    inherits(AnonymousSubject, __super__);
	
	    function subscribe(observer) {
	      return this.observable.subscribe(observer);
	    }
	
	    function AnonymousSubject(observer, observable) {
	      this.observer = observer;
	      this.observable = observable;
	      __super__.call(this, subscribe);
	    }
	
	    addProperties(AnonymousSubject.prototype, Observer.prototype, {
	      onCompleted: function () {
	        this.observer.onCompleted();
	      },
	      onError: function (error) {
	        this.observer.onError(error);
	      },
	      onNext: function (value) {
	        this.observer.onNext(value);
	      }
	    });
	
	    return AnonymousSubject;
	  }(Observable));
	
	  /**
	  * Used to pause and resume streams.
	  */
	  Rx.Pauser = (function (__super__) {
	    inherits(Pauser, __super__);
	
	    function Pauser() {
	      __super__.call(this);
	    }
	
	    /**
	     * Pauses the underlying sequence.
	     */
	    Pauser.prototype.pause = function () { this.onNext(false); };
	
	    /**
	    * Resumes the underlying sequence.
	    */
	    Pauser.prototype.resume = function () { this.onNext(true); };
	
	    return Pauser;
	  }(Subject));
	
	  if (true) {
	    root.Rx = Rx;
	
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Rx;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = Rx).Rx = Rx;
	    } else {
	      freeExports.Rx = Rx;
	    }
	  } else {
	    // in a browser or Rhino
	    root.Rx = Rx;
	  }
	
	  // All code before this point will be filtered from stack traces.
	  var rEndingLine = captureLine();
	
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(157)(module), (function() { return this; }()), __webpack_require__(101)))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var Autofocus_1 = __webpack_require__(236);
	exports.appDirectives = [
	    Autofocus_1.Autofocus
	];
	exports.angularDirectives = [
	    angular2_1.coreDirectives,
	    angular2_1.formDirectives,
	    router_1.routerDirectives
	];
	//# sourceMappingURL=directives.js.map

/***/ },
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Github = (function () {
	    function Github(http) {
	        this.http = http;
	        this.url = 'https://api.github.com/search/repositories?q=';
	    }
	    Github.prototype.search = function (query) {
	        return this.http.get("" + this.url + query).
	            toRx().
	            map(function (res) { return res.json(); }).
	            map(function (res) { return res.items; }).
	            filter(function (repos) { return repos; });
	    };
	    Github = __decorate([
	        angular2_1.Injectable(), 
	        __metadata('design:paramtypes', [angular2_1.Http])
	    ], Github);
	    return Github;
	})();
	exports.Github = Github;
	exports.githubInjectables = [
	    angular2_1.bind(Github).toClass(Github)
	];
	//# sourceMappingURL=Github.js.map

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var angular2_1 = __webpack_require__(4);
	var initialTodoState = {
	    todos: [
	        { value: 'finish example', created_at: new Date() },
	        { value: 'add tests', created_at: new Date() },
	        { value: 'include development environment', created_at: new Date() },
	        { value: 'include production environment', created_at: new Date() }
	    ]
	};
	var TodoService = (function () {
	    function TodoService(state) {
	        this._state = state;
	    }
	    TodoService.prototype.get = function (type) {
	        return (type) ? this._state[type] : this._state;
	    };
	    TodoService.prototype.set = function (prop, value) {
	        this._state = (value === undefined) ? prop : Object.assign({}, (_a = {},
	            _a[prop] = value,
	            _a
	        ));
	        var _a;
	    };
	    TodoService.prototype.add = function (value) {
	        var todo = {
	            value: value,
	            created_at: new Date()
	        };
	        var todos = this.get('todos').slice();
	        todos.push(todo);
	        this.set('todos', todos);
	    };
	    TodoService.prototype.remove = function (index) {
	        // Async call to server then save state
	        var todos = this.get('todos').slice();
	        todos.splice(index, 1);
	        this.set({
	            todos: todos
	        });
	    };
	    TodoService = __decorate([
	        angular2_1.Injectable(),
	        __param(0, angular2_1.Inject('initialTodoState')), 
	        __metadata('design:paramtypes', [Object])
	    ], TodoService);
	    return TodoService;
	})();
	exports.TodoService = TodoService;
	exports.todoInjectables = [
	    angular2_1.bind('initialTodoState').toValue(initialTodoState),
	    angular2_1.bind(TodoService).toClass(TodoService)
	];
	//# sourceMappingURL=TodoService.js.map

/***/ },
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';/**
	 * @module
	 * @description
	 * This module provides advanced support for extending change detection.
	 */
	var promise_pipe_1 = __webpack_require__(119);
	exports.PromisePipe = promise_pipe_1.PromisePipe;
	var uppercase_pipe_1 = __webpack_require__(120);
	exports.UpperCasePipe = uppercase_pipe_1.UpperCasePipe;
	var lowercase_pipe_1 = __webpack_require__(115);
	exports.LowerCasePipe = lowercase_pipe_1.LowerCasePipe;
	var observable_pipe_1 = __webpack_require__(118);
	exports.ObservablePipe = observable_pipe_1.ObservablePipe;
	var json_pipe_1 = __webpack_require__(112);
	exports.JsonPipe = json_pipe_1.JsonPipe;
	var iterable_changes_1 = __webpack_require__(62);
	exports.IterableChanges = iterable_changes_1.IterableChanges;
	var keyvalue_changes_1 = __webpack_require__(113);
	exports.KeyValueChanges = keyvalue_changes_1.KeyValueChanges;
	var date_pipe_1 = __webpack_require__(111);
	exports.DatePipe = date_pipe_1.DatePipe;
	var number_pipe_1 = __webpack_require__(117);
	exports.DecimalPipe = number_pipe_1.DecimalPipe;
	exports.PercentPipe = number_pipe_1.PercentPipe;
	exports.CurrencyPipe = number_pipe_1.CurrencyPipe;
	var limit_to_pipe_1 = __webpack_require__(114);
	exports.LimitToPipe = limit_to_pipe_1.LimitToPipe;
	//# sourceMappingURL=pipes.js.map

/***/ },
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */
/***/ function(module, exports) {

	'use strict';/**
	 * JS version of browser APIs. This library can only run in the browser.
	 */
	var win = window;
	exports.window = win;
	exports.document = window.document;
	exports.location = window.location;
	exports.gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; };
	exports.Event = exports.Event;
	exports.MouseEvent = exports.MouseEvent;
	exports.KeyboardEvent = exports.KeyboardEvent;
	exports.EventTarget = exports.EventTarget;
	exports.History = exports.History;
	exports.Location = exports.Location;
	exports.EventListener = exports.EventListener;
	//# sourceMappingURL=browser.js.map

/***/ },
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */
/***/ function(module, exports) {

	module.exports = ".top-nav {\n  height: 56px;\n  min-height: 56px;\n  padding: 0 16px;\n  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);\n}\n\n.top-nav h1 {\n  width: 200px;\n  float: left;\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 0.005em;\n}\n.top-nav .logo {\n  line-height:56px;\n  display:inline-block;\n  color:#FFF;\n  padding:0 5px;\n  font-weight:400;\n  font-size:16px;\n  position:relative\n}\n\n\n.top-nav ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0 20px;\n}\n\n.top-nav ul li {\n  margin: 0;\n}\n.l-left {\n  float: left;\n}\n\n.top-nav {\n  font-family:'Roboto',\"Helvetica Neue Light\",\"Helvetica Neue\",Helvetica,Arial,\"Lucida Grande\",sans-serif;\n}\n\n.top-nav .top-nav-button{\n  line-height:56px;\n  display:inline-block;\n  color:#FFF;\n  text-decoration:none;\n  padding:0 10px;\n  text-transform:uppercase;\n  font-weight:400;\n  font-size:16px;\n  border:none;\n  background:none;\n  border-radius:0;\n  position:relative\n}\n\n\n.top-nav .top-nav-button:hover{\n  background-color: rgba(158, 158, 158, 0.2);\n}\n\na:active, a:hover {\n  outline: 0px none;\n}\n\n.ac-default-theme {\n  background-color: rgb(25,118,210);\n  color: rgb(255,255,255);\n}\n\n\n[layout=row] {\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n[layout] {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n"

/***/ },
/* 212 */
/***/ function(module, exports) {

	module.exports = ".home {\n  background-color: #F8F8F8;\n}\n"

/***/ },
/* 213 */
/***/ function(module, exports) {

	module.exports = "<div class=\"home\">\n  <h2>Home</h2>\n</div>\n"

/***/ },
/* 214 */
/***/ function(module, exports) {

	module.exports = ".rxjs-menu,\n.rxjs-menu ul {\n  list-style: none;\n  padding: 0;\n}\n.rxjs-menu li {\n  margin: 0;\n}\n.rxjs-menu > li:nth-child(1) {\n  border-top: none;\n}\n.rxjs-menu .ac-button {\n  border-radius: 0;\n  color: inherit;\n  cursor: pointer;\n  display: block;\n  line-height: 40px;\n  margin: 0;\n  max-height: 40px;\n  overflow: hidden;\n  padding: 0px 16px;\n  text-align: left;\n  text-decoration: none;\n  white-space: normal;\n  width: 100%;\n}\n.rxjs-menu ac-select {\n\n  /* Override md-select margins.  With margins the menu will look incorrect and causes mobile list\n     to not be scrollable.\n   */\n  margin: 0;\n  width: 100%;\n}\n.rxjs-menu .ac-button.active {\n  color: #03a9f4;\n}\nul.rxjs-menu li:hover {\n  background: rgba(0,0,0,0.1);\n}\n\n.side-nav {\n  background: #FFF;\n  box-shadow: 3px 0 6px rgba(0,0,0,0.3);\n  width: 260px;\n  bottom: 0;\n  overflow: auto;\n}\n\nnav {\n  align-items: stretch;\n}\n\n[layout] {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n[layout=column] {\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.wide{\n  width:100%;\n}\n\n.rxjs-content {\n  align-items: stretch;\n  display: block;\n  position: relative;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n"

/***/ },
/* 215 */
/***/ function(module, exports) {

	module.exports = ".board {\n  margin: 100px auto;\n}\n\n.board .row .tile {\n  border: 1px solid rgb(210, 210, 210);\n  height: 100px;\n  width: 100px;\n  display: inline-block;\n  cursor: pointer;\n  float: left;\n  margin-left: -1px;\n  margin-bottom: -1px;\n}\n\n\n.board .row .x {\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAD1CAAAAAA9yZV2AAAJO0lEQVR42t2dK3AyMRDH16OZwSEQWAyqAolEYrAYXCUSh0dUodBMBR6D6uBPn2AGd+pmTpzIJ9p+vO6RfSW5ru1Mrr+7ZLP7300A0yzL18NjxZ+hWTRxBwDe/wrOEQAAYJj+CZwd/Fgn+QM4K/hv3UvjcaZwb1HDcR5pAM5NxslH8Gyn5uKkrzSFPM3ASYdQZNdm4iTdQhoYNRLn2oMS+2ogTgylxv860fmcO6WJymk+mTj5pgsA7X0YNGOmZ4vbPwMtnH2gczkNDDIWTtL6P9KbI5oTVNmYhTO5G6k8RldICEqtf6HjPM7imQOaPdTakYyzqBxIM72psrUx+XnTj7E42dNm1s5DoAGYzu+WkT1OXPBeAqD5tW09Tvx+9wUOLyNEAdEAxHU4cQvebkn55mWAYUg03/Eo1M2u/0nf2+sIO58+7cU2lTiXx/85sUs4/NEARBU4txxjY4wx5r1ogHlINDAox8n7j0lsyRNOAdEArEtx7gMa+NjPSgboKWw+n0C2CKwigMpNORwaGBTjbJHuPhAamBfifGHdvZwdODRwLsJJUEPsw6EZF7qCEW6QNBQaiItwNtgJGwrNrmjfifAzNgyaaWGQ00eP08ucZNJ1CycvwjkTRloFQPMdoBQIibTgT1OBss/fXnGmhKH6/mm+0+tXnA/KWBs9rdN2AafFOBHR5Sup6rbzIy3RCtIOZTiWLHppcWnaSamSM6fuYeRqFJ/mWi4bEj3mhUzT49K0LhUqaEYbc0KkyYbshRNXirpT2qC00DqXpCnEoebqCQVnwqaJaiT3hDju3AvNubaCQH0Gvqgwl6UpxtlRx8aG1gs2zcmivkOdbVV9gEX2Lk1TorPNpIavtDWb5mhXGz2RH5C7pDnYlnrb1CcsrGm2bJpP676Ctdz3lxaiK6NEEI/Y7XSqgwpNqeQ+pgurLoQBgA+DwTlILlCWaoxKf0vrO4xH1cZu/FS6rHBRWn1b0p9V1xByYdMsDRYnAq3plujRVJR6x0rTLRtwaaaGgHPQeSA/XatKe8txOM6gaMPmpbp3mlFGwuHFVFetlKBbuU2DkgOaivvLJwkKjcObF4UxyIbt1GrUVlCLRGKNILquVFGFk3dZS1Yh7KzNDkEvJVmJh5310WAlTiopsvArOBYyOChqE91MtOZhU0MCzdB37iTstMfhipT/J3vGrnnYiRCgmzX+bHqpZtiJwDHMtzrhR+cA8NM0IIDD3fk+WCrkrw1s+37qcFLufxIJaLdt6y6m2i73FffFskfA1Clrca7c/6XPpkEU+evPIPCLFkz7MpI4sWcaVA3M4oTI1CsNrl/BAufLJw2yt8zm/M7IHw22emyDc/BGgz5SY3W6quWJpp+q4Ow94eDbfKxwsq4XGkIHsN1Rvp0PmoPRwsk90HwYNRwBhUwll6bipK5ppkYTR0CORaYVujhuP08nUcYRSMJ0MhwiThr2hoPFEegIsjXGeS17nMQVDecAAOL6BUefZ2Hc4GROaCbGEY6TvaefO8Nx4dyYZ+xR1/58BOyiCThZwC6agKP9efhHApFXZqmqBlPjGEc1Le3kznHMQA/nYtzj6GluX8YDjtrnkbmkBo2jpFgvjR8cgQNERaVc4wsn0sDJvOHw69CF9WBvOBdxmk/jEUdcBVkZrzhJmG6AiiMr8XZT3zimE6IboOMc5WgOxj+O3F66MCHgiO2l7WsIOAKni5m1Almca2jBJw9HMNTZB4AjKSHG3nFOkhtpzzeOcJiz8Iwj3XS094ojn/FEHnEUyqS91BuOinQ484VzAhX78IMTgZKdfeAoFnwT9zj5mx7O2D3OBBRt7RpnCap2couj3tWWuMTRb0AeOcSJQN9WznAu4MIOjnCynhMcZkkRgnDRdzbMXeC8gytz0THlsrN1r47j9hBCpIxzdkqDOFdJwrmAY5to4iTuz4esFXF8nBU7quHMwIfFSjhrLzQwyFVwduDJZho4J/BmCseRIvBoJ2mcBLzaVRjnzS/OUBbH79lxQN84XI2zBO+2k8PZQgAWSeEcQqCBViKDE0EYNhHBuUIothTAyfrB4OBybfAq24gXfsCvbCMdHYBn2UY4WYBQXTTNvYFv2UZWiQfvso1otPOMkw+CxLE9DvOMs4BA7UrBEYo7Y3kxy+7OHNCI1HYaK3CCxklkDh7OdLz9EoszFnlsK1WKLLY4nLWoE1KIYlFXBAt14m8UMybEBc5X6RWrIaBaX68ttH92Ul2xPrLEeZd/XNpxzgOyM+PR+aicMT1b4Ait27kDqW5ej5PK1Avbz3lWrlCHPNTjCGkDsYvk6VqLI5RN7530XNe6AqH9s1gglw4OlnU4QvvnwI2ceq7DGWotHA1d6K1uGxXaP8s7AUTT9RrRAA7qU1p0utXcBABtkaeMHTX41qUIIJPkXN20wdQm2CAyFb4ctVzVNopCLrAx1N53t9N2NzfPttSfAkJF8L2NVhBpextjZO4Os6lbAX+hWpWTjg5m2jcOs41oa6yMOacH9qIua9u2bdTipT4LxC+8cNqKu9YX9nDWqHUzGDBfHKItY6O7bG7p21rV27A1Y8QrA9aujWtporXHjTB9LN+5KpEGe5qD4kNxXSxgDP3+UvRZG/ysRrboAaP0TjgJhV4+HQIObY1S7hzBL58YjUMLQGg3wqB13i0ah6Z9ENvqsbvPAotDCwrIN0XiyiTonxOi7Qb06xJQvwyNvZeWmr4x7lYslSkHl+eJ0sMerCAm16y7Ekp0+FZmTPKQtvbRZ7BpsiHzKP6uwrfcqVgD/IlyoPyu28gwbVnxwePf6TIjHOEBSs2Cf6faa0Hp87l3k3S7JhB+qVXg/r5sUJVpbAHWtKsLCFHBuxGwtF31hnKq4wRjkFfhdXMJnMccS+y+RkCrYFLXQd1cUEvuLk3ANuduxR79u/1MEyOMYx9ITeQe/bNmt4Ij/uLY5qOtRPLhl+VgLXkF7a2JxTKNPxpZy4XHA1QesjKBG2DS+KFpDk5aH1rHDcIx199gZ3WMr0US0qdpEs73xtbepyVK4sw0C8ekk7f/ruuFppc1DefObx5lE1A/ODebo6vTIeO8KAgT02ScWD4B9TrZFrrBjWucxyBhaZqOk4+aFNzU4tw3I8d/AOcmvu7MX8D57QSYm7+B853Nd9MG4fwD0MnNWx7EvycAAAAASUVORK5CYII=);\n}\n\n.board .row .o {\n  background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAB9AH0DAREAAhEBAxEB/8QAHAAAAgEFAQAAAAAAAAAAAAAAAAcGAQIEBQgD/8QANhAAAgEDAwIFAgUDAgcAAAAAAQIDAAQRBRIhBjEHEyJBUTJhFCNxgZEVQqEzsRZDUmJywfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AH/QFAUBQFBTI+aALAdyKCjMAOTQAddu7OB96Cu4fNBWgKAoCgKAoCgKAoKZoLWkVe+f4oMC91OCzjWWeVIYzj1SuEDDucE9+ATigXut+N3TOmFBaSyalKUZgbZcID/aCTzz/ighdx4/X8t3CYdLWO2UesM+WJxjI9h++aKyofHYlJxLaqHWHZHJPkmVscelBhcnk5PHagavTvV1hr1ik8U8bFk3O0Z3RocZKlxx6eM7tuciiJDbXkF3EskTZVu3BH/3/ug980FaAoCgKAoCgKDxnuI4BmRlUd/UQKBHda+OMMTSWnTKi4nBZTeSjEa9wNi/3H3BPH60CZ1fXdV6gvDdatfT3cxOQZXOF/8AEdlH6AUVggY+KC4c47fzQXBMnAHtnHzUG00DU59H1KG6Se5SGGRZZYobgxmQA9u+D+47UHTPTXUem6hHC1vcRXN35Z89t43IQoO0+5yThcDnBqolun3f4uBXIAIJU47Ejvj7UGbQFAUBQFAUGHqGpWumWzz3UyxoiM5z8KMmg5c8RPE696yvFgtvMtNNiBAiWT/VbkbicA4I9vjvUVAQBigzLHTbzUrmC2s4fNlncpGNwGSPnJ4/U0G9sukLrUI2nit547JHANxId2VI9O0KMHceAc4/3qiU3Phw1qC9lILkwAxyQvGVd3UrvXkYAHqG4FuOe2aCP9W9K3egJbCSyEQmfmSCQyRE4+jJGQy859sYPaoNYOmNUMwhe2feSqjZh/WwO1Tg8ZAyCM8fNBvOnLvUOk7uG5uyRbSsZHtnwPxBhYqEZj9ILMfnsM8UHQ3S98LvToLyR5PNwWmUYVQ7DcxOMBu4ww4PtVRKIZPMQN8gGg9KAoCgKCyV9iFvYd6DnHxb8RLi+uJtB066kWHJW7AZSrc8BWXOVIwcexzRSjx8+9QbfR+nNW6glZNNsmnwjMzBgFAHfn2P27/tQNPpLw0t9XExKMirGqrfLCV/OyvmRshOGC4I9PAPuT2odVnoVrbKieWuxTvCKSEDc5wvsOe3bPNEbIW0QC+kEqCFYjJGe/NBCtX8P7W4up7lXklhuJmmuLZySrZQhigHZjwCcjIyvvQLGHSdNsdCgtILiR7D13kU5kEEun3CleHJ4Chh2IYrj71FaLXddtbsRpqUi3fmBZLqVGYqVUMUiXklfUwbjHJIbtQSbw66ujezm0u8kH4aG0A3QgrO6KecKSdxLMowCPkDGaBzdOXst1YoZ4/LnKh5kwAY3bLbTjIzgj3qo3dAUBQUPY5oIH4m6vHo3Sd5qauyXkC7bRt3pWUnbnGRuOM/NByag54H7CoqQdP6B/VxLPNKYLW3w0knl7sLn1H74+BkntQNvpbpjVLybCWt9paMyoGCYgaAF/RIMg7wCCCOACB6ucg59PtRZWsdrGsgihGxDIcsQPcn71UZtAUFCKBV+JmkxaXDLfxSi1tL7zRcqpG+S5KYjZdwIywBQjjuPcZopMdRzG21cwXds8Yhja2eCKJI9hC7Sp5bJ5XJJzxgc5NQHSt9cRa1A0DciKMhpmCbERuApxtPcNkg/Heiuh7bXI7OysZ/Mla1u8CNxETJ6VyxI4wDhV4Awf1qspmn0iguoCg85c+WQuCSMc0CN8X7M6lpDzW1lHO8MhaW4SVd6qMKobHL7sgjgD96ikS0TwhN6ldw3AEe2aBleG+l3uuXVmbWQ2ttasyy3UWxmjl7o5RzgnuBgEYPPNB0dpun/hYBmWSWVsGSWQn1tjBIB+kHvgcD4qo2lAUBQFBourNKt9Y6av7O4iaZWjLqiOEbcvK7WOdpz70HLGtbo7KO7ZUuP6hEji4kjYybxnfy5z3DZIGOAO1RWwN3HcWFkU0zPlrcPJBBlhMQ4285yoQuPUMHIAFFPnplfM6dguLy6geW2BAknVM2i7RgPg98ctub4qsptbnNvGfMEmVB3gYDfeg9aAoMe7IW1kbaGIBIB9z7CgTvXFvdS9CTrqFrFbXLbVSyjlDlJGcFirEDO0YyMHB7HvRSZ6sgk/rWUuVvA8fpZDuOFypzgnnKk8ce9QMfw90pbaHSE1S68uKa4drExKd0uMEqroeWJY5B7KpI+1HQ0X+kvqzgd6IvoCgKAoNP1FLHBod+8s3kqIX9e8pt9Pfdj0/Y0HJ2vPFHBZ6ckdyptrfe34pESZWc7whI+pfUGz39WfaorOt7qBtsE1r5lu+xHeGERLIoUMyFPdiVA9iRz3xQOfpppYNA02306yuJjIsplSe3Mc0XpCl8MeRuJUZwCD34NVDPtldbaNZCpdVAbYuBnHsPag9aAoPC7QNbODnGPYZoFXNBFHp7aBY6bd21rcMYlmaA+TLjO6TcDwScYyxLbTkCopTa/ocWhzQREIWhu/wrzgYlQBQWyqnDDaSVOBx9+AE66e1aMaZpguAJJ47hbcu4BtZIyfykjX+18HzBwDxycNigdelXovtNguEtri1V1yILmPZIgz/cuTiqjPoCgKAoIH4pa5PoXSzvbiEmRx5kcin82PPrUHsMjjPJweBmg531WWTVr5L+SCQeYqsVeP6iSWbLZ9XfjP8Abge1RpIdE0q9urq41ONrGHUbVlMcco9IlkGEDA+ldgUnccjLKM0Q8dIs0to7WCRHZZRlBcMdyhcYKFRzltzYY55NVEwQ5XP3oLqAoKN9J4zQLbqSAjXLOKK3SOIxyAzvJ6IgrKMrGSApBwQw7Mfg0VAOt9J0+1u1ayNrNFM0afiprjfNI3q34OMtuO5TtACkqfsIIPZ6lMPw2nx2ENtZwkyMrsWjBduDMfcKu5fVngn7UHRHQ15eziUz6gtwGCvJasVZrXdjaqsoAMeASOOQRgnmqic0BQFBjXNwtuy7nwWO1E92PwPk0HP3il1BHNqIjuZLa7bCtJAm6J0wfTHIuTxncSRz25wRUVDl6oU2k0BsLfzLghWlHAiHJIjj7LgdjzgjnNFTGbrPS+n+nC40yRried5ba2uh+bOpIImmyeBj09vURkY70RKPCp9Z6u1SbqvVppUtIS8dlbIfyizDbIxzyT2HPckmqacCdv3oi6gKCjcqaDS6nYx3WUkQFWbfgkorNggb8fUoAJwT8faghWv6Va6lYwWF3ewWse5BDFHGu2NR9LJjPqJUsPYqdjdwailFLbR9QajqE01zJNa6cQJLhY1gYocgL5eASuR2xlRnHegkemH8ANNu9StmiSDM6yI7LCkTMVBV1JMYGDsVxjcT2oGJaeLPTg3wyy3O6EDeQqybRz3ZSVJAUkkH/PFVGDP449PzEQ6LY6jqd0zbY41i8pSf1PP8A0Ez0XUdQvbCO81BI7d3TeLWNSSg/wC4nk/pgfpQL7xJ62ksoTbW1zZGQem4s7gZUgAMyFxyrEEDHBINFIS5Mk0st1I0jeY+5mc7jk84Le5FQW299NZTie3bZKFKq+BlcjGR8HHvQSzofoy5601RnvnlEEgybhwxL4POPk4BAycZH7UV1LpGnW+laZb2NrCkUEEYRERcAAVWWdQFAUAe1Bi3Fv5qOpYruUpuU4IBHcfB+9AturbT+kGS8EFxeGQGBbcB2WSRsDczf8oBR9S45OQRRUD1vVTCs6kSw6mkY2XD3CQNEpGEjDqQJO5LE5zwcc1AvpOrdXa0lso72QWMkIha2B/LK/O3tu+4++O9Bo8dx2GMUVN+hta6f6club69u7o3bQmJAlru2hiNxQhgc8AZyMURMdb8abaPSRb9O2siTyqY5XnLKyKAAhBBPqHP+/vQKi81W4voYYpGxHAW8tfjcckk9ySe5PwKDGmu5ZYIYnkLRQgiNSeEycnFFSnoXoibqy7kuLmU2umW+DJO6nZI24ZjDe3ByT7UR0n0r0zbaHH+TE0Me0CO23lkhGSfTknBOeefYVUSigKAoCgKCjDIxQYdzH6cADABBB7EfBHxQKzrLoq31dT+OuvKCn8u3t42eT1Yzk5OcLwpOByR7CopO/8AA2qzbEt7MPMAXmSK4DmJcA+r2GB35OM4oNRq+hXmjTlJxG0fBWSORXVgeRyD8UVrQcUBn5/mgCfigk/SnQup9WXkCwMIbNhmS5YcIc4KjPdgfaiOhOk+jIdLsdPAiike0TbAxZiIVY5Zh7Mxz9RHOPbGKqJ8q7cUF1AUBQFAUBQWsobvQa+709ZVZEJjRuXCAZcc5Bz7H+aCLar0va31nBE+lwTmJ0eCCXCbmTuTnOFKgZABPOfmgX3VvhtFLI+64l/qV3I7BSjeUSMsX3YY7UXaoHGTUVDF8JNdmVltbvT7idRuMUc+WPG7gY/6cHJIyDxQq+w8Idc1B3iimieVHHKq/lNGcAOspAU5J+kc4B+2RUw6e8CXhDPrMglcthVQ42YP7gg+kg9xzxVKbOmdOw2ITyFSBFO7bCAFckY547D2xjFESBY0QAKoA74FBfQFAUBQFAUBQFAYB9qDzMSlw+Bke5FB4rAUbCsduTkd85OaCqwhTny0GVAyqjINB5tFKVRd4RV9wP8AGKDIEeSWPPwPig9Aq47D+KCtAUBQFAUBQFAUBQFAUBQFAUBQFAUBQFAUBQFB/9k=);\n}\n\n.board .row .x,\n.board .row .o {\n  cursor: default;\n  background-size: 100px 100px;\n  background-repeat: no-repeat;\n}\n\n\n.board .row::after {\n  content: \" \";\n  clear: both;\n  display: table;\n}\n\n\n.board .row .tile:hover {\n  background-color: rgb(210, 210, 210);\n}\n"

/***/ },
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(4);
	var shadowDomInjectables_1 = __webpack_require__(241);
	var angular2_2 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var services_1 = __webpack_require__(240);
	var app_1 = __webpack_require__(222);
	var universalInjectables = [
	    angular2_2.httpInjectables,
	    angular2_2.formInjectables,
	    router_1.routerInjectables,
	    services_1.appServicesInjectables
	];
	var platformInjectables = [
	    shadowDomInjectables_1.nativeShadowDomInjectables
	];
	angular2_1.bootstrap(app_1.App, [
	    universalInjectables,
	    platformInjectables
	]);
	//# sourceMappingURL=bootstrap.js.map

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var angular2_2 = __webpack_require__(4);
	var router_2 = __webpack_require__(18);
	var directives_1 = __webpack_require__(100);
	var pipes_1 = __webpack_require__(239);
	var home_1 = __webpack_require__(224);
	var dashboard_1 = __webpack_require__(223);
	var todo_1 = __webpack_require__(235);
	var rxjs_examples_1 = __webpack_require__(229);
	var styles = __webpack_require__(211);
	var App = (function () {
	    function App() {
	        this.name = 'angular';
	    }
	    App = __decorate([
	        angular2_1.Component({
	            selector: 'app',
	            viewInjector: [pipes_1.appPipes]
	        }),
	        angular2_1.View({
	            directives: [
	                angular2_2.coreDirectives,
	                angular2_2.formDirectives,
	                router_2.routerDirectives,
	                directives_1.appDirectives
	            ],
	            styles: [styles],
	            template: "\n    <header>\n      <div layout=\"row\" class=\"top-nav ac-default-theme\">\n        <img src=\"angular-shield.png\" alt=\"Angular2\" height=\"54\" width=\"54\">\n        <span class=\"logo\">{{ name | capitalize }} + Webpack</span>\n        <ul>\n          <li class=\"l-left\">\n            <a [router-link]=\" ['/home'] \"class=\"top-nav-button ac-default-theme\">Home</a>\n          </li>\n          <li class=\"l-left\">\n            <a [router-link]=\" ['/dashboard'] \"class=\"top-nav-button ac-default-theme\">Dashboard</a>\n          </li>\n          <li class=\"l-left\">\n            <a [router-link]=\" ['/todo'] \"class=\"top-nav-button ac-default-theme\">Todo</a>\n          </li>\n          <li class=\"l-left\">\n            <a [router-link]=\" ['/rxjs-examples', 'search'] \"class=\"top-nav-button ac-default-theme\">RxJs Examples</a>\n          </li>\n        </ul>\n      </div>\n    </header>\n\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n    <footer>\n      WebPack Angular 2 Starter by <a href=\"https://twitter.com/AngularClass\">@AngularClass</a>\n    </footer>\n  "
	        }),
	        router_1.RouteConfig([
	            { path: '/', as: 'home', component: home_1.Home },
	            { path: '/dashboard', as: 'dashboard', component: dashboard_1.Dashboard },
	            { path: '/todo', as: 'todo', component: todo_1.Todo },
	            { path: '/rxjs-examples/...', as: 'rxjs-examples', component: rxjs_examples_1.RxJsExamples }
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], App);
	    return App;
	})();
	exports.App = App;
	//# sourceMappingURL=app.js.map

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var XLarge = (function () {
	    function XLarge(el) {
	        this.el = el;
	        if (this.el.nativeElement.style) {
	            this.el.nativeElement.style.fontSize = 'x-large';
	        }
	    }
	    XLarge = __decorate([
	        angular2_1.Directive({
	            selector: '[x-large]'
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], XLarge);
	    return XLarge;
	})();
	var Dashboard = (function () {
	    function Dashboard() {
	    }
	    Dashboard = __decorate([
	        angular2_1.Component({
	            selector: 'dashboard'
	        }),
	        angular2_1.View({
	            directives: [XLarge],
	            template: "\n  <style>\n    span[x-large] {\n      color: red;\n    }\n  </style>\n  <div>\n    <h2>Dashboard</h2>\n    <span x-large>Extra Large Font Directive</span>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Dashboard);
	    return Dashboard;
	})();
	exports.Dashboard = Dashboard;
	//# sourceMappingURL=dashboard.js.map

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var directives_1 = __webpack_require__(100);
	var styles = __webpack_require__(212);
	var template = __webpack_require__(213);
	var Home = (function () {
	    function Home() {
	    }
	    Home = __decorate([
	        angular2_1.Component({
	            selector: 'home'
	        }),
	        angular2_1.View({
	            directives: [directives_1.angularDirectives, directives_1.appDirectives],
	            styles: [styles],
	            template: template
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Home);
	    return Home;
	})();
	exports.Home = Home;
	//# sourceMappingURL=home.js.map

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Github_1 = __webpack_require__(155);
	var Rx = __webpack_require__(99);
	var Autosuggest = (function () {
	    function Autosuggest(el, github) {
	        this.el = el;
	        this.github = github;
	        this.term = new angular2_1.EventEmitter();
	        this.loading = new angular2_1.EventEmitter();
	    }
	    Autosuggest.prototype.onInit = function () {
	        var _this = this;
	        Rx.Observable.fromEvent(this.el.nativeElement, 'keyup').
	            map(function (e) { return e.target.value; }).
	            filter(function (text) { return text.length > 2; }).
	            debounce(250).
	            distinctUntilChanged().
	            do(function () { return _this.loading.next(true); }).
	            flatMapLatest(function (query) { return _this.github.search(query); }).
	            subscribe(function (repos) {
	            _this.loading.next(false);
	            _this.term.next(repos);
	        }, function (err) {
	            console.log(err);
	            _this.loading.next(false);
	            _this.term.next(['ERROR, see console']);
	        }, function () {
	            console.log('complete');
	            _this.loading.next(false);
	        });
	    };
	    Autosuggest = __decorate([
	        angular2_1.Directive({
	            selector: 'input[type=text][autosuggest]',
	            lifecycle: [angular2_1.LifecycleEvent.onInit],
	            events: ['term', 'loading']
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef, Github_1.Github])
	    ], Autosuggest);
	    return Autosuggest;
	})();
	exports.Autosuggest = Autosuggest;
	//# sourceMappingURL=autosuggest.js.map

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var autosuggest_1 = __webpack_require__(225);
	var Search = (function () {
	    function Search() {
	        this.repos = [];
	        this.loading = false;
	    }
	    Search.prototype.showResults = function (results) {
	        this.repos = results;
	    };
	    Search = __decorate([
	        angular2_1.Component({
	            selector: 'search-github'
	        }),
	        angular2_1.View({
	            directives: [angular2_1.coreDirectives, angular2_1.formDirectives, autosuggest_1.Autosuggest],
	            template: "\n  <div style=\"padding: 0 16px;\">\n    <h2>Search Github repos</h2>\n\n    <section>\n\n      <input\n        autosuggest\n        (term)=\"showResults($event)\"\n        (loading)=\"loading = $event\"\n        type=\"text\"\n        autofocus>\n      <img\n        style=\"width: 20px;position: absolute;\"\n        [hidden]=\"!loading\"\n        src=\"https://www.brown.edu/sites/default/themes/pawtuxet/img/loader-larger.gif\">\n\n    </section>\n\n    <section>\n\n      <div *ng-for=\"#repo of repos\" style=\"padding: 0.5em 0.5em 0.5em 0;\">\n        <a [href]=\"repo.html_url\" target=\"_blank\">\n          {{ repo.owner.login }}/<b>{{ repo.name }}</b>\n        </a>\n      </div>\n\n    </section>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Search);
	    return Search;
	})();
	exports.Search = Search;
	//# sourceMappingURL=search.js.map

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Rx = __webpack_require__(99);
	var DragElement = (function () {
	    function DragElement(el) {
	        var _this = this;
	        this.el = el;
	        this.mouseup = this._fromDOMSource('mouseup', this.el.nativeElement);
	        this.mousemove = this._fromDOMSource('mousemove', window.document);
	        this.mousedown = this._fromDOMSource('mousedown', this.el.nativeElement).
	            map(function (event) {
	            event.preventDefault();
	            var clientY = event.clientY, clientX = event.clientX;
	            return {
	                left: clientX - _this.el.nativeElement.getBoundingClientRect().left,
	                top: clientY - _this.el.nativeElement.getBoundingClientRect().top,
	            };
	        });
	        this.mousedrag = this.mousedown.
	            selectMany(function (imageOffset) {
	            return _this.mousemove.map(function (pos) {
	                var clientY = pos.clientY, clientX = pos.clientX;
	                var top = imageOffset.top, left = imageOffset.left;
	                return {
	                    top: clientY - top,
	                    left: clientX - left
	                };
	            }).takeUntil(_this.mouseup);
	        });
	        this.mousedrag.subscribe(function (pos) {
	            var top = pos.top, left = pos.left;
	            var style = _this.el.nativeElement.style;
	            style.top = top + 'px';
	            style.left = left + 'px';
	        });
	    }
	    DragElement.prototype._fromDOMSource = function (eventName, nativeElement) {
	        return Rx.Observable.fromEventPattern(function (callback) { return nativeElement.addEventListener(eventName, callback, false); }, function (callback) { return nativeElement.removeEventListener(eventName, callback); });
	    };
	    DragElement = __decorate([
	        angular2_1.Directive({
	            selector: '[drag-element]',
	            host: {}
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], DragElement);
	    return DragElement;
	})();
	exports.DragElement = DragElement;
	//# sourceMappingURL=drag_element.js.map

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var drag_element_1 = __webpack_require__(227);
	var DraggableDiv = (function () {
	    function DraggableDiv() {
	    }
	    DraggableDiv = __decorate([
	        angular2_1.Component({
	            selector: 'draggable-div'
	        }),
	        angular2_1.View({
	            directives: [drag_element_1.DragElement],
	            template: "\n    <style>\n    [drag-element] {\n      -webkit-transform: translate3d(0, 0, 0);\n      -moz-transform: translate3d(0, 0, 0);\n      -ms-transform: translate3d(0, 0, 0);\n      transform: translate3d(0, 0, 0);\n      background-image: url(https://cdn.rawgit.com/Reactive-Extensions/rx.angular.js/master/examples/draganddrop/logo.png);\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: contain;\n      height: 200px;\n      width: 200px;\n      color: #000000;\n      border: 1px solid #666666;\n      padding: 10px;\n      position: fixed;\n      cursor: move;\n    }\n  </style>\n\n  <div drag-element>\n    Draggable Div\n  </div>\n\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DraggableDiv);
	    return DraggableDiv;
	})();
	exports.DraggableDiv = DraggableDiv;
	//# sourceMappingURL=draggable_div.js.map

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var search_1 = __webpack_require__(226);
	var timeflies_1 = __webpack_require__(234);
	var tictactoe_1 = __webpack_require__(232);
	var draggable_div_1 = __webpack_require__(228);
	var RxJsExamples = (function () {
	    function RxJsExamples() {
	        this.active = 0;
	    }
	    RxJsExamples = __decorate([
	        angular2_1.Component({
	            selector: 'rxjs-examples'
	        }),
	        router_1.RouteConfig([
	            { path: '/', redirectTo: '/search' },
	            { path: '/search', as: 'search', component: search_1.Search },
	            { path: '/timeflies', as: 'timeflies', component: timeflies_1.Timeflies },
	            { path: '/tictactoe', as: 'tictactoe', component: tictactoe_1.Tictactoe },
	            { path: '/draggable_div', as: 'draggable_div', component: draggable_div_1.DraggableDiv }
	        ]),
	        angular2_1.View({
	            directives: [router_1.routerDirectives, angular2_1.CSSClass],
	            styles: [__webpack_require__(214)],
	            template: "\n  <div layout=\"row\">\n    <nav class=\"side-nav l-pinned-left l-layer-4 l-offset-nav\">\n      <ul class=\"rxjs-menu\">\n        <li>\n          <a class=\"ac-button ac-default-theme\"\n             [router-link]=\" ['./search'] \"\n             (click)=\"active = 0\"\n             [class.active]=\"active === 0\">\n            Search Github\n          </a>\n        </li>\n        <li>\n          <a class=\"ac-button md-default-theme\"\n             [router-link]=\" ['./timeflies'] \"\n             (click)=\"active = 1\"\n             [class.active]=\"active === 1\">Timeflies</a>\n        </li>\n        <li>\n          <a class=\"ac-button md-default-theme\"\n             [router-link]=\" ['./tictactoe'] \"\n             (click)=\"active = 2\"\n             [class.active]=\"active === 2\">Tic tac toe</a>\n        </li>\n        <li>\n          <a class=\"ac-button md-default-theme\"\n             [router-link]=\" ['./draggable_div'] \"\n             (click)=\"active = 3\"\n             [class.active]=\"active === 3\">Drag Element</a>\n        </li>\n      </ul>\n    </nav>\n\n    <div layout=\"column\" class=\"wide\">\n      <div class=\"rxjs-content\">\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], RxJsExamples);
	    return RxJsExamples;
	})();
	exports.RxJsExamples = RxJsExamples;
	//# sourceMappingURL=rxjs-examples.js.map

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Game = (function () {
	    function Game() {
	        this.board = [
	            ['', '', ''],
	            ['', '', ''],
	            ['', '', '']
	        ];
	        this.plays = [];
	    }
	    Game.create = function () {
	        return new Game();
	    };
	    Game.prototype.dispose = function () {
	        this.board = null;
	        this.plays = null;
	    };
	    Game.prototype.play = function (coord) {
	        var x = coord.x, y = coord.y;
	        if (!this.gameover && this.board[x][y] === '') {
	            this.board[x][y] = this.player;
	        }
	        this.plays.push(coord);
	    };
	    Object.defineProperty(Game.prototype, "player", {
	        get: function () {
	            return ['x', 'o'][this.plays.length % 2];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Game.prototype, "gameover", {
	        get: function () {
	            return this.draw || this.winner !== '';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Game.prototype, "winner", {
	        get: function () {
	            return getWinnerFromBoard(this.board);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Game.prototype, "draw", {
	        get: function () {
	            return this.plays.length === 9;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Game = __decorate([
	        angular2_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Game);
	    return Game;
	})();
	exports.Game = Game;
	function getWinnerFromBoard(board) {
	    var allWinningLists = [].concat(board, zip(board), diagonals(board));
	    return allWinningLists.reduce(getWinnerFromList, '');
	}
	function getWinnerFromList(winner, list) {
	    if (winner)
	        return winner;
	    if (list.every(function (s) { return s == 'o'; }))
	        return 'o';
	    if (list.every(function (s) { return s == 'x'; }))
	        return 'x';
	    return '';
	}
	function zip(arrays) {
	    return arrays[0].map(function (_, i) { return arrays.map(function (array) { return array[i]; }); });
	}
	function diagonals(rows) {
	    return [
	        rows.map(function (row, index) { return row[index]; }),
	        rows.map(function (row, index) { return row[row.length - 1 - index]; })
	    ];
	}
	//# sourceMappingURL=Game.js.map

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Board = (function () {
	    function Board() {
	        this.select = new angular2_1.EventEmitter();
	    }
	    Board = __decorate([
	        angular2_1.Component({
	            selector: 'board',
	            properties: ['board'],
	            events: ['select']
	        }),
	        angular2_1.View({
	            directives: [angular2_1.coreDirectives],
	            styles: [
	                __webpack_require__(215)
	            ],
	            template: "\n    <div class=\"board\">\n      <div *ng-for=\"#row of board; #x=index\" class=\"row\">\n        <div *ng-for=\"#tile of row; #y=index\">\n          <div class=\"tile\"\n               [class.x]=\"tile=='x'\"\n               [class.o]=\"tile=='o'\"\n               (click)=\"select.next({x: x, y: y})\">\n          </div>\n        </div>\n      </div>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Board);
	    return Board;
	})();
	exports.Board = Board;
	//# sourceMappingURL=board.js.map

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Game_1 = __webpack_require__(230);
	var board_1 = __webpack_require__(231);
	var Tictactoe = (function () {
	    function Tictactoe(game) {
	        this.game = game;
	    }
	    Tictactoe.prototype.reset = function () {
	        this.game.dispose();
	        this.game = Game_1.Game.create();
	    };
	    Tictactoe = __decorate([
	        angular2_1.Component({
	            selector: 'tictactoe',
	            viewInjector: [Game_1.Game]
	        }),
	        angular2_1.View({
	            directives: [angular2_1.coreDirectives, board_1.Board],
	            template: "\n  <div style=\"padding: 0 16px;\">\n    <h1>Tic Tac Toe</h1>\n    <h2 *ng-if=\"game.winner\">{{ game.winner }} won!</h2>\n    <h2 *ng-if=\"game.draw\">draw</h2>\n    <button (click)=\"reset()\">reset</button>\n    <board [board]=\"game.board\" (select)=\"game.play($event)\"></board>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [Game_1.Game])
	    ], Tictactoe);
	    return Tictactoe;
	})();
	exports.Tictactoe = Tictactoe;
	//# sourceMappingURL=tictactoe.js.map

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Message = (function () {
	    function Message() {
	        this.message = ('TIME FLIES LIKE AN ARROW').split('');
	    }
	    Message = __decorate([
	        angular2_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Message);
	    return Message;
	})();
	exports.Message = Message;
	//# sourceMappingURL=Message.js.map

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var Message_1 = __webpack_require__(233);
	var Rx = __webpack_require__(99);
	var Observable = Rx.Observable;
	var Timeflies = (function () {
	    function Timeflies(service, el, zone) {
	        this.service = service;
	        this.el = el;
	        this.zone = zone;
	        this.pos = 'absolute';
	        this.color = 'red';
	        this.letters = this.service.message.map(function (val, idx) { return ({
	            text: val,
	            top: 100,
	            left: (idx * 20 + 50),
	            index: idx
	        }); });
	    }
	    Timeflies.prototype.onInit = function () {
	        var _this = this;
	        this.zone.runOutsideAngular(function () {
	            Observable.fromEvent(_this.el.nativeElement, 'mousemove').
	                map(function (e) {
	                //var offset = getOffset(this.el);
	                var o = _this.el.nativeElement.getBoundingClientRect();
	                return {
	                    offsetX: e.clientX - o.left,
	                    offsetY: e.clientY - o.top
	                };
	            }).
	                flatMap(function (delta) {
	                return Observable.fromArray(_this.letters.map(function (val, index) { return ({
	                    letter: val.text,
	                    delta: delta,
	                    index: index
	                }); }));
	            }).
	                flatMap(function (letterConfig) {
	                return Observable.timer((letterConfig.index + 1) * 100).map(function () { return ({
	                    text: letterConfig.letter,
	                    top: letterConfig.delta.offsetY,
	                    left: letterConfig.delta.offsetX + letterConfig.index * 20 + 20,
	                    index: letterConfig.index
	                }); });
	            }).
	                subscribe(function (letterConfig) {
	                //console.log(letterConfig, this.letters);
	                _this.zone.run(function () { return _this.letters[letterConfig.index] = letterConfig; });
	            });
	        });
	    };
	    Timeflies = __decorate([
	        angular2_1.Component({
	            selector: 'timeflies',
	            lifecycle: [angular2_1.LifecycleEvent.onInit],
	            hostInjector: [Message_1.Message]
	        }),
	        angular2_1.View({
	            directives: [angular2_1.coreDirectives],
	            template: "\n  <div style=\"background-color: papayawhip; height: 500px;\">\n    <span *ng-for=\"#letter of letters\"\n          [style.color]=\"color\"\n          [style.left]=\"letter.left + 'px'\"\n          [style.top]=\"letter.top + 'px'\"\n          [style.position]=\"pos\">\n      {{ letter.text }}\n    </span>\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [Message_1.Message, angular2_1.ElementRef, angular2_1.NgZone])
	    ], Timeflies);
	    return Timeflies;
	})();
	exports.Timeflies = Timeflies;
	//# sourceMappingURL=timeflies.js.map

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var angular2_1 = __webpack_require__(4);
	var forms_1 = __webpack_require__(59);
	var directives_1 = __webpack_require__(100);
	var TodoService_1 = __webpack_require__(156);
	var Todo = (function () {
	    function Todo(formBuilder, todoService) {
	        this.formBuilder = formBuilder;
	        this.todoService = todoService;
	        this.todoForm = formBuilder.group({
	            'todo': ['', forms_1.Validators.required]
	        });
	        this.todoInput = this.todoForm.controls.todo;
	    }
	    Todo.prototype.addTodo = function (event, todo) {
	        event.preventDefault();
	        this.todoService.add(todo);
	        this.todoInput.updateValue('');
	    };
	    Todo.prototype.removeTodo = function (event, index) {
	        event.preventDefault();
	        this.todoService.remove(index);
	    };
	    Todo = __decorate([
	        angular2_1.Component({
	            selector: 'todo'
	        }),
	        angular2_1.View({
	            directives: [directives_1.angularDirectives, directives_1.appDirectives],
	            template: "\n  <style>\n    .error-message {\n      color: red;\n    }\n    form {\n      padding:16px;\n    }\n  </style>\n  <form\n    [ng-form-model]=\"todoForm\"\n    (submit)=\"todoForm.valid && addTodo($event, todoInput.value)\"\n    novalidate\n  >\n    <input type=\"text\" [ng-form-control]=\"todoInput\" autofocus>\n\n    <button>Add Todo</button>\n\n    <span class=\"error-message\" *ng-if=\"\n      todoForm.errors?.required &&\n      todoForm.dirty &&\n      todoForm.controls?.todo?.touched\n    \">\n      Todo is required\n    </span>\n\n  </form>\n\n  <ul>\n    <li *ng-for=\"var todo of todoService.get('todos'); var $index = index\">\n      <p>\n        {{ todo.value }}\n        <br>\n        <button (click)=\"removeTodo($event, $index)\">[Remove]</button>\n        <small>{{ todo.created_at }}</small>\n      </p>\n    </li>\n  </ul>\n  "
	        }), 
	        __metadata('design:paramtypes', [angular2_1.FormBuilder, TodoService_1.TodoService])
	    ], Todo);
	    return Todo;
	})();
	exports.Todo = Todo;
	//# sourceMappingURL=todo.js.map

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/// <reference path="../../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(4);
	var Autofocus = (function () {
	    function Autofocus(el) {
	        this.el = el;
	        if (this.el.nativeElement.focus) {
	            this.el.nativeElement.focus();
	        }
	    }
	    Autofocus = __decorate([
	        angular2_1.Directive({
	            selector: '[autofocus]'
	        }), 
	        __metadata('design:paramtypes', [angular2_1.ElementRef])
	    ], Autofocus);
	    return Autofocus;
	})();
	exports.Autofocus = Autofocus;
	//# sourceMappingURL=Autofocus.js.map

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(4);
	function isString(txt) {
	    return typeof txt === 'string';
	}
	exports.isString = isString;
	var CapitalizePipe = (function () {
	    function CapitalizePipe() {
	        this.regexp = /([^\W_]+[^\s-]*) */g;
	    }
	    CapitalizePipe.prototype.supports = function (txt) {
	        return isString(txt);
	    };
	    CapitalizePipe.prototype.transform = function (value, args) {
	        return (!value) ? '' :
	            (!args) ?
	                this.capitalizeWord(value) :
	                value.replace(this.regexp, this.capitalizeWord);
	    };
	    CapitalizePipe.prototype.capitalizeWord = function (txt) {
	        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    };
	    CapitalizePipe.prototype.onDestroy = function () {
	    };
	    return CapitalizePipe;
	})();
	exports.CapitalizePipe = CapitalizePipe;
	var CapitalizeFactory = (function () {
	    function CapitalizeFactory() {
	    }
	    CapitalizeFactory.prototype.supports = function (txt) {
	        return isString(txt);
	    };
	    CapitalizeFactory.prototype.create = function (cdRef) {
	        return new CapitalizePipe();
	    };
	    return CapitalizeFactory;
	})();
	exports.CapitalizeFactory = CapitalizeFactory;
	exports.capitalize = [new CapitalizeFactory(), new angular2_1.NullPipeFactory()];
	//# sourceMappingURL=CapitalizePipe.js.map

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var pipes_1 = __webpack_require__(165);
	var change_detection_1 = __webpack_require__(104);
	function isObservable(obs) {
	    return obs && typeof obs.subscribe === 'function';
	}
	exports.isObservable = isObservable;
	var RxPipe = (function (_super) {
	    __extends(RxPipe, _super);
	    function RxPipe(ref) {
	        _super.call(this, ref);
	    }
	    RxPipe.prototype.supports = function (obs) { return isObservable(obs); };
	    RxPipe.prototype._subscribe = function (obs) {
	        var _this = this;
	        this._observable = obs;
	        this._subscription = obs.subscribe(function (value) { return _this._updateLatestValue(value); }, function (e) { throw e; });
	    };
	    RxPipe.prototype.transform = function (value, args) {
	        return _super.prototype.transform.call(this, value, args);
	    };
	    RxPipe.prototype.onDestroy = function () {
	        return _super.prototype.onDestroy.call(this);
	    };
	    return RxPipe;
	})(pipes_1.ObservablePipe);
	exports.RxPipe = RxPipe;
	var RxPipeFactory = (function () {
	    function RxPipeFactory() {
	    }
	    RxPipeFactory.prototype.supports = function (obs) { return isObservable(obs); };
	    RxPipeFactory.prototype.create = function (cdRef) { return new RxPipe(cdRef); };
	    return RxPipeFactory;
	})();
	exports.RxPipeFactory = RxPipeFactory;
	exports.rxAsync = [new RxPipeFactory()].concat(change_detection_1.async);
	//# sourceMappingURL=RxPipe.js.map

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var change_detection_1 = __webpack_require__(12);
	var CapitalizePipe_1 = __webpack_require__(237);
	var RxPipe_1 = __webpack_require__(238);
	exports.appPipes = [
	    change_detection_1.Pipes.extend({
	        'async': RxPipe_1.rxAsync,
	        'capitalize': CapitalizePipe_1.capitalize
	    })
	];
	//# sourceMappingURL=pipes.js.map

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings/_custom.d.ts" />
	var TodoService_1 = __webpack_require__(156);
	var Github_1 = __webpack_require__(155);
	exports.appServicesInjectables = [
	    Github_1.githubInjectables,
	    TodoService_1.todoInjectables,
	];
	//# sourceMappingURL=services.js.map

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/_custom.d.ts" />
	var render_1 = __webpack_require__(43);
	var angular2_1 = __webpack_require__(4);
	var browser_1 = __webpack_require__(183);
	var dom_renderer_1 = __webpack_require__(88);
	function hasNativeShadowDom() {
	    return Boolean(browser_1.document && browser_1.document.body && browser_1.document.body.createShadowRoot);
	}
	exports.hasNativeShadowDom = hasNativeShadowDom;
	exports.emulatedScopedShadowDomInjectables = [
	    angular2_1.bind(render_1.ShadowDomStrategy).toFactory(function (doc) {
	        return new render_1.EmulatedScopedShadowDomStrategy(doc.body);
	    }, [dom_renderer_1.DOCUMENT_TOKEN])
	];
	exports.nativeShadowDomInjectables = hasNativeShadowDom() ? [
	    angular2_1.bind(render_1.ShadowDomStrategy).toClass(render_1.NativeShadowDomStrategy)
	] : exports.emulatedScopedShadowDomInjectables;
	exports.emulatedUnscopedShadowDomInjectables = [
	    angular2_1.bind(render_1.ShadowDomStrategy).toFactory(function (doc) {
	        return new render_1.EmulatedUnscopedShadowDomStrategy(doc.body);
	    }, [dom_renderer_1.DOCUMENT_TOKEN])
	];
	//# sourceMappingURL=shadowDomInjectables.js.map

/***/ }
]);
//# sourceMappingURL=app.js.map
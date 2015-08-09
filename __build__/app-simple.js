webpackJsonp([3,0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(220);


/***/ },

/***/ 10:
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

/***/ 15:
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

/***/ 16:
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

/***/ 18:
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

/***/ 23:
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

/***/ 24:
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

/***/ 25:
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

/***/ 34:
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

/***/ 35:
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

/***/ 36:
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

/***/ 37:
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

/***/ 38:
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

/***/ 39:
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

/***/ 40:
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

/***/ 41:
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

/***/ 91:
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

/***/ 92:
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

/***/ 93:
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

/***/ 94:
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

/***/ 95:
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

/***/ 96:
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

/***/ 97:
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

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/_custom.d.ts" />
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
	var angular2_2 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var App = (function () {
	    function App(http) {
	        this.http = http;
	        this.data = [];
	        this.name = 'Angular 2';
	        this.getData();
	    }
	    App.prototype.getData = function () {
	        // npm install express connect-history-api-fallback morgan body-parser
	        // npm run express
	        var _this = this;
	        this.http.
	            get('/api/todos', {
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            }
	        }).
	            toRx().
	            map(function (res) { return res.json(); }).
	            subscribe(function (data) { return _this.serverData(data); }, function (err) { return _this.errorMessage(err); });
	    };
	    App.prototype.serverData = function (data) {
	        console.log('data', data);
	        this.data = data;
	    };
	    App.prototype.errorMessage = function (err) {
	        if (err && (/Unexpected token/).test(err.message)) {
	            console.info('\n' + " // You must run these commands for the Http API to work " + '\n' + " npm install express connect-history-api-fallback morgan body-parser " + '\n' + " npm run express\n      ");
	        }
	    };
	    App = __decorate([
	        angular2_1.Component({
	            selector: 'app'
	        }),
	        angular2_1.View({
	            directives: [angular2_2.coreDirectives, angular2_2.formDirectives, router_1.routerDirectives],
	            template: "\n  <style>\n    .title { font-family: Arial, Helvetica, sans-serif; }\n  </style>\n\n  <header>\n    <h1 class=\"title\">Hello {{ name }}</h1>\n  </header>\n\n  <main>\n    Your Content Here\n    <div>\n      <input type=\"text\" [(ng-model)]=\"name\" autofocus>\n    </div>\n    <pre>data = {{ data | json }}</pre>\n  </main>\n\n  <footer>\n    WebPack Angular 2 Starter by <a href=\"https://twitter.com/AngularClass\">@AngularClass</a>\n  </footer>\n  "
	        }), 
	        __metadata('design:paramtypes', [angular2_1.Http])
	    ], App);
	    return App;
	})();
	exports.App = App;
	//# sourceMappingURL=app.js.map

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/_custom.d.ts" />
	var angular2_1 = __webpack_require__(4);
	var angular2_2 = __webpack_require__(4);
	var router_1 = __webpack_require__(18);
	var app_1 = __webpack_require__(219);
	angular2_1.bootstrap(app_1.App, [angular2_2.httpInjectables, angular2_2.formInjectables, router_1.routerInjectables]);
	//# sourceMappingURL=bootstrap.js.map

/***/ }

});
//# sourceMappingURL=app-simple.js.map
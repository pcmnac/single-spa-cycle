'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = singleSpaCycle;

var _run = require('@cycle/run');

var _dom = require('@cycle/dom');

var defaultOpts = {
	// required opts
	drivers: null,
	rootComponent: null,
	domElementGetter: null
};

function singleSpaCycle(userOpts) {
	if ((typeof userOpts === 'undefined' ? 'undefined' : _typeof(userOpts)) !== 'object') {
		throw new Error('single-spa-cycle requires a configuration object');
	}

	var opts = _extends({}, defaultOpts, userOpts);

	if (!opts.drivers) {
		throw new Error('single-spa-cycle must be passed opts.drivers');
	}

	if (!opts.rootComponent) {
		throw new Error('single-spa-cycle must be passed opts.rootComponent');
	}

	if (!opts.domElementGetter) {
		throw new Error('single-spa-cycle must be passed opts.domElementGetter function');
	}

	return {
		bootstrap: bootstrap.bind(null, opts),
		mount: mount.bind(null, opts),
		unmount: unmount.bind(null, opts)
	};
}

function bootstrap(opts) {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

var dispose = void 0;

function mount(opts) {
	return new Promise(function (resolve, reject) {
		dispose = (0, _run.run)(opts.rootComponent, _extends({}, opts.drivers, { DOM: (0, _dom.makeDOMDriver)(getRootDomEl(opts)) }));
		resolve();
	});
}

function unmount(opts) {
	return new Promise(function (resolve, reject) {
		if (dispose) {
			dispose();
			dispose = null;
		}
		resolve();
	});
}

function getRootDomEl(opts) {
	var el = opts.domElementGetter();
	if (!el) {
		throw new Error('single-spa-cycle: domElementGetter function did not return a valid dom element');
	}

	return el;
}
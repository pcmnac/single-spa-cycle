import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'

const defaultOpts = {
	// required opts
	drivers: null,
	rootComponent: null,
	domElementGetter: null,
}

export default function singleSpaCycle(userOpts) {
	if (typeof userOpts !== 'object') {
		throw new Error(`single-spa-cycle requires a configuration object`);
	}

	const opts = {
		...defaultOpts,
		...userOpts,
	};

	if (!opts.drivers) {
		throw new Error(`single-spa-cycle must be passed opts.drivers`);
	}

	if (!opts.rootComponent) {
		throw new Error(`single-spa-cycle must be passed opts.rootComponent`);
	}

	if (!opts.domElementGetter) {
		throw new Error(`single-spa-cycle must be passed opts.domElementGetter function`);
	}

	return {
		bootstrap: bootstrap.bind(null, opts),
		mount: mount.bind(null, opts),
		unmount: unmount.bind(null, opts),
	};
}

function bootstrap(opts) {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

let dispose;

function mount(opts) {
	return new Promise((resolve, reject) => {
        dispose = run(opts.rootComponent, {...opts.drivers, DOM: makeDOMDriver(getRootDomEl(opts))});
		resolve();
	});
}

function unmount(opts) {
	return new Promise((resolve, reject) => {
		if (dispose) {
			dispose();
			dispose = null;
		}
		resolve();
	});
}

function getRootDomEl(opts) {
	const el = opts.domElementGetter();
	if (!el) {
		throw new Error(`single-spa-cycle: domElementGetter function did not return a valid dom element`);
    }
    
	return el;
}
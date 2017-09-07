const defaultOpts = {
	// required opts
	run: null,
	drivers: null,
	rootComponent: null,
}

export default function singleSpaCycle(userOpts) {
	if (typeof userOpts !== 'object') {
		throw new Error(`single-spa-cycle requires a configuration object`);
	}

	const opts = {
		...defaultOpts,
		...userOpts,
	};

	if (!opts.run) {
		throw new Error(`single-spa-cycle must be passed opts.run function`);
	}


	if (!opts.drivers) {
		throw new Error(`single-spa-cycle must be passed opts.drivers`);
	}

	if (!opts.rootComponent) {
		throw new Error(`single-spa-cycle must be passed opts.rootComponent`);
	}
	
	return {
		bootstrap: bootstrap.bind(null, opts),
		mount: mount.bind(null, opts),
		unmount: unmount.bind(null, opts),
	};
}

function bootstrap(opts) {
	return Promise.resolve();
}

function mount(opts) {
	return new Promise((resolve, reject) => {
		opts.dispose = opts.run(opts.rootComponent, opts.drivers);
		resolve();
	});
}

function unmount(opts) {
	return new Promise((resolve, reject) => {
		if (opts.dispose) {
			opts.dispose();
			opts.dispose = null;
		}
		resolve();
	});
}
# single-spa-cycle
a single-spa plugin for cycle.js applications (adapted from [CanopyTax/single-spa-react](https://github.com/CanopyTax/single-spa-react)

Generic lifecycle hooks for Cycle.js applications that are registered as [child applications](https://github.com/CanopyTax/single-spa/blob/master/docs/child-applications.md) of [single-spa](https://github.com/CanopyTax/single-spa).

## Quickstart

In your [child app's entry file](https://github.com/CanopyTax/single-spa/blob/docs-1/docs/configuring-child-applications.md#the-entry-file), do the following:

```js
import singleSpaCycle from '../single-spa-cycle';
import Root from './root.component.js';

const cycleLifecycles = singleSpaCycle({
	drivers: {},
	rootComponent: Root,
	domElementGetter: () => document.getElementById('main-content'),
});

export const bootstrap = [
	cycleLifecycles.bootstrap
];

export const mount = [
	cycleLifecycles.mount
];

export const unmount = [
	cycleLifecycles.unmount
];
```

## Options

All options are passed to single-spa-cycle via the `opts` parameter when calling `singleSpaCycle(opts)`. The following options are available:

- `drivers`: (required) Additional drivers besides DOMDriver to be used by root component.
- `rootComponent`: (required) The top level React component which will be rendered
- `domElementGetter`: (required) A function that takes in no arguments and returns a DOMElement. This dom element is where the React application will be bootstrapped, mounted, and unmounted.

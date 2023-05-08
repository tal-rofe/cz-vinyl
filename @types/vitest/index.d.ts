import 'vitest';

interface CustomMatchers<R = unknown> {
	toWeakEqual(expected: object): R;
}

declare module 'vitest' {
	interface Assertion<T = unknown> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}

interface CustomMatchers<R = unknown> {
	toWeakEqual(expected: unknown): R;
}

declare global {
	namespace Vi {
		interface Assertion extends CustomMatchers {}
		interface AsymmetricMatchersContaining extends CustomMatchers {}
	}
}

export {};

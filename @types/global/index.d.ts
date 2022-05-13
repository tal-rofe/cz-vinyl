interface CustomMatchers<R = unknown> {
	toJsonEqual(expected: unknown): R;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly CZ_HEADER_FORMAT?: string;
			readonly CZ_COMMIT_TYPES?: string;
			readonly CZ_MAX_COMMIT_LINE_WIDTH?: string;
			readonly CZ_TYPE_QUESTION?: string;
			readonly CZ_SCOPE_QUESTION?: string;
			readonly CZ_SKIP_SCOPE?: string;
			readonly CZ_SCOPES?: string;
			readonly CZ_TICKET_ID_QUESTION?: string;
			readonly CZ_SKIP_TICKET_ID?: string;
			readonly CZ_TICKET_ID_REGEX?: string;
			readonly CZ_SUBJECT_QUESTION?: string;
			readonly CZ_SUBJECT_MAX_LENGTH?: string;
			readonly CZ_SUBJECT_MIN_LENGTH?: string;
			readonly CZ_BODY_QUESTION?: string;
			readonly CZ_SKIP_BODY?: string;
			readonly CZ_SKIP_BREAKING_CHANGES?: string;
			readonly CZ_ISSUES_QUESTION?: string;
			readonly CZ_SKIP_ISSUES?: string;
		}
	}

	namespace Vi {
		interface Assertion extends CustomMatchers {}
		interface AsymmetricMatchersContaining extends CustomMatchers {}
	}
}

export {};

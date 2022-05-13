import child_process, { exec } from 'child_process';
import { doesNotReject, rejects } from 'assert';

import sinon from 'sinon';
import { describe, it, afterEach } from 'vitest';

import { asyncExec } from '@/utils/os';

describe('[utils/os]', () => {
	const sandbox = sinon.createSandbox();
	let clock = sinon.useFakeTimers({ now: 0 });

	afterEach(() => {
		sandbox.restore();
		clock.restore();
		clock = sinon.useFakeTimers({ now: 0 });
	});

	it('asyncExec | should throw an exception when "child_process" exec core function returns with an error', async () => {
		sandbox.stub(child_process, 'exec').yields(new Error());

		await rejects(asyncExec('JUST A TEST'));
	});

	it('asyncExec | should throw an exception when "child_process" exec core function returns with stderr', async () => {
		sandbox.stub(child_process, 'exec').yields(null, null, 'JUST A TEST');

		await rejects(asyncExec('JUST A TEST'));
	});

	it('asyncExec | should run successfully when "child_process" exec core function runs successfully', async () => {
		sandbox.stub(child_process, 'exec').yields(null, 'JUST A TEST');

		await doesNotReject(asyncExec('JUST A TEST'));
	});

	it('asyncExec | should throw when "child_process" exec core function exceeds the input timeout', async () => {
		const DUMMY_SUCCESSFUL_COMMAND = 'echo "JUST A TEST"';

		sandbox.stub(child_process, 'exec').callsFake(() => {
			clock.tick(1000);

			return exec(DUMMY_SUCCESSFUL_COMMAND);
		});

		await rejects(asyncExec(DUMMY_SUCCESSFUL_COMMAND, { timeout: 0 }));
	});
});

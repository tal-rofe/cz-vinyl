import { describe, it, expect, afterEach } from 'vitest';
import sinon from 'sinon';

import * as OSUtils from '@/utils/os';
import { getTicketIdFromBranchName } from '@/utils/git-info';
import { TICKET_ID_REGEX } from '@/models/ticket-id';

describe('[utils/git-info]', () => {
	const sandbox = sinon.createSandbox();

	afterEach(() => sandbox.restore());

	it('getTicketIdFromBranchName | should return null when "getBranchName" throws', async () => {
		sandbox.stub(OSUtils, 'asyncExec').rejects();

		const result = await getTicketIdFromBranchName(/^JUST A TEST$/);

		expect(result === null).toEqual(true);
	});

	it('getTicketIdFromBranchName | should return null when failed to match ticket Id', async () => {
		sandbox.stub(OSUtils, 'asyncExec').resolves('TEST A JUST');

		const result = await getTicketIdFromBranchName(/^JUST A TEST$/);

		expect(result === null).toEqual(true);
	});

	it('getTicketIdFromBranchName | should ticket Id when there is one', async () => {
		const ticketId = 'CLO-12345';
		const ticketIdRegex = new RegExp(TICKET_ID_REGEX);

		sandbox.stub(OSUtils, 'asyncExec').resolves(`[${ticketId}] JUST A TEST`);

		const result = await getTicketIdFromBranchName(ticketIdRegex);

		expect(result === ticketId).toEqual(true);
	});
});

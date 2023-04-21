import os from 'node:os';

import { describe, it, expect, vi } from 'vitest';

import { asyncExec } from '@/utils/os';
import { getStagedFilesDiff, getTicketIdFromBranchName, shouldValidateTicketId } from '@/utils/git-info';
import { TICKET_ID_REGEX } from '@/constants/ticket-id';

vi.mock('@/utils/os');

describe('[utils/git-info]', () => {
	describe('getTicketIdFromBranchName()', () => {
		it('should return null when "getBranchName" throws', async () => {
			vi.mocked(asyncExec).mockRejectedValueOnce(undefined);

			const result = await getTicketIdFromBranchName(/^JUST A TEST$/);

			expect(result).toBeNull();
		});

		it('should return null when "getBranchName" returns with a defined "stderr"', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: '', stderr: 'DUMMY_ERROR' });

			const result = await getTicketIdFromBranchName(/^JUST A TEST$/);

			expect(result).toBeNull();
		});

		it('should return null when failed to match ticket Id', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: 'TEST A JUST', stderr: '' });

			const result = await getTicketIdFromBranchName(/^JUST A TEST$/);

			expect(result === null).toEqual(true);
		});

		it('should ticket Id when there is one', async () => {
			const ticketId = 'CLO-12345';
			const ticketIdRegex = new RegExp(TICKET_ID_REGEX);

			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: `[${ticketId}] JUST A TEST`, stderr: '' });

			const result = await getTicketIdFromBranchName(ticketIdRegex);

			expect(result === ticketId).toEqual(true);
		});
	});

	describe('shouldValidateTicketId()', () => {
		it('should return "false" when "getBranchName" throws', async () => {
			vi.mocked(asyncExec).mockRejectedValueOnce(undefined);

			const result = await shouldValidateTicketId(['JUST A TEST']);

			expect(result).toEqual(false);
		});

		it('should return "false" when "getBranchName" returns with a defined "stderr"', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: '', stderr: 'DUMMY_ERROR' });

			const result = await shouldValidateTicketId(['JUST A TEST']);

			expect(result).toEqual(false);
		});

		it('should return "true" when "getBranchName" returns a string contained in the ignored branchrs', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: 'TEST', stderr: '' });

			const result = await shouldValidateTicketId(['TEST']);

			expect(result).toEqual(false);
		});

		it('should return "true" when "getBranchName" returns a string which is not contained in the ignored branchrs', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: 'TEST', stderr: '' });

			const result = await shouldValidateTicketId(['DUMMY_TEXT']);

			expect(result).toEqual(true);
		});
	});

	describe('getStagedFilesDiff()', () => {
		/* 		it('should throw an error when "asyncExec" throws', async () => {
			vi.mocked(asyncExec).mockRejectedValueOnce(undefined);

			await expect(() => getStagedFilesDiff()).rejects.toThrowError(undefined);
		});

		it('should throw an error when "asyncExec" resolves which stderr', () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({ stdout: '', stderr: 'DUMMY_ERROR' });

			expect(() => getStagedFilesDiff()).toThrowError();
		}); */

		it('should return null when there are no staged files to scan', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({
				stdout: '',
				stderr: '',
			});

			const result = await getStagedFilesDiff();

			expect(result).toBeNull();
		});

		it('should return null when the files to scan are those who should be ignored', async () => {
			vi.mocked(asyncExec).mockResolvedValueOnce({
				stdout: `package-lock.json${os.EOL}pnpm-lock.yaml`,
				stderr: '',
			});

			const result = await getStagedFilesDiff();

			expect(result).toBeNull();
		});

		/* 		it('should throw an error when "asyncExec" throws on second call', () => {
			vi.mocked(asyncExec)
				.mockResolvedValueOnce({
					stdout: 'dummy-file',
					stderr: '',
				})
				.mockRejectedValueOnce(undefined);

			expect(() => getStagedFilesDiff()).toThrowError();
		});

		it('should throw an error when "asyncExec" resolves which stderr', () => {
			vi.mocked(asyncExec)
				.mockResolvedValueOnce({
					stdout: 'dummy-file',
					stderr: '',
				})
				.mockResolvedValueOnce({ stdout: '', stderr: 'DUMMY_ERROR' });

			expect(() => getStagedFilesDiff()).toThrowError();
		}); */

		it('should return the diff result of files excluding the default ignored ones', async () => {
			vi.mocked(asyncExec)
				.mockResolvedValueOnce({
					stdout: `test1${os.EOL}go.sum`,
					stderr: '',
				})
				.mockResolvedValueOnce({ stdout: 'BLABLA', stderr: '' });

			const result = await getStagedFilesDiff();

			expect(result).toBe('BLABLA');
		});
	});
});

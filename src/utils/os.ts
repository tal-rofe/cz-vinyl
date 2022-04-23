import { exec, type ExecOptions } from 'child_process';

const EXECUTION_TIMEOUT = 10 * 1000;

/**
 * The function receives a command to execute and returns a promise resolving to the execution output
 * @param command the command to execute
 * @param options execution options
 * @returns a promise resolves to the execution output
 * @throws an exception when os-level error occured
 */
export const asyncExec = async (command: string, options?: ExecOptions) => {
	const timeout = options?.timeout ?? EXECUTION_TIMEOUT;
	const killSignal: NodeJS.Signals = 'SIGINT';

	const extendedOptions = {
		...(options ?? {}),
		timeout,
		killSignal,
	};

	const executionTimeout = setTimeout(() => {
		throw new Error('Command failed due to timeout');
	}, timeout);

	const commandOutput = await new Promise<string>((resolve, reject) => {
		exec(command, extendedOptions, (error, stdout, stderr) => {
			clearTimeout(executionTimeout);

			if (error || stderr) {
				return reject(error?.message ?? stderr);
			}

			return resolve(stdout.trim());
		});
	});

	return commandOutput;
};

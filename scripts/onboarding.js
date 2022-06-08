const chalk = require('chalk');
const figlet = require('figlet');

figlet('cz - vinyl', (err, figletText) => {
	if (err) {
		return;
	}

	console.log(chalk.bold(figletText));

	console.log(chalk.bold.blue('Welcome to cz-vinyl package!!'));

	console.log('🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨\n');

	console.log(chalk.bold('Please follow these rules:'));

	console.log(
		chalk.bold.blue('- 📦️ Use "git cmt" instead of "git commit" in order to commit your changes'),
	);
	console.log(chalk.bold.blue('- 🛂 Follow the code conventions (our linters will enforce you..)'));
	console.log(chalk.bold.blue('- ✅ Add unit tests for your code if needed'));
	console.log(chalk.bold.blue('- 🚀 Make sure GitHub actions are passed before asking for PR'));
	console.log(chalk.bold.blue('- 📝 Document/Modify your new feature/fix in the README.md file'));

	console.log(
		chalk.bold(
			`\n👥👥👥 For any help or questions, you can open an issue or contact ${chalk.italic.gray(
				'dev@exlint.io',
			)} 👥👥👥\n`,
		),
	);
});

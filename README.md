<p align="center">
	<a href="https://github.com/tal-rofe/cz-vinyl">
    	<img src="https://img.shields.io/github/actions/workflow/status/tal-rofe/cz-vinyl/integrate.yaml?label=CI&logo=GitHub" alt="CI status">
  	</a>
	<a href="https://www.npmjs.com/package/cz-vinyl">
    	<img src="https://img.shields.io/npm/dm/cz-vinyl?logo=NPM" alt="npm downloads">
  	</a>
	<a href="https://github.com/tal-rofe/cli">
    	<img src="https://img.shields.io/npm/l/cz-vinyl" alt="npm license">
  	</a>
	<a href="https://github.com/tal-rofe/cz-vinyl">
    	<img src="https://img.shields.io/npm/v/cz-vinyl?label=version" alt="version">
  	</a>
</p>

<p align="center"><img src="assets/logo.png"/></p>

<h1 align="center">cz-vinyl</h1>

> Commitizen adapter for formatting commit messages.
> Format commit messages with [conventional commits].

cz-vinyl allows you to easily use emojis and ticket ID (JIRA, ...) in your commits using [commitizen].

```javascript
? Select the type of changes you're committing: (Use arrow keys or type to search)
> 🤖 chore: Build process or auxiliary tool changes
  🚀 ci: CI related changes
  📘 docs: Documentation only changes
  🔥 feat: A new feature
  🐞 fix: A bug fix
  ⚡ perf: A code change that improves performance
  💡 refactor: A code change that neither fixes a bug or adds a feature
```

## Demo

![cz-vinyl](assets/basic-demo.gif)

## OpenAI support
As from version `2.3.0` we now support OpenAI to generate your commit message! [Create your own OpenAI account](https://platform.openai.com/signup) and provide this library your API key token to use it.

### Payment
You pay for your own requests to OpenAI API. The package uses the `3.5-turbo` model official model, that is ~15x times cheaper than GPT-4.

## Installation

**Globally**

```bash
npm install --global cz-vinyl

# set as default adapter for your projects
echo '{ "path": "cz-vinyl" }' > ~/.czrc
```

**Locally**

```bash
npm install --save-dev cz-vinyl
```

Add this to your `package.json`:

```json
"config": {
  "commitizen": {
    "path": "cz-vinyl"
  }
}
```

## Usage

```sh
$ git cz
```

## ESM support

cz-vinyl now supports **only** ESM modules, from version `>1.6.2`. For any issue regarding this, please visit this link https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

## Configuration

Like commitizen, you can specify the configuration of cz-vinyl through various options.
Configuration can be set in environment variables or in the following files (the following files can also be configured in home directory):

-   a `package.json` property: `"czvinyl": {...}` or in `~/package.json`, for example
-   a `.czvinylrc` file in JSON or YAML format
-   a `.czvinylrc.json`, `.czvinylrc.yaml`, `.czvinylrc.yml`, `.czvinylrc.js`, or `.czvinylrc.cjs` file
-   a `inflint.config.ts`, `czvinyl.config.js`, or `czvinyl.config.cjs` CommonJS module exporting an object

The default commit types, descriptions and emoji that are used are:

```json
[
	{
		"description": "Build process or auxiliary tool changes",
		"emoji": "🤖",
		"value": "chore"
	},
	{
		"description": "CI related changes",
		"emoji": "🚀",
		"value": "ci"
	},
	{
		"description": "Documentation only changes",
		"emoji": "📘",
		"value": "docs"
	},
	{
		"description": "A new feature",
		"emoji": "🔥",
		"value": "feat"
	},
	{
		"description": "A bug fix",
		"emoji": "🐞",
		"value": "fix"
	},
	{
		"description": "A code change that improves performance",
		"emoji": "⚡",
		"value": "perf"
	},
	{
		"description": "A code change that neither fixes a bug or adds a feature",
		"emoji": "💡",
		"value": "refactor"
	},
	{
		"description": "Create a release commit",
		"emoji": "🔖",
		"value": "release"
	},
	{
		"description": "Markup, white-space, formatting, missing semi-colons...",
		"emoji": "🎨",
		"value": "style"
	},
	{
		"description": "Adding missing tests",
		"emoji": "✅",
		"value": "test"
	}
]
```

| **Environment variable**              | **Key**                         | **Type**                                                                                                                                             | **Default**                                                   | **Description**                                                                                                                        |
|---------------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| CZ_HEADER_FORMAT                      | `headerFormat`                  | `string` \| `(commitType: string, scope: string \| undefined, emoji: string \| undefined, ticketId: string \| undefined, subject: string) => string` | `{type}: {emoji} [{ticket_id}] {subject}`                     | How the commit header will be formatted. Supported placeholders: type, scope, emoji, ticket_id, subject                                |
| CZ_BODY_FORMAT                        | `bodyFormat`                    | `string` \| `(commitType: string, scope: string \| undefined, ticketId: string \| undefined, body: string \| undefined) => string`                   | `{body}`                                                      | How the commit body will be formatted. Supported placeholders: type, scope, ticket_id, body                                            |
|                                       | `commitTypes`                   | `{ value: string; description: string, emoji?: string }[]`                                                                                           | See above                                                     | The commit types to work with.                                                                                                         |
| CZ_MAX_COMMIT_LINE_WIDTH              | `maxCommitLineWidth`            | `number`                                                                                                                                             | `72`                                                          | Wraps the commit body message with max line width                                                                                      |
| CZ_TYPE_QUESTION                      | `typeQuestion`                  | `string`                                                                                                                                             | `Select the type of changes you're committing:\n`             | The CLI question for type                                                                                                              |
| CZ_SCOPE_QUESTION                     | `scopeQuestion`                 | `string`                                                                                                                                             | `Specify a scope:`                                            | The CLI question for scope                                                                                                             |
| CZ_SKIP_SCOPE                         | `skipScope`                     | `boolean`                                                                                                                                            | `true`                                                        | Whether to prompt the user to a scope question                                                                                         |
|                                       | `scopes`                        | `string[]`                                                                                                                                           | `[]`                                                          | Available scopes (empty array allows free text)                                                                                        |
| CZ_TICKET_ID_QUESTION                 | `ticketIdQuestion`              | `string`                                                                                                                                             | `Type the JIRA Id (ex. V-12345):`                             | The CLI question for ticket ID                                                                                                         |
| CZ_SKIP_TICKET_ID                     | `skipTicketId`                  | `boolean`                                                                                                                                            | `false`                                                       | Whether to prompt the user to a ticket ID question                                                                                     |
| CZ_TICKET_ID_REGEX                    | `ticketIdRegex`                 | `string`                                                                                                                                             | `((?<!([A-Z]{1,10})-?)[A-Z]+-\d+)`                            | A string represents a valid RegEx to extract ticket ID from the branch                                                                 |
| CZ_ALLOW_EMPTY_TICKET_ID_FOR_BRANCHES | `allowEmptyTicketIdForBranches` | `string[]`                                                                                                                                           | `[]`                                                          | List of branches to exclude validation for ticket ID                                                                                   |
| CZ_SUBJECT_QUESTION                   | `subjectQuestion`               | `string`                                                                                                                                             | `Write a short, imperative mood description of the change:\n` | The CLI question for subject                                                                                                           |
| CZ_SUBJECT_MAX_LENGTH                 | `subjectMaxLength`              | `number`                                                                                                                                             | `70`                                                          | Max length of the subject text                                                                                                         |
| CZ_SUBJECT_MIN_LENGTH                 | `subjectMinLength`              | `number`                                                                                                                                             | `3`                                                           | Min length of the subject text                                                                                                         |
| CZ_BODY_QUESTION                      | `bodyQuestion`                  | `string`                                                                                                                                             | `Provide a longer description of the change:\n`               | The CLI question for body                                                                                                              |
| CZ_SKIP_BODY                          | `skipBody`                      | `boolean`                                                                                                                                            | `false`                                                       | Whether to prompt the user to a body question                                                                                          |
| CZ_SKIP_BREAKING_CHANGES              | `skipBreakingChanges`           | `boolean`                                                                                                                                            | `true`                                                        | Whether to prompt the user to a breaking change question                                                                               |
| CZ_ISSUES_QUESTION                    | `issuesQuestion`                | `string`                                                                                                                                             | `List any issue closed (#1, #2, ...):`                        | The CLI question for issues                                                                                                            |
| CZ_SKIP_ISSUES                        | `skipIssues`                    | `boolean`                                                                                                                                            | `true`                                                        | Whether to prompt the user to a issues question                                                                                        |
| CZ_OPEN_AI_TOKEN                      | `openAiToken`                   | `string` \| `null`                                                                                                                                   | `null`                                                        | Whether to use OpenAI to generate a commit message including commit subject & body. A body will be dismissed if `skipBody` is enabled. |

## Examples

-   [landing-page](https://github.com/Exlint/landing-page)
-   [cz-vinyl](https://github.com/tal-rofe/cz-vinyl)
-   [inflint](https://github.com/tal-rofe/inflint)

## Support

For support, email talrofe111@gmail.com or open an issue at [cz-vinyl issues](https://github.com/tal-rofe/cz-vinyl/issues).

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `CODE_OF_CONDUCT.md`.

If you want to make PR please first check your code by:

1. Run `pnpm i` to install dependencies
2. Build your source code by running `pnpm build`
3. Modify `.cz.json` file with:
```json
{
	"path": "./dist/index.cjs"
}
```
4. Run `git cmt` and check results of your code

## Authors

-   [@tal-rofe](https://github.com/tal-rofe)

## License

[MIT](https://choosealicense.com/licenses/mit/)

[conventional commits]: https://www.conventionalcommits.org
[commitizen]: https://github.com/commitizen/cz-cli

import { Config } from 'inflint';

const inflintConfig: Config = {
	rules: {
		'{assets,scripts}/**/*': [2, 'kebab-case'],
		'{src,tests}/**/*': [2, 'kebab-case.point'],
	},
};

export default inflintConfig;

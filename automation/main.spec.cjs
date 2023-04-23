/**
 * * Testing there is no ESM compiled module in the distribution artifact
 * * As "commitizen" is yet to support ESM adapters, we must not use any ESM-only packages as dependencies
 * * If this "require" statement fails, probably the distribution artifact depends on ESM package
 * * This will cause a "commitizen" failure if it is dependent on ESM package
 */
require('../dist/index.cjs');

process.exit(0);

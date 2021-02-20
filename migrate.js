require('ts-node/register');

require('./src/database/config.ts').migrator.runAsCLI();

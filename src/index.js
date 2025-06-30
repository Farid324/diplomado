//src/index.js
import 'dotenv/config';
import app from './app.js';
import logger from './logs/logger.js';
import config from './config/env.js';
import { sequelize } from './database/database.js';

async function main() {
    await sequelize.sync({ force: true});
    const port = config.PORT;
    app.listen(port);
    logger.info('Server started on port ' + port);
    logger.error('This is an error message for testing purposes');
    logger.warn('This is a warning message for testing purposes');
    logger.fatal('This is a fatal message for testing purposes');
}

main();
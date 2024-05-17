import app from './app';
import logger from './logger';

require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Server started on http://localhost:${PORT}/api`);
});

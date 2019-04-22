const logger = console;

const info = (...args) => {
  logger.info(...args);
};

const error = (...args) => {
  logger.error(...args);
};

export default { info, error };

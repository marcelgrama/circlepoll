import winston from 'winston';
import env from './env';

env.restrictToServer();

const myLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { colorize: true });
winston.setLevels(myLevels);

export default winston;

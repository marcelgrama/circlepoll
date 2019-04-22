import mongoose from 'mongoose';
import env from '../services/env';
import crudPlugin from './models/crud';
import config from '../config/server';
import logger from '../services/serverLogger';

const connect = () =>
  mongoose.connect(config.dbURL, {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
  });

mongoose.plugin(crudPlugin);

const db = mongoose.connection;
if (env.isDev()) mongoose.set('debug', true);

db.on('connected', () => {
  logger.info('Connected to MongoDB');
});

db.on('error', error => {
  logger.error(
    'Error in MongoDb connection. Retry connection in 5 secs.',
    error
  );
  setTimeout(connect, 5000);
});

db.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

module.exports = { db, connect };

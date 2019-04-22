import clientConfig from './client';
import env from '../services/env';

env.restrictToServer();

export default {
  ...clientConfig,
  secretKey: '!Circlep0ll',
  mailgunDomain: 'sandboxf9d4b5f1bd044070bf16b1d4a32e3afc.mailgun.org',
  mailgunApiKey: 'key-eb4dfbb9b533092e1d642346244d5fb9',
  arobsApiBase: 'https://timesheet.arobs.com/webapi/api',
  dbURL: process.env.MONGODB_URI
};

import express from 'express';
import next from 'next';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from '../services/env';
import mongoose from './mongoose';
import controllers from './controllers/';

const port = process.env.PORT || 80;

const app = next({ dev: env.isDev() });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => mongoose.connect())
  .then(() => {
    const server = express();

    if (env.isProd()) {
      server.use(compression());
    }
    server.use(cors());
    server.use(bodyParser.json());
    server.use('/api', controllers);

    server.get('*', (req, res) => handle(req, res));

    server.listen(port);
  });

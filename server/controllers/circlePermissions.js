import express from 'express';

import CirclePermisionSchema from '../models/circlePermisions';
import { authRequired } from '../../services/authToken';

import logger from '../../services/serverLogger';

const router = new express.Router();

router.get('/', authRequired, (req, res) => {
  CirclePermisionSchema.searchByCircleId(req.query.id, req.user.id)

    .then(circles => res.send(circles))

    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

export default router;

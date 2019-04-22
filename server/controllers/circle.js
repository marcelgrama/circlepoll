import express from 'express';
import Circles from '../models/circles';
import CirclePermisionSchema from '../models/circlePermisions';
import { authRequired } from '../../services/authToken';
import { addCircleSchema, validate } from '../../services/validation';
import logger from '../../services/serverLogger';

const router = new express.Router();

router.post('/', validate(addCircleSchema), authRequired, (req, res) => {
  const userData = {
    name: req.body.name,
    description: req.body.desc,
    authorId: req.user.id
  };

  Circles.create(userData)

    .then(response => [response._id, response.authorId])
    .then(([circleId, userId]) => {
      const creator = {
        userId,
        circleId,
        create: true
      };
      return CirclePermisionSchema.create(creator);
    })

    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/', authRequired, (req, res) => {
  CirclePermisionSchema.getUserCircles(req.user.id)

    .then(circles => res.send(circles))

    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

export default router;

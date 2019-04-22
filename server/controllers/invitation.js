import express from 'express';
import { authRequired } from '../../services/authToken';
import Permission from '../models/circlePermisions';
import Circles from '../models/circles';
import { sendEmail, circleInvitationTemplate } from '../../services/email';
import logger from '../../services/serverLogger';

const router = new express.Router();

router.post('/invitation', (req, res) => {
  Circles.getById(req.query.id)
    .then(response => [response.name, response.description])
    .then(response => {
      const emails = req.body.email.map(emailName => emailName, response);

      sendEmail(
        emails,
        circleInvitationTemplate(req.query.id, response[0], response[1])
      );
      res.send('Done!');
    });
});

router.get('/invitation/circle', (req, res) => {
  Circles.getById(req.query.id).then(response => res.send(response));
});

router.post('/invitation/accept', authRequired, (req, res) => {
  const permissionData = {
    userId: req.user.id,
    circleId: req.body.params.id,
    view: 'true'
  };
  Permission.create(permissionData)
    .then(() =>
      Circles.findByIdAndUpdate(
        { _id: req.body.params.id },
        { $inc: { usersCount: 1 } }
      )
    )
    .then(() => res.send({ success: true }))
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

export default router;

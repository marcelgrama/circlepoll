import express from 'express';
import Poll from '../models/polls';
import Answer from '../models/answers';
import Participation from '../models/participations';
import { authRequired } from '../../services/authToken';
import {
  eventPollCreationSchema,
  questionPollSchema,
  validate
} from '../../services/validation';
import logger from '../../services/serverLogger';
import { setSuccess } from '../../actions/success';
import store from '../../store/';

const router = new express.Router();
router.post(
  '/event',
  validate(eventPollCreationSchema),
  authRequired,
  (req, res) => {
    const PollData = {
      title: req.body.title,
      desc: req.body.desc,
      authorId: req.user.id,
      type: 'event',
      hasMaybe: req.body.hasMaybe,
      startDate: req.body.startDate,
      circleId: req.body.circleId
    };
    Poll.create(PollData)
      .then(() => res.send({ success: true }))
      .catch(error => {
        res.send({ error: error.message });
        logger.error(error.message);
      });
  }
);

router.get('/event', authRequired, (req, res) => {
  Poll.getById(req.query.id)
    .then(pollData => res.send(pollData))
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.post('/event/vote', authRequired, (req, res) => {
  const participationData = {
    userId: req.user.id,
    pollId: req.body.pollId,
    status: req.body.status
  };
  Participation.create(participationData)
    .then(() => res.send({ succes: true }))
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/event/results', authRequired, (req, res) => {
  Participation.getEventByPollId(req.query.id)
    .then(eventResultsData => res.send(eventResultsData))
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/all', authRequired, (req, res) => {
  Promise.all([
    Poll.searchByCircleId(req.query.id, req.query.query, req.query.page),
    Poll.countByCircleId(req.query.id, req.query.query)
  ])
    .then(([payload, total]) => {
      res.send({
        payload,
        total
      });
    })
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/question', authRequired, (req, res) => {
  Promise.all([
    Poll.getPollWithAuthor(req.query.id),
    Answer.getByPollId(req.query.id)
  ])
    .then(([pollData, answers]) => {
      store.dispatch(setSuccess(answers));
      res.send({
        ...pollData.toObject(),
        answers
      });
    })
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.get('/question/results', authRequired, (req, res) => {
  Promise.all([Poll.getById(req.query.id), Answer.getByPollId(req.query.id)])
    .then(([pollData, answers]) => {
      res.send({
        ...pollData.toObject(),
        answers
      });
    })
    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.put('/question/vote', authRequired, (req, res) => {
  Answer.findByIdAndUpdate({ _id: req.body.id }, { $inc: { votes: 1 } })
    .then(() => {
      res.send({
        succes: 'true'
      });
    })

    .catch(error => {
      res.send({ error: error.message });
      logger.error(error.message);
    });
});

router.post(
  '/question',
  validate(questionPollSchema),
  authRequired,
  (req, res) => {
    const questionData = {
      title: req.body.question,
      type: 'question',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      authorId: req.user.id,
      circleId: req.body.circleId
    };

    Poll.create(questionData)
      .then(response => response._id)
      .then(pollId => {
        const answers = req.body.answers.map(answerName => ({
          name: answerName,
          pollId
        }));
        return Answer.insertMany(answers).then(() => pollId);
      })
      .then(pollId => res.send({ pollId }))
      .catch(error => {
        res.send({ error: error.message });
        logger.error(error.message);
      });
  }
);

export default router;

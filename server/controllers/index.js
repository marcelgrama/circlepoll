import express from 'express';
import authRouter from './auth';
import pollRouter from './poll';
import circleRouter from './circle';
import circlePermisionsRouter from './circlePermissions';

import invitationRouter from './invitation';

const router = new express.Router();

router.use('/auth', authRouter);
router.use('/poll', pollRouter);
router.use('/circle', circleRouter);
router.use('/circlepermissions', circlePermisionsRouter);
router.use('/', invitationRouter);

export default router;

import jwt from 'jsonwebtoken';
import config from '../config/server';

export const genAuthToken = data =>
  new Promise((resolve, reject) => {
    jwt.sign(data, config.secretKey, { expiresIn: '12h' }, (err, token) => {
      if (!err) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });

export const authRequired = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        res.send({ authTokenError: true });
      } else {
        req.user = decoded; // eslint-disable-line no-param-reassign
        next();
      }
    });
  } else {
    res.send({ authTokenError: true });
  }
};

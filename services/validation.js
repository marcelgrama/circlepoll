import Joi from 'joi';

export const signInSchema = Joi.object().keys({
  username: Joi.string()
    .label('Username')
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .label('Password')
    .min(3)
    .max(30)
    .required()
});

export const eventPollCreationSchema = Joi.object().keys({
  title: Joi.string()
    .label('Title')
    .min(3)
    .max(30)
    .required(),
  desc: Joi.string()
    .required()
    .label('Description')
    .min(3)
    .max(200),
  hasMaybe: Joi.boolean(),
  circleId: Joi.string()
});

export const questionPollSchema = Joi.object().keys({
  question: Joi.string()
    .label('Question')
    .min(3)
    .max(150)
    .required(),
  answers: Joi.array()
    .items(Joi.string().label('Answer'))
    .unique()
    .single()
    .required(),
  circleId: Joi.string()
});

export const emailSchema = Joi.object().keys({
  email: Joi.array()
    .items(
      Joi.string()
        .label('Email')
        .email()
    )
    .unique()
    .single()
    .required()
});

export const addCircleSchema = Joi.object().keys({
  name: Joi.string()
    .label('Circle name')
    .min(3)
    .max(30)
    .required(),
  desc: Joi.string()
    .label('Circle description')
    .max(200)
    .allow('')
});

export const validate = schema => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.send({ error: validationResult.error.details[0].message });
  }
  return next();
};

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { BadRequest } = require('../errors/allErrors');

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
    trailer: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((link) => {
      if (!validator.isURL(link)) {
        throw new BadRequest('Некорректная ссылка');
      }
      return link;
    }),
  }),
});

const userRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const currentUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom((email) => {
      if (!validator.isEmail(email)) {
        throw new BadRequest('Некорректный email');
      }
      return email;
    }),
    name: Joi.string().required().min(2).max(30),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  userValidation,
  movieValidation,
  userRegister,
  currentUserValidation,
  movieIdValidation,
};

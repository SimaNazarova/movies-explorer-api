const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const {
  NotFoundError, Unauthorized, ConflictError,
} = require('../errors/allErrors');

// получить данные текущего юзера
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Нет пользователя c таким id'); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

// создать нового юзера
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Данный email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      email: user.email, name: user.name,
    }))
    .catch((err) => next(err));
};

// авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '7d' },
        );
        res
          .send({
            user: {
              email: user.email,
              name: user.name,
            },
            token,
          });
      }
    })
    .catch(() => next(new Unauthorized('Неправильные почта или пароль')));
};

// обновить данные
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};

/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');
const { NotFoundError, BadRequest, ForbiddenError } = require('../errors/allErrors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const postMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director, duration, year, description, image, trailer, movieId, nameRU, nameEN, thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .orFail(() => { throw new NotFoundError('Нет фильма c таким id'); })
    .then((movie) => {
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('Нельзя удалить чужой фильм');
      }
      return movie.remove(movieId);
    })
    .then(() => res.send({ message: 'удалено' }))
    .catch(next);
};

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};

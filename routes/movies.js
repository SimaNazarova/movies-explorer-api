const router = require('express').Router();
const { movieValidation, movieIdValidation } = require('../middlewares/validation');
const {
  getMovies, postMovies, deleteMovies,
} = require('../controllers/movies.js');

router.get('/', getMovies);
router.post('/', movieValidation, postMovies);
router.delete('/:movieId', movieIdValidation, deleteMovies);

module.exports = router;

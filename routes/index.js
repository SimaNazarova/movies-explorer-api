const router = require('express').Router();
const { userValidation, userRegister } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users.js');

router.post('/signup', userRegister, createUser);
router.post('/signin', userValidation, login);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;

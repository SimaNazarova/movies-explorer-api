const router = require('express').Router();
const { getCurrentUser, updateUser } = require('../controllers/users.js');
const { currentUserValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', currentUserValidation, updateUser);

module.exports = router;

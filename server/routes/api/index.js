const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
router.use('/thought', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/login', loginRoutes);

module.exports = router;

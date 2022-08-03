const router = require('express').Router();
const {
    getUsers,
    getLoginUser,
    getSingleUser,
    createUser
} = require('../../controllers/userController');

// /api/applications
router.route('/').get(getUsers).post(createUser);

// /api/applications/:applicationId
router
  .route('/:userId')
  .get(getSingleUser)
 

  router
  .route('/login')
  .post(getLoginUser)
 

module.exports = router;

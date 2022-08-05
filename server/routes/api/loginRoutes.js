const router = require('express').Router();
const {
 
    getLoginUser,
    
} = require('../../controllers/userController');
  router
  .route('/')
  .post(getLoginUser)
  
module.exports = router;
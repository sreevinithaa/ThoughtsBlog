const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    addComment,
    removeComment,
    removeThought
} = require('../../controllers/thoughtController');

// /api/applications
router.route('/').get(getThoughts).post(createThought);
router.route('/:username').get(getThoughts)
// /api/applications/:applicationId
router
  .route('/:thoughtId')
  .get(getSingleThought)
 .delete(removeThought);

// /api/applications/:applicationId/tags
router.route('/:thoughtId/comment').post(addComment);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/comment/:commentId').delete(removeComment);

module.exports = router;

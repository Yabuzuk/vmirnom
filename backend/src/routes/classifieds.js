const express = require('express');
const router = express.Router();
const classifiedsController = require('../controllers/classifiedsController');

router.get('/', classifiedsController.getAllClassifieds);
router.post('/', classifiedsController.createClassified);
router.put('/:id', classifiedsController.updateClassified);
router.delete('/:id', classifiedsController.deleteClassified);

module.exports = router;

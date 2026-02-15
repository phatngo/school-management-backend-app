const express = require('express');
const router = express.Router();
const classes = require('../controllers/classes.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, classes.listClasses);
router.post('/', authenticateBasic, classes.createClass);
router.get('/:id', authenticateBasic, classes.getClassById);
router.put('/:id', authenticateBasic, classes.updateClass);
router.delete('/:id', authenticateBasic, classes.deleteClass);

module.exports = router;

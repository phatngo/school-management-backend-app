const express = require('express');
const router = express.Router();
const classeRoom = require('../controllers/classroom.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, classeRoom.listClasses);
router.post('/', authenticateBasic, classeRoom.createClass);
router.get('/:id', authenticateBasic, classeRoom.getClassById);
router.put('/:id', authenticateBasic, classeRoom.updateClass);
router.delete('/:id', authenticateBasic, classeRoom.deleteClass);

module.exports = router;

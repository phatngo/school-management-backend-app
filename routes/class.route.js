const express = require('express');
const router = express.Router();
const classRoom = require('../controllers/classroom.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, classRoom.list);
router.post('/', authenticateBasic, classRoom.create);
router.get('/:id', authenticateBasic, classRoom.get);
router.put('/:id', authenticateBasic, classRoom.update);
router.delete('/:id', authenticateBasic, classRoom.delete);

module.exports = router;

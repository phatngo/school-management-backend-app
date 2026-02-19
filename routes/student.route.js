const express = require('express');
const router = express.Router();
const student = require('../controllers/student.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, student.list);
router.post('/', authenticateBasic, student.create);
router.get('/:id', authenticateBasic, student.get);
router.put('/:id', authenticateBasic, student.update);
router.delete('/:id', authenticateBasic, student.delete);

module.exports = router;

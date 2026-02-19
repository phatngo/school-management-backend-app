const express = require('express');
const router = express.Router();
const teacher = require('../controllers/teacher.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, teacher.list);
router.post('/', authenticateBasic, teacher.create);
router.get('/:id', authenticateBasic, teacher.get);
router.put('/:id', authenticateBasic, teacher.update);
router.delete('/:id', authenticateBasic, teacher.delete);

module.exports = router;

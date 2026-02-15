const express = require('express');
const router = express.Router();
const teacher = require('../controllers/teacher.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, teacher.listTeachers);
router.post('/', authenticateBasic, teacher.createTeacher);
router.get('/:id', authenticateBasic, teacher.getTeacherById);
router.put('/:id', authenticateBasic, teacher.updateTeacher);
router.delete('/:id', authenticateBasic, teacher.deleteTeacher);

module.exports = router;

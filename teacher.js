const express = require('express');
const router = express.Router();
const teachers = require('../controllers/teachers.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, teachers.listTeachers);
router.post('/', authenticateBasic, teachers.createTeacher);
router.get('/:id', authenticateBasic, teachers.getTeacherById);
router.put('/:id', authenticateBasic, teachers.updateTeacher);
router.delete('/:id', authenticateBasic, teachers.deleteTeacher);

module.exports = router;

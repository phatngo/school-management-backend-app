const express = require('express');
const router = express.Router();
const students = require('../controllers/students.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, students.listStudents);
router.post('/', authenticateBasic, students.createStudent);
router.get('/:id', authenticateBasic, students.getStudentById);
router.put('/:id', authenticateBasic, students.updateStudent);
router.delete('/:id', authenticateBasic, students.deleteStudent);

module.exports = router;

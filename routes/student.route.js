const express = require('express');
const router = express.Router();
const student = require('../controllers/student.controller');
const { authenticateBasic } = require('../middleware/auth');

router.get('/', authenticateBasic, student.listStudents);
router.post('/', authenticateBasic, student.createStudent);
router.get('/:id', authenticateBasic, student.getStudentById);
router.put('/:id', authenticateBasic, student.updateStudent);
router.delete('/:id', authenticateBasic, student.deleteStudent);

module.exports = router;

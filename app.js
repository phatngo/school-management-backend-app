require('dotenv').config();
const express = require("express");
const app = express();

app.use(express.json());

app.use('/teachers', require('./routes/teacher.route'));
app.use('/classes', require('./routes/class.route'));
app.use('/students', require('./routes/student.route'));
app.use('/users', require('./routes/user.route'));

app.listen(3000, () => {
  console.log("🚀 School CRUD API running on port 3000");
});

module.exports = app;
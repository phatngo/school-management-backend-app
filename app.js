const express = require("express");
const db = require("./db");
const app = express();
app.use(express.json());

// --- GENERIC CRUD HELPER FOR PAGINATION ---
const getPaginated = async (tableName, req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [rows] = await db.execute(
      `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`,
      [String(limit), String(offset)], // Limits must be passed as strings or handled carefully in execute
    );
    res.json({ page, limit, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= CODE FOR TEACHERS =================
app.get("/teachers", (req, res) => getPaginated("teachers", req, res));

app.post("/teachers", async (req, res) => {
  const { name, department_id } = req.body;
  const [result] = await db.execute(
    "INSERT INTO teachers (name, department_id) VALUES (?, ?)",
    [name, department_id],
  );
  res.status(201).json({ id: result.insertId });
});

app.put("/teachers/:id", async (req, res) => {
  const { name, department_id } = req.body;
  await db.execute(
    "UPDATE teachers SET name = ?, department_id = ? WHERE id = ?",
    [name, department_id, req.params.id],
  );
  res.json({ message: "Updated" });
});

app.delete("/teachers/:id", async (req, res) => {
  await db.execute("DELETE FROM teachers WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted" });
});

app.get("/teachers/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM teachers WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Teacher not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CODE FOR CLASSES =================
app.get("/classes", (req, res) => getPaginated("classes", req, res));

app.post("/classes", async (req, res) => {
  const { name, teacher_id, class_type } = req.body;
  const [result] = await db.execute(
    "INSERT INTO classes (name, teacher_id, class_type) VALUES (?, ?, ?)",
    [name, teacher_id, class_type],
  );
  res.status(201).json({ id: result.insertId });
});

app.put("/classes/:id", async (req, res) => {
  const { name, teacher_id, class_type } = req.body;
  await db.execute(
    "UPDATE classes SET name = ?, teacher_id = ?, class_type = ? WHERE id = ?",
    [name, teacher_id, class_type, req.params.id],
  );
  res.json({ message: "Updated" });
});

app.delete("/classes/:id", async (req, res) => {
  await db.execute("DELETE FROM classes WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted" });
});

app.get("/classes/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM classes WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Class not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= CODE FOR STUDENTS =================
app.get("/students", (req, res) => getPaginated("students", req, res));

app.post("/students", async (req, res) => {
  const { name, phone_number, class_id } = req.body;
  const [result] = await db.execute(
    "INSERT INTO students (name, phone_number, class_id) VALUES (?, ?, ?)",
    [name, phone_number, class_id],
  );
  res.status(201).json({ id: result.insertId });
});

app.put("/students/:id", async (req, res) => {
  const { name, phone_number, class_id } = req.body;
  await db.execute(
    "UPDATE students SET name = ?, phone_number = ?, class_id = ? WHERE id = ?",
    [name, phone_number, class_id, req.params.id],
  );
  res.json({ message: "Updated" });
});

app.delete("/students/:id", async (req, res) => {
  await db.execute("DELETE FROM students WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted" });
});

app.get("/students/:id", async (req, res) => {
  try {
    // I added a JOIN here so you can see the Class Name and Teacher Name
    // immediately when viewing a student's details.
    const sql = `
            SELECT s.*, c.name AS class_name, t.name AS teacher_name 
            FROM students s
            LEFT JOIN classes c ON s.class_id = c.id
            LEFT JOIN teachers t ON c.teacher_id = t.id
            WHERE s.id = ?`;

    const [rows] = await db.execute(sql, [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Student not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Database Host:", process.env.DB_USERNAME);
  console.log("🚀 School CRUD API running on port 3000");
});

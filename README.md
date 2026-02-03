# school-management-backend-app
A lightweight backend app used for API/Back-end testing purpose

---

## 🚀 Quick Setup

Follow these steps to run the app locally, create the MySQL schema using `db.sql`, and test the API with example `curl` commands.

### ✅ Prerequisites

- Node.js (v16+ recommended)
- MySQL (server) or a Docker container running MySQL
- `git` (optional)

---

### 🔧 1) Create the MySQL database (using `db.sql`)

1. Make sure your MySQL server is running.
2. Import the schema and sample data from `db.sql`:

```bash
# Using the mysql client (replace `root` and password if needed):
mysql -u root -p < db.sql
# or, from inside the mysql shell:
mysql -u root -p
> SOURCE /path/to/db.sql;
```

This creates the `school_db` database and sample `teachers`, `classes`, and `students` data.

> ⚠️ If you prefer Docker, run a MySQL container and then import `db.sql` into it.

---

### 🛠️ 2) Configure environment variables

The app reads DB settings from environment variables used in `db.js`:

- `DB_HOST` (e.g. `localhost`)
- `DB_USERNAME` (e.g. `root`)
- `DB_PASSWORD` (your MySQL password)
- `DB_NAME` (should be `school_db` after importing `db.sql`)

Examples (macOS / Linux - zsh):

```bash
export DB_HOST=127.0.0.1
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password
export DB_NAME=school_db
```

Or run the app in one line:

```bash
DB_HOST=127.0.0.1 DB_USERNAME=root DB_PASSWORD=your_mysql_password DB_NAME=school_db node app.js
```

---

### ▶️ 3) Install dependencies & start the app

```bash
npm install
node app.js
```

You should see the server log indicating the API is running on port 3000:

```
🚀 School CRUD API running on port 3000
```

---

### 🧪 4) Test the API (example `curl`)

- List students (paginated):

```bash
curl http://localhost:3000/students
```

- Get student details (joined with class & teacher):

```bash
curl http://localhost:3000/students/1
```

- Create a new student:

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","phone_number":"123-4567","class_id":1}'
```

---

### ⚠️ Troubleshooting

- If the app cannot connect to MySQL, verify env vars and that the MySQL server is accessible.
- If you get permission errors importing `db.sql`, try running as a user with sufficient privileges or use `sudo` carefully.

---

Happy testing! 💡

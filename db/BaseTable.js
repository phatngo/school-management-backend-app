const db = require("../lib/db-client"); // Your mysql2/promise pool

class BaseTable {
  constructor(tableName, fields) {
    this.tableName = tableName;
    this.fields = fields; // Array of column names
  }

  async getById(id) {
    const [rows] = await db.execute(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id],
    );
    return rows[0] || null;
  }

  async getList(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      `SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`,
      [String(limit), String(offset)],
    );
    return rows;
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `INSERT INTO ${this.tableName} (${keys.join(", ")}) VALUES (${placeholders})`;
    const [result] = await db.execute(sql, values);
    return { id: result.insertId, ...data };
  }

  async delete(id) {
    await db.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return { success: true };
  }
}

module.exports = BaseTable;

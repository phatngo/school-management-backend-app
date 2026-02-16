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

  async getByMultipleConditions({where}) {
    const conditions = Object.keys(where).map(key => `${key} = ?`);
    const values = Object.values(where);
    const sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(" AND ")}`;
    const [rows] = await db.execute(sql, values);
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
    return await this.getById(result.insertId);
  }

  async update(id, data) {
    const keys = Object.keys(data);
    if (keys.length === 0) return this.getById(id);
    const values = Object.values(data);
    const setClause = keys.map((k) => `${k} = ?`).join(", ");

    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    await db.execute(sql, [...values, id]);
    return await this.getById(id);
  }

  async delete(id) {
    await db.execute(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    return { success: true };
  }
}

module.exports = BaseTable;

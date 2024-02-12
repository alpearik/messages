const db = require('./db');

const Message = {
  create: async (message) => {
    const sql = 'INSERT INTO messages (username, content, created_at) VALUES ($1, $2, $3) RETURNING id';
    const values = [message.username, message.content, new Date()];
    const result = await db.query(sql, values);
    return result.rows[0].id;
  },
  
  findAll: async () => {
    const sql = 'SELECT * FROM messages';
    const result = await db.query(sql);
    return result.rows;
  },

  findByIdAndUpdate: async (id, message) => {
    const sql = 'UPDATE messages SET username = $1, content = $2 WHERE id = $3 RETURNING *';
    const values = [message.username, message.content, id];
    const result = await db.query(sql, values);
    return result.rows[0];
  },

  findByIdAndDelete: async (id) => {
    const sql = 'DELETE FROM messages WHERE id = $1';
    const result = await db.query(sql, [id]);
    return result.rowCount;
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM messages WHERE id = $1';
    const result = await db.query(sql, [id]);
    return result.rows[0];
  }
};

module.exports = Message;

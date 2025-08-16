const pool = require('../config/database');

class Family {
  static async create(familyData) {
    const { user_id, name } = familyData;
    const query = `
      INSERT INTO families (user_id, name, status, created_at)
      VALUES ($1, $2, 'draft', NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [user_id, name]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM families WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM families WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE families 
      SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, status]);
    return result.rows[0];
  }

  static async getWithMembers(id) {
    const familyQuery = 'SELECT * FROM families WHERE id = $1';
    const membersQuery = 'SELECT * FROM family_members WHERE family_id = $1 ORDER BY created_at';
    
    const [familyResult, membersResult] = await Promise.all([
      pool.query(familyQuery, [id]),
      pool.query(membersQuery, [id])
    ]);

    if (familyResult.rows.length === 0) {
      return null;
    }

    return {
      ...familyResult.rows[0],
      members: membersResult.rows
    };
  }
}

module.exports = Family;
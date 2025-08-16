const pool = require('../config/database');

class FamilyMember {
  static async create(memberData) {
    const { family_id, name, role, avatar_url } = memberData;
    const query = `
      INSERT INTO family_members (family_id, name, role, avatar_url, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [family_id, name, role, avatar_url]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM family_members WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByFamilyId(familyId) {
    const query = 'SELECT * FROM family_members WHERE family_id = $1 ORDER BY created_at';
    const result = await pool.query(query, [familyId]);
    return result.rows;
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE family_members 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM family_members WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getWithImages(id) {
    const memberQuery = 'SELECT * FROM family_members WHERE id = $1';
    const imagesQuery = 'SELECT * FROM images WHERE member_id = $1 ORDER BY created_at';
    
    const [memberResult, imagesResult] = await Promise.all([
      pool.query(memberQuery, [id]),
      pool.query(imagesQuery, [id])
    ]);

    if (memberResult.rows.length === 0) {
      return null;
    }

    return {
      ...memberResult.rows[0],
      images: imagesResult.rows
    };
  }
}

module.exports = FamilyMember;
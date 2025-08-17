// Cloudflare D1 Database configuration for Workers
class D1Database {
  constructor(binding) {
    this.db = binding;
  }

  async query(sql, params = []) {
    try {
      const result = await this.db.prepare(sql).bind(...params).all();
      return {
        rows: result.results || [],
        rowCount: result.results?.length || 0
      };
    } catch (error) {
      console.error('D1 Database query error:', error);
      throw error;
    }
  }

  async queryOne(sql, params = []) {
    try {
      const result = await this.db.prepare(sql).bind(...params).first();
      return result || null;
    } catch (error) {
      console.error('D1 Database queryOne error:', error);
      throw error;
    }
  }

  async execute(sql, params = []) {
    try {
      const result = await this.db.prepare(sql).bind(...params).run();
      return {
        success: result.success,
        meta: result.meta,
        changes: result.meta?.changes || 0,
        last_row_id: result.meta?.last_row_id
      };
    } catch (error) {
      console.error('D1 Database execute error:', error);
      throw error;
    }
  }

  async batch(statements) {
    try {
      const preparedStatements = statements.map(stmt => {
        if (typeof stmt === 'string') {
          return this.db.prepare(stmt);
        }
        return this.db.prepare(stmt.sql).bind(...(stmt.params || []));
      });
      
      const results = await this.db.batch(preparedStatements);
      return results;
    } catch (error) {
      console.error('D1 Database batch error:', error);
      throw error;
    }
  }
}

// Singleton pattern for database connection
let dbInstance = null;

export function getDatabase() {
  if (!dbInstance && process.env.DB) {
    dbInstance = new D1Database(process.env.DB);
  }
  return dbInstance;
}

export default getDatabase;
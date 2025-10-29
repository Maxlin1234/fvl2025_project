module.exports = {
  database: {
    user: 'PostgreSQL 17', // 您的 PostgreSQL 用戶名
    host: 'localhost',// PostgreSQL 主機
    database: 'fma',  // 您的資料庫名稱
    password: 'max20160621',  // 您的密碼
    port: 5432,                 // PostgreSQL 預設端口
    ssl: {
      rejectUnauthorized: true // 對於 AWS RDS，通常需要這個設定
    }
  }
}; 
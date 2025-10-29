const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = 3001;

// 中間件
app.use(cors());
app.use(express.json());

// PostgreSQL 連接配置
const pool = new Pool(config.database);

// 測試資料庫連接
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('資料庫連接失敗:', err);
  } else {
    console.log('資料庫連接成功，當前時間:', res.rows[0].now);
  }
});

// API 路由

// 取得所有資料
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table_name');
    res.json(result.rows);
  } catch (err) {
    console.error('查詢錯誤:', err);
    res.status(500).json({ error: '資料庫查詢失敗' });
  }
});

// 根據 ID 取得單筆資料
app.get('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM your_table_name WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '找不到資料' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('查詢錯誤:', err);
    res.status(500).json({ error: '資料庫查詢失敗' });
  }
});

// 新增資料
app.post('/api/data', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      'INSERT INTO your_table_name (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('新增錯誤:', err);
    res.status(500).json({ error: '新增資料失敗' });
  }
});

// 更新資料
app.put('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      'UPDATE your_table_name SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '找不到資料' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('更新錯誤:', err);
    res.status(500).json({ error: '更新資料失敗' });
  }
});

// 刪除資料
app.delete('/api/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM your_table_name WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '找不到資料' });
    }
    
    res.json({ message: '資料刪除成功' });
  } catch (err) {
    console.error('刪除錯誤:', err);
    res.status(500).json({ error: '刪除資料失敗' });
  }
});

app.listen(port, () => {
  console.log(`後端服務運行在 http://localhost:${port}`);
}); 
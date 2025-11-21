-- 建立資料庫（如果不存在）
-- CREATE DATABASE your_database;

-- 連接到資料庫
-- \c your_database;

-- 建立資料表
CREATE TABLE IF NOT EXISTS your_table_name (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_your_table_name_created_at ON your_table_name(created_at);

-- 插入一些測試資料
INSERT INTO your_table_name (name, description) VALUES
    ('測試資料 1', '這是第一筆測試資料'),
    ('測試資料 2', '這是第二筆測試資料'),
    ('測試資料 3', '這是第三筆測試資料')
ON CONFLICT DO NOTHING;

-- 建立更新時間的觸發器函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 建立觸發器
DROP TRIGGER IF EXISTS update_your_table_name_updated_at ON your_table_name;
CREATE TRIGGER update_your_table_name_updated_at
    BEFORE UPDATE ON your_table_name
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 查看資料
SELECT * FROM your_table_name; 
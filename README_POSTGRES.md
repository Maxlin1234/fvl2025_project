# PostgreSQL + Vue.js + Axios 整合指南

這個專案展示了如何使用 Vue.js 前端透過 axios 與 PostgreSQL 資料庫進行互動。

## 專案結構

```
fvl2025/
├── server.js              # Express.js 後端服務
├── config.js              # 資料庫配置
├── database.sql           # PostgreSQL 初始化腳本
├── src/
│   ├── components/
│   │   └── DataManager.vue    # 完整的資料管理組件
│   └── views/
│       └── DataTest.vue       # 測試頁面
└── package.json
```

## 安裝與設定

### 1. 安裝依賴套件

```bash
npm install axios express pg cors
```

### 2. PostgreSQL 設定

1. **安裝 PostgreSQL**
   - macOS: `brew install postgresql`
   - Windows: 下載並安裝 PostgreSQL
   - Linux: `sudo apt-get install postgresql`

2. **啟動 PostgreSQL 服務**
   ```bash
   # macOS
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **建立資料庫和資料表**
   ```bash
   # 連接到 PostgreSQL
   psql -U postgres
   
   # 建立資料庫
   CREATE DATABASE your_database;
   
   # 連接到資料庫
   \c your_database
   
   # 執行 SQL 腳本
   \i database.sql
   ```

### 3. 配置資料庫連接

編輯 `config.js` 檔案，填入您的 PostgreSQL 連接資訊：

```javascript
module.exports = {
  database: {
    user: 'postgres',           // 您的 PostgreSQL 用戶名
    host: 'localhost',          // PostgreSQL 主機
    database: 'your_database',  // 您的資料庫名稱
    password: 'your_password',  // 您的密碼
    port: 5432,                 // PostgreSQL 預設端口
  }
};
```

## 啟動服務

### 1. 啟動後端服務

```bash
node server.js
```

後端服務將在 `http://localhost:3001` 運行。

### 2. 啟動前端服務

```bash
npm run serve
```

前端服務將在 `http://localhost:8080` 運行。

## API 端點

### GET /api/data
取得所有資料

**回應範例：**
```json
[
  {
    "id": 1,
    "name": "測試資料 1",
    "description": "這是第一筆測試資料",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/data/:id
根據 ID 取得單筆資料

### POST /api/data
新增資料

**請求範例：**
```json
{
  "name": "新資料",
  "description": "這是新資料的描述"
}
```

### PUT /api/data/:id
更新資料

### DELETE /api/data/:id
刪除資料

## 前端使用範例

### 基本 axios 使用

```javascript
import axios from 'axios';

// 取得所有資料
const getAllData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/data');
    console.log('資料:', response.data);
    return response.data;
  } catch (error) {
    console.error('錯誤:', error);
  }
};

// 新增資料
const addData = async (data) => {
  try {
    const response = await axios.post('http://localhost:3001/api/data', data);
    console.log('新增成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('錯誤:', error);
  }
};

// 更新資料
const updateData = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/data/${id}`, data);
    console.log('更新成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('錯誤:', error);
  }
};

// 刪除資料
const deleteData = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/data/${id}`);
    console.log('刪除成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('錯誤:', error);
  }
};
```

### 在 Vue 組件中使用

```vue
<template>
  <div>
    <button @click="fetchData">取得資料</button>
    <div v-for="item in dataList" :key="item.id">
      {{ item.name }} - {{ item.description }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        this.dataList = response.data;
      } catch (error) {
        console.error('取得資料失敗:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
```

## 錯誤處理

### 常見錯誤及解決方案

1. **連接被拒絕 (ECONNREFUSED)**
   - 確認 PostgreSQL 服務正在運行
   - 檢查連接配置是否正確

2. **認證失敗**
   - 確認用戶名和密碼正確
   - 檢查 PostgreSQL 的認證設定

3. **資料庫不存在**
   - 確認資料庫已建立
   - 檢查資料庫名稱是否正確

4. **資料表不存在**
   - 執行 `database.sql` 腳本建立資料表

## 安全性注意事項

1. **環境變數**
   - 在生產環境中使用環境變數存放敏感資訊
   - 不要將資料庫密碼直接寫在程式碼中

2. **輸入驗證**
   - 在後端驗證所有輸入資料
   - 使用參數化查詢防止 SQL 注入

3. **CORS 設定**
   - 在生產環境中限制允許的來源網域

## 進階功能

### 1. 分頁查詢

```javascript
// 後端
app.get('/api/data', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    const result = await pool.query(
      'SELECT * FROM your_table_name ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '查詢失敗' });
  }
});
```

### 2. 搜尋功能

```javascript
// 後端
app.get('/api/data/search', async (req, res) => {
  const { q } = req.query;
  
  try {
    const result = await pool.query(
      'SELECT * FROM your_table_name WHERE name ILIKE $1 OR description ILIKE $1',
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '搜尋失敗' });
  }
});
```

### 3. 資料匯出

```javascript
// 後端
app.get('/api/data/export', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table_name');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=data.json');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '匯出失敗' });
  }
});
```

## 測試

使用提供的 `DataTest.vue` 組件來測試所有功能：

1. 測試資料庫連接
2. 取得所有資料
3. 新增測試資料
4. 查看 API 回應

## 部署

### 生產環境部署

1. **後端部署**
   - 使用 PM2 或 Docker 部署 Node.js 應用
   - 設定環境變數
   - 配置反向代理 (Nginx)

2. **資料庫部署**
   - 使用雲端 PostgreSQL 服務
   - 設定備份策略
   - 配置監控

3. **前端部署**
   - 建置生產版本：`npm run build`
   - 部署到靜態檔案伺服器

## 支援

如有問題，請檢查：
1. PostgreSQL 服務狀態
2. 資料庫連接配置
3. 網路連接
4. 瀏覽器開發者工具的錯誤訊息 
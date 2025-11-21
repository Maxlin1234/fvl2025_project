<template>
  <div class="data-test">
    <h1>PostgreSQL 資料測試</h1>
    
    <!-- 資料庫連接狀態 -->
    <div class="status-section">
      <h3>資料庫狀態</h3>
      <div class="status-item">
        <span class="status-label">連接狀態:</span>
        <span :class="['status-value', dbStatus ? 'connected' : 'disconnected']">
          {{ dbStatus ? '已連接' : '未連接' }}
        </span>
      </div>
    </div>
    
    <!-- 測試按鈕 -->
    <div class="test-section">
      <h3>API 測試</h3>
      <div class="test-buttons">
        <button @click="testConnection" class="btn-test">測試連接</button>
        <button @click="getAllData" class="btn-test">取得所有資料</button>
        <button @click="addTestData" class="btn-test">新增測試資料</button>
        <button @click="clearData" class="btn-test">清除資料</button>
      </div>
    </div>
    
    <!-- 載入狀態 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      處理中...
    </div>
    
    <!-- 錯誤訊息 -->
    <div v-if="error" class="error">
      <h4>錯誤訊息:</h4>
      <pre>{{ error }}</pre>
    </div>
    
    <!-- 成功訊息 -->
    <div v-if="successMessage" class="success">
      {{ successMessage }}
    </div>
    
    <!-- 資料顯示 -->
    <div v-if="data.length > 0" class="data-display">
      <h3>資料列表</h3>
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名稱</th>
              <th>描述</th>
              <th>建立時間</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ formatDate(item.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 原始回應 -->
    <div v-if="rawResponse" class="raw-response">
      <h3>API 回應</h3>
      <pre>{{ JSON.stringify(rawResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataTest',
  data() {
    return {
      dbStatus: false,
      loading: false,
      error: null,
      successMessage: '',
      data: [],
      rawResponse: null
    };
  },
  mounted() {
    this.testConnection();
  },
  methods: {
    // 測試資料庫連接
    async testConnection() {
      this.loading = true;
      this.error = null;
      this.successMessage = '';
      
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        this.dbStatus = true;
        this.successMessage = '資料庫連接成功！';
        this.rawResponse = response.data;
      } catch (err) {
        this.dbStatus = false;
        this.error = `連接失敗: ${err.message}`;
        if (err.response) {
          this.error += `\n狀態碼: ${err.response.status}\n回應: ${JSON.stringify(err.response.data)}`;
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 取得所有資料
    async getAllData() {
      this.loading = true;
      this.error = null;
      this.successMessage = '';
      
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        this.data = response.data;
        this.rawResponse = response.data;
        this.successMessage = `成功取得 ${this.data.length} 筆資料`;
      } catch (err) {
        this.error = `取得資料失敗: ${err.message}`;
        if (err.response) {
          this.error += `\n狀態碼: ${err.response.status}\n回應: ${JSON.stringify(err.response.data)}`;
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 新增測試資料
    async addTestData() {
      this.loading = true;
      this.error = null;
      this.successMessage = '';
      
      try {
        const testData = {
          name: `測試資料 ${Date.now()}`,
          description: `這是一筆測試資料，建立時間: ${new Date().toLocaleString()}`
        };
        
        const response = await axios.post('http://localhost:3001/api/data', testData);
        this.rawResponse = response.data;
        this.successMessage = '測試資料新增成功！';
        
        // 重新取得資料
        await this.getAllData();
      } catch (err) {
        this.error = `新增資料失敗: ${err.message}`;
        if (err.response) {
          this.error += `\n狀態碼: ${err.response.status}\n回應: ${JSON.stringify(err.response.data)}`;
        }
      } finally {
        this.loading = false;
      }
    },
    
    // 清除資料
    async clearData() {
      if (!confirm('確定要清除所有資料嗎？此操作無法復原。')) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      this.successMessage = '';
      
      try {
        // 注意：這裡需要後端提供清除所有資料的 API
        // 目前後端只有刪除單筆資料的 API
        this.successMessage = '請在後端實作清除所有資料的 API';
        this.rawResponse = { message: '需要實作清除 API' };
      } catch (err) {
        this.error = `清除資料失敗: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleString('zh-TW');
    }
  }
};
</script>

<style scoped>
.data-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.status-section, .test-section, .data-display, .raw-response {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.status-label {
  font-weight: bold;
  min-width: 100px;
}

.status-value {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.status-value.connected {
  background-color: #d4edda;
  color: #155724;
}

.status-value.disconnected {
  background-color: #f8d7da;
  color: #721c24;
}

.test-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-test {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-test:hover {
  background-color: #0056b3;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 4px;
  margin-bottom: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.error pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 10px 0 0 0;
  font-size: 12px;
}

.success {
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.data-table {
  overflow-x: auto;
}

.data-table table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table tr:hover {
  background-color: #f5f5f5;
}

.raw-response {
  background-color: #f8f9fa;
}

.raw-response pre {
  background-color: #e9ecef;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}
</style> 
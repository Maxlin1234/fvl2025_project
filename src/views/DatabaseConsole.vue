<template>
  <div class="database-console">
    <h1>資料庫 Console 測試</h1>
    
    <div class="controls">
      <button @click="fetchData" class="btn-fetch">取得資料庫資料</button>
      <button @click="clearConsole" class="btn-clear">清除 Console</button>
      <button @click="testRandom" class="btn-random">測試隨機資料</button>
    </div>
    
    <div class="status">
      <p>狀態: {{ status }}</p>
      <p v-if="dataCount > 0">資料筆數: {{ dataCount }}</p>
    </div>
    
    <div class="instructions">
      <h3>使用說明：</h3>
      <ol>
        <li>點擊「取得資料庫資料」按鈕</li>
        <li>打開瀏覽器開發者工具 (F12)</li>
        <li>切換到 Console 分頁</li>
        <li>查看 console.log 輸出的資料庫資料</li>
      </ol>
    </div>
    
    <div v-if="lastData.length > 0" class="data-preview">
      <h3>最新取得的資料預覽：</h3>
      <pre>{{ JSON.stringify(lastData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DatabaseConsole',
  data() {
    return {
      status: '準備就緒',
      dataCount: 0,
      lastData: []
    };
  },
  mounted() {
    console.log('🚀 DatabaseConsole 組件已載入');
    console.log('📡 準備連接資料庫...');
  },
  methods: {
    async fetchData() {
      this.status = '載入中...';
      console.log('🔄 開始取得資料庫資料...');
      
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        const data = response.data;
        
        this.lastData = data;
        this.dataCount = data.length;
        this.status = '載入成功';
        
        // 在 console 中顯示詳細資訊
        console.log('✅ 資料庫連接成功！');
        console.log('📊 資料庫資料:', data);
        console.log('📋 資料筆數:', data.length);
        console.log('🔍 詳細資料:', JSON.stringify(data, null, 2));
        
        // 顯示每筆資料的詳細資訊
        data.forEach((item, index) => {
          console.log(`📝 第 ${index + 1} 筆資料:`, {
            ID: item.id,
            名稱: item.name,
            描述: item.description,
            建立時間: new Date(item.created_at).toLocaleString('zh-TW'),
            更新時間: new Date(item.updated_at).toLocaleString('zh-TW')
          });
        });
        
        console.log('🎉 資料載入完成！');
        
      } catch (error) {
        this.status = '載入失敗';
        console.error('❌ 取得資料庫資料失敗:', error);
        console.error('🔍 錯誤詳情:', {
          訊息: error.message,
          狀態碼: error.response?.status,
          回應資料: error.response?.data
        });
      }
    },
    
    clearConsole() {
      console.clear();
      console.log('🧹 Console 已清除');
      this.status = 'Console 已清除';
    },
    
    async testRandom() {
      console.log('🎲 測試隨機資料功能...');
      
      try {
        // 取得所有資料
        const response = await axios.get('http://localhost:3001/api/data');
        const data = response.data;
        
        if (data.length > 0) {
          // 隨機選擇一筆資料
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomData = data[randomIndex];
          
          console.log('🎯 隨機選中的資料:', randomData);
          console.log('📌 隨機索引:', randomIndex);
          
          this.status = `隨機測試完成 - 選中第 ${randomIndex + 1} 筆資料`;
        } else {
          console.log('⚠️ 沒有資料可供隨機選擇');
          this.status = '沒有資料可供隨機選擇';
        }
      } catch (error) {
        console.error('❌ 隨機測試失敗:', error);
        this.status = '隨機測試失敗';
      }
    }
  }
};
</script>

<style scoped>
.database-console {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn-fetch, .btn-clear, .btn-random {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.btn-fetch {
  background-color: #4CAF50;
  color: white;
}

.btn-clear {
  background-color: #f44336;
  color: white;
}

.btn-random {
  background-color: #2196F3;
  color: white;
}

.btn-fetch:hover {
  background-color: #45a049;
}

.btn-clear:hover {
  background-color: #da190b;
}

.btn-random:hover {
  background-color: #0b7dda;
}

.status {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.status p {
  margin: 5px 0;
  font-weight: bold;
}

.instructions {
  background-color: #e3f2fd;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.instructions h3 {
  margin-top: 0;
  color: #1976d2;
}

.instructions ol {
  margin: 10px 0;
  padding-left: 20px;
}

.instructions li {
  margin: 5px 0;
  line-height: 1.4;
}

.data-preview {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
}

.data-preview h3 {
  margin-top: 0;
  color: #495057;
}

.data-preview pre {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 
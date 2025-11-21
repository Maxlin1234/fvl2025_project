<template>
  <div class="data-manager">
    <h2>資料管理</h2>
    
    <!-- 載入狀態 -->
    <div v-if="loading" class="loading">
      載入中...
    </div>
    
    <!-- 錯誤訊息 -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- 資料列表 -->
    <div v-if="dataList.length > 0" class="data-list">
      <h3>資料列表</h3>
      <div v-for="item in dataList" :key="item.id" class="data-item">
        <div class="item-info">
          <strong>ID:</strong> {{ item.id }} | 
          <strong>名稱:</strong> {{ item.name }} | 
          <strong>描述:</strong> {{ item.description }}
        </div>
        <div class="item-actions">
          <button @click="editItem(item)" class="btn-edit">編輯</button>
          <button @click="deleteItem(item.id)" class="btn-delete">刪除</button>
        </div>
      </div>
    </div>
    
    <!-- 新增/編輯表單 -->
    <div class="form-section">
      <h3>{{ isEditing ? '編輯資料' : '新增資料' }}</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">名稱:</label>
          <input 
            id="name" 
            v-model="formData.name" 
            type="text" 
            required 
            placeholder="請輸入名稱">
        </div>
        <div class="form-group">
          <label for="description">描述:</label>
          <textarea 
            id="description" 
            v-model="formData.description" 
            placeholder="請輸入描述"
            rows="3"
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">
            {{ isEditing ? '更新' : '新增' }}
          </button>
          <button 
            v-if="isEditing" 
            type="button" 
            @click="cancelEdit" 
            class="btn-cancel"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DataManager',
  data() {
    return {
      dataList: [],
      loading: false,
      error: null,
      isEditing: false,
      editingId: null,
      formData: {
        name: '',
        description: ''
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 取得所有資料
    async fetchData() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        this.dataList = response.data;
      } catch (err) {
        this.error = '取得資料失敗: ' + (err.response?.data?.error || err.message);
        console.error('取得資料錯誤:', err);
      } finally {
        this.loading = false;
      }
    },
    
    // 新增或更新資料
    async submitForm() {
      this.loading = true;
      this.error = null;
      
      try {
        if (this.isEditing) {
          // 更新資料
          await axios.put(`http://localhost:3001/api/data/${this.editingId}`, this.formData);
        } else {
          // 新增資料
          await axios.post('http://localhost:3001/api/data', this.formData);
        }
        
        // 重新取得資料
        await this.fetchData();
        
        // 重置表單
        this.resetForm();
        
      } catch (err) {
        this.error = '操作失敗: ' + (err.response?.data?.error || err.message);
        console.error('提交表單錯誤:', err);
      } finally {
        this.loading = false;
      }
    },
    
    // 編輯資料
    editItem(item) {
      this.isEditing = true;
      this.editingId = item.id;
      this.formData = {
        name: item.name,
        description: item.description
      };
    },
    
    // 取消編輯
    cancelEdit() {
      this.resetForm();
    },
    
    // 刪除資料
    async deleteItem(id) {
      if (!confirm('確定要刪除這筆資料嗎？')) {
        return;
      }
      
      this.loading = true;
      this.error = null;
      
      try {
        await axios.delete(`http://localhost:3001/api/data/${id}`);
        await this.fetchData();
      } catch (err) {
        this.error = '刪除失敗: ' + (err.response?.data?.error || err.message);
        console.error('刪除錯誤:', err);
      } finally {
        this.loading = false;
      }
    },
    
    // 重置表單
    resetForm() {
      this.isEditing = false;
      this.editingId = null;
      this.formData = {
        name: '',
        description: ''
      };
    }
  }
};
</script>

<style scoped>
.data-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.data-list {
  margin-bottom: 30px;
}

.data-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete, .btn-submit, .btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-edit {
  background-color: #2196f3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-submit {
  background-color: #4caf50;
  color: white;
}

.btn-cancel {
  background-color: #9e9e9e;
  color: white;
}

.form-section {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
}
</style> 
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";

createApp(App).use(router).mount('#app');

// 移除 loading 遮罩
window.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading-overlay');
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = 0;
      setTimeout(() => loading.remove(), 400);
    }, 300);
  }
});

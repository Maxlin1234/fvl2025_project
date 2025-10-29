<template>
  <section id="portfolio" class="portfolio">
    <div class="container">
      <h2 class="section-title">{{ isEnglish ? 'Screening Works' : '播映作品' }}</h2>
      <div class="portfolio-grid" ref="grid">
        <div class="portfolio-item" v-for="(item, idx) in portfolioList" :key="idx">
          <a :href="`/works/${item.id}`" target="_blank" rel="noopener" @click="cacheWork(item, idx)">
            <div class="portfolio-image" style="height: 100%;">
              <img :src="'https://unzip-clab-api.clab.org.tw/' + item.photo_1" :alt="item.title" style="width: 100%;height: 100%;">
            </div>
        
            <div class="portfolio-overlay">
              <h3>{{ isEnglish ? item.work_en.title : item.work_zh.title }}</h3>
              <!-- <p>{{item.work_zh.title }}({{item.work_en.title }})</p> -->
              <p>{{ isEnglish ? item.work_en.interactive_description : item.work_zh.interactive_description }}</p>
              <!-- <p>{{ isEnglish ? item.work_zh.photo_1_d : item.work_en.photo_1_d }}</p> -->
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, ref, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'PortfolioSection',
  props: {
    portfolioList: {
      type: Array,
      default: () => []
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const grid = ref(null);

    const buildRowFadeIn = () => {
      const container = grid.value;
      if (!container) return;
      const items = Array.from(container.querySelectorAll('.portfolio-item'));
      if (!items.length) return;

      // 初始狀態
      gsap.set(items, { opacity: 0, y: 24 });

      // 依 offsetTop 分組為各「行」
      const rows = [];
      const rowMap = new Map();
      items.forEach((el) => {
        const top = Math.round(el.offsetTop);
        if (!rowMap.has(top)) rowMap.set(top, []);
        rowMap.get(top).push(el);
      });
      // 由上到下排序
      Array.from(rowMap.keys()).sort((a,b)=>a-b).forEach((k)=> rows.push(rowMap.get(k)));

      // 建立逐行淡入動畫
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 80%',
          once: true
        }
      });

      rows.forEach((rowEls, i) => {
        tl.to(rowEls, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08
        }, i * 0.18); // 每行間隔
      });
    };

    onMounted(async () => {
      await nextTick();
      // 等圖片載入以取得正確 offsetTop
      const images = grid.value ? Array.from(grid.value.querySelectorAll('img')) : [];
      const waitAll = images.map(img => new Promise(resolve => {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }));
      Promise.all(waitAll).then(() => buildRowFadeIn());
      // 視窗尺寸改變時重新建立（避免斷行變化）
      window.addEventListener('resize', buildRowFadeIn, { passive: true });
    });

    return { grid };
  },
  methods: {
    cacheWork(item, idx) {
      try {
        const key = `work_${item.id}`;
        const payload = { ...item, _listIndex: idx };
        localStorage.setItem(key, JSON.stringify(payload));
        const lang = localStorage.getItem('lang');
        if (!lang) {
          localStorage.setItem('lang', this.isEnglish ? 'en' : 'zh');
        }
      } catch (e) {
        console.error('Failed to cache work detail:', e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.portfolio {
  background: #000000;
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #ffffff;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.portfolio-item {
  height: 250px;
  position: relative;
  // border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* 初始淡入狀態由JS設定 */
}

.portfolio-image {
  height: 100%;
  transition: filter 0.3s ease;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.portfolio-item:hover .portfolio-image img {
  filter: brightness(1);
}

.portfolio-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
  transform: translateY(0);
  transition: transform 0.3s ease;
  text-align: left;
  word-break: break-word;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-overlay h3 {
  margin-bottom: 10px;
}

.portfolio-overlay p {
  margin: 0;
}
@media(max-width:768px){
  .portfolio-grid{
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .portfolio-item { height:180px; }
  .portfolio-overlay h3{ font-size: 0.95em; margin-bottom: 6px; }
  .portfolio-overlay p{ font-size: 0.8em; line-height: 1.4; }
}
@media (min-width: 2560px){
.container{
  max-width:60%;
}
.portfolio-item{
  height: 600px;
}
.portfolio-grid{
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
}
.portfolio-overlay h3{
  font-size:2.5em;
}
.portfolio-overlay p{
  font-size: 2em;
}
}


/* 4K: 3840px and wider — make fonts and spacing more generous but keep content readable */
@media (min-width: 3840px){

}
</style> 
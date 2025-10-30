<template>
  <section id="home" class="hero">
    <div class="hero-banner-wrapper">
      <div class="cursor"></div>

      <!-- Banner -->
      <div class="banner-title">
        <picture>
          <!-- <source :srcset="BannerMobile" media="(max-width:768px)" /> -->
          <img :src="BannerDesktop" alt="Banner" />
        </picture>
      </div>

      <div class="banner-title2">
        <img src="@/assets/banner_title2.svg" alt="">
      </div>

      <Banner />

      <!-- 中文按鈕 -->
      <div v-if="showButtons && Chinese" class="zh_btns">
        <button class="corner-btn top-left" @mouseenter="$emit('show-drawer', 'schedule')">
          <span class="btn-zh">場次表</span>
          <span class="btn-en">場次表</span>
        </button>

        <button class="corner-btn top-right" @click="changeEn()">
          <span class="btn-zh">EN</span>
          <span class="btn-zh">EN</span>
        </button>

        <button class="corner-btn bottom-right" @mouseenter="handleAboutButton">
          <span class="btn-zh">關於我們</span>
          <span class="btn-en">關於我們</span>
        </button>

        <button class="corner-btn bottom-left" @mouseenter="$emit('show-drawer', 'lecture')">
          <span class="btn-zh">入場須知</span>
          <span class="btn-en">入場須知</span>
        </button>
      </div>

      <!-- 英文按鈕 -->
      <div v-if="showButtons && English" class="en_btns">
        <button class="corner-btn top-left" @mouseenter="$emit('show-drawer', 'schedule')">
          <span class="btn-zh">TIME</span>
          <span class="btn-en">TIME</span>
        </button>

        <button class="corner-btn top-right" @click="changeZh()">
          <span class="btn-zh">中文</span>
          <span class="btn-zh">中文</span>
        </button>

        <button class="corner-btn bottom-right" @mouseenter="handleAboutButton">
          <span class="btn-zh">ABOUT</span>
          <span class="btn-en">ABOUT</span>
        </button>

        <button class="corner-btn bottom-left" @mouseenter="$emit('show-drawer', 'lecture')">
          <span class="btn-zh">INFO</span>
          <span class="btn-en">INFO</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Banner from './Banner.vue';
import BannerDesktop from '@/assets/banner_title.svg';
import BannerMobile from '@/assets/Banner_mobile.jpg';

export default {
  name: 'HeroSection',
  components: { Banner },
  emits: ['show-drawer', 'change-en'],
  props: {
    showButtons: { type: Boolean, default: false }
  },
  data() {
    return {
      English: false,
      Chinese: true,
      BannerDesktop,
      BannerMobile
    };
  },
  mounted() {
    this.fixVhUnit(); // 🔧 修正 100vh 問題
    this.initCursor();
    window.addEventListener('resize', this.fixVhUnit);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.fixVhUnit);
  },
  methods: {
    fixVhUnit() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    changeEn() {
      this.English = true;
      this.Chinese = false;
      this.$emit('change-en', this.English);
    },
    changeZh() {
      this.English = false;
      this.Chinese = true;
      this.$emit('change-en', this.English);
    },
    handleAboutButton() {
      this.$emit('show-drawer', 'about');
      this.toggleLanguage();
    },
    toggleLanguage() {
      this.English = !this.English;
      this.Chinese = !this.Chinese;
      this.$emit('change-en', this.English);
    },
    initCursor() {
      const cursor = document.querySelector('.cursor');
      if (!cursor) return;
      document.addEventListener('mousemove', e => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
      });
    }
  }
};
</script>

<style lang="scss" scoped>

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* 🔒 鎖定橫向滑動 */
  width: 100%;
  max-width: 100%;
}
* {
  box-sizing: border-box;
}
.hero {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #5e7bff 0%, #20afb4 100%);
  overflow: hidden;
}

.hero-banner-wrapper {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

.banner-title picture img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.banner-title {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  pointer-events: none;
}

.banner-title2 {
  width: 100%;
  position: absolute;
  bottom: 5%;
  left: 0;
  z-index: 2;
  pointer-events: none;
}

/* 滑鼠特效 */
.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 1000;
  transition: transform 150ms ease;
}
.hero-banner-wrapper:hover .cursor {
  transform: translate(-50%, -50%) scale(12);
}

/* 四角按鈕 */
.corner-btn {
  position: absolute;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: black;
  color: white;
  font-weight: bold;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
}
.corner-btn:hover {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.95);
  color: #000;
}

.top-left { top: 24px; left: 24px; }
.top-right { top: 24px; right: 24px; }
.bottom-left { bottom: 24px; left: 24px; }
.bottom-right { bottom: 24px; right: 24px; }

/* ===== 手機版 ===== */
@media (max-width: 768px) {
  .cursor { display: none; }

  .corner-btn {
    width: 64px;
    height: 64px;
    font-size: 14px;
  }

  /* 避免瀏海/底部手勢區域造成裁切，加入 safe-area 偏移 */
  .top-left { top: calc(16px + env(safe-area-inset-top)); left: calc(16px + env(safe-area-inset-left)); }
  .top-right { top: calc(16px + env(safe-area-inset-top)); right: calc(16px + env(safe-area-inset-right)); }
  .bottom-left { bottom: calc(16px + env(safe-area-inset-bottom)); left: calc(16px + env(safe-area-inset-left)); }
  .bottom-right { bottom: calc(16px + env(safe-area-inset-bottom)); right: calc(16px + env(safe-area-inset-right)); }

  .banner-title {
    bottom: 10%;
  }
}
</style>

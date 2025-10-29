<template>
  <div>
    <!-- 首頁區塊 -->
    <HeroSection 
      :showButtons="false" 
      @show-drawer="handleShowDrawer" 
      @change-en="handleLanguageChange" 
    />
    <BannerParticles/>

    <!-- 全域角落按鈕 -->
    <div class="global-corner-btns" :class="[{ en: isEnglish }, { expanded: showAllButtons }]">
      <button 
        class="corner-btn target top-left" 
        @mouseenter="handleShowDrawer('schedule')"
      >
        <span class="btn-zh">{{ isEnglish ? 'SCHEDULE' : '場次表' }}</span>
      </button>
      <button 
        class="corner-btn target top-right" 
        @click="handleLanguageChange(!isEnglish)"
      >
        <span class="btn-zh">{{ isEnglish ? '中文' : 'EN' }}</span>
      </button>
      <button 
        class="corner-btn target bottom-left" 
        @mouseenter="handleShowDrawer('lecture')"
      >
        <span class="btn-zh">{{ isEnglish ? 'INFO' : '入場須知' }}</span>
      </button>
      <button 
        class="corner-btn target bottom-right" 
        @click="handleShowDrawer('about')"
      >
        <span class="btn-zh">{{ isEnglish ? 'ABOUT' : '關於我們' }}</span>
      </button>
      <button 
        class="corner-btn launcher bottom-right" 
        @click="handleMenuLauncherClick"
      >
        <span class="btn-zh">{{ isEnglish ? 'MENU' : '選單' }}</span>
      </button>
    </div>

    <!-- 主要內容區塊 -->
    <div ref="fixedSectionAnchor">
      <FixedSection :isEnglish="isEnglish" />
    </div>
    <AboutSection :firstImage="firstImage" :isEnglish="isEnglish" />
    <VideoBanner />
    <PortfolioSection :portfolioList="portfolioList" :isEnglish="isEnglish" />
    <TeamSection :isEnglish="isEnglish" />
    <FooterBar />

    <!-- 抽屜組件 -->
    <Drawers 
      :showLiveDrawer="showLiveDrawer"
      :showDrawer="showDrawer"
      :showLectureDrawer="showLectureDrawer"
      :currentEventImage="currentEventImage"
      :isEnglish="isEnglish"
      @close-drawer="handleCloseDrawer"
      @event-type-changed="handleEventTypeChange"
    />
  </div>
</template>

<script>
import BannerParticles from './BannerParticles.vue';
import FooterBar from './FooterBar.vue';
import HeroSection from './HeroSection.vue';
import FixedSection from './FixedSection.vue';
import AboutSection from './AboutSection.vue';
import VideoBanner from './VideoBanner.vue';
import PortfolioSection from './PortfolioSection.vue';
import TeamSection from './TeamSection.vue';
import Drawers from './Drawers.vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

gsap.registerPlugin(SplitText, ScrollTrigger);

// 常數定義
const API_BASE_URL = 'https://unzip-clab-api.clab.org.tw/api/v1';
const LOCAL_STORAGE_KEYS = {
  LANG: 'lang'
};
const DRAWER_TYPES = {
  SCHEDULE: 'schedule',
  ABOUT: 'about',
  LECTURE: 'lecture'
};
const EVENT_TYPES = {
  EXHIBITION: 'exhibition',
  WORKSHOP: 'workshop',
  PERFORMANCE: 'performance'
};

export default {
  name: 'MainSection',
  components: { 
    BannerParticles,
    FooterBar, 
    HeroSection,
    FixedSection,
    AboutSection,
    VideoBanner,
    PortfolioSection,
    TeamSection,
    Drawers
  },
  data() {
    return {
      // 狀態管理
      isEnglish: false,
      showAllButtons: true, // 載入即展開
      autoCollapseEnabled: true, // 使用者手動展開後，暫停自動收合
      
      // 抽屜狀態
      showLiveDrawer: false,
      showDrawer: false,
      showLectureDrawer: false,
      
      // 資料
      firstImage: {},
      portfolioList: [],
      currentEventType: EVENT_TYPES.EXHIBITION,
      
      // 表單（如果需要的話）
      form: {
        name: '',
        email: '',
        message: ''
      },
      
      // 內部狀態
      resizeHandler: null,
      cornerButtonsTrigger: null
    }
  },
  computed: {
    currentEventImage() {
      const imageMap = {
        [EVENT_TYPES.EXHIBITION]: img1,
        [EVENT_TYPES.WORKSHOP]: img2,
        [EVENT_TYPES.PERFORMANCE]: img3
      };
      return imageMap[this.currentEventType] || img1;
    }
  },
  async mounted() {
    try {
      this.initLanguage();
      await this.fetchData();
      this.initAnimations();
      this.setupCornerMenuScrollTrigger();
    } catch (error) {
      console.error('MainSection initialization failed:', error);
    }
  },
  beforeUnmount() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.cornerButtonsTrigger) {
      this.cornerButtonsTrigger.kill();
      this.cornerButtonsTrigger = null;
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  methods: {
    // 語言管理
    initLanguage() {
      try {
        const savedLang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANG);
        this.isEnglish = savedLang === 'en';
        console.log("Initial language set to:", this.isEnglish ? "English" : "Chinese");
      } catch (error) {
        console.warn("Failed to read language from localStorage:", error);
        this.isEnglish = false; // 預設為中文
      }
    },

    handleLanguageChange(isEnglish) {
      console.log('Language changed to:', isEnglish ? 'English' : 'Chinese');
      this.isEnglish = isEnglish;
      
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, isEnglish ? 'en' : 'zh');
      } catch (error) {
        console.warn('Failed to persist language:', error);
      }
    },

    // Corner MENU 自動收合
    setupCornerMenuScrollTrigger() {
      this.$nextTick(() => {
        if (!this.$refs.fixedSectionAnchor) return;
        if (this.cornerButtonsTrigger) {
          this.cornerButtonsTrigger.kill();
          this.cornerButtonsTrigger = null;
        }
        this.cornerButtonsTrigger = ScrollTrigger.create({
          trigger: this.$refs.fixedSectionAnchor,
          start: 'top center',
          onEnter: () => { if (this.autoCollapseEnabled) { this.showAllButtons = false; } },      // 進入 FixedSection 自動收合（若啟用）
          onLeaveBack: () => { this.showAllButtons = true; this.autoCollapseEnabled = true; }    // 回到上方自動展開並恢復自動收合
        });
      });
    },

    // 使用者點擊 MENU（手動展開，暫停自動收合）
    handleMenuLauncherClick() {
      this.showAllButtons = true;
      this.autoCollapseEnabled = false;
    },

    // 資料獲取
    async fetchData() {
      try {
        await Promise.all([
          this.fetchFirstImage(),
          this.fetchPortfolioData(),
          this.fetchDatabaseData()
        ]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },

    async fetchFirstImage() {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedules/5/works?page=0&limit=25`);
        this.firstImage = response.data.results[1]?.photo_1 || {};
      } catch (error) {
        console.error('Failed to fetch first image:', error);
        this.firstImage = {};
      }
    },

    async fetchPortfolioData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/schedules/10/works?page=0&limit=25`);
        this.portfolioList = response.data.results || [];
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
        this.portfolioList = [];
      }
    },

    async fetchDatabaseData() {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        console.log('Database data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch database data:', error);
        return [];
      }
    },

    // 抽屜管理
    handleShowDrawer(drawerType) {
      this.showLiveDrawer = false;
      this.showDrawer = false;
      this.showLectureDrawer = false;

      switch (drawerType) {
        case DRAWER_TYPES.SCHEDULE:
          this.showDrawer = true;
          break;
        case DRAWER_TYPES.ABOUT:
          this.showLiveDrawer = true;
          break;
        case DRAWER_TYPES.LECTURE:
          this.showLectureDrawer = true;
          break;
        default:
          console.warn('Unknown drawer type:', drawerType);
      }
    },

    handleCloseDrawer(drawerType) {
      switch (drawerType) {
        case DRAWER_TYPES.SCHEDULE:
          this.showDrawer = false;
          break;
        case DRAWER_TYPES.ABOUT:
          this.showLiveDrawer = false;
          break;
        case DRAWER_TYPES.LECTURE:
          this.showLectureDrawer = false;
          break;
        default:
          console.warn('Unknown drawer type:', drawerType);
      }
    },

    handleEventTypeChange(eventType) {
      this.currentEventType = eventType;
    },

    // 動畫初始化
    initAnimations() {
      this.$nextTick(() => {
        this.initTextAnimation();
        this.initSunAnimation();
        this.initCloud1Animation();
        this.initCloud2Animation();
        this.initServicesSliderScroll();
        this.initAboutStatsAnimation();
        this.initAboutTextAnimation();
      });
    },

    initTextAnimation() {
      this.animateSplitText('.split');
      this.animateSplitText('.hero-title');
      this.animateSplitText('.hero-subtitle', { type: 'words' });
      this.initSectionAnimations();
    },

    animateSplitText(selector, options = {}) {
      const element = document.querySelector(selector);
      if (!element) return;

      const defaultOptions = {
        type: "chars, words",
        charsClass: "char",
        wordsClass: "word"
      };
      const config = { ...defaultOptions, ...options };
      const splitText = new SplitText(element, config);
      const targetElements = config.type.includes('chars') ? splitText.chars : splitText.words;
      
      gsap.set(targetElements, {
        opacity: 0,
        y: 50,
        rotationX: config.type.includes('chars') ? -90 : 0
      });
      gsap.to(targetElements, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
        delay: selector === '.hero-subtitle' ? 0.5 : 0
      });
    },

    initSectionAnimations() {
      const sections = [
        { id: '#schedule', elements: '.section-title, .schedule-table' },
        { id: '#portfolio', elements: '.section-title, .portfolio-item' },
        { id: '#team', elements: '.section-title, .team-item' }
      ];

      sections.forEach(({ id, elements }) => {
        gsap.fromTo(`${id} ${elements}`, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power2.out",
            scrollTrigger: { 
              trigger: id, 
              start: "top 80%", 
              end: "bottom 20%", 
              toggleActions: "play none none reverse" 
            }
          }
        );
      });
    },

    initSunAnimation() {
      const sunImg = this.$refs.sunImg;
      if (!sunImg) return;
      gsap.set(sunImg, { y: '100%', opacity: 1 });
      gsap.to(sunImg, { y: '0%', repeat: 0, yoyo: true, opacity: 1, duration: 2, ease: "power2.out" });
    },

    initCloud1Animation() {
      const cloud1Img = this.$refs.cloud1Img;
      if (!cloud1Img) return;
      gsap.set(cloud1Img, { y: '100%', opacity: 1 });
      gsap.to(cloud1Img, { y: '0%', opacity: 1, duration: 4, ease: "power2.out" });
    },

    initCloud2Animation() {
      const cloud2Img = this.$refs.cloud2Img;
      if (!cloud2Img) return;
      gsap.set(cloud2Img, { y: '100%', opacity: 1 });
      gsap.to(cloud2Img, { y: '0%', opacity: 1, duration: 3, ease: "power2.out" });
    },

    initServicesSliderScroll() {
      this.$nextTick(() => {
        const slider = this.$refs.servicesSlider;
        if (!slider) return;

        const container = slider.parentElement;
        const cardWidth = 320;
        const gap = 24;
        const containerPadding = 40;
        const availableWidth = container.offsetWidth - containerPadding;
        const cardsPerView = Math.floor(availableWidth / (cardWidth + gap));
        const totalCards = slider.children.length;
        const maxScroll = Math.max(0, (totalCards - cardsPerView) * (cardWidth + gap));
        if (maxScroll <= 0) return;
        gsap.set(slider, { x: 0 });
        gsap.to(slider, { x: -maxScroll, ease: 'none',
          scrollTrigger: { trigger: '#services', start: 'top top', end: `+=${maxScroll}`, scrub: 1.2, pin: true, anticipatePin: 1 }
        });
      });
    },

    // About 區塊的 .about-stats 由右至左淡入
    initAboutStatsAnimation() {
      gsap.fromTo(
        '.about .about-stats',
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    },

    // About 區塊的 .about-text 由左至右淡入
    initAboutTextAnimation() {
      gsap.fromTo(
        '.about .about-text',
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    },

    // 工具方法
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    submitForm() {
      alert('感謝您的訊息！我們會盡快回覆您。');
      this.form = { name: '', email: '', message: '' };
    }
  }
}
</script>

<style lang="scss">
// 變數定義
$body-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
$primary-bg: #181818;
$white: #fff;
$black: #111;
$gray-light: #f5f5f5;
$gray-medium: #333;
$gray-dark: #232526;

// 基礎樣式
body {
  background: $primary-bg;
  color: $white;
  font-family: $body-font;
  line-height: 1.6;
  margin: 0 !important;
  overflow-x: hidden; // 防止手機版左右移動
}

h1 {
  font-size: 8vw;
  font-family: 'Syncopate', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: $white;
}

// 區塊樣式
section {
  background: transparent;
  color: $white;
}

.about {
  background: $white;
  color: $black;

  .section-title,
  .about-text,
  .about-stats,
  .stat-item,
  .stat-item h3 {
    color: $black;
  }
}

.services {
  background: #ecebe7;
  color: $white;
}

.portfolio {
  background: $gray-dark;
  color: $white;
}

.contact {
  background: $primary-bg;
  color: $white;
}

.team {
  background: $gray-dark;
  color: $white;
}

.schedule {
  background: $primary-bg;
  color: $white;
}

.schedule-table {
  background: $white;
  color: $black;

  th, td {
    color: $black;
  }

  th {
    background: $gray-light;
    color: $black;
    border-bottom: 2px solid $gray-medium;
  }

  tr:not(:last-child) td {
    border-bottom: 1px solid #eee;
  }

  tr:hover td {
    background: #f0f0f0;
    color: $black;
  }
}

// 卡片樣式
.stat-item {
  background: $primary-bg;
  color: $white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.service-card {
  background: $gray-dark;
  color: $white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.contact-form {
  background: $gray-dark;
  color: $white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.team-content {
  position: relative;
  padding: 5em 2em 2em 2em; 
  backdrop-filter: blur(10px);
}

.team-list {
  background: transparent;
  color: $white;
}

.team-item {
  background: $black;
  color: #bbb;
  border-left: 4px solid $white;
  font-size: 1rem;
}

.team-role {
  font-weight: 700;
  color: $black;
  margin-right: 8px;
}

.footer-bar {
  background: $black;
  color: $white;
}

// 標題樣式
.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: $white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

// 滾動條樣式
::-webkit-scrollbar {
  background: $primary-bg;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: $gray-medium;
  border-radius: 4px;
}

// 動畫相關樣式
.char { 
  display: inline-block; 
  transform-origin: center; 
}

.word { 
  display: inline-block; 
  margin-right: 0.2em; 
}

.hero-title, 
.hero-subtitle, 
.split { 
  white-space: nowrap; 
  overflow: hidden; 
}

.split { 
  font-size: 3.5rem; 
  font-weight: bold; 
  margin-bottom: 20px; 
  color: $white; 
}

@media (max-width: 768px) {
  .hero-title, 
  .hero-subtitle, 
  .split { 
    white-space: normal; 
  }
  .split { 
    font-size: 2.5rem; 
  }
}

// 全域角落按鈕樣式
.global-corner-btns {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  --btn: 5em;

  .corner-btn {
    position: absolute;
    width: var(--btn);
    height: var(--btn);
    border-radius: 50%;
    background: $black;
    color: $white;
    font-weight: bold;
    border: none;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.9s cubic-bezier(.2,.8,.2,1), opacity 0.5s ease;
    pointer-events: auto;

    span {
      display: block;
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  // 初始狀態：所有 target 按鈕疊在 MENU（右下角）
  .target {
    bottom: 24px; 
    right: 24px;
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }

  // 展開狀態：從 MENU 飛向角落
  &.expanded .target { 
    opacity: 1; 
    transform: scale(1); 
  }
  
  &.expanded .target.top-left { 
    transform: translate(calc(-100vw + var(--btn) + 48px), calc(-100vh + var(--btn) + 48px)) scale(1); 
  }
  
  &.expanded .target.top-right { 
    transform: translate(0, calc(-100vh + var(--btn) + 48px)) scale(1); 
  }
  
  &.expanded .target.bottom-left { 
    transform: translate(calc(-100vw + var(--btn) + 48px), 0) scale(1); 
  }

  // MENU 按鈕
  .launcher { 
    bottom: 24px; 
    right: 24px; 
  }
  
  &.expanded .launcher { 
    opacity: 0; 
    pointer-events: none; 
    transition: opacity 0.3s ease; 
  }

  // 英文長字處理
  &.en .top-left span {
    font-size: 0.72em;
    max-width: 100%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: clip;
    letter-spacing: 0.5px;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .global-corner-btns {
    --btn: 80px;

    .corner-btn {
      font-size: 15px;
      padding: 0 6px;
    

    // 手機版：定位四顆按鈕，但僅在展開時顯示
    .target {
      bottom: 32px;
    }
    .top-left    { left: 110px; right: auto; }
    .top-right   { left: 20px;  right: auto; }
    .bottom-left { left: 200px; right: auto; }
    .bottom-right{ left: 290px; right: auto; }

    // 僅在 expanded 時顯示目標按鈕
    &.expanded .target { 
      transform: none; 
      opacity: 1; 
    }

    // 手機版 MENU 保持可見（未展開時）
    .launcher { 
      display: block; 
    }
  }
  }

  .schedule-table th, 
  .schedule-table td {
    padding: 12px 8px;
    font-size: 0.95rem;
  }

  .service-card,
  .contact-form {
    padding: 30px 20px;
  }
}

@media (min-width: 2560px) {
  .global-corner-btns {
    --btn: 250px;

    .corner-btn {
      font-size: 3em;
    }
  }
}
</style>

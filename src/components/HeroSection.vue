<template>
  <section id="home" class="hero" style="position: relative;">
    <div class="hero-banner-wrapper" style="position: absolute;bottom: 0;filter: brightness(105%);">
      <div class="cursor"></div>

     <div class="banner-title"> 
      <picture>
      <!-- <source :srcset="BannerMobile"  style="max-width: 100%;height: auto;" media="(max-width:768px)" /> -->
      <img :src= "BannerDesktop" style="max-width: 100%;height: auto;" alt="">
      </picture>
     </div>
     <div class="banner-title2">
     <img src="@/assets/banner_title2.svg" alt="">
     </div>
      <Banner/>
     
      
      <div v-if="showButtons && Chinese" class="zh_btns">
      <button class="corner-btn top-left" 
              @mouseenter="$emit('show-drawer', 'schedule')">
        <span class="btn-zh">場次表</span>
        <span class="btn-en">場次表</span>
      </button>
      <button class="corner-btn top-right" @click="changeEn()">
        <span  class="btn-zh">EN</span>
        <span  class="btn-zh">EN</span>

      </button>
      
      <button class="corner-btn bottom-right" 
              @mouseenter="handleAboutButton">
        <span class="btn-zh">關於我們</span>
        <span class="btn-en">關於我們</span>
      </button>
      
      <button class="corner-btn bottom-left" 
              @mouseenter="$emit('show-drawer', 'lecture')">
        <span class="btn-zh">入場須知</span>
        <span class="btn-en">入場須知</span>
      </button>
      </div>

      <div v-if="showButtons && English" class="en_btns">
      <button class="corner-btn top-left" 
              @mouseenter="$emit('show-drawer', 'schedule')">
        <span class="btn-zh">TIME</span>
        <span class="btn-en">TIME</span>
      </button>
      <button class="corner-btn top-right" @click="changeZh()">
        <span  class="btn-zh">中文</span>
        <span  class="btn-zh">中文</span>

      </button>
      
      <button class="corner-btn bottom-right" 
              @mouseenter="handleAboutButton">
        <span class="btn-zh">ABOUT</span>
        <span class="btn-en">ABOUT</span>
      </button>
      
      <button class="corner-btn bottom-left" 
              @mouseenter="$emit('show-drawer', 'lecture')">
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
import BannerMobile from '@/assets/Banner_mobile.jpg'

export default {

  name: 'HeroSection',
  components: {
    Banner
  },

  emits: ['show-drawer','change-en'],
  props: {
    showButtons: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      English:false,
      Chinese:true,
      BannerDesktop,
      BannerMobile,
      // message: 'Hello, Vue!' 
    }
  },
  mounted() {
    this.initCursor();
  },
  methods: {
    changeEn(){
        this.English = true
        this.Chinese = false
        this.$emit('change-en', this.English);
      },
      changeZh(){
        this.English = false
        this.Chinese = true
        this.$emit('change-en', this.English);
      },
    toggleLanguage() {
      console.log('toggleLanguage called, current English:', this.English);
      this.English = !this.English;
      this.Chinese = !this.Chinese;
      console.log('Language toggled to English:', this.English);
      this.$emit('change-en', this.English);
    },
    handleAboutButton() {
      this.$emit('show-drawer', 'about');
      this.toggleLanguage();
    },
    initCursor() {
      let cursor = document.querySelector('.cursor');
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #5e7bff 0%, #20afb4 100%);
  color: white;
  padding: 0;
  overflow: hidden; /* 防止手機版左右位移 */
}

.hero-banner-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: hidden;
}

.banner-title {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left:0;
  z-index: 2;
  pointer-events: none;
  position: absolute;
  z-index: 999;
  color: #ffff;
  // bottom: 50%;
  // left: 5%;
  font-size: 1.5em;
  text-decoration: none;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  letter-spacing: 0.2rem;
  // backdrop-filter: blur(5px);
  padding: 0.5rem;
}
.banner-title2{
  width:100%;
  height:auto;
  position: absolute;
  bottom:5%;
  left: 0;
  z-index:2;
  pointer-events:none;
}

.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #000000;
  z-index: 1000;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 150ms ease;
  mix-blend-mode: difference;
}

.hero-banner-wrapper:hover .cursor {
  transform: translate(-50%, -50%) scale(12);
  background-color: rgb(0, 0, 0);
  filter: blur(0.5px);
}

.corner-btn {
  position: absolute;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background:black;
  color: white;
  font-weight: bold;
  border: none;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  z-index: 2;
  cursor: pointer;
  overflow: hidden;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: scale(1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.corner-btn:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.5), 0 0 0 8px rgba(255, 169, 32, 0.1);
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  border-color: rgba(255, 255, 255, 0.4);
}

.corner-btn:active {
  transform: scale(0.95) rotate(-2deg);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.4);
  transition: all 0.1s ease;
}

.corner-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: pulse 2s infinite;
  pointer-events: none;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.corner-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.corner-btn:hover::after {
  opacity: 1;
}

.corner-btn .btn-zh,
.corner-btn .btn-en {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: 1px;
}

.corner-btn .btn-zh {
  top: 50%;
  transform: translateY(-50%);
  opacity: 1;
}

.corner-btn .btn-en {
  top: 50%;
  transform: translateY(100%);
  opacity: 0;
  font-size: 0.9em;
}

.corner-btn:hover .btn-zh {
  transform: translateY(-120%);
  opacity: 0;
  filter: blur(2px);
}

.corner-btn:hover .btn-en {
  transform: translateY(-50%);
  opacity: 1;
  filter: blur(0);
}

.corner-btn.top-left:hover {
  transform: scale(1.1) rotate(-5deg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(126, 126, 126, 0.95));
}

.corner-btn.top-right:hover {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(126, 126, 126, 0.95));
  color:black;
}

.corner-btn.bottom-left:hover {
  transform: scale(1.1) rotate(-3deg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95),  rgba(126, 126, 126, 0.95));
}

.corner-btn.bottom-right:hover {
  transform: scale(1.1) rotate(3deg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(126, 126, 126, 0.95));
}

@keyframes buttonAppear {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(90deg);
    opacity: 0.7;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.corner-btn {
  animation: buttonAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.corner-btn.top-left {
  animation-delay: 0.1s;
}

.corner-btn.top-right {
  animation-delay: 0.2s;
}

.corner-btn.bottom-left {
  animation-delay: 0.3s;
}

.corner-btn.bottom-right {
  animation-delay: 0.4s;
}

.top-left { top: 24px; left: 24px; }
.top-right { top: 24px; right: 24px; }
.bottom-left { bottom: 24px; left: 24px; }
.bottom-right { bottom: 24px; right: 24px; }

@media (max-width: 768px) {

  .banner-title{
    bottom:10%;
  }

  .corner-btn {
    width: 4em;
    height: 4em;
    font-size: 20px;
    // display: none;
  }

  .corner-btn:hover {
    transform: scale(1.05);
  }
  
  .corner-btn::before {
    animation: pulse 3s infinite;
  }
  
  .hero-banner-wrapper {
    min-height: 800px;
    height: 60vw;
    max-height: 60vw;
    z-index: 999;
    width: 100vw;
    overflow: hidden;
  }
  .cursor{
    display: none;
  }
  
  .corner-btn {
    width: 56px;
    height: 56px;
    font-size: 15px;
    padding: 0 6px;
  }
  
  .top-left, .top-right, .bottom-left, .bottom-right {
    top: unset;
    bottom: unset;
    left: unset;
    right: unset;
  }
  
  .top-left    { bottom: 12%; left:110px;width:80px;height: 80px; }
  .top-right   { bottom: 12%; right:110px;width:80px;height: 80px; }
  .bottom-left { bottom: 12%; left: 10px;width:80px;height: 80px; }
  .bottom-right{ bottom: 12%; right: 10px;width:80px;height: 80px; }
}
</style> 
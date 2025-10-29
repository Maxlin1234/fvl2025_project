<template>
  <!-- LiveDrawer 結構 -->
  <div class="live-drawer" :class="{ open: showLiveDrawer }">
    <button class="drawer-close" @click="$emit('close-drawer', 'about')">×</button>
    <div class="drawer-content">
      <img :src="currentEventImage" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;object-fit:cover;">
      <div class="drawer-title">
        <img src="../assets/logos/fvl-logo2.png" class="fvl-logo">
        <h2 style="margin: 0;padding:10px;">{{ isEnglish ? 'C-LAB Future Vision Lab ' : 'C-LAB 未來視覺實驗室' }}</h2>
        <p style="padding:10px;  letter-spacing:0;">{{ isEnglish ? 
          'Sharing C-LAB Future Vision Lab\'s continuous promotion of experimental performance projects "FUTURE VISION LAB" since 2020, using digital experimental architecture to create a dome field (DOME), with the goal of exploring the visual limits of technology media. Over the past four years, more than 100 works have been performed. This project completed hardware and software upgrades in 2023, breaking through previous scales to create a diameter of 15 meters, Taiwan\'s only giant mobile outdoor immersive experience space "C-LAB Dome Theater". Audio and video hardware and software have undergone multiple iterations of development, overcoming the complexity of multiple technologies such as spherical curved surface projection correction, fusion, alignment, playback control and image pre-production. The total computing power of the immersive image projection system can reach 8K*8K ultra-high resolution; internally, a double-layer structure hides audio and video equipment, customizes new transparent projection film, and works with Taiwan Sound Laboratory to build a more complete 25.4-channel surround sound field environment.' : 
          'C-LAB 未來視覺實驗室著重對未來視覺議題的探討與突破，探索科技媒體的視覺極限為實驗目標，企圖勾勒出未來視覺的跨域願景。實驗室本身具備R＆D的能量，整合影像運算、拼接、軟硬體系統、環繞音場及建築結構設計等技術，除策劃展演及陪伴創作者以外，亦進行各項跨域實驗，持續開創視覺及創新科技的新視野。同時針對視覺領域結合AI技術進行多項研發與應用，特別著重在生成式AI結合當代藝術及未來視覺領域提出具有創新與實驗性展演作品或平台環境，並也持續融合新舊科技如VR／AR／XR、物聯網、大數據等，延續實驗室技術累積的研發能量，並與不同領域創作者進行共研、共製與共創機制，發展科技媒體實驗作品或展演，並建立開源的機制，意圖拋磚引玉以增進科技藝術領域在AI發展應用創新。' }}</p>
      </div>
    </div>
  </div>

  <!-- Drawer 結構 -->
  <div class="drawer" :class="{ open: showDrawer }">
    <button class="drawer-close" @click="$emit('close-drawer', 'schedule')">×</button>
    <div class="tobe-contuine">
    <div class="tobe-container" style="display: flex;justify-content: center;align-items: center;width: 100%;height:80vh;">
        <h2 style="padding: 1em;">{{ isEnglish ? 'Schedule will be announced in mid-November' : '預計11月中公布' }}</h2>
    </div>

    </div>
    <!-- //恢復Calender -->
    <!-- <div class="drawer-content2">
      <div class="cal-page">
        <div class="cal-title">
          <h2 style="padding: 20px;color: #fff;">FUTURE VISION LAB <br>{{ isEnglish ? '2025 Schedule' : '2025 節目表' }}</h2>
          <Calendar @event-type-changed="handleEventTypeChange" />
        </div> -->
        <!-- 輪播圖片區域 -->
        <!-- <div class="carousel-container">
          <div class="carousel-wrapper">
            <img 
              v-for="(image, index) in carouselImages" 
              :key="index"
              :src="image" 
              :class="{ active: currentImageIndex === index }"
              class="carousel-image"
              alt="carousel image"
            >
          </div>
          <div class="carousel-indicators">
            <button 
              v-for="(image, index) in carouselImages" 
              :key="index"
              :class="{ active: currentImageIndex === index }"
              class="indicator"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div> -->

      <!-- </div>
    </div> -->
  </div>

  <!-- 講座 Drawer 結構 -->
  <div class="lecture-drawer" :class="{ open: showLectureDrawer }">
    <button class="drawer-close" @click="$emit('close-drawer', 'lecture')">×</button>
    <!-- <div class="logo-contain" style="width: 100vw;height: auto;display:flex;justify-content: center;">
      <img src="../assets/fvl_logo.png" style="width:120px;position: absolute;z-index: 999;left: 0;top:5%;">
    </div> -->

    <div class="drawer-content" style="background-color:black;color:white;">
      <video autoplay muted loop src="../assets/circle.mp4" style="position: absolute;z-index: 1;right:0%;width:100%;height:100%; float: left;clip-path: ellipse(70% 80% at 100% 30%);opacity: 0.5;object-fit:cover;"></video>
      <div class="all-content" style="position: absolute;z-index: 999;height: 100%;width: 100%; flex-direction: column;display: flex;justify-content: center;align-items:flex-start;">
        <h2 style="color:gainsboro;border-bottom: 2px solid white;padding: 20px;margin-left: 40px;">{{ isEnglish ? 'Visitor Guidelines' : '入場須知' }}</h2>
        <div class="list-text">
          <button class="list-btn1" @click="toggleContent()"><h2>{{ isEnglish ? ' Notices for entry ' : '注意事項' }}</h2></button>
          <!-- <button class="list-btn2" @click="toggleContent2()">{{ isEnglish ? 'Photography Guidelines' : '攝錄影需知' }}</button> -->
          <button class="list-btn3" @click="toggleContent3()"><h2>{{ isEnglish ? 'Admission Information' : '索票資訊' }}</h2></button>
        </div>
        <div class="content-container">
          <div class="lecture-list" v-if="showContentA" style="font-size: 15px;">
            <!-- <p>{{ isEnglish ? 
              'Exhibitors, visitors, or personnel in the exhibition area who have the following circumstances and have not improved after being advised by the organizer, the organizer may refuse their entry or require the violator to leave, and prohibit re-entry into the exhibition hall without refund:' : 
              '參展廠商、參觀者或展館區域內人員，有下列情形且經主辦單位勸導未改善者，主辦單位得拒絕其進場或要求違反者離場，並禁止再行進入展場，不予退費：' }}</p>
            <p>{{ isEnglish ? 
              '1. Violating public order or good customs, or affecting the image, hygiene and safety of the exhibition hall, or other behaviors that affect the order of the exhibition, including but not limited to the following behaviors:' : 
              '1.違反公共秩序或善良風俗，或影響展場形象、衛生安全，或其他影響展覽秩序之行為，包含但不限於下列之行為：' }}</p> -->
            <h2>{{ isEnglish ? 
              '⭓ Some performances contain intense strobe lighting effects. Viewer discretion is advised.' : 
              '⭓ 演出內容有部分包含強烈閃光，敬請斟酌入場。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Due to the mirror floor in the venue, wearing "pants" for your visit is recommended.' : 
              '⭓ 因活動場地為鏡面地板，建議請穿著「褲裝」進場觀賞。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Due to limited space inside the venue, picnic mats and chairs are not allowed. If you have other needs, please contact the staff for assistance.' : 
              '⭓ 因場內空間有限，禁止鋪設野餐墊、椅子；若有其他需求，請洽詢現場工作人員協助。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Photography and reels recording are allowed during the screening, but the use of flash is prohibited.' : 
              '⭓ 播映過程可拍照、即時動態拍攝，但禁止使用閃光燈。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Programs may be subject to change.' : 
              '⭓ 主辦單位保有調整與變更活動之權利。' }}</h2>
            <!-- <p>{{ isEnglish ? 
              '(6) Other behaviors that affect the progress of the exhibition.' : 
              '(6)其他影響展覽進行之行為。' }}</p>
            <p>{{ isEnglish ? 
              '2. Protests, petitions and other activities in the exhibition hall that affect the order and viewing quality of the exhibition hall.' : 
              '2.於展館從事之抗議、陳情等活動，影響展場秩序及觀展品質。' }}</p>
            <p>{{ isEnglish ? 
              '3. Exhibitors or other personnel entering and leaving the exhibition hall refuse to enter according to the method stipulated by the organizer.' : 
              '3.參展商或其他出入展場之人員拒絕依主辦單位規定之方式入場。' }}</p>
            <p>{{ isEnglish ? 
              '4. Personnel entering and leaving the exhibition hall use other people\'s identity documents or alter or forge identity documents.' : 
              '4.出入展場相關人員使用他人身分證明文件或變造、偽造身分證明文件。' }}</p>
            <p>{{ isEnglish ? 
              '5. During the exhibition period from May 20 to May 23, persons under 18 years old are prohibited from entering to maintain the order and safety of the exhibition hall.' : 
              '5.展覽期間5月20至5月23日，禁止18歲以下者入場，以維持展場秩序及安全' }}</p> -->
          </div>
          <div class="lecture-list" v-if="showContentB" style="font-size: 15px;">
            <h2>{{ isEnglish ? 
              '⭓ Commercial photography (e.g., wedding photos, product catalogs, photography teaching, etc.) or other photography that affects the safety and viewing quality of the venue is not allowed in the venue.' : 
              '⭓ 館內不開放商業攝影（例：婚紗、商品型錄、攝影教學等）或其他影響場館安全及參觀品質之拍攝。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Except as otherwise specially posted, non-commercial photography is allowed in the venue. To maintain and respect the intellectual property rights of creators, please do not copy video works and films in the exhibition hall.' : 
              '⭓ 館內除另有特別告示，開放非商業性攝影。為維護及尊重創作者智慧財產權， 請勿翻攝展場內錄像作品及影片。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Please do not use flash, tripods, handheld stabilizers or selfie sticks and other professional equipment or auxiliary equipment for photography.' : 
              '⭓ 攝影請勿使用閃光燈、三腳架、手持穩定器或自拍棒等各式專業器材或輔助設備。' }}</h2>
          </div>
          <div class="lecture-list" v-if="showContentC" style="font-size: 15px;">
            <h2>{{ isEnglish ? 
              '⭓ Ticket required for entry. One person, one ticket admission. ' : 
              '⭓ 每場次皆需事先索票，一人一票憑票入場。' }}</h2>
            <h2>{{ isEnglish ? 
              '⭓ Please arrive at least 10 minutes before the performance or screening. Latecomers will not be admitted. ' : 
              '⭓ 每場播映/現場演出於開演前10分鐘開放入場，並不開放遲到觀眾入場。' }}</h2>
                <h2>{{ isEnglish ? 
              '⭓ From Nov. 17th, tickets for the following weekend’s screenings will be released every Monday.' : 
              '⭓ 11/17 起，每週一將開放〔隔週末展映場次〕索票，請密切追蹤把握。' }}</h2>
           
                <h2>{{ isEnglish ? 
              '⭓ For detailed program registration information, please visit the "C-LAB Future Vision Lab" ' : 
              '⭓ 節目索票資訊請鎖定「C-LAB 科技媒體實驗平台」'}}<a href="https://www.facebook.com/CLAB.FUTUREVISIONLAB/" style="color: pink;text-decoration:none">FACEBOOK</a>
              {{ isEnglish ? 'page or the event page of C-LAB on': '或「臺灣當代文化實驗場C-LAB」' }} <a href="https://www.accupass.com/organizer/detail/1807130939251014675956" style="color: pink;text-decoration:none">ACCUPASS</a></h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//恢復Calender
// import Calendar from './Calendar2.vue';

export default {
  name: 'DraWers',
  components: {
    //恢復Calender
    // Calendar
  },
  props: {
    showLiveDrawer: {
      type: Boolean,
      default: false
    },
    showDrawer: {
      type: Boolean,
      default: false
    },
    showLectureDrawer: {
      type: Boolean,
      default: false
    },
    currentEventImage: {
      type: String,
      default: ''
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close-drawer', 'event-type-changed'],
  data() {
    return {
      showContentA: true,
      showContentB: false,
      showContentC: false,
      currentImageIndex: 0,
      carouselImages: [
        require('../assets/slider1.jpg'),
        require('../assets/slider2.jpg'),
        require('../assets/slider3.jpg'),
        require('../assets/slider4.jpg'),
        require('../assets/slider5.jpg'),
        require('../assets/slider6.jpg'),
        require('../assets/slider7.jpg'),
        require('../assets/slider8.jpg'),
      ],
      carouselTimer: null
    }
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
  },
  methods: {
    toggleContent() {
      this.showContentA = true;
      this.showContentB = false;
      this.showContentC = false;
    },
    toggleContent2() {
      this.showContentB = true;
      this.showContentA = false;
      this.showContentC = false;
    },
    toggleContent3() {
      this.showContentC = true;
      this.showContentA = false;
      this.showContentB = false;
    },
    handleEventTypeChange(eventType) {
      this.$emit('event-type-changed', eventType);
    },
    nextSlide() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
    },
    prevSlide() {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.carouselImages.length - 1 
        : this.currentImageIndex - 1;
    },
    goToSlide(index) {
      this.currentImageIndex = index;
    },
    startCarousel() {
      this.carouselTimer = setInterval(() => {
        this.nextSlide();
      }, 4000); // 每4秒自動切換
    },
    stopCarousel() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer);
        this.carouselTimer = null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: -4px 0 24px rgba(0,0,0,0.18);
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(.77,0,.18,1);
  display: flex;
  flex-direction: column;
  padding: 0;
}

.drawer.open {
  transform: translateX(0);
}

.live-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  background: #10ffdb;
  box-shadow: -4px 0 24px rgba(0,0,0,0.18);
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(.77,0,.18,1);
  display: flex;
  flex-direction: column;
  padding: 0;
}

.live-drawer.open {
  transform: translateX(0);
}

.lecture-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #595959;
  color: black;
  z-index: 1000;
  transform: scale(0);
  border-radius: 50%;
  transform-origin: bottom left;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.lecture-drawer.open {
  transform: scale(1);
  border-radius: 0;
}

.drawer-close {
  align-self: flex-end;
  font-size: 3rem;
  background: none;
  border: none;
  color: #ffffff;
  margin: 18px 24px 0 0;
  cursor: pointer;
  z-index: 1;
}

.drawer-content {
  position: absolute;
  z-index: 0;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  color: #222;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.drawer-content2 {
  width: 100vw;
  height: 100vh;
  color: #222;
  padding: 0px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2em;
}

.drawer-content2 img {
  width: 45%;
  height: 100%;
  padding: 0px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
  object-fit: cover;
  display: flex;
}

.cal-page {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.cal-title {
  width: 50%;
  height: 100vh;
  padding: 30px;
  z-index: 1;
}

.drawer-title {
  position: absolute;
  width: 58%;
  height:auto;
  z-index: 1001;
  color: #ffffff;
  top: 10%;
  left: 6%;
  font-size: 1rem;
  text-decoration: none;
  letter-spacing: 0.02rem;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.45);
  padding: 20px 24px;
  // border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
}

.drawer-title h2 {
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.drawer-title p {
  margin: 0;
  line-height: 1.9;
  text-align: justify;
  letter-spacing: 0.2px;
  word-break: break-word;
}

.fvl-logo {
  position: absolute;
  top: 1em;
  right: 0;
  width: 10em;
  height: auto;
}

.lecture-drawer .drawer-content {
  // padding: 40px 32px 32px 32px;
  flex: 1;
  overflow-y: auto;
  color: white;
}

.list-text {
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  margin-left: 40px;
}

.list-btn1 {
  background-color: rgb(255, 255, 255);
  padding: 5px 8px;
  border: 1px black solid;
  color: rgb(0, 0, 0);
}
.list-btn1:hover{
  background-color:#343434;
  color: white;
}

.list-btn2 {
  background-color: white;
  padding: 5px 8px;
  border: 1px black solid;
  color: black;
}

.list-btn2:hover {
  background-color: #343434;
  color: white;
}

.list-btn3 {
  background-color: #ffffff;
  padding: 5px 8px;
  border: 1px black solid;
  color: rgb(0, 0, 0);
}

.list-btn3:hover {
  background-color: #333333;
  color: white;
}

.content-container {
  height: 50%;
  width: 100%;
  min-height: 200px;
  margin-top: 10px;
  margin-bottom: 3em;
}

.lecture-list {
  width: 90%;
  // margin-top: 40px;
  margin-left: 40px;
  padding: 20px;
  gap: 20px;
}

.carousel-container {
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
}

.carousel-wrapper {
  position:absolute;
  width: 100%;
  height: 100%;
}

.carousel-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-image.active {
  opacity: 1;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #fff;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background-color 0.3s ease;
}

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

@media (max-width: 768px) {
  .lecture-list{
    margin: 0;
  }
  .list-text{
    padding: 0;
    margin-left: 1em;
  }
  .carousel-container {
    display: none;
  }

  .drawer-content2 img {
    display: none;
    width: 80%;
    height: 50%;
    padding: 20px;
  }
  
  .cal-title {
    padding: 0;
    width: 100%;
  }
  
  .live-drawer {
    max-width: 100vw;
    width: 100vw;
    padding: 0;
  }
  
  .drawer-title {
    width: calc(100% - 32px);
    height:auto;
    top: 12%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8em;
    padding: 16px;
    z-index: 1001;
    text-align: center;
  }

  .fvl-logo {
    position: static !important;
    display: block;
    margin: 0 auto 8px;
    width: 6em;
    height: auto;
  }
  
  .drawer-close {
    margin: 12px 12px 0 0;
    font-size: 2rem;
  }
}

@media (max-width: 900px) {
  .carousel-container {
    display: none;
  }
  
  .drawer-content2 img {
    display: none;
    width: 80%;
    height: auto;
    padding: 20px;
  }
  
  .cal-title {
    padding: 0;
    width: 100%;
  }
}
</style> 
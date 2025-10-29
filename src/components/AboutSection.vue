<template>
  <section id="about" class="about">
    <div class="container" style="background-color: #fff;padding: 30px 30px 10px;">
      <div class="about-content">
        <div class="about-text" :class="{ en: isEnglish }">
          <p>{{ isEnglish ? 
            'Since its launch in 2020, C-LAB Future Vision Lab has consistently developed FUTURE VISION LAB, an experimental exhibition and performance project that engages in building a digital, experimental architectural site in a dome shape with its vision of exploring the visual limits of technology media. In 2023, with the support of the Ministry of Culture, it is able to expand and upgrade to “FVL DOME”. In terms of size, it is built as a movable DOME with a diameter of 15 meters. The audio-visual hardware and software have undergone several iterations, overcoming the image warping, calibration, mapping, play control, and video pre-production. The immersive image projection system achieves a total resolution of up to 8K*8K. Internally, a double-layer structure conceals the equipment, and a new-type of acoustically transparent projection membrane custom-made according to extensive discussions with the industry sector. In collaboration with Taiwan Sound Lab, a more refined sound field environment has been constructed, enhancing the system to a 25.4-channel immersive surround sound system. In the future, the Future Vision Lab will continue to develop immersive dome environments to meet international standards, showcasing Taiwan’s energetic creativity and providing audiences with a superior immersive sensory experience.”' : 
            '自2020年起，C-LAB 未來視覺實驗室持續推動實驗展演計畫「FUTURE VISION LAB」，遂以數位實驗建築著手打造穹形場域（DOME），以探索科技媒體的視覺極限為目標，過去五年已進行百餘件作品展演。於2023年在文化部支持下，開啟軟硬體升級計畫，尺寸突破過往尺度，打造直徑15公尺、全臺唯一巨型移動式戶外沉浸式體驗空間「C-LAB穹頂劇場」。影音軟硬體歷經數次迭代開發，克服球形曲面投影的校正、融接、對位、播放控制與影像前製等多重技術之複雜度，沉浸影像投影系統總運算可達 8K*8K 超高解析度；內部以雙層結構隱藏影音設備，客製新型態透聲投影膜片並與臺灣聲響實驗室攜手合作建構更完善的 25.4 聲道環繞聲場環境。未來視覺實驗室逐年針對穹形沉浸式場域打造接軌國際規格的創作環境，不僅展現臺灣高量能的創造力，也讓觀眾享受更高品質的沉浸式感官內容與體驗。' }}</p>
          <p>{{ isEnglish ? 
            'The "FUTURE VISION LAB 2025" is held from November 29th to December 21st this year. Over four consecutive weekends, it presents works from Argentina, Russia, Romania, China, Canada, and Japan to Taiwan. The event features a total of 12 programs. Additionally, the Future Vision Lab is actively collaborating with domestic and international organizations to present exhibitions, screenings, and live performances in various formats. This provides an opportunity to experience the latest creative content in the dome space and immerse oneself in the sensory experiences.' : 
            '今年度「FUTURE VISION LAB 2025」，將於 11 月 29 日起至 12 月 21 日，連續 4 個周末，展映來自阿根廷、俄羅斯、羅馬尼亞、中國、加拿大、日本及臺灣等各國精彩作品，共計 12 檔節目；同時未來視覺實驗室積極與國內外單位串聯與合作，呈現展覽、播映和現場 Live 演出等不同形式，一次掌握穹頂場域最新的創作內容，與創作者們一起潛入沉浸式作品帶來的感官體驗之中。' }}</p>
        </div>
    
        <div class="about-stats" >
          <!-- <img :src="'https://unzip-clab-api.clab.org.tw/'+ firstImage" style="width: 100%;"> -->
           <img src="../assets/d.jpg" style="width: 100%;">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data(){
    return{
      
    }
  },
  props: {
    firstImage: {
      type: String,
      default: ''
    },
    isEnglish: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
  color: #111;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: #fff;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

// 初始隱藏，交由 MainSection 的 ScrollTrigger 控制顯示
.about-text {
  opacity: 0;
}

.about-text p {
  font-size: 1rem;
  margin-bottom: 20px;
  line-height: 1.8;
  color: #111;
  text-align: justify;
  text-justify: inter-word;
  letter-spacing: 0.2px;
  word-break: break-word;
}

.about-text.en p {
  letter-spacing: 0.1px;
}

.about-text h2 {
  color: #111;
}

.about-stats {
  display: grid;
  gap: 30px;
  opacity: 0;
}
.about-stats img{
  border-radius: 10px;
}


@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
@media (min-width: 2560px){
  .container{
    max-width: 2000px;
  }
  .about-text h2{
    font-size: 3em;
  }
  .about-text p{
    font-size: 1.5em;
  }
}
</style> 
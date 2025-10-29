<template>
  <div class="wrap" style="margin:0;padding:0;font-family: 'Poppins', sans-serif;">
    <div class="banner">
      <video autoplay muted loop style="width: 100%"> 
        <source src="../assets/dome.mp4" type="video/mp4">
      </video>
      <h2>FUTURE VISION LAB</h2>
      
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'VideoBanner',
  mounted(){
    gsap.registerPlugin(ScrollTrigger);
     gsap.to(".banner h2",{
      x:0,
    // rotation: 360,
    opacity:1,
    ease: "power1.out",
    scrollTrigger : {
      trigger: ".banner h2", //觸發的物件(可省略)
      start: "0% 20%", // (物件開始位置, 卷軸開始位置) 參數可以設定 top center bottom px %
      end: "+=0 80%", //(物件結束位置, 卷軸結束位置) , 也可以設卷軸捲動多少結束動畫(+=300是指start的位置再加上300)
      // pin: true, // 物件執行完動畫會跟著卷軸走，類似 position: fixed
      scrub: 3, // 物件動畫延遲的秒數
      toggleClass: "active", // 增加移除的class，class名稱須為字串
      // markers: true // 顯示標記
     }
  })
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Monda:wght@400..700&display=swap');
.banner {
  width: 100%;
  height:120vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}


.banner h2 {
  @keyframes fadeIn {
  0% { 
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
  animation: fadeIn 2s;	  
  font-family: "Monda", sans-serif;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size:22em;
  font-weight:900;
  text-align:left;
  line-height: 1.1cap;
  text-transform: uppercase;
  mix-blend-mode: screen;
  color: #000;
  background-color: #fff;
  margin: 0;
  // padding-left:0.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke: 15px #000;
  line-height:0.8em;
}

@media (max-width:768px){
  .banner{
    height: 50vh;
  }
  .banner h2{
    font-size: 5em;
    line-height: 1.1;
    -webkit-text-stroke: 5px #000;
  }
}

@media (max-width:480px){
  .banner h2{
    font-size: 6em;
    padding: 0;
  }
}
@media (min-width: 2560px){
  .banner{
    max-height: 20vh;
  }
}
</style> 
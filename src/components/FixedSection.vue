<template>
  <section id="fix-section" style="width: 100vw;background-color:#fff;position: relative;">
    <div class="title-box">
      <h2 id="heading" style="color:black;">{{ isEnglish ? 'FUTURE VISION LAB 2025' : 'FUTURE VISION LAB 2025' }}</h2>
    </div>
    <div class="fix-bg"></div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/src/all';
gsap.registerPlugin(SplitText);
export default {
  name: 'FixedSection',
  mounted(){
    let split = SplitText.create("#heading", { type: "chars" });
    gsap.from(split.chars, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.03,
  scrollTrigger: {
      trigger: "#heading",   // 觸發目標
      start: "top 80%",      // 捲動到視窗 80% 處開始
      end: "top 20%",        // 可選，動畫結束位置
      toggleActions: "play none none reverse", 
      // play: 進入觸發點時播放
      // reverse: 滾回去時反轉動畫
      // 你也可以用 "restart none none none"
      // markers: true // 除錯用，會顯示觸發位置
    }
});
  },
  props: {
    isEnglish: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.title-box{
   position:absolute;
   display: flex;
   justify-content: center;
   font-size: 2em;
   bottom: 0;
   left: 50%;
   width:50vw;
   background-color:#fff;
   z-index: 2;
   padding: 40px;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   -webkit-transform:translateX(-50%);
}
.fix-bg {
  background-image: url("../assets/3.jpg");
  background-position: center;
  min-height: 500px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  height: 60vh;
  width: 100vw;
}

@media (max-width: 768px) {
.title-box h2{
  font-size: 0.6em;
}
}
@media (min-width: 2560px){
  .title-box{
    font-size: 2.5em;
  }
}
</style> 
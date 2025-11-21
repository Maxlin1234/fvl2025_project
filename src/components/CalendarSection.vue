<template>
  <section id="calendar" class="calendar-section">
    <div class="container">
      <div class="wrap1" style="margin:0;padding:0;font-family: 'Poppins', sans-serif;">
        <div class="banner2">
          <video autoplay muted loop style="width: 100%;"> 
            <source src="../assets/dome.mp4" type="video/mp4">
          </video>
          <h2 style="font-size:5em !important;">活動日曆</h2>
        </div>
      </div>

      <ul class="list-show_content" style="display: flex;flex-direction: column;color: black;padding: 0;">
        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.11.19(三)</div>
          <div class="title">貴賓專場V1</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.11.19(四)</div>
          <div class="title">貴賓專場V2</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.11.21(五)</div>
          <div class="title">2025 FUTURE VISION 開幕</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.11.22(六)</div>
          <div class="title">播映</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.11.23(日)</div>
          <div class="title">播映</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.11.28(五)</div>
          <div class="title">三牲獻藝(tbd)</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.11.29(六)</div>
          <div class="title">三牲獻藝(tbd)</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.11.30(日)</div>
          <div class="title">播映</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.12.6(六)</div>
          <div class="title">安娜祺</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.12.7(日)</div>
          <div class="title">安娜祺</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.12.12(五)</div>
          <div class="title">學校合作</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item">
          <div class="date">2025.12.13(六)</div>
          <div class="title">學校合作</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>

        <li class="list-show_content_item" style="background-color: aliceblue;">
          <div class="date">2025.12.14(日)</div>
          <div class="title">播映</div>
          <div class="time">12:00AM~13:00PM</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CalendarSection',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''  // 設置默認值
  //   }
  // },
  mounted(){
    console.log(this.message)
  }
}
</script>

<style lang="scss" scoped>
.calendar-section {
  background: #fff;
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 120px;
  color: #fff;
}

.banner2 {
  width: 100%;
  height: 30vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner2 video {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.banner2 h2 {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 530px;
  text-align: center;
  text-transform: uppercase;
  mix-blend-mode: screen;
  color: #000;
  background-color: #fff;
  margin: 0;
  padding: 0;
}

.list-show_content_item {
  display: flex;
  flex-direction: row;
  font-family: TPAC, Noto Sans TC, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
  font-weight: 500;
  justify-content: space-between;
  line-height: 1.6;
  padding: 10px;
  text-align: left;
  border-top: 1px dashed #0060b9;
  font-size: 1.25rem;
  gap: 10px;
}

.date {
  width: 30%;
  height: auto;
  word-wrap: break-word;
}

.title {
  width: 30%;
  height: auto;
  text-align: center;
  word-wrap: break-word;
}

.time {
  width: 40%;
  height: auto;
  word-wrap: break-word;
  text-align: right;
}
</style> 
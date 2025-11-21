<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$body-font:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

body {
  overflow-x: hidden;
  background: #181818;
  color: #fff;
  font-family:$body-font;
  line-height: 1.6;
  margin: 0 !important;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #ffffff;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
}
}
</style>

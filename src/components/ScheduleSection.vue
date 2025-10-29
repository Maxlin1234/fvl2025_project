<template>
  <section id="schedule" class="schedule">
    <div class="container">
      <h2 class="section-title" style="color: lightgray;">節目時間表</h2>
      <div class="schedule-table-wrapper">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>時間</th>
              <th>節目名稱</th>
              <th>地點</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in schedule" :key="item.time + item.title">
              <td>{{ item.time }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ScheduleSection',
  data() {
    return {
      schedule: [
        { time: '10:00 - 11:00', title: '開幕式', location: '主舞台' },
        { time: '11:15 - 12:00', title: '主題演講：未來科技', location: '會議廳A' },
        { time: '13:00 - 14:30', title: '工作坊：互動設計', location: '教室B' },
        { time: '15:00 - 16:00', title: '圓桌論壇', location: '會議廳A' },
        { time: '16:30 - 17:00', title: '閉幕式', location: '主舞台' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule {
  background: #181818;
  color: #fff;
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

.schedule-table-wrapper {
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  overflow: hidden;
}

.schedule-table th, .schedule-table td {
  padding: 18px 20px;
  text-align: left;
  color: #111;
}

.schedule-table th {
  background: #111;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border-bottom: 2px solid #222;
}

.schedule-table tr:not(:last-child) td {
  border-bottom: 1px solid #eee;
}

.schedule-table tr:hover td {
  background: #f0f0f0;
  color: #111;
}

@media (max-width: 600px) {
  .schedule-table th, .schedule-table td {
    padding: 12px 8px;
    font-size: 0.95rem;
  }
}
</style> 
<template>
  <section class="calendar2">
    <div class="month" v-for="(month, mIdx) in groupedByMonth" :key="mIdx">
      <h3 class="month-title">{{ month.label }}</h3>
      <ul class="event-list">
        <li v-for="evt in month.events" :key="evt.id" class="event-item" :class="{ alt: evt.id % 2 === 0 }">
          <div class="event-date">
            <div class="date">{{ formatDate(evt.date) }}</div>
            <div class="weekday">{{ weekday(evt.date) }}</div>
          </div>
          <div class="event-content">
            <div class="titles">
              <div class="title-zh">{{ evt.titleZh }}</div>
              <div class="title-en">{{ evt.titleEn }}</div>
            </div>
            <div class="meta">
              <span class="time">{{ evt.time }}</span>
              <span v-if="evt.location" class="dot">•</span>
              <span v-if="evt.location" class="loc">{{ isEnglish ? evt.locationEn || evt.location : evt.location }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Cal-endar2',
  props: {
    isEnglish: { type: Boolean, default: false }
  },
  data() {
    return {
      // September and October schedule (bilingual)
      // Note: You can adjust/add entries as needed.
      events: [
        // September
        { id: 101, date: '2025-11-29', time: '14:00–15:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《Sumerian World》', titleEn: '《Sumerian World》', location: 'DOME' },
        { id: 102, date: '2025-11-29', time: '15:00–16:00', titleZh: '《Babel》《奶油金剛》《水身萬象》 ', titleEn: 'Venue Setup', location: 'DOME' },
        { id: 103, date: '2025-11-29', time: '16:00–17:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《in s.asmbli》', titleEn: 'Venue Setup', location: 'DOME' },
        { id: 104, date: '2025-11-29', time: '17:00–18:00', titleZh: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', titleEn: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', location: 'DOME' },
        { id: 106, date: '2025-11-29', time: '18:00–19:00', titleZh: '《Babel》《奶油金剛》《Metaract》', titleEn: '《Babel》《奶油金剛》《Metaract》', location: 'DOME' },
        { id: 107, date: '2025-11-29', time: '19:00–20:00', titleZh: '《Red Sunrise》《水身萬象》 ', titleEn: 'Technical Rehearsal', location: 'DOME' },

        { id: 108, date: '2025-11-30', time: '14:00–15:00', titleZh: '《Babel》《奶油金剛》《Metaract》', titleEn: '《Sumerian World》', location: 'DOME' },
        { id: 109, date: '2025-11-30', time: '15:00–16:00', titleZh: '《Red Sunrise》《水身萬象》', titleEn: 'Venue Setup', location: 'DOME' },
        { id: 110, date: '2025-11-30', time: '16:00–17:00', titleZh: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', titleEn: 'Venue Setup', location: 'DOME' },
        { id: 111, date: '2025-11-30', time: '17:00–18:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《奶油金剛》', titleEn: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', location: 'DOME' },
        { id: 112, date: '2025-11-30', time: '18:00–19:00', titleZh: '《Red Sunrise》《水身萬象》 ', titleEn: '《Babel》《奶油金剛》《Metaract》', location: 'DOME' },


        
        // October
        { id: 113, date: '2025-12-05', time: '19:30–20:00', titleZh: '《thewhole》', titleEn: 'Test Screening', location: 'DOME' },
        { id: 114, date: '2025-12-06', time: '14:30–15:00', titleZh: '《thewhole》', titleEn: 'Test Screening', location: 'DOME' },
        { id: 115, date: '2025-12-06', time: '19:30–20:00', titleZh: '《thewhole》', titleEn: 'Test Screening', location: 'DOME' },
        { id: 116, date: '2025-12-07', time: '14:30–15:00', titleZh: '《thewhole》', titleEn: 'Talk: Immersive Storytelling', location: 'Lecture Hall', locationEn: 'DOME' },
        { id: 117, date: '2025-12-10', time: '14:00–15:00', titleZh: '貴賓專場', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 1118, date: '2025-12-11', time: '14:00–15:00', titleZh: '學校（專場）', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },

        { id: 104, date: '2025-12-13', time: '14:00–15:00', titleZh: '《沉浸影像工作坊成果呈現》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-13', time: '15:00–16:00', titleZh: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-13', time: '16:00–17:00', titleZh: '《Babel》《奶油金剛》《水身萬象》 ', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-13', time: '17:00–18:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《Metaract》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-13', time: '18:00–19:00', titleZh: '《沉浸影像工作坊成果呈現》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-13', time: '19:00–20:00', titleZh: '《Red Sunrise》《Red Sunrise》《in s.asmbli》《in s.asmbli》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },

        { id: 104, date: '2025-12-14', time: '14:00–15:00', titleZh: '《沉浸影像工作坊成果呈現》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-14', time: '15:00–16:00', titleZh: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-14', time: '16:00–17:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《Metaract ', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-14', time: '17:00–18:00', titleZh: '《沉浸影像工作坊成果呈現》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-14', time: '18:00–19:00', titleZh: '《Babel》《奶油金剛》《Metaract》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },

        { id: 104, date: '2025-12-19', time: '18:00–19:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-19', time: '19:00–20:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },


        { id: 104, date: '2025-12-20', time: '14:00–15:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-20', time: '15:00–16:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-20', time: '16:00–17:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-20', time: '17:00–18:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-20', time: '18:00–19:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-20', time: '19:00–20:00', titleZh: 'FVL x 工研院(自製節目)', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },


        { id: 104, date: '2025-12-21', time: '14:00–15:00', titleZh: '《Babel》《奶油金剛》《Metaract》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-21', time: '15:00–16:00', titleZh: '《Red Sunrise》《水身萬象》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-21', time: '16:00–17:00', titleZh: '《Hurtubise: Orchestrating Chaos》《in s.asmbli》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-21', time: '17:00–18:00', titleZh: '《昌勳與他的打字機》Dome穴遇言《奶油金剛》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
        { id: 104, date: '2025-12-21', time: '18:00–19:00', titleZh: '《Red Sunrise》《水身萬象》', titleEn: 'Talk: Immersive Storytelling', location: 'DOME', locationEn: 'DOME' },
      ]
    }
  },
  computed: {
    groupedByMonth() {
      const byMonth = {};
      for (const evt of this.events) {
        const ym = evt.date.slice(0, 7); // YYYY-MM
        if (!byMonth[ym]) byMonth[ym] = [];
        byMonth[ym].push(evt);
      }
      const ordered = Object.keys(byMonth)
        .sort()
        .map(ym => ({
          label: this.formatMonthLabel(ym),
          events: byMonth[ym].sort((a, b) => a.date.localeCompare(b.date))
        }));
      return ordered;
    }
  },
  methods: {
    formatMonthLabel(ym) {
      const [y, m] = ym.split('-').map(n => parseInt(n, 10));
      const monthZh = `${y}年${m}月`;
      const monthEn = new Date(`${ym}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      return this.isEnglish ? monthEn : monthZh;
    },
    formatDate(iso) {
      const d = new Date(iso);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      if (this.isEnglish) return `${y}/${m}/${day}`;
      return `${y}.${m}.${day}`;
    },
    weekday(iso) {
      const d = new Date(iso);
      if (this.isEnglish) {
        return d.toLocaleDateString('en-US', { weekday: 'short' });
        
      }
      const map = ['日', '一', '二', '三', '四', '五', '六'];
      return `(${map[d.getDay()]})`;
    }
  }
}
</script>

<style scoped>
.calendar2 {
  background: #fff;
  color: #000;
  /* border-radius: 16px; */
  padding: 16px;
}

.month + .month { margin-top: 24px; }

.month-title {
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 12px 0;
}

.event-list { list-style: none; padding: 0; margin: 0; }

.event-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 12px;
  border-top: 1px dashed #0060b9;
}
.event-item.alt { background: #f5fbff; }

.event-date { min-width: 140px; display: flex; flex-direction: column; gap: 2px; }
.event-date .date { font-weight: 700; }
.event-date .weekday { color: #666; font-size: 12px; }

.event-content { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 12px; }
.titles { display: flex; flex-direction: column; gap: 2px; }
.title-zh { font-size: 16px; font-weight: 700; }
.title-en { font-size: 14px; color: #333; }

.meta { color: #111; font-size: 14px; white-space: nowrap; display: flex; align-items: center; gap: 8px; }
.meta .dot { color: #999; }

@media (max-width: 768px) {
  .event-item { flex-direction: column; align-items: flex-start; }
  .event-content { width: 100%; flex-direction: column; align-items: flex-start; gap: 6px; }
  .meta { font-size: 13px; }
}
</style>
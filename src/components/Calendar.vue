<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="calendar-nav">
        <button class="calendar-nav-btn" @click="prevMonth" :disabled="currentMonth === 11">&lt;</button>
        <div class="calendar-title" style="display: flex;flex-direction: column;">
        <h3>{{ currentYear }}年{{ currentMonth }}月</h3>
        <p class="calendar-subtitle">*詳細活動資訊請點選日期查看</p>
        </div>
        <button class="calendar-nav-btn" @click="nextMonth" :disabled="currentMonth === 12">&gt;</button>
      </div>
      <!-- 活動類型切換按鈕 -->
      <div class="event-type-buttons">
        <button 
          class="type-button" 
          :class="{ active: currentEventType === 'exhibition' }"
          @click="switchEventType('exhibition')"
        >
          開幕
        </button>
        <button 
          class="type-button2" 
          :class="{ active: currentEventType === 'workshop' }"
          @click="switchEventType('workshop')"
        >
          播映
        </button>
        <button 
          class="type-button3" 
          :class="{ active: currentEventType === 'performance' }"
          @click="switchEventType('performance')"
        >
          LIVE 演出
        </button>
      </div>
    </div>

     <!-- 選中日期的詳細資訊 -->
     <div class="selected-date-info" v-if="selectedDate">
      <h4>{{ selectedDate }} 日</h4>
      <div class="date-events" v-if="getEventsForDate(selectedDate).length > 0">
        <div class="event-item" v-for="event in getEventsForDate(selectedDate)" :key="event.id">
          <span class="event-time">{{ event.time }}</span>
          <span class="event-title">{{ event.title }}</span>
          <span class="event-type-tag" :class="event.type">{{ getEventTypeName(event.type) }}</span>
        </div>
      </div>
      <p v-else class="no-events">當日無活動安排</p>
    </div>
    
    <div class="calendar-grid">
      <!-- 星期標題 -->
      <div class="calendar-weekdays">
        <div class="weekday">日</div>
        <div class="weekday">一</div>
        <div class="weekday">二</div>
        <div class="weekday">三</div>
        <div class="weekday">四</div>
        <div class="weekday">五</div>
        <div class="weekday">六</div>
      </div>
      
      <!-- 日期格子 -->
      <div class="calendar-days">
        <!-- 10月的日期（前一個月的尾巴） -->
        <div class="day prev-month" v-for="day in prevMonthDays" :key="`prev-${day}`">
          {{ day }}
        </div>
        
        <!-- 11月的日期 -->
        <div 
          class="day current-month" 
          :class="{ 
            'today': isToday(day),
            'has-event': hasEvent(day)
          }"
          :data-type="currentEventType"
          v-for="day in currentMonthDays" 
          :key="`current-${day}`"
          @click="selectDate(day)"
        >
          {{ day }}
          <div class="event-indicator" v-if="hasEvent(day)"></div>
        </div>
        
        <!-- 12月的日期（下一個月的開頭） -->
        <div class="day next-month" v-for="day in nextMonthDays" :key="`next-${day}`">
          {{ day }}
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
export default {
  name: 'Cal-endar',
  data() {
    return {
      selectedDate: null,
      currentEventType: 'exhibition',
      currentYear: 2025,
      currentMonth: 11, // 11=11月, 12=12月
      events: [
        // 11月活動
        { id: 1, date: 21, time: '10:00', title: '開幕式', type: 'exhibition', year: 2025, month: 11 },
        { id: 2, date: 22, time: '10:00', title: '播映作品', type: 'workshop', year: 2025, month: 11 },  
        { id: 3, date: 23, time: '10:00', title: '播映作品', type: 'workshop', year: 2025, month: 11 },
        { id: 4, date: 28, time: '10:00', title: '播映作品', type: 'performance', year: 2025, month: 11 },  
        { id: 5, date: 29, time: '10:00', title: '播映作品', type: 'performance', year: 2025, month: 11 },    
        { id: 6, date: 30, time: '10:00', title: '播映作品', type: 'workshop', year: 2025, month: 11 },  


        // 12月活動
        { id: 7, date: 14, time: '10:00', title: '播映作品', type: 'workshop', year: 2025, month: 12 },  
        { id: 8, date: 6, time: '10:00', title: '播映作品', type: 'performance', year: 2025, month: 12 },  
        { id: 9, date: 7, time: '10:00', title: '播映作品', type: 'performance', year: 2025, month: 12 },  
        { id: 14, date: 2, time: '10:00', title: '12月開幕式', type: 'exhibition', year: 2025, month: 12 },
        { id: 15, date: 10, time: '15:00', title: '12月藝術家導覽', type: 'exhibition', year: 2025, month: 12 },

      ]
    }
  },
  computed: {
    firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    },
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    prevMonthDays() {
      const days = [];
      const prevMonthDays = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
      for (let i = this.firstDayOfMonth - 1; i >= 0; i--) {
        days.push(prevMonthDays - i);
      }
      return days;
    },
    currentMonthDays() {
      const days = [];
      for (let i = 1; i <= this.daysInMonth; i++) {
        days.push(i);
      }
      return days;
    },
    nextMonthDays() {
      const days = [];
      const totalCells = 42;
      const usedCells = this.prevMonthDays.length + this.currentMonthDays.length;
      const remainingCells = totalCells - usedCells;
      for (let i = 1; i <= remainingCells; i++) {
        days.push(i);
      }
      return days;
    }
  },
  methods: {
    selectDate(day) {
      this.selectedDate = day;
    },
    switchEventType(type) {
      this.currentEventType = type;
      this.selectedDate = null;
      // 向父組件發送事件類型變更通知
      this.$emit('event-type-changed', type);
    },
    prevMonth() {
      if (this.currentMonth > 11) {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth < 12) {
        this.currentMonth++;
      }
    },
    isToday(day) {
      const today = new Date();
      return today.getFullYear() === this.currentYear &&
             today.getMonth() + 1 === this.currentMonth &&
             today.getDate() === day;
    },
    hasEvent(day) {
      return this.events.some(event => event.date === day && event.type === this.currentEventType && event.year === this.currentYear && event.month === this.currentMonth);
    },
    getEventsForDate(day) {
      return this.events.filter(event => event.date === day && event.type === this.currentEventType && event.year === this.currentYear && event.month === this.currentMonth);
    },
    getEventTypeName(type) {
      const typeNames = {
        'exhibition': '展覽',
        'workshop': '工作坊',
        'performance': '表演'
      };
      return typeNames[type] || type;
    }
  }
}
</script>

<style scoped>
.calendar-container {
  max-width:800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  text-align: center;
  margin-bottom: 30px;
}

.calendar-header .event-type-buttons {
  margin-top: 25px;
  margin-bottom: 0;
}

.calendar-header h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 5px 0;
}

.calendar-subtitle {
  font-size: 1.1rem;
  color: #9d9d9d;
  margin: 0;
  font-weight: 700;
}

.calendar-grid {
  margin-bottom: 30px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 10px;
}

.weekday {
  padding: 15px 10px;
  text-align: center;
  font-weight: 600;
  color: #555;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.day.prev-month,
.day.next-month {
  color: #ccc;
  cursor: default;
}

.day.current-month {
  color: #333;
  background: white;
  border: 1px solid #e0e0e0;
}

.day.today {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.day.has-event {
  color: white;
  font-weight: 600;
}

/* 不同活動類型的顏色 */
.day.has-event[data-type="exhibition"] {
  background: linear-gradient(135deg, #5a96ff 0%, #5a96ff 100%);
}

.day.has-event[data-type="workshop"] {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff6b6b 100%);
}

.day.has-event[data-type="performance"] {
  background: linear-gradient(135deg, #4ecdc4 0%, #4ecdc4 100%);
}

.event-indicator {
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

/* 活動類型切換按鈕樣式 */
.event-type-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.type-button {
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.type-button:hover {
  border-color: #5a96ff;
  color: #5a96ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.2);
}

.type-button.active {
  background: #5a96ff;
  color: white;
  border-color: #5a96ff;
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.3);
}
.type-button2 {
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.type-button2:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.2);
}

.type-button2.active {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.3);
}
.type-button3 {
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.type-button3:hover {
  border-color: #4ecdc4;
  color:#4ecdc4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.2);
}

.type-button3.active {
  background: #4ecdc4;
  color: white;
  border-color:#4ecdc4;
  box-shadow: 0 4px 12px rgba(90, 150, 255, 0.3);
}

/* 活動類型標籤樣式 */
.event-type-tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  margin-left: auto;
}

.event-type-tag.exhibition {
  background: #5a96ff;
}

.event-type-tag.workshop {
  background: #ff6b6b;
}

.event-type-tag.performance {
  background: #4ecdc4;
}

.selected-date-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  margin-bottom:10px;
}

.selected-date-info h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.2rem;
}

.date-events {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-time {
  font-weight: 600;
  color: #667eea;
  min-width: 60px;
}

.event-title {
  color: #333;
  font-weight: 500;
}

.no-events {
  color: #666;
  font-style: italic;
  margin: 0;
}

@media (max-width: 768px) {
  .calendar-container {
    padding: 15px;
    margin: 0 10px;
  }
  
  .calendar-header h3 {
    font-size: 1.5rem;
  }
  
  .weekday {
    padding: 10px 5px;
    font-size: 0.8rem;
  }
  
  .day {
    font-size: 0.85rem;
  }
  
  .selected-date-info {
    padding: 15px;
  }
  
  .event-type-buttons {
    gap: 10px;
    margin: 20px 0;
  }
  
  .type-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
  
  .event-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .event-type-tag {
    margin-left: 0;
    align-self: flex-start;
  }
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}
.calendar-nav-btn {
  background: #5a96ff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.calendar-nav-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style> 
<template>
  <section id="team" class="team" :class="{ en: isEnglish }" style="padding: 0;margin: 0;overflow: hidden;position: relative;">
    <div class="container">
      <div class="team-content">
        <h2 class="section-title">{{ isEnglish ? 'Production Team' : '製作團隊' }}</h2>

        <div class="team-columns">
          <!-- 左欄 -->
          <div class="team-column left-column">
            <div v-for="(row, idx) in leftColumn" :key="idx" class="row">
              <template v-if="row.roleZh || row.roleEn">
                <div class="role">{{ isEnglish ? row.roleEn : row.roleZh }}</div>
                <div class="sep">｜</div>
              </template>
              <div class="value" :class="{ 'value-only': !row.roleZh && !row.roleEn }" v-html="isEnglish ? row.valueEn : row.valueZh"></div>
            </div>
          </div>
          <!-- 右欄 -->
          <div class="team-column right-column">
            <div v-for="(row, idx) in rightColumn" :key="idx" class="row">
              <div class="role">{{ isEnglish ? row.roleEn : row.roleZh }}</div>
              <div class="sep">｜</div>
              <div class="value" v-html="isEnglish ? row.valueEn : row.valueZh"></div>
            </div>
          </div>
        </div>


      </div>
    </div>
            <!-- 合作單位和贊助單位區塊 -->
            <div class="partners-section">
          <!-- 主辦單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Organizer ' : '主辦單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item">
                <img src="../assets/logos/clab.png" alt="臺灣當代文化實驗场 Taiwan Contemporary Culture Lab" class="partner-logo" />
                <!-- <div class="partner-text">
                  <div class="partner-name-zh">臺灣當代文化實驗场</div>
                  <div class="partner-name-en">Taiwan Contemporary Culture Lab</div>
                </div> -->
              </div>
            </div>
            
          </div>
           <!-- 指導單位 -->
           <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Supported by' : '補助單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item">
                <img src="../assets/logos/Mou.jpg" alt="文化部 Ministry of Culture" class="partner-logo" />
                <!-- <div class="partner-text">
                  <div class="partner-name-zh">文化部</div>
                  <div class="partner-name-en">MINISTRY OF CULTURE</div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- 執行單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Executive Organizer' : '執行單位' }}</h3>
            <div class="partner-logos">
              <div class="partner-item">
                <img src="../assets/logos/fvl-logo2.png" alt="臺灣當代文化實驗场 Taiwan Contemporary Culture Lab" class="partner-logo" />
                <div class="partner-logo-text"></div>
                <!-- <div class="partner-text">
                  <div class="partner-name-en">TECHNOLOGY MEDIA PLATFORM</div>
                </div> -->
              </div>
            </div>
          </div>

          <!-- 合作單位 -->
          <div class="partner-group">
            <h3 class="partner-title">{{ isEnglish ? 'Collaborator' : '合作單位' }}</h3>
            <div class="partner-logos">
          
              <div class="partner-item">
                <img src="../assets/logos/Anorchy.png" alt="安娜琪舞蹈劇場" class="partner-logo" />
              </div>

              <div class="partner-item">
                <img src="../assets/logos/shihchien.png" alt="實踐大學媒體傳達設計學系" class="partner-logo" />
              </div>

              <div class="partner-item">
                <img src="../assets/logos/ITRI.png" alt="財團法人工業技術研究院" class="partner-logo" />
              </div>
            
            
            </div>
          </div>
        </div>
  </section>
</template>

<script>
export default {
  name: 'TeamSection',
  props: {
    isEnglish: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 左欄：10個項目（計畫主持人到音響系統統籌）
    leftColumn() {
      return [
        { roleZh: '計畫主持人', roleEn: 'Project Principal', valueZh: '蔡奇宏', valueEn: 'Warrick TSAI' },
        { roleZh: '節目統籌', roleEn: 'Project Manager', valueZh: '廖苑喻、黃品慧', valueEn: 'Emma LIAO, Celine NG' },
        { roleZh: '技術統籌', roleEn: 'Technical Director', valueZh: '蔡奇宏', valueEn: 'Warrick TSAI' },
        { roleZh: '技術執行', roleEn: 'Technical Coordinator', valueZh: '劉嘉昀', valueEn: 'LIU Chia-Yun' },
        { roleZh: '前期建築概念設計', roleEn: 'Preliminary Conceptual Design', valueZh: '陽明交通大學建築研究所', valueEn: 'Department of Architecture, National' },
        { roleZh: '', roleEn: '', valueZh: 'JHStudio', valueEn: 'JHStudio' },
        { roleZh: '建築工程', roleEn: 'Architectural Engineering', valueZh: 'achy_made', valueEn: 'achy_made' },
        { roleZh: '前期技術執行', roleEn: 'Preliminary Technical Coordinator', valueZh: '王竣恆', valueEn: 'Charles WANG' },
        { roleZh: '聲場設計', roleEn: 'Sound Field Design', valueZh: 'C-LAB 臺灣聲響實驗室', valueEn: 'C-LAB Taiwan Sound Lab' },
        { roleZh: '音響系統統籌', roleEn: 'Sound System Coordination', valueZh: '黑米創意工作室', valueEn: 'BlackRice Studio' }
      ];
    },
    // 右欄：6個項目（開場影像到前導影片剪輯）
    rightColumn() {
      return [
        { roleZh: '開場影像', roleEn: 'Opening Video Design', valueZh: '葉澈', valueEn: 'YEH Che' },
        { roleZh: '主視覺設計', roleEn: 'Key Vision Design', valueZh: '林羅伯', valueEn: 'Robert LIN' },
        { roleZh: '網站設計', roleEn: 'Website Design', valueZh: '林瀚寬', valueEn: 'LIN Han-Kuan' },
        { roleZh: '靜態攝影', roleEn: 'Photo Documentation', valueZh: 'ANPIS FOTO 王世邦、林軒朗', valueEn: 'ANPIS FOTO Wang Shibang, LIN Hsuan-Lang' },
        { roleZh: '動態攝影', roleEn: 'Video Documentation', valueZh: '異影業有限公司', valueEn: 'Un Studio Co., Ltd.' },
        { roleZh: '前導影片剪輯', roleEn: 'Trailer Editing', valueZh: '浮石影像工作室', valueEn: 'FUSHIDA FILM STUDIO' }
      ];
    }
  }
}
</script>

<style lang="scss" scoped>
.team {
  background: #ffffff !important;
  padding: 60px 0;
  overflow: hidden;
  color: #333333;
}

.container {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 16px 60px;
  box-sizing: border-box;
  background: #ffffff;
}

.team-content {
  margin: 0 auto;
  background: #ffffff;
}

.section-title {
  margin: 0 auto 24px;
  text-align: left;
  background: #ffffff;
  color: #333333;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.team-columns {
  display: flex;
  gap: 48px;
  margin-bottom: 60px;
  align-items: flex-start;
}

.team-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.right-column {
  padding-top: 0;
  /* 右欄從第二個項目開始對齊，需要計算第一個項目的高度 */
}

.right-column .row:first-child {
  margin-top: calc(1.9em + 18px); /* 對齊左欄第二個項目 */
}

.row {
  display: flex;
  align-items: flex-start;
  line-height: 1.9;
  color: #222;
}

.role {
  flex: 0 0 120px;
  max-width: 160px;
  color: #444;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

.sep {
  padding: 0 10px;
  color: #999;
}

.value {
  flex: 1;
  min-width: 0;
  color: #222;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.value-only {
  margin-left: 0;
  // font-weight: 600;
}

/* 合作單位和贊助單位樣式 */
.partners-section {
  // gap:20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid #eee;
}

.partner-group {
  margin-bottom: 40px;
}

.partner-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  text-align: left;
}

.partner-logos {
  display: flex;
  flex-wrap: nowrap;
  gap: 24px;
  align-items: center;
}

/* 合作單位的 logo 間距更小 */
.partner-group:last-child .partner-logos {
  gap: 12px;
}

.partner-item {
  align-items:start;
  gap: 15px;
  border-radius: 8px;
  min-width: 180px;
  transition: all 0.3s ease;
}

// .partner-item:hover {
//   background: #f0f0f0;
//   transform: translateY(-2px);
//   box-shadow: 0 4px 12px rgba(0,0,0,0.1);
// }

.partner-logo {
  width: 160px;
  height: 60px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
}

.partner-logo-text {
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: #333;
  text-align: center;
  flex-shrink: 0;
}

.partner-text {
  flex: 1;
  min-width: 0;
}

.partner-name-zh {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  line-height: 1.9;
}

.partner-name-en {
  font-size: 15px;
  color: #666;
  line-height: 1.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team.en .row { align-items: flex-start; }
.team.en .role { flex: 0 0 200px; max-width: 220px; font-size: 14px; white-space: normal; word-break: break-word; line-height: 1.4; }
.team.en .sep { padding: 0 8px; }
.team.en .value { font-size: 14px; display: block; -webkit-line-clamp: initial; -webkit-box-orient: initial; overflow: visible; word-break: break-word; white-space: normal; }

@media (max-width: 768px) {
  .partners-section{flex-wrap: wrap;gap: 1em;}
  .container { padding: 16px 12px 48px; }
  .team-columns { 
    flex-direction: column; 
    gap: 32px; 
    margin-bottom: 40px; 
  }
  .right-column .row:first-child {
    margin-top: 0; /* 手機版取消偏移 */
  }
  .row { line-height: 1.8; }
  .role { flex: 0 0 110px; font-size: 14px; }
  .value { font-size: 14px; -webkit-line-clamp: 3; }
  /* 手機版：JHStudio 對齊內容區域 */
  .value-only {
    margin-left: calc(110px + 36px); /* 角色寬度 110px + 分隔符約 20px + 額外對齊 8px */
  }
  .team.en .role { flex: 0 0 130px; font-size: 13px; white-space: normal; word-break: break-word; line-height: 1.4; }
  .team.en .value { font-size: 13px; -webkit-line-clamp: initial; }
  /* 手機版英文：JHStudio 對齊內容區域 */
  .team.en .value-only {
    margin-left: calc(130px + 30px); /* 英文版角色寬度 130px + 分隔符約 16px + 額外對齊 8px */
  }
  
  
  .partners-section {
    margin-top: 30px;
    padding-top: 30px;
  }
  
  .partner-logos {
    flex-direction: column;
    gap: 16px;
  }
  
  .partner-item {
    min-width: 100%;
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .partner-logo {
    width: 140px;
    height: 52px;
  }
  
  .partner-logo-text {
    width: 140px;
    height: 52px;
    font-size: 24px;
  }
}

@media (min-width: 2560px) {
  .container {
    max-width: 2000px;
  }
  .section-title {
    font-size: 3em;
  }
  .team.en .value {
    font-size: 2em;
  }
  
  .partner-title {
    font-size: 2.5em;
  }
  
  .partner-item {
    min-width: 300px;
    padding: 25px;
  }
  
  .partner-logo {
    height: 60px;
  }
  
  .partner-logo-text {
    font-size: 36px;
  }
  
  .partner-name-zh {
    font-size: 20px;
  }
  
  .partner-name-en {
    font-size: 16px;
  }
}
</style>

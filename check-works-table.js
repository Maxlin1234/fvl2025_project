const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.database);

async function checkWorksTable() {
  console.log('🔍 檢查 works 資料表...');
  
  try {
    // 檢查 works 資料表結構
    console.log('\n📋 works 資料表結構:');
    const columnsResult = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'works' 
      ORDER BY ordinal_position;
    `);
    
    columnsResult.rows.forEach(column => {
      console.log(`   - ${column.column_name}: ${column.data_type}`);
    });
    
    // 檢查資料總數
    const countResult = await pool.query('SELECT COUNT(*) as count FROM works');
    console.log(`\n📊 works 資料表總共有 ${countResult.rows[0].count} 筆資料`);
    
    // 檢查有圖片的資料
    const photoCountResult = await pool.query(`
      SELECT COUNT(*) as count 
      FROM works 
      WHERE photo_1 IS NOT NULL AND photo_1 != ''
    `);
    console.log(`📸 有 photo_1 圖片的資料: ${photoCountResult.rows[0].count} 筆`);
    
    // 顯示前 5 筆有圖片的資料
    console.log('\n📋 前 5 筆有圖片的作品資料:');
    const photoData = await pool.query(`
      SELECT work_id, photo_1, photo_2, photo_3, photo_4, photo_5, 
             created_at, updated_at, active, index
      FROM works 
      WHERE photo_1 IS NOT NULL AND photo_1 != ''
      ORDER BY created_at DESC
      LIMIT 5
    `);
    
    photoData.rows.forEach((work, index) => {
      console.log(`\n   ${index + 1}. 作品 ID: ${work.work_id}`);
      console.log(`      📸 圖片 1: ${work.photo_1}`);
      console.log(`      📸 圖片 2: ${work.photo_2 || '無'}`);
      console.log(`      📸 圖片 3: ${work.photo_3 || '無'}`);
      console.log(`      📸 圖片 4: ${work.photo_4 || '無'}`);
      console.log(`      📸 圖片 5: ${work.photo_5 || '無'}`);
      console.log(`      📅 建立時間: ${work.created_at}`);
      console.log(`      ✅ 啟用狀態: ${work.active}`);
    });
    
    // 顯示 JSON 格式的資料
    console.log('\n🔍 JSON 格式的圖片資料:');
    console.log(JSON.stringify(photoData.rows, null, 2));
    
  } catch (error) {
    console.error('❌ 檢查 works 資料表時發生錯誤:', error.message);
  } finally {
    await pool.end();
  }
}

checkWorksTable(); 
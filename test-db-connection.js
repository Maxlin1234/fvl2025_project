const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config.database);

async function testConnection() {
  console.log('🔍 測試資料庫連接...');
  console.log('連接資訊:', {
    host: config.database.host,
    database: config.database.database,
    user: config.database.user,
    port: config.database.port
  });

  try {
    // 測試基本連接
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ 資料庫連接成功！');
    console.log('當前時間:', result.rows[0].current_time);

    // 檢查所有資料表
    console.log('\n📋 檢查資料庫中的所有資料表...');
    const tablesResult = await pool.query(`
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('📊 資料庫中的資料表:');
    if (tablesResult.rows.length === 0) {
      console.log('   ⚠️  沒有找到任何資料表');
    } else {
      tablesResult.rows.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table.table_name} (${table.table_type})`);
      });
    }

    // 檢查 your_table_name 資料表
    console.log('\n🔍 檢查 your_table_name 資料表...');
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'your_table_name'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✅ 資料表 your_table_name 已存在');
      
      // 檢查資料表結構
      console.log('\n📋 資料表結構:');
      const columnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'your_table_name' 
        ORDER BY ordinal_position;
      `);
      
      columnsResult.rows.forEach(column => {
        console.log(`   - ${column.column_name}: ${column.data_type} ${column.is_nullable === 'YES' ? '(可為空)' : '(不可為空)'} ${column.column_default ? `[預設: ${column.column_default}]` : ''}`);
      });
      
      // 檢查資料
      const dataCheck = await pool.query('SELECT COUNT(*) as count FROM your_table_name');
      console.log(`\n📊 資料表中有 ${dataCheck.rows[0].count} 筆資料`);
      
      if (dataCheck.rows[0].count > 0) {
        // 顯示所有資料
        const allData = await pool.query('SELECT * FROM your_table_name ORDER BY id');
        console.log('\n📋 所有資料:');
        allData.rows.forEach((row, index) => {
          console.log(`   ${index + 1}. ID: ${row.id}, 名稱: "${row.name}", 描述: "${row.description}"`);
          console.log(`      建立時間: ${row.created_at}, 更新時間: ${row.updated_at}`);
        });
        
        // 顯示 JSON 格式的資料
        console.log('\n🔍 JSON 格式的資料:');
        console.log(JSON.stringify(allData.rows, null, 2));
      } else {
        console.log('⚠️  資料表中沒有資料');
      }
    } else {
      console.log('❌ 資料表 your_table_name 不存在');
      console.log('💡 建議：');
      console.log('   1. 檢查資料表名稱是否正確');
      console.log('   2. 執行 database.sql 腳本建立資料表');
      console.log('   3. 或者手動建立資料表');
    }

    // 檢查其他可能的資料表
    console.log('\n🔍 檢查其他可能的資料表...');
    const otherTables = ['works', 'artworks', 'images', 'projects', 'portfolio', 'gallery'];
    
    for (const tableName of otherTables) {
      const exists = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        );
      `, [tableName]);
      
      if (exists.rows[0].exists) {
        console.log(`✅ 發現資料表: ${tableName}`);
        const count = await pool.query(`SELECT COUNT(*) as count FROM ${tableName}`);
        console.log(`   📊 資料筆數: ${count.rows[0].count}`);
        
        if (count.rows[0].count > 0) {
          const sample = await pool.query(`SELECT * FROM ${tableName} LIMIT 2`);
          console.log(`   📋 範例資料:`, sample.rows);
        }
      }
    }

  } catch (error) {
    console.error('❌ 資料庫連接失敗:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 建議檢查：');
      console.log('   - 確認 AWS RDS 實例正在運行');
      console.log('   - 確認安全群組允許您的 IP 連接');
      console.log('   - 確認連接字串正確');
    } else if (error.code === '28P01') {
      console.log('💡 認證失敗，請檢查用戶名和密碼');
    } else if (error.code === '3D000') {
      console.log('💡 資料庫不存在，請檢查資料庫名稱');
    } else if (error.code === '42P01') {
      console.log('💡 資料表不存在，請檢查資料表名稱');
    }
  } finally {
    await pool.end();
  }
}

// 新增一個函數來檢查特定資料表
async function checkSpecificTable(tableName) {
  const pool = new Pool(config.database);
  
  try {
    console.log(`\n🔍 檢查資料表: ${tableName}`);
    
    const exists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      );
    `, [tableName]);
    
    if (exists.rows[0].exists) {
      console.log(`✅ 資料表 ${tableName} 存在`);
      
      // 檢查結構
      const columns = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = $1 
        ORDER BY ordinal_position;
      `, [tableName]);
      
      console.log('📋 欄位結構:');
      columns.rows.forEach(col => {
        console.log(`   - ${col.column_name}: ${col.data_type}`);
      });
      
      // 檢查資料
      const count = await pool.query(`SELECT COUNT(*) as count FROM ${tableName}`);
      console.log(`📊 資料筆數: ${count.rows[0].count}`);
      
      if (count.rows[0].count > 0) {
        const data = await pool.query(`SELECT * FROM ${tableName} LIMIT 5`);
        console.log('📋 前 5 筆資料:');
        console.log(JSON.stringify(data.rows, null, 2));
      }
    } else {
      console.log(`❌ 資料表 ${tableName} 不存在`);
    }
  } catch (error) {
    console.error(`❌ 檢查資料表 ${tableName} 時發生錯誤:`, error.message);
  } finally {
    await pool.end();
  }
}

// 執行測試
testConnection();

// 如果您想要檢查特定資料表，可以取消註解下面的程式碼
// checkSpecificTable('your_actual_table_name'); 
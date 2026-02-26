const pool = require('./config/database');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ База данных подключена:', result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error.message);
    console.log('\nПроверьте:');
    console.log('1. PostgreSQL запущен');
    console.log('2. База данных создана (запустите database.sql)');
    console.log('3. Настройки в .env файле корректны');
    process.exit(1);
  }
}

testConnection();

// Crea/actualiza el admin usando bcrypt y mysql2, sin depender del shell.
// Lee ADMIN_EMAIL y ADMIN_PASSWORD de .env (solo dev).

require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

(async () => {
  const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
    ADMIN_EMAIL = 'admin@test.com',
    ADMIN_PASSWORD = '123456'
  } = process.env;

  if (!DB_HOST || !DB_USER || !DB_NAME) {
    console.error('Faltan variables de DB en .env');
    process.exit(1);
  }

  const pool = await mysql.createPool({
    host: DB_HOST, port: DB_PORT || 3306,
    user: DB_USER, password: DB_PASSWORD, database: DB_NAME
  });

  try {
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

    // Garantizar email único y columna de 60 chars
    await pool.execute(`
      ALTER TABLE usuarios
      MODIFY password_hash VARCHAR(60) NOT NULL
    `);

    await pool.execute(`
      ALTER TABLE usuarios
      ADD UNIQUE KEY IF NOT EXISTS uq_usuarios_email (email)
    `).catch(() => {}); // MySQL 8 no soporta IF NOT EXISTS en ADD UNIQUE en todas las variantes

    // Inserta o actualiza el admin
    await pool.execute(`
      INSERT INTO usuarios (email, password_hash, rol)
      VALUES (?, ?, 'admin')
      ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), rol = 'admin'
    `, [ADMIN_EMAIL, hash]);

    const [rows] = await pool.execute(`
      SELECT email, CHAR_LENGTH(password_hash) AS len, LEFT(password_hash,4) AS pref
      FROM usuarios WHERE email = ?`, [ADMIN_EMAIL]);

    console.log('Admin seedeado:', rows[0]);
    console.log('Listo ✅');
  } catch (err) {
    console.error('Error al seediar admin:', err);
    process.exit(1);
  } finally {
    pool.end();
  }
})();

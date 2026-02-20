const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a la base de datos
const dbPath = path.join(__dirname, 'database', 'db.sqlite');
console.log('Probando conexión a:', dbPath);

// Intentar conectar
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('ERROR DE CONEXIÓN:');
        console.error(err.message);
    } else {
        console.log('CONEXIÓN EXITOSA a la base de datos');
        
        // Verificar si hay tablas
        db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tablas) => {
            if (err) {
                console.error('Error al leer tablas:', err.message);
            } else {
                console.log('Tablas encontradas:', tablas.length);
                if (tablas.length > 0) {
                    console.log('Tablas:', tablas.map(t => t.name).join(', '));
                } else {
                    console.log('No hay tablas en la base de datos');
                }
            }
            db.close();
        });
    }
});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// Configuración CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Logger de peticiones
app.use((req, res, next) => {
    console.log(`📡 ${req.method} ${req.url}`);
    next();
});

// CONEXIÓN A SQLITE
const dbPath = path.join(__dirname, 'database', 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error conectando a DB:', err.message);
    } else {
        console.log('Conectado a SQLite en:', dbPath);
        crearTablas();
    }
});

// FUNCIÓN PARA CREAR TABLAS
function crearTablas() {
  db.serialize(() => {
    // Tabla usuarios
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dni TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        password TEXT NOT NULL,
        rol TEXT DEFAULT 'alumno',
        fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla usuarios:', err.message);
      } else {
        console.log('Tabla "usuarios" creada/verificada');
        crearAdminPorDefecto();
      }
    });

    // TABLA: datos_personales
    db.run(`
      CREATE TABLE IF NOT EXISTS datos_personales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dni TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        fechaNacimiento TEXT,
        domicilio TEXT,
        telefono TEXT,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dni) REFERENCES usuarios(dni) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        console.error('Error creando tabla datos_personales:', err.message);
      } else {
        console.log('Tabla "datos_personales" creada/verificada');
      }
    });
  });
}

// FUNCIÓN PARA CREAR ADMIN POR DEFECTO
async function crearAdminPorDefecto() {
    const adminDNI = '12345678';
    
    db.get('SELECT * FROM usuarios WHERE dni = ?', [adminDNI], async (err, usuario) => {
        if (err) {
            console.error('Error verificando admin:', err.message);
            return;
        }
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash('admin123', salt);
        // db.run(
        
        // 'INSERT INTO usuarios (dni, nombre, password, rol) VALUES (?, ?, ?, ?)',
        //             ['22334455', 'Juan Perez', hashedPassword, 'alumno'],
        // );
        if (!usuario) {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin123', salt);
                
                db.run(
                    'INSERT INTO usuarios (dni, nombre, password, rol) VALUES (?, ?, ?, ?)',
                    [adminDNI, 'Administrador', hashedPassword, 'admin'],
                    
                    function(err) {
                        if (err) {
                            console.error('Error creando admin:', err.message);
                        } else {
                            console.log('Usuario admin creado - DNI: 12345678 / Pass: admin123');
                        }
                    }
                );
            } catch (error) {
                console.error('Error encriptando contraseña:', error.message);
            }
        } else {
            console.log('Usuario admin ya existe');
        }
    });
}

// ============================================
// RUTAS DE PRUEBA
// ============================================

app.get('/api/test-cors', (req, res) => {
    res.json({ 
        mensaje: 'CORS funcionando correctamente',
        origin: req.headers.origin,
        method: req.method
    });
});

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

// REGISTRO
app.post('/api/auth/register', async (req, res) => {
    console.log('Intento de registro con DNI:', req.body.dni);
    
    try {
        const { dni, nombre, password } = req.body;

        if (!dni || !nombre || !password) {
            return res.status(400).json({ error: 'DNI, nombre y contraseña son obligatorios' });
        }

        const dniRegex = /^\d{7,8}$/;
        if (!dniRegex.test(dni)) {
            return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos numéricos' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.run(
            'INSERT INTO usuarios (dni, nombre, password) VALUES (?, ?, ?)',
            [dni, nombre, hashedPassword],
            function(err) {
                if (err) {
                    console.error('Error SQL:', err.message);
                    
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ error: 'El DNI ya está registrado' });
                    }
                    return res.status(500).json({ error: 'Error al registrar usuario' });
                }

                console.log('Usuario registrado - DNI:', dni);
                res.status(201).json({ 
                    mensaje: 'Usuario registrado exitosamente',
                    usuarioId: this.lastID 
                });
            }
        );
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// LOGIN
app.post('/api/auth/login', (req, res) => {
    console.log('\n===== INTENTO DE LOGIN =====');
    console.log('Body recibido:', req.body);
    
    const { dni, password } = req.body;
    
    if (!dni || !password) {
        console.log('Faltan campos');
        return res.status(400).json({ error: 'DNI y contraseña son obligatorios' });
    }

    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(dni)) {
        console.log(`DNI inválido: ${dni}`);
        return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos' });
    }

    console.log(`Buscando usuario DNI: ${dni}`);
    
    db.get('SELECT * FROM usuarios WHERE dni = ?', [dni], async (err, usuario) => {
        if (err) {
            console.log('Error BD:', err.message);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (!usuario) {
            console.log(`Usuario no encontrado: ${dni}`);
            return res.status(401).json({ error: 'DNI o contraseña incorrectos' });
        }

        console.log(`Usuario encontrado: ${usuario.nombre}`);
        
        const passwordValida = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValida) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ error: 'DNI o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { 
                id: usuario.id, 
                dni: usuario.dni,
                nombre: usuario.nombre,
                rol: usuario.rol 
            },
            process.env.JWT_SECRET || 'mi_clave_secreta_2024',
            { expiresIn: '8h' }
        );

        console.log('LOGIN EXITOSO');
        console.log('===========================\n');

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                dni: usuario.dni,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });
    });
});

// ============================================
// RUTAS PROTEGIDAS
// ============================================

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta_2024');
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

app.get('/api/auth/perfil', verificarToken, (req, res) => {
    db.get(
        'SELECT id, dni, nombre, rol, fecha_registro FROM usuarios WHERE id = ?',
        [req.usuario.id],
        (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener perfil' });
            }
            res.json(usuario);
        }
    );
});

// Obtener datos personales por DNI
app.get('/api/datos-personales/:dni', verificarToken, (req, res) => {
  const { dni } = req.params;
  
  console.log(`Obteniendo datos personales para DNI: ${dni}`);
  
  db.get('SELECT * FROM datos_personales WHERE dni = ?', [dni], (err, row) => {
    if (err) {
      console.error('Error obteniendo datos:', err.message);
      return res.status(500).json({ error: 'Error al obtener datos' });
    }
    
    if (!row) {
      // Si no hay datos, devolver objeto vacío (el frontend creará uno nuevo)
      return res.json({});
    }
    
    res.json(row);
  });
});

// Guardar/actualizar datos personales
app.post('/api/datos-personales', verificarToken, async (req, res) => {
  const { dni, nombre, fechaNacimiento, domicilio, telefono, email } = req.body;
  
  console.log(`Guardando datos personales para DNI: ${dni}`);
  
  // Validar que el DNI coincida con el token
  if (req.usuario.dni !== dni) {
    return res.status(403).json({ error: 'No autorizado para modificar estos datos' });
  }
  
  // Validaciones
  if (!dni || !nombre || !email) {
    return res.status(400).json({ error: 'DNI, nombre y email son obligatorios' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email no válido' });
  }
  
  try {
    // Verificar si ya existe el registro
    db.get('SELECT * FROM datos_personales WHERE dni = ?', [dni], async (err, row) => {
      if (err) {
        console.error('Error verificando datos:', err.message);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      
      const fechaActual = new Date().toISOString();
      
      if (row) {
        // Actualizar registro existente
        db.run(
          `UPDATE datos_personales 
           SET nombre = ?, fechaNacimiento = ?, domicilio = ?, telefono = ?, email = ?, updated_at = ?
           WHERE dni = ?`,
          [nombre, fechaNacimiento, domicilio, telefono, email, fechaActual, dni],
          function(err) {
            if (err) {
              console.error('Error actualizando:', err.message);
              return res.status(500).json({ error: 'Error al actualizar datos' });
            }
            
            console.log('Datos actualizados para DNI:', dni);
            res.json({ 
              mensaje: 'Datos actualizados correctamente',
              actualizado: true
            });
          }
        );
      } else {
        // Crear nuevo registro
        db.run(
          `INSERT INTO datos_personales (dni, nombre, fechaNacimiento, domicilio, telefono, email, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [dni, nombre, fechaNacimiento, domicilio, telefono, email, fechaActual, fechaActual],
          function(err) {
            if (err) {
              console.error('Error insertando:', err.message);
              return res.status(500).json({ error: 'Error al guardar datos' });
            }
            
            console.log('Datos creados para DNI:', dni);
            res.json({ 
              mensaje: 'Datos guardados correctamente',
              creado: true
            });
          }
        );
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ============================================
// RUTAS PARA ADMINISTRACIÓN DE ALUMNOS
// ============================================

// Middleware para verificar si es admin
const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso no autorizado. Se requiere rol de administrador' });
  }
  next();
};

// Obtener todos los alumnos (solo admin)
app.get('/api/admin/alumnos', verificarToken, esAdmin, (req, res) => {
  console.log('📋 Admin obteniendo lista de alumnos');
  
  db.all(`
    SELECT u.id, u.dni, u.nombre, u.rol, u.fecha_registro,
           dp.fechaNacimiento, dp.domicilio, dp.telefono, dp.email
    FROM usuarios u
    LEFT JOIN datos_personales dp ON u.dni = dp.dni
    WHERE u.rol = 'alumno' OR u.rol IS NULL
    ORDER BY u.nombre ASC
  `, [], (err, rows) => {
    if (err) {
      console.error('❌ Error obteniendo alumnos:', err.message);
      return res.status(500).json({ error: 'Error al obtener alumnos' });
    }
    
    res.json(rows);
  });
});

// Obtener un alumno por ID (solo admin)
app.get('/api/admin/alumnos/:id', verificarToken, esAdmin, (req, res) => {
  const { id } = req.params;
  
  db.get(`
    SELECT u.id, u.dni, u.nombre, u.rol, u.fecha_registro,
           dp.fechaNacimiento, dp.domicilio, dp.telefono, dp.email
    FROM usuarios u
    LEFT JOIN datos_personales dp ON u.dni = dp.dni
    WHERE u.id = ? AND (u.rol = 'alumno' OR u.rol IS NULL)
  `, [id], (err, row) => {
    if (err) {
      console.error('❌ Error obteniendo alumno:', err.message);
      return res.status(500).json({ error: 'Error al obtener alumno' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    res.json(row);
  });
});

// Crear nuevo alumno (solo admin)
app.post('/api/admin/alumnos', verificarToken, esAdmin, async (req, res) => {
  const { dni, nombre, password } = req.body;
  
  console.log('👤 Admin creando nuevo alumno:', { dni, nombre });
  
  // Validaciones
  if (!dni || !nombre || !password) {
    return res.status(400).json({ error: 'DNI, nombre y contraseña son obligatorios' });
  }
  
  const dniRegex = /^\d{7,8}$/;
  if (!dniRegex.test(dni)) {
    return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos numéricos' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }
  
  try {
    // Verificar si el DNI ya existe
    db.get('SELECT * FROM usuarios WHERE dni = ?', [dni], async (err, usuarioExistente) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar DNI' });
      }
      
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El DNI ya está registrado' });
      }
      
      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Insertar nuevo alumno
      db.run(
        'INSERT INTO usuarios (dni, nombre, password, rol) VALUES (?, ?, ?, ?)',
        [dni, nombre, hashedPassword, 'alumno'],
        function(err) {
          if (err) {
            console.error('❌ Error creando alumno:', err.message);
            return res.status(500).json({ error: 'Error al crear alumno' });
          }
          
          console.log('✅ Alumno creado con ID:', this.lastID);
          res.status(201).json({
            mensaje: 'Alumno creado exitosamente',
            id: this.lastID,
            dni,
            nombre
          });
        }
      );
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar alumno (solo admin)
app.put('/api/admin/alumnos/:id', verificarToken, esAdmin, async (req, res) => {
  const { id } = req.params;
  const { dni, nombre, password } = req.body;
  
  console.log('✏️ Admin actualizando alumno ID:', id);
  
  // Validaciones básicas
  if (!dni || !nombre) {
    return res.status(400).json({ error: 'DNI y nombre son obligatorios' });
  }
  
  const dniRegex = /^\d{7,8}$/;
  if (!dniRegex.test(dni)) {
    return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos numéricos' });
  }
  
  try {
    // Verificar si el alumno existe
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], async (err, usuario) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar alumno' });
      }
      
      if (!usuario) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      // Verificar si el nuevo DNI ya está usado por otro usuario
      if (dni !== usuario.dni) {
        db.get('SELECT * FROM usuarios WHERE dni = ? AND id != ?', [dni, id], (err, otroUsuario) => {
          if (err) {
            return res.status(500).json({ error: 'Error al verificar DNI' });
          }
          
          if (otroUsuario) {
            return res.status(400).json({ error: 'El DNI ya está registrado por otro usuario' });
          }
          
          actualizarUsuario();
        });
      } else {
        actualizarUsuario();
      }
      
      async function actualizarUsuario() {
        let query = 'UPDATE usuarios SET dni = ?, nombre = ?';
        const params = [dni, nombre];
        
        // Si se proporciona nueva contraseña, actualizarla
        if (password && password.trim() !== '') {
          if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
          }
          
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          query += ', password = ?';
          params.push(hashedPassword);
        }
        
        query += ' WHERE id = ?';
        params.push(id);
        
        db.run(query, params, function(err) {
          if (err) {
            console.error('❌ Error actualizando alumno:', err.message);
            return res.status(500).json({ error: 'Error al actualizar alumno' });
          }
          
          console.log('✅ Alumno actualizado ID:', id);
          res.json({
            mensaje: 'Alumno actualizado exitosamente',
            id: parseInt(id),
            dni,
            nombre
          });
        });
      }
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar alumno (solo admin)
app.delete('/api/admin/alumnos/:id', verificarToken, esAdmin, (req, res) => {
  const { id } = req.params;
  
  console.log('🗑️ Admin eliminando alumno ID:', id);
  
  // Verificar que no sea el admin principal
  db.get('SELECT dni FROM usuarios WHERE id = ?', [id], (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar alumno' });
    }
    
    if (!usuario) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    // No permitir eliminar al admin principal (DNI 12345678)
    if (usuario.dni === '12345678') {
      return res.status(403).json({ error: 'No se puede eliminar al administrador principal' });
    }
    
    // Eliminar alumno (los datos personales se borrarán en cascada por la FK)
    db.run('DELETE FROM usuarios WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('❌ Error eliminando alumno:', err.message);
        return res.status(500).json({ error: 'Error al eliminar alumno' });
      }
      
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Alumno no encontrado' });
      }
      
      console.log('✅ Alumno eliminado ID:', id);
      res.json({ mensaje: 'Alumno eliminado exitosamente' });
    });
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
    console.log(`\nServidor corriendo en http://localhost:${PORT}`);
    console.log(' CORS configurado para http://localhost:5173');
});
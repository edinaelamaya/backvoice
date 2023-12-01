// controllers/authController.js
const bcrypt = require('bcrypt');
const mysqlConnection = require('../config/mysqlConfig');
const jwt = require('jsonwebtoken');
const jwtSecret = 'soybuen_no';
const jwtExpiration = '1h';


exports.login = async (req, res) => {
  console.log("como vas",req.body)
  const {usernames, passwords} = req.body;
  console.log("username",usernames)
  console.log("password",passwords)
  pass=passwords
  try {
    console.log("entre en login__")
    // Consulta para obtener el hash de la contraseña
    const sql = 'SELECT id_user, password FROM usuarios WHERE username = ?';
    mysqlConnection.query(sql, [usernames], (err, result) => {
      if (err) {
          console.error('Error al seleccionar usuario en MySQL:', err);
          res.status(500).json({ error: 'Error en el usuario' });
      } else {
          console.log('Usuario traido MySQL',result);
          const { id_user, password } = result[0]
          if(result[0] == []){
            return []
          }
          console.log("naaaa__ss id",id_user)
          console.log("naaaa__ss psas",password)
          console.log("naaaa__ss psas",pass)
          var passwordMatch=false
          if (pass == password){
            console.log("naaaa__ss")
            passwordMatch = true;
          }
          if (!passwordMatch) {
            // Contraseña incorrecta
            console.log("contra not__")
            return res.status(401).json({ error: 'Contraseña incorrecta' });
          }
          console.log("paso_w")
          // Genera un token JWT
          const token = jwt.sign({ userId: id_user  }, jwtSecret, { expiresIn: jwtExpiration });
          console.log("paso_1")
          // Cierra la conexión a MySQL
          console.log("paso_s")
          return res.status(201).json({ message: 'ok',userId: id_user , token });
      }
      });
    
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

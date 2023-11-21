const mysqlConnection = require('../config/mysqlConfig');

exports.createUser = async (req, res) => {
  try {
    // Lógica para MongoDB
    console.log("insertar usuario")
    const { username, password, email, tipe="usuario"} = req.body;

    if (tipe=="admin"){
        console.log("entre a mongo a insertar..")
      
        console.log('Usuario creado exitosamente en MongoDB con ID:', newUser._id);
    }else{
        console.log("insertar usuario mysql")

        const sql = 'INSERT INTO usuarios (username, password, email, tipe) VALUES (?, ?, ?, ?)';
        mysqlConnection.query(sql, [username, password, email, tipe], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario en MySQL:', err);
            res.status(500).json({ error: 'Error al crear usuario' });
        } else {
            console.log('Usuario creado exitosamente en MySQL');
            const insertedUserId = result.insertId
            res.status(201).json({ message: 'Usuario creado exitosamente', userId: insertedUserId });
        }
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mysqlConnection = require('../config/mysqlConfig');

exports.traer = async (req, res) => {
    const {id_users} = req.body;
    console.log("id_users")
    console.log("id_users2",id_users)
    try {
        console.log("llegooo")
        const sql = 'SELECT * FROM documentos WHERE id_users = ?';
        mysqlConnection.query(sql, [id_users], (err, result) => {
            if (err) {
                console.error('Error al seleccionar usuario en MySQL:', err);
                res.status(500).json({ error: 'Error en el usuario' });
            } else {
                console.log('doc traido MySQL',result);
                if(result[0] == []){
                    return []
                }
          
                console.log("paso_s")
                return res.status(201).json({ 
                    message: 'ok',
                    data: result
                });
            }
        });
    } catch (error) {
        console.log("llegooo errororo")
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
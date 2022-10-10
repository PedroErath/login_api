const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/', auth, (req, res) => {

    if(req.user.admin)
        res.send('Essa pagina só deve ser vista por admins')
    else    
        res.status(401).send('Acesso negado')
})

module.exports = router;
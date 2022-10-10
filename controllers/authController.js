const jwt = require('jsonwebtoken')

module.exports = (req,res, next) => {
    const token = req.header('token-autorizacao');
    if(!token) return res.status(401).send('Acesso Negado');

    try {
        const userVerificado = jwt.verify(token, process.env.TOKEN_SEGREDO)
        req.user = userVerificado;
        next();
    } catch (error) {
        res.status(401).send('Acesso Negado');
    }

}
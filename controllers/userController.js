const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userController = {

    register: async (req, res) => {
        const userSelecionado = await User.findOne({email:req.body.email});
        if(userSelecionado){
            return res.status(400).send('Email ja cadastrado');
        };

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcript.hashSync(req.body.password)
        });

        try {
            const userSalvo = await user.save();
            res.send(userSalvo);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    login: async (req, res) => {
        const userSelecionado = await User.findOne({email:req.body.email});
        if(!userSelecionado){
            return res.status(400).send('Email ou senha incorreto');
        }

        const checkCredenciais = bcript.compareSync(req.body.password, userSelecionado.password);
        if(!checkCredenciais){
            return res.status(400).send('Email ou senha incorreto');
        }

        const token = jwt.sign({_id:userSelecionado._id, admin:userSelecionado.admin}, process.env.TOKEN_SEGREDO);

        res.header('token-autorizacao', token)
        res.send('Usuário logado')
    },

}
module.exports = userController;
//functions
const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");
const {generarJWT} = require('../helpers/jwt')
const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await  Usuario.findOne({ email });
    if( usuario){
        return res.status(400).json({
            ok:false,
            msg: 'El usuario existe con ese correo'
        })
    }
    usuario = new Usuario(req.body);

    //Encriptacion de contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.name)

    //Generar nuevo jsonwebtoken
    res.status(201).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
      });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }

};

const loginUsuario = async(req, res = response) => {


  try {
    const { email, password } = req.body;
    let usuario = await  Usuario.findOne({ email });
    if( !usuario){
        return res.status(400).json({
            ok:false,
            msg: 'El usuario no existe con ese email'
        })
    }

    //Confirmar las contraseñas

    const validPassword = bcrypt.compareSync( password, usuario.password)
    if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg: 'Password incorrecto'
        });
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)


    res.status(200).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
      });

  } catch (error) {
    res.status(500).json({
        ok: false,
        msg: "Por favor hable con el admin",
      });
  }
};

const revalidarToken = async(req, res = response) => {

  const {uid, name} = req;
  const token = await generarJWT(uid, name)
  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};

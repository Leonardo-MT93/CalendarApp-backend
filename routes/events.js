const {Router} = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use(validarJWT); //Realiza la validacion de token en TODAS LAS RUTAS - 

router.get('/', getEventos)


router.post('/', crearEvento)


router.put('/:id', actualizarEvento)


router.delete('/:id',eliminarEvento)


module.exports = router;
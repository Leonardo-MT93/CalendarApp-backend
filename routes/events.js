const {Router} = require('express');
const { check} = require('express-validator')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT); //Realiza la validacion de token en TODAS LAS RUTAS - 

router.get('/', getEventos)


router.post('/',
[
    check('title', 'El titulo es oblogatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
],
 crearEvento)


router.put('/:id', actualizarEvento)


router.delete('/:id',eliminarEvento)


module.exports = router;
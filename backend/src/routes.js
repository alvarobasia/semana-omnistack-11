const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) ,ongController.store);

routes.post('/incidents', incidentsController.store);

routes.get('/incidents', celebrate({
    [Segments.QUERY] : Joi.object().keys({
        page: Joi.number()
    })
}),incidentsController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        id: Joi.number().required()
    })
}),incidentsController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization : Joi.string().required()
    }).unknown()
}),profileController.index);

module.exports = routes;
const { Router } = require('express');
const Controller = require('./controllers/WebHookController');

const routes = Router();

routes.post('/emitevent', Controller.emitEvent);
routes.post('/subscribe', Controller.subscribe);
routes.post('/unsubscribe', Controller.unsubscribe);

module.exports = routes;

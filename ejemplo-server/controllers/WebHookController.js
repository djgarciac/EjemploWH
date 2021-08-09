const WebHooks = require('node-webhooks');

// Inicializa los webhooks
const webHooks = new WebHooks({
  db: './webHooksDB.json', // JSON que sirve como almacenamiento de las URLS.
  httpSuccessCodes: [200, 201, 202, 203, 204] // Códigos de estado satisfactorios
});

const emitter = webHooks.getEmitter();

emitter.on('*.success', (eventName, statusCode, body) => {
  console.log(`Success on trigger webHook ${eventName} with status code ${statusCode} and body ${body}`);
});

emitter.on('*.failure', (eventName, statusCode, body) => {
  console.log(`Success on trigger webHook ${eventName} with status code ${statusCode} and body ${body}`);
});

/**
 * Genera un evento para avisar a todos los suscriptores.
 */
const emitEvent = async (request, response) => {
  console.log(request.body);

  webHooks.trigger('hello', request.body);
  return response.send('event sent');
};

/**
 * Para que los cliente se suscriban a un evento concreto.
 */
const subscribe = (request, response) => {
  console.log(request.body);

  webHooks.add(request.body.eventName, request.body.url)
    .then(() => {
      console.log(`${request.body.url} subscribed to ${request.body.eventName}`);
      return response.status(200).send('ok');
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).send('error');
    });
};

/**
 * Para eliminar la suscripción
 */
const unsubscribe = (request, response) => {
  console.log(request.body);

  webHooks.remove(request.body.eventName, request.body.url)
    .then(() => {
      console.log(`${request.body.url} unsubscribed from ${request.body.eventName}`);
      return response.status(200).send('ok');
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).send('error');
    });
};

module.exports = {
  emitEvent,
  subscribe,
  unsubscribe
};

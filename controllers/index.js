import docsController from './docs.js';
import configController from './config.js';
import apiController from './api.js';
import rootController from './root.js';
import encoderController from './encoder.js';
import decoderController from './decoder.js';
import webController from './web.js';

export const registerRoutes = (fastify, options) => {
    fastify.register(docsController, options);
    fastify.register(configController, options);
    fastify.register(apiController, options);
    fastify.register(rootController, options);
    fastify.register(encoderController, options);
    fastify.register(decoderController, options);
    fastify.register(webController, options);
};

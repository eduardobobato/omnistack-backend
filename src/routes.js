const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();
// Query Params: request.query
// Route Params: request.params | Route: /users/:id
// Body: request.body

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/devs/:github_username', DevController.show);
routes.delete('/devs/:github_username', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
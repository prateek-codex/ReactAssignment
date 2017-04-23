const Hapi = require('hapi');
const https = require('https');
const serverName = 'https://10.127.128.56:8000';
let leaderboard = require('./leaderboard.js')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000,
});

server.ext('onRequest', (request, reply) => {
	console.log('Request: ' + request.path);
	reply.continue();
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Add the route
server.route([{
	method: 'GET',
	path: '/',
	handler: (request, reply) => reply('Nothing to see here'),
},
{
	method: 'GET',
	path: '/initialize',
	handler: (request, reply) => {
		https.get(serverName + '/alphabets/getchars/6', (res) => {
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					reply(parsedData);
				} catch (e) {
					console.error(e.message);
					reply('');
				}
			});
		});
	},
},
{
	method: 'GET',
	path: '/shuffle/{query}',
	handler: (request, reply) => {
		let params = request.params.query
		https.get(serverName + '/alphabets/shuffle/' + params, (res) => {
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					reply(parsedData);
				} catch (e) {
					console.error(e.message);
					reply('');
				}
			});
		});
	},
},
{
	method: 'GET',
	path: '/getCharacter/{query}',
	handler: (request, reply) => {
		let params = request.params.query
		https.get(serverName + '/alphabets/get/' + params + '/1', (res) => {
			let rawData = '';
			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData);
					reply(parsedData);
				} catch (e) {
					console.error(e.message);
					reply('');
				}
			});
		});
	},
}


]);

server.route({
    method: ['POST'],
    path: '/leaderboard',
    handler: function (request, reply) {
		leaderboard.UpdateLeaderBoard(request.payload.name)
        reply(leaderboard.GetLeaderBoard());
    }
});

/**
 * @swagger
 * definition:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
/**
 * @swagger
 * /api/puppies:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
server.route([{
	method: 'GET',
	path: '/leaderboard',
	handler: (request, reply) =>  {
		reply(leaderboard.GetLeaderBoard())
	}
}]),

// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});

// Swagger
var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// serve swagger
server.route([{
	method: 'GET',
	path: '/swagger',
	handler: (request, reply) =>  {
		reply(swaggerSpec)
	}
}])

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

server.route({
        method: 'GET',
        path: '/api-docs',
        handler: function (request, reply) {
            reply.file('./public/api-docs/index.html');
        }
    });

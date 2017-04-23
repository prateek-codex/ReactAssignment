const Hapi = require('hapi');
const https = require('https');
const Constants = require('./constants');
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
	method: Constants.HTTP_GET_METHOD,
	path: '/',
	handler: (request, reply) => reply('Nothing to see here'),
},
{
	method: Constants.HTTP_GET_METHOD,
	path: Constants.API_ENDPOINT_INITIALIZE,
	handler: (request, reply) => {
		https.get(Constants.EXTERNAL_API_SERVER_NAME + Constants.EXTERNAL_API_GETCHARS, (res) => {
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
	method: Constants.HTTP_GET_METHOD,
	path: Constants.API_ENDPOINT_SHUFFLE,
	handler: (request, reply) => {
		let params = request.params.query
		https.get(Constants.EXTERNAL_API_SERVER_NAME + Constants.EXTERNAL_API_SHUFFLE + params, (res) => {
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
	method: Constants.HTTP_GET_METHOD,
	path: '/getCharacter/{query}',
	handler: (request, reply) => {
		let params = request.params.query
		https.get(Constants.EXTERNAL_API_SERVER_NAME + Constants.EXTERNAL_API_ALPHABETS + params + '/1', (res) => {
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
    method: [Constants.HTTP_POST_METHOD],
    path: Constants.API_ENDPOINT_LEADERBOARD,
    handler: function (request, reply) {
		leaderboard.UpdateLeaderBoard(request.payload.name)
        reply(leaderboard.GetLeaderBoard());
    }
});


server.route([{
	method: Constants.HTTP_GET_METHOD,
	path: Constants.API_ENDPOINT_LEADERBOARD,
	handler: (request, reply) =>  {
		reply(leaderboard.GetLeaderBoard())
	}
}]);

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});

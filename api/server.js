const Hapi = require('hapi');
const https = require('https');
const serverName = 'https://10.127.128.56:8000';
var leaderboard = require('./leaderboard.js')

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

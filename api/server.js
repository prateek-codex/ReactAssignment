const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000,
});

// Add the route
server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => reply('Nothing to see here'),
});

server.register(require('inert'), (err) => {

	if (err) {
		throw err;
	}

	// server.route({
	// 	method: 'GET',
	// 	path: '/js/{file*}',
	// 	handler: {
	// 		directory: {
	// 			listing: true
	// 		}
	// 	}
	// })
 
	server.route({
		method: 'GET',
		path: '/hello',
		handler: function (request, reply) {
			reply.file('../app/index.html');
		}
	});
});


// Start the server
server.start((err) => {
	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});

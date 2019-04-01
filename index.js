/*
 * Modules 
 */

const Hapi = require("hapi")

const routes = require("./src/routes/file")
const appConfig = require("./src/config/app")


let server = Hapi.server(appConfig.server)

// Start the server
const start =  async function() {
    try {
        // Add the route
        server.route(routes)
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
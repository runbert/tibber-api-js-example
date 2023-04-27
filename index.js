const TibberFeed = require("tibber-api").TibberFeed;
const TibberQuery = require("tibber-api").TibberQuery;
var IConfig = require("tibber-api").IConfig;
var tibberQuery;

async function connectTibber() {
    // Config object needed when instantiating TibberQuery
    const config = { // Replaced the IConfig type with a constant.
        apiEndpoint: {
            apiKey: 'YOUR-API-KEY', // Tibber token
            queryUrl: 'https://api.tibber.com/v1-beta/gql',
            requestTimeout: 5000,
        },
        homeId: 'YOUR-HOME-ID',
        timestamp: true,
        power: true,
    };

    // Instance of TibberQuery
    tibberQuery = new TibberQuery(config);

    const tibberFeed = new TibberFeed(tibberQuery, 5000);

    // Subscribe to "data" event.
    tibberFeed.on('data', (data) => {
        console.log(data);
    });

    // Subscribe to "connected" event.
    tibberFeed.on('connected', message => {
        console.log('Successfully connected to Tibber API!')
    });

    // Subscribe to "disconnected" event.
    tibberFeed.on('disconnected', message => {
        console.log('Disconnected from Tibber API. ' + message)
    });

    // Connect to Tibber data feed
    tibberFeed.connect();
}

connectTibber();
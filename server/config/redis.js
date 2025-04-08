const Redis = require('redis');

// Create the Redis client
const redisClient = Redis.createClient({
    // socket: {
    //     host: '127.0.0.1', 
    //     port: 6379
    //   }
    url: 'redis://redis:6379'  
});

// Event listener for errors
redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
});

// Connect to the Redis server
(async () => {
    try {
        await redisClient.connect(); // Using await for asynchronous connection
        console.log('Connected to Redis');
    } catch (err) {
        console.log('Error connecting to Redis:', err);
    }
})();

// Export the client for use in other modules
module.exports = redisClient;

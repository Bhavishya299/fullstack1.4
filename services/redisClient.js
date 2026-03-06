const { createClient } = require('redis');

const client = createClient({
    url: 'redis://127.0.0.1:6379'
});

client.connect();

client.on('error', (err) => console.log('Redis Error', err));

module.exports = client;
var redis = require('redis');
var url   = require('url');
var Hoek  = require('hoek'); // hapi utilities https://github.com/hapijs/hoek
Hoek.assert(process.env.REDISCLOUD_URL,
  'Please Set the REDISCLOUD_URL environment variable!');
// export REDISCLOUD_URL='getKeyFrom>Heroku>Appp>Settings>ConfigVars'
var redisURL    = url.parse(process.env.REDISCLOUD_URL);
var redisClient = redis.createClient(redisURL.port, redisURL.hostname,
                  {no_ready_check: true});
redisClient.auth(redisURL.auth.split(":")[1]);

// Confirm we are able to connect to  RedisCloud:
redisClient.set('redis', 'working', redisClient.print);
redisClient.get('redis', function (err, reply) {
  console.log('RedisCLOUD is ' +reply.toString());
});

module.exports = redisClient;
const Redis = require('ioredis');
const redis = new Redis({
  // port: 11286, // habis dari host : nya
  // host: "redis-11286.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // dari redislab, port nya habis : 11286
  // password: "GClESRVpjptlDDaklHoc26oVISkp18Gs"
  port: 6379,
  host: "localhost",
});

module.exports = redis;
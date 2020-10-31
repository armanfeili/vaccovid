// import Redis from "ioredis";

// const port = process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379;
// const host = process.env.REDIS_HOST ? process.env.REDIS_PORT : '127.0.0.1';

// // preferredSlaves array format
// var preferredSlaves2 = [
//   { ip: '127.0.0.1', port: '31231', prio: 1 },
//   { ip: '127.0.0.1', port: '31232', prio: 2 },
// ];

// const redis = new Redis({
//   port: port, // Redis port
//   host: host, // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   connectionName: 'connection1',
//   dropBufferSupport: true,
//   enableReadyCheck: true,
//   enableOfflineQueue: true,
//   connectTimeout: 10000,
//   // password: "auth",
//   db: 0, // Database index to use.
//   // Auto-reconnect
//   // This is the default value of `retryStrategy`
//   retryStrategy: (times: any) => {
//     var delay = Math.min(times * 50, 2000);
//     return delay;
//   },
//   // Reconnect on error
//   reconnectOnError: function (err: Error) {
//     var targetError = 'READONLY';
//     if (err.message.slice(0, targetError.length) === targetError) {
//       // Only reconnect when the error starts with "READONLY"
//       return true; // or `return 1;`
//     }
//   },
//   // sentinels: [
//   //   // { host: "127.0.0.1", port: 26379 }
//   //   // { host: "127.0.0.1", port: 26380 }
//   // ],
//   // name: "mymaster",
//   // role: "slave",
//   // preferredSlaves: preferredSlaves2
// });

// // every Redis instance supports 16 databases. The database index is the number you see at the end
// // of a Redis URL: redis://localhost:6379/0. The default database is 0 but you can change that to any
// // number from 0-15 (and you can configure Redis to support more databases, look in redis.conf). Each
// // database provides a distinct keyspace, independent from the others. Use SELECT n to change databases.
// // Use FLUSHDB to flush the current database. You can MOVE a key from the current database to another
// // database.

// // console.log(redis);

// redis.on('connect', () => {
//   console.log(`Redis client running on port ${port}`);
// });

// module.exports = redis;

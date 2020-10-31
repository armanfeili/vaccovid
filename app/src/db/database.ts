// import { config } from '../config';
// // import { ConnectionOptions } from 'typeorm';
// import { join } from 'path';
// // import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// const baseFolder = config.app.env === 'production' ? 'build' : 'src';

// export const database = {
//   type: config.db.dialect,
//   host: config.db.host,
//   port: config.db.port,
//   username: config.db.user,
//   password: config.db.pass,
//   database: config.db.name,
//   synchronize: false,
//   logging: false,
//   entities: [join(__dirname, '../db/models/**/*.{ts, js}')],
//   migrations: [join(__dirname, '../db/migrations/**/*.{ts, js}')],
//   subscribers: [join(__dirname, '../db/subscribers/**/*.{ts, js}')],
//   cli: {
//     entitiesDir: `${baseFolder}/db/models`,
//     migrationsDir: `${baseFolder}/db/migrations`,
//     subscribersDir: `${baseFolder}/db/subscribers`,
//   },
//   // namingStrategy: new SnakeNamingStrategy(),
// };
// // as ConnectionOptions & { namingStrategy: SnakeNamingStrategy };

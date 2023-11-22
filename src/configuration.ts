export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    type: 'mysql',
    host: process.env['database.host'],
    port: parseInt(process.env['database.port'] ?? '3306', 10),
    username: process.env['database.username'],
    password: process.env['database.password'],
    database: process.env['database.database'],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    cli: {
      entitiesDir: __dirname + '/entities',
    },
    enumName: 'string',
    debug: Boolean(process.env['database.debug']),
    verboseRetryLog: Boolean(process.env['database.debug']),
    synchronize: Boolean(process.env['database.synchronize']),
  },
  jwtData: {
    secret: process.env['jwt.secret'],
    expiresIn: process.env['jwt.expiresIn'],
  },

  defaultAccount: {
    username: process.env['admin.username'],
    password: process.env['admin.username'],
  },
  JWT_SECRET: process.env['jwt.secret'],
  JWT_EXPIRESIN: process.env['jwt.expiresIn'],
  ADMIN_USER: process.env['admin.username'],
  ADMIN_PASSWORD: process.env['admin.username'],
});

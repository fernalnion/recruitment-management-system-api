export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwtData: {
    secret: process.env['jwt.secret'],
    expiresIn: process.env['jwt.expiresIn'],
  },
  defaultAccount: {
    username: process.env['admin.username'],
    password: process.env['admin.username'],
  },
  mongodb: {
    uri: process.env['mongodb.connectionstring'],
    dbname: process.env['mongodb.dbname'],
  },
});

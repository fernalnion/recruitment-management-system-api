export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ?? '3306', 10),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  },
  synchronize: false,
});

const CONFIG = {
  port: process.env.PORT ?? 3000,
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: process.env.DB_PORT ?? 27017,
  dbName: process.env.DB_NAME ?? 'mestodb',
  usePasswordSalt: Number(process.env.USER_PASSWORD_SALT ?? 10),
};

export default CONFIG;

const CONFIG = {
  PORT: process.env.PORT ?? 3000,
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: process.env.DB_PORT ?? 27017,
  DB_NAME: process.env.DB_NAME ?? 'mestodb',
  USER_PASSWORD_SALT: Number(process.env.USER_PASSWORD_SALT ?? 10),
};

export default CONFIG;

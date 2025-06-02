import dotenv from 'dotenv';

const CONFIG_DEFAULTS = {
  port: 3000,
  dbHost: 'localhost',
  dbPort: 27017,
  dbName: 'mestodb',
  usePasswordSalt: 10,
  jwtSecret: 'secret',
  jwtExpiresIn: '7d',
  jwtMaxAge: 604800000,
};

const CONFIG = CONFIG_DEFAULTS;

export const initConfig = () => {
  dotenv.config();

  Object.keys(CONFIG_DEFAULTS).forEach((key) => {
    if (process.env[key]) {
      // @ts-ignore
      CONFIG[key] = process.env[key];
    }
  });
};

export default CONFIG;

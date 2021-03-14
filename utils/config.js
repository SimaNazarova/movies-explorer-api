const { PORT = 3000 } = process.env;

const MONGO_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/moviesdb';

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

module.exports = {
  PORT,
  MONGO_URL,
  JWT_SECRET,
};

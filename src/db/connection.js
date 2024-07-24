import { connect } from 'mongoose';
import config from '../config.js';

export const initMongoDB = async () => {
  try {
    await connect(config.process.MONGO_URL);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    throw new Error(error);
  }
};
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || 'default-secret'; // Fallback para desenvolvimento
export const options = {
  expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Tempo de expiração padrão
};

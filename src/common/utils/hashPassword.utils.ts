const bcrypt = require('bcryptjs');

const saltRounds = 10;
export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw error;
  }
};
export const verifyPassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    throw error;
  }
};
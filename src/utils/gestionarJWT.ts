import jwt from "jsonwebtoken";

const SECRET_KEY = "iyl2004";

export const generarToken = (id: Number) => {
  return jwt.sign({ id }, SECRET_KEY);
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);  // Retorna l'objecte decodificat
  } catch (error) {
    return null;
  }
};

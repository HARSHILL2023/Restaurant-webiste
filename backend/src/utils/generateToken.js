import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign({ id }, secret, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

export default generateToken;

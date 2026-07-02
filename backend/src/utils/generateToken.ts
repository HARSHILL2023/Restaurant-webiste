import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  // Cast options to any to avoid strict overload conflicts between @types/jsonwebtoken versions
  return (jwt.sign as any)({ id }, secret, { expiresIn: process.env.JWT_EXPIRE || '30d' });
};

export default generateToken;

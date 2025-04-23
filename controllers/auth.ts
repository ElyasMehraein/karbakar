import { verify, JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: string;
}

export function verifyToken(token: string | undefined): TokenPayload | false {
  if (!token) return false;
  
  try {
    const validationResult = verify(token, process.env.JWT_SECRET || '') as TokenPayload;
    return validationResult;
  } catch (err) {
    return false;
  }
} 
export interface JwtPayload {
  role: string;
  iat?: number;
  exp?: number;
}

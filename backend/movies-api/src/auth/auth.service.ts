import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login() {
    const payload = { role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "@modules/users/users.service";
import { type User } from "@/modules/users/user.entity";
import { type PayloadToken } from "./models/token.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user !== null) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) return user;
    }
    return null;
  }

  generateJWT(user: User): any {
    const { role, id } = user;
    const payload: PayloadToken = { role, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

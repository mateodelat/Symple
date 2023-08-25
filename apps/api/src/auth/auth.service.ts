import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "@modules/users/users.service";
import { type User } from "@/modules/users/user.entity";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user !== null && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const { id: sub, email, name, lastName, role, enterprises, avatar } = user;

    const userPayload = { email, name, lastName, role, enterprises, avatar };
    return {
      accessToken: this.jwtService.sign({
        ...userPayload,
        sub,
      }),
      user: userPayload,
    };
  }
}

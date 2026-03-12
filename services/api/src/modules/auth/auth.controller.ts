import { Body, Controller, Post } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { AuthService, LoginInput, RegisterInput } from "./auth.service";

class RegisterDto implements RegisterInput {
  email!: string;
  password!: string;
  role!: UserRole;
  companyName?: string;
  trade?: string;
  city?: string;
  firstName?: string;
  lastName?: string;
}

class LoginDto implements LoginInput {
  email!: string;
  password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}

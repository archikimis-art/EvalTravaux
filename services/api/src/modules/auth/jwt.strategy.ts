import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService, JwtPayload } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "evaltravaux-dev-secret-change-in-prod",
    });
  }

  async validate(payload: { sub: string }): Promise<JwtPayload> {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) throw new UnauthorizedException("Utilisateur introuvable.");
    return user;
  }
}

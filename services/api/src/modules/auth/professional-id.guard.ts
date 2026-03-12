import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtPayload } from "./auth.service";

@Injectable()
export class ProfessionalIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    const professionalId =
      request.params?.professionalId ?? request.body?.professionalId;

    if (!user) return false;
    if (user.role !== "PROFESSIONAL") {
      throw new ForbiddenException("Réservé aux comptes professionnels.");
    }
    if (professionalId && user.professionalId !== professionalId) {
      throw new ForbiddenException(
        "Vous ne pouvez accéder qu’aux données de votre propre compte professionnel.",
      );
    }
    return true;
  }
}

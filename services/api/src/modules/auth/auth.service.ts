import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

const SALT_ROUNDS = 10;

/** Crédits offerts à l’inscription pour les comptes professionnels (phase gratuite). */
const FREE_WELCOME_CREDITS = 50;

export type RegisterInput = {
  email: string;
  password: string;
  role: UserRole;
  companyName?: string;
  trade?: string;
  city?: string;
  firstName?: string;
  lastName?: string;
};

export type LoginInput = { email: string; password: string };

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
  professionalId?: string;
  customerId?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (existing) {
      throw new BadRequestException("Un compte existe déjà avec cet email.");
    }

    const hashed = await bcrypt.hash(input.password, SALT_ROUNDS);
    const email = input.email.toLowerCase();

    if (input.role === "PROFESSIONAL") {
      if (!input.companyName || !input.trade || !input.city) {
        throw new BadRequestException(
          "companyName, trade et city sont requis pour un compte professionnel.",
        );
      }
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashed,
          role: "PROFESSIONAL",
          professional: {
            create: {
              companyName: input.companyName,
              trade: input.trade,
              city: input.city,
              credits: {
                create: { balance: FREE_WELCOME_CREDITS },
              },
            },
          },
        },
        include: { professional: { include: { credits: true } } },
      });
      const payload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: "PROFESSIONAL",
        professionalId: user.professional!.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, role: user.role },
        professionalId: user.professional!.id,
      };
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashed,
        role: "CUSTOMER",
        customer: {
          create: {
            firstName: input.firstName,
            lastName: input.lastName,
            city: input.city,
          },
        },
      },
      include: { customer: true },
    });
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: "CUSTOMER",
      customerId: user.customer!.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role },
      customerId: user.customer!.id,
    };
  }

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: { professional: true, customer: true },
    });
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new UnauthorizedException("Email ou mot de passe incorrect.");
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      professionalId: user.professional?.id,
      customerId: user.customer?.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role },
      professionalId: user.professional?.id ?? undefined,
      customerId: user.customer?.id ?? undefined,
    };
  }

  async validateUser(userId: string): Promise<JwtPayload | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { professional: true, customer: true },
    });
    if (!user) return null;
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
      professionalId: user.professional?.id,
      customerId: user.customer?.id,
    };
  }
}

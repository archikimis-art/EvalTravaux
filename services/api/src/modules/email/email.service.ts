import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/** En prod : définir SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (et optionnellement SMTP_FROM). Sinon les emails sont loggés en console. */
@Injectable()
export class EmailService {
  private transporter: Transporter | null = null;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: port ? parseInt(port, 10) : 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: { user, pass },
      });
    }
  }

  private async send(to: string, subject: string, text: string, html?: string): Promise<void> {
    const from = process.env.SMTP_FROM || "EvalTravaux <noreply@evaltravaux.fr>";
    if (this.transporter) {
      await this.transporter.sendMail({ from, to, subject, text, html: html || text });
    } else {
      console.log(`[Email] ${subject} → ${to}\n${text}`);
    }
  }

  async sendNewLeadToProfessionals(
    leadId: string,
    professionalEmails: string[],
    leadTitle: string,
  ): Promise<void> {
    const subject = `Nouveau lead : ${leadTitle}`;
    const text = `Un nouveau lead correspondant à votre activité a été publié sur EvalTravaux (réf. ${leadId}). Connectez-vous à votre espace pro pour le consulter.`;
    const html = `<p>Un nouveau lead correspondant à votre activité a été publié sur EvalTravaux.</p><p><strong>${leadTitle}</strong></p><p>Réf. : ${leadId}</p><p>Connectez-vous à votre espace pro pour le consulter.</p>`;
    for (const to of professionalEmails) {
      await this.send(to, subject, text, html);
    }
  }

  async sendLeadPurchased(
    to: string,
    leadTitle: string,
    creditsUsed: number,
    balance: number,
  ): Promise<void> {
    const subject = `Lead acheté : ${leadTitle}`;
    const text = `Vous avez acheté le lead « ${leadTitle} » (${creditsUsed} crédits). Solde actuel : ${balance} crédits.`;
    await this.send(to, subject, text);
  }

  async sendLowCredits(to: string, balance: number): Promise<void> {
    const subject = "Solde de crédits faible – EvalTravaux";
    const text = `Votre solde de crédits EvalTravaux est faible (${balance} crédits). Pensez à recharger pour continuer à recevoir des coordonnées de clients.`;
    await this.send(to, subject, text);
  }

  async sendReviewRequest(
    customerEmail: string,
    professionalName: string,
    leadId: string,
  ): Promise<void> {
    const subject = "Donnez votre avis sur votre prestataire – EvalTravaux";
    const text = `Vos travaux avec ${professionalName} sont terminés. Merci de prendre une minute pour noter votre expérience sur EvalTravaux (lead ${leadId}).`;
    await this.send(customerEmail, subject, text);
  }

  async sendDocumentReminder(
    professionalEmail: string,
    documentType: string,
    expiresAt: Date,
  ): Promise<void> {
    const subject = `Relance : document ${documentType} à renouveler – EvalTravaux`;
    const text = `Votre document réglementaire « ${documentType} » expire le ${expiresAt.toLocaleDateString("fr-FR")}. Merci de le mettre à jour dans votre espace pro.`;
    await this.send(professionalEmail, subject, text);
  }
}

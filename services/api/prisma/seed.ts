import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

/** ID fixe pour le customer "public" utilisé par les demandes de devis anonymes */
export const PUBLIC_CUSTOMER_ID = "public-customer-evaltravaux";

async function main() {
  const existing = await prisma.customer.findUnique({
    where: { id: PUBLIC_CUSTOMER_ID },
  });
  if (existing) {
    console.log("Customer public déjà existant:", PUBLIC_CUSTOMER_ID);
    return;
  }

  const hashedPassword = await bcrypt.hash("public-no-login-" + Date.now(), 10);
  const user = await prisma.user.create({
    data: {
      email: "public@evaltravaux.internal",
      password: hashedPassword,
      role: "CUSTOMER",
    },
  });

  await prisma.customer.create({
    data: {
      id: PUBLIC_CUSTOMER_ID,
      userId: user.id,
      firstName: "Public",
      lastName: "Anonyme",
      city: null,
    },
  });

  console.log("Customer public créé:", PUBLIC_CUSTOMER_ID);
  console.log("→ Définissez NEXT_PUBLIC_PUBLIC_CUSTOMER_ID=" + PUBLIC_CUSTOMER_ID + " sur le frontend");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

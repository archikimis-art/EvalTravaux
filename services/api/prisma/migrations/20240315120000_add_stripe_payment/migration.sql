-- CreateTable
CREATE TABLE "StripePayment" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "packSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripePayment_sessionId_key" ON "StripePayment"("sessionId");

-- AddForeignKey
ALTER TABLE "StripePayment" ADD CONSTRAINT "StripePayment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

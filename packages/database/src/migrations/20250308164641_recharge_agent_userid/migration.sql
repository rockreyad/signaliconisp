-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "rechargeAgentId" TEXT;

-- CreateIndex
CREATE INDEX "payments_rechargeAgentId_idx" ON "payments"("rechargeAgentId");

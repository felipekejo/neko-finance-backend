/*
  Warnings:

  - You are about to drop the column `owner_id` on the `budgets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_owner_id_fkey";

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "owner_id",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "user_budgets" (
    "userId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "user_budgets_pkey" PRIMARY KEY ("userId","budgetId")
);

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_budgets" ADD CONSTRAINT "user_budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_budgets" ADD CONSTRAINT "user_budgets_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

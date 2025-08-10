/*
  Warnings:

  - You are about to drop the column `userId` on the `budgets` table. All the data in the column will be lost.
  - Changed the type of `date` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_userId_fkey";

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "subCategoryId" TEXT,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

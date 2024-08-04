/*
  Warnings:

  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "type" "TypeTransaction" NOT NULL DEFAULT 'EXPENSES';

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "type";

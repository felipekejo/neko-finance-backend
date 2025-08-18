/*
  Warnings:

  - You are about to alter the column `balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

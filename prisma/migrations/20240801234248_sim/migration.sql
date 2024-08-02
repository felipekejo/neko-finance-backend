/*
  Warnings:

  - You are about to drop the column `title` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `name` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

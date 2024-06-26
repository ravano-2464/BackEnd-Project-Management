/*
  Warnings:

  - You are about to drop the column `name` on the `teams` table. All the data in the column will be lost.
  - Added the required column `team_name` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teams" DROP COLUMN "name",
ADD COLUMN     "team_name" TEXT NOT NULL;

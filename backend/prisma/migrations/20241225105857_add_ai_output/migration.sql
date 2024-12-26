/*
  Warnings:

  - Added the required column `uid` to the `AIOutput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIOutput" ADD COLUMN     "uid" TEXT NOT NULL;

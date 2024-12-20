/*
  Warnings:

  - Added the required column `templatesSlug` to the `AIOutput` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `formData` on the `AIOutput` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AIOutput" ADD COLUMN     "templatesSlug" TEXT NOT NULL,
DROP COLUMN "formData",
ADD COLUMN     "formData" JSONB NOT NULL;

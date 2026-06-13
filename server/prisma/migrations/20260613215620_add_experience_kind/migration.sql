-- CreateEnum
CREATE TYPE "ExperienceKind" AS ENUM ('FORMAL_WORK', 'IT_FREELANCE', 'GENERAL_FREELANCE');

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "experienceKind" "ExperienceKind" NOT NULL DEFAULT 'FORMAL_WORK';

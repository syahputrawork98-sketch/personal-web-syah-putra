-- CreateEnum
CREATE TYPE "LearningStatus" AS ENUM ('PLANNED', 'LEARNING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "LearningItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "LearningStatus" NOT NULL DEFAULT 'PLANNED',
    "level" TEXT,
    "description" TEXT NOT NULL,
    "topics" TEXT[],
    "repoUrl" TEXT,
    "notesUrl" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningItem_slug_key" ON "LearningItem"("slug");

-- CreateIndex
CREATE INDEX "LearningItem_category_idx" ON "LearningItem"("category");

-- CreateIndex
CREATE INDEX "LearningItem_status_idx" ON "LearningItem"("status");

-- CreateIndex
CREATE INDEX "LearningItem_featured_idx" ON "LearningItem"("featured");

-- CreateIndex
CREATE INDEX "LearningItem_isPublished_idx" ON "LearningItem"("isPublished");

-- CreateIndex
CREATE INDEX "LearningItem_orderIndex_idx" ON "LearningItem"("orderIndex");

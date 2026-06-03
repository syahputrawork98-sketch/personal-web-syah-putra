-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('CERTIFICATE', 'SUPPORTING_DOCUMENT');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'NEEDS_MANUAL_VERIFICATION', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "CredentialSourceType" AS ENUM ('DRAFT_FILE', 'GOOGLE_DRIVE', 'MANUAL_INPUT', 'CMS');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('TECHNICAL', 'SOFT', 'TOOL', 'LANGUAGE');

-- CreateEnum
CREATE TYPE "ExperienceStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "techStack" TEXT[],
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "CredentialType" NOT NULL DEFAULT 'CERTIFICATE',
    "sourceType" "CredentialSourceType" NOT NULL DEFAULT 'DRAFT_FILE',
    "title" TEXT NOT NULL,
    "officialTitle" TEXT,
    "category" TEXT NOT NULL,
    "subCategory" TEXT,
    "issuer" TEXT NOT NULL,
    "issuerType" TEXT,
    "certificateNumber" TEXT,
    "participantName" TEXT NOT NULL DEFAULT 'Syah Putra Nugraha',
    "issueDate" TIMESTAMP(3),
    "originalIssueDate" TEXT,
    "startDate" TIMESTAMP(3),
    "originalStartDate" TEXT,
    "endDate" TIMESTAMP(3),
    "originalEndDate" TEXT,
    "duration" TEXT,
    "status" TEXT,
    "grade" TEXT,
    "level" TEXT,
    "skills" TEXT[],
    "relatedTech" TEXT[],
    "relatedDomains" TEXT[],
    "competencies" JSONB,
    "keyTopics" JSONB,
    "summary" TEXT NOT NULL,
    "portfolioRelevance" TEXT NOT NULL,
    "recruiterValue" TEXT,
    "displayPriority" INTEGER NOT NULL DEFAULT 3,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT false,
    "showOnCertificatePage" BOOLEAN NOT NULL DEFAULT true,
    "driveUrl" TEXT,
    "fileName" TEXT,
    "language" TEXT,
    "notes" TEXT,
    "metadata" JSONB,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'NEEDS_MANUAL_VERIFICATION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedCredential" (
    "id" TEXT NOT NULL,
    "credentialId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT,

    CONSTRAINT "FeaturedCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SkillType" NOT NULL DEFAULT 'TECHNICAL',
    "category" TEXT,
    "icon" TEXT,
    "level" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "type" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "highlights" TEXT[],
    "techStack" TEXT[],
    "status" "ExperienceStatus" NOT NULL DEFAULT 'DRAFT',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Credential_slug_key" ON "Credential"("slug");

-- CreateIndex
CREATE INDEX "Credential_category_idx" ON "Credential"("category");

-- CreateIndex
CREATE INDEX "Credential_featured_idx" ON "Credential"("featured");

-- CreateIndex
CREATE INDEX "Credential_displayPriority_idx" ON "Credential"("displayPriority");

-- CreateIndex
CREATE INDEX "Credential_verificationStatus_idx" ON "Credential"("verificationStatus");

-- CreateIndex
CREATE INDEX "Credential_type_idx" ON "Credential"("type");

-- CreateIndex
CREATE INDEX "Credential_sourceType_idx" ON "Credential"("sourceType");

-- CreateIndex
CREATE UNIQUE INDEX "FeaturedCredential_credentialId_key" ON "FeaturedCredential"("credentialId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_type_key" ON "Skill"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- AddForeignKey
ALTER TABLE "FeaturedCredential" ADD CONSTRAINT "FeaturedCredential_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "Credential"("id") ON DELETE CASCADE ON UPDATE CASCADE;

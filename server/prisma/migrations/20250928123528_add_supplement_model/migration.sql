-- CreateEnum
CREATE TYPE "public"."Evidence" AS ENUM ('HIGH', 'MODERATE', 'LOW', 'INSUFFICIENT');

-- CreateTable
CREATE TABLE "public"."Supplement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "fullDesc" TEXT NOT NULL,
    "mechanisms" TEXT[],
    "evidence" "public"."Evidence" NOT NULL,

    CONSTRAINT "Supplement_pkey" PRIMARY KEY ("id")
);

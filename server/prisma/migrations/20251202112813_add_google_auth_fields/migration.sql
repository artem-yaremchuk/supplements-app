-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleAuthCode" TEXT,
ADD COLUMN     "googleAuthExp" TIMESTAMP(3);

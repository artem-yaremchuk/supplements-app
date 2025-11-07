-- CreateTable
CREATE TABLE "_SupplementToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SupplementToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SupplementToUser_B_index" ON "_SupplementToUser"("B");

-- AddForeignKey
ALTER TABLE "_SupplementToUser" ADD CONSTRAINT "_SupplementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Supplement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplementToUser" ADD CONSTRAINT "_SupplementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
